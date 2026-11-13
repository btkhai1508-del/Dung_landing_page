import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../lib/submitToSheet';

// Trang quản trị đơn giản: duyệt số điện thoại đã làm khảo sát bằng nút ✓ (cho xem kết quả) và ✕ (từ chối).
// Khóa quản trị được kiểm tra ở phía Apps Script (Script properties → ADMIN_KEY), không lưu trong mã web.

type Status = 'pending' | 'approved' | 'rejected';
interface Row {
  row: number;
  code: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  status: Status;
}
type Filter = Status | 'all';

const KEY_STORE = 'dgh_admin_key';
const PAGE = 100;

const ERRORS: Record<string, string> = {
  bad: 'Sai khóa quản trị. Vui lòng nhập lại.',
  nokey: 'Chưa đặt khóa quản trị trong Apps Script (Script properties → ADMIN_KEY).',
  locked: 'Nhập sai quá nhiều lần, vui lòng thử lại sau khoảng 1 giờ.',
  row_changed: 'Danh sách đã thay đổi, đang tải lại.',
  network: 'Chưa kết nối được tới hệ thống. Vui lòng kiểm tra mạng và thử lại.',
  unknown: 'Có lỗi xảy ra, vui lòng thử lại.',
};

async function call(params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${GOOGLE_SCRIPT_URL}?${qs}`);
  return res.json();
}

const readKey = () => {
  try {
    return sessionStorage.getItem(KEY_STORE) || '';
  } catch {
    return '';
  }
};

const LABEL: Record<Filter, string> = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối', all: 'Tất cả' };

export const AdminPage: React.FC = () => {
  const [key, setKey] = useState(readKey);
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>('pending');
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState<number | null>(null);
  const [shown, setShown] = useState(PAGE);
  const keyRef = useRef(key);
  keyRef.current = key;

  // không cho công cụ tìm kiếm lập chỉ mục trang quản trị
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    const prev = document.title;
    document.title = 'Duyệt kết quả';
    return () => {
      document.head.removeChild(meta);
      document.title = prev;
    };
  }, []);

  const load = useCallback(async (k: string, quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const data = await call({ action: 'adminlist', key: k });
      if (data && data.ok) {
        setRows(data.rows as Row[]);
        setError('');
      } else {
        const code = (data && data.error) || 'unknown';
        setError(ERRORS[code] || ERRORS.unknown);
        if (code === 'bad' || code === 'nokey' || code === 'locked') {
          setKey('');
          setRows(null);
          try {
            sessionStorage.removeItem(KEY_STORE);
          } catch {
            /* bỏ qua */
          }
        }
      }
    } catch {
      setError(ERRORS.network);
    }
    if (!quiet) setLoading(false);
  }, []);

  // tải khi đã có khóa, và tự làm mới mỗi 30 giây
  useEffect(() => {
    if (!key) return;
    load(key);
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && busy === null) load(keyRef.current, true);
    }, 30000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, load]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const k = input.trim();
    if (!k) return;
    try {
      sessionStorage.setItem(KEY_STORE, k);
    } catch {
      /* bỏ qua */
    }
    setError('');
    setKey(k);
    setInput('');
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(KEY_STORE);
    } catch {
      /* bỏ qua */
    }
    setKey('');
    setRows(null);
  };

  // Bấm ✓/✕: đặt trạng thái; bấm lại đúng nút đang sáng thì trả về "chờ duyệt"
  const set = async (r: Row, target: 'approved' | 'rejected') => {
    const next: Status = r.status === target ? 'pending' : target;
    setBusy(r.row);
    setRows((cur) => (cur ? cur.map((x) => (x.row === r.row ? { ...x, status: next } : x)) : cur));
    try {
      const data = await call({ action: 'setstatus', key, row: String(r.row), phone: r.phone, status: next });
      if (!data || !data.ok) {
        setError(ERRORS[(data && data.error) || 'unknown'] || ERRORS.unknown);
        await load(key, true);
      } else {
        setError('');
      }
    } catch {
      setError(ERRORS.network);
      await load(key, true);
    }
    setBusy(null);
  };

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, rejected: 0 };
    (rows || []).forEach((r) => c[r.status]++);
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qd = q.replace(/\D/g, '');
    return (rows || []).filter((r) => {
      if (filter !== 'all' && r.status !== filter) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || r.code.includes(q) || (qd.length >= 3 && r.phone.replace(/\D/g, '').includes(qd));
    });
  }, [rows, filter, query]);

  useEffect(() => setShown(PAGE), [filter, query]);

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-[#0d0f14] text-white font-be-vietnam">{children}</div>
  );

  // ----- Đăng nhập -----
  if (!key) {
    return shell(
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <form onSubmit={login} className="w-full max-w-sm space-y-5">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Quản trị</p>
            <h1 className="font-playfair-heading italic font-medium text-4xl">Duyệt kết quả</h1>
            <p className="text-sm text-white/65">Nhập khóa quản trị để xem danh sách và duyệt.</p>
          </div>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Khóa quản trị"
            className="w-full py-3.5 px-4 rounded-2xl bg-white/10 text-white text-lg placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#FA5B13]/70"
          />
          {error && <p role="alert" className="text-sm text-red-300 font-medium leading-relaxed">{error}</p>}
          <button type="submit" className="w-full py-3.5 rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] font-bold transition cursor-pointer">
            Đăng nhập
          </button>
        </form>
      </main>
    );
  }

  // ----- Danh sách -----
  return shell(
    <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Quản trị</p>
          <h1 className="font-playfair-heading italic font-medium text-3xl sm:text-4xl">Duyệt kết quả khảo sát</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => load(key)} disabled={loading} className="rounded-full bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-semibold transition cursor-pointer disabled:opacity-60">
            {loading ? 'Đang tải…' : 'Làm mới'}
          </button>
          <button onClick={logout} className="rounded-full px-4 py-2 text-sm text-white/60 hover:text-white transition cursor-pointer">Đăng xuất</button>
        </div>
      </header>

      <p className="text-sm text-white/70 leading-relaxed">
        Bấm <span className="font-bold text-emerald-300">✓</span> để cho phép số này xem kết quả. Bấm <span className="font-bold text-red-300">✕</span> để từ chối: người dùng sẽ thấy trang yêu cầu vào nhóm Zalo. Bấm lại nút đang sáng để trả về “chờ duyệt”.
      </p>

      {error && <p role="alert" className="text-sm text-red-300 font-medium">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        {(['pending', 'approved', 'rejected', 'all'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${filter === f ? 'bg-[#FA5B13] text-white' : 'bg-white/10 text-white/75 hover:bg-white/15'}`}
          >
            {LABEL[f]}
            {f !== 'all' && <span className="ml-1.5 opacity-80">{counts[f]}</span>}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm theo số điện thoại, tên hoặc mã"
        className="w-full py-3 px-4 rounded-2xl bg-white/10 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#FA5B13]/70"
      />

      {rows === null ? (
        <p className="text-white/60">Đang tải danh sách…</p>
      ) : filtered.length === 0 ? (
        <p className="text-white/60 py-8 text-center">Không có số nào trong mục này.</p>
      ) : (
        <>
          <ul className="space-y-2.5">
            {filtered.slice(0, shown).map((r) => (
              <li key={r.row} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5">
                <div className="min-w-0">
                  <p className="font-semibold text-lg tabular-nums tracking-wide">{r.phone}</p>
                  <p className="text-sm text-white/70 truncate">{r.name || 'Không ghi tên'}</p>
                  <p className="text-xs text-white/45">Mã {r.code || '—'} · {r.time}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <button
                    onClick={() => set(r, 'approved')}
                    disabled={busy === r.row}
                    aria-label={`Duyệt ${r.phone}`}
                    aria-pressed={r.status === 'approved'}
                    title="Duyệt: cho xem kết quả"
                    className={`h-12 w-12 rounded-full text-2xl font-bold transition cursor-pointer disabled:opacity-50 ${r.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-300 hover:bg-emerald-500/30'}`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => set(r, 'rejected')}
                    disabled={busy === r.row}
                    aria-label={`Từ chối ${r.phone}`}
                    aria-pressed={r.status === 'rejected'}
                    title="Từ chối: yêu cầu vào nhóm Zalo"
                    className={`h-12 w-12 rounded-full text-2xl font-bold transition cursor-pointer disabled:opacity-50 ${r.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-white/10 text-red-300 hover:bg-red-500/30'}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {filtered.length > shown && (
            <button onClick={() => setShown((n) => n + PAGE)} className="w-full rounded-full bg-white/10 hover:bg-white/15 py-3 text-sm font-semibold transition cursor-pointer">
              Hiện thêm ({filtered.length - shown} số nữa)
            </button>
          )}
        </>
      )}
    </main>
  );
};
