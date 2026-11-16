// Khóa bản báo cáo đầy đủ bằng MÃ + MẬT KHẨU, chạy hoàn toàn trên trình duyệt (không có máy chủ).
//
// - Mã báo cáo (7 số, giống mẫu 1011001 trước đây): ngày + tháng làm khảo sát + 3 số ngẫu nhiên.
// - Mật khẩu (6 số) = băm(mã + lần cấp + khóa bí mật). Chuyên gia tạo mật khẩu ở trang /admin.
// - Mỗi mật khẩu chỉ mở được 1 lần trên mỗi trình duyệt. Cần mở lại → chuyên gia cấp "lần 2", "lần 3"...
//
// Giới hạn: khóa bí mật nằm trong mã web, người rành kỹ thuật có thể tự tìm ra.
// Đủ để chặn người dùng bình thường; muốn chặn tuyệt đối cần có máy chủ.

const SECRET = 'dgh-gieo-hat::7f3c9a1e5b';
const USED_KEY = 'dgh_unlock_used_v1';
export const MAX_ISSUE = 9;

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

// cyrb53: hàm băm nhanh, ổn định, chạy đồng bộ.
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/** Mật khẩu 6 số cho mã + lần cấp (1..MAX_ISSUE). */
export function passwordFor(code: string, issue = 1): string {
  return String(cyrb53(`${SECRET}|${normalizeCode(code)}|${issue}`) % 1000000).padStart(6, '0');
}

function readUsed(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(USED_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export type UnlockResult = 'ok' | 'wrong' | 'used';

/** Kiểm tra mật khẩu; đúng và chưa dùng → đánh dấu đã dùng trên trình duyệt này. */
export function tryUnlock(code: string, password: string): UnlockResult {
  const pw = password.replace(/\D/g, '');
  const c = normalizeCode(code);
  if (!c || pw.length !== 6) return 'wrong';
  const used = readUsed();
  for (let i = 1; i <= MAX_ISSUE; i++) {
    if (passwordFor(c, i) !== pw) continue;
    const key = `${c}:${i}`;
    if (used.includes(key)) return 'used';
    try {
      localStorage.setItem(USED_KEY, JSON.stringify([...used, key]));
    } catch {
      /* trình duyệt chặn bộ nhớ: vẫn cho mở lần này */
    }
    return 'ok';
  }
  return 'wrong';
}
