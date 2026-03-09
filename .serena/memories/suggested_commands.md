# VN Map - Suggested Commands

## Package Management
```bash
# Install dependencies
pnpm install
# or
npm install

# Add new dependency
pnpm add <package-name>
npm install <package-name>
```

## Development Commands
```bash
# Start development server
npm run dev
pnpm dev

# Build for production  
npm run build
pnpm build

# Start production server
npm run start
pnpm start

# Run linting
npm run lint
pnpm lint
```

## System Commands (macOS/Darwin)
```bash
# File operations
ls -la              # List files with details
find . -name "*.tsx" # Find TypeScript React files
grep -r "searchTerm" src/  # Search in source code

# Git operations
git status
git add .
git commit -m "message"
git push origin main

# Process management
ps aux | grep node  # Find Node processes
lsof -i :3000      # Check what's using port 3000
```

## Development Workflow Commands
```bash
# Format code
npx prettier --write .

# Type checking
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next

# Reset node_modules
rm -rf node_modules && pnpm install
```

## Debugging Commands
```bash
# Check Next.js build info
npm run build -- --debug

# Analyze bundle size
npm run build && npm run start
```