import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SolarSystem() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

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
        SCENE + CAMERA
    ========================================================= */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      1,
      0.1,
      1000,
    );

    /* =========================================================
        LIGHTING
    ========================================================= */
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const sunLight = new THREE.PointLight(
      0xffe8b0,
      3.2,
      100,
    );

    scene.add(sunLight);

    /* =========================================================
        STARS
    ========================================================= */
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];

    for (let i = 0; i < 1000; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 240,
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 240,
      );
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        starPositions,
        3,
      ),
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
    });

    const stars = new THREE.Points(
      starGeometry,
      starMaterial,
    );

    scene.add(stars);

    /* =========================================================
        SUN
    ========================================================= */
    const sunGeometry = new THREE.SphereGeometry(
      1.5,
      40,
      40,
    );

    const sunMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xff9900,
      emissiveIntensity: 1.5,
      roughness: 0.7,
    });

    const sun = new THREE.Mesh(
      sunGeometry,
      sunMaterial,
    );

    scene.add(sun);

    /* =========================================================
        PLANETS
    ========================================================= */
    const planets = [
      {
        radius: 0.22,
        color: 0xa8a8a8,
        distance: 3,
        speed: 2.4,
      },
      {
        radius: 0.4,
        color: 0xd6b071,
        distance: 4.4,
        speed: 1.6,
      },
      {
        radius: 0.44,
        color: 0x4a7eb8,
        distance: 6,
        speed: 1,
        moon: true,
      },
      {
        radius: 0.32,
        color: 0xad4a2c,
        distance: 7.8,
        speed: 0.7,
      },
      {
        radius: 0.82,
        color: 0xd2b48c,
        distance: 10.5,
        speed: 0.32,
      },
      {
        radius: 0.72,
        color: 0xd6c584,
        distance: 13.5,
        speed: 0.22,
        rings: true,
      },
      {
        radius: 0.55,
        color: 0x75a8b8,
        distance: 16,
        speed: 0.15,
      },
      {
        radius: 0.52,
        color: 0x4267a8,
        distance: 18,
        speed: 0.1,
      },
    ];

    const disposableObjects = [];

    const planetGroups = planets.map((planet) => {
      /* Orbit */
      const orbitGeometry = new THREE.RingGeometry(
        planet.distance - 0.012,
        planet.distance + 0.012,
        128,
      );

      const orbitMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.07,
        });

      const orbit = new THREE.Mesh(
        orbitGeometry,
        orbitMaterial,
      );

      orbit.rotation.x = Math.PI / 2;

      scene.add(orbit);

      disposableObjects.push(
        orbitGeometry,
        orbitMaterial,
      );

      /* Planet container */
      const group = new THREE.Group();

      /* Planet */
      const planetGeometry =
        new THREE.SphereGeometry(
          planet.radius,
          32,
          32,
        );

      const planetMaterial =
        new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.85,
          metalness: 0.02,
        });

      const planetMesh = new THREE.Mesh(
        planetGeometry,
        planetMaterial,
      );

      planetMesh.position.x =
        planet.distance;

      group.add(planetMesh);

      disposableObjects.push(
        planetGeometry,
        planetMaterial,
      );

      /* Moon */
      if (planet.moon) {
        const moonGroup = new THREE.Group();

        moonGroup.position.x =
          planet.distance;

        const moonGeometry =
          new THREE.SphereGeometry(
            0.11,
            16,
            16,
          );

        const moonMaterial =
          new THREE.MeshStandardMaterial({
            color: 0xbcbcbc,
            roughness: 1,
          });

        const moon = new THREE.Mesh(
          moonGeometry,
          moonMaterial,
        );

        moon.position.x = 0.75;

        moonGroup.add(moon);
        group.add(moonGroup);

        group.userData.moonGroup =
          moonGroup;

        disposableObjects.push(
          moonGeometry,
          moonMaterial,
        );
      }

      /* Saturn rings */
      if (planet.rings) {
        const ringGeometry =
          new THREE.RingGeometry(
            planet.radius * 1.4,
            planet.radius * 2.1,
            64,
          );

        const ringMaterial =
          new THREE.MeshBasicMaterial({
            color: 0xbfa77a,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.55,
          });

        const ring = new THREE.Mesh(
          ringGeometry,
          ringMaterial,
        );

        ring.position.x =
          planet.distance;

        ring.rotation.x =
          Math.PI / 2.6;

        group.add(ring);

        disposableObjects.push(
          ringGeometry,
          ringMaterial,
        );
      }

      scene.add(group);

      return {
        group,
        planet,
        angle:
          Math.random() * Math.PI * 2,
      };
    });

    /* =========================================================
        CAMERA CONTROLS
    ========================================================= */
    let dragging = false;

    let previousX = 0;
    let previousY = 0;

    let theta = 0;
    let phi = 0.55;
    let distance = 23;

    let velocityTheta = 0;
    let velocityPhi = 0;

    let time = 0;
    let moonAngle = 0;

    const handlePointerDown = (event) => {
      dragging = true;

      previousX = event.clientX;
      previousY = event.clientY;

      velocityTheta = 0;
      velocityPhi = 0;

      canvas.setPointerCapture?.(
        event.pointerId,
      );
    };

    const handlePointerMove = (event) => {
      if (!dragging) return;

      const deltaX =
        event.clientX - previousX;

      const deltaY =
        event.clientY - previousY;

      velocityTheta = deltaX * 0.006;
      velocityPhi = deltaY * 0.004;

      theta += velocityTheta;

      phi = Math.max(
        0.25,
        Math.min(
          1.25,
          phi + velocityPhi,
        ),
      );

      previousX = event.clientX;
      previousY = event.clientY;
    };

    const handlePointerUp = () => {
      dragging = false;
    };

    const handleWheel = (event) => {
      distance = Math.max(
        15,
        Math.min(
          32,
          distance + event.deltaY * 0.015,
        ),
      );
    };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp,
    );

    canvas.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      },
    );

    /* =========================================================
        RESPONSIVE SIZE
    ========================================================= */
    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      renderer.setSize(
        width,
        height,
        false,
      );

      camera.aspect = width / height;

      camera.updateProjectionMatrix();
    };

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(container);

    resize();

    /* =========================================================
        ANIMATION
    ========================================================= */
    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      time += 0.008;
      moonAngle += 0.035;

      sun.rotation.y += 0.002;

      stars.rotation.y += 0.00004;

      planetGroups.forEach(
        ({
          group,
          planet,
          angle,
        }) => {
          group.rotation.y =
            angle +
            time * planet.speed;

          if (
            group.userData.moonGroup
          ) {
            group.userData.moonGroup.rotation.y =
              moonAngle;
          }
        },
      );

      if (!dragging) {
        velocityTheta *= 0.92;
        velocityPhi *= 0.92;

        theta +=
          velocityTheta * 0.3;

        phi +=
          velocityPhi * 0.15;

        phi = Math.max(
          0.25,
          Math.min(1.25, phi),
        );
      }

      camera.position.set(
        distance *
          Math.sin(phi) *
          Math.sin(theta),

        distance *
          Math.cos(phi),

        distance *
          Math.sin(phi) *
          Math.cos(theta),
      );

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    /* =========================================================
        CLEANUP
    ========================================================= */
    return () => {
      cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );

      canvas.removeEventListener(
        "wheel",
        handleWheel,
      );

      starGeometry.dispose();
      starMaterial.dispose();

      sunGeometry.dispose();
      sunMaterial.dispose();

      disposableObjects.forEach(
        (resource) => {
          resource.dispose?.();
        },
      );

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-[360px]
        w-full
        overflow-hidden
        sm:h-[440px]
        lg:h-[520px]
      "
    >
      {/* Helper */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-zinc-700">
          Drag to explore · Scroll to zoom
        </p>
      </div>

      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}