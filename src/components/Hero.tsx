import React from 'react';

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full pt-4 pb-8 sm:pt-8 sm:pb-14 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-8 xl:gap-10">
          {/* Left Text Block: Kéo dài chiều ngang title */}
          <div className="w-full lg:flex-1 lg:max-w-[660px] xl:max-w-[700px] flex flex-col items-start gap-6 sm:gap-7">
            {/* Title */}
            <h1 className="w-full font-['Space_Grotesk'] font-bold text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[43px] leading-[38px] sm:leading-[48px] lg:leading-[52px] xl:leading-[56px] text-black tracking-tight uppercase">
              <span className="block">
                THỬ THÁCH 2 NGÀY - DÒNG TIỀN 100 TRIỆU/ THÁNG TỪ AFFILIATE
              </span>
              <span className="block mt-2 sm:mt-2.5">
                CHỈ CẦN BIẾT BẤM ĐIỆN THOẠI (MIỄN PHÍ)
              </span>
            </h1>

            {/* Paragraph Content */}
            <div className="flex flex-col gap-3 font-['Space_Grotesk'] font-normal text-[17px] sm:text-[19px] leading-[26px] sm:leading-[28px] text-[#191A23]">
              <p className="font-medium text-black">
                Không học lý thuyết. 2 ngày đủ để bật mô hình Affiliate và tạo dòng tiền 100 triệu/tháng.
              </p>
              <p className="text-neutral-700">
                Không cần giỏi. Không cần bằng cấp. Chỉ cần điện thoại bạn có wifi
              </p>
            </div>

            {/* CTA Button: Nhấn vào đây để giữ chỗ ngay bây giờ */}
            <button
              onClick={onCtaClick}
              className="mt-2 font-['Space_Grotesk'] text-[18px] sm:text-[20px] lg:text-[21px] font-bold text-white bg-[#191A23] rounded-[14px] px-[36px] py-[20px] cursor-pointer shadow-md border-2 border-[#191A23] text-center"
            >
              Nhấn vào đây để giữ chỗ ngay bây giờ
            </button>
          </div>

          {/* Right Image: Căn đầu ngang bằng top của title tới bottom của nút CTA */}
          <div className="w-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-end relative self-stretch">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] h-full flex items-center justify-center">
              {/* Chân dung Nam Anh mới đã loại bỏ background 100% trong suốt */}
              <div className="relative w-full h-full flex items-start justify-center">
                <img
                  src="/assets/aistudio/namanh_portrait_nobg.png?v=20261022_final"
                  alt="Chân dung Nam Anh - Thử thách Affiliate"
                  className="w-full h-full object-contain object-top drop-shadow-[0_2px_6px_rgba(0,0,0,0.10)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
