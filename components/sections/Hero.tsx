"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MemoryField } from "@/components/ui/MemoryField";
import { useRef } from "react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll-based opacity for the background to fade out as user scrolls
    const { scrollY } = useScroll();
    const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center overflow-hidden bg-background">
            {/* Background Layer with Scroll Fade */}
            <motion.div
                style={{ opacity: backgroundOpacity }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <MemoryField />

                {/* User Requested Hero Background Stack - Simplified for Clarity */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Subtle diagonal noise - Texture only */}
                    <div
                        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    />
                </div>

                {/* Enhanced radial vignette for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(11,15,20,0.8)_85%)]" />

                {/* Additional grain texture for depth */}
                <div
                    className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                    }}
                />
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl">
                    {/* Headline - First to appear */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground leading-[1.1] mb-6">
                            The OS that remembers <br />
                            <span className="text-muted-foreground">your work.</span>
                        </h1>
                    </motion.div>

                    {/* Subheadline - Second */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <h2 className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                            A confidential AI operating layer built for deep focus, persistent
                            context, and secure workflows.
                        </h2>
                    </motion.div>

                    {/* CTAs - Last */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <Button size="lg" className="rounded-full px-10 group transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-foreground text-background font-semibold text-base">
                            <Download className="mr-2 h-4 w-4" />
                            Download Desktop App
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-full px-8 border border-white/5 bg-white/[0.02] hover:bg-white/10 group backdrop-blur-sm transition-all hover:border-white/10">
                            See how it works
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 opacity-70" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
