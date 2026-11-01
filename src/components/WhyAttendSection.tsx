import React from 'react';

interface WhyAttendSectionProps {
  onCtaClick?: () => void;
}

export const WhyAttendSection: React.FC<WhyAttendSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full py-12 sm:py-18 bg-white border-t border-neutral-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề Section chuẩn theo ảnh */}
        <div className="mb-8 sm:mb-12">
          <h2 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[34px] lg:text-[40px] leading-[32px] sm:leading-[44px] lg:leading-[50px] text-black tracking-tight">
            <span className="text-[#E11D48] mr-2 font-black text-[28px] sm:text-[38px] lg:text-[44px] inline-block align-middle">?</span>
            <span>Tại sao bạn </span>
            <span className="font-extrabold uppercase">KHÔNG THỂ</span>
            <span> bỏ lỡ thử thách này:</span>
          </h2>
        </div>

        {/* Bố cục 2 cột: Cột trái liệt kê 5 điểm nổi bật, Cột phải là hình ảnh thuyết trình phễu F1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Cột trái (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* Điểm 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-[#10B981] flex items-center justify-center text-white mt-0.5 shadow-sm">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] lg:text-[19px] leading-[25px] sm:leading-[28px] text-[#191A23]">
                <strong className="font-bold text-black">2 ngày = 1 hệ thống chạy thật. </strong>
                <span className="text-neutral-800">Bạn không ngồi nghe lý thuyết. Bạn copy – dán ngay tại lớp, có phễu, có web, có nội dung tất cả làm sẵn cho bạn.</span>
              </p>
            </div>

            {/* Điểm 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-[#10B981] flex items-center justify-center text-white mt-0.5 shadow-sm">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] lg:text-[19px] leading-[25px] sm:leading-[28px] text-[#191A23]">
                <strong className="font-bold text-black">Quên công nghệ đi, </strong>
                <span className="text-neutral-800">tất cả chỉ cần bạn biết bấm điện thoại là có thể tham gia, thế thôi.</span>
              </p>
            </div>

            {/* Điểm 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-[#10B981] flex items-center justify-center text-white mt-0.5 shadow-sm">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] lg:text-[19px] leading-[25px] sm:leading-[28px] text-[#191A23]">
                <strong className="font-bold text-black">Thực chiến 100%. </strong>
                <span className="text-neutral-800">Tôi cầm tay chỉ việc, để bạn tự tay bật hệ thống. Không “nghe cho vui”, mà làm ra kết quả ngay.</span>
              </p>
            </div>

            {/* Điểm 4 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-[#10B981] flex items-center justify-center text-white mt-0.5 shadow-sm">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] lg:text-[19px] leading-[25px] sm:leading-[28px] text-[#191A23]">
                <strong className="font-bold text-black">Đúng trend 2026. </strong>
                <span className="text-neutral-800">Khi </span>
                <strong className="font-bold text-black">A.I đang càn quét, </strong>
                <span className="text-neutral-800">làm thuê không cứu bạn được nữa. Người có mô hình thông minh sẽ thắng.</span>
              </p>
            </div>

            {/* Điểm 5 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 flex items-center gap-1 mt-0.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-[#10B981] flex items-center justify-center text-white shadow-sm">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-lg sm:text-xl leading-none">🎁</span>
              </div>
              <p className="font-['Space_Grotesk'] text-[16px] sm:text-[18px] lg:text-[19px] leading-[25px] sm:leading-[28px] text-[#191A23]">
                <strong className="font-bold text-black">Quà trị giá 125.970.000đ </strong>
                <span className="text-neutral-800">– toàn bộ hệ thống xây sẵn, bạn nhận miễn phí khi tham gia thử thách này</span>
              </p>
            </div>

            {/* Subtitle cảnh báo nổi bật: font lớn hơn, UPPERCASE và highlight màu Prim Green (#B9FF66) */}
            <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[24px] p-5 sm:p-7 positivus-shadow mt-2">
              <div className="flex flex-col gap-2.5 font-['Space_Grotesk']">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#E11D48] animate-pulse" />
                  <span className="font-black text-[#E11D48] uppercase tracking-wider text-[20px] sm:text-[24px]">
                    CHÚ Ý:
                  </span>
                </div>
                <div className="text-[18px] sm:text-[21px] lg:text-[22px] leading-[28px] sm:leading-[34px] text-[#191A23]">
                  <span className="bg-[#B9FF66] text-black font-black px-3 py-1 rounded-[8px] border-2 border-[#191A23] inline-block my-1 shadow-sm uppercase tracking-tight">
                    CHỈ GIỚI HẠN 7 NGƯỜI, 7 QUÀ TẶNG TRỊ GIÁ 125.970.000 VNĐ
                  </span>
                  <p className="mt-2 font-medium text-neutral-900">
                    – và không gian ấm cúng để Tôi kèm sát từng người,{' '}
                    <span className="bg-[#B9FF66] text-black font-black px-2.5 py-0.5 rounded-[6px] border border-[#191A23] inline-block uppercase">
                      "KHÔNG HỨA BAO GIỜ MỞ LẠI"
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Nút nhận hệ thống quà tặng giữ chỗ: align xuống dưới và căn giữa */}
            {onCtaClick && (
              <div className="pt-3 sm:pt-5 w-full flex justify-center">
                <button
                  onClick={onCtaClick}
                  className="w-full sm:w-auto font-['Space_Grotesk'] font-bold text-[17px] sm:text-[19px] bg-[#191A23] text-white px-8 sm:px-10 py-4 sm:py-4.5 rounded-[16px] border-2 border-[#191A23] hover:bg-[#B9FF66] hover:text-[#191A23] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 text-center"
                >
                  <span>Nhận hệ thống quà tặng & Giữ chỗ</span>
                  <span className="text-xl">→</span>
                </button>
              </div>
            )}

          </div>

          {/* Cột phải (5 cols): Hình ảnh thuyết trình Phễu F1 */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] rounded-[24px] sm:rounded-[32px] overflow-hidden border-2 border-[#191A23] positivus-shadow bg-neutral-50">
              <img
                src="/assets/aistudio/phell_f1_presentation.png"
                alt="Xây dựng phễu F1 đều đặn từ người lạ online"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
