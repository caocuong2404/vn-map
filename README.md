VN Map - Searchable Map of Vietnam Provinces and Wards
===============

VN Map helps you search and display the latest positions of provinces and wards after Vietnam's administrative reform mergers. Built with [Next.js](https://nextjs.org/) and [React Leaflet](https://react-leaflet.js.org/) and styled by [Tailwind CSS](https://tailwindcss.com/) with [Lucide icons](https://lucide.dev/). ✨ Built with [TypeScript](https://www.typescriptlang.org/) 👐.

VN Map provides province search, GeoJSON visualization and up‑to‑date administrative information to help you explore the new province and ward structure across Vietnam.

### Table of Contents
1. [Features](#features)
2. [Getting started](#getting-started)
    1. [Breaking Changes](#breaking-changes)
    2. [Clone & Deploy with Github and Vercel](#clone-deploy)
    3. [Manual install](#manual-install)
3. [Start up](#start-up)
4. [Coming up (probably)](#coming-up)
6. [Remove / change linting rules](#disable-lint)
7. [WebGL?](#web-gl)
7. [No typescript?](#no-ts)

### <a id="features"></a> 🎇 Features

- 🇻🇳 Interactive Vietnam province map with GeoJSON data
- 🔍 Smart province and ward search with autocomplete
- 📊 Detailed province statistics (population, area, GDP, budget)
- 🎨 Color-coded provinces with hover effects
- 📱 Responsive design with modern UI components
- 🏇 Built on Next.js 14 with Leaflet React
- 😏 TypeScript + strict lint setup
- 🌤 Modular component architecture
- 🐛 Custom marker support
- 📄 Rich popup information
- ⚓️ Custom hooks for map context and data management
- 🏡 Custom UI components (locate, center, tile switcher)

### <a id="getting-started"></a> 🏎 Getting Started

#### <a id="breaking-changes"></a> 💣 Breaking Changes introduced > v0.1.1

In Version v0.1.2, I changed the path aliases to be more consistent with the ES standards from `@alias` to `#alias`. If upgrading from v0.1.1 you have to change the import paths in your components and pages.

```diff
- import { SomeComponent } from '@components/useMap'
+ import { SomeComponent } from '@/components/useMap'
```

#### <a id="clone-deploy"></a> ⛴ Clone & Deploy with Github and Vercel

Create new Github repo with vercel and deploy it within minutes. Could not be easier as hitting some buttons. Shipping of private repos is possible.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcaocuong2404%2Fvn-map)

Later: Check out your repo locally and run ```npm install``` or ```yarn``` in root

Follow Instructions for [Starting Up](#start-up)

#### <a id="manual-install"></a> ⚙️ Manual install

```bash
git clone https://github.com/caocuong2404/vn-map
# then
npm install
# or  
yarn
```

### <a id="start-up"></a> 🏍️ Start up

According the official [Next.js Docs](https://nextjs.org/docs/getting-started):

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Building with type checking and linting

```bash
npm run build
# or
yarn build
```

Start build locally

```bash
npm run start
# or
yarn start
```

### <a id="coming-up"></a> 📊 Upcoming Features

+ Enhanced province statistics dashboard
+ Export map data to various formats
+ Historical data visualization
+ Multi-language support (Vietnamese/English)
+ Administrative boundary updates
+ Mobile app version
+ Integration with Vietnamese government APIs
+ Province comparison tools

- **Feel free to contribute!** 🤗

### <a id="disable-lint"></a> 🤯 How to remove those  linting rules?

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob and I can't be anymore without them. 🥲

### <a id="web-gl"></a> 👽 Web GL based mapping project

Leafleft, graphic-based tile rendering or rasterized zoom levels are not smooth enough and you are in for crazy fast WebGL mapping? Here's my [maplibre next.js ts starter kit](https://github.com/richard-unterberg/maplibre-nextjs-ts-starter)

### <a id="no-ts"></a> 📝 Don't wanna use typscript at all?

See this nice javascript implementation - This repo is heavily inspired by this one:
https://github.com/colbyfayock/next-leaflet-starter

Happy coding! ✌️👽
