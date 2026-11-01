import React, { useState } from 'react';
import { PositivusLogo } from './PositivusIcons';

interface NavbarProps {
  onQuoteClick?: () => void;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick, onLogoClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Use Cases', href: '#cases' },
    { label: 'Pricing', href: '#process' },
    { label: 'Blog', href: '#team' },
  ];

  return (
    <header className="w-full bg-white relative z-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            if (onLogoClick) {
              e.preventDefault();
              onLogoClick();
            }
          }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="NAMIND Home"
        >
          <PositivusLogo />
        </a>

        {/* Desktop Navigation Links & Action Button */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-['Space_Grotesk'] text-[18px] lg:text-[20px] text-black font-normal hover:text-[#B9FF66] transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button: Dark border, rounded 14px, padding 20px 35px */}
          <button
            onClick={onQuoteClick}
            className="font-['Space_Grotesk'] text-[18px] lg:text-[20px] font-normal text-black border border-[#191A23] rounded-[14px] px-[35px] py-[18px] hover:bg-[#191A23] hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Learn More
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:text-[#191A23] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#191A23]/10 px-6 py-6 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-['Space_Grotesk'] text-[20px] text-black font-medium py-2 border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onQuoteClick) onQuoteClick();
              }}
              className="mt-4 font-['Space_Grotesk'] text-[18px] font-medium text-black border border-[#191A23] rounded-[14px] px-6 py-4 text-center hover:bg-[#191A23] hover:text-white transition-colors cursor-pointer"
            >
              Learn More
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
