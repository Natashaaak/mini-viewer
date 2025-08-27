# Mini Cooper 3D Viewer

An interactive 3D viewer showcasing a detailed Mini Cooper model with realistic lighting and environment mapping. Built with Three.js and Vite, this application provides an immersive experience for exploring the iconic Mini Cooper design in high detail.

## Features

- **High-Quality 3D Model**: Displays a detailed Mini Cooper model with smooth shading and realistic materials
- **Environment Mapping**: Uses HDR environment maps (meadow_2_4k.exr) for realistic reflections and lighting
- **Interactive Controls**: Orbit controls for smooth camera movement and model exploration
- **Responsive Design**: Full-screen canvas that adapts to different screen sizes
- **Optimized Performance**: Efficient rendering with proper shadow mapping and tone mapping
- **Modern Web Technologies**: Built with Three.js and Vite for fast development and deployment

## Technical Highlights

- **Smooth Shading**: Applied vertex normal computation for realistic surface rendering
- **PBR Materials**: Physically-based rendering materials for authentic appearance
- **HDR Environment**: High dynamic range environment mapping for realistic lighting
- **Shadow Mapping**: PCF soft shadow mapping for realistic shadows
- **Tone Mapping**: ACES Filmic tone mapping for cinematic color reproduction

## Live Demo

The application is deployed and available for viewing at: [Mini Cooper 3D Viewer](https://natashaaak.github.io/mini-cooper)

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/natashaaak/mini-cooper.git
cd mini-cooper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
mini-cooper/
├── public/
│   ├── Mini_Cooper.glb    # 3D model file
│   ├── meadow_2_4k.exr    # HDR environment map
│   └── furstenstein_4k.exr # Alternative environment map
├── src/
│   ├── main.js           # Main Three.js application logic
│   └── style.css         # Full-screen layout styles
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## Key Components

### 3D Model Loading
The application uses GLTFLoader to load the Mini Cooper model with automatic smooth shading application and material optimization.

### Environment System
Features a sophisticated environment mapping system using EXR HDR files for realistic lighting and reflections.

### Rendering Pipeline
- WebGL renderer with antialiasing
- Physically correct lighting
- SRGB color space
- Optimized shadow mapping

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production version
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and deploy to GitHub Pages

## Technologies Used

- **[Three.js](https://threejs.org/)** - Advanced 3D graphics library
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)** - GLTF/GLB model loading
- **[EXRLoader](https://threejs.org/docs/#examples/en/loaders/EXRLoader)** - HDR environment map loading
- **[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)** - Interactive camera controls

## Performance Optimizations

- Efficient geometry processing with vertex normal computation
- Optimized material settings for PBR rendering
- Proper texture filtering and mipmap generation
- Responsive design with device pixel ratio optimization

## Browser Compatibility

This application works best in modern browsers with WebGL support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for improvements to the 3D viewer or model presentation.

