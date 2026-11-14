import React, { useEffect, useMemo, useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../lib/submitToSheet';
import { buildReport, parseBirthDate, Report, ReportInput, RelativeInput } from '../lib/report';
import { AREAS, AreaKey } from '../data/lifeWheel';
import { ZaloPopups, ZaloOpenButton, ZALO_GROUP_LINK } from './ZaloPopup';
import { AiDisclaimer } from './AiDisclaimer';

// ---------- Tra cứu dữ liệu từ Apps Script ----------
interface LookupRecord {
  code: string;
  name: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  city: string;
  occupation: string;
  familyTime: string;
  scores: Partial<Record<AreaKey, number | null>>;
  priority: string;
  desire: string;
  obstacles: string[];
  support: string[];
  relatives: RelativeInput[];
  relativesText: string;
}

type LookupError = 'invalid' | 'notfound' | 'locked' | 'network' | 'format';

function parseRelativesText(text: string): RelativeInput[] {
  const out: RelativeInput[] = [];
  const re = /Người \d+: (.*?) \((.*?), (\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}|Chưa rõ NS), (Nam|Nữ|Chưa rõ GT)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text || ''))) {
    out.push({ name: m[1], relationship: m[2], birthDate: m[3] === 'Chưa rõ NS' ? '' : m[3], gender: m[4] === 'Chưa rõ GT' ? '' : m[4] });
  }
  return out;
}

async function fetchRecord(phone: string): Promise<{ record?: LookupRecord; error?: LookupError; gated?: boolean }> {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=result&phone=${encodeURIComponent(phone)}`;
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();
    // Chưa được quản trị viên duyệt (hoặc bị từ chối): chỉ yêu cầu vào nhóm Zalo, không trả dữ liệu
    if (data && data.ok && data.approved === false) return { gated: true };
    if (data && data.ok && data.record) return { record: data.record as LookupRecord };
    return { error: (data && data.error) as LookupError || 'notfound' };
  } catch {
    return { error: 'network' };
  }
}

function toInput(r: LookupRecord): ReportInput {
  const relatives = (r.relatives && r.relatives.length ? r.relatives : parseRelativesText(r.relativesText)).filter(
    (x) => parseBirthDate(x.birthDate)
  );
  const scores: Partial<Record<AreaKey, number>> = {};
  AREAS.forEach((a) => {
    const v = r.scores?.[a.key];
    if (typeof v === 'number') scores[a.key] = v;
  });
  return {
    name: r.name,
    code: r.code,
    birthDate: r.birthDate,
    birthTime: r.birthTime,
    gender: r.gender,
    city: r.city,
    occupation: r.occupation,
    familyTime: r.familyTime,
    relatives,
    scores,
    priority: r.priority,
    desire: r.desire,
    obstacles: r.obstacles || [],
    support: r.support || [],
  };
}

const ERROR_TEXT: Record<LookupError, string> = {
  invalid: 'Vui lòng nhập đúng số điện thoại bạn đã dùng khi làm khảo sát.',
  notfound: 'Chưa tìm thấy kết quả của số điện thoại này. Hãy kiểm tra lại số, hoặc làm khảo sát Bản Đồ Hạnh Phúc trước.',
  locked: 'Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau khoảng 1 giờ.',
  network: 'Chưa kết nối được tới hệ thống. Vui lòng kiểm tra mạng và thử lại.',
  format: 'Dữ liệu của bạn chưa đủ để lập báo cáo (thiếu ngày sinh). Vui lòng liên hệ ban hỗ trợ.',
};

// ---------- Giao diện ----------
const BG = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85';
const heading = 'font-playfair-heading italic font-medium';
const eyebrow = 'text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]';
const soft = 'rounded-2xl bg-white/[0.05] p-5 sm:p-6';
const inputCls =
  'w-full py-3.5 px-4 rounded-2xl bg-black/35 text-white text-lg tracking-wide placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#FA5B13]/70 transition';

const Section: React.FC<{ id: string; label: string; title: string; intro?: string; children: React.ReactNode }> = ({ id, label, title, intro, children }) => (
  <section id={id} className="scroll-mt-24 space-y-8">
    <header className="space-y-3">
      <p className={eyebrow}>{label}</p>
      <h2 className={`text-3xl sm:text-4xl text-white leading-[1.2] ${heading}`}>{title}</h2>
      {intro && <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-[62ch]">{intro}</p>}
    </header>
    {children}
  </section>
);

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{children}</h3>
);

const Bullets: React.FC<{ items: string[]; tone?: 'good' | 'care' }> = ({ items, tone = 'good' }) => (
  <ul className="space-y-2.5">
    {items.map((t) => (
      <li key={t} className="flex gap-3 text-[15px] sm:text-base text-white/85 leading-relaxed">
        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'good' ? 'bg-[#FA5B13]' : 'bg-white/40'}`} />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const Pair: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div>
    <p className="text-sm text-[#FFA877] font-semibold">{label}</p>
    <p className="mt-1 text-[15px] sm:text-base text-white/85 leading-relaxed">{text}</p>
  </div>
);

// ---------- Biểu đồ radar ----------
const Radar: React.FC<{ items: { label: string; score: number }[] }> = ({ items }) => {
  const n = items.length;
  const pt = (i: number, r: number) => {
    const a = ((Math.PI * 2) / n) * i - Math.PI / 2;
    return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
  };
  const poly = (r: (i: number) => number) => items.map((_, i) => pt(i, r(i)).join(',')).join(' ');
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[320px] mx-auto overflow-visible" role="img" aria-label="Biểu đồ bánh xe hạnh phúc">
      {[0.2, 0.4, 0.6, 0.8, 1].map((l) => (
        <polygon key={l} points={poly(() => 100 * l)} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
      ))}
      {items.map((_, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1="150" y1="150" x2={x} y2={y} stroke="rgba(255,255,255,0.16)" />;
      })}
      <polygon points={poly((i) => (items[i].score / 10) * 100)} fill="rgba(250,91,19,0.32)" stroke="#FA5B13" strokeWidth="2.5" />
      {items.map((it, i) => {
        const [x, y] = pt(i, (it.score / 10) * 100);
        return <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#FA5B13" strokeWidth="2" />;
      })}
    </svg>
  );
};

// ---------- Lưới biểu đồ ngày sinh 3×3 ----------
const BirthGrid: React.FC<{ digits: Report['numerology']['chart']['digits'] }> = ({ digits }) => {
  const order = [3, 6, 9, 2, 5, 8, 1, 4, 7];
  return (
    <div className="grid grid-cols-3 gap-2.5 w-full max-w-[260px]">
      {order.map((n) => {
        const d = digits.find((x) => x.n === n)!;
        return (
          <div
            key={n}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center ${d.count ? 'bg-[#FA5B13]/25' : 'bg-white/[0.05]'}`}
          >
            <span className={`text-2xl ${heading} ${d.count ? 'text-white' : 'text-white/30'}`}>{n}</span>
            <span className={`text-xs ${d.count ? 'text-[#FFA877]' : 'text-white/25'}`}>{d.count ? '×'.repeat(1) + d.count : '—'}</span>
          </div>
        );
      })}
    </div>
  );
};

// ---------- Lá số Tử vi ----------
const CHI_GRID: (number | 'center')[][] = [
  [5, 6, 7, 8],
  [4, 'center', 'center', 9],
  [3, 'center', 'center', 10],
  [2, 1, 0, 11],
];
const CUC_WORD: Record<number, string> = { 2: 'Nhị', 3: 'Tam', 4: 'Tứ', 5: 'Ngũ', 6: 'Lục' };
const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const TuViChart: React.FC<{ report: Report }> = ({ report }) => {
  const chart = report.tuvi.chart!;
  const byChi = new Map(chart.palaces.map((p) => [p.chi, p]));
  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
      {CHI_GRID.flatMap((row, ri) =>
        row.map((c, ci) => {
          if (c === 'center') {
            if (ri === 1 && ci === 1) {
              return (
                <div key="center" className="col-span-2 row-span-2 rounded-2xl bg-white/[0.04] p-3 sm:p-5 flex flex-col justify-center text-center">
                  <p className={`text-lg sm:text-2xl text-white ${heading}`}>{report.name || 'Lá số của bạn'}</p>
                  <p className="mt-1 text-[11px] sm:text-sm text-white/60">{report.tuvi.lunarText}</p>
                  <p className="mt-2 text-[11px] sm:text-sm text-white/80">{report.tuvi.canChi} · {report.tuvi.amDuong}</p>
                  <p className="text-[11px] sm:text-sm text-[#FFA877]">{report.tuvi.napAm.name}</p>
                  <p className="text-[11px] sm:text-sm text-white/80">{chart.cuc.hanh} {CUC_WORD[chart.cuc.num]} Cục</p>
                </div>
              );
            }
            return null;
          }
          const p = byChi.get(CHI_NAMES[c]);
          const isMenh = p?.name === 'Mệnh';
          const isThan = p?.name === chart.thanPalace;
          return (
            <div
              key={c}
              className={`rounded-xl p-2 sm:p-3 min-h-[92px] sm:min-h-[120px] ${isMenh ? 'bg-[#FA5B13]/25' : 'bg-white/[0.05]'}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`text-[11px] sm:text-sm font-semibold ${isMenh ? 'text-white' : 'text-[#FFA877]'}`}>{p?.name}{isThan && !isMenh ? ' · Thân' : isThan && isMenh ? ' · Thân' : ''}</span>
                <span className="text-[10px] sm:text-xs text-white/45">{CHI_NAMES[c]}</span>
              </div>
              <ul className="mt-1.5 space-y-0.5">
                {p?.stars.map((s) => (
                  <li key={s.name} className="text-[11px] sm:text-sm text-white leading-snug">
                    {s.name} <span className="text-white/45">({s.bright})</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

// ---------- Trang chính ----------
export const ResultPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LookupError | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [gated, setGated] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [report]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = phone.replace(/\D/g, '');
    if (p.length < 9) {
      setError('invalid');
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetchRecord(p);
    setLoading(false);
    if (res.gated) {
      setGated(true);
      return;
    }
    if (!res.record) {
      setError(res.error || 'notfound');
      return;
    }
    const built = buildReport(toInput(res.record));
    if (!built) {
      setError('format');
      return;
    }
    setGated(false);
    setReport(built);
  };

  const shell = (children: React.ReactNode) => (
    <div className="relative min-h-screen w-full text-white font-be-vietnam bg-[#0d0f14]">
      <div className="fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f14]/80 via-[#0d0f14]/85 to-[#0d0f14]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );

  // ----- Chưa được duyệt: cần vào nhóm Zalo -----
  if (gated && !report) {
    return shell(
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-7 text-center">
          <div className="space-y-3">
            <p className={eyebrow}>Dũng Gieo Hạt</p>
            <h1 className={`text-3xl sm:text-4xl text-white leading-[1.2] ${heading}`}>
              Vui lòng tham gia nhóm Zalo Gieo Hạt để được nhận kết quả
            </h1>
            <p className="text-base text-white/75 leading-relaxed">
              Cảm ơn bạn đã làm khảo sát. Kết quả của bạn sẽ được mở sau khi bạn vào nhóm Zalo Gieo Hạt và được xác nhận. Bạn vào nhóm rồi quay lại đây kiểm tra sau ít phút nhé.
            </p>
          </div>
          <img
            src="/assets/zalo-gh3-qr.jpg"
            alt="Mã QR vào nhóm Zalo Gieo Hạt"
            width={208}
            height={208}
            className="mx-auto h-[208px] w-[208px] rounded-2xl bg-white object-contain p-2"
          />
          <a
            href={ZALO_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] py-4 text-base font-bold text-white transition"
          >
            Vào nhóm Zalo Gieo Hạt
          </a>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={(e) => submit(e as unknown as React.FormEvent)}
              disabled={loading}
              className="text-sm font-semibold text-[#FFB48A] hover:text-white underline underline-offset-4 transition cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Đang kiểm tra…' : 'Mình đã vào nhóm, kiểm tra lại'}
            </button>
            <button type="button" onClick={() => setGated(false)} className="text-sm text-white/55 hover:text-white transition cursor-pointer">
              Nhập số điện thoại khác
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ----- Màn tra cứu -----
  if (!report) {
    return shell(
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <header className="space-y-3 text-center">
            <p className={eyebrow}>Dũng Gieo Hạt</p>
            <h1 className={`text-4xl sm:text-5xl text-white leading-[1.15] ${heading}`}>Kết quả của bạn</h1>
            <p className="text-base text-white/70 leading-relaxed">
              Nhập số điện thoại bạn đã dùng khi làm khảo sát để mở bản đồ hạnh phúc cá nhân của bạn.
            </p>
          </header>
          <form onSubmit={submit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label htmlFor="rp-phone" className="block text-sm font-semibold text-white/80">Số điện thoại</label>
              <input id="rp-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" value={phone}
                onChange={(e) => setPhone(e.target.value)} className={inputCls} />
            </div>
            {error && <p role="alert" className="text-sm text-red-300 font-medium leading-relaxed">{ERROR_TEXT[error]}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] disabled:opacity-60 text-white text-base font-bold tracking-wide transition cursor-pointer">
              {loading ? 'Đang tra cứu…' : 'Xem kết quả'}
            </button>
          </form>
          <p className="text-center text-xs text-white/45 leading-relaxed">
            Báo cáo chỉ mở được bằng đúng số điện thoại bạn đã đăng ký. Chưa làm khảo sát? Hãy vào trang Bản Đồ Hạnh Phúc để bắt đầu.
          </p>
        </div>
      </main>
    );
  }

  return shell(<ReportView report={report} onBack={() => setReport(null)} />);
};

// ---------- Chip mức điểm & loại liên kết (Bánh xe cuộc đời) ----------
const LEVEL_CHIP: Record<string, string> = {
  alarm: 'bg-red-500/25 text-red-100',
  low: 'bg-[#FA5B13]/25 text-[#FFB48A]',
  mid: 'bg-white/10 text-white/80',
  good: 'bg-emerald-500/20 text-emerald-100',
  full: 'bg-[#FFD27A]/25 text-[#FFE3AE]',
};
const LevelChip: React.FC<{ tone: string; label: string }> = ({ tone, label }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_CHIP[tone] || LEVEL_CHIP.mid}`}>{label}</span>
);
const LINK_TONE: Record<string, { label: string; chip: string }> = {
  imbalance: { label: 'Có thể đang đánh đổi', chip: 'bg-red-500/25 text-red-100' },
  bothLow: { label: 'Cùng thấp, kéo nhau xuống', chip: 'bg-[#FA5B13]/25 text-[#FFB48A]' },
  support: { label: 'Điểm tựa để nâng', chip: 'bg-emerald-500/20 text-emerald-100' },
  bothHigh: { label: 'Cùng mạnh, nâng đỡ nhau', chip: 'bg-[#FFD27A]/25 text-[#FFE3AE]' },
};

// ---------- Liên hệ hỗ trợ & phân tích chuyên sâu cho lĩnh vực trọng yếu ----------
type Wheel = Report['wheel'];

const SupportCta: React.FC<{ contact: Wheel['contact']; reason: string; subject: string }> = ({ contact, reason, subject }) => (
  <div className="rounded-2xl bg-[#FA5B13]/20 p-5 sm:p-6 space-y-4">
    <p className="text-[15px] sm:text-base text-white/90 leading-relaxed">{reason}</p>
    <p className="text-base sm:text-lg text-white leading-relaxed">
      <strong className="font-semibold">Liên hệ để có giải pháp nâng cao:</strong> Zalo{' '}
      <a href={contact.zaloLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">{contact.phone}</a>
      {' '}hoặc email{' '}
      <a href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`} className="font-semibold underline underline-offset-4 whitespace-nowrap">{contact.email}</a>.
    </p>
    <div className="flex flex-wrap gap-3">
      <a href={contact.zaloLink} target="_blank" rel="noopener noreferrer"
        className="rounded-full bg-[#FA5B13] hover:bg-[#e24f0d] px-6 py-3 text-sm sm:text-base font-bold text-white transition">
        Nhắn Zalo {contact.phone}
      </a>
      <a href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}
        className="rounded-full bg-white/12 hover:bg-white/20 px-6 py-3 text-sm sm:text-base font-semibold text-white transition">
        Gửi email
      </a>
    </div>
  </div>
);

const FocusSection: React.FC<{ w: Wheel }> = ({ w }) => {
  if (!w.focus.length) return null;
  const names = w.focus.map((f) => f.label).join(', ');
  return (
    <div id="can-chu-y" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <p className={eyebrow}>Cần quan tâm đặc biệt</p>
        <h3 className={`text-2xl sm:text-3xl text-white leading-[1.25] ${heading}`}>
          {w.focus.length === 1 ? `${names} cần được chăm sóc kỹ hơn` : `${w.focus.length} lĩnh vực cần được chăm sóc kỹ hơn: ${names}`}
        </h3>
        <p className="text-[15px] sm:text-base text-white/80 leading-relaxed max-w-[64ch]">
          Sức khỏe, tài chính và sự nghiệp là ba trụ cột kéo theo phần lớn các lĩnh vực còn lại. Khi một trụ đang dưới 6 điểm hoặc thấp hơn hẳn các lĩnh vực khác, bạn nên xem kỹ phần phân tích dưới đây và có kế hoạch cụ thể cho 90 ngày tới.
        </p>
      </div>

      {w.focus.map((f) => (
        <article key={f.key} className="rounded-3xl bg-white/[0.05] p-5 sm:p-7 space-y-6">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h4 className={`text-2xl sm:text-3xl text-white ${heading}`}>{f.label} <span className="text-[#FA5B13]">{f.score}/10</span></h4>
              <LevelChip tone={f.levelTone} label={f.level} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{f.reason}</span>
            </div>
            <p className="text-[15px] sm:text-base text-white/90 leading-relaxed">{f.severity}</p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{f.why}</p>
          </header>

          <div className="grid sm:grid-cols-2 gap-7">
            <div className="space-y-3"><Sub>Dấu hiệu thường gặp</Sub><Bullets items={f.signs} tone="care" /></div>
            <div className="space-y-3"><Sub>Nguyên nhân thường gặp</Sub><Bullets items={f.causes} tone="care" /></div>
          </div>

          <div className="space-y-3">
            <Sub>Lĩnh vực này đang kéo theo điều gì</Sub>
            <Bullets items={f.ripples} />
            {f.linked.length > 0 && (
              <ul className="space-y-2 pt-1">
                {f.linked.map((r) => (
                  <li key={r.label} className="text-[15px] text-white/85 leading-relaxed">
                    <span className="font-semibold text-[#FFA877]">Trong bánh xe của bạn, với {r.label} ({r.score}/10): </span>{r.text}
                  </li>
                ))}
              </ul>
            )}
            {f.alsoLow.length > 0 && (
              <p className="text-[15px] text-white/85 leading-relaxed">
                <span className="font-semibold text-[#FFA877]">Lưu ý: </span>
                {f.alsoLow.map((a) => `${a.label} (${a.score}/10)`).join(', ')} cũng đang thấp, nên các lĩnh vực này có thể đang kéo nhau xuống. Hãy xử lý theo thứ tự ưu tiên thay vì làm tất cả cùng lúc.
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <Pair label="Góc nhìn thần số học" text={f.lpView} />
            <Pair label="Gợi ý theo bản mệnh" text={f.hanhTip} />
          </div>

          <div className="space-y-4">
            <Sub>Kế hoạch 90 ngày</Sub>
            <ol className="space-y-4">
              {f.plan.map((ph) => (
                <li key={ph.title} className="space-y-2">
                  <p className="text-base font-semibold text-white">{ph.title}</p>
                  <Bullets items={ph.items} />
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-3">
            <Sub>Sai lầm nên tránh</Sub>
            <Bullets items={f.mistakes} tone="care" />
          </div>

          <SupportCta contact={w.contact} reason={f.contactReason} subject={`Tư vấn nâng cao: ${f.label} (${f.score}/10)`} />
          <p className="text-xs text-white/45 leading-relaxed">{f.caution}</p>
        </article>
      ))}

      {w.focus.length > 1 && (
        <SupportCta
          contact={w.contact}
          reason={`Bạn đang có ${w.focus.length} lĩnh vực trọng yếu cần chú ý cùng lúc (${names}). Một kế hoạch tổng thể, sắp xếp đúng thứ tự ưu tiên, sẽ hiệu quả và nhẹ nhàng hơn nhiều so với tự xử lý từng việc riêng lẻ.`}
          subject={`Tư vấn nâng cao: ${names}`}
        />
      )}
    </div>
  );
};

// ---------- Báo cáo ----------
const NAV = [
  ['tong-quan', 'Tổng quan'],
  ['tu-vi', 'Tử vi'],
  ['than-so-hoc', 'Thần số học'],
  ['banh-xe', 'Bánh xe'],
  ['gia-dinh', 'Gia đình'],
  ['ke-hoach', 'Kế hoạch'],
];

const ReportView: React.FC<{ report: Report; onBack: () => void }> = ({ report: r, onBack }) => {
  const n = r.numerology;
  const lp = n.lifePath;
  const t = r.tuvi;
  const w = r.wheel;

  const navItems = r.wheel.focus.length ? [...NAV.slice(0, 4), ['can-chu-y', 'Cần chú ý'], ...NAV.slice(4)] : NAV;
  const palaceLines = useMemo(() => (t.chart ? t.chart.palaces.filter((p) => p.lines.length) : []), [t.chart]);

  return (
    <>
      <nav className="sticky top-0 z-30 bg-[#0d0f14]/85 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 h-14 flex items-center gap-1 overflow-x-auto">
          <span className={`mr-3 shrink-0 text-lg text-white ${heading}`}>Dũng Gieo Hạt</span>
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 px-3 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-20">
        <AiDisclaimer className="max-w-[64ch]" />

        {/* TỔNG QUAN */}
        <section id="tong-quan" className="scroll-mt-24 space-y-6">
          <p className={eyebrow}>Báo cáo cá nhân{r.code ? ` · Mã ${r.code}` : ''}</p>
          <h1 className={`text-4xl sm:text-6xl text-white leading-[1.1] ${heading}`}>{r.name || 'Bản đồ của bạn'}</h1>
          <p className={`text-2xl sm:text-3xl text-[#FFA877] ${heading}`}>{r.headline}</p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {r.badges.map((b) => (
              <span key={b.label} className="rounded-full bg-white/10 px-4 py-2 text-sm">
                <span className="text-white/55">{b.label}: </span>
                <span className="font-semibold text-white">{b.value}</span>
              </span>
            ))}
          </div>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[62ch]">{r.lead}</p>
          {r.wheel.focus.length > 0 && (
            <div className="rounded-2xl bg-[#FA5B13]/20 p-5 sm:p-6 space-y-3 max-w-[64ch]">
              <p className="text-base sm:text-lg text-white leading-relaxed">
                <strong className="font-semibold">Cần chú ý: </strong>
                bánh xe cuộc đời của bạn có {r.wheel.focus.length} lĩnh vực trọng yếu cần chăm sóc kỹ hơn:{' '}
                {r.wheel.focus.map((f) => `${f.label} (${f.score}/10)`).join(', ')}.
              </p>
              <a href="#can-chu-y" className="inline-block text-sm sm:text-base font-semibold text-[#FFB48A] hover:text-white underline underline-offset-4 transition">
                Xem phân tích kỹ và cách liên hệ hỗ trợ &rarr;
              </a>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => window.print()} className="rounded-full bg-white/10 hover:bg-white/15 px-5 py-2.5 text-sm font-semibold transition cursor-pointer">
              In / lưu thành PDF
            </button>
            <button onClick={onBack} className="rounded-full px-5 py-2.5 text-sm text-white/60 hover:text-white transition cursor-pointer">
              Tra cứu số khác
            </button>
          </div>
        </section>

        {/* TỬ VI */}
        <Section id="tu-vi" label="Phần 1" title="Tử vi & Bản mệnh" intro="Tính theo âm lịch và 60 hoa giáp; phần lá số lập theo tháng, ngày, giờ sinh. Nội dung mang tính tham khảo, giúp bạn hiểu thêm xu hướng của bản thân.">
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className={`text-4xl sm:text-5xl text-white ${heading}`}>{t.canChi}</span>
              <span className="text-sm text-white/60">{t.lunarText} · {t.amDuong} · {t.tuoiAm} tuổi âm</span>
            </div>
            <div className={`${soft} space-y-3`}>
              <p className={eyebrow}>Nạp âm</p>
              <p className={`text-2xl sm:text-3xl text-[#FFA877] ${heading}`}>{t.napAm.name} <span className="text-white/60 text-lg">· mệnh {t.napAm.hanh}</span></p>
              <p className="text-sm text-white/60">{t.napAm.image}</p>
              <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{t.napAm.text}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3"><Sub>Thiên can</Sub><p className="text-[15px] text-white/85 leading-relaxed">{t.canText}</p></div>
              <div className="space-y-3">
                <Sub>Con giáp: {t.chiText.animal}</Sub>
                <p className="text-[15px] text-white/85 leading-relaxed">{t.chiText.personality}</p>
              </div>
            </div>
            <div className={`${soft} grid sm:grid-cols-2 gap-x-8 gap-y-5`}>
              <Pair label="Nghề phù hợp theo tuổi" text={t.chiText.career} />
              <Pair label="Tình cảm" text={t.chiText.love} />
              <Pair label="Cần lưu ý" text={t.chiText.caution} />
              <Pair label="Màu, số, hướng thuận" text={t.chiText.lucky} />
            </div>
          </div>

          <div className="space-y-5">
            <Sub>Ngũ hành bản mệnh: {t.hanh.name}</Sub>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-[64ch]">{t.hanh.trait}</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              <Pair label="Thế mạnh" text={t.hanh.strengths} />
              <Pair label="Cần lưu ý" text={t.hanh.watch} />
              <Pair label="Nghề phù hợp" text={t.hanh.careers} />
              <Pair label="Cơ quan cần chăm sóc" text={t.hanh.organs} />
              <Pair label="Màu bản mệnh" text={t.hanh.colorsOwn} />
              <Pair label="Màu tương sinh (hỗ trợ)" text={t.hanh.colorsSupport} />
              <Pair label="Màu nên hạn chế" text={t.hanh.colorsAvoid} />
              <Pair label="Hướng & con số hợp" text={`${t.hanh.direction} · số ${t.hanh.numbers}`} />
            </div>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Gợi ý chăm sóc: </span>{t.hanh.advice}</p>
          </div>

          <div className="space-y-5">
            <Sub>Cung phi Bát trạch</Sub>
            <p className={`text-2xl sm:text-3xl text-white ${heading}`}>Cung {t.batTrach.name} <span className="text-white/55 text-lg">· {t.batTrach.group}</span></p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-[64ch]">{t.batTrach.text} {t.batTrach.groupText}</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Sub>Bốn hướng tốt</Sub>
                <ul className="space-y-3">
                  {t.batTrach.directions.filter((d) => d.good).map((d) => (
                    <li key={d.label}><span className="font-semibold text-white">{d.label} · {d.dir}.</span> <span className="text-white/75 text-[15px]">{d.text}</span></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <Sub>Bốn hướng nên tránh</Sub>
                <ul className="space-y-3">
                  {t.batTrach.directions.filter((d) => !d.good).map((d) => (
                    <li key={d.label}><span className="font-semibold text-white">{d.label} · {d.dir}.</span> <span className="text-white/75 text-[15px]">{d.text}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {t.chart ? (
            <div className="space-y-8">
              <Sub>Lá số Tử vi của bạn</Sub>
              <TuViChart report={r} />
              <div className="grid sm:grid-cols-2 gap-6">
                <Pair label="Cung Mệnh" text={t.chart.menhText} />
                <Pair label={`Cung Thân${t.chart.thanPalace ? ` (tại ${t.chart.thanPalace})` : ''}`} text={t.chart.thanText} />
                <Pair label={`${t.chart.cuc.hanh} ${CUC_WORD[t.chart.cuc.num]} Cục`} text={t.chart.cuc.text} />
              </div>

              <div className="space-y-4">
                <Sub>{t.chart.voChinhDieu ? 'Mệnh vô chính diệu — xem các sao xung chiếu' : 'Chính tinh tại cung Mệnh'}</Sub>
                {t.chart.mainStars.map((s) => (
                  <div key={s.name} className={`${soft} space-y-3`}>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className={`text-2xl text-white ${heading}`}>{s.name}</span>
                      <span className="text-sm text-[#FFA877]">{s.brightLabel}</span>
                      <span className="text-sm text-white/55">{s.title}</span>
                    </div>
                    <p className="text-[15px] text-white/85 leading-relaxed">{s.essence}</p>
                    <p className="text-[15px] text-white/85 leading-relaxed">{s.atMenh}</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Pair label="Thế mạnh" text={s.strengths} />
                      <Pair label="Cần lưu ý" text={s.watch} />
                    </div>
                    <p className="text-[15px] text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Lời khuyên: </span>{s.advice}</p>
                  </div>
                ))}
              </div>

              {t.chart.cach.length > 0 && (
                <div className="space-y-4">
                  <Sub>Cách cục</Sub>
                  {t.chart.cach.map((c) => <Pair key={c.name} label={c.name} text={c.text} />)}
                </div>
              )}

              <div className="space-y-4">
                <Sub>Luận giải các cung quan trọng</Sub>
                <div className="space-y-5">
                  {palaceLines.map((p) => (
                    <div key={p.name}>
                      <p className="text-sm font-semibold text-[#FFA877]">Cung {p.name} (tại {p.chi}): {p.stars.map((s) => s.name).join(', ')}</p>
                      {p.lines.map((l) => <p key={l} className="mt-1 text-[15px] text-white/85 leading-relaxed">{l}</p>)}
                    </div>
                  ))}
                  {t.chart.palaces.filter((p) => p.stars.length === 0).length > 0 && (
                    <p className="text-sm text-white/55 leading-relaxed">
                      Cung không có chính tinh tọa thủ ({t.chart.palaces.filter((p) => p.stars.length === 0).map((p) => p.name).join(', ')}) được luận theo các sao xung chiếu từ cung đối diện.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Sub>Đại vận 10 năm</Sub>
                <p className="text-sm text-white/60 leading-relaxed">{t.chart.daiVanDirection}</p>
                <ol className="space-y-2.5">
                  {t.chart.daiVan.map((d) => (
                    <li key={d.range} className={`rounded-2xl px-5 py-4 ${d.current ? 'bg-[#FA5B13]/20' : 'bg-white/[0.04]'}`}>
                      <p className="text-sm font-semibold text-white">
                        {d.range} · cung {d.palace}
                        {d.current && <span className="ml-2 rounded-full bg-[#FA5B13] px-2 py-0.5 text-xs font-bold">Hiện tại</span>}
                      </p>
                      <p className="mt-1 text-[15px] text-white/80 leading-relaxed">{d.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">{t.chart.brightNote}</p>
            </div>
          ) : (
            <p className="text-[15px] text-white/70 leading-relaxed rounded-2xl bg-white/[0.05] p-5">{t.chartMissingNote}</p>
          )}
        </Section>

        {/* THẦN SỐ HỌC */}
        <Section id="than-so-hoc" label="Phần 2" title="Thần số học" intro="Các con số sinh ra từ ngày sinh và tên đầy đủ của bạn, mô tả xu hướng tự nhiên, tài năng và bài học theo từng giai đoạn.">
          <div className="space-y-6">
            <div className="flex items-end gap-5">
              <span className={`text-8xl sm:text-9xl leading-none text-[#FA5B13] ${heading}`}>{lp.value}</span>
              <div className="pb-3">
                <p className={eyebrow}>Số chủ đạo{lp.master ? ' · Số bậc thầy' : ''}</p>
                <p className={`text-2xl sm:text-3xl text-white ${heading}`}>{lp.title}</p>
                <p className="text-sm text-white/55 mt-1">{lp.info.keywords.join(' · ')}</p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-[64ch]">{lp.info.essence}</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3"><Sub>Điểm mạnh</Sub><Bullets items={lp.info.strengths} /></div>
              <div className="space-y-3"><Sub>Điều cần lưu ý</Sub><Bullets items={lp.info.challenges} tone="care" /></div>
            </div>
            <div className={`${soft} grid sm:grid-cols-2 gap-x-8 gap-y-6`}>
              <Pair label="Sự nghiệp" text={lp.info.career} />
              <Pair label="Tình yêu" text={lp.info.love} />
              <Pair label="Gia đình" text={lp.info.family} />
              <Pair label="Tiền bạc" text={lp.info.money} />
              <Pair label="Sức khỏe" text={lp.info.health} />
              <Pair label="Khi mất cân bằng" text={lp.info.shadow} />
            </div>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Điều bạn có thể chủ động: </span>{lp.info.growth}</p>
            <p className={`text-xl sm:text-2xl text-white ${heading}`}>“{lp.info.mantra}”</p>
          </div>

          {!n.hasName && (
            <p className="text-[15px] text-white/70 leading-relaxed rounded-2xl bg-white/[0.05] p-5">
              Bạn chưa điền họ tên nên các chỉ số từ tên (số sứ mệnh, linh hồn, nhân cách, trưởng thành) chưa được tính. Báo cáo vẫn đầy đủ các phần theo ngày sinh.
            </p>
          )}

          {n.core.length > 0 && (
            <div className="space-y-4">
              <Sub>Các con số cốt lõi</Sub>
              <div className="grid sm:grid-cols-2 gap-4">
                {n.core.map((c) => (
                  <div key={c.label} className={soft}>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-4xl text-[#FA5B13] ${heading}`}>{c.value}</span>
                      <span className="text-sm font-semibold text-white/70">{c.label}</span>
                    </div>
                    <p className="mt-2 text-[15px] text-white/85 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chu kỳ */}
          <div className="space-y-5">
            <Sub>Năm {n.cycles.year} của bạn</Sub>
            <div className={`${soft} space-y-4`}>
              <div className="flex items-baseline gap-3">
                <span className={`text-5xl text-[#FA5B13] ${heading}`}>{n.cycles.personalYear.value}</span>
                <span className={`text-xl sm:text-2xl text-white ${heading}`}>{n.cycles.personalYear.title}</span>
              </div>
              <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{n.cycles.personalYear.theme}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2"><Sub>Nên tập trung</Sub><Bullets items={n.cycles.personalYear.focus} /></div>
                <div className="space-y-2"><Sub>Nên tránh</Sub><Bullets items={n.cycles.personalYear.avoid} tone="care" /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-5 pt-1">
                <Pair label="Tình cảm" text={n.cycles.personalYear.love} />
                <Pair label="Tiền bạc" text={n.cycles.personalYear.money} />
                <Pair label="Công việc" text={n.cycles.personalYear.career} />
              </div>
              <p className="text-sm text-white/65 leading-relaxed pt-1">Tháng {n.cycles.personalMonth.month} này: {n.cycles.personalMonth.text}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Sub>Bốn đỉnh cao cuộc đời</Sub>
            <ol className="space-y-3">
              {n.cycles.pinnacles.map((p) => (
                <li key={p.index} className={`rounded-2xl p-5 ${p.current ? 'bg-[#FA5B13]/20' : 'bg-white/[0.04]'}`}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className={`text-3xl ${heading} ${p.current ? 'text-white' : 'text-[#FA5B13]'}`}>{p.value}</span>
                    <span className="text-sm font-semibold text-white/80">Đỉnh cao {p.index} · {p.ages}</span>
                    {p.current && <span className="rounded-full bg-[#FA5B13] px-2.5 py-0.5 text-xs font-bold">Đang ở đây</span>}
                  </div>
                  <p className="mt-2 text-[15px] text-white/85 leading-relaxed">{p.text}</p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.challengeText}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Biểu đồ ngày sinh */}
          <div className="space-y-5">
            <Sub>Biểu đồ ngày sinh</Sub>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <BirthGrid digits={n.chart.digits} />
              <div className="space-y-4 flex-1">
                {n.chart.planes.map((p) => (
                  <Pair key={p.name} label={`${p.name} (${p.count} số)`} text={p.text} />
                ))}
              </div>
            </div>
            {(n.chart.arrowsPresent.length > 0 || n.chart.arrowsMissing.length > 0) && (
              <div className={`${soft} space-y-4`}>
                {n.chart.arrowsPresent.map((a) => <Pair key={a.name} label={a.name} text={a.text} />)}
                {n.chart.arrowsMissing.map((a) => <Pair key={a.name} label={a.name} text={a.text} />)}
              </div>
            )}
            <div className="space-y-4 pt-2">
              <Sub>Ý nghĩa từng con số trong biểu đồ</Sub>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {n.chart.digits.map((d) => <Pair key={d.n} label={`Số ${d.n} · ${d.domain}`} text={d.text} />)}
              </div>
            </div>
          </div>

          {(n.karmic.debts.length > 0 || n.karmic.lessons.length > 0) && (
            <div className="space-y-4">
              <Sub>Bài học nghiệp</Sub>
              <Bullets items={[...n.karmic.debts, ...n.karmic.lessons]} tone="care" />
            </div>
          )}
        </Section>

        {/* BÁNH XE */}
        <Section id="banh-xe" label="Phần 3" title="Bánh xe cuộc đời (Wheel of Life)" intro={w.howToRead[0]}>
          <div className="space-y-3">
            {w.howToRead.slice(1).map((t) => (
              <p key={t} className="text-[15px] sm:text-base text-white/75 leading-relaxed max-w-[64ch]">{t}</p>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="w-full md:w-[320px] shrink-0"><Radar items={w.scores.map((s) => ({ label: s.label, score: s.score }))} /></div>
            <ul className="w-full space-y-3">
              {w.scores.map((s) => (
                <li key={s.key} className="flex items-center justify-between gap-3 text-sm sm:text-base">
                  <span className="text-white/90 min-w-0">{s.label}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <LevelChip tone={s.levelTone} label={s.level} />
                    <span className="font-semibold w-10 text-right tabular-nums">{s.score}/10</span>
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-between pt-3 text-sm text-white/60">
                <span>Điểm trung bình</span><span className="font-semibold text-white tabular-nums">{w.avg}/10</span>
              </li>
            </ul>
          </div>

          <FocusSection w={w} />

          {/* Hình dạng bánh xe */}
          <div className="space-y-3">
            <Sub>Hình dạng bánh xe của bạn</Sub>
            <p className={`text-2xl text-white ${heading}`}>{w.shape.label}</p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-[64ch]">{w.shape.text}</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Cao nhất: {w.strongest.label} ({w.strongest.score}/10) · Thấp nhất: {w.weakest.label} ({w.weakest.score}/10) · Chênh lệch {w.shape.spread} điểm. {w.balanceText}
            </p>
          </div>

          {/* Ba trụ cột */}
          <div className="space-y-4">
            <Sub>Ba trụ cột của cuộc sống</Sub>
            <ul className="space-y-3">
              {w.groups.map((g) => (
                <li key={g.key} className="flex items-center justify-between gap-3 text-sm sm:text-base">
                  <span className="text-white/90">{g.label}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 sm:w-40 bg-white/15 h-1.5 rounded-full overflow-hidden"><div className="bg-[#FA5B13] h-full rounded-full" style={{ width: `${g.avg * 10}%` }} /></div>
                    <span className="font-semibold w-10 text-right tabular-nums">{g.avg}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-[64ch]">{w.groupText}</p>
          </div>

          {/* Nan hoa then chốt */}
          <div className={`${soft} space-y-3`}>
            <p className={eyebrow}>Nan hoa then chốt</p>
            <p className={`text-2xl sm:text-3xl text-white ${heading}`}>{w.keystone.label} <span className="text-[#FA5B13]">{w.keystone.score}/10</span></p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{w.keystone.text}</p>
            {w.keystone.note && <p className="text-[15px] sm:text-base text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Với lĩnh vực bạn chọn: </span>{w.keystone.note}</p>}
          </div>

          {/* Liên kết giữa các lĩnh vực */}
          <div className="space-y-5">
            <Sub>Các lĩnh vực đang tác động lẫn nhau</Sub>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-[64ch]">
              Điểm của từng lĩnh vực không đứng riêng: chúng kéo nhau lên hoặc xuống. Đây là những mối liên kết nổi bật nhất trong bánh xe của bạn.
            </p>
            <ul className="space-y-4">
              {w.links.map((l) => (
                <li key={l.title} className="rounded-2xl bg-white/[0.04] p-5 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-base font-semibold text-white">{l.title}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LINK_TONE[l.tone]?.chip || ''}`}>{LINK_TONE[l.tone]?.label}</span>
                  </div>
                  <p className="text-[15px] text-white/85 leading-relaxed">{l.text}</p>
                  {l.action && <p className="text-[15px] text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Gợi ý: </span>{l.action}</p>}
                </li>
              ))}
            </ul>
          </div>

          {w.cycles.length > 0 && (
            <div className="space-y-4">
              <Sub>Vòng xoáy đang diễn ra</Sub>
              {w.cycles.map((c) => (
                <div key={c.name} className="space-y-1.5">
                  <p className="text-sm font-semibold text-[#FFA877]">{c.name} · {c.state === 'down' ? 'đang đi xuống' : 'đang đi lên'}</p>
                  <p className="text-[15px] text-white/85 leading-relaxed">{c.text}</p>
                  <p className="text-[15px] text-white/85 leading-relaxed">{c.state === 'down' ? <><span className="font-semibold text-white">Cách phá vòng: </span>{c.advice}</> : c.advice}</p>
                </div>
              ))}
            </div>
          )}

          <div className={`${soft} space-y-4`}>
            <p className={eyebrow}>Lĩnh vực bạn chọn ưu tiên</p>
            <p className={`text-2xl sm:text-3xl text-white ${heading}`}>{w.priority.label} <span className="text-[#FA5B13]">{w.priority.score}/10</span></p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{w.priority.why}</p>
            <p className="text-[15px] sm:text-base text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Hợp với bạn: </span>{w.priority.lpStyle}</p>
            {w.desire && <p className={`text-lg text-white/90 ${heading}`}>“{w.desire}”</p>}
          </div>

          <div className="space-y-8">
            <Sub>Phân tích từng lĩnh vực trong mối liên hệ với các lĩnh vực khác</Sub>
            {w.scores.map((s) => (
              <div key={s.key} className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <p className="text-base font-semibold text-white">{s.label} <span className="text-[#FA5B13]">· {s.score}/10</span></p>
                  <LevelChip tone={s.levelTone} label={s.level} />
                </div>
                <p className="text-[15px] text-white/85 leading-relaxed">{s.lead}</p>
                <p className="text-[15px] text-white/85 leading-relaxed">{s.read}</p>
                {s.related.length > 0 && (
                  <ul className="space-y-1.5">
                    {s.related.map((r) => (
                      <li key={r.label} className="text-[15px] text-white/80 leading-relaxed">
                        <span className="font-semibold text-[#FFA877]">Liên kết với {r.label} ({r.score}/10): </span>{r.text}
                      </li>
                    ))}
                  </ul>
                )}
                <Bullets items={s.actions} />
                <p className="text-sm text-white/60 leading-relaxed">{s.hanhTip}</p>
                <p className={`text-[15px] text-white/70 ${heading}`}>Tự hỏi: {s.question}</p>
              </div>
            ))}
          </div>

          {w.obstacles.length > 0 && (
            <div className="space-y-4">
              <Sub>Rào cản bạn đang gặp</Sub>
              {w.obstacles.map((o) => (
                <div key={o.name}>
                  <p className="text-sm font-semibold text-[#FFA877]">{o.name}</p>
                  <p className="mt-1 text-[15px] text-white/85 leading-relaxed">{o.meaning} {o.solution}</p>
                </div>
              ))}
            </div>
          )}
          {w.support.length > 0 && (
            <div className="space-y-4">
              <Sub>Cách bạn muốn được hỗ trợ</Sub>
              <Bullets items={w.support.map((s) => s.tip)} />
            </div>
          )}

          <div className="space-y-4">
            <Sub>Sau khi xem bánh xe của mình</Sub>
            <ol className="space-y-3">
              {w.nextSteps.map((t, i) => (
                <li key={t} className="flex gap-3 text-[15px] sm:text-base text-white/85 leading-relaxed">
                  <span className={`shrink-0 text-xl leading-none text-[#FA5B13] ${heading}`}>{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* GIA ĐÌNH */}
        <Section id="gia-dinh" label="Phần 4" title="Gia đình" intro={`${r.family.familyTimeText} ${r.family.scoreNote}`}>
          {r.family.members.length === 0 ? (
            <p className="text-[15px] text-white/70 leading-relaxed">Bạn chưa khai thông tin người thân nên phần phân tích từng người chưa được lập. Khi có thông tin (tối đa 10 người), mỗi người sẽ có một phần báo cáo riêng, nối với thần số học và bánh xe cuộc đời của bạn.</p>
          ) : (
            <div className="space-y-10">
              {/* Tổng hợp cả gia đình */}
              {r.family.summary && (
                <div className={`${soft} space-y-3`}>
                  <p className={eyebrow}>Tổng hợp {r.family.summary.total} người thân</p>
                  <ul className="space-y-2 text-[15px] sm:text-base text-white/85 leading-relaxed">
                    <li><span className="font-semibold text-[#FFA877]">Hòa hợp nhất với bạn: </span>{r.family.summary.mostHarmonious}.</li>
                    <li><span className="font-semibold text-[#FFA877]">Cần nhiều kiên nhẫn và thấu hiểu nhất: </span>{r.family.summary.mostChallenging}.</li>
                    {r.family.summary.sameLifePath.map((t) => (<li key={t}><span className="font-semibold text-[#FFA877]">Điểm chung: </span>{t}.</li>))}
                    <li><span className="font-semibold text-[#FFA877]">Hành nổi bật của gia đình: </span>{r.family.summary.commonHanh}.</li>
                  </ul>
                  <ul className="pt-2 space-y-1.5">
                    {r.family.members.map((m, i) => (
                      <li key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm sm:text-base">
                        <span className="text-white/90">{m.name} <span className="text-white/50">· {m.relationship}</span></span>
                        <span className="text-white/60">Số {m.lifePath} · {m.napAm} · <span className="font-semibold text-white">{m.overallLabel}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Báo cáo chi tiết từng người */}
              {r.family.members.map((m, i) => (
                <article key={i} className="space-y-6">
                  <header className="space-y-2">
                    <p className={eyebrow}>Người thân {i + 1}/{r.family.members.length} · {m.roleLabel}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className={`text-3xl sm:text-4xl text-white ${heading}`}>{m.name}</h3>
                      <span className="rounded-full bg-[#FA5B13]/25 px-3 py-1 text-sm font-semibold text-white">{m.overallLabel}</span>
                    </div>
                    <p className="text-sm text-white/60">
                      {m.relationship} · {m.canChi} · {m.napAm} · số chủ đạo {m.lifePath}{m.age !== null ? ` · ${m.age} tuổi (${m.stage.label.toLowerCase()})` : ''}
                    </p>
                    <p className="text-[15px] sm:text-base text-white/85 leading-relaxed">{m.overallText}</p>
                  </header>

                  {!m.hasName && (
                    <p className="text-sm text-white/60 leading-relaxed">Bạn chưa điền họ tên của {m.name} nên các chỉ số từ tên (sứ mệnh, linh hồn, nhân cách) chưa được tính. Điền đúng họ tên khai sinh thì báo cáo sẽ chính xác hơn.</p>
                  )}

                  {/* Thần số học */}
                  <div className={`${soft} space-y-4`}>
                    <p className={eyebrow}>Thần số học</p>
                    <p className={`text-xl sm:text-2xl text-white ${heading}`}>Số chủ đạo {m.lifePath} · {m.profile.lpTitle}</p>
                    <p className="text-sm text-white/55">{m.profile.keywords.join(' · ')}</p>
                    <p className="text-[15px] text-white/85 leading-relaxed">{m.profile.essence}</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2"><Sub>Điểm mạnh</Sub><Bullets items={m.profile.strengths} /></div>
                      <div className="space-y-2"><Sub>Điều cần lưu ý</Sub><Bullets items={m.profile.challenges} tone="care" /></div>
                    </div>
                    {m.nameNumbers.length > 0 && (
                      <div className="grid sm:grid-cols-3 gap-5 pt-1">
                        {m.nameNumbers.map((nn) => (
                          <div key={nn.label}>
                            <p className="text-sm font-semibold text-[#FFA877]">{nn.label}: {nn.value}</p>
                            <p className="mt-1 text-[15px] text-white/85 leading-relaxed">{nn.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[15px] text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Năm {r.numerology.cycles.year} của {m.name}: </span>{m.year.title}. {m.year.theme} {m.year.help}</p>
                  </div>

                  {/* Tử vi */}
                  <div className="space-y-3">
                    <Sub>Tử vi & bản mệnh</Sub>
                    <p className="text-[15px] text-white/85 leading-relaxed"><span className="font-semibold text-white">Tuổi {m.tuvi.animal}: </span>{m.tuvi.chiPersonality}</p>
                    <p className="text-[15px] text-white/85 leading-relaxed"><span className="font-semibold text-white">{m.napAm} ({m.tuvi.napAmImage}): </span>{m.tuvi.napAmText}</p>
                    <p className="text-[15px] text-white/85 leading-relaxed">{m.tuvi.hanhTrait}</p>
                    <p className="text-sm text-white/60 leading-relaxed">{m.tuvi.colors}</p>
                  </div>

                  {/* Hòa hợp với bạn */}
                  <div className="space-y-4">
                    <Sub>Mức hòa hợp với bạn</Sub>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <Pair label={m.chiRel.label} text={m.chiRel.text} />
                      <Pair label={m.hanhRel.label} text={m.hanhRel.text} />
                      <Pair label={m.lpCompat.label} text={m.lpCompat.text} />
                    </div>
                  </div>

                  {/* Nối với bánh xe cuộc đời */}
                  {m.wheelLinks.length > 0 && (
                    <div className="space-y-4">
                      <Sub>Liên hệ với bánh xe cuộc đời của bạn</Sub>
                      <ul className="space-y-4">
                        {m.wheelLinks.map((w2) => (
                          <li key={w2.title} className="space-y-1.5">
                            <p className="text-sm font-semibold text-[#FFA877]">{w2.title}</p>
                            <p className="text-[15px] text-white/85 leading-relaxed">{w2.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cách đồng hành */}
                  <div className="space-y-4">
                    <Sub>Cách đồng hành cùng {m.name}</Sub>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                      <Pair label="Cách trò chuyện" text={m.howTo.talk} />
                      <Pair label="Điều họ cần được ghi nhận" text={m.howTo.appreciate} />
                      <Pair label="Điều dễ gây va chạm" text={m.howTo.conflict} />
                      <Pair label={`Ở giai đoạn ${m.stage.label.toLowerCase()}`} text={m.stage.tip} />
                    </div>
                    <p className="text-[15px] text-white/85 leading-relaxed"><span className="text-[#FFA877] font-semibold">Với vai trò {m.roleLabel.toLowerCase()}: </span>{m.roleTip}</p>
                  </div>
                </article>
              ))}

              {/* Kế hoạch gia đình */}
              {r.family.plan.length > 0 && (
                <div className="space-y-5">
                  <Sub>Kế hoạch gia đình 30 ngày</Sub>
                  <ol className="space-y-6">
                    {r.family.plan.map((wk) => (
                      <li key={wk.title} className="space-y-3">
                        <p className={`text-xl text-white ${heading}`}>{wk.title}</p>
                        <Bullets items={wk.items} />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </Section>

        {/* KẾ HOẠCH */}
        <Section id="ke-hoach" label="Phần 5" title="Kế hoạch 30 ngày" intro={r.plan.intro}>
          <ol className="space-y-6">
            {r.plan.weeks.map((wk) => (
              <li key={wk.title} className="space-y-3">
                <p className={`text-xl text-white ${heading}`}>{wk.title}</p>
                <Bullets items={wk.items} />
              </li>
            ))}
          </ol>
          <div className="space-y-3">
            <Sub>Nhịp hằng ngày</Sub>
            <Bullets items={r.plan.daily} />
          </div>
          <p className="text-[15px] text-white/75 leading-relaxed">{r.plan.yearNote}</p>
        </Section>

        {/* Bước cuối: cửa sổ vào nhóm Zalo Gieo Hạt (tự mở khi đọc đến cuối trang) */}
        <div className="text-center"><ZaloOpenButton /></div>
        <ZaloPopups />

        <footer className="pt-6 pb-10 space-y-3 text-center">
          <p className={`text-xl text-white/90 ${heading}`}>“Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”</p>
          <AiDisclaimer subtle className="max-w-[64ch] mx-auto" />
          <p className="text-xs text-white/40 leading-relaxed max-w-[60ch] mx-auto">Mọi quyết định cuối cùng thuộc về bạn.</p>
        </footer>
      </main>
    </>
  );
};
