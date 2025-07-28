'use client'

// import { VnMap } from "@/components/vn-map"
// import { ProvinceSearch } from "@/components/province-search"
// import { HomestayModal } from "@/components/homestay-modal"
import Map from '@/components/Map'
import LeafleftMapContextProvider from '@/components/Map/LeafletMapContextProvider'
import { ProvinceSearch } from '@/components/province-search'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, MapPin, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { Province, SearchResult, Stats } from '../../types/api'

export const HomePage = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [showHomestays, setShowHomestays] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)

        // Fetch provinces and stats in parallel
        const [provincesRes, statsRes] = await Promise.all([
          fetch('https://34tinhthanh.com/api/provinces'),
          fetch('https://34tinhthanh.com/api/stats'),
        ])

        const [provincesData, statsData] = await Promise.all([provincesRes.json(), statsRes.json()])

        setProvinces(provincesData)
        setStats(statsData)
      } catch (error) {
        console.error('Error fetching initial data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province)
  }

  const handleSearchResult = (result: SearchResult | null) => {
    setSearchResult(result)
    if (result) {
      // Find the province for the search result
      const province = provinces.find(p => p.province_code === result.province_code)
      if (province) {
        setSelectedProvince(province)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto" />
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <LeafleftMapContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">VN Map</h1>
                  <p className="text-sm text-gray-600">Bản đồ Việt Nam tương tác</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tỉnh thành: {stats ? stats.numProvinces : '...'}</span>
                  {stats && (
                    <span className="text-gray-500">
                      {' '}
                      (sáp nhập {stats.numMergedProvinces} tỉnh, tỉ lệ: {stats.mergedWardsPercentage}%)
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">
                    Xã/phường/thị trấn: {stats ? stats.currentWards || '3321' : '...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel - Search and Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Tìm Kiếm Tỉnh Thành
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProvinceSearch onResult={handleSearchResult} />
                </CardContent>
              </Card>

              {/* Give Up Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button
                    onClick={() => setShowHomestays(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    //   size="lg"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Tôi Bỏ Cuộc - Tìm Homestay
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Không tìm được? Hãy nghỉ ngơi tại homestay gần đây!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Map */}
            <div className="lg:col-span-2 relative">
              <Card className="h-[600px] lg:h-[700px]">
                <CardHeader>
                  <CardTitle>VN Map - Bản Đồ Việt Nam Tương Tác</CardTitle>
                </CardHeader>
                <CardContent className="h-full p-0">
                  <Map
                  //   provinces={provinces}
                  //   selectedProvince={selectedProvince}
                  //   searchResult={searchResult}
                  //   onProvinceSelect={handleProvinceSelect}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Homestay Modal */}
        {/* <HomestayModal open={showHomestays} onOpenChange={setShowHomestays} /> */}
      </div>
    </LeafleftMapContextProvider>
  )
}

export default HomePage
