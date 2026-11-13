import React, { useEffect, useState } from 'react';

// Ô nhập ngày sinh luôn theo dạng dd/mm/yyyy (không phụ thuộc ngôn ngữ trình duyệt).
// Giá trị trả ra cho form: 'yyyy-mm-dd' khi hợp lệ, '' khi trống,
// hoặc chính chuỗi đang gõ khi chưa đủ / sai ngày (để bước kiểm tra báo lỗi).

export const isoToVN = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || '';
};

/**
 * Định dạng khi gõ thành dd/mm/yyyy và tự thêm số 0:
 *  - ngày bắt đầu bằng 4–9 hoặc tháng bắt đầu bằng 2–9 chỉ có thể là 1 chữ số → "9" thành "09/";
 *  - gõ dấu phân cách (/ - . hoặc cách) sau 1 chữ số → "1/" thành "01/".
 * Khi người dùng đang xóa (backspace) thì không tự thêm dấu "/" ở cuối.
 */
export const formatTyped = (raw: string, deleting = false): string => {
  let day = '';
  let month = '';
  let year = '';
  let stage = 0;
  for (const c of raw) {
    if (/\d/.test(c)) {
      if (stage === 0) {
        day += c;
        if (day.length === 1 && Number(c) > 3) {
          day = '0' + c;
          stage = 1;
        } else if (day.length === 2) stage = 1;
      } else if (stage === 1) {
        month += c;
        if (month.length === 1 && Number(c) > 1) {
          month = '0' + c;
          stage = 2;
        } else if (month.length === 2) stage = 2;
      } else if (year.length < 4) {
        year += c;
      }
    } else if (stage === 0 && day.length === 1) {
      day = '0' + day;
      stage = 1;
    } else if (stage === 1 && month.length === 1) {
      month = '0' + month;
      stage = 2;
    }
  }
  let out = day;
  if (stage >= 1) out += '/' + month;
  if (stage >= 2) out += '/' + year;
  if (deleting && out.endsWith('/')) out = out.slice(0, -1);
  return out;
};

const toValue = (text: string) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return text;
  const [, dd, mm, yyyy] = m;
  const date = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
  const real =
    date.getUTCFullYear() === +yyyy && date.getUTCMonth() === +mm - 1 && date.getUTCDate() === +dd;
  return real ? `${yyyy}-${mm}-${dd}` : text;
};

interface BirthDateInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

export const BirthDateInput: React.FC<BirthDateInputProps> = ({ value, onChange, className, id }) => {
  const [text, setText] = useState(() => isoToVN(value));

  // Đồng bộ khi form bị đặt lại từ bên ngoài
  useEffect(() => {
    if (toValue(text) !== value) setText(isoToVN(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      placeholder="dd/mm/yyyy"
      maxLength={10}
      value={text}
      onChange={(e) => {
        const next = formatTyped(e.target.value, e.target.value.length < text.length);
        setText(next);
        onChange(toValue(next));
      }}
      className={className}
    />
  );
};
