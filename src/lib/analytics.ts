// Google Analytics 4 (GA4).
// Lấy Measurement ID tại: analytics.google.com → Admin → Data streams → (web stream) → "Measurement ID".
// Để trống → không tải GA (dùng khi chạy thử ở máy).
export const GA_MEASUREMENT_ID = 'G-SDB1B4B1DP'; // ví dụ: 'G-ABC123XYZ'

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let enabled = false;

function isAdminPath(): boolean {
  const path = window.location.pathname.toLowerCase();
  return path === '/admin' || path.startsWith('/admin/') || path === '/quan-tri';
}

/**
 * Tải gtag.js một lần khi mở trang. Không chạy ở trang quản trị để không đếm lượt truy cập nội bộ.
 * Lượt xem trang (kể cả khi chuyển trang bằng history.pushState / đổi #hash), cuộn trang,
 * click link ra ngoài… do "Enhanced measurement" của GA4 tự đo.
 */
export function initAnalytics(): void {
  if (enabled || !GA_MEASUREMENT_ID || typeof window === 'undefined' || isAdminPath()) return;
  enabled = true;

  window.dataLayer = window.dataLayer || [];
  // gtag yêu cầu đẩy nguyên đối tượng `arguments` vào dataLayer.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Gửi một sự kiện GA4. Không làm gì nếu GA chưa được bật. */
export function trackEvent(name: string, params: Record<string, string | number> = {}): void {
  if (!enabled) return;
  window.gtag('event', name, params);
}
