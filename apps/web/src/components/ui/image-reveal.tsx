'use client'
import { motion, Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface ImageRevealProps {
    leftImage: string;
    middleImage: string;
    rightImage: string;
}

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile(); // Check on mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerVariants: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.2,
            }
        }
    };

    const leftImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: -8,
            x: isMobile ? -165 : -390,
            y: 10,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 1,
            x: isMobile ? -175 : -410,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    const middleImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: 6,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 0,
            x: 0,
            y: -10,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    const rightImageVariants: Variants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: -6,
            x: isMobile ? 165 : 410,
            y: 20,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 3,
            x: isMobile ? 175 : 430,
            y: 10,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className="relative mt-0 mb-6 flex h-[300px] w-full max-w-6xl items-center justify-center sm:mb-8 sm:h-[460px]"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* Left Image - Lowest z-index */}
            <motion.div
                className="absolute h-[280px] w-[280px] origin-bottom-right overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl sm:h-[400px] sm:w-[400px]"
                variants={leftImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 30 }}
            >
                <img
                    src={leftImage}
                    alt="Left image"
                    className="w-full h-full object-cover p-2.5 rounded-2xl"
                />
            </motion.div>

            {/* Middle Image - Middle z-index */}
            <motion.div
                className="absolute h-[280px] w-[280px] origin-bottom-left overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl sm:h-[400px] sm:w-[400px]"
                variants={middleImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 20 }}
            >
                <img
                    src={middleImage}
                    alt="Middle image"
                    className="w-full h-full object-cover p-2.5 rounded-2xl"
                />
            </motion.div>

            {/* Right Image - Highest z-index */}
            <motion.div
                className="absolute h-[280px] w-[280px] origin-bottom-right overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-2xl sm:h-[400px] sm:w-[400px]"
                variants={rightImageVariants}
                whileHover="hover"
                animate="animate"
                style={{ zIndex: 10 }}
            >
                <img
                    src={rightImage}
                    alt="Right image"
                    className="w-full h-full object-cover p-2.5 rounded-2xl"
                />
            </motion.div>
        </motion.div>
    );
}
