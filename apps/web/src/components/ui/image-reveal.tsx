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
            x: isMobile ? -140 : -320,
            y: 10,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 1,
            x: isMobile ? -150 : -340,
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
            x: isMobile ? 140 : 340,
            y: 20,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 3,
            x: isMobile ? 150 : 360,
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
            className="relative flex items-center justify-center w-full max-w-5xl h-[300px] sm:h-[450px] my-12"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* Left Image - Lowest z-index */}
            <motion.div
                className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] origin-bottom-right overflow-hidden rounded-2xl shadow-2xl bg-white border border-[var(--color-border)]"
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
                className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] origin-bottom-left overflow-hidden rounded-2xl shadow-2xl bg-white border border-[var(--color-border)]"
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
                className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] origin-bottom-right overflow-hidden rounded-2xl shadow-2xl bg-white border border-[var(--color-border)]"
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
