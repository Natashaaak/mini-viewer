import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class ThreeJSApp {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animationId = null;
    this.model = null;
    this.skySphere = null;
    
    this.init();
    this.animate();
  }

  init() {
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
    this.renderer.toneMappingExposure = 1.0;
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
    const exrLoader = new EXRLoader();
    exrLoader.load('./meadow_2_4k.exr', (hdrEquirect) => {
      const envMap = this.pmrem.fromEquirectangular(hdrEquirect).texture;
      this.scene.environment = envMap;
      this.scene.background = envMap;
      this.pmrem.dispose();
      console.log('Environment map loaded successfully!');
    }, (progress) => {}, (error) => {
      console.error('Error loading environment map:', error);
    });
  }

  async loadModel(modelPath) {
    console.log('Loading model from:', modelPath);
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync(modelPath);
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
            if (mat.envMapIntensity == null) mat.envMapIntensity = 0.5;
            // Enable smooth shading by setting flatShading to false
            mat.flatShading = false;
          }
        });
      }
    });

    this.model = root;
    this.scene.add(this.model);
    console.log('Model ready:', modelPath);
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
