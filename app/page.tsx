'use client';

import React from 'react';
import Link from 'next/link';
import { BENEFITS } from '../constants';
import type { Benefit } from '../types';
import { CheckCircleIcon, SparklesIcon, ShieldCheckIcon, ZapIcon } from '../components/icons';

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => (
    <div className="bg-dark-800 rounded-xl p-6 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-secondary/20">
        <div className="mb-4">
            {benefit.icon}
        </div>
        <h3 className="text-xl font-bold text-light-100 mb-2">{benefit.title}</h3>
        <p className="text-light-200">{benefit.description}</p>
    </div>
);

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
          Empower Your Workflow
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-light-200 mb-8">
          Discover a universe of curated, top-tier tools and software. We provide the essentials to build, create, and innovate faster than ever before.
        </p>
        <Link 
          href="/tools"
          className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-secondary/40 focus:outline-none focus:ring-4 focus:ring-secondary/50"
        >
          Explore Tools
        </Link>
      </section>

      {/* Benefits Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
            ))}
        </div>
      </section>
    </div>
  );
}