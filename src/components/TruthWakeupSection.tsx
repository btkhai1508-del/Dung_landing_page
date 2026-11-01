import React from 'react';

interface TruthWakeupSectionProps {
  onCtaClick?: () => void;
}

export const TruthWakeupSection: React.FC<TruthWakeupSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full py-12 sm:py-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Khung bài học thức tỉnh phong cách Positivus đen đặc trưng */}
        <div className="bg-[#191A23] text-white border-2 border-[#191A23] rounded-[36px] sm:rounded-[45px] p-7 sm:p-12 lg:p-16 positivus-shadow relative overflow-hidden">
          
          {/* Phần mở đầu: Bạn à... có một sự thật không ai chịu nói: Nghe này.... */}
          <div className="space-y-2 mb-8">
            <h2 className="font-['Space_Grotesk'] font-bold text-[28px] sm:text-[38px] lg:text-[44px] leading-tight text-white tracking-tight">
              Bạn à...
            </h2>
            <p className="font-['Space_Grotesk'] font-bold text-[22px] sm:text-[30px] lg:text-[34px] leading-snug text-neutral-200">
              có một sự thật không ai chịu nói:
            </p>
            <p className="font-['Space_Grotesk'] font-extrabold text-[24px] sm:text-[32px] lg:text-[36px] text-[#B9FF66] italic tracking-wide pt-1">
              Nghe này....
            </p>
          </div>

          {/* Khối 2 dòng bullet: Không phải bạn lười... Bạn chỉ đang chơi... */}
          <div className="bg-[#242634] border border-white/15 rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 mb-8 space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-[#B9FF66] text-2xl font-black leading-none mt-1">•</span>
              <p className="font-['Space_Grotesk'] text-[18px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-[28px] sm:leading-[34px]">
                Không phải bạn lười. Không phải bạn dở.
              </p>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-[#B9FF66] text-2xl font-black leading-none mt-1">•</span>
              <p className="font-['Space_Grotesk'] text-[18px] sm:text-[22px] lg:text-[24px] font-bold text-white/95 leading-[28px] sm:leading-[34px]">
                Bạn chỉ đang chơi một trò chơi đã chết từ lâu.
              </p>
            </div>
          </div>

          {/* Khối Sự thật? 👉 Bạn không cần giỏi. Bạn chỉ cần đổi mô hình. */}
          <div className="bg-[#B9FF66] text-[#191A23] rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 mb-8 border-2 border-black shadow-lg">
            <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[24px] tracking-wide uppercase text-black mb-2">
              Sự thật?
            </h3>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl shrink-0 leading-none">👉</span>
              <p className="font-['Space_Grotesk'] font-extrabold text-[20px] sm:text-[26px] lg:text-[30px] leading-[28px] sm:leading-[36px] text-black">
                Bạn không cần giỏi. Bạn chỉ cần đổi mô hình.
              </p>
            </div>
          </div>

          {/* Dòng cam kết: Đúng hệ thống, 2 ngày sau bạn thấy khách thật, tiền thật. */}
          <div className="mb-8 py-2">
            <p className="font-['Space_Grotesk'] font-bold text-[20px] sm:text-[25px] lg:text-[28px] leading-[30px] sm:leading-[38px] text-[#B9FF66]">
              Đúng hệ thống, 2 ngày sau bạn thấy khách thật, tiền thật.
            </p>
          </div>

          {/* Cảnh báo: Nếu bạn không hành động ngay… */}
          <div className="p-6 sm:p-7 rounded-[22px] border-2 border-[#E11D48] bg-[#E11D48]/15 text-white mb-8">
            <p className="font-['Space_Grotesk'] text-[17px] sm:text-[20px] lg:text-[22px] leading-[28px] sm:leading-[34px] text-white">
              Nếu bạn không hành động ngay…{' '}
              <strong className="font-black text-[#FF6B6B] underline decoration-[#FF6B6B] decoration-2">
                6 tháng nữa bạn vẫn ở chỗ cũ
              </strong>
              , chỉ khác là mệt hơn, nợ nhiều hơn, niềm tin ít hơn.
            </p>
          </div>

          {/* Nút hành động kêu gọi giữ chỗ */}
          {onCtaClick && (
            <div className="flex justify-center pt-2">
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto font-['Space_Grotesk'] font-bold text-[17px] sm:text-[20px] bg-[#B9FF66] text-[#191A23] px-8 sm:px-12 py-4.5 rounded-[16px] border-2 border-black hover:bg-white hover:text-black transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wider inline-flex items-center justify-center gap-3 text-center"
              >
                <span>Đổi mô hình ngay – Giữ chỗ thử thách 2 ngày</span>
                <span className="text-xl sm:text-2xl font-black">→</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
