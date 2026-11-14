import React, { useEffect, useRef, useState } from 'react';

// Ô nhập ngày sinh gồm 3 ô: Ngày / Tháng / Năm, có dấu "/" nằm sẵn giữa các ô.
// Giá trị trả ra cho form: 'yyyy-mm-dd' khi hợp lệ, '' khi trống,
// hoặc chuỗi đang gõ "dd/mm/yyyy" khi chưa đủ / sai ngày (để bước kiểm tra báo lỗi).

export const isoToVN = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || '';
};

interface Parts {
  d: string;
  m: string;
  y: string;
}

const parse = (v: string): Parts => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
  if (iso) return { d: iso[3], m: iso[2], y: iso[1] };
  const p = (v || '').split('/');
  return { d: p[0] || '', m: p[1] || '', y: p[2] || '' };
};

const join = ({ d, m, y }: Parts) => {
  let out = d;
  if (m !== '' || y !== '') out += '/' + m;
  if (y !== '') out += '/' + y;
  return out;
};

const toValue = (text: string) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return text;
  const [, dd, mm, yyyy] = m;
  const date = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
  const real = date.getUTCFullYear() === +yyyy && date.getUTCMonth() === +mm - 1 && date.getUTCDate() === +dd;
  return real ? `${yyyy}-${mm}-${dd}` : text;
};

interface BirthDateInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

const cell = 'bg-transparent text-center outline-none tabular-nums placeholder:text-white/40';

export const BirthDateInput: React.FC<BirthDateInputProps> = ({ value, onChange, className = '', id }) => {
  const [parts, setParts] = useState<Parts>(() => parse(value));
  const dRef = useRef<HTMLInputElement>(null);
  const mRef = useRef<HTMLInputElement>(null);
  const yRef = useRef<HTMLInputElement>(null);

  // Đồng bộ khi form bị đặt lại từ bên ngoài
  useEffect(() => {
    if (toValue(join(parts)) !== value) setParts(parse(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const update = (next: Parts) => {
    setParts(next);
    onChange(toValue(join(next)));
  };

  // Gõ ngày: 4–9 chỉ có thể là 1 chữ số nên tự thành 04…09; gõ "/" sau 1 chữ số cũng tự thêm số 0
  const onDay = (raw: string) => {
    let d = raw.replace(/\D/g, '').slice(0, 2);
    let next = false;
    if (d.length === 1 && Number(d) > 3) {
      d = '0' + d;
      next = true;
    } else if (d.length === 2) next = true;
    else if (d.length === 1 && /[\/\-. ]/.test(raw)) {
      d = '0' + d;
      next = true;
    }
    update({ ...parts, d });
    if (next) mRef.current?.focus();
  };
  const onMonth = (raw: string) => {
    let m = raw.replace(/\D/g, '').slice(0, 2);
    let next = false;
    if (m.length === 1 && Number(m) > 1) {
      m = '0' + m;
      next = true;
    } else if (m.length === 2) next = true;
    else if (m.length === 1 && /[\/\-. ]/.test(raw)) {
      m = '0' + m;
      next = true;
    }
    update({ ...parts, m });
    if (next) yRef.current?.focus();
  };
  const onYear = (raw: string) => update({ ...parts, y: raw.replace(/\D/g, '').slice(0, 4) });

  // Xóa lùi khi ô đang trống thì nhảy về ô trước
  const back = (e: React.KeyboardEvent<HTMLInputElement>, field: 'm' | 'y') => {
    if (e.key === 'Backspace' && parts[field] === '') {
      e.preventDefault();
      (field === 'm' ? dRef : mRef).current?.focus();
    }
  };

  // Dán "15/08/1990" hoặc "15081990" vào bất kỳ ô nào
  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (digits.length >= 8) {
      e.preventDefault();
      update({ d: digits.slice(0, 2), m: digits.slice(2, 4), y: digits.slice(4, 8) });
      yRef.current?.focus();
    }
  };

  return (
    <div className={`${className} flex items-center gap-1.5 focus-within:border-[#FA5B13]`} role="group" aria-label="Ngày tháng năm sinh">
      <input
        ref={dRef}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="bday-day"
        aria-label="Ngày"
        placeholder="dd"
        maxLength={3}
        value={parts.d}
        onChange={(e) => onDay(e.target.value)}
        onFocus={(e) => e.target.select()}
        onPaste={onPaste}
        className={`${cell} w-9 sm:w-11`}
      />
      <span className="text-white/55" aria-hidden="true">/</span>
      <input
        ref={mRef}
        type="text"
        inputMode="numeric"
        autoComplete="bday-month"
        aria-label="Tháng"
        placeholder="mm"
        maxLength={3}
        value={parts.m}
        onChange={(e) => onMonth(e.target.value)}
        onKeyDown={(e) => back(e, 'm')}
        onFocus={(e) => e.target.select()}
        onPaste={onPaste}
        className={`${cell} w-9 sm:w-11`}
      />
      <span className="text-white/55" aria-hidden="true">/</span>
      <input
        ref={yRef}
        type="text"
        inputMode="numeric"
        autoComplete="bday-year"
        aria-label="Năm"
        placeholder="yyyy"
        maxLength={4}
        value={parts.y}
        onChange={(e) => onYear(e.target.value)}
        onKeyDown={(e) => back(e, 'y')}
        onFocus={(e) => e.target.select()}
        onPaste={onPaste}
        className={`${cell} w-14 sm:w-16`}
      />
    </div>
  );
};
