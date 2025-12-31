"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for glass effect intensity
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} // Faster
            className={`fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 px-4 pointer-events-none transition-all duration-500`}
        >
            <div
                className={`
                    flex items-center justify-between w-full max-w-4xl px-5 py-2.5 rounded-full pointer-events-auto
                    transition-all duration-500
                    ${scrolled
                        ? "bg-[#0A0A0B]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-white/10"
                        : "bg-white/[0.02] backdrop-blur-[2px] border border-white/5"
                    }
                `}
            >
                {/* Premium Logo */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        {/* Abstract Layered Logo */}
                        <div className="absolute inset-0 bg-white/10 rounded-lg rotate-0 transition-transform group-hover:rotate-45 duration-500" />
                        <div className="absolute inset-1 bg-white/30 rounded-md rotate-45 transition-transform group-hover:rotate-90 duration-500 backdrop-blur-sm" />
                        <div className="absolute inset-2 bg-white rounded-sm rotate-0 transition-transform group-hover:rotate-180 duration-700 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-display font-bold text-base tracking-wide text-white leading-none">IDENTRA</span>
                    </div>
                </div>

                {/* Central Links (Desktop) */}
                <nav className="hidden md:flex items-center gap-1">
                    {["Product", "Security", "Enterprise", "Changelog"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="px-4 py-1.5 text-xs font-medium text-muted-foreground/80 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-full"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Right Action */}
                <div className="flex items-center gap-4">
                    <Link href="#" className="hidden sm:block text-xs font-medium text-muted-foreground hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Button size="sm" className="rounded-full bg-white text-black hover:bg-gray-200 font-bold px-6 h-9 text-xs shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.7)] transition-shadow">
                        Get Started
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}
