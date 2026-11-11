// Ghép toàn bộ kho dữ liệu thành "báo cáo cá nhân hóa" từ thông tin người dùng đã điền.

import { computeNumerology, reduce } from './numerology';
import { computeTuVi, CAN, CHI, STAR_NAMES, BRIGHT_LABEL, PALACES, Bright, StarId } from './tuviEngine';
import { LIFE_PATH } from '../data/numerologyLifePath';
import {
  EXPRESSION, SOUL_URGE, PERSONALITY, BIRTH_DAY, ATTITUDE, MATURITY, PINNACLE, CHALLENGE,
  KARMIC_DEBT_TEXT, KARMIC_LESSON, PERSONAL_YEAR, PERSONAL_MONTH,
} from '../data/numerologyCore';
import { DIGIT, ARROW_PRESENT, ARROW_MISSING, PLANES, lifePathCompat, COMPAT_TEXT } from '../data/numerologyChart';
import { CAN_INFO, CHI_INFO, HANH_INFO, HANH_SINH, HANH_KHAC, NAP_AM_TEXT } from '../data/tuviBasics';
import {
  BAT_TRACH_DIR, DIR_MEANING, QUAI_TEXT, GROUP_TEXT, MENH_AT, THAN_TEXT, CUC_TEXT, PALACE_TEXT,
  CACH_TEXT, DAI_VAN_TEXT, AM_DUONG_DAI_VAN, BRIGHT_NOTE, DirKey,
} from '../data/tuviPalaces';
import { STAR_INFO, StarPalaceKey, BRIGHT_STAR_TEXT } from '../data/tuviStars';
import {
  AREAS, AREA_INFO, HANH_AREA_TIP, LP_CHANGE_STYLE, OBSTACLE_TIP, SUPPORT_TIP, FAMILY_TIME_TEXT,
  BALANCE_TEXT, PRIORITY_PLAN, AreaKey,
} from '../data/lifeWheel';
import { detectRole, ROLE_LABEL, ROLE_TIP, CHI_REL, HANH_REL, OVERALL } from '../data/familyData';

// ============ Đầu vào ============
export interface RelativeInput {
  name: string;
  relationship: string;
  birthDate: string; // dd/mm/yyyy hoặc yyyy-mm-dd
  gender: string;
}
export interface ReportInput {
  name: string;
  code?: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  city?: string;
  occupation?: string;
  familyTime?: string;
  relatives: RelativeInput[];
  scores: Partial<Record<AreaKey, number>>;
  priority: string;
  desire?: string;
  obstacles: string[];
  support: string[];
}

export function parseBirthDate(s: string): { d: number; m: number; y: number } | null {
  const t = (s || '').trim();
  let m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(t);
  if (m) return { d: +m[1], m: +m[2], y: +m[3] };
  m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (m) return { d: +m[3], m: +m[2], y: +m[1] };
  return null;
}

// ============ Đầu ra ============
export interface Badge { label: string; value: string }
export interface StarLine { name: string; bright: string; brightLabel: string; title: string }
export interface Report {
  name: string;
  code?: string;
  headline: string;
  lead: string;
  badges: Badge[];
  numerology: {
    hasName: boolean;
    lifePath: { value: number; trail: number[]; master: boolean; title: string; info: (typeof LIFE_PATH)[number] };
    core: { label: string; value: number; text: string }[];
    cycles: {
      year: number;
      personalYear: { value: number; title: string; theme: string; focus: string[]; avoid: string[]; love: string; money: string; career: string };
      personalMonth: { value: number; month: number; text: string };
      pinnacles: { index: number; value: number; ages: string; text: string; challenge: number; challengeText: string; current: boolean }[];
    };
    chart: {
      digits: { n: number; count: number; domain: string; text: string }[];
      arrowsPresent: { name: string; text: string }[];
      arrowsMissing: { name: string; text: string }[];
      planes: { name: string; count: number; text: string }[];
    };
    karmic: { debts: string[]; lessons: string[] };
  };
  tuvi: {
    canChi: string;
    lunarText: string;
    amDuong: string;
    tuoiAm: number;
    napAm: { name: string; hanh: string; image: string; text: string };
    canText: string;
    chiText: { animal: string; personality: string; career: string; love: string; caution: string; lucky: string };
    hanh: { name: string; trait: string; strengths: string; watch: string; careers: string; colorsOwn: string; colorsSupport: string; colorsAvoid: string; direction: string; numbers: string; organs: string; advice: string; sinh: string; khac: string; image: string };
    batTrach: { name: string; group: string; text: string; groupText: string; directions: { label: string; dir: string; good: boolean; text: string }[] };
    chart: null | {
      menhText: string;
      thanText: string;
      thanPalace: string;
      cuc: { hanh: string; num: number; text: string };
      voChinhDieu: boolean;
      mainStars: { name: string; bright: string; brightLabel: string; title: string; essence: string; strengths: string; watch: string; advice: string; atMenh: string }[];
      palaces: { name: string; chi: string; meaning: string; stars: StarLine[]; lines: string[] }[];
      cach: { name: string; text: string }[];
      daiVan: { range: string; palace: string; text: string; current: boolean }[];
      daiVanDirection: string;
      brightNote: string;
    };
    chartMissingNote: string | null;
  };
  wheel: {
    scores: { key: string; label: string; score: number; read: string; actions: string[]; hanhTip: string }[];
    avg: number;
    spread: number;
    balanceText: string;
    spreadText: string;
    strongest: { label: string; score: number };
    weakest: { label: string; score: number };
    priority: { key: string; label: string; score: number; why: string; weeks: string[]; metric: string; lpStyle: string };
    desire: string;
    obstacles: { name: string; meaning: string; solution: string }[];
    support: { name: string; tip: string }[];
  };
  family: {
    familyTimeLabel: string;
    familyTimeText: string;
    members: {
      name: string;
      relationship: string;
      roleLabel: string;
      age: number | null;
      canChi: string;
      napAm: string;
      hanh: string;
      lifePath: number;
      chiRel: { label: string; text: string };
      hanhRel: { label: string; text: string };
      lpCompat: { label: string; text: string };
      overallLabel: string;
      overallText: string;
      roleTip: string;
    }[];
  };
  plan: {
    intro: string;
    weeks: { title: string; items: string[] }[];
    daily: string[];
    yearNote: string;
  };
}

// ============ Tiện ích ============
const brightGroup = (b: Bright) => (b === 'M' || b === 'V' || b === 'Đ' ? 'sang' : b === 'B' ? 'binh' : 'ham');
const lpInfo = (n: number) => LIFE_PATH[n] || LIFE_PATH[reduce(n, false)];
const textOf = (map: Record<number, string>, n: number) => map[n] || map[reduce(n, false)] || '';

function chiRelation(a: number, b: number): keyof typeof CHI_REL {
  const TAM = [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]];
  if (a !== b && TAM.some((g) => g.includes(a) && g.includes(b))) return 'tamhop';
  const LUC = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  if (LUC.some(([x, y]) => (a === x && b === y) || (a === y && b === x))) return 'luchop';
  if (Math.abs(a - b) === 6) return 'xung';
  const HAI = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]];
  if (HAI.some(([x, y]) => (a === x && b === y) || (a === y && b === x))) return 'hai';
  return 'binh';
}
function hanhRelation(mine: string, theirs: string): keyof typeof HANH_REL {
  if (mine === theirs) return 'tyHoa';
  if (HANH_SINH[theirs] === mine) return 'sinhNhap';
  if (HANH_SINH[mine] === theirs) return 'sinhXuat';
  if (HANH_KHAC[theirs] === mine) return 'khacNhap';
  return 'khacXuat';
}
const lpCompatScore = (n: number) => ({ 1: 2, 2: 1, 3: 0, 4: -1, 5: -2 } as Record<number, number>)[n] ?? 0;
const LP_COMPAT_LABEL: Record<number, string> = { 1: 'Rất hợp', 2: 'Khá hợp', 3: 'Bình thường', 4: 'Cần nỗ lực', 5: 'Dễ va chạm' };

// ============ Bộ dựng chính ============
export function buildReport(input: ReportInput, now: Date = new Date()): Report | null {
  const bd = parseBirthDate(input.birthDate);
  if (!bd) return null;

  const num = computeNumerology(input.name, bd.d, bd.m, bd.y, now);
  const tv = computeTuVi(bd.d, bd.m, bd.y, input.gender, input.birthTime, now);

  const lpData = lpInfo(num.lifePath);
  const napText = NAP_AM_TEXT[Math.max(0, tv.napAm ? findNapIdx(tv.canIdx, tv.chiIdx) : 0)];
  const hanh = tv.napAm.hanh;
  const hanhInfo = HANH_INFO[hanh];

  // ---------- Thần số học ----------
  const core: Report['numerology']['core'] = [];
  if (num.hasName) {
    core.push({ label: 'Số Sứ mệnh (từ tên đầy đủ)', value: num.expression, text: textOf(EXPRESSION, num.expression) });
    core.push({ label: 'Số Linh hồn (nguyên âm trong tên)', value: num.soulUrge, text: textOf(SOUL_URGE, num.soulUrge) });
    core.push({ label: 'Số Nhân cách (phụ âm trong tên)', value: num.personality, text: textOf(PERSONALITY, num.personality) });
  }
  core.push({ label: 'Số Ngày sinh', value: num.birthDayRaw, text: BIRTH_DAY[num.birthDayRaw] || textOf(BIRTH_DAY, num.birthday) });
  core.push({ label: 'Số Thái độ (ngày + tháng)', value: num.attitude, text: textOf(ATTITUDE, num.attitude) });
  if (num.hasName) core.push({ label: 'Số Trưởng thành (chủ đạo + sứ mệnh)', value: num.maturity, text: textOf(MATURITY, num.maturity) });

  const py = PERSONAL_YEAR[num.personalYear];
  const pinnacles = num.pinnacles.map((p) => ({
    index: p.index,
    value: p.value,
    ages: p.endAge === null ? `từ ${p.startAge} tuổi trở đi` : `${p.startAge}–${p.endAge} tuổi`,
    text: textOf(PINNACLE, p.value),
    challenge: p.challenge,
    challengeText: CHALLENGE[p.challenge] || '',
    current: p.index === num.currentPinnacle,
  }));

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
    const c = num.birthCounts[n];
    const d = DIGIT[n];
    return { n, count: c, domain: d.domain, text: c === 0 ? d.none : c === 1 ? d.one : d.many };
  });
  const planeText = (k: 'physical' | 'emotional' | 'mental') => {
    const c = num.planes[k];
    const p = PLANES[k];
    return { name: p.name, count: c, text: c >= 4 ? p.high : c <= 1 ? p.low : p.mid };
  };

  // ---------- Tử vi ----------
  const lunarText = `${tv.lunar.day}/${tv.lunar.month}${tv.lunar.leap ? ' (nhuận)' : ''}/${tv.lunar.year} âm lịch`;
  const bt = tv.batTrach;
  const directions = (['sinhKhi', 'thienY', 'dienNien', 'phucVi', 'tuyetMenh', 'nguQuy', 'lucSat', 'hoaHai'] as DirKey[]).map((k) => ({
    label: DIR_MEANING[k].label,
    dir: BAT_TRACH_DIR[bt.name][k],
    good: DIR_MEANING[k].good,
    text: DIR_MEANING[k].text,
  }));

  let chart: Report['tuvi']['chart'] = null;
  let chartMissingNote: string | null = null;
  if (tv.hasChart && tv.palaces && tv.cuc && tv.menhPos !== undefined) {
    const palaceKey = (name: string): StarPalaceKey | null =>
      ({ 'Mệnh': 'menh', 'Quan Lộc': 'quan', 'Tài Bạch': 'tai', 'Phu Thê': 'phuthe', 'Tử Tức': 'tutuc', 'Tật Ách': 'tatach', 'Phúc Đức': 'phucduc' } as Record<string, StarPalaceKey>)[name] || null;

    const palaces = tv.palaces.map((p) => {
      const key = palaceKey(p.name);
      const lines = key ? p.stars.map((s) => STAR_INFO[s.id].at[key]) : [];
      return {
        name: p.name,
        chi: CHI[p.chi],
        meaning: PALACE_TEXT[p.name],
        stars: p.stars.map((s) => ({ name: STAR_NAMES[s.id], bright: s.bright, brightLabel: BRIGHT_LABEL[s.bright], title: STAR_INFO[s.id].title })),
        lines,
      };
    });
    const mainStars = (tv.menhStars || []).map((s) => {
      const info = STAR_INFO[s.id as StarId];
      return {
        name: STAR_NAMES[s.id],
        bright: s.bright,
        brightLabel: BRIGHT_LABEL[s.bright],
        title: info.title,
        essence: info.essence,
        strengths: info.strengths,
        watch: info.watch,
        advice: info.advice,
        atMenh: info.at.menh + ' ' + BRIGHT_STAR_TEXT[brightGroup(s.bright)],
      };
    });
    chart = {
      menhText: MENH_AT[tv.menhPos],
      thanText: tv.thanPalace ? THAN_TEXT[tv.thanPalace] || '' : '',
      thanPalace: tv.thanPalace || '',
      cuc: { hanh: tv.cuc.hanh, num: tv.cuc.num, text: CUC_TEXT[tv.cuc.hanh] },
      voChinhDieu: !!tv.menhVoChinhDieu,
      mainStars,
      palaces,
      cach: tv.cach.map((k) => CACH_TEXT[k]).filter(Boolean),
      daiVan: (tv.daiVan || []).slice(0, 9).map((d) => ({
        range: `${d.fromAge}–${d.toAge} tuổi`,
        palace: d.palace,
        text: DAI_VAN_TEXT[d.palace],
        current: !!tv.currentDaiVan && tv.currentDaiVan.fromAge === d.fromAge,
      })),
      daiVanDirection: (tv.duong && input.gender !== 'Nữ') || (!tv.duong && input.gender === 'Nữ') ? AM_DUONG_DAI_VAN.forward : AM_DUONG_DAI_VAN.backward,
      brightNote: `${BRIGHT_NOTE.sang} ${BRIGHT_NOTE.binh} ${BRIGHT_NOTE.ham}`,
    };
  } else {
    chartMissingNote =
      'Bạn chưa cung cấp giờ sinh nên phần lá số chi tiết (cung Mệnh, Thân, Cục, các chính tinh và đại vận) chưa thể lập. Khi biết giờ sinh, hãy liên hệ chaukhai9905@gmail.com để được bổ sung.';
  }

  // ---------- Bánh xe ----------
  const scoreList = AREAS.map((a) => {
    const s = Math.min(10, Math.max(1, Math.round(input.scores[a.key] ?? 5)));
    const info = AREA_INFO[a.key];
    const band = s <= 4 ? info.low : s <= 7 ? info.mid : info.high;
    return { key: a.key as string, label: a.label, score: s, read: band.read, actions: band.actions, hanhTip: HANH_AREA_TIP[hanh][a.key] };
  });
  const avg = Math.round((scoreList.reduce((t, x) => t + x.score, 0) / scoreList.length) * 10) / 10;
  const sorted = [...scoreList].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];
  const spread = strongest.score - weakest.score;
  const priArea = AREAS.find((a) => a.label === input.priority) || AREAS.find((a) => a.key === weakest.key)!;
  const priScore = scoreList.find((x) => x.key === priArea.key)!.score;
  const lpKey = num.lifePath;
  const priPlan = PRIORITY_PLAN[priArea.key];

  const obstacles = (input.obstacles || [])
    .map((o) => {
      const name = o.replace(/^Khác:\s*/i, '');
      const tip = OBSTACLE_TIP[o];
      return tip ? { name, ...tip } : { name: o, meaning: 'Đây là rào cản riêng của bạn, rất đáng để được lắng nghe.', solution: 'Hãy chia nhỏ rào cản này thành một bước nhỏ nhất bạn có thể thử trong 7 ngày tới.' };
    })
    .slice(0, 8);
  const support = (input.support || []).filter((s) => SUPPORT_TIP[s]).map((s) => ({ name: s, tip: SUPPORT_TIP[s] }));

  // ---------- Gia đình ----------
  const members = (input.relatives || [])
    .map((r) => {
      const rb = parseBirthDate(r.birthDate);
      if (!rb) return null;
      const rtv = computeTuVi(rb.d, rb.m, rb.y, r.gender, null, now);
      const rnum = computeNumerology('', rb.d, rb.m, rb.y, now);
      const role = detectRole(r.relationship);
      const chiK = chiRelation(tv.chiIdx, rtv.chiIdx);
      const hanhK = hanhRelation(hanh, rtv.napAm.hanh);
      const lpc = lifePathCompat(num.lifePath, rnum.lifePath);
      const score = CHI_REL[chiK].score + HANH_REL[hanhK].score + lpCompatScore(lpc);
      const overall = OVERALL.find((o) => score >= o.min) || OVERALL[OVERALL.length - 1];
      return {
        name: r.name || ROLE_LABEL[role],
        relationship: r.relationship || ROLE_LABEL[role],
        roleLabel: ROLE_LABEL[role],
        age: now.getFullYear() - rb.y,
        canChi: rtv.canChi,
        napAm: rtv.napAm.name,
        hanh: rtv.napAm.hanh,
        lifePath: rnum.lifePath,
        chiRel: { label: `${CHI[tv.chiIdx]} – ${CHI[rtv.chiIdx]}: ${CHI_REL[chiK].label}`, text: CHI_REL[chiK].text },
        hanhRel: { label: `${hanh} – ${rtv.napAm.hanh}: ${HANH_REL[hanhK].label}`, text: HANH_REL[hanhK].text },
        lpCompat: { label: `Số ${num.lifePath} – Số ${rnum.lifePath}: ${LP_COMPAT_LABEL[lpc]}`, text: COMPAT_TEXT[lpc] },
        overallLabel: overall.label,
        overallText: overall.text,
        roleTip: ROLE_TIP[role],
      };
    })
    .filter(Boolean) as Report['family']['members'];

  // ---------- Kế hoạch 30 ngày ----------
  const secondWeak = sorted.find((x) => x.key !== priArea.key) || weakest;
  const firstObstacle = obstacles[0];
  const weeks = [
    {
      title: 'Tuần 1 – Khởi động',
      items: [
        priPlan.weeks[0].replace(/^Tuần 1:\s*/, ''),
        firstObstacle ? `Giải quyết rào cản “${firstObstacle.name}”: ${firstObstacle.solution}` : 'Chọn một khung giờ cố định mỗi ngày dành cho kế hoạch của bạn.',
        `Phong cách của bạn: ${LP_CHANGE_STYLE[lpKey] || LP_CHANGE_STYLE[reduce(lpKey, false)]}`,
      ],
    },
    {
      title: 'Tuần 2 – Tạo đà',
      items: [
        priPlan.weeks[1].replace(/^Tuần 2:\s*/, ''),
        HANH_AREA_TIP[hanh][priArea.key],
        `Chủ đề năm ${num.currentYear} của bạn là “${py.title}”: ${py.focus[0]}.`,
      ],
    },
    {
      title: 'Tuần 3 – Mở rộng',
      items: [
        priPlan.weeks[2].replace(/^Tuần 3:\s*/, ''),
        `Nâng lĩnh vực “${secondWeak.label}” (${secondWeak.score}/10): ${secondWeak.actions[0]}.`,
        textOf(PERSONAL_MONTH, num.personalMonth),
      ],
    },
    {
      title: 'Tuần 4 – Đánh giá & duy trì',
      items: [
        priPlan.weeks[3].replace(/^Tuần 4:\s*/, ''),
        `Đo lại điểm “${priArea.label}” (hiện ${priScore}/10) và so sánh với trước khi bắt đầu; chỉ số theo dõi: ${priPlan.metric}`,
        `Lời nhắc cho bản thân: “${lpData.mantra}”`,
      ],
    },
  ];
  const daily = [
    `Buổi sáng (5–10 phút): ${hanhInfo.advice}`,
    `Buổi tối: ghi 3 điều biết ơn và 1 việc nhỏ bạn đã làm cho lĩnh vực “${priArea.label}”.`,
    `Nhắc lại câu thần chú số ${num.lifePath} của bạn: “${lpData.mantra}”`,
  ];

  // ---------- Tổng quan ----------
  const badges: Badge[] = [
    { label: 'Tuổi', value: tv.canChi },
    { label: 'Bản mệnh', value: `${tv.napAm.name} (${hanh})` },
    { label: 'Cung phi', value: `${bt.name} – ${bt.group}` },
    { label: 'Số chủ đạo', value: String(num.lifePath) },
  ];
  if (num.hasName) badges.push({ label: 'Số sứ mệnh', value: String(num.expression) });

  const firstName = (input.name || '').trim().split(/\s+/).slice(-1)[0] || '';
  const lead =
    `${firstName ? firstName + ', bạn' : 'Bạn'} sinh năm ${tv.canChi} – nạp âm ${tv.napAm.name} (mệnh ${hanh}), ` +
    `mang năng lượng “${lpData.title}” của số chủ đạo ${num.lifePath}. ` +
    `Đây là bản đồ hạnh phúc dành riêng cho bạn: nó chỉ ra xu hướng, thế mạnh và những gợi ý hành động – còn việc bạn chọn làm gì mới là điều tạo nên tương lai.`;

  return {
    name: input.name,
    code: input.code,
    headline: `${tv.napAm.name} · ${lpData.title}`,
    lead,
    badges,
    numerology: {
      hasName: num.hasName,
      lifePath: { value: num.lifePath, trail: num.lifePathTrail, master: [11, 22, 33].includes(num.lifePath), title: lpData.title, info: lpData },
      core,
      cycles: {
        year: num.currentYear,
        personalYear: { value: num.personalYear, ...py },
        personalMonth: { value: num.personalMonth, month: num.currentMonth, text: textOf(PERSONAL_MONTH, num.personalMonth) },
        pinnacles,
      },
      chart: {
        digits,
        arrowsPresent: num.arrowsPresent.map((k) => ARROW_PRESENT[k]),
        arrowsMissing: num.arrowsMissing.map((k) => ARROW_MISSING[k]),
        planes: [planeText('physical'), planeText('emotional'), planeText('mental')],
      },
      karmic: {
        debts: num.karmicDebts.map((d) => KARMIC_DEBT_TEXT[d]).filter(Boolean),
        lessons: num.karmicLessons.map((n) => KARMIC_LESSON[n]).filter(Boolean),
      },
    },
    tuvi: {
      canChi: tv.canChi,
      lunarText,
      amDuong: tv.amDuongLabel,
      tuoiAm: tv.tuoiAm,
      napAm: { name: tv.napAm.name, hanh, image: napText.image, text: napText.text },
      canText: `${CAN[tv.canIdx]} (${CAN_INFO[tv.canIdx].duongAm} ${CAN_INFO[tv.canIdx].hanh} – ${CAN_INFO[tv.canIdx].image}): ${CAN_INFO[tv.canIdx].text}`,
      chiText: {
        animal: `${CHI[tv.chiIdx]} – ${CHI_INFO[tv.chiIdx].animal}`,
        personality: CHI_INFO[tv.chiIdx].personality,
        career: CHI_INFO[tv.chiIdx].career,
        love: CHI_INFO[tv.chiIdx].love,
        caution: CHI_INFO[tv.chiIdx].caution,
        lucky: CHI_INFO[tv.chiIdx].lucky,
      },
      hanh: { name: hanh, ...hanhInfo },
      batTrach: { name: bt.name, group: bt.group, text: QUAI_TEXT[bt.name], groupText: GROUP_TEXT[bt.group], directions },
      chart,
      chartMissingNote,
    },
    wheel: {
      scores: scoreList,
      avg,
      spread,
      balanceText: avg < 5 ? BALANCE_TEXT.avgLow : avg < 7.5 ? BALANCE_TEXT.avgMid : BALANCE_TEXT.avgHigh,
      spreadText: spread >= 5 ? BALANCE_TEXT.spreadHigh : BALANCE_TEXT.spreadLow,
      strongest: { label: strongest.label, score: strongest.score },
      weakest: { label: weakest.label, score: weakest.score },
      priority: {
        key: priArea.key,
        label: priArea.label,
        score: priScore,
        why: priPlan.why,
        weeks: priPlan.weeks,
        metric: priPlan.metric,
        lpStyle: LP_CHANGE_STYLE[lpKey] || LP_CHANGE_STYLE[reduce(lpKey, false)],
      },
      desire: (input.desire || '').trim(),
      obstacles,
      support,
    },
    family: {
      familyTimeLabel: input.familyTime || '',
      familyTimeText: FAMILY_TIME_TEXT[input.familyTime || ''] || '',
      members,
    },
    plan: {
      intro: `Kế hoạch 30 ngày dưới đây xoay quanh lĩnh vực bạn chọn ưu tiên – “${priArea.label}” – và được điều chỉnh theo số chủ đạo ${num.lifePath}, bản mệnh ${hanh} và chủ đề năm ${num.currentYear} của bạn.`,
      weeks,
      daily,
      yearNote: `${py.theme}`,
    },
  };
}

function findNapIdx(canIdx: number, chiIdx: number): number {
  for (let i = 0; i < 60; i++) if (i % 10 === canIdx && i % 12 === chiIdx) return Math.floor(i / 2);
  return 0;
}

// Cung (palace) names re-export cho trang kết quả
export { PALACES };
