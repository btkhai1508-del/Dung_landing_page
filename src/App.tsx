/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThankYouPage } from './components/ThankYouPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'thank-you'>('landing');

  // Navigate to Zalo group invitation page
  const handleGoToZaloPage = () => {
    setCurrentPage('thank-you');
  };

  // If user navigated to Zalo page, render it
  if (currentPage === 'thank-you') {
    return <ThankYouPage onBackToHome={() => setCurrentPage('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col items-center justify-center p-0 sm:py-6 sm:px-4">
      {/* Main Landing Page: Pure Poster Image with Large Prominent Button Overlay */}
      <main className="w-full max-w-2xl flex flex-col items-center">
        <div className="relative w-full shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-stone-300 bg-white">
          {/* Exact Poster Asset */}
          <img
            src="/assets/aistudio/image_70b2e063.png"
            alt="Phúc Lộc Đã Có Sẵn Quanh Bạn"
            className="w-full h-auto block select-none"
            referrerPolicy="no-referrer"
          />

          {/* Large Prominent 3D Button Overlaying "NHẤN VÀO ĐÂY ĐỂ NHẬN LỘC NGAY!" */}
          <div
            onClick={handleGoToZaloPage}
            className="absolute z-20 cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              left: '48.5%',
              top: '84.0%',
              width: '46.0%',
              height: '8.6%',
            }}
            title="Nhấn vào đây để nhận lộc ngay!"
          >
            {/* Outer Golden Rim Frame */}
            <div
              className="w-full h-full rounded-full p-[2px] sm:p-[3px] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400"
              style={{
                boxShadow: '0 4px 18px rgba(185, 28, 28, 0.5), 0 0 12px rgba(250, 204, 21, 0.6)',
              }}
            >
              {/* Inner Glossy 3D Ruby Button */}
              <button
                type="button"
                className="w-full h-full rounded-full bg-gradient-to-b from-[#dc2626] via-[#b91c1c] to-[#7f1d1d] hover:from-[#ef4444] hover:to-[#991b1b] flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 shadow-inner relative overflow-hidden border border-yellow-200/40 cursor-pointer"
              >
                {/* Diagonal Light Shimmer Sheen */}
                <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

                {/* Large 3D Golden Gift Box Logo (No round background) */}
                <div className="shrink-0 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  <svg
                    viewBox="0 0 48 48"
                    className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="goldLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fffbeb" />
                        <stop offset="35%" stopColor="#fde047" />
                        <stop offset="70%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                      <linearGradient id="goldBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="45%" stopColor="#eab308" />
                        <stop offset="85%" stopColor="#b45309" />
                        <stop offset="100%" stopColor="#78350f" />
                      </linearGradient>
                      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                    </defs>

                    {/* Box Body */}
                    <rect x="8" y="19" width="32" height="23" rx="2" fill="url(#goldBodyGrad)" stroke="#78350f" strokeWidth="1" />
                    {/* Box Lid */}
                    <rect x="5" y="11" width="38" height="9" rx="2" fill="url(#goldLidGrad)" stroke="#78350f" strokeWidth="1" />
                    {/* Vertical Ribbon */}
                    <rect x="20.5" y="11" width="7" height="31" fill="url(#ribbonGrad)" stroke="#b45309" strokeWidth="0.8" />
                    {/* Horizontal Ribbon on Lid */}
                    <rect x="5" y="14" width="38" height="3" fill="#ffffff" fillOpacity="0.4" />

                    {/* Ribbon Bow on Top */}
                    <path
                      d="M24 11 C18 4 11 5 15 11 Z"
                      fill="url(#ribbonGrad)"
                      stroke="#b45309"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M24 11 C30 4 37 5 33 11 Z"
                      fill="url(#ribbonGrad)"
                      stroke="#b45309"
                      strokeWidth="0.8"
                    />
                    <ellipse cx="24" cy="11" rx="2.5" ry="2" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />
                    <circle cx="23.5" cy="10.5" r="0.8" fill="#ffffff" />
                  </svg>
                </div>

                {/* Sans-Serif Bold Clean Button Typography */}
                <div className="text-left font-sans font-black leading-tight sm:leading-snug select-none">
                  <span className="block text-white text-[11px] sm:text-sm md:text-base lg:text-lg tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] uppercase">
                    NHẤN VÀO ĐÂY
                  </span>
                  <span className="block text-yellow-300 text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] uppercase">
                    ĐỂ NHẬN LỘC NGAY!
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Sticky CTA Button (Sans-serif) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
        <button
          onClick={handleGoToZaloPage}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-sans font-black text-sm tracking-wider uppercase rounded-2xl shadow-2xl border-2 border-yellow-300 flex items-center justify-center gap-2.5 text-center cursor-pointer active:scale-95 transition-transform"
          style={{
            boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6), 0 0 15px rgba(250, 204, 21, 0.6)',
          }}
        >
          <svg viewBox="0 0 48 48" className="w-6 h-6" fill="none">
            <rect x="8" y="19" width="32" height="23" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
            <rect x="5" y="11" width="38" height="9" rx="2" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
            <rect x="21" y="11" width="6" height="31" fill="#fef08a" />
            <path d="M24 11 C18 4 12 5 16 11 Z" fill="#fef08a" />
            <path d="M24 11 C30 4 36 5 32 11 Z" fill="#fef08a" />
            <circle cx="24" cy="11" r="2" fill="#eab308" />
          </svg>
          <div className="text-left font-sans font-black leading-tight">
            <span className="block text-white text-xs">NHẤN VÀO ĐÂY</span>
            <span className="block text-yellow-300 text-xs">ĐỂ NHẬN LỘC NGAY!</span>
          </div>
        </button>
      </div>
    </div>
  );
}
