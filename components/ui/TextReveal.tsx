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
                ".char",
                {
                    y: 60,
                    opacity: 0,
                    filter: "blur(12px)",
                    rotateX: -60,
                    transformOrigin: "50% 50% -50px",
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    rotateX: 0,
                    duration: duration,
                    stagger: 0.04,
                    ease: "power3.out",
                    delay: delay,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [text, delay, duration]);

    // Split text into words, then characters, to preserve word wrapping
    const renderContent = () => {
        const words = text.split(" ");

        return words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, charIndex) => (
                    <span
                        key={charIndex}
                        className="char inline-block"
                        style={{ whiteSpace: "normal" }}
                    >
                        {char}
                    </span>
                ))}
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
