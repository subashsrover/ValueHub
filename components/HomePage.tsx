
'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BENEFITS } from '../constants';
import type { Benefit } from '../types';
import { CheckCircleIcon, SparklesIcon, ShieldCheckIcon, ZapIcon, SearchIcon, StarIcon } from './icons';

interface HomePageProps {
  onExploreClick: () => void;
}

const BenefitCard: React.FC<{ benefit: Benefit; index: number }> = ({ benefit, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden group"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
            <div className="mb-6 p-3 bg-dark-800/50 rounded-xl w-fit border border-white/10 group-hover:border-secondary/50 transition-colors duration-300">
                {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-light-100 mb-3">{benefit.title}</h3>
            <p className="text-light-200/80 leading-relaxed">{benefit.description}</p>
        </div>
    </motion.div>
);

// Mock 3D Element for Hero
const FloatingCard = ({ className, children, delay = 0, speed = 1 }: any) => {
    return (
        <motion.div
            animate={{ 
                y: [0, -15 * speed, 0],
                rotate: [0, 2, -2, 0]
            }}
            transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay 
            }}
            className={`absolute bg-dark-800/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl ${className}`}
        >
            {children}
        </motion.div>
    );
};

const HeroParallax = ({ onExploreClick }: { onExploreClick: () => void }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Mouse Parallax
    const x = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 100 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        x.set((clientX - centerX) / 50);
        mouseY.set((clientY - centerY) / 50);
    };

    return (
        <section 
            ref={ref} 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
        >
            <motion.div style={{ y, opacity }} className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider mb-6">
                                <SparklesIcon className="w-4 h-4" />
                                <span>The Future of Discovery</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-light-100">
                                Discover Tools from <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-blue-400 to-purple-400 animate-gradient-x">
                                    Another Dimension
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-light-200/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                A curated universe of top-tier software. We provide the essentials to build, create, and innovate faster than ever before.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={onExploreClick}
                                    className="group relative px-8 py-4 bg-secondary rounded-full text-white font-bold text-lg overflow-hidden shadow-lg hover:shadow-secondary/50 transition-all hover:scale-105"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                                    <span className="relative flex items-center gap-2">
                                        Explore Tools <ZapIcon className="w-5 h-5" />
                                    </span>
                                </button>
                                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-light-100 font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
                                    How it Works
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3D Visuals */}
                    <div className="lg:w-1/2 relative h-[500px] w-full perspective-1000">
                         {/* Abstract Center Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>

                        {/* Floating Elements controlled by mouse */}
                        <motion.div 
                            style={{ x: mouseXSpring, y: mouseYSpring, rotateX: mouseYSpring, rotateY: mouseXSpring }}
                            className="w-full h-full relative transform-style-3d"
                        >
                            {/* Central Hub Visual - CSS 3D Sphere Representation */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),_0_0_20px_rgba(59,130,246,0.5)] z-20 flex items-center justify-center">
                                <ZapIcon className="w-20 h-20 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            </div>
                            
                            {/* Orbiting Ring */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

                            {/* Floating Cards */}
                            <FloatingCard className="top-10 left-10 z-10" delay={0} speed={1.2}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
                                    <div>
                                        <div className="h-2 w-16 bg-white/20 rounded mb-1"></div>
                                        <div className="h-2 w-10 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="bottom-20 right-10 z-30" delay={1} speed={1.1}>
                                <div className="flex flex-col items-center gap-2 p-2">
                                    <div className="flex gap-1">
                                        <StarIcon className="w-4 h-4 text-yellow-400" filled />
                                        <StarIcon className="w-4 h-4 text-yellow-400" filled />
                                        <StarIcon className="w-4 h-4 text-yellow-400" filled />
                                        <StarIcon className="w-4 h-4 text-yellow-400" filled />
                                        <StarIcon className="w-4 h-4 text-yellow-400" filled />
                                    </div>
                                    <div className="text-xs font-bold text-light-100">Top Rated</div>
                                </div>
                            </FloatingCard>

                            <FloatingCard className="top-20 right-0 z-0 blur-[1px]" delay={2} speed={0.9}>
                                <SearchIcon className="w-8 h-8 text-light-200/50" />
                            </FloatingCard>

                             <FloatingCard className="bottom-10 left-20 z-30" delay={0.5} speed={1.3}>
                                <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                   <span className="text-sm font-bold text-light-100">Live Updates</span>
                                </div>
                            </FloatingCard>

                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const HomePage: React.FC<HomePageProps> = ({ onExploreClick }) => {
  return (
    <>
        <HeroParallax onExploreClick={onExploreClick} />

        {/* Benefits Section with 3D Cards */}
        <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-dark-900/50">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-4">Why Choose Value Hub?</h2>
                    <p className="text-light-200/60 max-w-2xl mx-auto">We go beyond a simple list. We provide an ecosystem designed for growth.</p>
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                    {BENEFITS.map((benefit, index) => (
                        <BenefitCard key={index} benefit={benefit} index={index} />
                    ))}
                </div>
            </div>
        </section>
    </>
  );
};

export default HomePage;
