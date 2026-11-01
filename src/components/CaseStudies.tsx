import React from 'react';
import { SectionHeading } from './SectionHeading';

interface CaseStudiesProps {
  onCtaClick?: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onCtaClick }) => {
  const painPoints = [
    {
      id: 1,
      text: 'Bạn nhìn AI càn quét, thấy rõ công việc làm thuê không thể đưa bạn lên 100 triệu/tháng',
    },
    {
      id: 2,
      text: 'Bạn đã thử bán hàng online, đổ tiền quảng cáo… nhưng khách không đến, tiền không về.',
    },
    {
      id: 3,
      text: 'Bạn mệt mỏi với mô hình công việc cũ: càng làm càng kẹt, thu nhập không bao giờ vượt ngưỡng.',
    },
    {
      id: 4,
      text: 'Bạn muốn một lối đi khác - thực tế, dễ làm - nơi chỉ cần biết bấm điện thoại, bạn có ngay hệ thống ra khách, ra tiền mặt....',
    },
  ];

  return (
    <section id="cases" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="THỬ THÁCH 2 NGÀY AFFILIATE TỰ ĐỘNG DÒNG TIỀN 100 TRIỆU – DÀNH CHO BẠN, NẾU..."
          titleClassName="font-bold"
          description=""
        />

        {/* Khung ô đen với 4 nội dung có dấu tick xanh nổi bật ở đầu */}
        <div className="bg-[#191A23] rounded-[45px] p-8 sm:p-12 lg:p-14 positivus-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {painPoints.map((item) => (
              <div
                key={item.id}
                className="bg-[#23242E] border border-white/10 hover:border-[#B9FF66]/60 transition-all rounded-[24px] p-6 sm:p-7 flex items-start gap-4"
              >
                {/* Dấu tick nổi bật ở đầu */}
                <div className="w-8 h-8 rounded-full bg-[#B9FF66] text-[#191A23] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <svg
                    className="w-5 h-5 text-[#191A23]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                {/* Nội dung đoạn văn */}
                <p className="font-['Space_Grotesk'] font-normal text-[16px] sm:text-[18px] lg:text-[19px] leading-[26px] sm:leading-[28px] text-white">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {onCtaClick && (
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/15 flex flex-col lg:flex-row items-center justify-between gap-5">
              {/* Highlight & Bold với cỡ chữ lớn hơn */}
              <div className="text-center lg:text-left">
                <p className="font-['Space_Grotesk'] font-bold text-[17px] sm:text-[19px] lg:text-[21px] leading-[28px] sm:leading-[32px] text-white">
                  <span className="text-[#191A23] bg-[#B9FF66] px-4 py-2 rounded-[12px] inline-flex items-center gap-2 font-black shadow-sm">
                    <span>⚡</span>
                    <span>Chỉ 7 chỗ duy nhất trong đợt này</span>
                  </span>
                </p>
              </div>

              {/* Nút uppercase và có mũi tên đằng trước, chữ lớn và nổi bật */}
              <button
                onClick={onCtaClick}
                className="shrink-0 group flex items-center justify-center gap-3 bg-[#B9FF66] text-[#191A23] px-8 sm:px-10 py-4 sm:py-5 rounded-[16px] font-['Space_Grotesk'] font-extrabold text-[18px] sm:text-[20px] lg:text-[22px] tracking-tight uppercase hover:bg-white transition-all cursor-pointer border-2 border-[#B9FF66] whitespace-nowrap shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="text-xl sm:text-2xl leading-none group-hover:translate-x-1.5 transition-transform">
                  👉
                </span>
                <span>NHẤN VÀO ĐÂY ĐỂ GIỮ CHỖ NGAY BÂY GIỜ</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
