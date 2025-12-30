"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    baseOpacity: number;
    depth: number; // 0.1 (far) to 1 (near)
    phase: number;
}

export function MemoryField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let animationFrameId: number;

        // Configuration
        const NODE_COUNT = 80; // Denser field
        const CONNECTION_DISTANCE = 180;
        const MOUSE_INFLUENCE_RADIUS = 300;
        const ACCENT_COLOR_R = 79;
        const ACCENT_COLOR_G = 209;
        const ACCENT_COLOR_B = 197;

        // Initialize nodes with depth
        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
            const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2 * depth, // Farther nodes move slower
                vy: (Math.random() - 0.5) * 0.2 * depth,
                radius: (Math.random() * 1.5 + 0.5) * depth,
                baseOpacity: (Math.random() * 0.4 + 0.1) * depth,
                opacity: 0,
                depth,
                phase: Math.random() * Math.PI * 2,
            };
        });

        let time = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            // Gradient Flow: A subtle wash of color moving across
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "rgba(79, 209, 197, 0.02)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
            gradient.addColorStop(1, "rgba(79, 209, 197, 0.02)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            nodes.forEach((node, i) => {
                // Natural movement
                node.x += node.vx;
                node.y += node.vy;

                // Mouse interaction (Gentle attraction then flow around)
                const dxMouse = mouseRef.current.x - node.x;
                const dyMouse = mouseRef.current.y - node.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < MOUSE_INFLUENCE_RADIUS) {
                    const force = (1 - distMouse / MOUSE_INFLUENCE_RADIUS) * 0.02;
                    node.vx += dxMouse * force * 0.5;
                    node.vy += dyMouse * force * 0.5;
                }

                // Drag/Friction to stabilize high velocities
                node.vx *= 0.98;
                node.vy *= 0.98;

                // Wrap around edges (Infinite field effect)
                if (node.x < -50) node.x = width + 50;
                if (node.x > width + 50) node.x = -50;
                if (node.y < -50) node.y = height + 50;
                if (node.y > height + 50) node.y = -50;

                // Pulse Effect (Breathing)
                node.opacity = node.baseOpacity + Math.sin(time + node.phase) * 0.05;

                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Connect if close enough AND similar depth (planar connections)
                    if (dist < CONNECTION_DISTANCE && Math.abs(node.depth - other.depth) < 0.3) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * node.opacity * 0.6;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);

                        // Dynamic color based on depth
                        if (node.depth > 0.8) {
                            ctx.strokeStyle = `rgba(${ACCENT_COLOR_R}, ${ACCENT_COLOR_G}, ${ACCENT_COLOR_B}, ${opacity})`;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                        }

                        ctx.lineWidth = 0.5 * node.depth; // Thinner lines for background
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000"
            aria-hidden="true"
        />
    );
}
