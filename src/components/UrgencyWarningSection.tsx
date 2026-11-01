import React from 'react';

interface UrgencyWarningSectionProps {
  onCtaClick?: () => void;
}

export const UrgencyWarningSection: React.FC<UrgencyWarningSectionProps> = ({ onCtaClick }) => {
  return (
    <section id="urgency-warning" className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* PHẦN 1: BẠN CÀNG CHỜ CÀNG MẤT THÊM TIỀN MẶT */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[48px] leading-tight text-[#191A23] tracking-tight uppercase">
            BẠN CÀNG CHỜ <br className="hidden sm:inline" />
            CÀNG MẤT THÊM TIỀN MẶT....
          </h2>
        </div>

        {/* Bố cục 2 cột: Cột trái nội dung bộc bạch - Cột phải Hình đồng hồ cát theo phong cách template */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Cột trái: Văn bản bộc bạch thẳng thắn */}
          <div className="lg:col-span-7 space-y-6 font-['Space_Grotesk'] text-[17px] sm:text-[19px] lg:text-[20px] leading-[30px] sm:leading-[34px] text-neutral-800">
            <div>
              <p className="font-black text-[#191A23] text-[20px] sm:text-[22px]">
                Tôi nói thẳng:
              </p>
              <p className="mt-1">
                Nếu bạn đang đọc dòng này, nghĩa là bạn đã từng nghĩ tới kiếm tiền online.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-neutral-900">
                Nhưng rồi... bạn lăn tăn:
              </p>
              <div className="space-y-1.5 pl-1">
                <div className="flex items-center gap-3 text-red-600 font-semibold">
                  <span className="text-lg">❌</span>
                  <span>Không biết bắt đầu từ đâu.</span>
                </div>
                <div className="flex items-center gap-3 text-red-600 font-semibold">
                  <span className="text-lg">❌</span>
                  <span>Không chắc có làm được không.</span>
                </div>
                <div className="flex items-center gap-3 text-red-600 font-semibold">
                  <span className="text-lg">❌</span>
                  <span>Sợ công nghệ, sợ quảng cáo, sợ thất bại.</span>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-neutral-900">
                Tôi hiểu. Tôi cũng từng như bạn.
              </p>
              <p>
                Tôi từng đốt 3 năm, mò mẫm, mất tiền... chỉ vì không có hệ thống đúng.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#F9F9F9] rounded-[20px] border-l-4 border-[#191A23] space-y-2">
              <p className="font-black text-[#191A23] text-[18px] sm:text-[20px] uppercase">
                Và đây là sự thật khó nuốt:
              </p>
              <p className="font-medium text-neutral-900">
                👉 Mỗi tháng bạn chần chừ, là mỗi tháng bạn mất ít nhất vài chục triệu vào tay người khác – người đang dùng Affiliate đúng cách.
              </p>
            </div>

            <p>
              2 ngày trong “Affiliate- Tự Động” này, tôi cho bạn <strong>copy</strong> toàn bộ hệ thống đã giúp người tay trắng -&gt; 30 triệu/tháng.
            </p>

            <p className="font-black text-[22px] sm:text-[26px] text-black">
              Chỉ bằng{' '}
              <span className="bg-[#B9FF66] px-3 py-1 rounded-[8px] border border-[#191A23] shadow-[0px_2px_0px_#191A23]">
                COPY- DÁN
              </span>
            </p>
          </div>

          {/* Cột phải: Chỉ hiển thị hình ảnh Đồng hồ cát nguyên bản (raw image, không bo góc, không hiệu ứng viền) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src="/assets/aistudio/image_5cebdf88.png"
              alt="Đồng hồ cát đếm ngược"
              className="w-full max-w-[420px] h-auto object-contain"
            />
          </div>
        </div>

        {/* PHẦN 2: BÂY GIỜ – KHÔNG PHẢI LÚC ĐỢI NỮA! */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t-2 border-[#191A23]/15 text-center max-w-[920px] mx-auto">
          <h3 className="font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-tight text-[#191A23] tracking-tight uppercase">
            BÂY GIỜ – KHÔNG PHẢI LÚC ĐỢI NỮA!
          </h3>

          <div className="mt-8 space-y-6 text-left sm:text-center font-['Space_Grotesk'] text-[18px] sm:text-[21px] leading-[32px] sm:leading-[36px] text-neutral-800">
            <p className="font-bold text-[#191A23] text-[20px] sm:text-[24px]">
              Đây không phải một lớp học bình thường.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-8 font-bold text-red-600">
              <span className="flex items-center gap-2">
                ❌ Không phải lý thuyết chay.
              </span>
              <span className="flex items-center gap-2">
                ❌ Không phải “nghe cho vui”.
              </span>
            </div>

            <p className="font-medium max-w-[800px] mx-auto">
              👉 <strong className="font-black text-black">Đây là 2 ngày nặng đô:</strong> tôi sẽ cầm tay bạn, lột trần toàn bộ hệ thống Affiliate đã giúp người tay trắng kiếm thêm 30 triệu/tháng. Chỉ bằng chiếc điện thoại
            </p>

            <p className="font-bold text-neutral-700">
              🕒 Nếu bạn không vào lớp này – chưa chắc sẽ còn lớp gần nhất nữa.
            </p>
          </div>

          {/* Nút Call To Action nổi bật */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="px-8 sm:px-12 py-5 sm:py-6 bg-[#B9FF66] text-[#191A23] hover:bg-[#191A23] hover:text-[#B9FF66] font-['Space_Grotesk'] font-black text-[18px] sm:text-[24px] uppercase rounded-[20px] border-2 border-[#191A23] shadow-[0px_6px_0px_#191A23] hover:shadow-[0px_8px_0px_#191A23] hover:-translate-y-1 transition-all cursor-pointer text-center max-w-full"
            >
              🔥 Nhấn tham gia thử thách NGAY – trước khi hết sạch 7 chỗ ngồi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
