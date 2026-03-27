"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type LandingDottedSurfaceProps = {
  className?: string;
  pointColor?: string;
  fogColor?: string;
  pointOpacity?: number;
  pointSize?: number;
};

export function LandingDottedSurface({
  className = "",
  pointColor = "#D95F3B",
  fogColor = "#1A1A1A",
  pointOpacity = 0.34,
  pointSize = 5,
}: LandingDottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(fogColor, 600, 2200);

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 4000);
    camera.position.set(0, 240, 980);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(fogColor, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const compactLayout = width < 1200;
    const separation = compactLayout ? 100 : 110;
    const amountX = compactLayout ? 18 : 24;
    const amountY = compactLayout ? 26 : 34;
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const dotColor = new THREE.Color(pointColor);

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        const x = ix * separation - (amountX * separation) / 2;
        const y = 0;
        const z = iy * separation - (amountY * separation) / 2;

        positions.push(x, y, z);
        colors.push(dotColor.r, dotColor.g, dotColor.b);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
      transparent: true,
      opacity: pointOpacity,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.42;
    points.position.y = -42;
    scene.add(points);

    let frameId = 0;
    let count = 0;

    const renderFrame = () => {
      const positionAttribute = geometry.attributes.position;
      const positionArray = positionAttribute.array as Float32Array;

      let index = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          const offset = index * 3;
          positionArray[offset + 1] =
            Math.sin((ix + count) * 0.32) * 28 + Math.sin((iy + count) * 0.48) * 24;
          index += 1;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += shouldReduceMotion ? 0 : 0.05;

      if (!shouldReduceMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.max(container.clientWidth, 1);
      const nextHeight = Math.max(container.clientHeight, 1);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [fogColor, pointColor, pointOpacity, pointSize, shouldReduceMotion]);

  return <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true" />;
}
