"use client";

import { useRef, useLayoutEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Line, AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function GeometricFlux() {
    const groupRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.Group>(null);

    // High-Fidelity Shapes with individual parallax factors
    const shapes = useMemo(() => {
        return [
            { pos: [4, 0, 0], scale: 2.2, speed: 0.1, type: 'dodeca', parallax: 1.5 },   // Center Right (Fastest)
            { pos: [0, 5, -4], scale: 1.8, speed: 0.2, type: 'octa', parallax: 0.8 },    // Mid Right Back (Slow)
            { pos: [8, -4, -2], scale: 1.4, speed: 0.15, type: 'icosa', parallax: 2.5 }, // Far Right Front (Very Fast)
            { pos: [2, -6, 3], scale: 1.0, speed: 0.25, type: 'dodeca', parallax: 3.0 }, // Low Mid Front (Super Fast)
            { pos: [6, 7, -6], scale: 2.0, speed: 0.1, type: 'octa', parallax: 0.5 },    // Top Right Back (Very Slow)
        ];
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Global Rotation (Base)
            gsap.to(groupRef.current!.rotation, {
                y: 1.5,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // 2. Section-Based Transformation Narrative

            // "Problem" Section: Chaos/Dispersal
            // Trigger: When #problem-section enters viewport
            const problemTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#problem-section",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                }
            });

            // Disperse shapes
            groupRef.current!.children.forEach((mesh, i) => {
                problemTimeline.to(mesh.position, {
                    x: (Math.random() - 0.5) * 15, // Scatter wide
                    y: (Math.random() - 0.5) * 15,
                    z: (Math.random() - 0.5) * 5,
                    rotation: Math.random() * Math.PI,
                    ease: "power2.inOut"
                }, 0);
            });




            // 3. Dynamic Moving Light (Shifting Reflections)
            if (lightRef.current) {
                gsap.to(lightRef.current.position, {
                    x: 10,
                    y: -10,
                    z: 5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                    }
                });
            }
        });
        return () => ctx.revert();
    }, [shapes]);

    // Memoize materials to prevent re-compilation on every instance
    const obsidianMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: "#0a0a0a",
        roughness: 0.05,
        metalness: 0.9,
        transmission: 0.2,
        thickness: 3,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        iridescence: 0.8,
        iridescenceIOR: 2.2
    }), []);

    const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#ffffff",
        wireframe: true,
        transparent: true,
        opacity: 0.03
    }), []);

    // Reuse geometries
    const dodecaGeo = useMemo(() => new THREE.DodecahedronGeometry(1, 0), []);
    const octaGeo = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
    const icosaGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

    const getGeometry = (type: string, scale: number) => {
        // Clone and scale is cheaper than new geometry, but even better is just scaling the mesh
        // Here we just return the base geo and let the mesh handle scale
        switch (type) {
            case 'dodeca': return dodecaGeo;
            case 'octa': return octaGeo;
            case 'icosa': return icosaGeo;
            default: return dodecaGeo;
        }
    };

    return (
        <>
            <group ref={groupRef}>
                {shapes.map((shape, i) => (
                    <Float key={i} speed={shape.speed} rotationIntensity={0.8} floatIntensity={0.8}>
                        <group position={shape.pos as [number, number, number]} scale={shape.scale}>
                            {/* Main Shape */}
                            <mesh geometry={getGeometry(shape.type, shape.scale)} material={obsidianMaterial} />

                            {/* Wireframe Overlay */}
                            <mesh geometry={getGeometry(shape.type, shape.scale)} material={wireframeMaterial} scale={1.01} />
                        </group>
                    </Float>
                ))}
            </group>

            {/* Dynamic Scroll Light */}
            <group ref={lightRef} position={[-10, 10, 5]}>
                <pointLight intensity={5} color="#4fd1c5" distance={30} decay={2} />
            </group>
        </>
    );
}

export function SecureCoreScene() {
    return (
        <div
            id="global-scene-container"
            className="fixed inset-0 z-[-1] pointer-events-none bg-black" // Fixed background behind everything
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance", // Request discrete GPU
                    stencil: false, // Not using stencil buffer
                    depth: true
                }}
                dpr={[1, 1.5]} // Cap DPR at 1.5 to save battery/perf on mobile/retina
            >
                <color attach="background" args={['#030304']} />

                {/* Performance Managers */}
                <AdaptiveDpr pixelated />
                <Preload all />

                <fog attach="fog" args={['#030304', 5, 30]} />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <GeometricFlux />
                </Suspense>

                <ambientLight intensity={2.0} />
                <rectAreaLight width={20} height={20} position={[0, 10, 0]} color={"#4fd1c5"} intensity={3} />
                <pointLight position={[-10, 5, -5]} intensity={2} color="#6366f1" />
                <pointLight position={[10, -5, 5]} intensity={2} color="#ffffff" />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />
        </div>
    );
}
