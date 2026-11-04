import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, ExternalLink, Sprout, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface ThankYouPageProps {
  userName?: string;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ userName, onBackToHome }) => {
  // 3 phút giữ chỗ (180 giây) theo đúng yêu cầu
  const [timeLeft, setTimeLeft] = useState<number>(3 * 60);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Tự động cuộn lên đầu trang ngay khi mở trang xác nhận
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
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

  // Lắng nghe sự kiện scroll để hiển thị nút cuộn lên đầu trang khi cần
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đếm ngược 3 phút giữ chỗ
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

  // Background 1 trong 8 yếu tố hạnh phúc: Yếu tố số 7 - Bình An Nội Tâm & Tinh Thần Thanh Tịnh
  const happinessBackgroundImage = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2400&q=85';

  return (
    <div
      className="w-full min-h-screen text-[#141820] font-be-vietnam flex flex-col relative antialiased bg-neutral-900 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 14, 23, 0.78), rgba(10, 14, 23, 0.70), rgba(10, 14, 23, 0.88)), url('${happinessBackgroundImage}')`,
      }}
    >
      {/* ======================================================== */}
      {/* 1. TOP BRAND HEADER - Tinh gọn, sang trọng */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#141820]/85 backdrop-blur-md text-white border-b border-white/10 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* Logo & Quay lại */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onBackToHome();
                window.scrollTo(0, 0);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title="Quay lại trang chủ"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang chủ</span>
            </button>
          </div>

          {/* Brand pill */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFF0E6] flex items-center justify-center text-[#FA5B13] shrink-0">
              <Sprout className="w-4 h-4 text-[#FA5B13] stroke-[2.4]" />
            </div>
            <span className="font-playfair-heading italic text-base sm:text-xl text-[#FFA877] font-semibold">
              Dũng Gieo Hạt
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. THEME PAGE CHO GỌN - CARD TỔNG HỢP GỌN GÀNG, ĐẸP MẮT */}
      {/* ======================================================== */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 w-full">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border-t-4 border-[#FA5B13] p-5 sm:p-8 space-y-5 text-center animate-fadeIn">
          {/* Badge Yếu tố Hạnh phúc */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E6] text-[#FA5B13] text-xs font-bold tracking-wide border border-[#FFD8C2]">
              <Sparkles className="w-3.5 h-3.5 text-[#FA5B13]" />
              BƯỚC CUỐI CÙNG ĐỂ HOÀN TẤT
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold">
              🌿 Trụ cột 07: Bình An Nội Tâm
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141820] leading-tight">
              Chúc Mừng Bạn Đã Đăng Ký
              <span className="block text-[#FA5B13] mt-0.5">Giữ Chỗ Thành Công!</span>
            </h1>
            <p className="text-sm sm:text-base font-semibold text-neutral-600">
              Xin chào <strong className="text-neutral-900">{displayName}</strong>,
            </p>
          </div>

          {/* Dancing Script Quote - Gọn, ấm áp */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141820] text-[#FFA877] shadow-sm">
            <p className="font-dancing-script text-xl sm:text-2xl font-bold leading-relaxed [text-wrap:balance]">
              “Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”
            </p>
            <span className="block text-[11px] uppercase tracking-widest text-neutral-400 mt-1.5 font-semibold font-be-vietnam">
              — DŨNG GIEO HẠT —
            </span>
          </div>

          {/* Subtitle mô tả ngắn gọn */}
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
            Toàn bộ lịch buổi chia sẻ, link phòng Zoom trực tiếp, trọn bộ Ebook đổi đời và tài liệu đặc quyền chỉ được gửi duy nhất trong <strong className="text-neutral-900 font-bold">Nhóm Kín Zalo</strong>.
          </p>

          {/* Warning badge - 3 phút */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-center">
            <span className="text-base shrink-0">⚠️</span>
            <span>Nhóm kín có giới hạn số lượng, ban tổ chức chỉ duyệt giữ chỗ trong vòng 3 phút!</span>
          </div>

          {/* Countdown Timer - 3 phút (180s) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF7F2] border border-[#FFE4D6] flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-neutral-700 font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-[#FA5B13]" />
              <span>THỜI GIAN GIỮ CHỖ CÒN LẠI:</span>
            </div>
            <div className="flex items-center gap-2 font-mono font-extrabold text-xl sm:text-2xl text-[#FA5B13]">
              <span className="bg-white px-2 py-0.5 rounded-lg border border-[#FFD8C2]">
                {String(hours).padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-neutral-500 font-medium">Giờ</span>
              <span className="text-neutral-400">:</span>
              <span className="bg-white px-2 py-0.5 rounded-lg border border-[#FFD8C2]">
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-neutral-500 font-medium">Phút</span>
              <span className="text-neutral-400">:</span>
              <span className="bg-white px-2 py-0.5 rounded-lg border border-[#FFD8C2]">
                {String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs font-sans text-neutral-500 font-medium">Giây</span>
            </div>
          </div>

          {/* CTA Button - Bấm vào nhóm Zalo kín */}
          <a
            href={zaloGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-5 rounded-2xl bg-[#FA5B13] hover:bg-[#DD4900] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#FA5B13]/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 group"
          >
            <span className="flex items-center justify-center gap-2">
              <span>👉 BẤM ĐỂ VÀO NHÓM ZALO KÍN</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-xs font-medium text-white/90 mt-0.5">
              (Bấm ngay để ban tổ chức kiểm duyệt & nhận trọn bộ Ebook)
            </span>
          </a>

          {/* 3 Bước nhận quà tóm gọn */}
          <div className="pt-1 text-left text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3 Bước Hoàn Tất Nhanh:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-neutral-700">
              <div className="bg-white p-2 rounded-lg border border-neutral-200">
                <span className="font-bold text-[#FA5B13]">1.</span> Bấm nút cam để vào nhóm Zalo
              </div>
              <div className="bg-white p-2 rounded-lg border border-neutral-200">
                <span className="font-bold text-[#FA5B13]">2.</span> Duyệt giữ chỗ trong 3 phút
              </div>
              <div className="bg-white p-2 rounded-lg border border-neutral-200">
                <span className="font-bold text-[#FA5B13]">3.</span> Đọc tin ghim nhận Ebook & Zoom
              </div>
            </div>
          </div>

          {/* QR Code Section - Gọn gàng */}
          <div className="pt-2 flex flex-col items-center text-center space-y-2">
            <span className="text-xs sm:text-sm font-semibold text-neutral-600">
              Hoặc mở ứng dụng Zalo quét mã QR:
            </span>

            <div className="p-2.5 bg-white rounded-2xl border border-neutral-200 shadow-sm inline-block">
              <img
                src="/assets/aistudio/image_0b59f36d.png"
                alt="Mã QR Nhóm Zalo Kín Dũng Gieo Hạt"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = qrBackupUrl;
                }}
                className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] object-contain rounded-xl"
              />
            </div>

            <p className="text-xs font-semibold text-neutral-800">
              Quét mã QR 👆 bằng Zalo điện thoại để vào nhóm ngay
            </p>

            <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kênh chính thức do Dũng Gieo Hạt trực tiếp quản trị</span>
            </div>
          </div>

          {/* Quay lại link */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                onBackToHome();
                window.scrollTo(0, 0);
              }}
              className="text-xs sm:text-sm font-semibold text-neutral-500 hover:text-[#FA5B13] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ Dũng Gieo Hạt</span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-[#141820] text-white hover:bg-black shadow-xl border border-neutral-700 flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer animate-fadeIn"
          title="Cuộn lên đầu trang"
        >
          <ChevronUp className="w-4 h-4 text-[#FA5B13]" />
          <span>Lên đầu</span>
        </button>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-white/70 font-light border-t border-white/10 bg-[#141820]/80">
        © 2026 Dũng Gieo Hạt. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};
