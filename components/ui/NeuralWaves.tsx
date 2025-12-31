"use client";

import { useEffect, useRef } from "react";

export function NeuralWaves() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let frameId: number = 0;
        let time = 0;

        // Wave Configuration
        const WAVES = 5;
        const POINTS = 200; // Resolution
        const ACCENT_COLOR = "79, 209, 197"; // Teal

        // Animation Loop
        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Subtle Gradient Background to give depth
            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, "rgba(0,0,0,0)");
            bgGradient.addColorStop(1, "rgba(79, 209, 197, 0.05)");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            time += 0.005;

            // Draw multiple waves
            for (let i = 0; i < WAVES; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height / 2);

                const opacity = 0.1 + (i / WAVES) * 0.15;
                const offset = i * 20;
                const speed = 1 + i * 0.5;

                for (let x = 0; x <= width; x += width / POINTS) {
                    // Complex Sine Wave Math (Superposition)
                    // y = center + sine1 + sine2 + noise
                    const scaledX = x * 0.002;
                    const y =
                        height / 2 +
                        Math.sin(scaledX * 5 + time * speed + i) * 100 * Math.sin(time * 0.2) + // Breathing amplitude
                        Math.cos(scaledX * 10 - time) * 50 +
                        Math.sin(scaledX * 20 + time * 2) * 20 +
                        offset;

                    ctx.lineTo(x, y);
                }

                ctx.strokeStyle = `rgba(${ACCENT_COLOR}, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Fill below the last wave for grounding effect (optional, maybe too heavy)
                // if (i === WAVES - 1) {
                //      ctx.lineTo(width, height);
                //      ctx.lineTo(0, height);
                //      ctx.fillStyle = `rgba(${ACCENT_COLOR}, 0.02)`;
                //      ctx.fill();
                // }
            }

            frameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
        />
    );
}
