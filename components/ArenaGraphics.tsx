import React from 'react';

export function SvgArenaAsfalto() { 
  return ( 
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <defs>
        <pattern id="asphalt" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#333"/>
          <circle cx="2" cy="2" r="0.5" fill="#444"/>
          <circle cx="7" cy="7" r="0.7" fill="#404040"/>
        </pattern>
        <linearGradient id="crackGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF006E" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#FF00F5" stopOpacity="0.4"/>
        </linearGradient>
      </defs>
      <rect width="100" height="60" fill="url(#asphalt)" />
      <path d="M10 50 L 30 45 L 35 55 L 50 30 L 55 40 L 70 25 L 75 35 L 90 20" 
        strokeWidth="3.5" stroke="url(#crackGradient)" fill="none" strokeLinecap="round" 
        style={{ filter: 'drop-shadow(0 0 4px var(--neon-red))' }} 
      />
    </svg> 
  );
};

export function SvgArenaPabellon() { 
  return ( 
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <defs>
          <linearGradient id="woodGrain" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A0522D"/>
              <stop offset="50%" stopColor="#D2691E"/>
              <stop offset="100%" stopColor="#A0522D"/>
          </linearGradient>
          <filter id="woodNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
              <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" />
          </filter>
      </defs>
      <rect width="100" height="60" fill="url(#woodGrain)" />
      <rect width="100" height="60" fill="black" opacity="0.1" filter="url(#woodNoise)" />
      {[...Array(5)].map((_, i) => ( <line key={i} x1="0" y1={(i+1)*10} x2="100" y2={(i+1)*10} stroke="black" strokeWidth="0.6" opacity="0.5" />))}
      <circle cx="50" cy="30" r="15" stroke="white" strokeWidth="1.8" fill="none" opacity="0.7" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}/>
      <rect x="35" y="20" width="30" height="20" stroke="white" strokeWidth="1.8" fill="none" opacity="0.7"/>
    </svg> 
  );
};

export function SvgArenaPalacio() { 
  return ( 
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <defs>
        <radialGradient id="palaceSpotlight" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="rgba(255, 255, 220, 0.9)"/>
          <stop offset="60%" stopColor="rgba(30, 30, 50, 0.7)"/>
          <stop offset="100%" stopColor="#1C1C1C"/>
        </radialGradient>
        <filter id="crowdBlur"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>
      <rect width="100" height="60" className="text-gray-900" fill="#1C1C1C" />
      {/* Crowd Silhouette (Subtle) */}
      <ellipse cx="50" cy="70" rx="60" ry="25" fill="#222" filter="url(#crowdBlur)"/>
      <rect width="100" height="60" fill="url(#palaceSpotlight)" />
      {/* Court lines */}
      <circle cx="50" cy="30" r="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
      <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    </svg> 
  );
};

export function SvgArenaElite() { 
  return ( 
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD700"/>
              <stop offset="50%" stopColor="#F0E68C"/>
              <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
          <radialGradient id="eliteBg" cx="0.5" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#333"/>
              <stop offset="100%" stopColor="#1C1C1C"/>
          </radialGradient>
      </defs>
      <rect width="100" height="60" fill="url(#eliteBg)" />
      <path d="M35 50 L 65 50 L 65 40 Q 67 38, 70 35 L 70 20 Q 65 15, 60 10 L 40 10 Q 35 15, 30 20 L 30 35 Q 33 38, 35 40 Z" 
        fill="url(#goldGradient)" 
        stroke="#FFF8DC" strokeWidth="2.5" 
        style={{ filter: 'drop-shadow(0 0 8px #facc15)' }}
      />
      {/* Sparkle */}
      <path d="M42 15 L 45 12 L 48 15 L 45 18 Z" fill="white" opacity="0.8"/>
    </svg> 
  );
};

export function SvgArenaLegado() { 
  return ( 
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <defs>
          <radialGradient id="legacyGlow" cx="0.5" cy="0.5" r="0.8">
              <stop offset="0%" stopColor="rgba(255, 0, 110, 0.4)"/>
              <stop offset="70%" stopColor="rgba(28, 28, 28, 0.7)"/>
              <stop offset="100%" stopColor="#1C1C1C"/>
          </radialGradient>
          <filter id="neonBlur"><feGaussianBlur stdDeviation="1"/></filter>
      </defs>
      <rect width="100" height="60" fill="url(#legacyGlow)" />
      <path d="M30 15 L 40 10 L 60 10 L 70 15 L 75 25 L 70 40 L 65 50 L 35 50 L 30 40 L 25 25 Z" 
            stroke="#FF00F5" strokeWidth="2" fill="none" 
             filter="url(#neonBlur)" style={{ filter: 'drop-shadow(0 0 6px #FF00F5)' }} />
      <path d="M30 15 L 40 10 L 60 10 L 70 15 L 75 25 L 70 40 L 65 50 L 35 50 L 30 40 L 25 25 Z" 
             stroke="white" strokeWidth="0.5" fill="none" opacity="0.7"/>
      <path d="M50 25 L 52 30 L 58 30 L 53 34 L 55 40 L 50 36 L 45 40 L 47 34 L 42 30 L 48 30 Z" 
             fill="#FF006E" style={{ filter: 'drop-shadow(0 0 5px #FF006E)' }}/>
    </svg> 
  );
};
