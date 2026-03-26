"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl", { alpha: true, antialias: true }) ||
          canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (!supportsWebGL()) {
      setUseFallback(true);
      return;
    }

    const SEPARATION = 150;
    const AMOUNT_X = 40;
    const AMOUNT_Y = 60;

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let points: THREE.Points | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frameId = 0;
    let resize = () => {};

    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(
        resolvedTheme === "dark" ? 0x09090b : 0xffffff,
        2000,
        10000,
      );

      const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
      camera.position.set(0, 355, 1220);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(scene.fog.color, 0);
      renderer.domElement.setAttribute("aria-hidden", "true");

      container.appendChild(renderer.domElement);

      const positions: number[] = [];
      const colors: number[] = [];
      geometry = new THREE.BufferGeometry();
      const pointColor = new THREE.Color(
        resolvedTheme === "dark" ? "#d8d8d8" : "#d95f3b",
      );

      for (let ix = 0; ix < AMOUNT_X; ix += 1) {
        for (let iy = 0; iy < AMOUNT_Y; iy += 1) {
          const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
          const y = 0;
          const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;

          positions.push(x, y, z);
          colors.push(pointColor.r, pointColor.g, pointColor.b);
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3),
      );

      material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: resolvedTheme === "dark" ? 0.42 : 0.7,
        sizeAttenuation: true,
        depthWrite: false,
      });

      const activeGeometry = geometry;
      const activeMaterial = material;

      points = new THREE.Points(activeGeometry, activeMaterial);
      scene.add(points);

      let count = 0;

      resize = () => {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height, false);
      };

      const animate = () => {
        frameId = window.requestAnimationFrame(animate);

        const positionAttribute = activeGeometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;
        const positionArray = positionAttribute.array as Float32Array;

        let i = 0;
        for (let ix = 0; ix < AMOUNT_X; ix += 1) {
          for (let iy = 0; iy < AMOUNT_Y; iy += 1) {
            const index = i * 3;
            positionArray[index + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            i += 1;
          }
        }

        positionAttribute.needsUpdate = true;
        renderer?.render(scene, camera);
        count += 0.1;
      };

      resizeObserver = new ResizeObserver(() => {
        resize();
      });

      setUseFallback(false);
      resize();
      resizeObserver.observe(container);
      window.addEventListener("resize", resize);
      animate();

      return () => {
        window.removeEventListener("resize", resize);
        resizeObserver?.disconnect();
        window.cancelAnimationFrame(frameId);
        if (points) {
          scene.remove(points);
        }
        activeGeometry.dispose();
        activeMaterial.dispose();
        renderer?.dispose();

        if (renderer?.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      setUseFallback(true);

      if (renderer?.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      return;
    }
  }, [resolvedTheme]);

  const fallbackDotColor =
    resolvedTheme === "dark" ? "rgba(216,216,216,0.18)" : "rgba(217,95,59,0.14)";

  return (
    <>
      <style>{`
        @keyframes dotted-surface-drift {
          0% {
            transform: perspective(1200px) rotateX(72deg) scale(1.45) translate3d(0, 0, 0);
          }
          50% {
            transform: perspective(1200px) rotateX(72deg) scale(1.5) translate3d(0, 14px, 0);
          }
          100% {
            transform: perspective(1200px) rotateX(72deg) scale(1.45) translate3d(0, 0, 0);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
        {...props}
      >
        {useFallback ? (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, ${fallbackDotColor} 1.4px, transparent 1.9px)`,
              backgroundSize: "24px 24px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(0,0,0,0.15))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(0,0,0,0.15))",
              transformOrigin: "center top",
              animation: "dotted-surface-drift 18s ease-in-out infinite",
            }}
          />
        ) : null}
      </div>
    </>
  );
}
