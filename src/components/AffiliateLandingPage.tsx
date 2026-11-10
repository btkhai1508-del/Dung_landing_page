import React, { useEffect, useState } from 'react';
import { Menu, X, Sprout, ArrowRight } from 'lucide-react';
import { RegisterModal } from './RegisterModal';
import { SHEET_TABS } from '../lib/submitToSheet';

const ASSETS = {
  heroBundle: '/assets/aistudio/1_c1ec481e.webp',
  eventStage: '/assets/aistudio/2_4147d45c.webp',
  workshopGroup: '/assets/aistudio/3_377158da.webp',
  trainerMountain: '/assets/aistudio/4_662212b0.webp',
  meeting: '/assets/aistudio/5_967292ca.webp',
  whiteboard: '/assets/aistudio/6_d0e8379e.webp',
  thinking: '/assets/aistudio/7_9074c0a5.webp',
  chats: [
    '/assets/aistudio/8_28441fde.webp',
    '/assets/aistudio/9_c8f175bb.webp',
    '/assets/aistudio/10_c5bfc833.webp',
    '/assets/aistudio/11_c8f175bb.webp',
    '/assets/aistudio/12_28e98443.webp',
    '/assets/aistudio/13_fc197636.webp',
  ],
  modules: [
    '/assets/aistudio/14_afdc2e66.webp',
    '/assets/aistudio/15_a9a6376f.webp',
    '/assets/aistudio/16_23086051.webp',
    '/assets/aistudio/17_15ad54cf.webp',
    '/assets/aistudio/18_8e35b4cd.webp',
  ],
  gifts: [
    '/assets/aistudio/19_aa8746dd.webp',
    '/assets/aistudio/20_d2792ef7.webp',
    '/assets/aistudio/21_8a3820c1.webp',
    '/assets/aistudio/22_215fee38.webp',
    '/assets/aistudio/23_8e35b4cd.webp',
    '/assets/aistudio/24_1f76319f.webp',
    '/assets/aistudio/25_4147d45c.webp',
    '/assets/aistudio/26_1d1d3523.webp',
  ],
  before: '/assets/aistudio/27_99db4e4f.webp',
  after: '/assets/aistudio/28_c74f3caf.webp',
  trainer: '/assets/aistudio/29_662212b0.webp',
  hourglass: '/assets/aistudio/30_2f92e0a5.jpg',
};

// Chuyển trang trong SPA (App lắng nghe sự kiện popstate để đổi route)
export const goTo = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
};

export const AffiliateLandingPage: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Thử thách 2 ngày Affiliate – dòng tiền 100 triệu/tháng | Dũng Gieo Hạt';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Tự động bật pop up đăng ký khi người dùng cuộn xuống dưới cùng trang
  useEffect(() => {
    const handleScroll = () => {
      if (hasScrolledToBottom) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;
      // Khi cuộn gần tới cuối trang (cách đáy <= 160px hoặc đạt trên 92% trang)
      if (scrollTop + clientHeight >= scrollHeight - 160) {
        setIsRegisterOpen(true);
        setHasScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledToBottom]);

  const navItems = [
    { id: 'aff-01', label: 'Dành cho ai' },
    { id: 'aff-02', label: 'Thư ngỏ' },
    { id: 'aff-03', label: 'Vì sao tham gia' },
    { id: 'aff-04', label: 'Kết quả học viên' },
    { id: 'aff-05', label: 'Lộ trình 2 ngày' },
    { id: 'aff-06', label: 'Quà tặng' },
    { id: 'aff-08', label: 'Người huấn luyện' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Nút kêu gọi hành động dùng chung cho toàn trang
  const CtaButton: React.FC<{ label?: string }> = ({ label = 'Tham gia thử thách 2 ngày Affiliate' }) => (
    <div className="inline-flex flex-col items-center gap-2">
      <button
        onClick={() => setIsRegisterOpen(true)}
        className="px-8 py-3.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-semibold text-base rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer font-be-vietnam"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </button>
      <span className="text-xs text-gray-500">Nhấn vào đây để được giữ chỗ ngay bây giờ</span>
    </div>
  );

  const SectionLabel: React.FC<{ number: string; text: string }> = ({ number, text }) => (
    <div className="flex items-baseline gap-3 mb-2">
      <span className="type-figure text-4xl text-[#FA5B13]">{number}</span>
      <span className="type-label text-gray-500">{text}</span>
    </div>
  );

  // Ghi chú kiểu viết tay bên lề thay cho các ô nền màu
  const HandNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="font-dancing-script font-bold text-xl sm:text-2xl text-[#C2410C] leading-snug">{children}</p>
  );

  const NewbieNote = () => (
    <HandNote>
      → Dù bạn là người mới toe, cũng sẽ tự tay làm được ngay tại chỗ – chỉ cần có điện thoại và biết bấm vào Zalo.
    </HandNote>
  );

  // Danh sách đánh số, ngăn cách bằng đường kẻ mảnh
  const NumberedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ol className="border-t border-gray-200">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-5 py-5 border-b border-gray-200">
          <span className="type-figure text-2xl text-[#FA5B13] w-8 shrink-0">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="text-base text-gray-700 leading-relaxed">{item}</div>
        </li>
      ))}
    </ol>
  );

  const painPoints = [
    <>
      Bạn nhìn AI càn quét, thấy rõ công việc làm thuê <strong>không thể đưa bạn lên 100 triệu/tháng</strong>.
    </>,
    <>
      Bạn đã thử bán hàng online, đổ tiền quảng cáo… nhưng <strong>khách không đến, tiền không về</strong>.
    </>,
    <>
      Bạn mệt mỏi với mô hình công việc cũ: <strong>càng làm càng kẹt, thu nhập không bao giờ vượt ngưỡng</strong>.
    </>,
    <>
      Bạn muốn một lối đi khác – thực tế, dễ làm – nơi chỉ cần <strong>biết bấm điện thoại</strong>, bạn có ngay hệ
      thống ra khách, ra tiền mặt…
    </>,
  ];

  const reasons = [
    <>
      <strong className="text-gray-900">2 ngày = 1 hệ thống chạy thật.</strong> Bạn không ngồi nghe lý thuyết. Bạn copy
      – dán ngay tại lớp, có phễu, có web, có nội dung tất cả làm sẵn cho bạn.
    </>,
    <>
      <strong className="text-gray-900">Quên công nghệ đi,</strong> tất cả chỉ cần bạn biết bấm điện thoại là có thể
      tham gia, thế thôi.
    </>,
    <>
      <strong className="text-gray-900">Thực chiến 100%.</strong> Tôi cầm tay chỉ việc, để bạn tự tay bật hệ thống.
      Không “nghe cho vui”, mà làm ra kết quả ngay.
    </>,
    <>
      <strong className="text-gray-900">Đúng trend 2026.</strong> Khi A.I đang càn quét, làm thuê không cứu bạn được
      nữa. Người có mô hình thông minh sẽ thắng.
    </>,
    <>
      <strong className="text-gray-900">Quà trị giá 125.970.000đ</strong> – toàn bộ hệ thống xây sẵn, bạn nhận miễn
      phí khi tham gia thử thách này.
    </>,
  ];

  const curriculum = [
    {
      day: 'Ngày 1',
      modules: [
        {
          title: 'Bí mật Affiliate: cách tạo dòng tiền 100 triệu với rủi ro bằng 0',
          img: ASSETS.modules[0],
          body: (
            <>
              <p>
                Tiết lộ Bí Mật <strong>Affiliate – tự động; mô hình kiếm tiền không thể ngăn cản từ 2026–2035</strong>,
                và bài học xương máu bạn có thể tránh khỏi những mô hình lừa đảo ngoài kia.
              </p>
              <p>
                Cách triển khai mô hình Affiliate hiệu quả tuyệt đối, ít người Việt Nam biết,{' '}
                <strong>mang về tiền mặt đã được kiểm chứng</strong>, bạn chỉ việc <strong>sao chép</strong>.
              </p>
            </>
          ),
        },
        {
          title: 'Bí mật X10 thu nhập từ đòn bẩy vô hạn',
          img: ASSETS.modules[1],
          body: (
            <>
              <p>Cách nhân X10 thu nhập trong thời gian ngắn cực kỳ hiệu quả không rào bản…</p>
              <p>
                Bạn sẽ nhận được toàn bộ 5 đòn bẩy mà chúng tôi đã áp dụng, biết chính xác tiền đến từ đâu và{' '}
                <strong>bí mật kiếm được tiền nhiều hơn luôn làm ít hơn</strong>.
              </p>
            </>
          ),
        },
        {
          title: 'Hậu trường mô hình kiếm ra tiền mặt',
          img: ASSETS.modules[2],
          body: (
            <>
              <p>
                Tôi sẽ dắt tay bạn ra phía sân sau hậu trường, cho bạn chứng kiến toàn cảnh cách tôi áp dụng toàn bộ
                chiến lược Affiliate để tạo ra tiền mặt…
              </p>
              <p>
                Bạn biết chính xác tôi sử dụng công cụ gì, hệ thống nào và nhân bản toàn bộ ra sao để tạo ra tiền. Tôi
                cũng sẽ tặng bạn toàn bộ công cụ, tài liệu, kho báu của tôi ở cuối…
              </p>
            </>
          ),
        },
      ],
    },
    {
      day: 'Ngày 2',
      modules: [
        {
          title: 'Bí mật xây dựng dòng tiền trong 5 phút bấm điện thoại',
          img: ASSETS.modules[3],
          body: (
            <>
              <p>
                <strong>Người nhanh chỉ 3 phút có thể làm được…</strong> là sự thật, bởi tất cả hệ thống chạy bên trong
                chúng tôi đã xây sẵn cho bạn, đảm bảo ra tiền khi áp dụng.
              </p>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-[#FA5B13]">
                <li>
                  Hệ thống <strong>xây sẵn thương hiệu cá nhân</strong> – chỉ cần bấm điện thoại
                </li>
                <li>Hệ thống xây sẵn cách thu hút khách hàng tiềm năng – chỉ cần bấm điện thoại</li>
                <li>
                  Hệ thống <strong>chuyển đổi khách hàng tiềm năng ra tiền mặt</strong>
                </li>
                <li>
                  Nhân bản toàn bộ <strong>quy trình tự động</strong> của chúng tôi – chỉ cần chiếc điện thoại
                </li>
              </ul>
            </>
          ),
        },
        {
          title: 'Bí mật X100 Affiliate Tự Động – chi phí 0đ',
          img: ASSETS.modules[4],
          body: (
            <>
              <p>Bạn hoàn toàn có thể gia tăng thu nhập, mở rộng quy mô không tưởng chỉ với 0Đ…</p>
              <p>
                Có nghĩa bạn không mất một đồng nào, mà vẫn có thể tạo ra nhanh chóng 100 mô hình đẻ ra tiền trong lúc
                bạn ngủ…
              </p>
              <p>
                Giống như <strong>bạn có 100 công ty hay 100 bất động sản cho thuê mang về tiền liên tục</strong> trong
                khi bạn không phải bỏ ra 1 đồng nào cả. <em>Điên rồ… hãy có mặt để lấy.</em>
              </p>
            </>
          ),
        },
      ],
    },
  ];

  const gifts = [
    {
      title: 'Hệ thống nội dung đăng mạng xã hội làm sẵn 365 ngày',
      value: '10.868.000đ',
      img: ASSETS.gifts[0],
      body: (
        <>
          <p>Mạng xã hội là mỏ vàng miễn phí cho bất kỳ ai biết cách khai thác…</p>
          <p>
            Vấn đề? 99% bỏ cuộc vì <strong>không biết đăng gì mỗi ngày</strong>.
          </p>
          <p>
            Tôi đã làm sẵn cho bạn: <strong>365 nội dung đỉnh cao</strong> cho 365 ngày. Chỉ việc{' '}
            <strong>sao chép</strong>, và biến Facebook thành cỗ máy hút khách hàng không giới hạn.
          </p>
        </>
      ),
    },
    {
      title: 'Hệ thống nội dung chia sẻ giá trị làm sẵn 365 ngày',
      value: '12.868.000đ',
      img: ASSETS.gifts[1],
      body: (
        <>
          <p>
            Bạn không biết cách tạo ra giá trị trên mạng xã hội đồng nghĩa với việc{' '}
            <strong>bạn luôn phải chạy theo người khác thay vì hút…</strong>
          </p>
          <p>
            Đó là lý do tôi đã làm sẵn 365 ngày nội dung chia sẻ giá trị, hút hàng tấn khách hàng cho bạn.{' '}
            <strong>Từ giờ không còn phải chèo kéo bất kỳ ai nữa, đưa bạn lên cấp độ chuyên gia</strong>, những người
            ngoài kia phải xin để được học bạn.
          </p>
        </>
      ),
    },
    {
      title: 'Hệ thống xây thương hiệu chuyên gia',
      value: '12.868.000đ',
      img: ASSETS.gifts[2],
      body: (
        <>
          <p>Sự thật, không ai thích mua hàng hay làm việc với người nghiệp dư cả…</p>
          <p>
            Thế nên định vị thương hiệu là{' '}
            <strong>việc phải làm và làm mỗi ngày nếu bạn muốn thu hút đám đông và kiếm nhiều tiền.</strong>
          </p>
          <p>
            Chúng tôi đã giúp rất nhiều người trở nên cực kỳ nổi tiếng trong cộng đồng từ con số 0 giống như bạn. Trong
            chương trình này tôi cũng sẽ <strong>tặng bạn hoàn toàn miễn phí</strong> bí mật xây thương hiệu đỉnh cao
            này.
          </p>
        </>
      ),
    },
    {
      title: 'Hệ thống phát triển trọn đời của tôi',
      value: '19.868.000đ',
      img: ASSETS.gifts[3],
      body: (
        <>
          <p>
            3 năm trước tôi bắt đầu ý thức tuyệt đối vào việc học tập phát triển bản thân và tham gia rất nhiều chương
            trình đào tạo lớn nhỏ ở Việt Nam…
          </p>
          <p>
            Vì vậy tôi đã sắp xếp lại toàn bộ hệ thống triển khai, tài liệu, đội ngũ, mối quan hệ… và tôi hứa tặng toàn
            bộ cho bạn để bạn bắt đầu tạo ra kết quả nhanh nhất.
          </p>
        </>
      ),
    },
    {
      title: 'Hệ thống xây kênh 1.000.000 view thần tốc',
      value: '9.868.000đ',
      img: ASSETS.gifts[4],
      body: (
        <>
          <p>Không gì thu hút nhiều người online hơn cách sở hữu cho mình một kênh thương hiệu cá nhân triệu view…</p>
          <p>
            Giống như bạn được cấp bằng kinh doanh online chuyên nghiệp vậy: khách hàng biết bạn nhanh hơn, bạn dễ dàng
            thu hút được đám đông và biến công việc kinh doanh Affiliate trở nên dễ dàng hơn một nửa rồi đấy…
          </p>
        </>
      ),
    },
    {
      title: 'Hệ thống đào tạo tự nhân bản',
      value: '9.868.000đ',
      img: ASSETS.gifts[5],
      body: (
        <>
          <p>Khi bạn được nhận rất nhiều vũ khí bí mật từ tôi rồi, đến đây bạn đã trở thành siêu nhân kiếm tiền.</p>
          <p>
            Việc tiếp theo… không gì quan trọng hơn đó là việc nhân bản.{' '}
            <strong>Có nghĩa bạn dạy lại cho người khác để họ làm thay bạn</strong>, và dạy lại cho nhiều nhiều hơn
            nữa… có nghĩa mô hình của bạn X100.
          </p>
          <p>
            Để làm được điều đó, rào cản duy nhất là quy trình. Chúng tôi cung cấp quy trình miễn phí cho bạn.{' '}
            <em>(Không cần ôm mặt… và ồ lên như vậy đâu, đó là sự thật)</em>
          </p>
        </>
      ),
    },
    {
      title: 'Bí mật hệ thống phát triển dòng tiền trọn đời',
      value: '19.868.000đ',
      img: ASSETS.gifts[6],
      body: (
        <>
          <p>
            Có những nguồn thu nhập bạn chỉ có thể kiếm tiền một lần rồi tiếp tục đi tìm khách hàng mới trong sự khổ sở
            và chi phí liên tục tăng cao…
          </p>
          <p>
            Đừng làm vậy. Tôi tiết lộ cho bạn một dòng tiền tuyệt vời, không ngừng tăng mà chúng tôi gọi là{' '}
            <strong>dòng tiền trọn đời</strong>. Không phải ai cũng biết, và tôi sẽ tiết lộ cho bạn bên trong chương
            trình để bạn có thể kiếm thêm tiền mà không cần mất thêm công sức.
          </p>
        </>
      ),
    },
    {
      title: 'Nhóm kín “Bí mật dòng tiền”',
      value: 'Vô giá',
      img: ASSETS.gifts[7],
      body: (
        <>
          <p>
            Nơi tôi và những Cố Vấn hàng đầu thường xuyên thảo luận về những chiến lược gia tăng thu nhập hiệu quả thời
            nay. Không ai được phép có mặt ngay cả khi trả tiền, bởi chúng tôi chỉ giới hạn và còn tùy vào sự lựa chọn
            cá nhân…
          </p>
          <p>
            Nhưng… lần này là ngoại lệ, tôi sẽ đặc cách cho bạn có mặt nhưng bạn phải hứa là nghiêm túc học tập.
          </p>
        </>
      ),
    },
  ];

  const before = [
    'Từng nghĩ kiếm tiền Affiliate – online chỉ dành cho người giỏi công nghệ',
    'Đứng nhìn người khác kiếm khách, kiếm tiền… mà không dám thử vì sợ thất bại.',
    'Mô hình kinh doanh kiểu cũ – không gia tăng thu nhập, không nhân tiền lên được, mặc dù nỗ lực hết mình…',
    'Không biết sử dụng công cụ đúng, không có phễu hay hệ thống tự động… khiến mọi thứ cồng kềnh, nặng nề…',
    'Luôn không hài lòng với nguồn thu nhập, khó bứt phá và bế tắc',
  ];

  const after = [
    'Ngay tại lớp, bạn chỉ cần copy – dán, ra khách thật dù trước đó chưa từng biết công nghệ.',
    'Không lý thuyết, không màu mè… chỉ còn “wow” khi thấy dòng tiền chảy về tài khoản thật.',
    'Có phễu, có web, có nội dung chạy sẵn – khách phải thốt lên: “Bạn lấy hệ thống này ở đâu vậy?”',
    'Biết rõ công cụ nào cần dùng, bước nào quan trọng, cách chạy quảng cáo 0đ – không còn mò mẫm…',
    'Sở hữu một mô hình không ngừng tăng tiền chỉ cần copy – dán',
  ];

  const trainerAchievements = [
    'Thành viên ưu tú hoàn thành xuất sắc trong thử thách thu hút 10.000 khách hàng tiềm năng hoàn toàn tự động từ con số 0 sau 28 ngày của Cộng đồng X10 – đơn vị có tốc độ tăng trưởng online lớn nhất Việt Nam ở thời điểm hiện tại.',
    'Người có khả năng ra lượng khách tiềm năng hàng đông nhất trong vòng 14 ngày với gần 10.000 người, mang về dòng tiền 8 con số mỗi tháng mà không tốn một đồng chi phí quảng cáo.',
    'Người có giáo trình đào tạo về online affiliate duy nhất được áp dụng thành công dành cho người không biết về công nghệ.',
    'Diễn giả khách mời, nhà đào tạo của nhiều chương trình về đưa online và làm lợi thế cạnh tranh khác biệt.',
  ];

  return (
    <div className="min-h-screen bg-white text-[#191A23] font-be-vietnam antialiased flex flex-col relative">
      {/* THANH THÔNG BÁO */}
      <div className="bg-white border-b border-gray-200 text-center text-xs sm:text-sm text-gray-700 px-4 py-2 font-be-vietnam">
        Thử thách trực tiếp! <strong className="text-[#FA5B13]">2 ngày Affiliate 100 triệu/tháng</strong> chỉ bằng
        chiếc điện thoại
      </div>

      {/* TOP BAR NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 font-be-vietnam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left cursor-pointer shrink-0"
          >
            <Sprout className="w-6 h-6 text-[#FA5B13] stroke-[2.3]" />
            <span className="type-brand text-2xl sm:text-[1.75rem] text-gray-950">
              Dũng Gieo Hạt
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="py-2 text-sm font-medium text-gray-600 hover:text-[#FA5B13] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-4 sm:px-5 py-2 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Giữ chỗ<span className="hidden sm:inline"> miễn phí</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-700 hover:text-black cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white px-4 py-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full py-3 text-left text-sm font-medium text-gray-800 border-b border-gray-100 last:border-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-x-hidden font-be-vietnam">
        {/* HERO SECTION */}
        <section className="px-6 sm:px-12 pt-14 sm:pt-20 pb-16 sm:pb-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-sm sm:text-base font-semibold text-[#FA5B13]">
              Bí mật kiếm tiền của một nhân viên văn phòng bận rộn, mù công nghệ
            </p>

            <h1 className="type-display text-[2rem] sm:text-5xl lg:text-[3.5rem] text-gray-950 max-w-[22ch] mx-auto [text-wrap:balance]">
              Thử thách 2 ngày – dòng tiền 100 triệu/tháng từ Affiliate,{' '}
              <span className="text-[#FA5B13]">chỉ cần biết bấm điện thoại</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Không học lý thuyết. 2 ngày <strong className="text-gray-900">đủ để bật mô hình Affiliate</strong> và tạo
              dòng tiền 100 triệu/tháng. Không cần giỏi. Không cần bằng cấp. Chỉ cần điện thoại bạn có wifi.
            </p>

            <div className="overflow-hidden rounded-2xl border border-gray-200/60 shadow-lg bg-gray-50/50 max-w-3xl mx-auto p-1 sm:p-2">
              <img
                src={ASSETS.heroBundle}
                alt="Bộ quà tặng Affiliate Tự Động"
                className="w-full h-auto object-contain img-crisp rounded-xl block"
              />
            </div>

            <div className="max-w-2xl mx-auto pt-2 space-y-4">
              <p className="text-lg sm:text-xl text-gray-900 leading-snug">
                Tham gia thử thách ngay bây giờ – nhận quà tặng <strong>125.970.000đ</strong> hoàn toàn{' '}
                <strong className="text-[#FA5B13]">miễn phí</strong>.
              </p>
              <HandNote>Chúng tôi chỉ đủ chỗ duy nhất cho 7 người.</HandNote>
              <CtaButton />
            </div>
          </div>
        </section>

        {/* SECTION 01: DÀNH CHO AI */}
        <section id="aff-01" className="px-6 sm:px-12 py-16 sm:py-24 border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto space-y-14">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <p className="text-gray-500 italic">
                “Trong 2 ngày, tôi sẽ chỉ cho bạn cách kiếm hàng 100 triệu/tháng chỉ bằng…”
              </p>
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance] mx-auto">
                …Chỉ cần bạn biết bấm điện thoại và có kết nối mạng wifi
              </h2>
              <p className="text-base sm:text-lg text-gray-700">
                Bí mật giúp tạo dòng tiền không ngừng tăng theo thời gian – và sau đó tặng bạn{' '}
                <span className="underline decoration-[#FA5B13] decoration-2 underline-offset-4">
                  bộ quà tặng trị giá 125.970.000đ
                </span>{' '}
                – hoàn toàn thật, độc quyền, và chỉ có 7 suất duy nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <SectionLabel number="01" text="Dành cho bạn, nếu…" />
                <h3 className="type-h3 text-2xl sm:text-[1.75rem] text-gray-900 [text-wrap:balance] mb-6">
                  Thử thách 2 ngày Affiliate – hack dòng tiền 100 triệu
                </h3>
                <NumberedList items={painPoints} />
              </div>
              <div className="lg:col-span-5 space-y-5">
                <div className="overflow-hidden rounded-xl border border-gray-200/80 shadow-sm bg-gray-50">
                  <img
                    src={ASSETS.eventStage}
                    alt="Trung Dũng chia sẻ trên sân khấu hội thảo"
                    className="w-full aspect-video object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-200/80 shadow-sm bg-gray-50">
                  <img
                    src={ASSETS.workshopGroup}
                    alt="Học viên thực hành cùng Trung Dũng"
                    className="w-full aspect-4/3 object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
              <p className="type-statement text-2xl sm:text-3xl text-gray-900 [text-wrap:balance]">
                Nếu bạn thấy mình trong bất kỳ dòng nào ở trên… thì thử thách 2 ngày này sinh ra chính xác cho bạn.
              </p>
              <p className="text-gray-600">
                Và bạn sẽ tự hỏi: <em>“Tại sao đến giờ này mình mới biết đến Affiliate?”</em>
              </p>
              <p className="text-gray-600">
                Hãy bấm nút bên dưới để giành 1 trong 7 suất cuối cùng – trước khi chương trình này đóng lại.
              </p>
              <CtaButton />
            </div>
          </div>
        </section>

        {/* SECTION 02: THƯ NGỎ */}
        <section id="aff-02" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-xs mx-auto">
                  <img
                    src={ASSETS.trainerMountain}
                    alt="Trung Dũng"
                    className="w-full aspect-4/5 object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Tin nhắn từ <span className="type-h3 text-xl text-gray-900">Trung Dũng</span>
                </p>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <SectionLabel number="02" text="Thư ngỏ" />
                <h2 className="type-h3 text-2xl sm:text-[1.75rem] text-gray-900 [text-wrap:balance]">
                  Thân gửi bạn – người đang vật lộn để kiếm tiền và giữ tiền…
                </h2>
                <blockquote className="border-l-2 border-[#FA5B13] pl-5 text-lg text-gray-800 italic leading-relaxed">
                  “Một nhân viên văn phòng bận rộn mù công nghệ… đến xây được hệ thống thu nhập thụ động trăm triệu hàng
                  tháng từ Affiliate.”
                </blockquote>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>Bạn giỏi. Bạn có tâm. Nhưng vẫn chưa hài lòng với thu nhập…</p>
                  <p>
                    Rõ ràng bạn không kém, không hề… (tôi biết chắc điều đó). Chỉ là bạn đang mắc kẹt trong{' '}
                    <strong>mô hình cũ, không tạo ra dòng tiền.</strong>
                  </p>
                  <p>
                    2026 rồi… <strong>A.I đang ăn sạch công việc</strong> từ đơn giản đến phức tạp. Làm thuê không cứu
                    được bạn. Kinh doanh kiểu cũ chỉ khiến bạn <strong>làm nhiều hơn mà tiền chẳng tăng.</strong>
                  </p>
                  <p>
                    Tôi phải nằm liệt giường từ công việc cũ, vỡ nợ thêm 3 lần vì khởi nghiệp, mất hết lòng tin từ gia
                    đình… chỉ để nhận ra vấn đề <strong>không phải ở tôi – mà ở mô hình</strong>.
                  </p>
                  <p>
                    Giải pháp? <strong>Affiliate – Tự Động.</strong> Một hệ thống đã dựng sẵn, bạn chỉ việc cầm điện
                    thoại bấm, và 2 ngày sau có khách thật, tiền thật.
                  </p>
                  <p className="font-semibold text-gray-900">Nếu bạn còn đọc đến đây, bạn vẫn còn cửa để đổi đời.</p>
                  <p className="type-statement text-2xl text-gray-900">— Trung Dũng</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="type-h3 text-2xl sm:text-[1.75rem] text-gray-900 [text-wrap:balance]">
                  Một mô hình Affiliate mới cho người không cần biết công nghệ
                </h2>
                <p className="text-base sm:text-lg text-gray-900 leading-relaxed">
                  Chỉ trong 2 ngày, bạn làm được ngay tại lớp: có phễu, có website, có nội dung chạy sẵn… → hệ thống ra
                  khách thật, tiền thật ngay lập tức.
                </p>
                <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                  <p>
                    Tôi không lên bục để thuyết giảng.{' '}
                    <strong>Tôi ngồi cạnh bạn – mở điện thoại, dựng hệ thống, để bạn tự tay làm được.</strong>
                  </p>
                  <p>Chương trình 2 ngày này không phải một khóa học vô thưởng vô phạt.</p>
                  <p>
                    Đây là cuộc chuyển đổi thật sự – dành cho bạn, người muốn thoát khỏi mô hình cũ, và sở hữu ngay{' '}
                    <em>“vũ khí kiếm thêm 100 triệu/tháng”</em> <strong>mà không cần biết công nghệ.</strong>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-md mx-auto">
                  <img
                    src={ASSETS.meeting}
                    alt="Trung Dũng cầm tay chỉ việc cho học viên"
                    className="w-full aspect-4/5 object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: VÌ SAO KHÔNG THỂ BỎ LỠ */}
        <section id="aff-03" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-10">
            <div>
              <SectionLabel number="03" text="Lý do tham gia" />
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                Tại sao bạn không thể bỏ lỡ thử thách này?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <NumberedList items={reasons} />
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-md mx-auto">
                  <img
                    src={ASSETS.whiteboard}
                    alt="Trung Dũng giảng giải chiến lược phễu bán hàng"
                    className="w-full aspect-3/4 object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="border-y-2 border-[#FA5B13] py-5 text-center text-base sm:text-lg text-gray-800 leading-relaxed">
              <span className="font-semibold text-[#FA5B13]">Chú ý:</span> chỉ giới hạn{' '}
              <strong>7 người, 7 quà tặng trị giá 125.970.000đ</strong> – và không gian ấm cúng để tôi kèm sát từng
              người. <strong>Không hứa bao giờ mở lại.</strong>
            </div>

            <div className="text-center">
              <CtaButton label="Đăng ký thử thách 100 triệu ngay" />
            </div>
          </div>
        </section>

        {/* SECTION 04: SỰ THẬT & KẾT QUẢ HỌC VIÊN */}
        <section id="aff-04" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <SectionLabel number="04" text="Sự thật không ai chịu nói" />
                <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                  Bạn à… có một sự thật không ai chịu nói
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p className="font-semibold text-gray-900">Nghe này…</p>
                  <p>
                    Không phải bạn lười. Không phải bạn dở. Bạn chỉ đang chơi một trò chơi đã{' '}
                    <strong>chết từ lâu</strong>.
                  </p>
                  <p className="type-statement text-2xl text-[#FA5B13]">
                    Bạn không cần giỏi. Bạn chỉ cần đổi mô hình.
                  </p>
                  <p>Đúng hệ thống, 2 ngày sau bạn thấy khách thật, tiền thật.</p>
                  <p>
                    Nếu bạn không hành động ngay… 6 tháng nữa bạn vẫn ở chỗ cũ, chỉ khác là{' '}
                    <strong>mệt hơn, nợ nhiều hơn, niềm tin ít hơn.</strong>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-md mx-auto">
                  <img
                    src={ASSETS.thinking}
                    alt="Trung Dũng"
                    className="w-full aspect-square object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="type-h3 text-2xl sm:text-[1.75rem] text-gray-900 [text-wrap:balance]">
                Thử thách 2 ngày Affiliate sẽ giúp bạn
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Nắm trọn <strong>mô hình kinh doanh thông minh đã tạo ra hàng trăm triệu mỗi tháng</strong> – được thiết
                kế cho người <strong>không công nghệ, không vốn</strong>, nhưng vẫn{' '}
                <strong>ra khách thật, tiền thật ngay tại chỗ</strong> (chỉ cần chiếc điện thoại).
              </p>
              <p className="text-gray-600">
                Để cuối cùng, bạn có thể tự tin thoát khỏi mô hình cũ, không còn loay hoay khổ sở, mở ra dòng thu nhập
                không ngừng tăng khiến bạn phát cuồng vì sung sướng…
              </p>
              <div className="pt-6">
                <p className="type-statement text-4xl sm:text-5xl text-gray-950">Đừng tin ngay.</p>
                <HandNote>Hãy xem học viên nhắn gì cho tôi…</HandNote>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-5xl mx-auto">
              {ASSETS.chats.map((chatSrc, idx) => (
                <div
                  key={chatSrc}
                  className="mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow bg-gray-50 p-1 sm:p-2"
                >
                  <img
                    src={chatSrc}
                    alt={`Phản hồi học viên ${idx + 1}`}
                    className="w-full h-auto rounded-xl object-contain block img-crisp"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">Bí mật kiếm tiền của những người có dòng tiền không ngừng tăng theo thời gian</p>
              <CtaButton label="Tham gia thử thách Affiliate ngay" />
            </div>
          </div>
        </section>

        {/* SECTION 05: LỘ TRÌNH 2 NGÀY */}
        <section id="aff-05" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <SectionLabel number="05" text="Lộ trình 2 ngày" />
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                Đây là những gì bạn có thể mong đợi trong thử thách 2 ngày
              </h2>
              <p className="text-gray-600 mt-2 text-base">
                Dành riêng cho người muốn bứt phá, tạo khác biệt, và kiếm tiền thật chỉ bằng chiếc điện thoại.
              </p>
            </div>

            {curriculum.map((day) => (
              <div key={day.day}>
                <h3 className="type-h2 text-3xl sm:text-4xl text-[#FA5B13] pb-3 border-b-2 border-gray-900">
                  {day.day}
                </h3>
                {day.modules.map((m, idx) => (
                  <div
                    key={m.title}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-10 border-b border-gray-200"
                  >
                    <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <p className="type-label text-gray-500">Bài {idx + 1}</p>
                      <h4 className="type-h3 text-xl sm:text-2xl text-gray-900 [text-wrap:balance]">
                        {m.title}
                      </h4>
                      <div className="space-y-3 text-base text-gray-700 leading-relaxed">{m.body}</div>
                      <NewbieNote />
                    </div>
                    <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-md mx-auto">
                        <img
                          src={m.img}
                          alt={m.title}
                          className={`w-full aspect-square object-cover img-crisp ${'imgPosition' in m ? m.imgPosition : ''}`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: QUÀ TẶNG */}
        <section id="aff-06" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center">
                <SectionLabel number="06" text="Quà tặng khổng lồ" />
              </div>
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance] mx-auto">
                Chỉ 7 suất cho 7 người cùng tôi phá đảo dòng thu nhập 100 triệu từ Affiliate – Tự Động
              </h2>
            </div>

            <div className="border-t-2 border-gray-900">
              {gifts.map((g, idx) => (
                <div
                  key={g.title}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 border-b border-gray-200"
                >
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-gray-200/70 bg-gradient-to-b from-gray-50/80 to-white p-3 sm:p-5 flex items-center justify-center shadow-sm">
                      <img
                        src={g.img}
                        alt={g.title}
                        className="w-full max-h-72 aspect-4/3 object-contain img-crisp drop-shadow-sm transition-transform hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="type-figure text-5xl text-[#FA5B13]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-gray-500">
                        Trị giá <strong className="text-gray-900 text-base">{g.value}</strong>
                      </span>
                    </div>
                    <h3 className="type-h3 text-xl sm:text-2xl text-gray-900 [text-wrap:balance]">
                      {g.title}
                    </h3>
                    <div className="space-y-3 text-base text-gray-700 leading-relaxed">{g.body}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Bạn nhận món quà này <strong className="text-[#FA5B13]">miễn phí</strong> khi tham gia thử thách 2
                      ngày Affiliate cùng chúng tôi — chỉ có 7 phần quà cho 7 chỗ ngồi duy nhất, nhanh tay mới kịp.
                    </p>
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="inline-flex items-center gap-1.5 text-[#FA5B13] font-semibold hover:gap-2.5 transition-all cursor-pointer"
                    >
                      Giữ chỗ để nhận quà này <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-5 max-w-3xl mx-auto pt-16">
              <h2 className="type-statement text-2xl sm:text-3xl text-gray-900 [text-wrap:balance]">
                Thử thách này duy nhất <span className="text-[#FA5B13]">7 chỗ ngồi miễn phí</span> và có đúng 7 suất quà
                trị giá 125.970.000đ
              </h2>
              <p className="text-gray-600">
                Cách nhanh nhất để xây dựng hệ thống kiếm tiền không ngừng tăng (trong thời đại A.I cướp việc) đó là bấm
                nút tham gia thử thách 2 ngày bên dưới.
              </p>
              <CtaButton />
            </div>
          </div>
        </section>

        {/* SECTION 07: TRƯỚC & SAU */}
        <section id="aff-07" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-10">
            <div>
              <SectionLabel number="07" text="Sự thay đổi" />
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                Bạn trước và sau thử thách 2 ngày
              </h2>
              <p className="text-gray-600 mt-2 text-base">
                Bạn đã sẵn sàng xây dựng cho mình một dòng tiền Affiliate 100+ triệu chỉ cần sao chép chưa?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x divide-gray-200">
              <div className="md:pr-10 space-y-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50">
                  <img
                    src={ASSETS.before}
                    alt="Trước thử thách"
                    className="w-full aspect-16/10 object-cover grayscale img-crisp"
                    loading="lazy"
                  />
                </div>
                <h3 className="type-h3 text-2xl sm:text-3xl text-gray-500">Trước</h3>
                <ul className="space-y-3 text-base text-gray-600 leading-relaxed">
                  {before.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-gray-400 shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:pl-10 space-y-5">
                <div className="overflow-hidden rounded-2xl border border-orange-200/80 shadow-sm bg-orange-50/20">
                  <img
                    src={ASSETS.after}
                    alt="Sau thử thách"
                    className="w-full aspect-16/10 object-cover object-top img-crisp"
                    loading="lazy"
                  />
                </div>
                <h3 className="type-h3 text-2xl sm:text-3xl text-[#FA5B13]">Sau</h3>
                <ul className="space-y-3 text-base text-gray-800 leading-relaxed">
                  {after.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#FA5B13] shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 08: NGƯỜI HUẤN LUYỆN */}
        <section id="aff-08" className="px-6 sm:px-12 py-16 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto space-y-10">
            <div>
              <SectionLabel number="08" text="Người huấn luyện bạn" />
              <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                Người huấn luyện bạn trong 2 ngày thử thách…
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-md bg-gray-50 max-w-sm mx-auto">
                  <img
                    src={ASSETS.trainer}
                    alt="Trung Dũng"
                    className="w-full aspect-4/5 object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-5">
                <h3 className="type-h2 text-3xl sm:text-4xl text-gray-950">Trung Dũng</h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Sáng lập cộng đồng <strong>Affiliate Tự Động</strong> – khởi tạo dòng tiền <strong>thụ động</strong>{' '}
                  hàng trăm triệu mỗi tháng hoàn toàn thông qua online.
                </p>
                <ul className="border-t border-gray-200">
                  {trainerAchievements.map((item) => (
                    <li key={item} className="py-4 border-b border-gray-200 text-base text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 09: CÀNG CHỜ CÀNG MẤT */}
        <section id="aff-09" className="px-6 sm:px-12 py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <SectionLabel number="09" text="Đừng chần chừ" />
                <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance]">
                  Bạn càng chờ, càng mất thêm tiền mặt…
                </h2>
                <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                  <p>
                    Tôi nói thẳng: nếu bạn đang đọc dòng này, nghĩa là bạn đã từng nghĩ tới kiếm tiền online. Nhưng rồi…
                    bạn lăn tăn. Không biết bắt đầu từ đâu. Không chắc có làm được không. Sợ công nghệ, sợ quảng cáo, sợ
                    thất bại.
                  </p>
                  <p>
                    Tôi hiểu. Tôi cũng từng như bạn. Tôi từng đốt 3 năm, mò mẫm, mất tiền… chỉ vì không có hệ thống đúng.
                  </p>
                  <p>
                    <strong>Và đây là sự thật khó nuốt:</strong> mỗi tháng bạn chần chừ, là mỗi tháng bạn mất ít nhất
                    vài chục triệu vào tay người khác – người đang dùng Affiliate đúng cách.
                  </p>
                  <p>
                    2 ngày trong “Affiliate – Tự Động” này, tôi cho bạn <strong>copy</strong> toàn bộ hệ thống đã giúp
                    người tay trắng → 100 triệu/tháng. Chỉ bằng copy – dán.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-sm bg-gray-50 max-w-xs w-full">
                  <img
                    src={ASSETS.hourglass}
                    alt="Thời gian không chờ đợi ai"
                    className="w-full aspect-square object-cover img-crisp"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-3xl space-y-4">
              <h2 className="type-h3 text-2xl sm:text-[1.75rem] text-gray-900 [text-wrap:balance]">
                Bây giờ – không phải lúc đợi nữa
              </h2>
              <div className="space-y-3 text-base text-gray-700 leading-relaxed">
                <p>
                  Đây không phải một lớp học bình thường. Không phải lý thuyết chay. Không phải “nghe cho vui”.
                </p>
                <p>
                  Đây là <strong>2 ngày nặng đô</strong>: tôi sẽ cầm tay bạn, lột trần toàn bộ hệ thống Affiliate đã
                  giúp người tay trắng kiếm thêm 100 triệu/tháng. Chỉ bằng chiếc điện thoại.
                </p>
                <HandNote>Nếu bạn không vào lớp này – chưa chắc sẽ còn lớp gần nhất nữa.</HandNote>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-8 pt-4">
              <div className="space-y-3">
                <h2 className="type-h2 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] text-gray-900 max-w-3xl [text-wrap:balance] mx-auto">
                  Đây là tất cả bạn nhận được
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                  Khi bạn đăng ký tham gia thử thách 2 ngày ngay hôm nay:
                </p>
              </div>

              {/* Ảnh tổng hợp bộ quà */}
              <div className="overflow-hidden rounded-2xl border border-gray-200/60 shadow-lg bg-gray-50/50 max-w-3xl mx-auto p-1 sm:p-2">
                <img
                  src={ASSETS.heroBundle}
                  alt="Trọn bộ quà tặng Affiliate Tự Động"
                  className="w-full h-auto object-contain img-crisp rounded-xl block"
                  loading="lazy"
                />
              </div>

              {/* Danh sách quà dạng biên nhận (Receipt Style chuẩn reference) */}
              <div className="max-w-2xl mx-auto text-left">
                <ul className="text-base sm:text-lg divide-y divide-gray-100">
                  <li className="flex items-baseline gap-2 py-3.5">
                    <span className="font-bold text-gray-950">Thử thách 2 ngày Affiliate – Tự Động</span>
                    <span className="flex-1 border-b border-dotted border-gray-400 min-w-4" />
                    <span className="font-bold text-[#FA5B13] shrink-0 text-lg sm:text-xl">Miễn phí</span>
                  </li>
                  {gifts.map((g, idx) => {
                    const isVoGia = g.value.toLowerCase().includes('vô giá');
                    return (
                      <li key={g.title} className="flex items-baseline gap-2 py-3.5">
                        <span className="text-gray-800 leading-snug">
                          <strong className="text-gray-950 font-bold">Quà {idx + 1}:</strong> {g.title}
                        </span>
                        <span className="flex-1 border-b border-dotted border-gray-400 min-w-4" />
                        <span
                          className={`shrink-0 font-mono font-bold ${
                            isVoGia ? 'text-red-600 font-sans uppercase' : 'text-gray-950'
                          }`}
                        >
                          {g.value}
                        </span>
                      </li>
                    );
                  })}

                  {/* TỔNG GIÁ TRỊ QUÀ TẶNG - ĐẶC BIỆT VÀ RÕ RÀNG THEO ĐÚNG CHẤT REFERENCE */}
                  <li className="pt-6 mt-3 border-t-2 border-gray-950 space-y-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-xl sm:text-2xl text-gray-950">
                        Tổng giá trị quà tặng
                      </span>
                      <span className="flex-1 border-b border-dotted border-gray-400 min-w-4 hidden sm:block" />
                      <span className="type-figure text-3xl sm:text-4xl text-gray-950 font-bold shrink-0">
                        125.970.000đ
                      </span>
                    </div>

                    <div className="bg-[#FFF5F0] border-2 border-[#FA5B13] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-gray-600">
                          Hôm nay dành cho bạn (chỉ 7 chỗ duyệt nhanh):
                        </p>
                        <p className="type-figure text-3xl sm:text-4xl font-bold text-[#FA5B13] mt-0.5">
                          100% MIỄN PHÍ
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <span className="inline-block text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                          🔥 Ban tổ chức duyệt trong 3 phút
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 space-y-4 text-center">
                <HandNote>Chỉ có đúng 7 suất – ban tổ chức duyệt trong 3 phút thôi nhé!</HandNote>
                <p className="font-semibold text-gray-900 text-base sm:text-lg">
                  Nhấn tham gia thử thách ngay – trước khi hết sạch 7 chỗ ngồi.
                </p>
                <CtaButton />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 sm:px-12 py-10 bg-white border-t border-gray-200 font-be-vietnam">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#FA5B13] stroke-[2.3]" />
              <span className="type-brand font-bold text-[#FA5B13] text-xl">Dũng Gieo Hạt</span>
              <span>© Affiliate Tự Động. All Rights Reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-black cursor-pointer">
                Lên đầu trang
              </button>
              <button onClick={() => setIsRegisterOpen(true)} className="hover:text-black cursor-pointer">
                Đăng ký giữ chỗ
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* POPUP ĐĂNG KÝ THỬ THÁCH */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => goTo('/home')}
        eyebrow="AFFILIATE TỰ ĐỘNG · MIỄN PHÍ"
        title="THỬ THÁCH 2 NGÀY AFFILIATE"
        highlight="DÒNG TIỀN 100 TRIỆU/THÁNG"
        subtitle="Điền thông tin của bạn xuống dưới để giữ 1 trong 7 chỗ ngồi và nhận bộ quà tặng trị giá 125.970.000đ:"
        submitLabel="GIỮ CHỖ THỬ THÁCH CHO TÔI"
        successMessage="✓ Đã giữ chỗ thành công! Đang chuyển bạn sang bước cuối cùng…"
        formType="THU_THACH_AFFILIATE"
        sheetName={SHEET_TABS.affiliate}
      />
    </div>
  );
};
