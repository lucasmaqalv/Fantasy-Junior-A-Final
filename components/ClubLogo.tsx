

import React, { useState } from 'react';

interface ClubLogoProps {
  className?: string;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({ className = "w-full h-full" }) => {
  // Use direct image URLs for realism
  const [imgSrc, setImgSrc] = useState("https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Fundaci%C3%B3n_CB_Granada_logo.svg/1200px-Fundaci%C3%B3n_CB_Granada_logo.svg.png");
  const [attempts, setAttempts] = useState(0);

  const handleError = () => {
    if (attempts === 0) {
      // Fallback: Original SVG URL
      setImgSrc("https://upload.wikimedia.org/wikipedia/en/4/4d/Fundaci%C3%B3n_CB_Granada_logo.svg");
      setAttempts(1);
    } else if (attempts === 1) {
      // Fallback 2: Placeholder
      setImgSrc("https://placehold.co/200x200/E30613/FFFFFF/png?text=FCBG");
      setAttempts(2);
    }
  };

  return (
    <img 
      src={imgSrc}
      alt="Fundación CB Granada Logo"
      className={`${className} object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
      onError={handleError}
    />
  );
};