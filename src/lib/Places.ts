import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

export const Places: PlacesType = [
  // ha noi city
  {
    id: 1,
    position: [16.0678, 108.2218],
    category: Category.CAT1,
    title: 'Đà Nẵng',
    address: 'Đà Nẵng',
  },
  // ho chi minh city
  {
    id: 2,
    position: [10.82302, 106.629699],
    category: Category.CAT1,
    title: 'Hồ Chí Minh',
    address: 'Hồ Chí Minh',
  },
  // ha noi city
  {
    id: 3,
    position: [21.028511, 105.85421],
    category: Category.CAT1,
    title: 'Hà Nội',
    address: 'Hà Nội',
  },
  // {
  //   id: 3,
  //   position: [52.022468698328275, 8.50583167463131],
  //   category: Category.CAT1,
  //   title: 'Some Title 3',
  //   address: 'Another Adress 789, Test City',
  // },
  // {
  //   id: 4,
  //   position: [51.99739839338658, 8.59544834428681],
  //   category: Category.CAT1,
  //   title: 'Some Title 4',
  //   address: 'Another Adress 101112, Test City',
  // },
  // {
  //   id: 5,
  //   position: [52.01219274931668, 8.599568218099812],
  //   category: Category.CAT2,
  //   title: 'Some Title 5',
  //   address: 'Another Adress 131415, Test City',
  // },
  // {
  //   id: 6,
  //   position: [52.0119, 8.563032],
  //   category: Category.CAT2,
  //   title: 'Some Title 6',
  //   address: 'Another Adress 161718, Test City',
  // },
  // {
  //   id: 7,
  //   position: [52.02022192326546, 8.583775371420124],
  //   category: Category.CAT2,
  //   title: 'Some Title 7',
  //   address: 'Another Adress 192021, Test City',
  // },
  // {
  //   id: 8,
  //   position: [51.99494772863581, 8.560429425686753],
  //   category: Category.CAT2,
  //   title: 'Some Title 8',
  //   address: 'Another Adress 222324, Test City',
  // },
  // {
  //   id: 9,
  //   position: [51.99274772863586, 8.560429425686753],
  //   category: Category.CAT2,
  //   title: 'Some Title 9',
  //   address: 'Another Adress 252627, Test City',
  // },
]
