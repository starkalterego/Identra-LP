"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { AppWindow, Cpu, ShieldCheck } from "lucide-react";

const STEPS = [
    {
        title: "Local Context Capture",
        description:
            "Active window text is read using system accessibility APIs. No screenshots. No recording.",
        icon: AppWindow,
        align: "left" as const,
    },
    {
        title: "Local Memory & Embeddings",
        description:
            "Context is embedded locally using on-device models for speed and privacy.",
        icon: Cpu,
        align: "right" as const,
    },
    {
        title: "Encrypted Cloud Reasoning",
        description:
            "Only encrypted data leaves the device. Decryption keys exist only inside secure enclaves.",
        icon: ShieldCheck,
        align: "left" as const,
    },
];

export function HowIdentraWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeStep, setActiveStep] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const step = Math.min(
            Math.floor(latest * STEPS.length),
            STEPS.length - 1
        );
        setActiveStep(step);
    });

    return (
        <section id="how-it-works-section" ref={containerRef} className="relative z-20 -mt-[50vh] h-[400vh] bg-gradient-to-b from-transparent via-background to-background">
            {/* Subtle background field */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />

            <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-5xl mx-auto">

                        {/* Steps in Zigzag Pattern */}
                        <div className="relative space-y-12 md:space-y-16">
                            {STEPS.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = activeStep === index;
                                const isCompleted = activeStep > index;
                                const isLeft = step.align === "left";

                                return (
                                    <motion.div
                                        key={index}
                                        initial={false}
                                        animate={{
                                            opacity: isActive ? 1 : isCompleted ? 0.5 : 0.25,
                                        }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                                    >
                                        {/* Content Card */}
                                        <motion.div
                                            animate={{
                                                x: isActive ? 0 : isLeft ? -30 : 30,
                                                scale: isActive ? 1 : 0.95,
                                            }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative w-full md:w-[70%] lg:w-[60%]"
                                        >
                                            <div className="relative bg-secondary/5 backdrop-blur-sm rounded-xl border border-border/20 p-5 md:p-6">
                                                {/* Active indicator */}
                                                <motion.div
                                                    className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/40 rounded-full`}
                                                    animate={{
                                                        opacity: isActive ? 1 : 0,
                                                        scaleY: isActive ? 1 : 0,
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                    style={{
                                                        boxShadow: isActive ? '0 0 10px rgba(79, 209, 197, 0.5)' : 'none',
                                                    }}
                                                />

                                                <div className="flex items-start gap-4">
                                                    {/* Icon - Static */}
                                                    <div className="flex-shrink-0">
                                                        <div className="relative">
                                                            <Icon
                                                                className="w-10 h-10 md:w-12 md:h-12 text-foreground/60"
                                                                strokeWidth={1.5}
                                                                fill="none"
                                                            />
                                                            {/* Static Icon glow (only opacity change) */}
                                                            <motion.div
                                                                className="absolute inset-0 -m-3"
                                                                animate={{
                                                                    opacity: isActive ? 0.2 : 0,
                                                                }}
                                                                transition={{ duration: 0.6 }}
                                                            >
                                                                <div className="w-full h-full rounded-full bg-primary/40 blur-xl" />
                                                            </motion.div>
                                                        </div>
                                                    </div>

                                                    {/* Text Content */}
                                                    <div className="flex-1 min-w-0">
                                                        {/* Number and Title */}
                                                        <div className="mb-2">
                                                            <div className="flex items-baseline gap-2">
                                                                <motion.span
                                                                    className="font-mono text-xs font-medium flex-shrink-0"
                                                                    animate={{
                                                                        color: isActive
                                                                            ? 'rgba(79, 209, 197, 1)'
                                                                            : 'rgba(255, 255, 255, 0.4)',
                                                                    }}
                                                                    transition={{ duration: 0.5 }}
                                                                >
                                                                    0{index + 1}
                                                                </motion.span>
                                                                <h3 className="text-lg md:text-xl font-display font-medium text-foreground">
                                                                    {step.title}
                                                                </h3>
                                                            </div>
                                                        </div>

                                                        {/* Description */}
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
