import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sprout } from 'lucide-react';
import { goTo } from './AffiliateLandingPage';

// Link nhóm Zalo kín dành cho học viên Thử thách 2 ngày Affiliate
const ZALO_GROUP_LINK = 'https://zalo.me/g/jgxfxq6uu7xuuobade3o';
const QR_URL = '/assets/affiliate/zalo-group-qr.png';
const QR_FALLBACK_URL =
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
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Lịch học, link phòng học trực tiếp và trọn bộ quà tặng trị giá{' '}
              <strong className="font-black text-xl sm:text-2xl text-[#FA5B13] bg-orange-50 border border-orange-200 rounded-lg px-2.5 py-0.5 inline-block align-middle mx-1 shadow-xs">
                125.970.000đ
              </strong>{' '}
              chỉ được gửi trong <strong className="text-gray-900 font-bold">nhóm Zalo kín</strong> của thử thách.
            </p>
          </div>

          <div className="border-y border-gray-200 py-6 space-y-2">
            <p className="type-label text-gray-500">Thời gian giữ chỗ còn lại</p>
            <p className="type-figure text-5xl text-[#FA5B13]">
              {minutes}:{seconds}
            </p>
            <div className="pt-1">
              <p className="inline-block font-black text-base sm:text-lg text-red-600 bg-red-50 border-2 border-red-300 rounded-xl px-4 py-2.5 shadow-sm tracking-tight">
                🔥 Chỉ có 7 chỗ ngồi – ban tổ chức duyệt trong 3 phút thôi nhé!
              </p>
            </div>
          </div>

          {/* MÃ QR NHÓM ZALO ĐẶT TRÊN NÚT THAM GIA */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-sm font-medium text-gray-700">Mở ứng dụng Zalo và quét mã QR để vào nhóm:</p>
            <div className="p-3 bg-white border border-gray-200/90 rounded-2xl shadow-md inline-block">
              <img
                src={QR_URL}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = QR_FALLBACK_URL;
                }}
                alt="Mã QR nhóm Zalo kín Thử thách 2 ngày Affiliate"
                className="w-48 h-48 sm:w-52 sm:h-52 img-crisp block object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-500">Hoặc bấm nút bên dưới nếu bạn đang mở bằng điện thoại:</p>
          </div>

          {/* NÚT THAM GIA NHÓM ZALO */}
          <div className="space-y-2">
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-semibold text-base sm:text-lg rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#FA5B13]/25 active:scale-98"
            >
              Tham gia nhóm Zalo ngay
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-gray-500">Vào nhóm ngay để ban tổ chức kiểm duyệt và gửi quà cho bạn</p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 border-t border-gray-200">
        © 2026 Dũng Gieo Hạt · Affiliate Tự Động. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};
