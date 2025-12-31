"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef } from "react";

export function Hero() {
    // containerRef removed as it was unused

    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-transparent">
            {/* Atmosphere Layer: Volumetric Light & Fog */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* 1. Top-Left Spotlight (The "God Ray" source) */}
                <div
                    className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)" }}
                />

                {/* 2. Bottom Fog (Seamless blend to next section) */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl">
                    {/* Headline - GSAP Staggered Reveal */}
                    <div className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-6">
                        <TextReveal text="The OS that remembers" className="mb-2" />
                        <div className="text-muted-foreground">
                            <TextReveal text="your work." delay={0.2} /> {/* Faster follow-up */}
                        </div>
                    </div>

                    {/* Subheadline - Delayed Entrance */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5, // Much earlier (was 1.2)
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <h2 className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                            A confidential AI operating layer built for deep focus, persistent
                            context, and secure workflows.
                        </h2>
                    </motion.div>

                    {/* CTAs - Delayed Entrance */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7, // (was 1.4)
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <MagneticButton strength={0.4}>
                            <Button size="lg" className="rounded-full px-10 group transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-foreground text-background font-semibold text-base">
                                <Download className="mr-2 h-4 w-4" />
                                Download Desktop App
                            </Button>
                        </MagneticButton>

                        <MagneticButton strength={0.3}>
                            <Button variant="ghost" size="lg" className="rounded-full px-8 border border-white/5 bg-white/[0.02] hover:bg-white/10 group backdrop-blur-sm transition-all hover:border-white/10">
                                See how it works
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 opacity-70" />
                            </Button>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
