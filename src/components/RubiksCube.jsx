import { useEffect, useRef } from "react";
import * as THREE from "three";

const FACE_COLORS = {
  red: "#d84a4a",
  orange: "#e89a4a",
  yellow: "#e4cf55",
  green: "#55a96d",
  blue: "#5281b8",
  white: "#e7e7e7",
  black: "#111111",
};

const isLightColor = (color) =>
  color === FACE_COLORS.yellow ||
  color === FACE_COLORS.white ||
  color === FACE_COLORS.orange;

export default function RubiksCube({ skills = [], onSkillSelect }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const callbackRef = useRef(onSkillSelect);

  useEffect(() => {
    callbackRef.current = onSkillSelect;
  }, [onSkillSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(5.5, 4.5, 6.5);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 8, 7);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    const GAP = 1.045;
    const cubeGroup = new THREE.Group();
    const geometries = [];
    const materials = [];
    const textures = [];
    const cubies = [];
    let skillIndex = 0;

    const makeTexture = (background, label) => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 512;
      textureCanvas.height = 512;
      const ctx = textureCanvas.getContext("2d");
      if (!ctx) return null;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 10;
      ctx.strokeRect(12, 12, 488, 488);

      if (label) {
        const light = isLightColor(background);
        ctx.fillStyle = light ? "#111111" : "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = light ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.38)";
        ctx.shadowBlur = 10;

        const words = label.split(" ");
        const shouldWrap = label.length > 11 && words.length > 1;
        let fontSize = 74;
        if (label.length > 13) fontSize = 48;
        else if (label.length > 9) fontSize = 58;
        else if (label.length > 6) fontSize = 66;

        ctx.font = `600 ${fontSize}px Arial, sans-serif`;

        if (shouldWrap) {
          const splitAt = Math.ceil(words.length / 2);
          const first = words.slice(0, splitAt).join(" ");
          const second = words.slice(splitAt).join(" ");
          ctx.fillText(first, 256, 218);
          ctx.fillText(second, 256, 294);
        } else {
          ctx.fillText(label, 256, 256);
        }
      }

      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      textures.push(texture);
      return texture;
    };

    const createMaterial = (background, outer, faceSkills, materialIndex) => {
      if (!outer) {
        const material = new THREE.MeshStandardMaterial({
          color: FACE_COLORS.black,
          roughness: 0.62,
          metalness: 0.02,
        });
        materials.push(material);
        faceSkills[materialIndex] = null;
        return material;
      }

      const skill = skills.length ? skills[skillIndex % skills.length] : null;
      skillIndex += 1;
      faceSkills[materialIndex] = skill;

      const texture = makeTexture(background, skill);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture,
        roughness: 0.5,
        metalness: 0.02,
      });
      materials.push(material);
      return material;
    };

    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const geometry = new THREE.BoxGeometry(0.96, 0.96, 0.96);
          geometries.push(geometry);

          const faceSkills = [];
          const cubeMaterials = [
            createMaterial(FACE_COLORS.red, x === 1, faceSkills, 0),
            createMaterial(FACE_COLORS.orange, x === -1, faceSkills, 1),
            createMaterial(FACE_COLORS.yellow, y === 1, faceSkills, 2),
            createMaterial(FACE_COLORS.green, y === -1, faceSkills, 3),
            createMaterial(FACE_COLORS.blue, z === 1, faceSkills, 4),
            createMaterial(FACE_COLORS.white, z === -1, faceSkills, 5),
          ];

          const cubie = new THREE.Mesh(geometry, cubeMaterials);
          cubie.position.set(x * GAP, y * GAP, z * GAP);
          cubie.userData.faceSkills = faceSkills;
          cubeGroup.add(cubie);
          cubies.push(cubie);
        }
      }
    }

    cubeGroup.rotation.x = 0.35;
    cubeGroup.rotation.y = -0.45;
    scene.add(cubeGroup);

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let resumeTimer = null;
    let autoRotate = !prefersReducedMotion;
    let isInView = true;
    let animationFrame = null;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const selectSkillAt = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const hit = raycaster.intersectObjects(cubies, false)[0];
      if (!hit || hit.face?.materialIndex == null) return;

      const selectedSkill = hit.object.userData.faceSkills?.[hit.face.materialIndex];
      if (selectedSkill) callbackRef.current?.(selectedSkill);
    };

    const onPointerDown = (event) => {
      isDragging = true;
      autoRotate = false;
      previousX = event.clientX;
      previousY = event.clientY;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      velocityX = 0;
      velocityY = 0;
      if (resumeTimer) clearTimeout(resumeTimer);
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

    const onPointerUp = (event) => {
      if (!isDragging) return;
      isDragging = false;

      const travel = Math.hypot(
        event.clientX - pointerStartX,
        event.clientY - pointerStartY,
      );
      if (travel < 5) selectSkillAt(event);

      if (!prefersReducedMotion) {
        resumeTimer = setTimeout(() => {
          autoRotate = true;
        }, 1800);
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

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

    const renderFrame = () => {
      if (!isInView) {
        animationFrame = null;
        return;
      }

      if (autoRotate) {
        cubeGroup.rotation.y += 0.006;
        cubeGroup.rotation.x += 0.002;
      } else if (!isDragging) {
        velocityX *= 0.94;
        velocityY *= 0.94;
        cubeGroup.rotation.x += velocityX;
        cubeGroup.rotation.y += velocityY;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (animationFrame == null) animationFrame = requestAnimationFrame(renderFrame);
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
      if (resumeTimer) clearTimeout(resumeTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      geometries.forEach((geometry) => geometry.dispose());
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, [skills]);

  return (
    <div ref={containerRef} className="relative h-full w-full touch-none overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-label="Interactive Rubik's Cube displaying development skills"
        className="block h-full w-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
