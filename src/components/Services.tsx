import React from 'react';
import { SectionHeading } from './SectionHeading';

interface ServiceCardData {
  id: number;
  badge: string;
  bg: string;
  badgeBg: string;
  textColor: string;
}

export const Services: React.FC = () => {
  const cards: ServiceCardData[] = [
    {
      id: 1,
      badge: 'Subtitle 1',
      bg: '#F3F3F3',
      badgeBg: '#B9FF66',
      textColor: '#000000',
    },
    {
      id: 2,
      badge: 'Subtitle 3',
      bg: '#B9FF66',
      badgeBg: '#FFFFFF',
      textColor: '#000000',
    },
    {
      id: 3,
      badge: 'Subtitle 5',
      bg: '#191A23',
      badgeBg: '#FFFFFF',
      textColor: '#000000',
    },
    {
      id: 4,
      badge: 'Subtitle 7',
      bg: '#F3F3F3',
      badgeBg: '#B9FF66',
      textColor: '#000000',
    },
    {
      id: 5,
      badge: 'Subtitle 9',
      bg: '#B9FF66',
      badgeBg: '#FFFFFF',
      textColor: '#000000',
    },
    {
      id: 6,
      badge: 'Subtitle 11',
      bg: '#191A23',
      badgeBg: '#B9FF66',
      textColor: '#000000',
    },
  ];

  return (
    <section id="services" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subheading */}
        <SectionHeading
          title="Section Title 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        />

        {/* Cards Grid: 6 cards chia làm 2 bên, tỉ lệ 9:16, khung ảnh fit bự hơn với spacing gọn gàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 items-start">
          {cards.map((card) => (
            <div
              key={card.id}
              style={{ backgroundColor: card.bg }}
              className="group border-2 border-[#191A23] rounded-[36px] sm:rounded-[48px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between items-stretch aspect-[9/16] w-full positivus-shadow hover:-translate-y-1.5 transition-all duration-200"
            >
              {/* Phần trên: Chỉ giữ lại 1 Subtitle lẻ (Subtitle 1, 3, 5, 7, 9, 11) */}
              <div className="flex items-start shrink-0">
                <span
                  style={{ backgroundColor: card.badgeBg, color: card.textColor }}
                  className="inline-block px-4 py-1.5 rounded-[10px] font-['Space_Grotesk'] font-bold text-[22px] sm:text-[28px] lg:text-[30px] leading-tight border border-[#191A23]/25 shadow-sm"
                >
                  {card.badge}
                </span>
              </div>

              {/* Phần thân: Khung ảnh để trống tỉ lệ 9:16 mở rộng tối đa, sẵn sàng chèn ảnh sau */}
              <div className="flex-1 my-6 sm:my-8 rounded-[28px] sm:rounded-[36px] border-2 border-dashed border-[#191A23]/35 flex flex-col items-center justify-center p-6 sm:p-10 text-center transition-all bg-white/45 hover:bg-white/65">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#191A23]/20 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  {/* Icon Image Placeholder */}
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#191A23]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                    <polyline points="21 15 16 10 5 21" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-[17px] sm:text-[20px] text-[#191A23]/90">
                  Vị trí chèn ảnh (Tỉ lệ 9:16)
                </span>
                <span className="font-['Space_Grotesk'] text-[13px] sm:text-[15px] text-[#191A23]/65 mt-1.5 max-w-[280px]">
                  Để trống sẵn sàng cho hình ảnh kết quả / minh họa
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
