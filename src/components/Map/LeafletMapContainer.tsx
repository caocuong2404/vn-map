/* eslint-disable react/prop-types */
import { LatLngExpression, MapOptions } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import { defaultProvider, tileProviders } from '../../lib/TileProviders'
import useMapContext from './useMapContext'

export const LeafletMapContainer: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
    tileProvider?: keyof typeof tileProviders
  } & MapOptions
> = ({ tileProvider = defaultProvider, ...options }) => {
  const { setMap } = useMapContext()
  const provider = tileProviders[tileProvider] || tileProviders[defaultProvider]

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      className=" h-full w-full text-white outline-0"
      {...options}
    >
      <TileLayer
        key={tileProvider}
        attribution={provider.attribution}
        url={provider.url}
        maxZoom={provider.maxZoom}
        maxNativeZoom={provider.maxNativeZoom}
        // tileSize={provider.tileSize}
        // zoomOffset={provider.zoomOffset}
      />
      {options.children}
    </MapContainer>
  )
}
