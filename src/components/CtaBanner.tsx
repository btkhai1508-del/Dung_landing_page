import React from 'react';

interface CtaBannerProps {
  onCtaClick?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full py-8 sm:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Template chuẩn Figma Positivus: nền #F3F3F3, bo góc 45px, border & shadow đặc trưng */}
        <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[45px] p-8 sm:p-12 lg:p-14 positivus-shadow flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
          
          {/* Cột bên trái: Nội dung căn trái */}
          <div className="w-full lg:max-w-[620px] flex flex-col items-start text-left gap-5 sm:gap-6 z-10">
            {/* Tiêu đề 2 dòng */}
            <h2 className="font-['Space_Grotesk'] text-black tracking-tight">
              <span className="block font-bold text-[20px] sm:text-[24px] lg:text-[28px] leading-[28px] sm:leading-[34px] text-neutral-900 mb-1">
                Nếu bạn thấy mình trong bất kỳ dòng nào ở trên...
              </span>
              <span className="block font-black text-[22px] sm:text-[28px] lg:text-[34px] leading-[30px] sm:leading-[38px] uppercase text-black">
                Thì THỬ THÁCH 2 NGÀY này sinh ra chính xác cho bạn!
              </span>
            </h2>

            {/* Trích dẫn / Subtitle */}
            <p className="font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[21px] leading-[26px] sm:leading-[30px] text-neutral-800">
              <span className="font-medium">Và bạn sẽ tự hỏi: </span>
              <span className="font-bold italic">"Tại sao đến giờ này mình mới biết đến Affiliate"</span>
            </p>

            {/* Kêu gọi hành động */}
            <div className="font-['Space_Grotesk'] text-[15px] sm:text-[17px] lg:text-[18px] leading-[24px] sm:leading-[28px] text-neutral-900">
              <p className="font-bold flex items-start gap-2">
                <span className="text-lg sm:text-xl shrink-0 leading-none">👉</span>
                <span>Hãy bấm nút bên dưới để giành 1 trong 7 suất cuối cùng – trước khi chương trình này đóng lại!</span>
              </p>
            </div>

            {/* Nút màu đen chuẩn Figma Positivus với 2 dòng text và mũi tên » */}
            <button
              onClick={onCtaClick}
              className="mt-2 w-full sm:w-auto bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] rounded-[16px] py-4 px-6 sm:px-8 transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 border-2 border-[#191A23] flex flex-col items-center sm:items-start justify-center gap-1 group"
            >
              <span className="font-['Space_Grotesk'] font-bold text-[18px] sm:text-[21px] leading-tight flex items-center gap-2">
                <span>Tham gia thử thách 2 Ngày Affiliate</span>
                <span className="text-xl sm:text-2xl font-black group-hover:translate-x-1.5 transition-transform leading-none">»</span>
              </span>
              <span className="font-['Space_Grotesk'] font-normal text-[13px] sm:text-[14px] text-white/90 group-hover:text-[#191A23]/90 leading-tight">
                Nhấn vào đây để được giữ chỗ ngay bây giờ
              </span>
            </button>
          </div>

          {/* Cột bên phải: Chừa khoảng trống để chèn hình ảnh sau này */}
          <div className="w-full lg:w-[440px] shrink-0 flex items-center justify-center">
            <div className="w-full min-h-[250px] sm:min-h-[300px] border-2 border-dashed border-[#191A23]/25 rounded-[32px] bg-white/60 flex flex-col items-center justify-center p-6 text-center hover:bg-white/80 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#191A23]/5 flex items-center justify-center mb-3 text-[#191A23]/40">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] font-medium text-[15px] text-[#191A23]/70">
                Khu vực hình ảnh
              </p>
              <p className="font-['Space_Grotesk'] text-[13px] text-[#191A23]/40 mt-1">
                (Đang chừa trống để bạn gắn ảnh vào sau)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
