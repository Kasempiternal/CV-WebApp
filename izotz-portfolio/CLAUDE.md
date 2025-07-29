# Portfolio Project - Development Notes

## Commands

### Development
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

## Recent Enhancements

### 3D Driving Experience
- Fixed camera positioning for better road visibility
- Implemented parallax scrolling for environmental elements
- Created 3D animated text notifications that emerge from the ground
- Enhanced all building architectures with detailed 3D models:
  - Iurreta LHI: Technical school with workshops and modern facilities
  - University of Deusto: Neo-Gothic architecture with spires and arches
  - Ormazabal: Industrial facility with transformers and solar panels
  - Ariadna: Modern glass office building with helipad
  - TECNALIA: Futuristic research center with advanced features
- Added weather effects including rain and fog
- Added roadside elements: street lights, signs, guard rails
- Integrated ambient particles and atmospheric effects

### Known Issues
- Some ESLint warnings about unused variables (non-critical)
- Build process may take time due to Three.js optimizations

### Font Requirements
The 3D text animations require the following fonts in `/public/fonts/`:
- `Inter-Bold.woff`
- `Inter-Regular.woff`

These can be downloaded from Google Fonts.