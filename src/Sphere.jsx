import { useEffect, useRef } from "react";
import * as THREE from "three";

const Sphere = ({ scene }) => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const edgesRef = useRef();

  useEffect(() => {
    // Create a group that will act as the pivot point for rotation
    const group = new THREE.Group();

    // Create Sphere Geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32); // Radius 1, 32 segments
    const material = new THREE.MeshBasicMaterial({ color: 0x556b2f });
    const sphere = new THREE.Mesh(geometry, material);
    // Position the sphere relative to the group (e.g., 3 units along the x-axis)
    sphere.position.x = 3; // The sphere will rotate around this distance from the center
    // Add the sphere to the group
    group.add(sphere);
    // Store references for rotation

    // Create Edges for the Sphere
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x0f402c });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.position.x = 3; // Match the position of the sphere
    group.add(edges);
    scene.add(group);
    groupRef.current = group;
    sphereRef.current = sphere;
    edgesRef.current = edges;

    return () => {
      // Cleanup: Remove sphere and edges from the scene
      scene.remove(group);
    };
  }, [scene]);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
      }
      if (sphereRef && edgesRef) {
        sphereRef.current.rotation.x += 0.005;
        edgesRef.current.rotation.x += 0.005;
      }
    };
    animate();
  }, []);

  return null;
};

export default Sphere;
