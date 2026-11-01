import React, { useState, useEffect, useRef } from 'react';
import { SectionHeading } from './SectionHeading';

interface ProcessStep {
  number: string;
  title: string;
  content: React.ReactNode;
}

interface WorkingProcessProps {
  onCtaClick?: () => void;
}

export const WorkingProcess: React.FC<WorkingProcessProps> = ({ onCtaClick }) => {
  const [openSteps, setOpenSteps] = useState<Set<number>>(() => new Set([0]));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'QUÀ TẶNG #1',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ Thống Nội Dung Đăng Lên MXH Làm Sẵn 365 Ngày
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Mạng xã hội là mỏ vàng miễn phí cho bất kỳ ai biết cách khai thác....
          </p>

          <p className="font-medium text-neutral-800">
            Vấn đề? 99% bỏ cuộc vì không biết đăng gì mỗi ngày.
          </p>

          <p className="font-black text-black text-[19px] sm:text-[23px] lg:text-[24px] leading-snug">
            👉 Tôi đã làm sẵn cho bạn: 365 nội dung đỉnh cao cho 365 ngày.
          </p>

          <p className="font-medium text-neutral-800">
            Chỉ việc sao chép, và biến Facebook thành cỗ máy hút khách hàng không giới hạn.
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                10.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'QUÀ TẶNG #2',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ Thống Nội Dung Chia Sẻ giá trị làm sẵn 365 ngày
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Bạn không biết cách tạo ra giá trị trên mạng xã hội đồng nghĩa với việc bạn luôn phải chạy theo người khác thay vì hút....
          </p>

          <p className="font-medium text-neutral-900">
            Đó là lý do tôi đã làm sẵn 365 ngày nội dung chia sẻ giá trị, hút hàng tấn khách hàng cho bạn, Từ giờ không còn phải chèo kéo bất kỳ ai nữa, đưa bạn lên cấp độ chuyên gia, những người ngoài kia phải xin để được học bạn.
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                12.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'QUÀ TẶNG #3',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ Thống Xây Thương Hiệu Chuyên Gia
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Sự thật, không ai thích mua hàng hay làm việc với người nghiệp dư cả....
          </p>

          <p className="font-medium text-neutral-800">
            Thế nên định vị thương hiệu là việc phải làm và làm mỗi ngày nếu bạn muốn thu hút đám đông và kiếm nhiều tiền.
          </p>

          <p className="font-medium text-neutral-800">
            Chúng tôi đã giúp rất nhiều người trở nên cực kỳ nổi tiếng trong cộng đồng từ con số 0 giống như bạn,
          </p>

          <p className="font-medium text-neutral-800">
            Trong chương trình này tôi cũng sẽ tặng bạn hoàn toàn miễn phí - bí mật xây thương hiệu đỉnh cao này
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                12.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '04',
      title: 'QUÀ TẶNG #4',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ thống phát triển trọn đời của tôi
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            3 năm trước tôi bắt đầu ý thức tuyệt đối vào việc học tập phát triển bản thân và tham gia rất nhiều chương trình đào tạo lớn nhỏ ở Việt Nam...
          </p>

          <p className="font-medium text-neutral-800">
            Vì vậy tôi đã sắp xếp lại toàn bộ hệ thống triển khai, tài liệu, đội ngũ, mối quan hệ... và tôi hứa tặng toàn bộ cho bạn để bạn bắt đầu tạo ra kết quả nhanh nhất.
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                19.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '05',
      title: 'QUÀ TẶNG #5',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ Thống Xây Kênh 1.000.000 View Thần Tốc
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Không gì thu hút nhiều người online hơn cách sở hữu cho mình một kênh thương hiệu cá nhân triệu view...
          </p>

          <p className="font-medium text-neutral-800">
            Giống như, bạn được cấp bằng kinh doanh online chuyên nghiệp vậy, khách hàng biết bạn nhanh hơn, bạn dễ dàng thu hút được đám đông và biến công việc kinh doanh Affiliate trở nên dễ dàng hơn một nửa rồi đấy...
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                9.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '06',
      title: 'QUÀ TẶNG #6',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Hệ Thống Đào Tạo Tự Nhân Bản
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Khi bạn được nhận rất nhiều vũ khí bí mật từ tôi rồi, đến đây bạn đã trở thành siêu nhân kiếm tiền
          </p>

          <p className="font-medium text-neutral-800">
            Ok, việc tiếp theo... không gì quan trọng hơn đó là việc nhân bản. Có nghĩa bạn dạy lại cho người khác để họ làm thay bạn, và dạy lại cho nhiều nhiều hơn nữa... có nghĩa mô hình của bạn X100.
          </p>

          <p className="font-medium text-neutral-800">
            Để làm được điều đó, rào cản duy nhất đó là quy trình. CHúng tôi cung cấp quy trình miễn phí cho bạn. (không cần ôm mặt... và ồ lên như vậy đâu, đó là sự thật)
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                9.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '07',
      title: 'QUÀ TẶNG #7',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Bí Mật Hệ Thống Phát Triển Dòng Tiền Trọn Đời
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Có những nguồn thu nhập bạn chỉ có thể kiếm tiền một lần rồi tiếp tục đi tìm khách hàng mới trong sự khổ sở và chi phí liên tục tăng cao...
          </p>

          <p className="font-medium text-neutral-800">
            Đừng làm vậy, tôi tiết lộ cho bạn một dòng tiền tuyệt vời, không ngừng tăng mà chúng tôi gọi là dòng tiền trọn đời. Không phải ai cũng biết, và tôi sẽ tiết lộ cho bạn bên trong chương trình để bạn có thể kiếm thêm tiền mà không cần mất thêm công sức.
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                19.868.000 VNĐ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '08',
      title: 'QUÀ TẶNG #8',
      content: (
        <div className="space-y-6 sm:space-y-7 font-['Space_Grotesk'] text-[18px] sm:text-[21px] lg:text-[22px] leading-[32px] sm:leading-[38px] text-[#191A23] py-2 sm:py-4">
          <div className="pb-4 sm:pb-5 border-b-2 border-[#191A23]/20">
            <h4 className="font-black text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-black">
              Nhóm Kín Bí Mật Dòng Tiền
            </h4>
          </div>

          <p className="font-medium text-neutral-800">
            Nơi tôi và những Cố Vấn hàng đầu thường xuyên thảo luận về những chiến lược gia tăng thu nhập hiệu quả thời nay, không ai được phép có mặt ngay cả khi trả tiền. Bởi chúng tôi chỉ giới hạn và cũng còn tùy vào sự lựa chọn cá nhân...
          </p>

          <p className="font-medium text-neutral-800">
            Nhưng... lần này là ngoại lệ, tôi sẽ đặc cách cho bạn có mặt nhưng bạn phải hứa là nghiêm túc học tập.
          </p>

          {/* Ô vuông highlight thông điệp nhận quà */}
          <div className="p-4 sm:p-5 bg-white/60 rounded-[18px] border-2 border-[#191A23]/20 shadow-sm">
            <p className="font-semibold text-neutral-900">
              Bạn nhận được món quà đắt tiền này <strong className="font-black text-black underline decoration-[#191A23] decoration-2">MIỄN PHÍ</strong> khi tham gia thử thách 2 ngày Affiliate cùng chúng tôi. (tiết lộ chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất) Nhanh tay mới kịp.
            </p>
          </div>

          {/* Trị giá ở dưới cùng của card, mở rộng khoảng cách dài và thoáng */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 sm:pb-12 border-t-2 border-[#191A23]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <span className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[30px] uppercase tracking-wider text-[#191A23]">
              Trị giá:
            </span>
            <div className="relative inline-flex items-center justify-center py-6 sm:py-8 pl-8 pr-16 sm:pl-12 sm:pr-24 self-start sm:self-auto my-3 sm:my-4">
              <span className="relative z-10 font-['Space_Grotesk'] font-black text-[28px] sm:text-[40px] lg:text-[46px] leading-none text-black tracking-tight select-none">
                VÔ GIÁ
              </span>
              {/* Vòng khoanh tròn vẽ tay bao trọn số tiền cân đối, thoáng đãng không bị che khuất */}
              <img
                src="/assets/aistudio/circle_marker_perfect.svg"
                alt="Khoanh tròn trị giá"
                className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-12 sm:-inset-y-6 w-[calc(100%+64px)] sm:w-[calc(100%+96px)] h-[calc(100%+32px)] sm:h-[calc(100%+48px)] object-fill pointer-events-none z-0 select-none"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTriggerY = window.innerHeight * 0.72;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Khi card chạm tới vùng nhìn, tự động mở và giữ nguyên trạng thái mở
        if (rect.top <= scrollTriggerY && rect.bottom >= 40) {
          setOpenSteps((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="process" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="QUÀ TẶNG KHỔNG LỒ"
          titleClassName="font-black uppercase tracking-tight text-[24px] sm:text-[34px] md:text-[40px]"
          description="CHỈ 7 SUẤT CHO 7 NGƯỜI CÙNG TÔI PHÁ ĐẢO DÒNG THU NHẬP 30 TRIỆU TỪ AFFILIATE- TỰ ĐỘNG"
          descClassName="font-black text-[16px] sm:text-[19px] lg:text-[22px] leading-snug uppercase text-black"
          maxWidthDesc="max-w-[560px]"
        />

        {/* Accordion Steps List */}
        <div className="flex flex-col gap-6 sm:gap-7">
          {steps.map((step, idx) => {
            const isOpen = openSteps.has(idx);
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{ backgroundColor: isOpen ? '#B9FF66' : '#F3F3F3' }}
                className="border border-[#191A23] rounded-[45px] p-6 sm:p-10 lg:p-12 positivus-shadow transition-colors duration-500 ease-in-out"
              >
                {/* Header row: Number + Subtitle + Plus/Minus Toggle */}
                <div
                  onClick={() => toggleStep(idx)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-['Space_Grotesk'] font-black text-[38px] sm:text-[52px] lg:text-[62px] leading-none text-black w-14 sm:w-22 shrink-0">
                      {step.number}
                    </span>
                    <h3 className="font-['Space_Grotesk'] font-black text-[22px] sm:text-[30px] lg:text-[36px] leading-[32px] sm:leading-[42px] lg:leading-[46px] text-black tracking-tight uppercase">
                      {step.title}
                    </h3>
                  </div>

                  {/* Circle toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(idx);
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F3F3F3] border border-[#191A23] flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
                    aria-label={isOpen ? 'Collapse step' : 'Expand step'}
                  >
                    {isOpen ? (
                      <svg width="20" height="4" viewBox="0 0 20 4" fill="none">
                        <line x1="0" y1="2" x2="20" y2="2" stroke="#191A23" strokeWidth="3.5" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <line x1="10" y1="2" x2="10" y2="18" stroke="#191A23" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="2" y1="10" x2="18" y2="10" stroke="#191A23" strokeWidth="3.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Content Area with smooth grid accordion animation */}
                <div
                  className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-[#191A23]'
                      : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0'
                  }`}
                >
                  <div className="overflow-hidden font-['Space_Grotesk'] font-normal text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] text-black">
                    {step.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Thông điệp chốt 7 chỗ ngồi miễn phí - Không cần card gì hết */}
        <div className="mt-14 sm:mt-20 text-center max-w-[960px] mx-auto px-4">
          <h3 className="font-['Space_Grotesk'] font-black text-[24px] sm:text-[34px] lg:text-[40px] leading-tight text-[#191A23] uppercase tracking-tight">
            THỬ THÁCH NÀY DUY NHẤT 7 CHỖ NGỒI MIỄN PHÍ
          </h3>
          <p className="mt-3 font-['Space_Grotesk'] font-black text-[20px] sm:text-[28px] lg:text-[32px] leading-tight text-[#191A23] uppercase">
            VÀ CÓ ĐÚNG 7 SUẤT QUÀ TRỊ GIÁ <span className="bg-[#B9FF66] px-3 py-1 rounded-md border border-[#191A23] shadow-[0px_2px_0px_#191A23]">125.970.000 VNĐ</span>
          </p>
          <p className="mt-5 font-['Space_Grotesk'] font-medium text-[17px] sm:text-[20px] lg:text-[22px] leading-relaxed text-neutral-800 max-w-[820px] mx-auto">
            Cách nhanh nhất để xây dựng hệ thống kiếm tiền không ngừng tăng (trong thời đại A.I cướp việc) đó là bấm nút tham gia thử thách 2 ngày bên dưới
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-[#191A23] text-white hover:bg-[#B9FF66] hover:text-[#191A23] font-['Space_Grotesk'] font-black text-[18px] sm:text-[22px] uppercase rounded-[16px] border-2 border-[#191A23] shadow-[0px_4px_0px_#191A23] hover:shadow-[0px_6px_0px_#191A23] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Tham gia thử thách 2 ngày ngay
            </button>
          </div>

          {/* Đường kẻ section line giữa giữa, thin lợt */}
          <div className="w-40 sm:w-64 h-[1px] bg-[#191A23]/25 mx-auto mt-14 sm:mt-18" />
        </div>
      </div>
    </section>
  );
};
