import { useEffect, useRef } from "react";
import * as THREE from "three";

const TriangularPrism = ({ scene }) => {
  const groupRef = useRef();
  const prismRef = useRef();
  const edgesRef = useRef();

  useEffect(() => {
    const group = new THREE.Group();
    // Create a triangular prism using CylinderGeometry with 3 radial segments
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 3); // Radius 1, Height 2, 3 radial segments (triangle)
    const material = new THREE.MeshBasicMaterial({
      color: 0x33415c,
      side: THREE.DoubleSide,
    });
    const prism = new THREE.Mesh(geometry, material);
    prism.position.x = -3; // Position the prism

    // Apply scaling transformation to make it smaller
    prism.scale.set(0.5, 0.5, 0.5); // Scale down by 50%
    group.add(prism);
    prismRef.current = prism;

    // Create edges for the triangular prism
    const edgesGeometry = new THREE.EdgesGeometry(geometry); // Generates edges for the prism
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x1f2a3e }); // Black color for edges
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.position.x = -3; // Position the edges to match the prism
    edges.scale.set(0.5, 0.5, 0.5); // Scale edges down to match the prism
    group.add(edges);
    scene.add(group);
    groupRef.current = group;
    edgesRef.current = edges;

    return () => {
      scene.remove(group); // Clean up when component unmounts
    };
  }, [scene]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
      }
      if (prismRef && edgesRef) {
        prismRef.current.rotation.x += 0.005;
        edgesRef.current.rotation.x += 0.005;
      }
    };
    animate();
  }, []);

  return null;
};

export default TriangularPrism;
