'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, MapPin, Search, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import type { Province, SearchResult, Ward } from '../types/api'
import useMapContext from './Map/useMapContext'

interface GeoLocation {
  lat: number
  lng: number
}

interface ProvinceSearchProps {
  onResult: (result: SearchResult | null) => void
}
export const ProvinceSearch = ({ onResult }: ProvinceSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)

  // Province and Ward selection
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null)
  const [loadingProvinces, setLoadingProvinces] = useState(false)
  const [loadingWards, setLoadingWards] = useState(false)
  const [loadingNominatim, setLoadingNominatim] = useState(false)

  // Map context for relocation
  const { map } = useMapContext()

  // Normalize province name for better API search results
  const normalizeProvinceName = (provinceName: string): string => `${provinceName}, Vietnam`

  // Fetch coordinates from Nominatim OpenStreetMap API
  const fetchNominatimCoordinates = useCallback(async (provinceName: string): Promise<GeoLocation | null> => {
    try {
      setLoadingNominatim(true)
      const searchQuery = normalizeProvinceName(provinceName)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery,
        )}&format=json&countrycodes=vn&limit=1`,
      )

      if (response.ok) {
        const data = await response.json()
        if (data && data.length > 0 && data[0].lat && data[0].lon) {
          const coords = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          }
          // Found coordinates for province
          return coords
        }
      }
    } catch (error) {
      // Failed to fetch Nominatim coordinates
    } finally {
      setLoadingNominatim(false)
    }
    return null
  }, [])

  // Relocate map to specific coordinates
  const relocateMap = useCallback(
    (coordinates: GeoLocation, zoomLevel = 10) => {
      if (map) {
        map.flyTo([coordinates.lat, coordinates.lng], zoomLevel, {
          animate: true,
          duration: 1.5,
        })

        const moveEnd = () => {
          map.off('moveend', moveEnd)
        }

        map.once('moveend', moveEnd)
      }
    },
    [map],
  )

  const searchAPI = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const response = await fetch(`https://34tinhthanh.com/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (Array.isArray(data)) {
        setSuggestions(data) // Limit to 8 results
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      // Search API error
      setSuggestions([])
      setShowSuggestions(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        searchAPI(searchTerm.trim())
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, searchAPI])

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      setLoadingProvinces(true)
      const response = await fetch('https://34tinhthanh.com/api/provinces')
      const data = await response.json()
      setProvinces(data)
    } catch (error) {
      console.error('Failed to fetch provinces:', error)
    } finally {
      setLoadingProvinces(false)
    }
  }

  // Fetch wards for selected province
  const fetchWards = async (provinceCode: string) => {
    try {
      setLoadingWards(true)
      const response = await fetch(`https://34tinhthanh.com/api/wards?province_code=${provinceCode}`)
      const data = await response.json()
      setWards(data)
    } catch (error) {
      // Failed to fetch wards
    } finally {
      setLoadingWards(false)
    }
  }

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  // Handle province selection
  const handleProvinceSelect = async (provinceCode: string) => {
    const province = provinces.find(p => p.province_code === provinceCode)
    if (province) {
      setSelectedProvince(province)
      setSelectedWard(null)
      fetchWards(provinceCode)

      // Fetch coordinates and relocate map
      try {
        const coordinates = await fetchNominatimCoordinates(province.name)
        // Found coordinates
        if (coordinates) {
          relocateMap(coordinates, 10)
        }
      } catch (error) {
        // Error relocating to province
      }
    }

    // reset selected ward
    setSelectedWard(null)
  }

  // Handle ward selection
  const handleWardSelect = (wardCode: string) => {
    const ward = wards.find(w => w.ward_code === wardCode)
    if (ward) {
      setSelectedWard(ward)
      // Create a SearchResult from the ward for compatibility
      const searchResult: SearchResult = {
        type: 'ward' as SearchResult['type'],
        province_code: ward.province_code,
        ward_code: ward.ward_code,
        name: ward.ward_name,
        province_name: ward.province_name,
        merger_details: ward.merger_details,
        old_units_count: ward.old_units_count,
        is_merger_match: ward.has_merger,
        place_type: ward.place_type as SearchResult['place_type'],
      }
      onResult(searchResult)
    }
  }

  const handleSuggestionClick = useCallback(
    async (suggestion: SearchResult) => {
      // setSearchTerm(suggestion.name)
      onResult(suggestion)
      setShowSuggestions(false)

      setSelectedProvince({
        province_code: suggestion.province_code,
        name: suggestion.province_name || '',
      })

      if (suggestion.type === 'province') {
        setSelectedWard(null)
      }

      if (suggestion.type === 'ward') {
        // get wards of province
        const response = await fetch(
          `https://34tinhthanh.com/api/wards?province_code=${suggestion.province_code}`,
        )
        const data = await response.json()
        setWards(data)

        setSelectedWard(data.find((ward: Ward) => ward.ward_code === suggestion.ward_code))
      }

      // handle map relocation
      const coordinates = await fetchNominatimCoordinates(suggestion.name)
      if (coordinates) {
        relocateMap(coordinates, 10)
      }
    },
    [fetchNominatimCoordinates, onResult, provinces, relocateMap],
  )

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0])
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    onResult(null)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const quickSearchTerms = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Nhập tên tỉnh, thành phố, xã phường..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
              className="pr-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          <Button onClick={handleSearch} size="default" disabled={loading} type="button">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={`suggestion-${suggestion.name}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 focus:bg-gray-50 focus:outline-none transition-colors"
              >
                <div className="space-y-1">
                  {/* Main name display with old unit if available */}
                  <div className="flex items-center gap-2">
                    {suggestion.matched_old_unit ? (
                      <>
                        <span className="text-sm text-gray-400">{suggestion.matched_old_unit}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm font-semibold text-gray-900">{suggestion.name}</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">{suggestion.name}</span>
                    )}

                    {/* Badges */}
                    <div className="flex items-center gap-1 ml-auto">
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.type}
                      </Badge>
                      {suggestion.is_merger_match && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                          Sáp nhập
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Province name */}
                  {suggestion.province_name && (
                    <p className="text-xs text-gray-600">{suggestion.province_name}</p>
                  )}

                  {/* Merger details */}
                  {suggestion.merger_details && (
                    <p className="text-xs text-blue-600">
                      <span className="font-medium">Sáp nhập:</span> {suggestion.merger_details}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Search Tags */}
      <div className="space-y-2">
        <p className="text-xs text-gray-600">Tìm kiếm nhanh:</p>
        <div className="flex flex-wrap gap-1">
          {quickSearchTerms.map(term => (
            <Badge
              key={term}
              variant="outline"
              className="cursor-pointer hover:bg-gray-50 text-xs"
              onClick={() => {
                setSearchTerm(term)
                searchAPI(term)
              }}
            >
              {term}
            </Badge>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-2">
          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          <p className="text-xs text-gray-500 mt-1">Đang tìm kiếm...</p>
        </div>
      )}

      {/* Province Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            Chọn Tỉnh/Thành Phố
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            onValueChange={handleProvinceSelect}
            value={selectedProvince?.province_code}
            disabled={loadingProvinces || loadingNominatim}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  // eslint-disable-next-line no-nested-ternary
                  loadingProvinces
                    ? 'Đang tải...'
                    : loadingNominatim
                    ? 'Đang di chuyển bản đồ...'
                    : 'Chọn tỉnh/thành phố'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {provinces.map(province => (
                <SelectItem key={province.province_code} value={province.province_code}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3 my-3">
            <div className="space-y-1">
              <p className="text-gray-600">Số phường/xã hiện tại</p>
              <p className="font-semibold text-lg">{wards.length}</p>
            </div>
          </div>

          {/* Ward Selection */}
          {selectedProvince && (
            <>
              <Select
                key={selectedProvince.province_code}
                value={selectedWard?.ward_code}
                onValueChange={handleWardSelect}
                disabled={loadingWards}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingWards ? 'Đang tải...' : 'Chọn xã/phường/thị trấn'} />
                </SelectTrigger>
                <SelectContent>
                  {wards.map(ward => (
                    <SelectItem key={ward.ward_code} value={ward.ward_code}>
                      {ward.ward_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedWard && (
                <>
                  <div className="font-bold text-sm my-3 border-b w-full">Chi tiết</div>
                  {/* Ward Code */}
                  <div>
                    <p className="text-xs text-gray-600">Mã xã/phường</p>
                    <p className="font-mono text-sm">{selectedWard.ward_code}</p>
                  </div>

                  {/* Merger Information */}
                  {selectedWard.has_merger && selectedWard.old_units && (
                    <div>
                      <p className="text-xs text-gray-600">
                        Sáp nhập từ {selectedWard.old_units_count} đơn vị:
                      </p>
                      <div className="mt-2 space-y-1">
                        {selectedWard.old_units.map((unit, unitIndex) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Badge key={`${unit}-${unitIndex}`} variant="outline" className="text-xs mr-1">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Province Merged With */}
                  {selectedWard.province_merged_with && selectedWard.province_merged_with.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600">Sáp nhập với:</p>
                      <div className="mt-1">
                        {selectedWard.province_merged_with.map((province, provinceIndex) => (
                          <Badge
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${province}-${provinceIndex}`}
                            variant="secondary"
                            className="text-xs mr-1"
                          >
                            {province}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Administrative Center */}
                  {selectedWard.administrative_center && (
                    <div>
                      <p className="text-xs text-gray-600">Trung tâm hành chính tại:</p>
                      <p className="text-sm font-medium">{selectedWard.administrative_center}</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
