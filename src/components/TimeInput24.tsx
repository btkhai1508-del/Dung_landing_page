import React from 'react';

// Ô nhập giờ theo hệ 24 giờ (hh:mm), không dùng AM/PM, không phụ thuộc ngôn ngữ trình duyệt.
// Giá trị trả ra: 'HH:MM' (hoặc chuỗi đang gõ khi chưa đủ); '' khi trống.

export const isValidTime24 = (v: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

/**
 * Định dạng khi gõ và tự thêm số 0:
 *  "5" → "05:", "17" → "17:", "7h5" → "07:05", "1745" → "17:45".
 * Nếu người dùng lỡ gõ "pm"/"am" thì tự quy đổi về 24 giờ (5:30 pm → 17:30).
 */
export const formatTime24 = (raw: string, deleting = false): string => {
  const pm = /p\s*\.?m/i.test(raw);
  const am = /a\s*\.?m/i.test(raw);
  let h = '';
  let m = '';
  let stage = 0;
  for (const c of raw) {
    if (/\d/.test(c)) {
      if (stage === 0) {
        h += c;
        if (h.length === 1 && Number(c) > 2) {
          h = '0' + c;
          stage = 1;
        } else if (h.length === 2 && Number(h) > 23) {
          // "24".."29": giờ không thể lớn hơn 23, nên chữ số thứ hai thuộc về phút
          m = h[1];
          h = '0' + h[0];
          stage = 1;
          if (Number(m) > 5) m = '0' + m;
        } else if (h.length === 2) stage = 1;
      } else if (m.length < 2) {
        m += c;
        if (m.length === 1 && Number(c) > 5) m = '0' + c;
      }
    } else if (stage === 0 && h.length === 1) {
      h = '0' + h;
      stage = 1;
    }
  }
  if (h.length === 2) {
    let hh = Number(h);
    if (pm && hh >= 1 && hh <= 11) hh += 12;
    if (am && hh === 12) hh = 0;
    h = String(hh).padStart(2, '0');
  }
  let out = h;
  if (stage >= 1) out += ':' + m;
  if (deleting && out.endsWith(':')) out = out.slice(0, -1);
  return out;
};

interface Props {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  id?: string;
}

export const TimeInput24: React.FC<Props> = ({ value, onChange, className, id }) => (
  <input
    id={id}
    type="text"
    inputMode="numeric"
    autoComplete="off"
    placeholder="hh:mm (ví dụ 17:45)"
    maxLength={8}
    value={value}
    onChange={(e) => onChange(formatTime24(e.target.value, e.target.value.length < value.length))}
    className={className}
  />
);
