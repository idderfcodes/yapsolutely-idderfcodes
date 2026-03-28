"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability before attempting to create renderer
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      // Fallback: CSS radial-gradient dot grid
      container.style.backgroundImage =
        "radial-gradient(circle, rgba(68,68,68,0.35) 1px, transparent 1px)";
      container.style.backgroundSize = "32px 32px";
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // WebGL context creation failed — use CSS fallback
      container.style.backgroundImage =
        "radial-gradient(circle, rgba(68,68,68,0.35) 1px, transparent 1px)";
      container.style.backgroundSize = "32px 32px";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      10000,
    );
    camera.position.set(0, 400, 1200);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Grid geometry
    const AMOUNTX = 50;
    const AMOUNTY = 50;
    const SEPARATION = 100;
    const numPoints = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0, ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i++] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i++] = 0;
        positions[i++] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Muted warm gray from design system (#9A9590)
    const dotColor = new THREE.Color(0x444444);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: dotColor },
      },
      vertexShader: `
        uniform float uTime;
        void main() {
          vec3 pos = position;
          pos.y = sin(pos.x * 0.005 + uTime) * 60.0
                + sin(pos.z * 0.005 + uTime) * 60.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 4.0 * (1000.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        void main() {
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          gl_FragColor = vec4(uColor, 0.6);
        }
      `,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationId = 0;

    const animate = (time: number) => {
      material.uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // Resize to container
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      {...props}
    />
  );
}
