import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Layers, Sparkles, Sliders, Shield, Zap, RefreshCw } from 'lucide-react';
import { playUiClick } from '../Utils/sound';

export default function ThreeModelViewer() {
  const containerRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [colorTheme, setColorTheme] = useState('cyan'); // 'cyan' | 'magenta' | 'emerald'
  const [modelType, setModelType] = useState('visor'); // 'visor' | 'cube' | 'torus'
  const [autoRotate, setAutoRotate] = useState(true);
  const [stats, setStats] = useState({ tris: 4860, fps: 60, status: 'GLSL Linked' });

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshGroupRef = useRef(null);
  const materialsRef = useRef([]);

  // Theme colors
  const themes = {
    cyan: { primary: 0x00f0ff, secondary: 0x3b82f6, glow: 'rgba(0,240,255,0.4)', text: 'Cyan Grid' },
    magenta: { primary: 0xbd00ff, secondary: 0xff007f, glow: 'rgba(189,0,255,0.4)', text: 'Cyber Violet' },
    emerald: { primary: 0x00ff87, secondary: 0x10b981, glow: 'rgba(0,255,135,0.4)', text: 'Quantum Emerald' },
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.0);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Mesh Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Build Initial Model
    rebuildModel(modelType, colorTheme, wireframe);

    // Interactive Drag Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !meshGroupRef.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let animId;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && meshGroupRef.current && !isDragging) {
        meshGroupRef.current.rotation.y += 0.008;
      }

      // FPS calculation
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setStats((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / (now - lastTime)) }));
        frameCount = 0;
        lastTime = now;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Model Geometry
  const rebuildModel = (type, themeKey, isWire) => {
    if (!meshGroupRef.current) return;
    const group = meshGroupRef.current;

    // Clear existing
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    }

    const currentTheme = themes[themeKey] || themes.cyan;

    if (type === 'visor') {
      // Procedural Cyber XR Visor Model
      // 1. Visor Glass
      const visorGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.9, 32, 1, false, 0, Math.PI);
      const visorMat = new THREE.MeshPhysicalMaterial({
        color: currentTheme.primary,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 0.4,
        transparent: true,
        opacity: isWire ? 0.3 : 0.85,
        wireframe: isWire,
      });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.rotation.y = -Math.PI / 2;
      group.add(visor);

      // 2. Headset Frame Chassis
      const frameGeo = new THREE.TorusGeometry(1.62, 0.1, 16, 40, Math.PI);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: isWire,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.rotation.y = -Math.PI / 2;
      frame.position.y = 0.45;
      group.add(frame);

      // 3. Dual Holographic Optical Lenses
      const lensGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: currentTheme.secondary,
        emissive: currentTheme.primary,
        emissiveIntensity: 0.6,
        metalness: 0.5,
        roughness: 0.1,
        wireframe: isWire,
      });

      const lensLeft = new THREE.Mesh(lensGeo, lensMat);
      lensLeft.rotation.x = Math.PI / 2;
      lensLeft.position.set(-0.55, 0, 0.5);
      group.add(lensLeft);

      const lensRight = new THREE.Mesh(lensGeo, lensMat);
      lensRight.rotation.x = Math.PI / 2;
      lensRight.position.set(0.55, 0, 0.5);
      group.add(lensRight);

      // 4. Spatial Tracking Sensor Nodes
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ff87 });
      [-1.4, -0.7, 0.7, 1.4].forEach((x, i) => {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, 0.35, Math.cos(x) * 0.8);
        group.add(node);
      });

      setStats((s) => ({ ...s, tris: 3840 }));
    } else if (type === 'cube') {
      // Cyber Quantum Hypercube
      const outerGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
      const outerMat = new THREE.MeshStandardMaterial({
        color: currentTheme.primary,
        wireframe: isWire,
        transparent: true,
        opacity: isWire ? 0.8 : 0.4,
        roughness: 0.1,
        metalness: 0.9,
      });
      const outerCube = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerCube);

      const innerGeo = new THREE.OctahedronGeometry(1.2, 1);
      const innerMat = new THREE.MeshStandardMaterial({
        color: currentTheme.secondary,
        wireframe: isWire,
        emissive: currentTheme.primary,
        emissiveIntensity: 0.5,
        metalness: 0.8,
      });
      const innerOcta = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerOcta);

      setStats((s) => ({ ...s, tris: 2480 }));
    } else {
      // Spatial Torus Knot (Advanced Shader Simulation)
      const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 24, 2, 3);
      const knotMat = new THREE.MeshPhysicalMaterial({
        color: currentTheme.primary,
        wireframe: isWire,
        roughness: 0.15,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      group.add(knot);

      setStats((s) => ({ ...s, tris: 5760 }));
    }
  };

  useEffect(() => {
    rebuildModel(modelType, colorTheme, wireframe);
  }, [modelType, colorTheme, wireframe]);

  const resetCamera = () => {
    playUiClick();
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-cyan-500/20 bg-[#070b18]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
            Interactive WebGL 3D Engine
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            60 FPS Realtime
          </span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <div><span className="text-slate-500">TRIANGLES:</span> <span className="text-cyan-300 font-bold">{stats.tris.toLocaleString()}</span></div>
          <div><span className="text-slate-500">FPS:</span> <span className="text-emerald-400 font-bold">{stats.fps}</span></div>
          <div className="hidden md:block"><span className="text-slate-500">SHADER:</span> <span className="text-purple-300 font-bold">{stats.status}</span></div>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative h-[380px] sm:h-[450px] w-full cursor-grab active:cursor-grabbing select-none">
        <div ref={containerRef} className="w-full h-full" />

        {/* Interactive Helper Overlay */}
        <div className="absolute top-4 left-4 pointer-events-none text-xs font-mono text-slate-400/80 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
          <span>● Drag to 360° Rotate & Inspect</span>
        </div>

        {/* Control floating actions */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={resetCamera}
            title="Reset View"
            className="p-2.5 rounded-lg bg-black/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors backdrop-blur-md"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              playUiClick();
              setAutoRotate(!autoRotate);
            }}
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            className={`p-2.5 rounded-lg border transition-colors backdrop-blur-md ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-black/60 text-slate-400 border-white/10'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </button>
        </div>
      </div>

      {/* Bottom Control Toolbar */}
      <div className="p-4 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Model Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">ARTIFACT:</span>
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {[
              { id: 'visor', label: 'XR Visor' },
              { id: 'cube', label: 'Quantum Core' },
              { id: 'torus', label: 'Spatial Knot' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  playUiClick();
                  setModelType(m.id);
                }}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  modelType === m.id
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">SPECTRA:</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'cyan', color: 'bg-cyan-400' },
              { id: 'magenta', color: 'bg-fuchsia-500' },
              { id: 'emerald', color: 'bg-emerald-400' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playUiClick();
                  setColorTheme(t.id);
                }}
                className={`w-6 h-6 rounded-full ${t.color} transition-transform ${
                  colorTheme === t.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wireframe Toggle */}
        <button
          onClick={() => {
            playUiClick();
            setWireframe(!wireframe);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
            wireframe
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/30'
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>WIREFRAME: {wireframe ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </div>
  );
}
