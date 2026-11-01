import React from 'react';

interface AffiliateModelSectionProps {
  onCtaClick?: () => void;
}

export const AffiliateModelSection: React.FC<AffiliateModelSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full py-12 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề & phụ đề chính của Section trắng */}
        <div className="max-w-[980px] mx-auto text-center mb-10 sm:mb-16">
          {/* Badge tiêu đề phong cách Positivus */}
          <div className="inline-flex items-center px-[10px] py-1 bg-[#B9FF66] rounded-[8px] mb-4">
            <h2 className="font-['Space_Grotesk'] font-bold text-[22px] sm:text-[30px] md:text-[36px] leading-[32px] sm:leading-[40px] md:leading-[46px] text-black tracking-tight">
              Một mô hình Affiliate MỚI cho người không cần biết công nghệ!
            </h2>
          </div>

          {/* Dòng mô tả 1 */}
          <p className="font-['Space_Grotesk'] text-[17px] sm:text-[20px] md:text-[22px] leading-[26px] sm:leading-[32px] text-neutral-800">
            <span>Chỉ trong 2 ngày, </span>
            <strong className="font-bold text-black">bạn copy – dán ngay tại lớp: </strong>
            <span>có phễu, có website, có nội dung chạy sẵn…</span>
          </p>

          {/* Dòng kết quả ra khách thật, tiền thật */}
          <p className="mt-2.5 font-['Space_Grotesk'] font-bold text-[18px] sm:text-[21px] md:text-[23px] text-[#191A23] flex items-center justify-center gap-2">
            <span className="text-[#0E7E49] text-xl sm:text-2xl font-black">→</span>
            <span>Hệ thống ra khách thật, tiền thật ngay lập tức.</span>
          </p>
        </div>

        {/* Bố cục 2 cột: Cột trái là nội dung text, Cột phải là hình ảnh để blank */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Cột trái (7 cols): Các đoạn văn truyền cảm hứng */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-['Space_Grotesk'] text-[17px] sm:text-[19px] leading-[28px] sm:leading-[32px] text-neutral-800">
            {/* Box 1: Lời cam kết cầm tay chỉ việc */}
            <div className="border-l-4 border-[#191A23] pl-5 sm:pl-6 py-1">
              <p>
                Tôi không lên bục để thuyết giảng.{' '}
                <strong className="font-bold text-black">
                  Tôi ngồi cạnh bạn – mở điện thoại, dựng hệ thống, để bạn tự tay làm được.
                </strong>
              </p>
            </div>

            {/* Box 2: Khẳng định tính chuyển đổi thực tế */}
            <div className="bg-[#F3F3F3] border border-[#191A23] rounded-[24px] p-5 sm:p-7 positivus-shadow">
              <p className="font-bold text-[18px] sm:text-[20px] text-black flex items-start gap-2.5">
                <span className="text-xl sm:text-2xl shrink-0">✨</span>
                <span>Chương trình 2 ngày này KHÔNG phải một khóa học vô thưởng vô phạt.</span>
              </p>
            </div>

            {/* Box 3: Cơ hội chuyển đổi thoát khỏi mô hình cũ */}
            <div className="bg-[#191A23] text-white rounded-[24px] p-6 sm:p-8 positivus-shadow">
              <p className="text-[17px] sm:text-[19px] leading-[28px] sm:leading-[32px] text-white/95">
                Đây là cuộc chuyển đổi thật sự – dành cho bạn, người muốn thoát khỏi mô hình cũ, và sở hữu ngay{' '}
                <span className="text-[#B9FF66] font-bold italic">“vũ khí kiếm thêm 100 triệu/tháng”</span>{' '}
                <strong className="font-bold text-white underline decoration-[#B9FF66] decoration-2 underline-offset-4">
                  mà không cần biết công nghệ.
                </strong>
              </p>
            </div>

            {/* Nút CTA giữ chỗ */}
            {onCtaClick && (
              <div className="pt-2">
                <button
                  onClick={onCtaClick}
                  className="w-full sm:w-auto bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] px-8 py-4 rounded-[14px] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-[#191A23] flex items-center justify-center gap-2.5"
                >
                  <span className="text-xl">👉</span>
                  <span>Nhấn vào đây để giữ chỗ ngay bây giờ</span>
                </button>
              </div>
            )}
          </div>

          {/* Cột phải (5 cols): Khung hình ảnh blank theo yêu cầu để người dùng chèn ảnh sau */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[460px] aspect-[4/5] sm:aspect-[3/4] border-2 border-dashed border-[#191A23]/30 rounded-[32px] bg-[#F9FAFB] flex flex-col items-center justify-center p-8 text-center hover:bg-[#F3F3F3] transition-colors relative overflow-hidden group">
              {/* Icon placeholder */}
              <div className="w-20 h-20 rounded-full bg-[#191A23]/5 border border-[#191A23]/10 flex items-center justify-center mb-4 text-[#191A23]/50 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-['Space_Grotesk'] font-bold text-[17px] text-[#191A23]/70">
                Khung hình ảnh lớp học / workshop
              </p>
              <p className="font-['Space_Grotesk'] text-[14px] text-[#191A23]/40 mt-1 max-w-[260px]">
                (Hình ảnh để blank sẵn sàng để bạn chèn ảnh thực tế sau)
              </p>
              <div className="mt-4 px-3 py-1 rounded-full bg-[#B9FF66]/40 text-[#191A23] font-['Space_Grotesk'] text-[12px] font-semibold border border-[#B9FF66]">
                Khu vực chèn ảnh
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
