import React from 'react';

// Chọn giờ sinh theo hệ 24 giờ: hai ô chọn Giờ (00–23) và Phút (00–59), không có AM/PM.
// Giá trị trả ra: 'HH:MM', hoặc '' khi chưa chọn.

export const isValidTime24 = (v: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

interface Props {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  id?: string;
}

const sel = 'bg-transparent text-center outline-none tabular-nums cursor-pointer [color-scheme:dark]';

export const TimeInput24: React.FC<Props> = ({ value, onChange, className = '', id }) => {
  const m = /^(\d{2}):(\d{2})$/.exec(value || '');
  const h = m ? m[1] : '';
  const mi = m ? m[2] : '';
  return (
    <div className={`${className} flex flex-wrap items-center gap-2 focus-within:border-[#FA5B13]`} role="group" aria-label="Giờ sinh (24 giờ)">
      <select
        id={id}
        aria-label="Giờ"
        value={h}
        onChange={(e) => onChange(e.target.value ? `${e.target.value}:${mi || '00'}` : '')}
        className={`${sel} w-[4.25rem] sm:w-[4.75rem]`}
      >
        <option value="">--</option>
        {HOURS.map((x) => (
          <option key={x} value={x} className="text-black">{x}</option>
        ))}
      </select>
      <span className="text-white/70">giờ</span>
      <select
        aria-label="Phút"
        value={mi}
        disabled={!h}
        onChange={(e) => onChange(h ? `${h}:${e.target.value}` : '')}
        className={`${sel} w-[4.25rem] sm:w-[4.75rem] disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {!h && <option value="">--</option>}
        {MINUTES.map((x) => (
          <option key={x} value={x} className="text-black">{x}</option>
        ))}
      </select>
      <span className="text-white/70">phút</span>
      {value && (
        <button type="button" onClick={() => onChange('')} className="ml-auto text-xs text-white/60 hover:text-white underline underline-offset-2 cursor-pointer">
          Bỏ chọn
        </button>
      )}
    </div>
  );
};
