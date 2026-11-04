import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sprout } from 'lucide-react';
import { goTo } from './AffiliateLandingPage';

// Link nhóm Zalo kín dành cho học viên Thử thách 2 ngày Affiliate
const ZALO_GROUP_LINK = 'https://zalo.me/g/a2y2x036pqkwzig7u9ri';
const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=' + encodeURIComponent(ZALO_GROUP_LINK);

// Trang đích (cảm ơn) sau khi đăng ký Thử thách 2 ngày Affiliate – route /home
export const AffiliateHomePage: React.FC = () => {
  // 3 phút giữ chỗ
  const [timeLeft, setTimeLeft] = useState<number>(3 * 60);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Giữ chỗ thành công – thử thách 2 ngày Affiliate | Dũng Gieo Hạt';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const steps = [
    'Bấm nút cam bên dưới để vào nhóm Zalo kín.',
    'Chờ ban tổ chức duyệt giữ chỗ trong vòng 3 phút.',
    'Đọc tin nhắn ghim để nhận lịch học, link phòng học và bộ quà tặng.',
  ];

  return (
    <div className="min-h-screen bg-white text-[#191A23] font-be-vietnam antialiased flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo('/affiliate')}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#FA5B13] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang thử thách</span>
          </button>
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-[#FA5B13] stroke-[2.3]" />
            <span className="type-brand text-lg sm:text-xl text-gray-950">Dũng Gieo Hạt</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 sm:py-16">
        <div className="max-w-xl mx-auto text-center space-y-8 animate-fadeIn">
          <div className="space-y-3">
            <p className="type-label text-[#FA5B13]">Bước cuối cùng để hoàn tất</p>
            <h1 className="type-display text-3xl sm:text-4xl text-gray-950 [text-wrap:balance]">
              Chúc mừng bạn đã giữ chỗ thành công!
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Lịch học, link phòng học trực tiếp và trọn bộ quà tặng trị giá 125.970.000đ chỉ được gửi trong{' '}
              <strong className="text-gray-900">nhóm Zalo kín</strong> của thử thách.
            </p>
          </div>

          <div className="border-y border-gray-200 py-6 space-y-2">
            <p className="type-label text-gray-500">Thời gian giữ chỗ còn lại</p>
            <p className="type-figure text-5xl text-[#FA5B13]">
              {minutes}:{seconds}
            </p>
            <p className="font-dancing-script font-bold text-xl sm:text-2xl text-[#C2410C]">
              Chỉ có 7 chỗ ngồi – ban tổ chức duyệt trong 3 phút thôi nhé!
            </p>
          </div>

          <div className="space-y-2">
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-semibold text-base sm:text-lg rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
            >
              Bấm để vào nhóm Zalo kín
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-gray-500">Vào nhóm ngay để ban tổ chức kiểm duyệt và gửi quà cho bạn</p>
          </div>

          <ol className="text-left border-t border-gray-200">
            {steps.map((step, idx) => (
              <li key={step} className="flex gap-4 py-4 border-b border-gray-200">
                <span className="type-figure text-xl text-[#FA5B13] w-7 shrink-0">{idx + 1}.</span>
                <span className="text-base text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-600">Hoặc mở Zalo và quét mã QR:</p>
            <img
              src={QR_URL}
              alt="Mã QR nhóm Zalo kín Thử thách 2 ngày Affiliate"
              className="w-40 h-40 sm:w-44 sm:h-44 border border-gray-200 p-2"
            />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 border-t border-gray-200">
        © 2026 Dũng Gieo Hạt · Affiliate Tự Động. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};
