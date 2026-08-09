// src/components/RubiksCube.jsx

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RubiksCube() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    /* =========================================================
       ACCESSIBILITY
    ========================================================= */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* =========================================================
       RENDERER
    ========================================================= */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setClearColor(0x000000, 0);

    /* =========================================================
       SCENE
    ========================================================= */
    const scene = new THREE.Scene();

    /* =========================================================
       CAMERA
    ========================================================= */
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

    camera.position.set(5.5, 4.5, 6.5);
    camera.lookAt(0, 0, 0);

    /* =========================================================
       LIGHTS
    ========================================================= */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);

    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);

    directionalLight.position.set(5, 8, 7);

    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.25);

    fillLight.position.set(-5, -2, -5);

    scene.add(fillLight);

    /* =========================================================
       RUBIK'S CUBE
    ========================================================= */
    const FACE_COLORS = {
      red: 0xd84a4a,
      orange: 0xe89a4a,
      yellow: 0xe4cf55,
      green: 0x55a96d,
      blue: 0x5281b8,
      white: 0xe7e7e7,
      black: 0x111111,
    };

    const GAP = 1.045;

    const cubeGroup = new THREE.Group();

    const geometries = [];
    const materials = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(0.96, 0.96, 0.96);

          geometries.push(geometry);

          const faceColors = [
            x === 1 ? FACE_COLORS.red : FACE_COLORS.black,

            x === -1 ? FACE_COLORS.orange : FACE_COLORS.black,

            y === 1 ? FACE_COLORS.yellow : FACE_COLORS.black,

            y === -1 ? FACE_COLORS.green : FACE_COLORS.black,

            z === 1 ? FACE_COLORS.blue : FACE_COLORS.black,

            z === -1 ? FACE_COLORS.white : FACE_COLORS.black,
          ];

          const cubeMaterials = faceColors.map((color) => {
            const material = new THREE.MeshStandardMaterial({
              color,
              roughness: 0.55,
              metalness: 0.02,
            });

            materials.push(material);

            return material;
          });

          const cubie = new THREE.Mesh(geometry, cubeMaterials);

          cubie.position.set(x * GAP, y * GAP, z * GAP);

          cubeGroup.add(cubie);
        }
      }
    }

    cubeGroup.rotation.x = 0.35;
    cubeGroup.rotation.y = -0.45;

    scene.add(cubeGroup);

    /* =========================================================
       POINTER INTERACTION
    ========================================================= */
    let isDragging = false;

    let previousX = 0;
    let previousY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let resumeTimer = null;

    let autoRotate = !prefersReducedMotion;

    const onPointerDown = (event) => {
      isDragging = true;
      autoRotate = false;

      previousX = event.clientX;
      previousY = event.clientY;

      velocityX = 0;
      velocityY = 0;

      if (resumeTimer) {
        clearTimeout(resumeTimer);
      }

      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousX;

      const deltaY = event.clientY - previousY;

      velocityX = deltaY * 0.006;
      velocityY = deltaX * 0.006;

      cubeGroup.rotation.x += velocityX;
      cubeGroup.rotation.y += velocityY;

      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onPointerUp = () => {
      if (!isDragging) return;

      isDragging = false;

      if (!prefersReducedMotion) {
        resumeTimer = setTimeout(() => {
          autoRotate = true;
        }, 1800);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);

    window.addEventListener("pointermove", onPointerMove);

    window.addEventListener("pointerup", onPointerUp);

    /* =========================================================
       RESPONSIVE RENDERER
    ========================================================= */
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    resize();

    /* =========================================================
       ANIMATION
    ========================================================= */
    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      if (autoRotate) {
        /*
         * Keep it intentionally slow.
         * It should feel like a detail, not an animation demo.
         */
        cubeGroup.rotation.y += 0.006;
        cubeGroup.rotation.x += 0.002;
      } else if (!isDragging) {
        /*
         * Drag inertia
         */
        velocityX *= 0.94;
        velocityY *= 0.94;

        cubeGroup.rotation.x += velocityX;
        cubeGroup.rotation.y += velocityY;
      }

      renderer.render(scene, camera);
    };

    animate();

    /* =========================================================
       CLEANUP
    ========================================================= */
    return () => {
      cancelAnimationFrame(animationFrame);

      if (resumeTimer) {
        clearTimeout(resumeTimer);
      }

      resizeObserver.disconnect();

      canvas.removeEventListener("pointerdown", onPointerDown);

      window.removeEventListener("pointermove", onPointerMove);

      window.removeEventListener("pointerup", onPointerUp);

      geometries.forEach((geometry) => {
        geometry.dispose();
      });

      materials.forEach((material) => {
        material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-full
        w-full
        touch-none
        overflow-hidden
      "
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive Rubik's Cube"
        className="
          block
          h-full
          w-full
          cursor-grab
          active:cursor-grabbing
        "
      />
    </div>
  );
}
