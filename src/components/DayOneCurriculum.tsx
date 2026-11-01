import React from 'react';
import { SectionHeading } from './SectionHeading';

interface DayOneCurriculumProps {
  onCtaClick?: () => void;
}

export const DayOneCurriculum: React.FC<DayOneCurriculumProps> = ({ onCtaClick }) => {
  return (
    <section id="curriculum" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="LỘ TRÌNH 2 NGÀY"
          titleClassName="font-black uppercase tracking-tight text-[24px] sm:text-[34px] md:text-[40px]"
          description="CHƯƠNG TRÌNH ĐÀO TẠO THỰC CHIẾN ĐỘT PHÁ DÒNG TIỀN TỰ ĐỘNG CÙNG CHÚNG TÔI"
          descClassName="font-black text-[16px] sm:text-[19px] lg:text-[22px] leading-snug uppercase text-black"
          maxWidthDesc="max-w-[620px]"
        />

        {/* Card riêng NGÀY 1 theo phong cách Positivus */}
        <div className="border-2 border-[#191A23] rounded-[36px] sm:rounded-[45px] p-6 sm:p-10 lg:p-12 positivus-shadow bg-[#F3F3F3]">
          {/* Header Card: NGÀY 1 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b-2 border-[#191A23]/20">
            <div className="inline-flex items-center gap-3">
              <span className="px-5 sm:px-7 py-2 sm:py-2.5 bg-[#B9FF66] text-[#191A23] font-['Space_Grotesk'] font-black text-[22px] sm:text-[30px] lg:text-[34px] rounded-[14px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] uppercase tracking-tight">
                NGÀY 1:
              </span>
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-neutral-700 text-xs sm:text-sm uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-full border border-[#191A23]/25">
              Thực chiến cầm tay chỉ việc
            </span>
          </div>

          {/* Danh sách 3 nội dung trọng tâm của Ngày 1 */}
          <div className="pt-6 sm:pt-8 space-y-8 sm:space-y-10">
            {/* #1- BÍ MẬT AFFILIATE CÁCH TẠO DÒNG TIỀN 100 TRIỆU- RỦI RO= 0 */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[26px] lg:text-[28px] leading-snug sm:leading-tight text-[#191A23]">
                #1- BÍ MẬT AFFILIATE CÁCH TẠO DÒNG TIỀN 100 TRIỆU- RỦI RO= 0
              </h3>

              <div className="space-y-3 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[32px] text-neutral-800">
                <p>
                  Tiết lộ Bí Mật Affiliate- tự động; mô hình kiếm tiền không thể ngăn cản từ 2026-2035, và bài học xương máu bạn có thể tránh khỏi những mô hình lừa đảo ngoài kia.
                </p>
                <p>
                  Cách triển khai Mô hình Affiliate hiệu quả tuyệt đối, ít người Việt Nam biết, mang về tiền mặt đã được kiểm chứng, bạn chỉ việc sao chép
                </p>
              </div>

              {/* Hộp quà tặng hành động */}
              <div className="p-4 sm:p-5 bg-white rounded-[20px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] flex items-start sm:items-center gap-3 mt-3">
                <span className="text-2xl sm:text-3xl shrink-0 leading-none">🎁</span>
                <p className="font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] lg:text-[19px] text-[#191A23] leading-snug">
                  Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần bạn có điện thoại, và biết bấm vào zalo
                </p>
              </div>
            </div>

            {/* Đường phân cách nét liền giữa các phần */}
            <div className="border-t-2 border-[#191A23]/20" />

            {/* #2- Bí mật X10 thu nhập từ đòn bẩy Vô Hạn */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[26px] lg:text-[28px] leading-snug sm:leading-tight text-[#191A23]">
                #2- Bí mật X10 thu nhập từ đòn bẩy Vô Hạn
              </h3>

              <div className="space-y-3 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[32px] text-neutral-800">
                <p>
                  Cách nhân X10 thu nhập trong thời gian ngắn cực kỳ hiệu quả không rào bản....
                </p>
                <p>
                  Bạn sẽ nhận được toàn bộ 5 đòn bẩy mà chúng tôi đã áp dụng, Bạn biết chính xác tiền đến từ đâu và Bí Mật kiếm được tiền nhiều hơn luôn làm ít hơn.
                </p>
              </div>

              {/* Hộp quà tặng hành động */}
              <div className="p-4 sm:p-5 bg-white rounded-[20px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] flex items-start sm:items-center gap-3 mt-3">
                <span className="text-2xl sm:text-3xl shrink-0 leading-none">🎁</span>
                <p className="font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] lg:text-[19px] text-[#191A23] leading-snug">
                  Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần bạn có điện thoại, và biết bấm vào zalo
                </p>
              </div>
            </div>

            {/* Đường phân cách nét liền giữa các phần */}
            <div className="border-t-2 border-[#191A23]/20" />

            {/* #3- Hậu trường mô hình kiếm ra tiền mặt */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[26px] lg:text-[28px] leading-snug sm:leading-tight text-[#191A23]">
                #3- Hậu trường mô hình kiếm ra tiền mặt
              </h3>

              <div className="space-y-3 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[32px] text-neutral-800">
                <p>
                  Tôi sẽ dắt tay bạn ra phía sân sau hậu trường, cho bạn chứng kiến toàn cảnh cách tôi áp dụng toàn bộ chiến lược Affiliate để tạo ra tiền mặt....
                </p>
                <p>
                  Bạn biết chính xác cách tôi sử dụng công cụ gì, hệ thống nào và nhân bản toàn bộ ra sao để tạo ra tiền, tôi cũng sẽ tặng cho bạn toàn bộ công cụ, tài liệu, kho báu của tôi ở cuối...
                </p>
              </div>

              {/* Hộp quà tặng hành động */}
              <div className="p-4 sm:p-5 bg-white rounded-[20px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] flex items-start sm:items-center gap-3 mt-3">
                <span className="text-2xl sm:text-3xl shrink-0 leading-none">🎁</span>
                <p className="font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] lg:text-[19px] text-[#191A23] leading-snug">
                  Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần bạn có điện thoại, và biết bấm vào zalo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card riêng NGÀY 2 theo phong cách Positivus */}
        <div className="mt-8 sm:mt-10 border-2 border-[#191A23] rounded-[36px] sm:rounded-[45px] p-6 sm:p-10 lg:p-12 positivus-shadow bg-[#F3F3F3]">
          {/* Header Card: NGÀY 2 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b-2 border-[#191A23]/20">
            <div className="inline-flex items-center gap-3">
              <span className="px-5 sm:px-7 py-2 sm:py-2.5 bg-[#B9FF66] text-[#191A23] font-['Space_Grotesk'] font-black text-[22px] sm:text-[30px] lg:text-[34px] rounded-[14px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] uppercase tracking-tight">
                NGÀY 2:
              </span>
            </div>
            <span className="font-['Space_Grotesk'] font-bold text-neutral-700 text-xs sm:text-sm uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-full border border-[#191A23]/25">
              Tự động hóa & Nhân bản X100
            </span>
          </div>

          {/* Danh sách các nội dung trọng tâm của Ngày 2 */}
          <div className="pt-6 sm:pt-8 space-y-8 sm:space-y-10">
            {/* #1- Bí mật xây dựng dòng tiền trong 5 phút Bấm điện thoại */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[26px] lg:text-[28px] leading-snug sm:leading-tight text-[#191A23]">
                #1- Bí mật xây dựng dòng tiền trong 5 phút Bấm điện thoại
              </h3>

              <div className="space-y-3 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[32px] text-neutral-800">
                <p>
                  Người nhanh chỉ 3 phút có thể làm được.... là sự thật, bởi tất cả hệ thống chạy bên trong chúng tôi đã xây sẵn cho bạn đảm bảo ra tiền khi áp dụng
                </p>

                {/* 4 dòng gạch đầu dòng có tích ✔️ */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#B9FF66] text-[#191A23] border border-[#191A23] font-bold text-sm shrink-0 shadow-[0px_2px_0px_#191A23]">
                      ✓
                    </span>
                    <span className="font-medium text-neutral-900">
                      Hệ thống xây sẵn thương hiệu cá nhân- chỉ cần bấm điện thoại
                    </span>
                  </div>

                  <div className="flex items-start sm:items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#B9FF66] text-[#191A23] border border-[#191A23] font-bold text-sm shrink-0 shadow-[0px_2px_0px_#191A23]">
                      ✓
                    </span>
                    <span className="font-medium text-neutral-900">
                      Hệ thống xây sẵn cách thu hút khách hàng tiềm năng- chỉ cần bấm điện thoại
                    </span>
                  </div>

                  <div className="flex items-start sm:items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#B9FF66] text-[#191A23] border border-[#191A23] font-bold text-sm shrink-0 shadow-[0px_2px_0px_#191A23]">
                      ✓
                    </span>
                    <span className="font-medium text-neutral-900">
                      Hệ thống chuyển đổi khách hàng tiềm năng ra tiền mặt
                    </span>
                  </div>

                  <div className="flex items-start sm:items-center gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#B9FF66] text-[#191A23] border border-[#191A23] font-bold text-sm shrink-0 shadow-[0px_2px_0px_#191A23]">
                      ✓
                    </span>
                    <span className="font-medium text-neutral-900">
                      Nhân bản toàn bộ quy trình tự động của chúng tôi- chỉ cần chiếc điện thoại
                    </span>
                  </div>
                </div>
              </div>

              {/* Hộp quà tặng hành động */}
              <div className="p-4 sm:p-5 bg-white rounded-[20px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] flex items-start sm:items-center gap-3 mt-3">
                <span className="text-2xl sm:text-3xl shrink-0 leading-none">🎁</span>
                <p className="font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] lg:text-[19px] text-[#191A23] leading-snug">
                  Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần bạn có điện thoại, và biết bấm vào zalo
                </p>
              </div>
            </div>

            {/* Đường phân cách nét liền giữa các phần */}
            <div className="border-t-2 border-[#191A23]/20" />

            {/* #2- Bí Mật X100 Affiliate Tự Động- Chi phí 0 Đ */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="font-['Space_Grotesk'] font-black text-[20px] sm:text-[26px] lg:text-[28px] leading-snug sm:leading-tight text-[#191A23]">
                #2- Bí Mật X100 Affiliate Tự Động- Chi phí 0 Đ
              </h3>

              <div className="space-y-3 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[32px] text-neutral-800">
                <p>
                  Bạn hoàn toàn có thể gia tăng thu nhập, mở rộng quy mô không tưởng chỉ với 0 Đ....
                </p>
                <p>
                  Có nghĩa bạn không mất một đồng nào, mà vẫn có thể tạo ra nhanh chóng 100 mô hình đẻ ra tiền trong lúc bản ngủ....
                </p>
                <p>
                  Giống như bạn có 100 công ty hay 100 bất động sản cho thuê mang về tiền liên tục trong khi bạn không phải bỏ ra 1 đồng nào cả. ĐIÊN RỒ...., hãy có mặt để lấy.
                </p>
              </div>

              {/* Hộp quà tặng hành động */}
              <div className="p-4 sm:p-5 bg-white rounded-[20px] border-2 border-[#191A23] shadow-[0px_3px_0px_#191A23] flex items-start sm:items-center gap-3 mt-3">
                <span className="text-2xl sm:text-3xl shrink-0 leading-none">🎁</span>
                <p className="font-['Space_Grotesk'] font-bold text-[16px] sm:text-[18px] lg:text-[19px] text-[#191A23] leading-snug">
                  Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần bạn có điện thoại, và biết bấm vào zalo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
