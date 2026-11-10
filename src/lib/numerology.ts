// Bộ tính Thần số học (hệ Pythagoras) — dùng cho trang khảo sát và trang /ketqua.
// Số bậc thầy 11, 22, 33 được giữ nguyên ở mọi bước rút gọn.

export const MASTER = [11, 22, 33];
export const KARMIC_DEBT = [13, 14, 16, 19];

/** Rút gọn về 1 chữ số (giữ số bậc thầy). Trả về kết quả và các giá trị trung gian. */
export function reduceTrail(n: number, keepMaster = true): { value: number; trail: number[] } {
  const trail = [n];
  let v = n;
  while (v > 9 && !(keepMaster && MASTER.includes(v))) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0);
    trail.push(v);
  }
  return { value: v, trail };
}
export const reduce = (n: number, keepMaster = true) => reduceTrail(n, keepMaster).value;
/** Rút gọn hoàn toàn về 1–9 (dùng cho Thử thách, tuổi mốc...). */
export const reduceFull = (n: number) => reduce(n, false);

/** Bỏ dấu tiếng Việt, đưa về chữ cái A–Z. */
export function stripVN(s: string): string {
  return s
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z ]/g, '');
}

const LETTER_VALUE: Record<string, number> = {};
'ABCDEFGHI'.split('').forEach((c, i) => (LETTER_VALUE[c] = i + 1));
'JKLMNOPQR'.split('').forEach((c, i) => (LETTER_VALUE[c] = i + 1));
'STUVWXYZ'.split('').forEach((c, i) => (LETTER_VALUE[c] = i + 1));
// Trong tên tiếng Việt, Y luôn đọc như nguyên âm (Thúy, Huy, Ly, Nguyễn...).
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

export interface Arrow {
  key: string;
  digits: [number, number, number];
}
// Bố cục biểu đồ ngày sinh:  3 6 9 / 2 5 8 / 1 4 7
export const ARROWS: Arrow[] = [
  { key: '123', digits: [1, 2, 3] },
  { key: '456', digits: [4, 5, 6] },
  { key: '789', digits: [7, 8, 9] },
  { key: '147', digits: [1, 4, 7] },
  { key: '258', digits: [2, 5, 8] },
  { key: '369', digits: [3, 6, 9] },
  { key: '159', digits: [1, 5, 9] },
  { key: '357', digits: [3, 5, 7] },
];

export interface Pinnacle {
  index: number; // 1..4
  value: number;
  startAge: number;
  endAge: number | null; // null = đến hết đời
  challenge: number;
}

export interface NumerologyResult {
  lifePath: number;
  lifePathTrail: number[];
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number; // ngày sinh rút gọn
  birthDayRaw: number;
  attitude: number;
  maturity: number;
  personalYear: number;
  personalMonth: number;
  currentYear: number;
  currentMonth: number;
  karmicDebts: number[];
  karmicLessons: number[]; // các số vắng mặt trong tên
  nameCounts: number[]; // [0] bỏ trống, 1..9
  birthCounts: number[]; // [0] bỏ trống, 1..9
  arrowsPresent: string[];
  arrowsMissing: string[];
  planes: { physical: number; emotional: number; mental: number };
  pinnacles: Pinnacle[];
  currentPinnacle: number; // index 1..4
  age: number;
  hasName: boolean;
}

export function computeNumerology(
  fullName: string,
  day: number,
  month: number,
  year: number,
  now: Date = new Date()
): NumerologyResult {
  // ----- Số chủ đạo (rút gọn từng thành phần rồi cộng) -----
  const d = reduceTrail(day);
  const m = reduceTrail(month);
  const y = reduceTrail(year);
  const lpSum = d.value + m.value + y.value;
  const lp = reduceTrail(lpSum);
  const lifePath = lp.value;

  // ----- Các số từ tên -----
  const name = stripVN(fullName || '');
  const letters = name.replace(/ /g, '').split('');
  const nameCounts = new Array(10).fill(0);
  let allSum = 0;
  let vowelSum = 0;
  let consSum = 0;
  letters.forEach((c) => {
    const v = LETTER_VALUE[c] || 0;
    if (!v) return;
    nameCounts[v]++;
    allSum += v;
    if (VOWELS.has(c)) vowelSum += v;
    else consSum += v;
  });
  const hasName = letters.length > 0;
  const expressionT = reduceTrail(allSum);
  const soulT = reduceTrail(vowelSum);
  const persT = reduceTrail(consSum);

  const birthday = reduce(day);
  const attitude = reduce(d.value + m.value);
  const maturity = reduce(lifePath + (hasName ? expressionT.value : 0));

  // ----- Năm / tháng cá nhân -----
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const personalYear = reduce(d.value + m.value + reduce(curYear), false);
  const personalMonth = reduce(personalYear + curMonth, false);

  // ----- Nghiệp quả -----
  const debts = new Set<number>();
  [lp.trail, d.trail, expressionT.trail, soulT.trail, persT.trail].forEach((t) =>
    t.forEach((v) => KARMIC_DEBT.includes(v) && debts.add(v))
  );
  if (!hasName) {
    // không có tên → bỏ nợ nghiệp suy ra từ tên
    [expressionT.trail, soulT.trail, persT.trail].forEach((t) => t.forEach((v) => debts.delete(v)));
    lp.trail.concat(d.trail).forEach((v) => KARMIC_DEBT.includes(v) && debts.add(v));
  }
  const karmicLessons = hasName ? [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => nameCounts[n] === 0) : [];

  // ----- Biểu đồ ngày sinh -----
  const birthCounts = new Array(10).fill(0);
  `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`.split('').forEach((c) => {
    const n = Number(c);
    if (n > 0) birthCounts[n]++;
  });
  const arrowsPresent = ARROWS.filter((a) => a.digits.every((n) => birthCounts[n] > 0)).map((a) => a.key);
  const arrowsMissing = ARROWS.filter((a) => a.digits.every((n) => birthCounts[n] === 0)).map((a) => a.key);
  const sumOf = (ns: number[]) => ns.reduce((s, n) => s + birthCounts[n], 0);
  const planes = { physical: sumOf([1, 4, 7]), emotional: sumOf([2, 5, 8]), mental: sumOf([3, 6, 9]) };

  // ----- Bốn đỉnh cao & thử thách -----
  const mR = reduce(month);
  const dR = reduce(day);
  const yR = reduce(year);
  const p1 = reduce(mR + dR);
  const p2 = reduce(dR + yR);
  const p3 = reduce(p1 + p2);
  const p4 = reduce(mR + yR);
  const m1 = reduceFull(month);
  const d1 = reduceFull(day);
  const y1 = reduceFull(year);
  const c1 = Math.abs(m1 - d1);
  const c2 = Math.abs(d1 - y1);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m1 - y1);
  const end1 = 36 - reduceFull(lifePath);
  const pin: Pinnacle[] = [
    { index: 1, value: p1, startAge: 0, endAge: end1, challenge: c1 },
    { index: 2, value: p2, startAge: end1 + 1, endAge: end1 + 9, challenge: c2 },
    { index: 3, value: p3, startAge: end1 + 10, endAge: end1 + 18, challenge: c3 },
    { index: 4, value: p4, startAge: end1 + 19, endAge: null, challenge: c4 },
  ];
  const age = Math.max(0, curYear - year);
  const current = pin.find((p) => p.endAge === null || age <= p.endAge) || pin[3];

  return {
    lifePath,
    lifePathTrail: lp.trail,
    expression: hasName ? expressionT.value : 0,
    soulUrge: hasName ? soulT.value : 0,
    personality: hasName ? persT.value : 0,
    birthday,
    birthDayRaw: day,
    attitude,
    maturity,
    personalYear,
    personalMonth,
    currentYear: curYear,
    currentMonth: curMonth,
    karmicDebts: [...debts].sort((a, b) => a - b),
    karmicLessons,
    nameCounts,
    birthCounts,
    arrowsPresent,
    arrowsMissing,
    planes,
    pinnacles: pin,
    currentPinnacle: current.index,
    age,
    hasName,
  };
}
