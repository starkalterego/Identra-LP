"use client";

import { useRef, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function SynapticNetwork() {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.Group>(null);

    // Generate Network Nodes (The "Brain")
    const nodes = useMemo(() => {
        return new Array(40).fill(0).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 10 + 2, // Biased upwards
                (Math.random() - 0.5) * 8
            ] as [number, number, number],
            scale: Math.random() * 0.4 + 0.1,
        }));
    }, []);

    // Generate Deep Data Rain (The connection to lower sections)
    const dataStreams = useMemo(() => {
        return new Array(20).fill(0).map((_, i) => ({
            points: [
                new THREE.Vector3((Math.random() - 0.5) * 15, 10, (Math.random() - 0.5) * 5),
                new THREE.Vector3((Math.random() - 0.5) * 5, -20, (Math.random() - 0.5) * 5) // Converging down
            ]
        }));
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Global Scroll Interaction
            // We animate based on the whole page scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body, // Watch the whole body
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });

            // 1. Camera/Group Move Down
            tl.to(groupRef.current!.position, { y: 12, z: 2 }, 0);

            // 2. Rotate to look "up" as we descend
            tl.to(groupRef.current!.rotation, { x: 0.5 }, 0);

            // 3. Expand the network (The "Context" grows)
            tl.to(groupRef.current!.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0);

        });
        return () => ctx.revert();
    }, []);

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Main "Thinking" Nodes */}
            {nodes.map((node, i) => (
                <Float key={i} speed={1 + Math.random()} floatIntensity={2} rotationIntensity={1}>
                    <mesh position={node.position}>
                        <dodecahedronGeometry args={[node.scale, 0]} />
                        <meshPhysicalMaterial
                            color={i % 2 === 0 ? "#ffffff" : "#000000"}
                            emissive={i % 5 === 0 ? "#4fd1c5" : "#000000"}
                            emissiveIntensity={2}
                            metalness={0.9}
                            roughness={0.1}
                            transmission={0.5}
                            transparent opacity={0.8}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Connecting Data Lines (The "Synapses") */}
            <group ref={linesRef}>
                {dataStreams.map((stream, i) => (
                    <Line
                        key={i}
                        points={stream.points}
                        color={i % 2 === 0 ? "#4fd1c5" : "#6366f1"}
                        opacity={0.1}
                        transparent
                        lineWidth={1}
                    />
                ))}
            </group>
        </group>
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
                gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={['#030304']} />
                <fog attach="fog" args={['#030304', 5, 30]} />

                <Environment preset="city" />

                <ambientLight intensity={0.2} />
                <rectAreaLight width={20} height={20} position={[0, 10, 0]} color={"#4fd1c5"} intensity={1} />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#6366f1" />

                <SynapticNetwork />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />
        </div>
    );
}
