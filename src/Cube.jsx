import { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube = ({ scene }) => {
  const groupRef = useRef();
  const cubeRef = useRef();
  const edgesRef = useRef();

  useEffect(() => {
    // Create a group that will act as the pivot point for rotation
    const group = new THREE.Group();

    // Create Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffd166 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0; // Move cube to the left
    group.add(cube);

    // Create Edges for the Cube (Horizontal and Vertical only)
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xd4a745 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.position.x = 0; // Align edges with the cube
    group.add(edges);
    scene.add(group);
    groupRef.current = group;
    cubeRef.current = cube;
    edgesRef.current = edges;

    return () => {
      scene.remove(group); // Clean up when component unmounts
    };
  }, [scene]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      if (groupRef.current) {
        groupRef.current.rotation.x += 0.005;
        groupRef.current.rotation.y += 0.005;
      }
    };
    animate();
  }, []);

  return null;
};

export default Cube;
