import React from 'react';

export const Logotypes: React.FC = () => {
  const text = 'THỬ THÁCH TRỰC TIẾP! 2 NGÀY AFFILIATE 100 TRIỆU/ THÁNG CHỈ BẰNG CHIẾC ĐIỆN THOẠI';
  const repeatCount = 4;

  return (
    <section className="w-full py-4 sm:py-6 overflow-hidden select-none" aria-label="Running ticker banner">
      <div className="w-full overflow-hidden py-2 sm:py-3 bg-white">
        {/* Continuous running black text, no borders, no LED background, no dots */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 whitespace-nowrap text-black font-['Space_Grotesk'] font-bold text-[18px] sm:text-[22px] tracking-wider uppercase">
            {Array.from({ length: repeatCount }).map((_, i) => (
              <span key={i} className="shrink-0">
                {text}
              </span>
            ))}
          </div>

          <div aria-hidden="true" className="animate-marquee flex items-center gap-16 whitespace-nowrap text-black font-['Space_Grotesk'] font-bold text-[18px] sm:text-[22px] tracking-wider uppercase">
            {Array.from({ length: repeatCount }).map((_, i) => (
              <span key={`dup-${i}`} className="shrink-0">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
