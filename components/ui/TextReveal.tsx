"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TextReveal({ text, className = "", delay = 0, duration = 1 }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".word",
                {
                    y: "110%", // Start fully below the line
                    opacity: 0,
                    rotateZ: 5, // Subtle slight rotation for "loose" feel
                },
                {
                    y: "0%",
                    opacity: 1,
                    rotateZ: 0,
                    duration: 1.0,
                    stagger: 0.1, // Stagger entire words
                    ease: "power4.out", // Sharp, snappy professional curve
                    delay: delay,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [text, delay, duration]);

    // Masked Word Reveal
    const renderContent = () => {
        const words = text.split(" ");
        return words.map((word, wordIndex) => (
            // Overflow hidden wrapper acts as the "mask"
            <span key={wordIndex} className="inline-block overflow-hidden align-bottom mr-[0.25em] -mb-2 pb-2">
                <span
                    className="word inline-block will-change-transform" // Optimized target
                    style={{ whiteSpace: "normal" }}
                >
                    {word}
                </span>
            </span>
        ));
    };

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div className="leading-[1.1]">
                {renderContent()}
            </div>
        </div>
    );
}
