// Lưu kết quả khảo sát /bando NGAY TRÊN MÁY NGƯỜI DÙNG (không gửi đi đâu cả).
// - localStorage: mở lại /ketqua trên cùng trình duyệt là thấy kết quả.
// - Link riêng: toàn bộ câu trả lời được mã hóa vào phần "#r=..." của link /ketqua,
//   nên mở được trên máy khác hoặc gửi qua Zalo. Phần sau dấu # không bao giờ được gửi lên máy chủ.

import type { ReportInput } from './report';

const STORAGE_KEY = 'dgh_ketqua_v1';
const HASH_PREFIX = '#r=';

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(code: string): string {
  const b64 = code.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

function isReportInput(v: unknown): v is ReportInput {
  const o = v as ReportInput;
  return !!o && typeof o === 'object' && typeof o.birthDate === 'string' && !!o.scores && Array.isArray(o.relatives);
}

/** Trả về false nếu trình duyệt chặn bộ nhớ (vẫn xem được qua link riêng). */
export function saveResult(input: ReportInput): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    return true;
  } catch {
    return false;
  }
}

/** Đọc kết quả từ link riêng (#r=...) trước, nếu không có thì từ bộ nhớ trình duyệt. */
export function loadResult(): ReportInput | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (hash.startsWith(HASH_PREFIX)) {
    try {
      const parsed = JSON.parse(fromBase64Url(hash.slice(HASH_PREFIX.length)));
      if (isReportInput(parsed)) {
        // Mở link trên máy mới → lưu luôn cho lần sau, rồi bỏ phần #r=... khỏi thanh địa chỉ
        // (để dữ liệu không lọt vào lịch sử trang hay công cụ đo lượt truy cập).
        if (saveResult(parsed)) window.history.replaceState(null, '', window.location.pathname + window.location.search);
        return parsed;
      }
    } catch {
      /* link hỏng → thử bộ nhớ */
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isReportInput(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Link /ketqua chứa sẵn kết quả, mở được trên mọi máy. */
export function buildResultLink(input: ReportInput): string {
  return `${window.location.origin}/ketqua${HASH_PREFIX}${toBase64Url(JSON.stringify(input))}`;
}
