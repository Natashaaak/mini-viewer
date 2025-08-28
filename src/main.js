import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Suppress console warnings for HDR value overflow
const originalWarn = console.warn;
console.warn = function(...args) {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.DataUtils.toHalfFloat(): Value out of range')) {
    return; // Suppress this specific warning
  }
  originalWarn.apply(console, args);
};

class ThreeJSApp {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animationId = null;
    this.model = null;
    this.skySphere = null;
    this.loadingProgress = 0;
    this.loadingSteps = {
      init: 10,
      environment: 30,
      model: 60
    };
    
    this.init();
    this.animate();
  }

  init() {
    this.updateLoading('Initializing 3D scene...', this.loadingSteps.init);
    
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(7, 3, 7);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0; // Restored to normal exposure
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.physicallyCorrectLights = true;

    // Add renderer to DOM
    const app = document.querySelector('#app');
    app.appendChild(this.renderer.domElement);

    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;

    // Load environment map
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.pmrem.compileEquirectangularShader();
    this.loadEnvironmentMap();

    // Load the Mini Cooper model
    this.loadModel('./Mini_Cooper.glb');

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

    loadEnvironmentMap() {
    this.updateLoading('Loading environment map...', this.loadingSteps.init + 5);
    
    const exrLoader = new EXRLoader();
    exrLoader.load('./meadow_2_4k.exr', (hdrEquirect) => {
      try {
        this.updateLoading('Processing environment map...', this.loadingSteps.init + 15);
        
        // Set proper mapping for the HDR texture
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        
        // Create environment map
        const envMap = this.pmrem.fromEquirectangular(hdrEquirect).texture;
        
        // Set environment map for reflections
        this.scene.environment = envMap;
        
        // Set background
        this.scene.background = envMap;
        
        // Clean up
        this.pmrem.dispose();
        hdrEquirect.dispose();
        
        this.updateLoading('Environment map loaded successfully!', this.loadingSteps.environment);
        console.log('Environment map loaded successfully!');
      } catch (error) {
        console.error('Error processing environment map:', error);
        // Fallback to a simple color background
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.updateLoading('Environment map loaded with fallback', this.loadingSteps.environment);
      }
    }, (progress) => {
      if (progress.lengthComputable) {
        const percent = Math.round((progress.loaded / progress.total) * 20) + this.loadingSteps.init + 5;
        this.updateLoading('Loading environment map...', percent);
      }
    }, (error) => {
      console.error('Error loading environment map:', error);
      // Fallback to a simple color background
      this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
      this.updateLoading('Environment map loaded with fallback', this.loadingSteps.environment);
    });
  }

  async loadModel(modelPath) {
    this.updateLoading('Loading Mini Cooper model...', this.loadingSteps.environment + 10);
    console.log('Loading model from:', modelPath);
    
    const loader = new GLTFLoader();
    
    try {
      const gltf = await loader.loadAsync(modelPath);
      this.updateLoading('Processing model materials...', this.loadingSteps.environment + 30);
      console.log('Mini Cooper model loaded successfully!');
      
      // prepare instance
      const root = gltf.scene || gltf.scenes[0];
      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Apply smooth shading to geometry
          if (child.geometry) {
            child.geometry.computeVertexNormals();
          }

          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.filter(Boolean).forEach((mat) => {
            const isPBR = mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial;
            if (isPBR) {
              // Set environment map intensity for proper reflections
              mat.envMapIntensity = 0.5;
              // Enable smooth shading
              mat.flatShading = false;
              // Ensure proper color space handling
              mat.needsUpdate = true;
            }
          });
        }
      });

      this.model = root;
      this.scene.add(this.model);
      
      this.updateLoading('Model ready!', 100);
      console.log('Model ready:', modelPath);
      
      // Hide loading box after a short delay
      setTimeout(() => {
        this.hideLoading();
      }, 1000);
      
    } catch (error) {
      console.error('Error loading model:', error);
      this.updateLoading('Error loading model', 100);
      setTimeout(() => {
        this.hideLoading();
      }, 2000);
    }
  }

  updateLoading(text, progress) {
    const loadingText = document.getElementById('loadingText');
    const loadingBar = document.getElementById('loadingBar');
    const loadingDetails = document.getElementById('loadingDetails');
    
    if (loadingText) loadingText.textContent = text;
    if (loadingBar) loadingBar.style.width = progress + '%';
    
    // Update details based on progress
    if (loadingDetails) {
      if (progress < 30) {
        loadingDetails.textContent = 'Setting up 3D environment...';
      } else if (progress < 60) {
        loadingDetails.textContent = 'Loading high-quality environment map...';
      } else if (progress < 90) {
        loadingDetails.textContent = 'Processing Mini Cooper model...';
      } else {
        loadingDetails.textContent = 'Almost ready!';
      }
    }
  }
  
  hideLoading() {
    const loadingBox = document.getElementById('loadingBox');
    if (loadingBox) {
      loadingBox.classList.add('hidden');
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer.dispose();
  }
}

// Initialize the app
const app = new ThreeJSApp();

// Make app globally available for debugging
window.app = app;

// Handle page unload
window.addEventListener('beforeunload', () => {
  app.dispose();
});
