import React, { useEffect, useState } from 'react';

// Ô nhập ngày sinh luôn theo dạng dd/mm/yyyy (không phụ thuộc ngôn ngữ trình duyệt).
// Giá trị trả ra cho form: 'yyyy-mm-dd' khi hợp lệ, '' khi trống,
// hoặc chính chuỗi đang gõ khi chưa đủ / sai ngày (để bước kiểm tra báo lỗi).

export const isoToVN = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || '';
};

const formatDigits = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
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
        const next = formatDigits(e.target.value);
        setText(next);
        onChange(toValue(next));
      }}
      className={className}
    />
  );
};
