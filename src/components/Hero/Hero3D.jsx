import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/**
 * SEED Hero3D — Premium Scene v2
 *
 * Scene composition:
 *  • Image-based plant sprite (hero_plant.jpg) — animated breathing, swaying
 *  • Image-based developer desk sprite (hero_desk.jpg) — behind, parallax depth
 *  • Floating concept bubbles (</>, Cloud, AI, 🔒, ⚡, ∞) orbiting gently
 *  • Volumetric particle field (deep blue micro-dots)
 *  • Animated grid floor with reflection glow
 *  • Mouse parallax — full 3D camera drift
 *  • Dynamic point lighting, pulsing and colour-shifting
 */
export default function Hero3D() {
  const mountRef   = useRef(null);
  const cleanupRef = useRef(null);

  const init = useCallback(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#04050d');
    scene.fog = new THREE.FogExp2('#04050d', 0.022);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
    camera.position.set(0, 1.5, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Lighting ────────────────────────────────────────────────────
    // Ambient
    scene.add(new THREE.AmbientLight('#1a1a40', 3));

    // Key — warm overhead
    const keyLight = new THREE.DirectionalLight('#ffffff', 2.8);
    keyLight.position.set(6, 12, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.camera.right = keyLight.shadow.camera.top = 12;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Indigo fill — left rim
    const fillLight = new THREE.PointLight('#4f46e5', 18, 25, 2);
    fillLight.position.set(-7, 3, 4);
    scene.add(fillLight);

    // Cobalt accent — right
    const cobaltLight = new THREE.PointLight('#2563eb', 12, 20, 2);
    cobaltLight.position.set(8, 0, 6);
    scene.add(cobaltLight);

    // Emerald glow — plant root
    const emLight = new THREE.PointLight('#10b981', 8, 14, 2);
    emLight.position.set(-1, -3, 3);
    scene.add(emLight);

    // ── Texture Loader ──────────────────────────────────────────────
    const texLoader = new THREE.TextureLoader();

    // ── GRID FLOOR ──────────────────────────────────────────────────
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -5.5;
    scene.add(floorGroup);

    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#080c1a', roughness: 0.85, metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floorGroup.add(floor);

    // Fine grid overlay
    const gridMat = new THREE.LineBasicMaterial({ color: '#1e2a55', transparent: true, opacity: 0.35 });
    const gridHelper = new THREE.GridHelper(60, 40, '#1e2a55', '#1e2a55');
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    floorGroup.add(gridHelper);

    // Glow strip lines on floor
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.PlaneGeometry(0.012, 40);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#4f46e5' : '#2563eb',
        transparent: true, opacity: 0.25 + Math.random() * 0.25,
        side: THREE.DoubleSide,
      });
      const strip = new THREE.Mesh(geo, mat);
      strip.rotation.x = -Math.PI / 2;
      strip.position.set((Math.random() - 0.5) * 14, 0.002, (Math.random() - 0.5) * 14);
      strip.rotation.z = Math.random() * Math.PI;
      floorGroup.add(strip);
    }

    // ── DESK IMAGE PLANE (background layer) ─────────────────────────
    let deskPlane;
    texLoader.load('/hero_desk.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const aspect = tex.image.width / tex.image.height; // ~16:9
      const w = 14, h = w / aspect;
      const geo = new THREE.PlaneGeometry(w, h, 1, 1);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.6, metalness: 0.05,
        transparent: true, opacity: 0.85,
      });
      deskPlane = new THREE.Mesh(geo, mat);
      deskPlane.position.set(0, -0.5, -2.5);
      deskPlane.castShadow = false;
      deskPlane.receiveShadow = true;
      scene.add(deskPlane);
    });

    // ── PLANT IMAGE PLANE (foreground, left) ────────────────────────
    let plantPlane;
    texLoader.load('/hero_plant.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const aspect = tex.image.width / tex.image.height; // ~1:1
      const h = 8, w = h * aspect;
      const geo = new THREE.PlaneGeometry(w, h, 1, 1);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4, metalness: 0.1,
        transparent: true, opacity: 1.0,
      });
      plantPlane = new THREE.Mesh(geo, mat);
      plantPlane.position.set(-3.5, -1.5, 2.5);
      plantPlane.castShadow = true;
      plantPlane.receiveShadow = true;
      scene.add(plantPlane);
    });

    // ── FLOATING CONCEPT BUBBLES ────────────────────────────────────
    const bubbleData = [
      { label: '</>', color: '#818cf8', x:  4.2, y:  2.8, z: 1.0, size: 0.9, speed: 0.55 },
      { label: '☁',  color: '#60a5fa', x: -4.8, y:  1.5, z: 0.5, size: 0.75, speed: 0.4 },
      { label: '🤖', color: '#a78bfa', x:  3.0, y: -1.0, z: 2.0, size: 0.8, speed: 0.65 },
      { label: '🔒', color: '#34d399', x: -2.5, y:  3.2, z: 1.5, size: 0.7, speed: 0.5 },
      { label: '⚡',  color: '#fbbf24', x:  5.5, y:  0.5, z:-0.5, size: 0.68, speed: 0.45 },
      { label: '∞',  color: '#f472b6', x: -5.5, y: -0.8, z: 0.8, size: 0.78, speed: 0.38 },
      { label: '{}', color: '#38bdf8', x:  1.5, y:  3.8, z:-1.0, size: 0.65, speed: 0.6 },
      { label: '◈',  color: '#c084fc', x: -1.0, y: -2.5, z: 3.5, size: 0.72, speed: 0.42 },
    ];

    const bubbles = [];
    const bubbleGroup = new THREE.Group();
    scene.add(bubbleGroup);

    bubbleData.forEach((bd, idx) => {
      const group = new THREE.Group();
      group.position.set(bd.x, bd.y, bd.z);

      // Glass sphere shell
      const sphereGeo = new THREE.SphereGeometry(bd.size, 32, 32);
      const color = new THREE.Color(bd.color);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.0,
        roughness: 0.0,
        transmission: 0.65,
        thickness: 0.8,
        transparent: true,
        opacity: 0.55,
        envMapIntensity: 1.0,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      // Inner glow disc
      const innerGeo = new THREE.SphereGeometry(bd.size * 0.55, 16, 16);
      const innerMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.8,
        roughness: 0.3, transparent: true, opacity: 0.4,
      });
      group.add(new THREE.Mesh(innerGeo, innerMat));

      // Ring halo
      const ringGeo = new THREE.TorusGeometry(bd.size * 1.1, 0.012, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: 0.45,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      group.userData = {
        baseY:     bd.y,
        floatPhase: idx * 0.9,
        floatSpeed: bd.speed,
        rotSpeedY: 0.005 + idx * 0.002,
        rotSpeedX: 0.003 + idx * 0.0015,
        label:     bd.label,
        color:     bd.color,
        innerMat,
        ring,
      };

      bubbleGroup.add(group);
      bubbles.push(group);
    });

    // ── PARTICLE FIELD ───────────────────────────────────────────────
    const particleCount = 320;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors    = new Float32Array(particleCount * 3);
    const pSpeeds    = [];

    const colorPalette = [
      new THREE.Color('#4f46e5'),
      new THREE.Color('#2563eb'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#10b981'),
      new THREE.Color('#818cf8'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      pPositions[i * 3]     = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;

      pSpeeds.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: 0.003 + Math.random() * 0.009,
        vz: (Math.random() - 0.5) * 0.004,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06, vertexColors: true,
      transparent: true, opacity: 0.7,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── ORBITING TECH RINGS (around origin) ──────────────────────────
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0, 0);
    scene.add(ringGroup);

    const ringConfigs = [
      { r: 5.5, tube: 0.018, color: '#4f46e5', opacity: 0.4, tilt: 0.35, speed: 0.15 },
      { r: 7.0, tube: 0.012, color: '#2563eb', opacity: 0.28, tilt: 0.6, speed: -0.1 },
      { r: 8.5, tube: 0.008, color: '#7c3aed', opacity: 0.18, tilt: 0.9, speed: 0.08 },
    ];
    const orbitRings = ringConfigs.map(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color, transparent: true, opacity: cfg.opacity,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.tilt;
      mesh.rotation.z = cfg.tilt * 0.5;
      mesh.userData = { speed: cfg.speed };
      ringGroup.add(mesh);
      return mesh;
    });

    // Small node dots on rings
    const nodeMeshes = [];
    ringConfigs.forEach((cfg, ri) => {
      const count = 3 + ri;
      for (let i = 0; i < count; i++) {
        const nGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const nMat = new THREE.MeshStandardMaterial({
          color: cfg.color, emissive: cfg.color, emissiveIntensity: 3,
          roughness: 0.1,
        });
        const node = new THREE.Mesh(nGeo, nMat);
        node.userData = {
          ringRadius: cfg.r,
          ringTiltX: cfg.tilt,
          angle: (i / count) * Math.PI * 2,
          speed: cfg.speed * 1.0,
        };
        ringGroup.add(node);
        nodeMeshes.push(node);
      }
    });

    // ── Mouse & Scroll State ─────────────────────────────────────────
    const mouse  = { tx: 0, ty: 0, x: 0, y: 0 };
    const scroll = { target: 0, value: 0 };
    const camBase = { x: 0, y: 1.5, z: 16 };

    const onMouse = e => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll.target = max > 0 ? window.scrollY / max : 0;
    };
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // ── Render Loop ──────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth input
      mouse.x  += (mouse.tx - mouse.x) * 0.05;
      mouse.y  += (mouse.ty - mouse.y) * 0.05;
      scroll.value += (scroll.target - scroll.value) * 0.06;

      // Camera parallax
      camera.position.x += (camBase.x + mouse.x * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (camBase.y + mouse.y * 1.5 + scroll.value * 3 - camera.position.y) * 0.03;
      camera.position.z = camBase.z - scroll.value * 5;
      camera.lookAt(0, scroll.value * 1.5, 0);

      // Plant: breathing + sway
      if (plantPlane) {
        plantPlane.position.y = -1.5 + Math.sin(t * 0.6) * 0.12;
        plantPlane.rotation.z = Math.sin(t * 0.35) * 0.025;
        // Subtle scale breathe
        const breathe = 1 + Math.sin(t * 0.9) * 0.015;
        plantPlane.scale.set(breathe, breathe, 1);
        // Mouse parallax depth
        plantPlane.position.x = -3.5 + mouse.x * 0.3;
      }

      // Desk: subtle float
      if (deskPlane) {
        deskPlane.position.y = -0.5 + Math.sin(t * 0.4) * 0.05;
        deskPlane.position.x = mouse.x * -0.15;
        deskPlane.position.y += mouse.y * 0.08;
      }

      // Bubble animations
      bubbles.forEach((b, i) => {
        b.position.y = b.userData.baseY + Math.sin(t * b.userData.floatSpeed + b.userData.floatPhase) * 0.55;
        b.rotation.y += b.userData.rotSpeedY;
        b.rotation.x += b.userData.rotSpeedX * 0.5;
        // Pulsing inner glow
        b.userData.innerMat.emissiveIntensity = 1.5 + Math.sin(t * 1.8 + i * 0.7) * 1.0;
        // Ring pulse
        b.userData.ring.material.opacity = 0.3 + Math.sin(t * 2 + i) * 0.2;
        // Mouse drift
        b.position.x = bubbleData[i].x + mouse.x * (0.1 + i * 0.02);
        b.position.z = bubbleData[i].z + mouse.y * (0.05 + i * 0.01);
      });

      // Orbit rings
      orbitRings.forEach(ring => {
        ring.rotation.y += ring.userData.speed * 0.016;
      });

      // Orbit nodes
      nodeMeshes.forEach(node => {
        node.userData.angle += node.userData.speed * 0.016;
        const a = node.userData.angle;
        const r = node.userData.ringRadius;
        const tilt = node.userData.ringTiltX;
        node.position.set(
          Math.cos(a) * r,
          Math.sin(a) * r * Math.sin(tilt),
          Math.sin(a) * r * Math.cos(tilt),
        );
        node.material.emissiveIntensity = 2.5 + Math.sin(t * 3 + a) * 1.5;
      });

      // Dynamic lighting pulse
      fillLight.intensity  = 16 + Math.sin(t * 1.3) * 5;
      cobaltLight.intensity = 10 + Math.sin(t * 0.9 + 1.5) * 4;
      emLight.intensity    = 6 + Math.sin(t * 1.6 + 0.8) * 3;
      fillLight.position.x = -7 + Math.sin(t * 0.5) * 1.5;
      emLight.position.y   = -3 + Math.sin(t * 0.7) * 0.5;

      // Particle field
      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const s = pSpeeds[i];
        pos[i * 3]     += s.vx + Math.sin(t * 0.5 + s.phase) * 0.002;
        pos[i * 3 + 1] += s.vy;
        pos[i * 3 + 2] += s.vz;
        if (pos[i * 3 + 1] > 12) pos[i * 3 + 1] = -10;
        if (Math.abs(pos[i * 3]) > 16) s.vx *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 14) s.vz *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    init();
    return () => { cleanupRef.current?.(); };
  }, [init]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
