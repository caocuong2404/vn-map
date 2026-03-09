# VN Map - Code Structure & Architecture

## Directory Structure
```
src/
├── components/
│   ├── Map/                    # Core mapping components
│   │   ├── index.tsx          # Main Map component
│   │   ├── LeafletMapContainer.tsx
│   │   ├── LeafletMapContextProvider.tsx
│   │   ├── VietnamGeoJSON.tsx  # Vietnam boundaries rendering
│   │   ├── LeafletMarker/     # Custom marker components
│   │   ├── ui/                # Map-specific UI (CenterButton, LocateButton, TileSwitcher)
│   │   └── hooks/             # Map-related custom hooks
│   ├── common/                # Shared components (Button, NavMenu)
│   ├── ui/                    # Radix UI components
│   └── province-search.tsx    # Province search functionality
├── pages/                     # Next.js pages (pages router)
│   ├── index.tsx             # Homepage with search + map
│   ├── map/index.tsx         # Full-screen map page
│   ├── home/index.tsx        # Home component
│   ├── _app.tsx              # App wrapper
│   └── _document.tsx         # Document head
├── lib/                      # Utilities and configuration
│   ├── AppConfig.ts          # App constants and settings
│   ├── Places.ts             # Sample place data
│   ├── TileProviders.ts      # Map tile provider configurations
│   ├── MarkerCategories.ts   # Marker categorization
│   └── utils.ts              # Utility functions (cn helper)
├── types/
│   └── api.ts                # TypeScript type definitions
└── hooks/                    # Global custom hooks
```

## Key Components Architecture

### Map System
- **LeafletMapContextProvider**: Global map state management
- **LeafletMapContainer**: Base map container with tile layers
- **VietnamGeoJSON**: Renders Vietnam administrative boundaries
- **CustomMarker**: Individual map markers with popups

### Search System  
- **ProvinceSearch**: Smart search with autocomplete
- **API Integration**: 34tinhthanh.com for provinces/wards data

### UI System
- **Radix UI + Tailwind**: Accessible, styled components
- **Custom UI**: Map controls (locate, center, tile switcher)
- **Responsive Design**: Mobile-first approach