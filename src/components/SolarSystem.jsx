import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SolarSystem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const W = canvas.offsetWidth, H = 420;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const sunLight = new THREE.PointLight(0xfff4e0, 2.5, 80);
    scene.add(sunLight);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const pos = [];
    for (let i = 0; i < 1800; i++)
      pos.push((Math.random()-0.5)*300, (Math.random()-0.5)*300, (Math.random()-0.5)*300);
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 })));

    // Sun
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffa500, emissiveIntensity: 1.2 })
    );
    scene.add(sunMesh);

    const PLANETS = [
      { r: 0.28, color: 0xb0b0b0, dist: 3.2,  speed: 2.4 },
      { r: 0.48, color: 0xe8c07a, dist: 5.0,  speed: 1.6 },
      { r: 0.52, color: 0x4a90d9, dist: 7.2,  speed: 1.0, moon: true },
      { r: 0.35, color: 0xc1440e, dist: 9.5,  speed: 0.65 },
      { r: 0.95, color: 0xe8d5a3, dist: 13.0, speed: 0.28 },
      { r: 0.82, color: 0xf0e68c, dist: 17.0, speed: 0.18, rings: true },
    ];

    const groups = PLANETS.map(p => {
      const orb = new THREE.Mesh(
        new THREE.RingGeometry(p.dist - 0.02, p.dist + 0.02, 80),
        new THREE.MeshBasicMaterial({ color: 0x334455, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
      );
      orb.rotation.x = Math.PI / 2;
      scene.add(orb);

      const g = new THREE.Group();
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.r, 32, 32),
        new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.8 }));
      mesh.position.x = p.dist;
      g.add(mesh);

      if (p.moon) {
        const moon = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xcccccc }));
        moon.position.x = 0.9;
        const mg = new THREE.Group();
        mg.add(moon);
        mg.position.x = p.dist;
        g.moonGroup = mg;
        g.add(mg);
      }
      if (p.rings) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(p.r*1.4, p.r*2.2, 64),
          new THREE.MeshBasicMaterial({ color: 0xd4b483, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
        ring.rotation.x = Math.PI / 2.5;
        ring.position.x = p.dist;
        g.add(ring);
      }
      scene.add(g);
      return { g, p, angle: Math.random() * Math.PI * 2 };
    });

    let isDragging = false, px = 0, py = 0;
    let theta = 0, phi = 0.18, dist = 18, velT = 0, velP = 0, t = 0, moonA = 0;

    const onDown = e => { isDragging = true; px = e.clientX; py = e.clientY; velT = velP = 0; };
    const onUp = () => { isDragging = false; };
    const onMove = e => {
      if (!isDragging) return;
      velT = (e.clientX - px) * 0.008; velP = (e.clientY - py) * 0.005;
      theta += velT; phi = Math.max(0.05, Math.min(1.3, phi + velP));
      px = e.clientX; py = e.clientY;
    };
    const onWheel = e => { dist = Math.max(6, Math.min(35, dist + e.deltaY * 0.02)); };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("wheel", onWheel, { passive: true });

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.008; moonA += 0.04;
      sunMesh.rotation.y += 0.003;
      groups.forEach(({ g, p, angle }) => {
        g.rotation.y = angle + t * p.speed;
        if (g.moonGroup) g.moonGroup.rotation.y = moonA;
      });
      if (!isDragging) { velT *= 0.93; theta += velT * 0.3; }
      camera.position.set(
        dist * Math.sin(phi) * Math.sin(theta),
        dist * Math.cos(phi),
        dist * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("wheel", onWheel);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "420px", display: "block" }} />;
}