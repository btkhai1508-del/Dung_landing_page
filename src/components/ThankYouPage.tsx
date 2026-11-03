import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, ExternalLink, Sprout, ChevronUp } from 'lucide-react';

interface ThankYouPageProps {
  userName?: string;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ userName, onBackToHome }) => {
  // 10 minutes countdown in seconds (600 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Tự động cuộn lên đầu trang ngay khi mở trang xác nhận
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    // Tránh bị giữ vị trí cuộn cũ từ trang landing
    const timer1 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 30);
    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Lắng nghe sự kiện scroll để hiển thị nút cuộn lên đầu trang nhanh
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đếm ngược 10 phút giữ chỗ
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const zaloGroupLink = 'https://zalo.me/g/a2y2x036pqkwzig7u9ri';
  const qrBackupUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=' + encodeURIComponent(zaloGroupLink);

  const displayName = userName && userName.trim() ? userName.trim() : 'Bùi Trung Khải';

  return (
    <div className="w-full min-h-screen bg-white text-[#141820] font-be-vietnam flex flex-col relative antialiased">
      {/* ======================================================== */}
      {/* 1. TOP BRAND HEADER (THEO ĐÚNG TEMPLATE ẢNH THẬT) */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#141820] text-white border-b border-neutral-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onBackToHome();
                window.scrollTo(0, 0);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer mr-0.5"
              title="Quay lại trang chủ"
              aria-label="Quay lại trang chủ"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center text-[#FA5B13] border border-[#FFD8C2] shrink-0">
              <Sprout className="w-5 h-5 text-[#FA5B13] stroke-[2.3]" />
            </div>

            <div>
              <span className="font-playfair-heading italic text-lg sm:text-2xl text-white font-medium leading-none block">
                Dũng Gieo Hạt
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase block mt-1">
                Gieo Hạt Thiện Lành · Kiến Tạo Tương Lai
              </span>
            </div>
          </div>

          {/* Right badge: ĐÃ XÁC NHẬN */}
          <div className="shrink-0">
            <span className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FA5B13] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs">
              ĐÃ XÁC NHẬN
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. LINEAR CONTENT (LIỀN MẠCH, KHÔNG KHUNG HỘP, KHÔNG VIỀN ĐEN AI) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full space-y-7 sm:space-y-8">
        {/* Kicker & Greeting */}
        <div className="space-y-2 text-left">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FA5B13] uppercase block">
            CHÚC MỪNG BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG!
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#141820] leading-tight">
            Xin chào <span className="text-[#FA5B13]">{displayName}</span>,
          </h1>
        </div>

        {/* Dancing Script Quote - Linear, ấm áp, liền mạch */}
        <div className="p-5 sm:p-7 rounded-2xl bg-[#141820] text-[#FFA877] shadow-sm text-center">
          <p className="font-dancing-script text-2xl sm:text-3xl font-bold leading-relaxed [text-wrap:balance]">
            “Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”
          </p>
          <span className="block text-xs uppercase tracking-widest text-neutral-400 mt-2 font-semibold font-be-vietnam">
            — DŨNG GIEO HẠT —
          </span>
        </div>

        {/* Body paragraphs */}
        <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
          <p>
            Thông tin giữ chỗ của bạn cho chương trình <strong className="text-[#141820] font-bold">"Thay Đổi Tương Lai - Không Chỉ Là Số Phận"</strong> đã được ghi nhận trên hệ thống.
          </p>
          <p>
            Để thấu hiểu bản chất năng lượng, tần số rung động và vận dụng 6 quy luật vũ trụ nhằm làm chủ vận mệnh, <strong className="text-[#141820] font-bold">toàn bộ tài liệu mật, trọn bộ Ebook đổi đời, lịch học và link Zoom</strong> sẽ được gửi độc quyền trong <strong className="text-[#141820] font-bold">Nhóm Kín Zalo</strong>.
          </p>
        </div>

        {/* 3 Bước nhận quà - Giao diện cam đào thanh nhã, không viền đen */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF7F2] border border-[#FFE4D6] space-y-4 text-left">
          <h2 className="font-bold text-base sm:text-lg text-[#C2410C] flex items-center gap-2">
            <span>🎁</span>
            <span>3 BƯỚC ĐỂ BẠN NHẬN ĐẦY ĐỦ QUÀ TẶNG:</span>
          </h2>
          <ol className="space-y-3.5 text-base sm:text-lg text-neutral-800 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#FA5B13] shrink-0">1.</span>
              <span>
                <strong className="font-bold text-neutral-900">Bấm nút màu cam bên dưới</strong> (hoặc quét mã QR) để vào Nhóm Zalo Kín.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#FA5B13] shrink-0">2.</span>
              <span>
                <strong className="font-bold text-neutral-900">Bấm "Tham gia nhóm"</strong> để ban tổ chức kiểm duyệt giữ chỗ trong vòng 3 phút.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-[#FA5B13] shrink-0">3.</span>
              <span>
                <strong className="font-bold text-neutral-900">Đọc tin nhắn Ghim</strong> tại nhóm để tải trọn bộ Ebook & nhận thông báo lịch buổi chia sẻ.
              </span>
            </li>
          </ol>
        </div>

        {/* Warning Badge */}
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-sm sm:text-base font-semibold flex items-center gap-3">
          <span className="text-xl shrink-0">⚠️</span>
          <span>Nhóm kín có giới hạn số lượng, ban tổ chức chỉ duyệt giữ chỗ trong vòng 3 phút!</span>
        </div>

        {/* Countdown Timer */}
        <div className="py-4 px-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-neutral-600 font-semibold text-sm sm:text-base">
            <Clock className="w-5 h-5 text-[#FA5B13]" />
            <span>Thời gian giữ chỗ còn lại:</span>
          </div>
          <div className="flex items-baseline gap-2 font-mono font-bold text-2xl sm:text-3xl text-[#FA5B13]">
            <span>{String(hours).padStart(2, '0')}</span>
            <span className="text-sm font-sans font-medium text-neutral-400">giờ</span>
            <span>:</span>
            <span>{String(minutes).padStart(2, '0')}</span>
            <span className="text-sm font-sans font-medium text-neutral-400">phút</span>
            <span>:</span>
            <span>{String(seconds).padStart(2, '0')}</span>
            <span className="text-sm font-sans font-medium text-neutral-400">giây</span>
          </div>
        </div>

        {/* Nút bấm vào Zalo - Nút cam đặc trưng, bo góc mềm mại, không viền đen */}
        <div className="pt-2">
          <a
            href={zaloGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold text-lg sm:text-xl shadow-lg shadow-[#FA5B13]/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 group"
          >
            <span className="flex items-center justify-center gap-2">
              <span>👉 BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
              (Bấm ngay để ban tổ chức kiểm duyệt & nhận trọn bộ Ebook)
            </span>
          </a>
        </div>

        {/* QR Code Section - Linear, liền mạch */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col items-center text-center space-y-3">
          <span className="text-sm sm:text-base font-semibold text-neutral-700">
            Hoặc mở ứng dụng Zalo trên điện thoại và quét mã QR:
          </span>

          <div className="p-3.5 bg-white rounded-2xl border border-neutral-200 shadow-sm inline-block">
            <img
              src="/assets/aistudio/image_0b59f36d.png"
              alt="Mã QR Nhóm Zalo Kín Dũng Gieo Hạt"
              onError={(e) => {
                (e.target as HTMLImageElement).src = qrBackupUrl;
              }}
              className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] object-contain rounded-xl"
            />
          </div>

          <p className="text-sm font-semibold text-[#141820]">
            Quét mã QR 👆 bằng điện thoại để vào nhóm ngay
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-neutral-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kênh chính thức do Dũng Gieo Hạt trực tiếp quản trị</span>
          </div>
        </div>

        {/* Quay lại link */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => {
              onBackToHome();
              window.scrollTo(0, 0);
            }}
            className="text-sm font-semibold text-neutral-500 hover:text-[#FA5B13] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ Dũng Gieo Hạt</span>
          </button>
        </div>
      </main>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-[#141820] text-white hover:bg-black shadow-xl border border-neutral-700 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 cursor-pointer animate-fadeIn"
          title="Cuộn lên đầu trang"
        >
          <ChevronUp className="w-4 h-4 text-[#FA5B13]" />
          <span>Lên đầu trang</span>
        </button>
      )}

      {/* Linear Footer */}
      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 font-light">
        © 2026 Dũng Gieo Hạt. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};
