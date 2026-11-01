import React from 'react';

// Namind Wordmark Logo (clean typography without the star/dart icon)
export const NamindLogo: React.FC<{ className?: string; color?: string; inverted?: boolean }> = ({
  className = 'h-9',
  color = '#000000',
  inverted = false,
}) => {
  const fillColor = inverted ? '#FFFFFF' : color;
  return (
    <div className={`flex items-center select-none ${className}`}>
      <span
        style={{ color: fillColor }}
        className="font-['Space_Grotesk'] text-[30px] font-bold tracking-tight leading-none uppercase"
      >
        NAMIND
      </span>
    </div>
  );
};

export const PositivusLogo = NamindLogo;

// Diagonal arrow icon inside circle
export const ArrowUpRightIcon: React.FC<{
  circleBg?: string;
  arrowColor?: string;
  className?: string;
}> = ({ circleBg = '#191A23', arrowColor = '#B9FF66', className = 'w-[41px] h-[41px]' }) => (
  <div
    className={`relative rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
    style={{ backgroundColor: circleBg }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform -rotate-12 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M5 15L15 5M15 5H7.5M15 5V12.5"
        stroke={arrowColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Green diagonal arrow without circle (for case studies)
export const ArrowGreenLink: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform -rotate-12 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${className}`}
  >
    <path
      d="M5 15L15 5M15 5H7.5M15 5V12.5"
      stroke="#B9FF66"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Star icon for testimonials & decor
export const PositivusStar: React.FC<{
  active?: boolean;
  className?: string;
  size?: number;
}> = ({ active = false, className = '', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-colors duration-200 ${className}`}
  >
    <path
      d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
      fill={active ? '#B9FF66' : '#FFFFFF'}
    />
  </svg>
);

// Company Logotypes
export const AmazonLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <svg className={className} viewBox="0 0 125 38" fill="currentColor">
    <path d="M72.2 24.3c-4.8 3.5-11.8 5.4-17.8 5.4-8.5 0-16.1-3.1-21.9-8.4-.5-.4-.1-1 .5-.7 6.2 3.6 13.9 5.8 21.8 5.8 5.3 0 11.2-1.2 16.6-3.8.8-.4 1.5.5.8 1.1v.6z" />
    <path d="M73.8 22.4c-.6-.8-4.1-.4-5.6-.2-.4.1-.5-.3-.2-.5 2.1-1.4 5.6-1 6.1-.3.6.7 0 4.2-2 5.8-.3.2-.6.1-.5-.3.4-1.5 1.6-3.7 2.2-4.5z" />
    <path d="M44.5 12.8c-1.2 0-2.2-.4-2.2-1.8 0-1.7 1.4-2.1 3.5-2.1 1.7 0 2.7.2 3.6.4-.3 2.8-2.5 3.5-4.9 3.5zm7-7.7c-.5.4-1.2.5-1.2 1.3v.8c-1.3-1.6-3.5-2.5-6.2-2.5-4.8 0-8.9 3.1-8.9 8.2 0 4.6 3.4 7.6 7.7 7.6 2.8 0 5.4-1.2 6.8-3.1l.6 1.8c.3.8 1.1 1 1.8.8.7-.3.9-.9.9-1.9v-9.5c0-2.4-.4-4.8-2.6-6-1.9-1.1-4.7-1.3-6.8-.7-.6.2-.9.7-.7 1.2l.6 1.8c.2.5.6.6 1.2.4 1.4-.4 3.3-.4 4.7.2 1.3.6 1.8 1.6 1.8 3v1l-.7-.4z" />
    <text x="3" y="19" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">amazon</text>
  </svg>
);

export const DribbbleLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.4 6.87c-1.02-.27-2.73-.55-4.82-.44.38-1.05.74-2.1 1.05-3.08 1.64.91 2.97 2.15 3.77 3.52zM12 4.07c-.36 1.06-.77 2.2-1.2 3.33-3.66-.75-7.14-.14-7.55-.06.87-1.92 2.37-3.48 4.24-4.39 1.43-.6 3.01-.76 4.51.12zM3.86 9.47c.56-.09 3.75-.59 7.42.22-.32.96-.64 1.95-.94 2.94-3.87 1.34-7.23 4.2-7.46 4.41-.57-1.48-.88-3.13-.88-4.83 0-.96.11-1.87.31-2.74h.55zm5.17 10.3c.27-.26 3.25-2.84 6.94-4.13.8 2.05 1.37 4.09 1.68 5.23-1.63.78-3.48 1.18-5.4 1.18-.76 0-1.52-.06-2.26-.18l-.96-2.1zm8.39-1.39c-.31-1.09-.85-2.98-1.59-4.94 1.83-.16 3.79.16 4.67.36-.3 1.85-1.36 3.48-2.88 4.58h-.2zm2.5-3.18c-.89-.2-2.87-.53-4.75-.36-.08-.22-.16-.44-.24-.66 2.21-.13 4.08.15 5.2.45-.04.2-.12.39-.21.57z" />
    </svg>
    <span>Dribbble</span>
  </div>
);

export const HubSpotLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.8 7.3V4.9c.9-.4 1.5-1.3 1.5-2.4 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1.1.7 2 1.6 2.4v2.4c-1.3.4-2.4 1.2-3.1 2.2L7.2 7.2c.1-.4.2-.8.2-1.2 0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c.5 0 1-.1 1.4-.3l7.6 2.4c.2 2.6 2.4 4.7 5.1 4.7 2.8 0 5.1-2.3 5.1-5.1-.1-2.3-1.7-4.1-3.8-4.6zm-14.4.7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13.4 9.1c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1z" />
    </svg>
    <span>HubSpot</span>
  </div>
);

export const NotionLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L17.76 1.737c-.513-.373-1.26-.84-2.568-.747L3.058 2.064c-.466.047-.56.327-.373.513l1.774 1.631zm.933 3.684v13.076c0 .746.373 1.026 1.213.98l14.195-.84c.84-.047.933-.606.933-1.166V6.773c0-.653-.28-.98-.84-.933l-14.662.886c-.653.047-.84.42-.84.933zm11.987.886c.093.42 0 .84-.42.886l-.793.14c-.373.047-.56.28-.56.653v8.163c0 .513.373.653.84.606l1.026-.047c.42-.047.513.233.513.653l-.047.28c0 .28-.28.327-.7.373l-3.36.187c-.42.047-.653-.14-.653-.466l.047-.327c.047-.373.233-.513.606-.56l.84-.047c.373-.047.466-.233.466-.653v-5.271l-3.966 6.812c-.28.466-.653.513-.98.513l-2.427.14c-.466.047-.653-.187-.653-.513V8.874c0-.42.14-.653.606-.7l1.026-.093c.42-.047.56.14.56.56v5.83l3.78-6.159c.28-.466.606-.56 1.073-.606l2.846-.187c.327 0 .56.233.653.653z" />
    </svg>
    <span>Notion</span>
  </div>
);

export const NetflixLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-1.5 font-bold text-xl tracking-wider ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.398 0v24c1.196-.27 2.454-.53 3.655-.78V0H5.398zm9.549 0v19.06c1.272-.18 2.533-.35 3.655-.49V0h-3.655zM9.053 0l6.398 19.34V0h-2.19l-4.208 12.63V0z" />
    </svg>
    <span>NETFLIX</span>
  </div>
);

export const ZoomLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
    <span className="font-extrabold tracking-tight">zoom</span>
  </div>
);

// Social Media Icons
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
