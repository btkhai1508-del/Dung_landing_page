import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';

interface ExpectationComparisonSectionProps {
  onCtaClick?: () => void;
}

export const ExpectationComparisonSection: React.FC<ExpectationComparisonSectionProps> = ({ onCtaClick }) => {
  // Cho phép người dùng chuyển đổi xem song song 2 bên hoặc xem từng cột trên màn hình điện thoại rất nhỏ
  const [mobileLayout, setMobileLayout] = useState<'side-by-side' | 'stacked'>('side-by-side');

  const beforePoints = [
    'Từng nghĩ kiếm tiền Affiliate- online chỉ dành cho người giỏi công nghệ',
    'Đứng nhìn người khác kiếm khách, kiếm tiền... mà không dám thử vì sợ thất bại.',
    'Mô hình kinh doanh kiểu cũ- không gia tăng thu nhập- không nhân tiền lên được, mặc dù nỗ lực hết mình....',
    'Không biết sử dụng công cụ đúng, không có phễu hãy hay thống tự động... khiến mọi thứ cồng kềnh... nặng nề....',
    'Luôn không hài lòng với nguồn thu nhập, khó bứt phá và bế tắc',
  ];

  const afterPoints = [
    'Ngay tại lớp, bạn chỉ cần copy-dán, ra khách thật dù trước đó chưa từng biết công nghệ.',
    'Không lý thuyết, không màu mè... chỉ còn “wow” khi thấy dòng tiền chảy về tài khoản thật',
    'Có phễu, có web, có nội dung chạy sẵn – khách phải thốt lên: “Bạn lấy hệ thống này ở đâu vậy?”',
    'Biết rõ công cụ nào cần dùng, bước nào quan trọng, cách chạy quảng cáo 0 đ – không còn mò mẫm...',
    'Sở hữu một mô hình không ngừng tăng tiền chỉ cần copy- dán',
  ];

  return (
    <section id="expectations" className="w-full py-10 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Lời mở đầu nhỏ theo phong cách Positivus */}
        <p className="font-['Space_Grotesk'] font-bold text-neutral-800 text-[15px] sm:text-[19px] mb-3 text-center sm:text-left">
          Bạn đã sẵn sàng xây dựng cho mình một dòng tiền Affiliate 30+ triệu chỉ cần sao chép chưa?
        </p>

        {/* Section Heading theo đúng mẫu Positivus */}
        <SectionHeading
          title="THỬ THÁCH 2 NGÀY"
          description="ĐÂY LÀ NHỮNG GÌ BẠN CÓ THỂ MONG ĐỢI TỪ THỬ THÁCH 2 NGÀY"
          titleClassName="font-black uppercase tracking-tight text-[20px] sm:text-[30px] md:text-[36px]"
          descClassName="font-black text-[16px] sm:text-[20px] lg:text-[22px] leading-snug uppercase text-black"
          maxWidthDesc="max-w-[620px]"
        />

        {/* Nút chuyển đổi nhanh chế độ xem trên màn hình nhỏ (Mobile Toggle) */}
        <div className="flex sm:hidden justify-center items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMobileLayout('side-by-side')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold font-['Space_Grotesk'] border border-[#191A23] transition-all cursor-pointer ${
              mobileLayout === 'side-by-side'
                ? 'bg-[#191A23] text-white shadow-sm'
                : 'bg-white text-[#191A23] hover:bg-neutral-100'
            }`}
          >
            ⚖️ Xem 2 bên song song
          </button>
          <button
            type="button"
            onClick={() => setMobileLayout('stacked')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold font-['Space_Grotesk'] border border-[#191A23] transition-all cursor-pointer ${
              mobileLayout === 'stacked'
                ? 'bg-[#191A23] text-white shadow-sm'
                : 'bg-white text-[#191A23] hover:bg-neutral-100'
            }`}
          >
            📄 Xem từng cột
          </button>
        </div>

        {/* 2 CỘT SO SÁNH HAI BÊN (TRƯỚC vs SAU) */}
        <div
          className={`relative items-stretch ${
            mobileLayout === 'side-by-side'
              ? 'grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8'
              : 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'
          }`}
        >
          {/* CỘT 1: TRƯỚC THỬ THÁCH (Bên Trái) */}
          <div className="border-2 border-[#191A23] rounded-[24px] sm:rounded-[38px] lg:rounded-[45px] p-3.5 sm:p-7 lg:p-9 bg-[#F3F3F3] positivus-shadow flex flex-col justify-between">
            <div>
              {/* Header Cột: Căn giữa theo chuẩn ảnh mẫu */}
              <div className="text-center pb-2.5 sm:pb-4 border-b-2 border-[#191A23]/20">
                <span className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[32px] lg:text-[40px] text-[#191A23] uppercase tracking-tight block leading-tight">
                  TRƯỚC
                </span>
                <span className="font-['Space_Grotesk'] font-black text-[13px] sm:text-[20px] lg:text-[24px] text-[#191A23] uppercase tracking-tight block -mt-0.5 sm:-mt-1">
                  THỬ THÁCH:
                </span>
              </div>

              {/* Ô để trống chèn ảnh sau theo yêu cầu */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-[16px] sm:rounded-[22px] border-2 border-dashed border-[#191A23]/40 bg-white/70 flex flex-col items-center justify-center p-2.5 sm:p-5 text-center my-3 sm:my-5">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border border-[#191A23]/30 flex items-center justify-center mb-1.5 sm:mb-2 text-neutral-400">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-['Space_Grotesk'] font-bold text-neutral-700 text-[11px] sm:text-sm lg:text-base leading-tight">
                  Vị trí chèn ảnh Trước Thử Thách
                </p>
                <span className="font-['Space_Grotesk'] text-[9px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 hidden xs:inline">
                  (Khung trống để chèn ảnh sau)
                </span>
              </div>

              {/* Danh sách các nỗi đau trước thử thách */}
              <ul className="space-y-2.5 sm:space-y-3.5 lg:space-y-4 pt-1 sm:pt-2">
                {beforePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-3">
                    <span className="text-base sm:text-xl lg:text-2xl shrink-0 leading-none select-none mt-0.5 sm:mt-0">
                      ☹️
                    </span>
                    <p className="font-['Space_Grotesk'] font-medium text-[12px] sm:text-[15px] lg:text-[17px] leading-[17px] sm:leading-[22px] lg:leading-[25px] text-neutral-900">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CỘT 2: SAU THỬ THÁCH (Bên Phải) */}
          <div className="border-2 border-[#191A23] rounded-[24px] sm:rounded-[38px] lg:rounded-[45px] p-3.5 sm:p-7 lg:p-9 bg-[#B9FF66] positivus-shadow flex flex-col justify-between">
            <div>
              {/* Header Cột: Căn giữa theo chuẩn ảnh mẫu */}
              <div className="text-center pb-2.5 sm:pb-4 border-b-2 border-[#191A23]/20">
                <span className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[32px] lg:text-[40px] text-[#191A23] uppercase tracking-tight block leading-tight">
                  SAU
                </span>
                <span className="font-['Space_Grotesk'] font-black text-[13px] sm:text-[20px] lg:text-[24px] text-[#191A23] uppercase tracking-tight block -mt-0.5 sm:-mt-1">
                  THỬ THÁCH:
                </span>
              </div>

              {/* Ô để trống chèn ảnh sau theo yêu cầu */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-[16px] sm:rounded-[22px] border-2 border-dashed border-[#191A23]/40 bg-white/80 flex flex-col items-center justify-center p-2.5 sm:p-5 text-center my-3 sm:my-5">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border border-[#191A23]/30 flex items-center justify-center mb-1.5 sm:mb-2 text-neutral-600">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-['Space_Grotesk'] font-bold text-neutral-900 text-[11px] sm:text-sm lg:text-base leading-tight">
                  Vị trí chèn ảnh Sau Thử Thách
                </p>
                <span className="font-['Space_Grotesk'] text-[9px] sm:text-xs text-neutral-600 mt-0.5 sm:mt-1 hidden xs:inline">
                  (Khung trống để chèn ảnh sau)
                </span>
              </div>

              {/* Danh sách các kết quả rực rỡ sau thử thách */}
              <ul className="space-y-2.5 sm:space-y-3.5 lg:space-y-4 pt-1 sm:pt-2">
                {afterPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 sm:gap-3">
                    <span className="text-base sm:text-xl lg:text-2xl shrink-0 leading-none select-none mt-0.5 sm:mt-0">
                      😊
                    </span>
                    <p className="font-['Space_Grotesk'] font-bold text-[12px] sm:text-[15px] lg:text-[17px] leading-[17px] sm:leading-[22px] lg:leading-[25px] text-[#191A23]">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nút đăng ký nhanh bên cột Sau thử thách */}
            <div className="mt-5 sm:mt-8 pt-3 sm:pt-5 border-t-2 border-[#191A23]/15">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full py-2.5 sm:py-3.5 lg:py-4 px-2 bg-[#191A23] text-white hover:bg-white hover:text-[#191A23] font-['Space_Grotesk'] font-black text-[12px] sm:text-[16px] lg:text-[18px] uppercase rounded-[12px] sm:rounded-[16px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] sm:shadow-[0px_4px_0px_#191A23] transition-all cursor-pointer"
              >
                Nhận kết quả ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

