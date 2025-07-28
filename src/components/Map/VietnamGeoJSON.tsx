import { GeoJSON as LeafletGeoJSON, Layer as LeafletLayer } from 'leaflet'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GeoJSON, Marker, Popup } from 'react-leaflet'

interface GeoJSONFeature {
  type: 'Feature'
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
  properties: {
    [key: string]: any
  }
}

interface MapMarker {
  id: string
  name: string
  latitude: number
  longitude: number
  description?: string
}

interface Province {
  id: string
  name: string
  adminCenter?: string
  searchText: string
}

interface VnMapGeoJSONProps {
  markers?: MapMarker[]
  onMarkerClick?: (marker: MapMarker) => void
  onProvinceClick?: (feature: GeoJSONFeature) => void
  onProvincesLoaded?: (provinces: Province[]) => void
}

// Generate random colors for provinces
const generateRandomColors = (count: number): string[] => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#F1948A',
    '#85C1E9',
    '#D2B4DE',
    '#F8D7DA',
    '#D1ECF1',
    '#D4EDDA',
    '#FFF3CD',
    '#E2E3E5',
    '#FFE5D9',
    '#FFF2CC',
    '#E1F5FE',
    '#F3E5F5',
    '#E8F5E8',
    '#FDE2E4',
    '#FAD2CF',
    '#F2F2F2',
    '#E6F3FF',
    '#F0F8FF',
    '#FFFACD',
    '#F5F5DC',
    '#E0FFFF',
    '#F0FFF0',
  ]

  // Shuffle colors and return first 'count' items
  const shuffled = [...colors].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const VnMapGeoJSON = ({
  markers = [],
  onMarkerClick,
  onProvinceClick,
  onProvincesLoaded,
}: VnMapGeoJSONProps) => {
  const [vietnamData, setVietnamData] = useState<any>(null)
  const [provinceColors, setProvinceColors] = useState<{ [key: string]: string }>({})
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)
  const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null)

  // Fetch VN Map provinces GeoJSON data
  useEffect(() => {
    const fetchVietnamData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/lqtue/LacaProvinceMap/main/new.geojson',
        )
        const data = await response.json()
        setVietnamData(data)

        // Generate random colors for each province
        const colors = generateRandomColors(data.features.length)
        const colorMap: { [key: string]: string } = {}

        const provinces: Province[] = []

        data.features.forEach((feature: GeoJSONFeature, index: number) => {
          const provinceName =
            feature.properties['Tỉnh thành mới'] ||
            feature.properties.name_en ||
            feature.properties.name ||
            `Province_${index}`
          const adminCenter = feature.properties['TT hành chính']

          colorMap[provinceName] = colors[index % colors.length]

          // Create province object for search
          provinces.push({
            id: `province_${index}`,
            name: provinceName,
            adminCenter,
            searchText: `${provinceName} ${adminCenter || ''}`.toLowerCase(),
          })
        })

        setProvinceColors(colorMap)

        // Provide provinces list to parent component
        if (onProvincesLoaded) {
          onProvincesLoaded(provinces)
        }
      } catch (error) {
        // Error fetching VN Map GeoJSON data
      }
    }

    fetchVietnamData()
  }, [onProvincesLoaded])

  // Style function for GeoJSON features
  const styleFunction = useCallback(
    (feature: unknown) => {
      const geoFeature = feature as GeoJSONFeature
      if (!geoFeature) return {}
      const provinceName =
        geoFeature.properties?.['Tỉnh thành mới'] ||
        geoFeature.properties?.name_en ||
        geoFeature.properties?.name ||
        'Unknown'
      const isHovered = hoveredProvince === provinceName

      return {
        fillColor: provinceColors[provinceName] || '#627BC1',
        weight: isHovered ? 3 : 1,
        opacity: 1,
        color: 'white',
        dashArray: isHovered ? '' : '2',
        fillOpacity: isHovered ? 0.8 : 0.6,
      }
    },
    [provinceColors, hoveredProvince],
  )

  // Handle feature events
  const onEachFeature = useCallback(
    (feature: unknown, layerItem: LeafletLayer) => {
      const geoFeature = feature as GeoJSONFeature
      if (!geoFeature || !geoFeature.properties) return
      const provinceName =
        geoFeature.properties['Tỉnh thành mới'] ||
        geoFeature.properties.name_en ||
        geoFeature.properties.name ||
        'Unknown'

      layerItem.on({
        mouseover: e => {
          setHoveredProvince(provinceName)
          const layerTarget = e.target
          layerTarget.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.8,
          })
          layerTarget.bringToFront()
        },
        mouseout: e => {
          setHoveredProvince(null)
          if (geoJsonLayerRef.current) {
            ;(geoJsonLayerRef.current as LeafletGeoJSON).resetStyle(e.target)
          }
        },
        click: () => {
          const props: Record<string, string> = geoFeature.properties
          const provinceNameForPopup =
            props['Tỉnh thành mới'] || props.name_en || props.name || 'Unknown Province'

          // Create popup content showing province information
          const popupContent = `
          <div style="font-family: inherit; min-width: 280px; background-color: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0; color: #1f2937;">
              ${props['Tỉnh thành mới'] || provinceNameForPopup}
            </h3>
            ${
              props['TT hành chính']
                ? `
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px; font-style: italic;">
                <strong>Trung tâm hành chính:</strong> ${props['TT hành chính']}
              </div>
            `
                : ''
            }
            ${
              props['Diện tích (km2)']
                ? `
              <div style="font-size: 12px; color: #374151; margin-bottom: 4px;">
                <strong>📏 Diện tích:</strong> ${props['Diện tích (km2)']} km²
              </div>
            `
                : ''
            }
            ${
              props['Dân số']
                ? `
              <div style="font-size: 12px; color: #374151; margin-bottom: 4px;">
                <strong>👥 Dân số:</strong> ${parseInt(props['Dân số'], 10).toLocaleString('vi-VN')} người
              </div>
            `
                : ''
            }
            ${
              props['GRDP 2024 (tỷ VND)']
                ? `
              <div style="font-size: 12px; color: #374151; margin-bottom: 4px;">
                <strong>💰 GRDP 2024:</strong> ${parseInt(props['GRDP 2024 (tỷ VND)'], 10).toLocaleString(
                  'vi-VN',
                )} tỷ VND
              </div>
            `
                : ''
            }
            ${
              props['Thu ngân sách 2024 (tỷ VND)']
                ? `
              <div style="font-size: 12px; color: #374151; margin-bottom: 4px;">
                <strong>🏛️ Thu ngân sách 2024:</strong> ${parseInt(
                  props['Thu ngân sách 2024 (tỷ VND)'],
                  10,
                ).toLocaleString('vi-VN')} tỷ VND
              </div>
            `
                : ''
            }
            ${
              props['ĐVHC cấp xã']
                ? `
              <div style="font-size: 12px; color: #9ca3af; margin-bottom: 8px;">
                <strong>🏘️ Số đơn vị hành chính cấp xã:</strong> ${props['ĐVHC cấp xã']}
              </div>
            `
                : ''
            }
            <div style="font-size: 11px; color: #9ca3af; padding: 8px 0; border-top: 1px solid #e5e7eb; font-style: italic;">
              💡 Sử dụng hộp tìm kiếm để di chuyển đến tỉnh này
            </div>
          </div>
        `

          layerItem.bindPopup(popupContent).openPopup()
          onProvinceClick?.(geoFeature)
        },
      })
    },
    [onProvinceClick],
  )

  // Handle marker clicks
  const handleMarkerClick = useCallback(
    (marker: MapMarker) => {
      onMarkerClick?.(marker)
    },
    [onMarkerClick],
  )

  return (
    <>
      {/* VN Map Provinces GeoJSON Layer */}
      {vietnamData && (
        <GeoJSON
          ref={geoJsonLayerRef}
          data={vietnamData}
          style={styleFunction}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Custom Markers */}
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          eventHandlers={{
            click: () => handleMarkerClick(marker),
          }}
        >
          <Popup>
            <div
              style={{
                padding: '8px',
                fontFamily: 'inherit',
                minWidth: '200px',
              }}
            >
              <h3
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  margin: '0 0 8px 0',
                  color: '#1f2937',
                }}
              >
                {marker.name}
              </h3>
              {marker.description && (
                <p
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 8px 0',
                  }}
                >
                  {marker.description}
                </p>
              )}
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                Tọa độ: {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
