/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Check, Sparkles, Sliders, RefreshCw, LayoutTemplate } from 'lucide-react';
import { DesignTheme } from '../types';

interface ThemeExplorerProps {
  currentTheme: DesignTheme;
  onThemeChange: (theme: DesignTheme) => void;
}

export default function ThemeExplorer({ currentTheme, onThemeChange }: ThemeExplorerProps) {
  const themes = [
    {
      id: 'minimalist' as DesignTheme,
      name: 'Option 1: Clean & Minimalist',
      tagline: 'Precision, space & sleek black/earth lines',
      description: 'Generous negative whitespaces, crisp modern sans-serif fonts, and fine line dividers. Built for high-end corporate retreats & elite modernists.',
      palette: ['#FFFFFF', '#1C1917', '#78716C', '#F5F5F4'],
      contrastLabel: 'High-Exposure Light'
    },
    {
      id: 'luxurious' as DesignTheme,
      name: 'Option 2: Bold & Luxurious',
      tagline: 'Deep executive charcoal & rich champagne gold',
      description: 'An immersive, high-contrast twilight look combining deep slate-950 with golden glow-effects. Evokes exclusive private VIP lounge states.',
      palette: ['#0C0A09', '#1C1917', '#EAB308', '#78350F'],
      contrastLabel: 'Midnight Dark Mode'
    },
    {
      id: 'boutique' as DesignTheme,
      name: 'Option 3: Warm & Boutique',
      tagline: 'Cozy warm linen, rich bronze & emerald accents',
      description: 'Bespoke warm cream canvases paired with elegant vintage serif titles. Accents focus on lush wellness, cozy family hospitality, and resort gardens.',
      palette: ['#FAF6F0', '#2E2A25', '#15803D', '#B45309'],
      contrastLabel: 'Sophisticated Warm Light'
    }
  ];

  return (
    <div className="bg-stone-900 border-b border-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Header Description */}
          <div className="space-y-1 lg:max-w-md">
            <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                LIVE INTERACTIVE STYLER
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center">
              <Sliders className="h-4.5 w-4.5 text-amber-500 mr-2 shrink-0" />
              Choose Your Luxury Concept Visual Direction
            </h3>
            <p className="text-stone-400 text-xs font-sans leading-relaxed">
              Toggle between 3 distinct design concepts/layouts live. The entire site automatically adapts its fonts, spacing, shadows, and color grids instantly.
            </p>
          </div>

          {/* Cards selector grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer relative hover:scale-[1.01] ${
                    isSelected
                      ? 'bg-stone-950 border-amber-500 shadow-lg shadow-amber-500/5'
                      : 'bg-stone-900/45 border-stone-800 hover:bg-stone-850 hover:border-stone-700'
                  }`}
                >
                  {/* Selected indicator badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-amber-600 text-white rounded-full p-1 shadow">
                      <Check className="h-3 w-3" />
                    </div>
                  )}

                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    {theme.contrastLabel}
                  </span>
                  
                  <h4 className="font-sans font-bold text-sm text-white">{theme.name}</h4>
                  <p className="font-sans text-[11px] text-stone-400 mt-0.5 italic">{theme.tagline}</p>
                  
                  <p className="text-[10px] text-stone-500 mt-2 line-clamp-2 leading-normal">
                    {theme.description}
                  </p>

                  {/* Micro color dots */}
                  <div className="flex items-center space-x-1 mt-3">
                    <span className="text-[9px] font-mono text-stone-600 mr-1.5">PALETTE:</span>
                    {theme.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="h-2.5 w-2.5 rounded-full border border-stone-800"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
