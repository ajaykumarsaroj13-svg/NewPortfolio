/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface QuantrexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'auto';
}

export default function QuantrexLogo({ className = '', size = 'md' }: QuantrexLogoProps) {
  // Determine dimensions based on size presets if className isn't fully customizing it
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-24 h-24',
    auto: 'w-full h-full'
  };

  const selectedSizeClass = size === 'auto' ? '' : sizeClasses[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={`${selectedSizeClass} ${className} shrink-0 transition-transform duration-300`}
      aria-label="Quantrex Academy Logo"
    >
      <defs>
        {/* Silver Chrome Metallic Gradient for the main Q-ring */}
        <linearGradient id="silverChrome" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#f7fafc" />
          <stop offset="25%" stopColor="#cbd5e0" />
          <stop offset="50%" stopColor="#718096" />
          <stop offset="75%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#4a5568" />
        </linearGradient>

        {/* Neon Hyper Blue Gradient for Orbit Ring and Swoosh */}
        <linearGradient id="neonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan 400 */}
          <stop offset="50%" stopColor="#3b82f6" /> {/* Blue 500 */}
          <stop offset="100%" stopColor="#6366f1" /> {/* Indigo 500 */}
        </linearGradient>

        {/* Glow Filter */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Decorative Outer Glow Aura */}
      <circle cx="250" cy="250" r="190" fill="none" stroke="url(#neonBlue)" strokeWidth="2" opacity="0.15" />

      {/* Neon Blue Orbital Orbiting Ring (Dynamic angled outer loop) */}
      <path
        d="M 120,400 C 60,320 70,180 180,120 C 290,60 410,120 440,220 C 470,300 420,380 340,410"
        fill="none"
        stroke="url(#neonBlue)"
        strokeWidth="16"
        strokeLinecap="round"
        filter="url(#neonGlow)"
        opacity="0.9"
      />

      {/* Main Metallic Silver 3D Q-Ring Body */}
      <path
        d="M 250,90 C 160,90 90,160 90,250 C 90,340 160,410 250,410 C 310,410 365,375 390,320 L 320,290 C 310,310 280,330 250,330 C 205,330 170,295 170,250 C 170,205 205,170 250,170 C 285,170 315,195 325,225"
        fill="none"
        stroke="url(#silverChrome)"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Energetic Upward Momentum Swoosh/Arrow (The JEE Core Ascent Arrow) */}
      {/* Starting from lower-left inside, wrapping around and blasting out top-right */}
      <path
        d="M 152,240 C 165,200 210,140 270,135 L 320,120 L 375,100 L 330,160 L 315,210 C 280,195 210,210 180,240 Z"
        fill="url(#neonBlue)"
        filter="url(#neonGlow)"
      />

      {/* Precise Arrowhead breaking bounds to the top right representing target rank and IIT success */}
      <path
        d="M 280,180 L 380,80 L 340,160 Z"
        fill="url(#neonBlue)"
        filter="url(#neonGlow)"
      />
      
      {/* 3D Highlight Stroke for the main Silver Q-Ring */}
      <path
        d="M 250,110 C 175,110 115,170 115,245 C 115,310 170,370 245,375"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        opacity="0.4"
        strokeLinecap="round"
      />

      {/* Orbiting particles / Stars mapping success coordinates */}
      <circle cx="160" cy="180" r="8" fill="#22d3ee" filter="url(#neonGlow)" />
      <circle cx="380" cy="340" r="6" fill="#6366f1" filter="url(#neonGlow)" />
      <circle cx="410" cy="150" r="10" fill="#22d3ee" filter="url(#neonGlow)" />
    </svg>
  );
}
