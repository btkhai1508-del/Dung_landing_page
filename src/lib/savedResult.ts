// Lưu kết quả khảo sát /bando NGAY TRÊN MÁY NGƯỜI DÙNG (không gửi đi đâu cả).
// Mở lại /ketqua trên cùng trình duyệt, nhập mã báo cáo là xem được kết quả.

import type { ReportInput } from './report';
import { newReportCode } from './unlock';

const STORAGE_KEY = 'dgh_ketqua_v1';

function isReportInput(v: unknown): v is ReportInput {
  const o = v as ReportInput;
  return !!o && typeof o === 'object' && typeof o.birthDate === 'string' && !!o.scores && Array.isArray(o.relatives);
}

/** Trả về false nếu trình duyệt chặn bộ nhớ. */
export function saveResult(input: ReportInput): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    return true;
  } catch {
    return false;
  }
}

/** Kết quả đã lưu trên trình duyệt này (kèm mã báo cáo). */
export function loadResult(): ReportInput | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isReportInput(parsed)) return null;
    // Kết quả cũ (trước khi có mã) → cấp mã và lưu lại
    if (!parsed.code) {
      parsed.code = newReportCode();
      saveResult(parsed);
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Trình duyệt này đã làm khảo sát chưa (mỗi trình duyệt chỉ làm 1 lần). */
export function hasSavedResult(): boolean {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}
