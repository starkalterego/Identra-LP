"use client";

import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export function MemoryField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Configuration
        const NODE_COUNT = 45;
        const CONNECTION_DISTANCE = 150;
        const BASE_OPACITY = 0.1;
        const ACCENT_COLOR = "79, 209, 197"; // #4FD1C5 (teal-like)

        // Initialize nodes
        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.05, // Extremely slow drift
            vy: (Math.random() - 0.5) * 0.05,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
        }));

        let time = 0;
        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges (gentle return)
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Randomly use accent color for a few nodes
                const isAccent = i % 8 === 0;

                // Pulse effect for accent nodes
                let currentOpacity = node.opacity;
                if (isAccent) {
                    // Sine wave pulse between 0.5x and 1.5x of base opacity
                    const pulse = (Math.sin(time + i) + 1) / 2; // 0 to 1
                    currentOpacity = node.opacity * (0.5 + pulse);
                }

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

                ctx.fillStyle = isAccent
                    ? `rgba(${ACCENT_COLOR}, ${currentOpacity * BASE_OPACITY * 1.5})`
                    : `rgba(255, 255, 255, ${currentOpacity * BASE_OPACITY})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        const opacity =
                            (1 - distance / CONNECTION_DISTANCE) * BASE_OPACITY * 0.4; // Reduced connection opacity
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        // Tint connections if one of the nodes is an accent node
                        ctx.strokeStyle = isAccent
                            ? `rgba(${ACCENT_COLOR}, ${opacity})`
                            : `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
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
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-60"
            aria-hidden="true"
        />
    );
}
