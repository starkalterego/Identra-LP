"use client";

import { useRef, useLayoutEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr, Preload, Sparkles, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MetallicRubiksCube() {
    const groupRef = useRef<THREE.Group>(null);
    const pivotRef = useRef<THREE.Group>(null);
    const cubesGroupRef = useRef<THREE.Group>(null);
    
    // Initial positions for the 27 cubes
    const cubes = useMemo(() => {
        const temp = [];
        const offset = 1.02; // Tighter spacing between cubes for a seamless block feel
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    temp.push({
                        x: x * offset,
                        y: y * offset,
                        z: z * offset,
                        origX: x * offset,
                        origY: y * offset,
                        origZ: z * offset,
                    });
                }
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Continuous smooth rotation for the whole puzzle
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            groupRef.current.rotation.x = state.clock.elapsedTime * 0.08;
        }
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!cubesGroupRef.current || !pivotRef.current || !groupRef.current) return;

            const allCubes = [...cubesGroupRef.current.children];

            const sequence = [
                { axis: 'y', dir: 1, layer: 1.02 },
                { axis: 'x', dir: -1, layer: 1.02 },
                { axis: 'z', dir: 1, layer: -1.02 },
                { axis: 'y', dir: -1, layer: 0 },
                { axis: 'x', dir: 1, layer: -1.02 },
                { axis: 'z', dir: -1, layer: 1.02 },
            ];

            // 1. Instantly scramble the cube before paint
            sequence.forEach(move => {
                const angle = move.dir * (Math.PI / 2);
                const meshes = cubesGroupRef.current!.children.filter(
                    (c: any) => c.isMesh && Math.abs(c.position[move.axis as 'x'|'y'|'z'] - move.layer) < 0.2
                );
                
                meshes.forEach(m => pivotRef.current!.attach(m));
                pivotRef.current!.rotation[move.axis as 'x'|'y'|'z'] = angle;
                meshes.forEach(m => cubesGroupRef.current!.attach(m));
                pivotRef.current!.rotation.set(0, 0, 0);

                // Grid snap to prevent floating point drift
                meshes.forEach(m => {
                    m.position.x = Math.round(m.position.x / 1.02) * 1.02;
                    m.position.y = Math.round(m.position.y / 1.02) * 1.02;
                    m.position.z = Math.round(m.position.z / 1.02) * 1.02;
                    m.rotation.x = Math.round(m.rotation.x / (Math.PI/2)) * (Math.PI/2);
                    m.rotation.y = Math.round(m.rotation.y / (Math.PI/2)) * (Math.PI/2);
                    m.rotation.z = Math.round(m.rotation.z / (Math.PI/2)) * (Math.PI/2);
                });
            });

            // 2. Play the elegant "Solving" sequence
            const solveTl = gsap.timeline({ delay: 0.5 });
            [...sequence].reverse().forEach((move, index) => {
                solveTl.add(() => {
                    if (!pivotRef.current || !cubesGroupRef.current) return;
                    
                    const angle = -move.dir * (Math.PI / 2);
                    const meshes = cubesGroupRef.current.children.filter(
                        (c: any) => c.isMesh && Math.abs(c.position[move.axis as 'x'|'y'|'z'] - move.layer) < 0.2
                    );

                    meshes.forEach(m => pivotRef.current!.attach(m));

                    gsap.to(pivotRef.current!.rotation, {
                        [move.axis]: angle,
                        duration: 0.8,
                        ease: "back.out(1.4)",
                        onComplete: () => {
                            if (!pivotRef.current || !cubesGroupRef.current) return;
                            meshes.forEach(m => cubesGroupRef.current!.attach(m));
                            pivotRef.current!.rotation.set(0, 0, 0);
                            
                            meshes.forEach(m => {
                                m.position.x = Math.round(m.position.x / 1.02) * 1.02;
                                m.position.y = Math.round(m.position.y / 1.02) * 1.02;
                                m.position.z = Math.round(m.position.z / 1.02) * 1.02;
                                m.rotation.x = Math.round(m.rotation.x / (Math.PI/2)) * (Math.PI/2);
                                m.rotation.y = Math.round(m.rotation.y / (Math.PI/2)) * (Math.PI/2);
                                m.rotation.z = Math.round(m.rotation.z / (Math.PI/2)) * (Math.PI/2);
                            });
                        }
                    });
                }, index * 1.1);
            });

            // 3. Scroll Interactions
            gsap.to(groupRef.current!.position, {
                y: 2,
                z: -5,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            const problemTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#problem-section",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                }
            });

            allCubes.forEach((mesh: any) => {
                if (!mesh.isMesh) return;
                const targetX = mesh.userData.origX * 5.0;
                const targetY = mesh.userData.origY * 5.0;
                const targetZ = mesh.userData.origZ * 5.0;
                
                problemTimeline.to(mesh.position, {
                    x: targetX,
                    y: targetY,
                    z: targetZ,
                    ease: "power2.inOut"
                }, 0);

                problemTimeline.to(mesh.rotation, {
                    x: Math.random() * Math.PI * 2,
                    y: Math.random() * Math.PI * 2,
                    z: Math.random() * Math.PI * 2,
                    ease: "power2.inOut"
                }, 0);
            });

            gsap.to(groupRef.current!.position, {
                z: -40, 
                ease: "power2.in",
                scrollTrigger: {
                    trigger: "#howidentraworks",
                    start: "top bottom", 
                    end: "top center",   
                    scrub: 1,
                }
            });
            gsap.to(groupRef.current!.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: "#howidentraworks",
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                }
            });
        });
        return () => ctx.revert();
    }, []);

    // Ultra-Premium Dark Gunmetal / Obsidian Finish
    const metallicMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: "#0d0d12",      // Deep black/gunmetal base
        emissive: "#000000",   
        metalness: 1.0,        // Fully metallic
        roughness: 0.15,       // Slight diffusion for a heavy, expensive matte-shine look
        clearcoat: 1.0,        // Glossy outer shell
        clearcoatRoughness: 0.05, 
        envMapIntensity: 2.5,  // Bright enough to catch the studio highlights
        iridescence: 0.1,      // Extremely subtle tech sheen
        iridescenceIOR: 1.4,
    }), []);

    return (
        <Float speed={2.0} rotationIntensity={0.4} floatIntensity={1.2}>
            {/* Positioned cleanly on the right, scaled down */}
            <group ref={groupRef} position={[3.8, -0.2, -4.5]} scale={1.05}>
                <group ref={pivotRef} />
                <group ref={cubesGroupRef}>
                    {cubes.map((data, i) => (
                        <RoundedBox 
                            key={i} 
                            args={[0.98, 0.98, 0.98]} 
                            radius={0.06} 
                            smoothness={4} 
                            position={[data.x, data.y, data.z]}
                            userData={{ origX: data.origX, origY: data.origY, origZ: data.origZ }}
                            material={metallicMaterial}
                        />
                    ))}
                </group>
            </group>
        </Float>
    );
}

export function SecureCoreScene() {
    return (
        <div
            id="global-scene-container"
            className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030304]"
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={['#030304']} />

                <AdaptiveDpr pixelated />
                <Preload all />

                <fog attach="fog" args={['#030304', 5, 30]} />

                <Suspense fallback={null}>
                    <Environment preset="studio" />
                </Suspense>
                
                <MetallicRubiksCube />

                <Sparkles count={800} scale={15} size={1.2} speed={0.4} opacity={0.15} color="#ffffff" />
                <Sparkles count={200} scale={12} size={2.5} speed={0.8} opacity={0.25} color="#4fd1c5" />

                {/* Reduced ambient wash to allow real metallic contrast, boosted point lights for bright highlights */}
                <ambientLight intensity={0.4} />
                <rectAreaLight width={20} height={20} position={[0, 10, 0]} color={"#ffffff"} intensity={8} />
                <pointLight position={[-10, 5, -5]} intensity={25} color="#6366f1" />
                <pointLight position={[10, -5, 5]} intensity={30} color="#ffffff" />
                <pointLight position={[5, 10, 5]} intensity={15} color="#4fd1c5" />
            </Canvas>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />
        </div>
    );
}
