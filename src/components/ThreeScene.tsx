
import { useRef, useEffect } from 'react';

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a script element to add Three.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      // Only initialize Three.js once the library has loaded
      initThree();
    };
    
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initThree = () => {
    if (!window.THREE || !canvasRef.current) return;
    
    const { Scene, PerspectiveCamera, WebGLRenderer, MathUtils, BoxGeometry, 
            SphereGeometry, MeshStandardMaterial, Mesh, AmbientLight, DirectionalLight,
            Vector2 } = window.THREE;
    
    // Setup scene
    const scene = new Scene();
    scene.background = null; // Transparent background
    
    // Setup camera
    const camera = new PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true, // Transparent background
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create floating books - representing education
    const books = [];
    const bookMaterials = [
      new MeshStandardMaterial({ color: 0x5d89ba, roughness: 0.3 }),
      new MeshStandardMaterial({ color: 0x6a9c89, roughness: 0.3 }),
      new MeshStandardMaterial({ color: 0x8a7e72, roughness: 0.3 }),
    ];
    
    for (let i = 0; i < 5; i++) {
      const width = 0.5 + Math.random() * 0.5;
      const height = 0.05 + Math.random() * 0.2;
      const depth = 0.7 + Math.random() * 0.3;
      
      const geometry = new BoxGeometry(width, height, depth);
      const material = bookMaterials[i % bookMaterials.length];
      const book = new Mesh(geometry, material);
      
      book.position.x = (Math.random() - 0.5) * 5;
      book.position.y = (Math.random() - 0.5) * 5;
      book.position.z = (Math.random() - 0.5) * 3;
      
      book.rotation.x = Math.random() * Math.PI;
      book.rotation.y = Math.random() * Math.PI;
      book.rotation.z = Math.random() * Math.PI;
      
      book.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
        floatSpeed: 0.001 + Math.random() * 0.003,
        floatHeight: Math.random() * 0.2,
        initialY: book.position.y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      
      scene.add(book);
      books.push(book);
    }
    
    // Add some spheres representing atoms/molecules (science theme)
    const particles = [];
    const particleMaterials = [
      new MeshStandardMaterial({ color: 0x5271ff, roughness: 0.1, metalness: 0.8 }),
      new MeshStandardMaterial({ color: 0xff52bf, roughness: 0.1, metalness: 0.8 }),
    ];
    
    for (let i = 0; i < 10; i++) {
      const radius = 0.1 + Math.random() * 0.15;
      const geometry = new SphereGeometry(radius, 16, 16);
      const material = particleMaterials[i % particleMaterials.length];
      const particle = new Mesh(geometry, material);
      
      particle.position.x = (Math.random() - 0.5) * 8;
      particle.position.y = (Math.random() - 0.5) * 8;
      particle.position.z = (Math.random() - 0.5) * 3 - 2;
      
      particle.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: 0.002 + Math.random() * 0.004,
        floatRadius: 0.2 + Math.random() * 0.4,
        initialY: particle.position.y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      
      scene.add(particle);
      particles.push(particle);
    }
    
    // Mouse effect
    const mouse = new Vector2();
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    function onDocumentMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX - windowHalfX) / 100;
      mouse.y = (event.clientY - windowHalfY) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Subtle camera movement based on mouse
      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Animate books
      const time = Date.now() * 0.001;
      books.forEach(book => {
        const { rotationSpeed, floatSpeed, floatHeight, initialY, floatOffset } = book.userData;
        
        // Rotate
        book.rotation.x += rotationSpeed.x;
        book.rotation.y += rotationSpeed.y;
        book.rotation.z += rotationSpeed.z;
        
        // Float up and down with sine wave
        book.position.y = initialY + Math.sin(time * floatSpeed + floatOffset) * floatHeight;
      });
      
      // Animate particles
      particles.forEach(particle => {
        const { rotationSpeed, floatSpeed, floatRadius, initialY, floatOffset } = particle.userData;
        
        // Rotate
        particle.rotation.x += rotationSpeed.x;
        particle.rotation.y += rotationSpeed.y;
        particle.rotation.z += rotationSpeed.z;
        
        // Circular motion
        particle.position.x += Math.sin(time * floatSpeed) * 0.01;
        particle.position.y = initialY + Math.cos(time * floatSpeed + floatOffset) * floatRadius;
      });
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      renderer.dispose();
    };
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

declare global {
  interface Window {
    THREE: any;
  }
}

export default ThreeScene;
