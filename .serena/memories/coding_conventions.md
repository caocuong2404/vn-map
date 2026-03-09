# VN Map - Coding Conventions & Style Guide

## TypeScript Configuration
- **Strict mode enabled**: All strict TypeScript checks
- **Path aliases**: 
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - `@/hooks/*` → `./src/hooks/*`
  - `#pages/*` → `./src/pages/*`
  - `#src/*` → `./src/*`
  - `#root/*` → `./*`

## Naming Conventions
- **Components**: PascalCase (e.g., `LeafletMapContainer`, `ProvinceSearch`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE (e.g., `MOBILE_BREAKPOINT`)
- **Interfaces**: PascalCase with descriptive suffix (e.g., `ProvinceSearchProps`, `TileProvider`)

## Code Organization
- **Default exports**: Used for main components
- **Named exports**: Used for utilities and secondary components
- **Component structure**: Props interface → Component → Default export
- **Hooks**: Custom hooks prefixed with `use` (e.g., `useMapContext`)

## Import Organization
- **External libraries** first
- **Internal imports** by path depth
- **Type imports** explicitly marked with `type`

## Component Patterns
- **Functional components** with TypeScript
- **Props interfaces** defined before component
- **Forward refs** used where needed (Radix UI components)
- **Context providers** for shared state
- **Custom hooks** for reusable logic

## Styling Approach
- **Tailwind classes**: Utility-first approach
- **Component variants**: Using class-variance-authority
- **Conditional styling**: Using clsx/tailwind-merge via `cn()` utility
- **Responsive design**: Mobile-first breakpoints