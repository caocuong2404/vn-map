# VN Map - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Key Components](#key-components)
7. [API Integration](#api-integration)
8. [Development Guide](#development-guide)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

## Project Overview

VN Map is an interactive web application for exploring Vietnamese provinces and administrative units. Built with Next.js and React Leaflet, it provides a modern interface for searching and visualizing Vietnam's administrative structure, including recent reform mergers.

### 🎯 Purpose
- **Administrative Mapping**: Interactive visualization of Vietnam's 63 provinces and administrative units
- **Smart Search**: Advanced search functionality for provinces and wards with autocomplete
- **Reform Tracking**: Up-to-date information about administrative mergers and boundary changes
- **Statistical Dashboard**: Real-time statistics about administrative divisions

### ✨ Key Features
- 🇻🇳 Interactive Vietnam province map with GeoJSON boundaries
- 🔍 Smart province and ward search with autocomplete suggestions
- 📊 Live statistics (provinces, wards, merger information)
- 🎨 Color-coded provinces with hover effects and tooltips
- 📱 Fully responsive design for mobile and desktop
- 🗺️ Multiple map tile providers (Google, OpenStreetMap, ESRI, CartoDB)
- 🎯 Custom markers with clustering functionality
- 📄 Rich popup information with detailed province data
- ⚡ Fast search with real-time API integration

## Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   External APIs  │    │   Static Assets │
│   (Next.js)     │◄──►│  34tinhthanh.com │    │   (GeoJSON)     │
│                 │    │                  │    │                 │
│ • React Leaflet │    │ • /api/provinces │    │ • Vietnam       │
│ • Province      │    │ • /api/stats     │    │   Boundaries    │
│   Search        │    │ • /api/wards     │    │ • Tile Layers   │
│ • Map Controls  │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Architecture
```
App
├── LeafletMapContextProvider (Global map state)
│   ├── HomePage
│   │   ├── ProvinceSearch (Search interface)
│   │   └── Map (Main map component)
│   │       ├── LeafletMapContainer (Base map)
│   │       ├── VietnamGeoJSON (Province boundaries)
│   │       ├── CustomMarkers (Point markers)
│   │       └── MapControls
│   │           ├── TileSwitcher
│   │           ├── LocateButton
│   │           └── CenterButton
│   └── MapPage (Full-screen map)
```

## Technology Stack

### Core Framework
- **Next.js 14.1.3**: React framework with pages router
- **React 18.2.0**: UI library with hooks and context
- **TypeScript 4.9.5**: Type safety with strict configuration

### Mapping & Geospatial
- **Leaflet 1.9.3**: Open-source mapping library
- **React Leaflet 4.2.1**: React wrapper for Leaflet
- **Leaflet MarkerCluster 1.5.3**: Marker clustering functionality
- **GeoJSON**: Vietnam administrative boundaries

### UI & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
  - Accordion, Alert Dialog, Avatar, Button, Card, etc.
- **Lucide React 0.532.0**: Beautiful icons
- **Class Variance Authority**: Component variant management

### State Management
- **React Context**: Global map state management
- **React Hooks**: Local state and effects
- **Custom Hooks**: Reusable map logic

### Development Tools
- **ESLint**: Code linting with Airbnb + TypeScript config
- **Prettier**: Code formatting with import sorting
- **PostCSS**: CSS processing with Autoprefixer

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/caocuong2404/vn-map
cd vn-map

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
leaflet-nextjs-ts-starter/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── *.svg
├── src/
│   ├── components/
│   │   ├── Map/               # Core mapping components
│   │   │   ├── index.tsx      # Main Map component
│   │   │   ├── LeafletMapContainer.tsx
│   │   │   ├── LeafletMapContextProvider.tsx
│   │   │   ├── VietnamGeoJSON.tsx
│   │   │   ├── LeafletMarker/
│   │   │   │   ├── index.tsx
│   │   │   │   └── MarkerIconWrapper.tsx
│   │   │   ├── ui/            # Map-specific UI controls
│   │   │   │   ├── CenterButton.tsx
│   │   │   │   ├── LocateButton.tsx
│   │   │   │   └── TileSwitcher.tsx
│   │   │   ├── useLeafletWindow.ts
│   │   │   ├── useMapContext.ts
│   │   │   └── useMarkerData.ts
│   │   ├── common/            # Shared components
│   │   │   ├── Button.tsx
│   │   │   ├── NavMenu.tsx
│   │   │   └── NavMenuItem.tsx
│   │   ├── ui/                # Radix UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (35+ components)
│   │   ├── province-search.tsx # Province search functionality
│   │   └── TopBar/            # Navigation components
│   ├── hooks/                 # Global custom hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                   # Utilities and configuration
│   │   ├── AppConfig.ts       # App constants
│   │   ├── MarkerCategories.ts
│   │   ├── Places.ts          # Sample data
│   │   ├── TileProviders.ts   # Map tile configurations
│   │   ├── utils.ts           # Utility functions
│   │   └── helper/
│   ├── pages/                 # Next.js pages
│   │   ├── index.tsx          # Homepage
│   │   ├── map/index.tsx      # Full-screen map
│   │   ├── home/index.tsx     # Home component
│   │   ├── _app.tsx           # App wrapper
│   │   └── _document.tsx      # Document head
│   ├── types/
│   │   └── api.ts             # TypeScript definitions
│   └── globals.css            # Global styles
├── components.json            # Shadcn UI config
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Key Components

### Map System

#### `LeafletMapContextProvider`
Global state management for map interactions and data.

```typescript
interface MapContextValues {
  // Map state and handlers
}
```

#### `LeafletMapContainer`
Base map container component that handles:
- Tile layer rendering
- Map initialization
- Responsive behavior

#### `VietnamGeoJSON`
Renders Vietnam's administrative boundaries:
- Province boundary polygons
- Interactive hover effects
- Color-coded regions
- Click handlers for province selection

#### `CustomMarker`
Individual map markers with:
- Category-based icons
- Popup information
- Clustering support

### Search System

#### `ProvinceSearch`
Advanced search component featuring:
- Real-time autocomplete
- Province and ward suggestions
- API integration with 34tinhthanh.com
- Search result handling

```typescript
interface ProvinceSearchProps {
  onResult: (result: SearchResult | null) => void;
}
```

### UI Controls

#### `TileSwitcher`
Allows switching between map tile providers:
- Google Maps (Standard, Satellite, Hybrid)
- OpenStreetMap
- ESRI World Imagery
- CartoDB Voyager

#### `LocateButton`
User location functionality with GPS integration.

#### `CenterButton`
Map center control with custom positioning.

## API Integration

### External APIs

#### 34tinhthanh.com API
Primary data source for Vietnamese administrative information:

- **GET /api/provinces**: List of all provinces
- **GET /api/stats**: Administrative statistics
- **GET /api/wards**: Ward information by province

### Data Types

```typescript
interface Province {
  province_code: string;
  name: string;
}

interface Stats {
  numProvinces: number;
  numWards: number;
  numMergedProvinces: number;
  mergedWardsPercentage: number;
  currentWards: number;
}

interface Ward {
  ward_name: string;
  ward_code: string;
  province_code: string;
  province_name: string;
  place_type: string;
  has_merger: boolean;
  old_units: string[];
  // ... additional fields
}
```

## Development Guide

### Code Style & Conventions

#### TypeScript Configuration
- Strict mode enabled
- Path aliases for clean imports:
  ```typescript
  import { Map } from '@/components/Map';
  import { AppConfig } from '@/lib/AppConfig';
  ```

#### Component Patterns
```typescript
// Standard component structure
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Component logic
  return (
    // JSX
  );
};

export default Component;
```

#### Styling Approach
- Tailwind CSS utilities
- Component variants with CVA
- Responsive design patterns
- Consistent spacing and typography

### Custom Hooks

#### `useMapContext`
Access global map state and methods.

#### `useMarkerData`
Manage marker data and clustering logic.

#### `useLeafletWindow`
Handle Leaflet library loading (SSR compatibility).

### Adding New Features

1. **Map Features**: Extend the Map component or create new UI controls
2. **Search Features**: Modify ProvinceSearch or add new search types
3. **API Integration**: Add new endpoints in the API integration layer
4. **UI Components**: Use existing Radix UI components or create custom ones

### Performance Considerations

- **Lazy Loading**: Map components are dynamically imported
- **Marker Clustering**: Large datasets use clustering for performance
- **Memoization**: Critical components use React.memo
- **API Caching**: Search results are cached for better UX

## Deployment

### Vercel Deployment (Recommended)
The project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables (if needed)
3. Deploy automatically on commits

### Manual Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

### Environment Variables
Currently, no environment variables are required. All external APIs use public endpoints.

## Contributing

### Development Workflow
1. **Setup**: Clone and install dependencies
2. **Branch**: Create feature branch from main
3. **Develop**: Follow coding conventions
4. **Test**: Ensure all functionality works
5. **Lint**: Run `npm run lint`
6. **Commit**: Use descriptive commit messages
7. **PR**: Submit pull request with description

### Code Quality
- TypeScript strict mode compliance
- ESLint + Prettier formatting
- Responsive design testing
- Cross-browser compatibility
- Accessibility considerations

### Adding Dependencies
- Prefer actively maintained packages
- Check bundle size impact
- Ensure TypeScript support
- Update documentation if needed

---

## License
MIT License - see LICENSE file for details.

## Support
For issues and questions:
- GitHub Issues: [Project Issues](https://github.com/caocuong2404/vn-map/issues)
- Documentation: This file and code comments
- Community: Contribute via pull requests