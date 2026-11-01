import React from 'react';

interface HesitationSectionProps {
  onCtaClick?: () => void;
}

export const HesitationSection: React.FC<HesitationSectionProps> = ({ onCtaClick }) => {
  return (
    <section id="hesitation" className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* PHẦN 1: 3 THẺ TỔNG KẾT NHANH TRÊN ĐẦU (CÁI GÌ - KHI NÀO - TẠI SAO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {/* Card 1: Cái gì */}
          <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[24px] p-6 text-center shadow-[0px_4px_0px_#191A23] flex flex-col items-center justify-center min-h-[150px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl" role="img" aria-label="trophy">🏆</span>
              <h4 className="font-['Space_Grotesk'] font-black text-[22px] sm:text-[24px] text-[#191A23]">
                Cái gì:
              </h4>
            </div>
            <p className="font-['Space_Grotesk'] text-[15px] sm:text-[16px] leading-snug text-neutral-800 font-medium">
              Thử thách 2 ngày Affiliate 100 triệu chỉ cần sao chép
            </p>
          </div>

          {/* Card 2: Khi nào */}
          <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[24px] p-6 text-center shadow-[0px_4px_0px_#191A23] flex flex-col items-center justify-center min-h-[150px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl" role="img" aria-label="calendar">📅</span>
              <h4 className="font-['Space_Grotesk'] font-black text-[22px] sm:text-[24px] text-[#191A23]">
                Khi nào:
              </h4>
            </div>
            <p className="font-['Space_Grotesk'] text-[15px] sm:text-[16px] leading-snug text-neutral-800 font-medium">
              <span className="font-black text-black">2 ngày - ZOOM</span> lịch trong nhóm<br />
              Chỉ diễn ra 1 lần không biết bao giờ có lại....
            </p>
          </div>

          {/* Card 3: Tại sao */}
          <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[24px] p-6 text-center shadow-[0px_4px_0px_#191A23] flex flex-col items-center justify-center min-h-[150px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl" role="img" aria-label="coffee">☕</span>
              <h4 className="font-['Space_Grotesk'] font-black text-[22px] sm:text-[24px] text-[#191A23]">
                Tại sao:
              </h4>
            </div>
            <p className="font-['Space_Grotesk'] text-[15px] sm:text-[16px] leading-snug text-neutral-800 font-medium">
              Nếu bạn không học <span className="font-black text-black">NGAY BÂY GIỜ</span>, không còn lớp khác
            </p>
          </div>
        </div>

        {/* PHẦN 2: TIÊU ĐỀ LƯỠNG LỰ */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-['Space_Grotesk'] font-black text-[30px] sm:text-[44px] lg:text-[52px] leading-tight text-[#191A23] tracking-tight">
            Bạn có thể còn đang lưỡng lự...
          </h2>
        </div>

        {/* PHẦN 3: BỐ CỤC 2 CỘT THEO FIGMA REFERENCES (CỘT TRÁI CHÂN DUNG HUẤN LUYỆN VIÊN NAM ANH - CỘT PHẢI NỘI DUNG VÀ NÚT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* CỘT TAY TRÁI: Ảnh chân dung Người Huấn Luyện duy nhất Nam Anh */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px] rounded-[36px] sm:rounded-[45px] border-2 border-[#191A23] bg-[#F3F3F3] positivus-shadow overflow-hidden flex flex-col justify-between relative min-h-[480px] sm:min-h-[540px]">
              {/* Badge góc trên theo Figma token */}
              <div className="p-5 sm:p-6 pb-0 flex items-center justify-between z-10">
                <span className="font-['Space_Grotesk'] font-bold text-xs sm:text-sm uppercase tracking-wider text-[#191A23] bg-[#B9FF66] px-3.5 py-1 rounded-[7px]">
                  Huấn Luyện Viên Duy Nhất
                </span>
                <span className="font-['Space_Grotesk'] font-black text-lg sm:text-xl text-[#191A23]">
                  Nam Anh
                </span>
              </div>

              {/* Ảnh chân dung Nam Anh không viền thừa */}
              <div className="relative w-full flex-1 flex items-end justify-center px-4 pt-4 overflow-hidden min-h-[360px]">
                {/* Vòng tròn trang trí Positivus phía sau */}
                <div className="absolute w-64 h-64 rounded-full bg-[#B9FF66]/30 -top-8 -right-8 pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full bg-white/60 bottom-4 -left-8 pointer-events-none" />

                <img
                  src="/assets/aistudio/namanh_portrait_nobg.png?v=20261022_final"
                  alt="Huấn luyện viên Nam Anh"
                  className="relative z-10 w-auto h-full max-h-[440px] object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Dải thông tin dưới chân ảnh */}
              <div className="p-3.5 sm:p-4 bg-white border-t-2 border-[#191A23] text-center z-10">
                <p className="font-['Space_Grotesk'] font-bold text-[15px] sm:text-[17px] text-[#191A23]">
                  Nam Anh – Người Đồng Hành Cùng Bạn Trong 2 Ngày
                </p>
              </div>
            </div>
          </div>

          {/* CỘT TAY PHẢI: Nội dung chuyển đổi & Nút CTA chuẩn màu Figma (#B9FF66 & #191A23) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8 font-['Space_Grotesk']">
            {/* Lời thức tỉnh */}
            <p className="text-[20px] sm:text-[25px] lg:text-[28px] leading-[34px] sm:leading-[40px] text-neutral-900 font-normal max-w-[620px]">
              Trong khi đó, ngoài kia có hàng ngàn người đang{' '}
              <strong className="font-black text-black">gom khách – in tiền mỗi ngày</strong> nhờ Affiliate- Tự Động
            </p>

            {/* Tiêu đề kêu gọi: Dùng highlight Prime Green không viền theo chuẩn */}
            <div className="space-y-3">
              <h3 className="font-black text-[22px] sm:text-[30px] lg:text-[34px] leading-tight text-[#191A23]">
                <span className="text-[#191A23] font-bold mr-2 text-[26px] sm:text-[34px]">»</span>
                [Tham gia Thử thách Affiliate- Tự Động 2 ngày –{' '}
                <span className="bg-[#B9FF66] text-[#191A23] px-3.5 py-1 rounded-[8px] font-black uppercase inline-block leading-none">
                  MIỄN PHÍ
                </span>
                ]
              </h3>
              <p className="italic text-neutral-600 text-[16px] sm:text-[18px]">
                (Đừng bỏ qua cơ hội 2 ngày tạo dòng tiền Affiliate chỉ bằng Copy-dán)
              </p>
            </div>

            {/* Họa tiết mũi tên chỉ xuống 3 cụm theo màu Figma #191A23 */}
            <div className="flex items-center justify-center lg:justify-start gap-4 py-2 text-[#191A23]">
              {[0, 1, 2].map((group) => (
                <div key={group} className="flex flex-col items-center gap-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h12l-6 6z" />
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h12l-6 6z" />
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h12l-6 6z" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Nút hành động chuẩn Figma (#B9FF66 nền, #191A23 chữ, bo 14px, shadow Positivus) */}
            <div className="w-full max-w-[540px]">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full bg-[#B9FF66] hover:bg-[#191A23] text-[#191A23] hover:text-[#B9FF66] py-5 px-6 rounded-[14px] border-2 border-[#191A23] shadow-[0px_6px_0px_#191A23] hover:shadow-[0px_8px_0px_#191A23] hover:-translate-y-1 transition-all cursor-pointer text-center group"
              >
                <div className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[24px] flex items-center justify-center gap-2 leading-tight">
                  <span>Tham gia thử thách 2 ngày Affiliate</span>
                  <span className="group-hover:translate-x-1 transition-transform">»</span>
                </div>
                <div className="text-[14px] sm:text-[15px] font-bold text-neutral-800 group-hover:text-neutral-300 mt-1">
                  Nhấn vào đây để được giữ chỗ ngay bây giờ
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
