
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BENEFITS } from '../constants';
import type { Benefit } from '../types';
import { CheckCircleIcon, SparklesIcon, ShieldCheckIcon, StarIcon, LogoIcon } from './icons';

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
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Animated Elements (Parallax Layer) */}
            <motion.div style={{ x: mouseXSpring, y: mouseYSpring }} className="absolute inset-0 z-0 pointer-events-none">
                 {/* Central Hub */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
                 
                 {/* Orbiting Elements */}
                 <FloatingCard className="top-1/4 left-1/4" delay={0}>
                     <LogoIcon className="w-12 h-12 text-secondary" />
                 </FloatingCard>
                 <FloatingCard className="bottom-1/3 right-1/4" delay={2}>
                     <CheckCircleIcon className="w-10 h-10 text-green-400" />
                 </FloatingCard>
                 <FloatingCard className="top-1/3 right-1/3" delay={1} speed={1.5}>
                     <SparklesIcon className="w-8 h-8 text-purple-400" />
                 </FloatingCard>
                 <FloatingCard className="bottom-1/4 left-1/3" delay={3} speed={0.8}>
                     <ShieldCheckIcon className="w-8 h-8 text-blue-400" />
                 </FloatingCard>
            </motion.div>

            {/* Hero Content */}
            <motion.div 
                style={{ y, opacity }}
                className="relative z-10 text-center max-w-5xl mx-auto px-6"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        <span className="block text-light-100">Empower Your</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-blue-400 to-purple-500 animate-gradient-x">Digital Workflow</span>
                    </h1>
                </motion.div>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-light-200/80 mb-10 max-w-3xl mx-auto leading-relaxed"
                >
                    Discover a curated universe of top-tier software tools. <br className="hidden md:block" />
                    Build, create, and innovate with the best resources in the industry.
                </motion.p>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button 
                        onClick={onExploreClick}
                        className="group relative px-8 py-4 bg-secondary text-white font-bold text-lg rounded-full overflow-hidden shadow-lg shadow-secondary/30 transition-all hover:scale-105 hover:shadow-secondary/50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative flex items-center gap-2">
                            Explore Tools <StarIcon className="w-5 h-5" filled />
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default function HomePage({ onExploreClick }: HomePageProps) {
  return (
    <div className="relative">
      <HeroParallax onExploreClick={onExploreClick} />

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
         <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-4">Why Choose Value Hub?</h2>
             <p className="text-light-200/60 max-w-2xl mx-auto">We go beyond listing tools. We verify, test, and curate the best software to ensure you get maximum value.</p>
         </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
        </div>
      </section>
    </div>
  );
}
