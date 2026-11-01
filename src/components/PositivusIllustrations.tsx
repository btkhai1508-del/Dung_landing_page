import React from 'react';

// Hero Megaphone & Soundwaves with orbiting tilted ellipses and stars
export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[600px] h-[380px] sm:h-[460px] lg:h-[515px] select-none ${className}`}>
      {/* Background Orbiting Ellipses (border: 1px solid #000000; transform: rotate(28.88deg)) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 515"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tilted orbital concentric rings */}
        <ellipse
          cx="290"
          cy="260"
          rx="270"
          ry="75"
          transform="rotate(28.88 290 260)"
          stroke="#000000"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <ellipse
          cx="280"
          cy="275"
          rx="270"
          ry="75"
          transform="rotate(28.88 280 275)"
          stroke="#000000"
          strokeWidth="1.2"
        />
        <ellipse
          cx="270"
          cy="290"
          rx="270"
          ry="75"
          transform="rotate(28.88 270 290)"
          stroke="#000000"
          strokeWidth="1.2"
        />

        {/* Floating Green Spheres (#B9FF66) */}
        <circle cx="130" cy="110" r="16" fill="#B9FF66" stroke="#000000" strokeWidth="1.5" />
        <circle cx="490" cy="420" r="11" fill="#B9FF66" stroke="#000000" strokeWidth="1.5" />
        <circle cx="95" cy="70" r="24" fill="#000000" />

        {/* Floating 4-point stars */}
        <g transform="translate(420, 80)">
          <path d="M18 0L22 14L36 18L22 22L18 36L14 22L0 18L14 14L18 0Z" fill="#191A23" />
        </g>
        <g transform="translate(180, 420)">
          <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9L12 0Z" fill="#B9FF66" stroke="#191A23" strokeWidth="1" />
        </g>
        <g transform="translate(480, 240)">
          <path d="M14 0L17.5 10.5L28 14L17.5 17.5L14 28L10.5 17.5L0 14L10.5 10.5L14 0Z" fill="#191A23" />
        </g>

        {/* Central Megaphone Vector */}
        <g id="megaphone-group">
          {/* Main Cone */}
          <path
            d="M170 310L360 170L395 240L190 355C180 350 172 330 170 310Z"
            fill="#B9FF66"
            stroke="#191A23"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Cone Rim */}
          <ellipse
            cx="380"
            cy="205"
            rx="25"
            ry="45"
            transform="rotate(28 380 205)"
            fill="#FFFFFF"
            stroke="#191A23"
            strokeWidth="3"
          />
          <ellipse
            cx="380"
            cy="205"
            rx="12"
            ry="25"
            transform="rotate(28 380 205)"
            fill="#191A23"
          />
          {/* Handle */}
          <path
            d="M210 345L230 420C232 425 240 428 245 425L265 415C270 412 272 405 270 400L252 320"
            fill="#191A23"
            stroke="#191A23"
            strokeWidth="2"
          />
          {/* Sound waves emitted from horn */}
          <path
            d="M420 160C450 180 470 230 450 270"
            fill="none"
            stroke="#191A23"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M445 130C490 160 520 235 485 300"
            fill="none"
            stroke="#B9FF66"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M475 105C530 140 565 240 525 330"
            fill="none"
            stroke="#191A23"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Back cap */}
          <ellipse
            cx="175"
            cy="325"
            rx="14"
            ry="24"
            transform="rotate(28 175 325)"
            fill="#191A23"
          />
          {/* Detail accents on cone */}
          <path
            d="M280 228L290 252"
            stroke="#191A23"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M250 248L260 272"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

// Service 1: SEO Magnifier
export const SeoIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Browser Card Window */}
    <rect x="25" y="20" width="160" height="110" rx="14" fill="#FFFFFF" stroke="#191A23" strokeWidth="2" />
    <path d="M25 46H185" stroke="#191A23" strokeWidth="2" />
    <circle cx="42" cy="33" r="3.5" fill="#191A23" />
    <circle cx="54" cy="33" r="3.5" fill="#191A23" />
    <circle cx="66" cy="33" r="3.5" fill="#191A23" />
    
    {/* Search Input inside window */}
    <rect x="42" y="60" width="90" height="14" rx="7" fill="#B9FF66" stroke="#191A23" strokeWidth="1.5" />
    <rect x="42" y="85" width="115" height="8" rx="4" fill="#F3F3F3" />
    <rect x="42" y="100" width="75" height="8" rx="4" fill="#F3F3F3" />

    {/* Magnifier Glass */}
    <g transform="translate(20, 10)">
      <circle cx="125" cy="85" r="32" fill="#FFFFFF" stroke="#191A23" strokeWidth="3" />
      <circle cx="125" cy="85" r="22" fill="#B9FF66" fillOpacity="0.4" stroke="#191A23" strokeWidth="1.5" />
      {/* Star inside magnifier */}
      <path d="M125 73L127 82L136 85L127 88L125 97L123 88L114 85L123 82L125 73Z" fill="#191A23" />
      <path d="M148 108L175 138" stroke="#191A23" strokeWidth="7" strokeLinecap="round" />
    </g>
  </svg>
);

// Service 2: PPC Cursor & Selector
export const PpcIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Browser Card */}
    <rect x="25" y="20" width="160" height="110" rx="14" fill="#FFFFFF" stroke="#191A23" strokeWidth="2" />
    <path d="M25 46H185" stroke="#191A23" strokeWidth="2" />
    <circle cx="42" cy="33" r="3.5" fill="#191A23" />
    <circle cx="54" cy="33" r="3.5" fill="#191A23" />
    <circle cx="66" cy="33" r="3.5" fill="#191A23" />

    {/* Selected Value Bar */}
    <rect x="40" y="60" width="130" height="24" rx="6" fill="#191A23" />
    <rect x="52" y="68" width="60" height="8" rx="4" fill="#B9FF66" />
    <rect x="40" y="94" width="100" height="8" rx="4" fill="#F3F3F3" />
    <rect x="40" y="108" width="70" height="8" rx="4" fill="#F3F3F3" />

    {/* Click pointer finger / cursor */}
    <g transform="translate(115, 65)">
      <path
        d="M20 0L28 20L18 18L12 30L5 26L11 15L2 14L20 0Z"
        fill="#B9FF66"
        stroke="#191A23"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// Service 3: Social Media Browser Window
export const SocialIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="20" width="160" height="110" rx="14" fill="#21241D" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M25 46H185" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="42" cy="33" r="3.5" fill="#FFFFFF" />
    <circle cx="54" cy="33" r="3.5" fill="#FFFFFF" />
    <circle cx="66" cy="33" r="3.5" fill="#FFFFFF" />

    {/* Like Badge Floating */}
    <g transform="translate(50, 56)">
      <rect width="48" height="30" rx="8" fill="#B9FF66" stroke="#191A23" strokeWidth="1.5" />
      <path
        d="M20 18L24 14C25 13 27 14 27 15.5V17H31C32 17 33 18 32.5 19L30 24C29.5 25 28.5 25 27.5 25H20V18ZM20 25H16V18H20V25Z"
        fill="#191A23"
      />
    </g>
    {/* Heart Badge Floating */}
    <g transform="translate(110, 72)">
      <rect width="45" height="30" rx="8" fill="#FFFFFF" stroke="#191A23" strokeWidth="1.5" />
      <path
        d="M22 23L16 17C14 15 14 12 16.5 10.5C19 9 21 11 22 12C23 11 25 9 27.5 10.5C30 12 30 15 28 17L22 23Z"
        fill="#191A23"
      />
    </g>

    {/* Decorative 4-point stars */}
    <path d="M165 30L167.5 37.5L175 40L167.5 42.5L165 50L162.5 42.5L155 40L162.5 37.5L165 30Z" fill="#B9FF66" />
    <path d="M30 135L32 140L37 142L32 144L30 149L28 144L23 142L28 140L30 135Z" fill="#B9FF66" />
  </svg>
);

// Service 4: Email Sending Paper Plane
export const EmailIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Envelope / Letter background */}
    <rect x="25" y="45" width="130" height="85" rx="12" fill="#FFFFFF" stroke="#191A23" strokeWidth="2" />
    <path d="M25 50L90 98L155 50" stroke="#191A23" strokeWidth="2" strokeLinejoin="round" />

    {/* Flying Paper Plane */}
    <g transform="translate(75, 10)">
      <path
        d="M10 65L85 10L60 90L40 70L10 65Z"
        fill="#B9FF66"
        stroke="#191A23"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M85 10L40 70V95L52 80" fill="#FFFFFF" stroke="#191A23" strokeWidth="2" strokeLinejoin="round" />
    </g>

    {/* Speed dash lines */}
    <path d="M45 28C65 24 75 32 90 40" stroke="#191A23" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="150" cy="120" r="10" fill="#B9FF66" stroke="#191A23" strokeWidth="1.5" />
    <circle cx="150" cy="120" r="3" fill="#191A23" />
  </svg>
);

// Service 5: Content Creation Browser Windows
export const ContentIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back Window */}
    <rect x="50" y="20" width="135" height="95" rx="12" fill="#FFFFFF" stroke="#191A23" strokeWidth="2" />
    <path d="M50 42H185" stroke="#191A23" strokeWidth="1.5" />

    {/* Front Window */}
    <rect x="25" y="45" width="135" height="95" rx="12" fill="#191A23" stroke="#191A23" strokeWidth="2" />
    <path d="M25 68H160" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="40" cy="56" r="3" fill="#B9FF66" />
    <circle cx="50" cy="56" r="3" fill="#FFFFFF" />

    {/* Document Blocks inside front window */}
    <rect x="40" y="80" width="40" height="40" rx="6" fill="#B9FF66" />
    <rect x="90" y="84" width="55" height="7" rx="3.5" fill="#FFFFFF" />
    <rect x="90" y="98" width="45" height="7" rx="3.5" fill="#FFFFFF" />
    <rect x="90" y="112" width="30" height="7" rx="3.5" fill="#FFFFFF" />
  </svg>
);

// Service 6: Analytics Bar Chart
export const AnalyticsIllustration: React.FC = () => (
  <svg width="210" height="170" viewBox="0 0 210 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dark Browser Frame */}
    <rect x="25" y="20" width="160" height="115" rx="14" fill="#21241D" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M25 46H185" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="42" cy="33" r="3.5" fill="#B9FF66" />
    <circle cx="54" cy="33" r="3.5" fill="#FFFFFF" />
    <circle cx="66" cy="33" r="3.5" fill="#FFFFFF" />

    {/* Bar Chart Columns */}
    <rect x="45" y="88" width="18" height="32" rx="4" fill="#FFFFFF" />
    <rect x="73" y="70" width="18" height="50" rx="4" fill="#B9FF66" stroke="#191A23" strokeWidth="1.5" />
    <rect x="101" y="80" width="18" height="40" rx="4" fill="#FFFFFF" />
    <rect x="129" y="55" width="18" height="65" rx="4" fill="#B9FF66" stroke="#191A23" strokeWidth="1.5" />

    {/* Trending line */}
    <path
      d="M48 82L78 62L106 72L138 48"
      stroke="#B9FF66"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="138" cy="48" r="4.5" fill="#FFFFFF" stroke="#191A23" strokeWidth="1.5" />
  </svg>
);

// CTA Card Right Illustration (Geometric star and ellipses)
export const CtaIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-[320px] h-[280px] select-none ${className}`}>
    <svg viewBox="0 0 350 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Concentric rings */}
      <ellipse cx="175" cy="150" rx="160" ry="45" stroke="#000000" strokeWidth="1.5" />
      <ellipse cx="175" cy="170" rx="160" ry="45" stroke="#000000" strokeWidth="1.5" />
      <ellipse cx="175" cy="190" rx="160" ry="45" stroke="#000000" strokeWidth="1.5" />

      {/* Floating 4-point star in center */}
      <g transform="translate(175, 110)">
        <path d="M0 -55L14 -14L55 0L14 14L0 55L-14 14L-55 0L-14 -14Z" fill="#191A23" />
        <circle cx="0" cy="0" r="14" fill="#B9FF66" />
      </g>

      {/* Secondary accent stars */}
      <g transform="translate(80, 70)">
        <path d="M0 -22L6 -6L22 0L6 6L0 22L-6 6L-22 0L-6 -6Z" fill="#B9FF66" stroke="#191A23" strokeWidth="1" />
      </g>
      <g transform="translate(260, 200)">
        <path d="M0 -18L5 -5L18 0L5 5L0 18L-5 5L-18 0L-5 -5Z" fill="#191A23" />
      </g>
    </svg>
  </div>
);

// Contact Form Right Illustration
export const ContactIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full max-w-[400px] h-[400px] select-none ${className}`}>
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Abstract dark curved shape */}
      <path
        d="M100 80C160 30 280 40 330 110C380 180 370 280 300 330C230 380 120 370 70 300C20 230 40 130 100 80Z"
        fill="#191A23"
      />
      {/* Internal lime geometric star cutout */}
      <g transform="translate(200, 200)">
        <path
          d="M0 -80L22 -22L80 0L22 22L0 80L-22 22L-80 0L-22 -22Z"
          fill="#B9FF66"
        />
        <circle cx="0" cy="0" r="22" fill="#191A23" />
      </g>
      {/* Orbital accent ring */}
      <ellipse cx="200" cy="200" rx="140" ry="40" transform="rotate(-35 200 200)" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="280" cy="110" r="10" fill="#B9FF66" stroke="#191A23" strokeWidth="2" />
    </svg>
  </div>
);

// Team Avatar with Positivus sprocket / flower mask and Lime Multiply tint
export const TeamAvatar: React.FC<{
  index: number;
  name: string;
  className?: string;
}> = ({ index, name, className = 'w-[102px] h-[102px]' }) => {
  // Positivus uses stylized portraits with a lime-green overlay and 4-lobed or 6-lobed sprocket cutout
  const avatarColors = ['#E2FCE5', '#D2F5D7', '#E8FDE8', '#DDFADF', '#DEF7CE', '#E5FFD8'];
  const bgHue = avatarColors[index % avatarColors.length];

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      {/* Flower / Sprocket Frame Mask */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <clipPath id={`avatar-clip-${index}`}>
            {/* 4-petal flower sprocket curve */}
            <path d="M50 0C55 20 65 20 85 15C80 35 80 45 100 50C80 55 80 65 85 85C65 80 55 80 50 100C45 80 35 80 15 85C20 65 20 55 0 50C20 45 20 35 15 15C35 20 45 20 50 0Z" />
          </clipPath>
        </defs>

        {/* Outer border shape */}
        <path
          d="M50 0C55 20 65 20 85 15C80 35 80 45 100 50C80 55 80 65 85 85C65 80 55 80 50 100C45 80 35 80 15 85C20 65 20 55 0 50C20 45 20 35 15 15C35 20 45 20 50 0Z"
          fill="#191A23"
        />

        {/* Clipped content inside flower */}
        <g clipPath={`url(#avatar-clip-${index})`}>
          <rect width="100" height="100" fill={bgHue} />
          {/* Head & shoulders portrait silhouette */}
          <circle cx="50" cy="40" r="20" fill="#191A23" />
          <path d="M18 95C22 72 35 64 50 64C65 64 78 72 82 95Z" fill="#191A23" />
          
          {/* Facial feature highlight / sunglasses / hair detail for distinct character */}
          {index % 3 === 0 && (
            <rect x="36" y="36" width="28" height="7" rx="3.5" fill="#B9FF66" />
          )}
          {index % 3 === 1 && (
            <path d="M35 28C45 22 55 22 65 28" stroke="#B9FF66" strokeWidth="4" strokeLinecap="round" />
          )}
          {index % 3 === 2 && (
            <circle cx="50" cy="42" r="6" fill="#B9FF66" />
          )}
          
          {/* Green duotone multiply wash */}
          <rect width="100" height="100" fill="#B9FF66" style={{ mixBlendMode: 'multiply', opacity: 0.7 }} />
        </g>
      </svg>
    </div>
  );
};
