export interface Province {
  province_code: string
  name: string
}

export interface Stats {
  numProvinces: number
  numWards: number
  numMergedProvinces: number
  mergedWardsPercentage: number
  currentWards: number
}

export interface SearchResult {
  type: Type
  province_code: string
  ward_code?: string
  name: string
  province_name?: string
  merger_details?: string
  old_units_count?: number
  is_merger_match?: boolean
  search_normalized?: string
  administrative_center?: string
  province_merged_with?: string[]
  place_type?: string
  matched_old_unit?: string
}

export enum Type {
  Province = 'province',
  Ward = 'ward',
}

export interface Ward {
  ward_name: string
  ward_code: string
  province_code: string
  province_name: string
  province_short_name: string
  province_code_short: string
  place_type: string
  has_merger: boolean
  old_units: string[]
  old_units_count: number
  merger_details: string
  province_is_merged: boolean
  province_merged_with: string[]
  administrative_center: string
}

export interface GeoLocation {
  lat: number
  lng: number
}
