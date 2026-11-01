import React from 'react';

interface ChallengeBenefitsSectionProps {
  onCtaClick?: () => void;
}

export const ChallengeBenefitsSection: React.FC<ChallengeBenefitsSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full py-14 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Tiêu đề chính căn giữa */}
        <div className="mb-6 sm:mb-8 max-w-[850px]">
          <h2 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[32px] lg:text-[38px] leading-[32px] sm:leading-[42px] lg:leading-[48px] text-black tracking-tight">
            <span>Thử thách 2 ngày Affiliate sẽ giúp bạn:</span>
          </h2>
        </div>

        {/* Khối mô tả cốt lõi */}
        <div className="space-y-6 max-w-[900px] font-['Space_Grotesk']">
          
          {/* Đoạn 1: Nắm trọn mô hình kinh doanh thông minh... */}
          <div className="text-[18px] sm:text-[21px] lg:text-[23px] leading-[28px] sm:leading-[34px] text-neutral-800">
            <p className="font-bold text-black text-[20px] sm:text-[23px] lg:text-[25px]">
              Nắm trọn mô hình kinh doanh thông minh đã tạo ra hàng chục triệu mỗi tháng –
            </p>
            <p className="mt-2 text-neutral-700">
              được thiết kế cho người không công nghệ, không vốn, nhưng vẫn ra{' '}
              <strong className="font-bold text-black">khách thật, tiền thật ngay tại chỗ</strong>.{' '}
              <span className="inline-block font-bold text-black bg-[#B9FF66] px-2.5 py-0.5 rounded-[8px] border border-[#191A23] shadow-sm my-1">
                (Chỉ cần chiếc điện thoại)
              </span>
            </p>
          </div>

          {/* Đoạn 2: Để cuối cùng, bạn có thể tự tin thoát khỏi mô hình cũ... */}
          <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[28px] p-6 sm:p-9 positivus-shadow mt-4">
            <p className="text-[17px] sm:text-[21px] lg:text-[22px] leading-[28px] sm:leading-[35px] text-[#191A23]">
              Để cuối cùng, bạn có thể tự tin thoát khỏi mô hình cũ, không còn loay hoay khổ sở, mở ra{' '}
              <strong className="font-black text-black underline decoration-[#B9FF66] decoration-4">
                dòng thu nhập không ngừng tăng
              </strong>{' '}
              khiến bạn phát cuồng vì sung sướng....
            </p>
          </div>

          {/* Lời kêu gọi: ĐỪNG TIN NGAY! Hãy Xem... */}
          <div className="pt-6 sm:pt-8 flex flex-col items-center justify-center gap-2">
            <p className="font-black text-[26px] sm:text-[34px] lg:text-[38px] text-[#E11D48] tracking-wider uppercase">
              ĐỪNG TIN NGAY!
            </p>
            <div className="flex items-center justify-center gap-2 font-black text-[22px] sm:text-[28px] text-black">
              <span>Hãy Xem...</span>
              <span className="text-2xl sm:text-3xl inline-block animate-bounce">👇</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
