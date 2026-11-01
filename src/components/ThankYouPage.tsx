import React, { useState, useEffect } from 'react';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  // 10 minutes countdown in seconds (600 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const zaloGroupLink = 'https://zalo.me/g/a2y2x036pqkwzig7u9ri';

  return (
    <div className="w-full py-10 sm:py-16 bg-[#FAFAFA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            ← Quay lại trang chủ
          </button>
        </div>

        {/* Main Thank You Card */}
        <div className="bg-white border-2 border-[#191A23] rounded-[36px] sm:rounded-[45px] p-6 sm:p-12 lg:p-14 positivus-shadow flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 bg-[#B9FF66] rounded-[10px] border border-[#191A23] mb-6">
            <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-black tracking-wider uppercase">
              Bước Cuối Cùng Để Hoàn Tất
            </span>
          </div>

          {/* [TITLE] */}
          <h1 className="font-['Space_Grotesk'] font-extrabold text-[30px] sm:text-[44px] lg:text-[50px] leading-[36px] sm:leading-[50px] lg:leading-[56px] text-black tracking-tight uppercase max-w-[760px]">
            CHÚC MỪNG,
            <span className="block text-[#191A23] mt-1 sm:mt-2">BẠN ĐÃ LÀM ĐƯỢC RỒI!</span>
          </h1>

          {/* Paragraph explanation */}
          <p className="mt-6 font-['Space_Grotesk'] font-medium text-[17px] sm:text-[20px] leading-[26px] sm:leading-[30px] text-neutral-800 max-w-[700px]">
            Bước cuối cùng, Chỉ trong nhóm kín Zalo chúng tôi mới cung cấp lịch học, chiến lược, bài tập, tài liệu và 🎁quà tặng lên đến 125.970.000 đ....
          </p>

          {/* Warning badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-[14px] text-amber-900 font-['Space_Grotesk'] font-bold text-[14px] sm:text-[16px]">
            <span>⚠️ (Một nhóm duy nhất, một nơi duy nhất, chúng tôi chỉ duyệt trong 3 phút)</span>
          </div>

          {/* [TIMER] - 10 minutes styled as image_0ad707c8.png */}
          <div className="my-8 sm:my-10 flex items-center justify-center gap-8 sm:gap-14 select-none">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="font-['Space_Grotesk'] font-light text-[46px] sm:text-[64px] leading-none text-[#E11D48]">
                {hours}
              </span>
              <span className="font-['Space_Grotesk'] text-[15px] sm:text-[18px] text-neutral-600 mt-2 font-normal">
                hours
              </span>
            </div>

            {/* Separator */}
            <span className="text-[#E11D48] text-3xl font-light -mt-6">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="font-['Space_Grotesk'] font-light text-[46px] sm:text-[64px] leading-none text-[#E11D48]">
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="font-['Space_Grotesk'] text-[15px] sm:text-[18px] text-neutral-600 mt-2 font-normal">
                minutes
              </span>
            </div>

            {/* Separator */}
            <span className="text-[#E11D48] text-3xl font-light -mt-6">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <span className="font-['Space_Grotesk'] font-light text-[46px] sm:text-[64px] leading-none text-[#E11D48]">
                {String(seconds).padStart(2, '0')}
              </span>
              <span className="font-['Space_Grotesk'] text-[15px] sm:text-[18px] text-neutral-600 mt-2 font-normal">
                seconds
              </span>
            </div>
          </div>

          {/* [NÚT NHẤN] - BẤM ĐỂ VÀO NHÓM ZALO KÍN */}
          <div className="w-full max-w-[540px] flex flex-col items-center gap-2">
            <a
              href={zaloGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 px-6 sm:px-8 bg-[#191A23] text-white hover:bg-[#B9FF66] hover:text-[#191A23] rounded-[18px] border-2 border-[#191A23] shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <span className="font-['Space_Grotesk'] font-extrabold text-[18px] sm:text-[22px] tracking-wide uppercase">
                BẤM ĐỂ VÀO NHÓM ZALO KÍN
              </span>
              <span className="font-['Space_Grotesk'] font-medium text-[13px] sm:text-[14px] text-neutral-300 group-hover:text-black mt-1">
                (Không vào nhóm không được học nhanh tay bấm vào nhóm ngay nhé)
              </span>
            </a>
          </div>

          {/* QR Code Section */}
          <div className="mt-10 pt-8 border-t border-neutral-200 w-full flex flex-col items-center">
            <div className="p-3 bg-white border-2 border-[#191A23] rounded-[24px] shadow-md inline-block">
              <img
                src="/assets/aistudio/image_0b59f36d.png"
                alt="QR Code Nhóm Zalo Kín"
                className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] object-contain rounded-[14px]"
              />
            </div>
            <p className="mt-4 font-['Space_Grotesk'] font-semibold text-[15px] sm:text-[17px] text-black">
              (Quét mã QR-code 👆 để được vào nhóm luôn nhé)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
