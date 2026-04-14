import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RubiksCube() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(5, 4, 6);
    camera.lookAt(0, 0, 0);

    const FACE_COLORS = [0xE53E3E, 0xF6AD55, 0xF6E05E, 0x68D391, 0x63B3ED, 0xFFFAF0];
    const gap = 1.05;
    const group = new THREE.Group();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geo = new THREE.BoxGeometry(1, 1, 1);
          const mats = [
            x === 1  ? FACE_COLORS[0] : 0x111111,
            x === -1 ? FACE_COLORS[1] : 0x111111,
            y === 1  ? FACE_COLORS[2] : 0x111111,
            y === -1 ? FACE_COLORS[3] : 0x111111,
            z === 1  ? FACE_COLORS[4] : 0x111111,
            z === -1 ? FACE_COLORS[5] : 0x111111,
          ].map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.25 }));
          const cubie = new THREE.Mesh(geo, mats);
          cubie.position.set(x * gap, y * gap, z * gap);
          group.add(cubie);
        }
      }
    }
    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    let isDragging = false, prev = { x: 0, y: 0 };
    let autoRotate = true, velX = 0, velY = 0;

    const onDown = e => { isDragging = true; autoRotate = false; prev = { x: e.clientX, y: e.clientY }; velX = velY = 0; };
    const onUp = () => { isDragging = false; setTimeout(() => { autoRotate = true; }, 2000); };
    const onMove = e => {
      if (!isDragging) return;
      velX = (e.clientY - prev.y) * 0.005;
      velY = (e.clientX - prev.x) * 0.005;
      group.rotation.x += velX;
      group.rotation.y += velY;
      prev = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (autoRotate) { group.rotation.y += 0.006; group.rotation.x += 0.002; }
      else if (!isDragging) { velX *= 0.95; velY *= 0.95; group.rotation.x += velX; group.rotation.y += velY; }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ aspectRatio: "1" }} />;
}