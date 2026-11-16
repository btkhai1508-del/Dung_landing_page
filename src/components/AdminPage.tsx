import React, { useState } from 'react';
import { MAX_ISSUE, normalizeCode, passwordFor } from '../lib/unlock';

// Trang /admin cho chuyên gia: dán MÃ (7 số) hoặc LINK kết quả của khách → lấy mật khẩu mở khóa bản đầy đủ.
// Mỗi mật khẩu chỉ mở được 1 lần trên mỗi trình duyệt; khách cần mở lại thì cấp "lần 2", "lần 3"...

// SHA-256 của khóa vào trang (khóa gốc lưu ở file ADMIN_PIN.local.txt trên máy, không đưa lên GitHub).
const PIN_HASH = 'b816b423b480679655dd74645a03d40f10f07b4f7b744bdc24a70ec24033c580';
const SESSION_KEY = 'dgh_admin_ok';

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Lấy mã từ link /ketqua#r=... hoặc từ chuỗi người dùng dán vào. */
function extractCode(raw: string): string {
  const text = raw.trim();
  const i = text.indexOf('#r=');
  if (i !== -1) {
    try {
      const b64 = text.slice(i + 3).replace(/-/g, '+').replace(/_/g, '/');
      const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
      const json = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
      return normalizeCode(json.code || '');
    } catch {
      return '';
    }
  }
  return normalizeCode(text);
}

const readOk = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

const card = 'rounded-2xl bg-white/[0.05] p-5 sm:p-6';
const input = 'w-full rounded-xl bg-black/40 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[#FA5B13]';

export const AdminPage: React.FC = () => {
  const [ok, setOk] = useState(readOk);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [raw, setRaw] = useState('');
  const [issue, setIssue] = useState(1);
  const [copied, setCopied] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((await sha256(pin.trim())) === PIN_HASH) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* bỏ qua */
      }
      setOk(true);
    } else setPinError('Sai khóa quản trị.');
  };

  const code = extractCode(raw);
  const valid = code.length === 7;
  const pw = valid ? passwordFor(code, issue) : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* chọn tay */
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0d0f14] text-white font-be-vietnam flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Dũng Gieo Hạt · Quản trị</p>
          <h1 className="text-3xl sm:text-4xl font-playfair-heading italic">Cấp mật khẩu xem kết quả</h1>
        </header>

        {!ok ? (
          <form onSubmit={login} className={`${card} space-y-4`}>
            <input type="password" value={pin} onChange={(e) => { setPin(e.target.value); setPinError(''); }}
              placeholder="Khóa quản trị" aria-label="Khóa quản trị" className={input} autoFocus />
            {pinError && <p role="alert" className="text-sm text-red-300">{pinError}</p>}
            <button type="submit" className="w-full rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] py-3 font-bold transition cursor-pointer">Vào</button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className={`${card} space-y-4`}>
              <label className="block space-y-2">
                <span className="text-sm text-white/70">Mã báo cáo (7 số) hoặc link kết quả khách gửi</span>
                <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={3}
                  placeholder="1611482 hoặc https://…/ketqua#r=…" className={`${input} resize-none`} />
              </label>
              <label className="block space-y-2">
                <span className="text-sm text-white/70">Lần cấp (khách cần mở lại thì tăng lên)</span>
                <select value={issue} onChange={(e) => setIssue(Number(e.target.value))} className={input}>
                  {Array.from({ length: MAX_ISSUE }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>Lần {n}</option>
                  ))}
                </select>
              </label>
            </div>

            {raw.trim() && !valid && <p className="text-sm text-red-300 text-center">Không đọc được mã. Mã gồm 7 chữ số, ví dụ 1611482.</p>}

            {valid && (
              <div className={`${card} space-y-3 text-center`}>
                <p className="text-sm text-white/60">Mã <span className="font-mono">{code}</span> · lần {issue}</p>
                <p className="font-mono text-5xl font-bold tracking-[0.2em]">{pw}</p>
                <button onClick={copy} className="rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] px-6 py-2.5 text-sm font-bold transition cursor-pointer">
                  {copied ? 'Đã sao chép ✓' : 'Sao chép mật khẩu'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
