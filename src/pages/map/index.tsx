import Map from '@/components/Map'
import Head from 'next/head'

const MapPage = () => (
  <div>
    <Head>
      <title>VN Map</title>
      <meta property="og:title" content="VN Map" key="title" />
      <meta
        name="description"
        content="Search and display positions of provinces and wards after Vietnam's reform mergers."
      />
    </Head>
    <Map />
  </div>
)

export default MapPage
