// Mã báo cáo & mở xem kết quả, chạy hoàn toàn trên trình duyệt (không có máy chủ).
//
// - Làm khảo sát xong → nhận MÃ BÁO CÁO 7 số (giống mẫu 1011001 trước đây): ngày + tháng + 3 số ngẫu nhiên.
// - Link /ketqua được gửi trong nhóm Zalo. Mở link, nhập đúng mã → trình duyệt so với kết quả đã lưu
//   trên máy và mở báo cáo đầy đủ. Từ đó xem lại thoải mái, không cần nhập lại.

const UNLOCK_KEY = 'dgh_ketqua_open_v1';

/** Mã báo cáo mới, ví dụ 1611 + 3 số ngẫu nhiên → "1611482". */
export function newReportCode(now = new Date()): string {
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const rnd = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return dd + mm + rnd;
}

/** Chuẩn hoá mã: chỉ giữ chữ số. */
export function normalizeCode(code: string): string {
  return (code || '').replace(/\D/g, '');
}

/** Đã nhập đúng mã cho kết quả này trên trình duyệt này chưa. */
export function isOpened(code: string): boolean {
  try {
    return !!code && localStorage.getItem(UNLOCK_KEY) === code;
  } catch {
    return false;
  }
}

export function markOpened(code: string): void {
  try {
    localStorage.setItem(UNLOCK_KEY, code);
  } catch {
    /* trình duyệt chặn bộ nhớ: vẫn mở trong lần xem này */
  }
}
