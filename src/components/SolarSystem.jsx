import { useEffect, useRef } from "react";
import * as THREE from "three";

const planets = [
  { name: "Mercury", label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"], target: "skills", radius: 0.22, color: 0xa8a8a8, distance: 3, speed: 2.4 },
  { name: "Venus", label: "Mobile", skills: ["React Native", "Expo"], target: "skills", radius: 0.4, color: 0xd6b071, distance: 4.4, speed: 1.6 },
  { name: "Earth", label: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "Python"], target: "skills", radius: 0.44, color: 0x4a7eb8, distance: 6, speed: 1, moon: true },
  { name: "Mars", label: "Databases", skills: ["PostgreSQL", "MongoDB", "Supabase", "SQL"], target: "skills", radius: 0.32, color: 0xad4a2c, distance: 7.8, speed: 0.7 },
  { name: "Jupiter", label: "Projects", skills: ["Production apps", "Payments", "Realtime", "Assessments"], target: "projects", radius: 0.82, color: 0xd2b48c, distance: 10.5, speed: 0.32 },
  { name: "Saturn", label: "Cloud & DevOps", skills: ["AWS", "Docker", "Linux", "Networking"], target: "skills", radius: 0.72, color: 0xd6c584, distance: 13.5, speed: 0.22, rings: true },
  { name: "Uranus", label: "GitHub", skills: ["Repositories", "Git", "Open source work"], target: "github", radius: 0.55, color: 0x75a8b8, distance: 16, speed: 0.15 },
  { name: "Neptune", label: "Contact", skills: ["Email", "LinkedIn", "Resume"], target: "contact", radius: 0.52, color: 0x4267a8, distance: 18, speed: 0.1 },
];

export default function SolarSystem({ onSelect }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const callbackRef = useRef(onSelect);

  useEffect(() => {
    callbackRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const sunLight = new THREE.PointLight(0xffe8b0, 3.2, 100);
    scene.add(sunLight);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 900; i += 1) {
      starPositions.push((Math.random() - 0.5) * 240, (Math.random() - 0.5) * 160, (Math.random() - 0.5) * 240);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.42 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const sunGeometry = new THREE.SphereGeometry(1.5, 40, 40);
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xff9900, emissiveIntensity: 1.5, roughness: 0.7 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData.meta = { name: "Sun", label: "Rahul Kapgate", skills: ["Full Stack Developer", "Web", "Mobile", "Systems"], target: "about" };
    scene.add(sun);

    const disposableObjects = [];
    const clickTargets = [sun];

    const planetGroups = planets.map((planet) => {
      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.012, planet.distance + 0.012, 128);
      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.07 });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      disposableObjects.push(orbitGeometry, orbitMaterial);

      const group = new THREE.Group();
      const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({ color: planet.color, roughness: 0.85, metalness: 0.02 });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      planetMesh.position.x = planet.distance;
      planetMesh.userData.meta = planet;
      group.add(planetMesh);
      clickTargets.push(planetMesh);
      disposableObjects.push(planetGeometry, planetMaterial);

      if (planet.moon) {
        const moonGroup = new THREE.Group();
        moonGroup.position.x = planet.distance;
        const moonGeometry = new THREE.SphereGeometry(0.11, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 1 });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.x = 0.75;
        moonGroup.add(moon);
        group.add(moonGroup);
        group.userData.moonGroup = moonGroup;
        disposableObjects.push(moonGeometry, moonMaterial);
      }

      if (planet.rings) {
        const ringGeometry = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.1, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xbfa77a, side: THREE.DoubleSide, transparent: true, opacity: 0.55 });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.x = planet.distance;
        ring.rotation.x = Math.PI / 2.6;
        group.add(ring);
        disposableObjects.push(ringGeometry, ringMaterial);
      }

      scene.add(group);
      return { group, planet, angle: Math.random() * Math.PI * 2 };
    });

    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let startX = 0;
    let startY = 0;
    let theta = 0;
    let phi = 0.55;
    let distance = 23;
    let velocityTheta = 0;
    let velocityPhi = 0;
    let time = 0;
    let moonAngle = 0;
    let animationFrame = null;
    let isInView = true;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const pick = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(clickTargets, false)[0];
      if (hit?.object?.userData?.meta) callbackRef.current?.(hit.object.userData.meta);
    };

    const handlePointerDown = (event) => {
      dragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      startX = event.clientX;
      startY = event.clientY;
      velocityTheta = 0;
      velocityPhi = 0;
      canvas.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!dragging) return;
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      velocityTheta = deltaX * 0.006;
      velocityPhi = deltaY * 0.004;
      theta += velocityTheta;
      phi = Math.max(0.25, Math.min(1.25, phi + velocityPhi));
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const handlePointerUp = (event) => {
      if (!dragging) return;
      dragging = false;
      if (Math.hypot(event.clientX - startX, event.clientY - startY) < 5) pick(event);
    };

    const handleWheel = (event) => {
      distance = Math.max(15, Math.min(32, distance + event.deltaY * 0.015));
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("wheel", handleWheel, { passive: true });

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

    const animate = () => {
      if (!isInView) {
        animationFrame = null;
        return;
      }

      if (!reducedMotion) {
        time += 0.008;
        moonAngle += 0.035;
        sun.rotation.y += 0.002;
        stars.rotation.y += 0.00004;
        planetGroups.forEach(({ group, planet, angle }) => {
          group.rotation.y = angle + time * planet.speed;
          if (group.userData.moonGroup) group.userData.moonGroup.rotation.y = moonAngle;
        });
      }

      if (!dragging) {
        velocityTheta *= 0.92;
        velocityPhi *= 0.92;
        theta += velocityTheta * 0.3;
        phi = Math.max(0.25, Math.min(1.25, phi + velocityPhi * 0.15));
      }

      camera.position.set(distance * Math.sin(phi) * Math.sin(theta), distance * Math.cos(phi), distance * Math.sin(phi) * Math.cos(theta));
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame == null) animationFrame = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) startAnimation();
        else if (animationFrame != null) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(container);
    startAnimation();

    return () => {
      if (animationFrame != null) cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("wheel", handleWheel);
      starGeometry.dispose();
      starMaterial.dispose();
      sunGeometry.dispose();
      sunMaterial.dispose();
      disposableObjects.forEach((resource) => resource.dispose?.());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]">
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-zinc-700">Drag · Scroll · Click a planet</p>
      </div>
      <canvas ref={canvasRef} aria-label="Interactive developer solar system" className="block h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
