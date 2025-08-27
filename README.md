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
- `npm run deploy` - Build and deploy to GitHub Pages

## Deployment

This project is configured for deployment to GitHub Pages using the `gh-pages` package.

### Quick Deployment

To deploy your project to GitHub Pages, simply run:

```bash
npm run deploy
```

This command will:
1. Build the project for production
2. Deploy the built files to the `gh-pages` branch
3. Make your site available at `https://your-username.github.io/mini-viewer/`

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npx gh-pages -d dist
```

### Setup Instructions

Before deploying for the first time:

1. Make sure your repository is pushed to GitHub
2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the sidebar
4. Set the source to "Deploy from a branch"
5. Select the `gh-pages` branch and `/ (root)` folder
6. Click "Save"

Your site will be available at `https://your-username.github.io/mini-viewer/`

## Project Structure

```
mini-viewer/
├── src/
│   ├── main.js          # Main Three.js application
│   └── style.css        # Application styles
├── public/              # Static assets
├── dist/                # Built files (generated)
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics library
- **gh-pages** - Deployment to GitHub Pages
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
