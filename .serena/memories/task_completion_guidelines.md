# VN Map - Task Completion Guidelines

## Before Making Changes
1. **Understand the context**: Check existing patterns and conventions
2. **Review related components**: Understand how components interact
3. **Check TypeScript types**: Ensure type safety is maintained
4. **Consider responsive design**: Test on different screen sizes

## Code Quality Checks
```bash
# Run linting
npm run lint

# Check TypeScript compilation
npx tsc --noEmit

# Format code
npx prettier --check .
# or auto-fix
npx prettier --write .
```

## Testing Changes
1. **Start development server**: `npm run dev`
2. **Test core functionality**:
   - Map loads correctly
   - Province search works
   - Responsive design functions
   - All interactive elements work
3. **Test build**: `npm run build`
4. **Cross-browser testing**: Chrome, Firefox, Safari

## After Completing Task
1. **Code review**: Check your changes follow project conventions
2. **Clean up**: Remove any console.logs, commented code
3. **Commit properly**: Use descriptive commit messages
4. **Update documentation**: If adding new features
5. **Test deployment**: Ensure build works correctly

## Common Issues to Check
- **Leaflet SSR issues**: Ensure dynamic imports for map components
- **TypeScript errors**: Address all type issues
- **Mobile responsiveness**: Test on small screens
- **Performance**: Check for unnecessary re-renders
- **Accessibility**: Ensure ARIA labels and keyboard navigation

## Deployment Considerations
- **Vercel deployment**: Project is configured for Vercel
- **Environment variables**: Check if any are needed
- **API dependencies**: Ensure external APIs are accessible
- **Build optimization**: Check bundle size and performance