# Three.js Mini Viewer

A beautiful 3D graphics application built with Vite and Three.js, featuring a rotating cube with dynamic lighting effects.

## Features

- 🎨 Real-time 3D rendering with Three.js
- ✨ Dynamic lighting with ambient, directional, and point lights
- 🔄 Smooth animation with requestAnimationFrame
- 📱 Responsive design that adapts to window resizing
- 🚀 Optimized for GitHub Pages deployment

## Live Demo

Visit the live demo: [Three.js Mini Viewer](https://your-username.github.io/mini-viewer/)

## Local Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/mini-viewer.git
cd mini-viewer
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory

### Automatic Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the project to GitHub Pages when changes are pushed to the main branch.

To enable automatic deployment:

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the sidebar
4. Select "GitHub Actions" as the source
5. The workflow will automatically deploy your site

## Project Structure

```
mini-viewer/
├── src/
│   ├── main.js          # Main Three.js application
│   └── style.css        # Application styles
├── public/              # Static assets
├── .github/workflows/   # GitHub Actions workflows
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics library
- **GitHub Actions** - CI/CD for automatic deployment
- **GitHub Pages** - Static site hosting

## Customization

### Changing the 3D Scene

Edit `src/main.js` to modify the 3D scene:

- Add new geometries and materials
- Modify lighting setup
- Change animation behavior
- Add user interactions

### Styling

Edit `src/style.css` to customize the appearance:

- Change colors and fonts
- Modify UI elements
- Add responsive design rules

### Configuration

Edit `vite.config.js` to adjust build settings:

- Change the base path for different deployment locations
- Modify build optimization settings
- Add plugins or additional configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Three.js](https://threejs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)
