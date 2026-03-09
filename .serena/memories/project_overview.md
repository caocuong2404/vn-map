# VN Map - Project Overview

## Purpose
VN Map is an interactive Vietnamese provinces and wards mapping application. The main goals are:

- **Province/Ward Search**: Provides smart search functionality for Vietnamese provinces and administrative units
- **GeoJSON Visualization**: Displays Vietnam's administrative boundaries with interactive features
- **Administrative Updates**: Shows up-to-date information about Vietnam's administrative reform mergers
- **Statistical Information**: Displays current statistics about provinces, wards, and administrative changes

## Key Features
- 🇻🇳 Interactive Vietnam province map with GeoJSON data
- 🔍 Smart province and ward search with autocomplete
- 📊 Detailed province statistics (population, area, GDP, budget)
- 🎨 Color-coded provinces with hover effects
- 📱 Responsive design with modern UI components
- 🏇 Built on Next.js 14 with Leaflet React
- 🐛 Custom marker support with clustering
- 📄 Rich popup information
- ⚓️ Custom hooks for map context and data management
- 🏡 Custom UI components (locate, center, tile switcher)

## External APIs
- **34tinhthanh.com API**: 
  - `/api/provinces` - Get province list
  - `/api/stats` - Get administrative statistics
  - Province and ward data with merger information

## Application Type
Single Page Application (SPA) with Next.js using pages router, focused on map visualization and geographical data exploration.