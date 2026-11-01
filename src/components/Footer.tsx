import React, { useState } from 'react';
import { PositivusLogo, LinkedInIcon, TwitterIcon, FacebookIcon } from './PositivusIcons';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Use Cases', href: '#cases' },
    { label: 'Pricing', href: '#process' },
    { label: 'Blog', href: '#team' },
  ];

  return (
    <footer className="w-full bg-white pt-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Dark Footer Container with top curved corners */}
        <div className="bg-[#191A23] rounded-t-[45px] p-8 sm:p-12 lg:p-16 flex flex-col gap-10 sm:gap-14 text-white">
          {/* Top Bar: White Logo, Underlined Nav Links, Social Circles */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-4">
            {/* White Logo */}
            <a href="#" className="flex items-center gap-2" aria-label="Positivus Home">
              <PositivusLogo inverted />
            </a>

            {/* Navigation links (underline, white) */}
            <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] text-white underline underline-offset-4 hover:text-[#B9FF66] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-[30px] h-[30px] rounded-full bg-white text-black flex items-center justify-center hover:bg-[#B9FF66] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-[30px] h-[30px] rounded-full bg-white text-black flex items-center justify-center hover:bg-[#B9FF66] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-[30px] h-[30px] rounded-full bg-white text-black flex items-center justify-center hover:bg-[#B9FF66] transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle Row: Contact Info & Newsletter Subscription */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left: Contact Info */}
            <div className="flex flex-col items-start gap-6 max-w-[340px]">
              {/* Green Contact Us Badge */}
              <div className="inline-block px-[10px] py-0.5 bg-[#B9FF66] rounded-[7px]">
                <h4 className="font-['Space_Grotesk'] font-bold text-[18px] leading-[26px] text-black">
                  Liên Hệ
                </h4>
              </div>

              {/* Contact list with address */}
              <div className="flex flex-col gap-4 font-['Space_Grotesk'] text-[16px] sm:text-[18px] leading-[23px] text-white">
                <p>Email: info@namind.com</p>
                <p>Phone: 555-567-8901</p>
                <p>Address: Lorem ipsum dolor sit amet, 1234 Main St, Stardust City 12345</p>
              </div>
            </div>

            {/* Right: Newsletter Box (#292A32, rounded 14px) */}
            <div className="w-full lg:max-w-[634px] bg-[#292A32] rounded-[14px] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-5">
              <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-[285px] h-[67px] px-6 bg-transparent border border-white rounded-[14px] font-['Space_Grotesk'] text-[18px] text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[249px] h-[67px] bg-[#B9FF66] text-black font-['Space_Grotesk'] text-[18px] sm:text-[20px] font-normal rounded-[14px] hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {subscribed ? 'Subscribed!' : 'Get Started'}
                </button>
              </form>
            </div>
          </div>

          {/* White Hairline Divider */}
          <div className="w-full h-px bg-white/40 my-2" />

          {/* Bottom Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 font-['Space_Grotesk'] text-[16px] sm:text-[18px] leading-[28px] text-white">
            <span>© 2026 NAMIND. All Rights Reserved.</span>
            <a href="#privacy" className="underline underline-offset-4 hover:text-[#B9FF66] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
