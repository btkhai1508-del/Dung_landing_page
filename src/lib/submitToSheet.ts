// Gửi dữ liệu form về Google Apps Script (google-apps-script.js).
// Apps Script dùng `sheet` để chọn đúng tab, và `fields` (JSON: tiêu đề cột → giá trị,
// giữ nguyên thứ tự) để ghi thành một dòng theo hàng tiêu đề của tab đó.

export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyVvzC75rDJbWAJ-J-xHxG34x0MAsrJvvFAfnNKh_0PVN7YfqK9y1ttFKYHoZtKYzVghA/exec';

export const SHEET_TABS = {
  bando: 'Quà Tặng Tầng 1',
  affiliate: 'Affiliate',
} as const;

interface SubmitOptions {
  /** Tên tab trong Google Sheet. Bỏ trống → tab đầu tiên (tab Thông tin). */
  sheet?: string;
  /** Mã form, ví dụ 'bando', 'THU_THACH_AFFILIATE'. */
  form: string;
  name: string;
  phone: string;
  email: string;
  /** Các cột sẽ ghi vào sheet, theo đúng thứ tự. */
  fields: Record<string, string>;
}

export async function submitToSheet({ sheet, form, name, phone, email, fields }: SubmitOptions) {
  const body = new URLSearchParams();
  if (sheet) body.append('sheet', sheet);
  body.append('form', form);
  body.append('name', name);
  body.append('phone', phone);
  body.append('email', email);
  body.append('fields', JSON.stringify(fields));

  // Chỉ gửi MỘT request để tránh ghi trùng dòng trong sheet.
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: body.toString(),
  });
}

/**
 * Hỏi Apps Script: số điện thoại này đã làm khảo sát /bando chưa?
 * Trả về true/false; null nếu không kiểm tra được (mất mạng...) — khi đó không chặn người dùng.
 */
export async function checkPhoneExists(phone: string): Promise<boolean | null> {
  try {
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=checkphone&phone=${encodeURIComponent(phone)}`);
    const data = await res.json();
    return data && data.ok ? !!data.exists : null;
  } catch {
    return null;
  }
}
