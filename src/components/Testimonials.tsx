import React from 'react';
import { SectionHeading } from './SectionHeading';

interface TestimonialsProps {
  onCtaClick?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onCtaClick }) => {
  return (
    <section id="testimonials" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề Section Title 5 */}
        <SectionHeading
          title="Tin nhắn từ Nam Anh"
          titleClassName="font-bold"
          description=""
        />

        {/* Khung chứa thư ngỏ chuẩn Figma Positivus */}
        <div className="bg-[#191A23] rounded-[45px] py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14 flex flex-col items-center positivus-shadow">
          <div className="w-full max-w-[880px] flex flex-col items-start">
            <div className="relative w-full bg-[#21241D] border-2 border-[#B9FF66] rounded-[36px] sm:rounded-[45px] p-6 sm:p-10 lg:p-12 shadow-2xl">
              
              {/* Header tác giả Nam Anh đưa lên trên đầu theo yêu cầu */}
              <div className="flex items-center gap-4 sm:gap-5 pb-6 mb-6 border-b border-white/15 w-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#B9FF66] shrink-0 bg-neutral-900 shadow-md">
                  <img
                    src="/assets/aistudio/namanh_portrait_nobg.png?v=20261022_final"
                    alt="Nam Anh"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-bold text-[20px] sm:text-[24px] leading-tight text-[#B9FF66]">
                    Nam Anh
                  </h4>
                  <p className="font-['Space_Grotesk'] font-normal text-[14px] sm:text-[16px] text-white/90 mt-1">
                    "Từ một sinh viên bận rộn, mù công nghệ đến kiếm được thêm hàng trăm triệu nhờ Affiliate"
                  </p>
                </div>
              </div>

              {/* Nội dung bức thư: Không dùng background xanh lá lợt, chỉ highlight và in đậm chữ */}
              <div className="space-y-4 font-['Space_Grotesk'] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] text-white">
                <p className="font-bold text-[18px] sm:text-[21px] text-[#B9FF66]">
                  🖤 Thân gửi bạn – người đang vật lộn để kiếm tiền và giữ tiền…
                </p>

                <div className="space-y-1 text-white/95">
                  <p className="font-medium text-[17px] sm:text-[19px]">Bạn giỏi.</p>
                  <p className="font-medium text-[17px] sm:text-[19px]">Bạn có tâm.</p>
                  <p className="font-bold text-[17px] sm:text-[19px] text-[#B9FF66]">
                    Nhưng vẫn chưa hài lòng với thu nhập....
                  </p>
                </div>

                <div className="space-y-1 text-white/90">
                  <p>Rõ ràng bạn không kém, không hề...</p>
                  <p className="italic text-white/70">(tôi biết chắc điều đó)</p>
                  <p className="font-medium text-white pt-1">
                    Chỉ là bạn đang mắc kẹt trong mô hình cũ, không tạo ra dòng tiền.
                  </p>
                </div>

                <div className="space-y-1 text-white/90 pt-1">
                  <p className="font-bold text-[#B9FF66]">2026 rồi…</p>
                  <p>A.I đang ăn sạch công việc từ đơn giản đến phức tạp.</p>
                  <p className="font-bold text-white">Làm thuê không cứu được bạn.</p>
                  <p>Kinh doanh kiểu cũ chỉ khiến bạn làm nhiều hơn mà tiền chẳng tăng.</p>
                </div>

                <p className="text-white/95">
                  Tôi từng chật vật 10 năm với đủ các ngành nghề mà vẫn không đủ duy trì cuộc sống ở mức bình thường … chỉ để nhận ra vấn đề không phải ở tôi – mà ở mô hình.
                </p>

                <div className="pt-2">
                  <p className="font-extrabold text-[19px] sm:text-[22px] text-[#B9FF66]">
                    Giải pháp? Affiliate-Tự Động.
                  </p>
                  <p className="font-bold text-white mt-1">
                    Một hệ thống đã dựng sẵn, bạn chỉ việc cầm điện thoại bấm, và 2 ngày sau có khách thật, tiền thật.
                  </p>
                </div>

                <p className="font-bold text-[18px] sm:text-[21px] text-[#B9FF66] pt-2">
                  Nếu bạn còn đọc đến đây, bạn vẫn còn cửa để đổi đời.
                </p>
              </div>

            </div>
          </div>

          {/* Thanh kêu gọi hành động phía dưới */}
          {onCtaClick && (
            <div className="mt-10 pt-6 border-t border-white/15 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/80 text-[14px] sm:text-[16px] text-center sm:text-left">
                ⚡ Đừng để mô hình cũ giới hạn bạn — Nhận vé tham gia thử thách 2 ngày miễn phí
              </p>
              <button
                onClick={onCtaClick}
                className="bg-[#B9FF66] text-[#191A23] px-6 sm:px-8 py-3.5 rounded-[14px] font-['Space_Grotesk'] font-bold text-[15px] sm:text-[16px] hover:bg-white transition-all cursor-pointer border border-[#B9FF66] whitespace-nowrap shadow-md hover:-translate-y-0.5"
              >
                Giữ Chỗ Cùng Nam Anh Ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
