import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Cube from "./Cube"; // Import Cube component
import Sphere from "./Sphere"; // Import Triangle component
import TriangularPrism from "./TriangularPrism"; // Import Triangle component

const App = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const rendererRef = useRef(new THREE.WebGLRenderer());

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    // Set up the scene and camera
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the background color to white
    renderer.setClearColor(0xffffff); // White background
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement); // Clean up when component unmounts
    };
  }, []);

  return (
    <div ref={mountRef}>
      <Cube scene={sceneRef.current} />
      <TriangularPrism scene={sceneRef.current} />
      <Sphere scene={sceneRef.current} />
      {/* Later, you can add <Circle /> component here */}
    </div>
  );
};

export default App;
