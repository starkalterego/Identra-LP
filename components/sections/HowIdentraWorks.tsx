"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        title: "Local Context Capture",
        description: "Active window text is read using system accessibility APIs. No screenshots. No recording. Privacy first.",
    },
    {
        title: "Local Memory & Embeddings",
        description: "Context is embedded locally using on-device models for speed and privacy. Your data never leaves your RAM.",
    },
    {
        title: "Encrypted Cloud Reasoning",
        description: "Only encrypted data leaves the device. Decryption keys exist only inside secure enclaves. Zero-knowledge proof.",
    },
];

export function HowIdentraWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal Scroll Animation
            const totalWidth = sectionRef.current?.scrollWidth || 0;
            const windowWidth = window.innerWidth;

            // Calculate how much to scroll: (Total content width) - (1 screen width)
            // But we want a bit of padding at the end, so let's scroll a bit less or exact.
            // Using a simple logic: Scroll the container left by (total items * item width) approx.

            // Actually, best way for GSAP horizontal scroll:
            // "x: - (totalWidth - windowWidth)"

            const animation = gsap.to(sectionRef.current, {
                x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=3000", // Scroll distance
                    scrub: 1, // Smooth scrubbing
                    pin: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update active index based on progress
                        const progress = self.progress;
                        const index = Math.round(progress * (STEPS.length - 1));
                        setActiveIndex(index);
                    }
                }
            });

            // Parallax/Horizontal Effect for Header
            gsap.to(headerRef.current, {
                x: -800, // Move faster
                opacity: 0,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=800", // Fade out quicker
                    scrub: 1,
                }
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="relative h-screen bg-black overflow-hidden" id="how-it-works-section">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black opacity-40 pointer-events-none" />

            {/* Header (Absolute Pinned) */}
            {/* Header (Absolute Pinned) - Platinum Gradient */}
            <div ref={headerRef} className="absolute top-28 left-6 md:left-24 z-20 pointer-events-none mix-blend-difference">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-display font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50"
                >
                    How Identra Works
                </motion.h2>
            </div>

            {/* Horizontal Track - Aligned Bottom to clear Header */}
            <div
                ref={sectionRef}
                className="flex items-end h-full pb-12 md:pb-16 pl-[5vw] pr-[20vw] md:pl-[30vw] md:pr-[20vw] gap-[5vw] md:gap-[15vw] w-fit"
            >
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={index}
                            className={`relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] h-auto min-h-[50vh] max-h-[75vh] flex flex-col justify-end transition-all duration-700 ease-out ${isActive ? 'scale-100 opacity-100 blur-0' : 'scale-90 opacity-30 blur-[2px]'}`}
                        >
                            {/* Card Container - Full Height of Parent */}
                            <div className="relative group h-full flex flex-col">
                                {/* Glass Background */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 transition-colors duration-500 group-hover:bg-white/10 overflow-hidden">
                                    {/* Noise Texture */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                                </div>

                                {/* Active Glow Border */}
                                <div className={`absolute inset-0 rounded-3xl border transition-opacity duration-700 ${isActive ? 'border-primary/50 opacity-100 shadow-[0_0_50px_-10px_rgba(79,209,197,0.2)]' : 'border-transparent opacity-0'}`} />

                                <div className="relative p-8 md:p-12 flex flex-col gap-8">
                                    {/* Minimalist Header */}
                                    <div className="flex flex-col gap-6">
                                        {/* Technical Badge */}
                                        <div className="flex items-center gap-3">
                                            <div className={`h-px w-8 transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-white/20'}`} />
                                            <span className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-primary' : 'text-white/40'}`}>
                                                SYS_MOD_0{index + 1}
                                            </span>
                                        </div>

                                        {/* Large Editorial Title */}
                                        <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-tight">
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Tech Divider */}
                                    <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed text-sm md:text-lg max-w-xl">
                                        {step.description}
                                    </p>

                                    {/* Bottom Connectors Visual */}
                                    <div className="w-full h-px bg-white/5 mt-4 relative overflow-hidden">
                                        {isActive && (
                                            <div className="absolute inset-0 bg-primary/50 w-full h-full animate-progress-line" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
