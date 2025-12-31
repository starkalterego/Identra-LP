"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function DownloadFooter() {
    return (
        <section className="w-full py-32 md:py-48 bg-black relative overflow-hidden flex flex-col items-center border-t border-white/[0.05]">
            {/* Ambient Background - Ultra subtle premium texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />

            {/* Drifting Nebula 1 - Indigo */}
            <motion.div
                className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -30, 30, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Drifting Nebula 2 - Teal/Cyan (Complementary) */}
            <motion.div
                className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
                animate={{
                    x: [0, -30, 30, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Scanning Beam */}
            <motion.div
                className="absolute inset-x-0 h-[200px] bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <div className="container px-6 relative z-10 w-full max-w-7xl mx-auto">

                {/* Main Content Split: Text Left, Buttons Right */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">

                    {/* Left: Headline & Subhead */}
                    <div className="text-left max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-6 leading-[0.9]"
                        >
                            Start using<br />Identra.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-neutral-500 text-xl font-light tracking-wide max-w-md"
                        >
                            Your data stays yours. Always. <br />
                            <span className="text-neutral-700">Enterprise-grade local intelligence.</span>
                        </motion.p>
                    </div>

                    {/* Right: Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
                    >
                        {/* macOS Button (Primary) - Premium Glass with Shimmer */}
                        <MagneticButton strength={0.4}>
                            <button className="group relative flex items-center justify-center gap-4 px-8 py-4 bg-white hover:bg-neutral-200 text-black rounded-full transition-all duration-300 min-w-[200px] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-.91.61.03 2.34.25 3.44 1.86-3.06 1.83-2.56 5.51.53 6.8zM13 3.5c.52-1.47 2.05-2.5 3.52-2.5.55 1.74-2.14 4.58-3.52 2.5z" />
                                </svg>
                                <span className="text-base font-semibold tracking-tight">Download for Mac</span>
                            </button>
                        </MagneticButton>

                        {/* Windows Button (Secondary) - Clean Wireframe */}
                        <MagneticButton strength={0.3}>
                            <button className="group flex items-center justify-center gap-4 px-8 py-4 bg-transparent hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 min-w-[200px] text-white">
                                <svg className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.67L24 0v11.4H10.949V1.779zM0 12.6h9.75v9.451L0 20.699V12.6zm10.949 0H24v11.4l-13.051-1.78V12.6z" />
                                </svg>
                                <span className="text-neutral-400 group-hover:text-white text-base font-medium transition-colors duration-300">Windows</span>
                            </button>
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* Premium System Status - Text Only, No Green Dot */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mb-12"
                >
                    <span className="font-mono text-[11px] text-neutral-600 tracking-[0.2em] uppercase">
                        Identra OS v1.0 • Secure Enclave Active
                    </span>
                </motion.div>

                {/* Divider - Static, Crisp, Premium */}
                <div className="w-full h-px bg-white/[0.1]" />

                {/* Footer Links - Expanding to Fill Width */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full pt-10 flex flex-col md:flex-row justify-between items-center"
                >
                    {/* Copyright / Left */}
                    <span className="text-sm text-neutral-600 mb-6 md:mb-0">
                        © 2025 Identra Inc.
                    </span>

                    {/* Links - Widespread Spacing */}
                    <div className="flex gap-12 md:gap-16 items-center">
                        {["Documentation", "Security", "Contact"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-sm text-neutral-500 hover:text-white transition-colors duration-300 relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                            </a>
                        ))}
                    </div>

                    {/* Right: GitHub - Subtle */}
                    <a
                        href="#"
                        className="text-neutral-600 hover:text-white transition-all duration-300 md:ml-0 mt-6 md:mt-0 p-2 hover:bg-white/5 rounded-full"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
