// Bộ lập lá số Tử vi, Nạp âm, Bát trạch.
// Bảng Mệnh/Thân, Cục, vị trí sao Tử Vi và độ sáng của chính tinh được đối chiếu với
// "Tử Vi Hàm Số" (Nguyễn Phát Lộc). Lịch âm tính theo thuật toán thiên văn (lunar.ts).

import { solarToLunar, LunarDate } from './lunar';

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const PALACES = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
  'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ',
] as const;

export type Hanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

// ---------- Nạp âm 60 hoa giáp (30 cặp) ----------
export const NAP_AM: { name: string; hanh: Hanh }[] = [
  { name: 'Hải Trung Kim', hanh: 'Kim' }, { name: 'Lư Trung Hỏa', hanh: 'Hỏa' },
  { name: 'Đại Lâm Mộc', hanh: 'Mộc' }, { name: 'Lộ Bàng Thổ', hanh: 'Thổ' },
  { name: 'Kiếm Phong Kim', hanh: 'Kim' }, { name: 'Sơn Đầu Hỏa', hanh: 'Hỏa' },
  { name: 'Giản Hạ Thủy', hanh: 'Thủy' }, { name: 'Thành Đầu Thổ', hanh: 'Thổ' },
  { name: 'Bạch Lạp Kim', hanh: 'Kim' }, { name: 'Dương Liễu Mộc', hanh: 'Mộc' },
  { name: 'Tuyền Trung Thủy', hanh: 'Thủy' }, { name: 'Ốc Thượng Thổ', hanh: 'Thổ' },
  { name: 'Tích Lịch Hỏa', hanh: 'Hỏa' }, { name: 'Tùng Bách Mộc', hanh: 'Mộc' },
  { name: 'Trường Lưu Thủy', hanh: 'Thủy' }, { name: 'Sa Trung Kim', hanh: 'Kim' },
  { name: 'Sơn Hạ Hỏa', hanh: 'Hỏa' }, { name: 'Bình Địa Mộc', hanh: 'Mộc' },
  { name: 'Bích Thượng Thổ', hanh: 'Thổ' }, { name: 'Kim Bạc Kim', hanh: 'Kim' },
  { name: 'Phú Đăng Hỏa', hanh: 'Hỏa' }, { name: 'Thiên Hà Thủy', hanh: 'Thủy' },
  { name: 'Đại Dịch Thổ', hanh: 'Thổ' }, { name: 'Thoa Xuyến Kim', hanh: 'Kim' },
  { name: 'Tang Đố Mộc', hanh: 'Mộc' }, { name: 'Đại Khê Thủy', hanh: 'Thủy' },
  { name: 'Sa Trung Thổ', hanh: 'Thổ' }, { name: 'Thiên Thượng Hỏa', hanh: 'Hỏa' },
  { name: 'Thạch Lựu Mộc', hanh: 'Mộc' }, { name: 'Đại Hải Thủy', hanh: 'Thủy' },
];

/** Chỉ số 0..29 của nạp âm theo can chi. */
export function napAmIndex(canIdx: number, chiIdx: number): number {
  for (let i = 0; i < 60; i++) if (i % 10 === canIdx && i % 12 === chiIdx) return Math.floor(i / 2);
  return 0;
}

// ---------- Bát trạch ----------
export interface BatTrach {
  quai: number;
  name: 'Khảm' | 'Khôn' | 'Chấn' | 'Tốn' | 'Càn' | 'Đoài' | 'Cấn' | 'Ly';
  hanh: Hanh;
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
}
const QUAI: Record<number, Omit<BatTrach, 'quai'>> = {
  1: { name: 'Khảm', hanh: 'Thủy', group: 'Đông Tứ Mệnh' },
  2: { name: 'Khôn', hanh: 'Thổ', group: 'Tây Tứ Mệnh' },
  3: { name: 'Chấn', hanh: 'Mộc', group: 'Đông Tứ Mệnh' },
  4: { name: 'Tốn', hanh: 'Mộc', group: 'Đông Tứ Mệnh' },
  6: { name: 'Càn', hanh: 'Kim', group: 'Tây Tứ Mệnh' },
  7: { name: 'Đoài', hanh: 'Kim', group: 'Tây Tứ Mệnh' },
  8: { name: 'Cấn', hanh: 'Thổ', group: 'Tây Tứ Mệnh' },
  9: { name: 'Ly', hanh: 'Hỏa', group: 'Đông Tứ Mệnh' },
};
/** Cung phi theo chu kỳ Lạc Thư: nam đếm ngược, nữ đếm xuôi (dùng năm âm lịch). */
export function batTrach(lunarYear: number, female: boolean): BatTrach {
  let q = female ? (((lunarYear - 1859) % 9) + 9) % 9 : (((1865 - lunarYear) % 9) + 9) % 9;
  if (q === 0) q = 9;
  if (q === 5) q = female ? 8 : 2;
  return { quai: q, ...QUAI[q] };
}

// ---------- Cục ----------
const CUC_HANH: Hanh[] = ['Thủy', 'Mộc', 'Kim', 'Thổ', 'Hỏa']; // index = cục - 2
export const CUC_NUM: Record<string, number> = { Thủy: 2, Mộc: 3, Kim: 4, Thổ: 5, Hỏa: 6 };
// hàng: cặp Can (Giáp-Kỷ, Ất-Canh, Bính-Tân, Đinh-Nhâm, Mậu-Quý); cột: cặp cung Mệnh (Tý-Sửu ... Tuất-Hợi)
const CUC_TABLE: Hanh[][] = [
  ['Thủy', 'Hỏa', 'Mộc', 'Thổ', 'Kim', 'Hỏa'],
  ['Hỏa', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Thổ'],
  ['Thổ', 'Mộc', 'Thủy', 'Kim', 'Hỏa', 'Mộc'],
  ['Mộc', 'Kim', 'Hỏa', 'Thủy', 'Thổ', 'Kim'],
  ['Kim', 'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy'],
];
// Vị trí sao Tử Vi: [cục Thủy, Mộc, Kim, Thổ, Hỏa][ngày âm - 1] → chỉ số cung (Tý = 0)
const TU_VI_TABLE: number[][] = [
  [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0,0,1,1,2,2,3,3,4],
  [4,1,2,5,2,3,6,3,4,7,4,5,8,5,6,9,6,7,10,7,8,11,8,9,0,9,10,1,10,11],
  [11,4,1,2,0,5,2,3,1,6,3,4,2,7,4,5,3,8,5,6,4,9,6,7,5,10,7,8,6,11],
  [6,11,4,1,2,7,0,5,2,3,8,1,6,3,4,9,2,7,4,5,10,3,8,5,6,11,4,9,6,7],
  [9,6,11,4,1,2,10,7,0,5,2,3,11,8,1,6,3,4,0,9,2,7,4,5,1,10,3,8,5,6],
];

// ---------- 14 chính tinh ----------
export type StarId =
  | 'tuvi' | 'thienco' | 'thaiduong' | 'vukhuc' | 'thiendong' | 'liemtrinh'
  | 'thienphu' | 'thaiam' | 'thamlang' | 'cumon' | 'thientuong' | 'thienluong' | 'thatsat' | 'phaquan';

export const STAR_NAMES: Record<StarId, string> = {
  tuvi: 'Tử Vi', thienco: 'Thiên Cơ', thaiduong: 'Thái Dương', vukhuc: 'Vũ Khúc', thiendong: 'Thiên Đồng',
  liemtrinh: 'Liêm Trinh', thienphu: 'Thiên Phủ', thaiam: 'Thái Âm', thamlang: 'Tham Lang', cumon: 'Cự Môn',
  thientuong: 'Thiên Tướng', thienluong: 'Thiên Lương', thatsat: 'Thất Sát', phaquan: 'Phá Quân',
};

export type Bright = 'M' | 'V' | 'Đ' | 'B' | 'H'; // Miếu, Vượng, Đắc, Bình, Hãm
export const BRIGHT_LABEL: Record<Bright, string> = { M: 'Miếu', V: 'Vượng', Đ: 'Đắc', B: 'Bình', H: 'Hãm' };
// thứ tự cung: Tý Sửu Dần Mão Thìn Tỵ Ngọ Mùi Thân Dậu Tuất Hợi
const BRIGHT: Record<StarId, string> = {
  tuvi:      'BĐMBVMMĐMBVB',
  thienco:   'ĐĐHMMVĐĐVMMH',
  thaiduong: 'HBVMVMMBHHHH',
  vukhuc:    'VMVĐMHVMVĐMH',
  thiendong: 'VHMĐHĐHHMHHĐ',
  liemtrinh: 'VĐVHMHVĐVHMH',
  thienphu:  'MBMBVĐMĐMBVĐ',
  thaiam:    'MBHHHHHĐVVVM',
  thamlang:  'HMĐHVHHMĐHVH',
  cumon:     'VHVMHHVHĐMHĐ',
  thientuong:'VĐMHVĐVĐMHVĐ',
  thienluong:'VĐVVMHMĐVHMH',
  thatsat:   'MĐMHHVMĐMHHV',
  phaquan:   'MVHHĐHMVHHĐH',
};
export const brightOf = (star: StarId, chiIdx: number): Bright => BRIGHT[star][chiIdx] as Bright;

const mod12 = (n: number) => ((n % 12) + 12) % 12;

/** Đặt 14 chính tinh: trả về map cung (0..11) → danh sách sao. */
export function placeStars(tuViPos: number): Record<number, StarId[]> {
  const pos: Partial<Record<StarId, number>> = {};
  // nhóm Tử Vi: đi ngược chiều kim đồng hồ
  pos.tuvi = tuViPos;
  pos.thienco = mod12(tuViPos - 1);
  pos.thaiduong = mod12(tuViPos - 3);
  pos.vukhuc = mod12(tuViPos - 4);
  pos.thiendong = mod12(tuViPos - 5);
  pos.liemtrinh = mod12(tuViPos - 8);
  // nhóm Thiên Phủ: đối xứng qua trục Dần–Thân, đi thuận
  const phu = mod12(4 - tuViPos);
  pos.thienphu = phu;
  pos.thaiam = mod12(phu + 1);
  pos.thamlang = mod12(phu + 2);
  pos.cumon = mod12(phu + 3);
  pos.thientuong = mod12(phu + 4);
  pos.thienluong = mod12(phu + 5);
  pos.thatsat = mod12(phu + 6);
  pos.phaquan = mod12(phu + 10);
  const map: Record<number, StarId[]> = {};
  (Object.keys(pos) as StarId[]).forEach((s) => {
    const p = pos[s] as number;
    (map[p] = map[p] || []).push(s);
  });
  return map;
}

// ---------- Kết quả ----------
export interface PalaceInfo {
  index: number; // 0..11 (Mệnh = 0)
  name: string;
  chi: number;
  stars: { id: StarId; bright: Bright }[];
}
export interface DaiVan {
  fromAge: number;
  toAge: number;
  palace: string;
  chi: number;
  stars: StarId[];
}
export interface TuViResult {
  lunar: LunarDate;
  chartMonth: number;
  canIdx: number;
  chiIdx: number;
  canChi: string;
  napAm: { name: string; hanh: Hanh };
  duong: boolean;
  amDuongLabel: string; // "Dương Nam"...
  batTrach: BatTrach;
  hasChart: boolean;
  hourIdx: number | null;
  menhPos?: number;
  thanPos?: number;
  thanPalace?: string;
  cuc?: { hanh: Hanh; num: number };
  tuViPos?: number;
  palaces?: PalaceInfo[];
  daiVan?: DaiVan[];
  currentDaiVan?: DaiVan;
  menhVoChinhDieu?: boolean;
  /** Chính tinh dùng để luận Mệnh (nếu Mệnh vô chính diệu thì mượn sao Thiên Di) */
  menhStars?: { id: StarId; bright: Bright }[];
  cach: string[];
  tuoiAm: number;
}

/** "HH:MM" → chỉ số giờ địa chi (0 = Tý); null nếu không rõ. */
export function hourToIdx(time: string | null | undefined): { idx: number; lateTy: boolean } | null {
  const m = /^(\d{1,2}):(\d{2})/.exec((time || '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  if (h > 23) return null;
  return { idx: Math.floor(((h + 1) % 24) / 2), lateTy: h >= 23 };
}

export function computeTuVi(
  day: number,
  month: number,
  year: number,
  gender: 'Nam' | 'Nữ' | string,
  birthTime?: string | null,
  now: Date = new Date()
): TuViResult {
  const hour = hourToIdx(birthTime);
  // Giờ Tý muộn (23h–24h) tính sang ngày hôm sau
  let sd = day, sm = month, sy = year;
  if (hour?.lateTy) {
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    sd = next.getUTCDate(); sm = next.getUTCMonth() + 1; sy = next.getUTCFullYear();
  }
  // Can chi năm & nạp âm lấy theo ngày sinh thật (không dời sang hôm sau)
  const lunarBirth = solarToLunar(day, month, year);
  const lunar = hour?.lateTy ? solarToLunar(sd, sm, sy) : lunarBirth;
  const canIdx = (((lunarBirth.year - 4) % 10) + 10) % 10;
  const chiIdx = (((lunarBirth.year - 4) % 12) + 12) % 12;
  const nap = NAP_AM[napAmIndex(canIdx, chiIdx)];
  const duong = canIdx % 2 === 0;
  const female = gender === 'Nữ';
  const base: TuViResult = {
    lunar: lunarBirth,
    chartMonth: 0,
    canIdx,
    chiIdx,
    canChi: `${CAN[canIdx]} ${CHI[chiIdx]}`,
    napAm: nap,
    duong,
    amDuongLabel: `${duong ? 'Dương' : 'Âm'} ${female ? 'Nữ' : 'Nam'}`,
    batTrach: batTrach(lunarBirth.year, female),
    hasChart: false,
    hourIdx: hour ? hour.idx : null,
    cach: [],
    tuoiAm: Math.max(1, now.getFullYear() - lunarBirth.year + 1),
  };
  if (!hour) return base;

  // Tháng dùng để an Mệnh/Thân: tháng nhuận từ ngày 16 tính sang tháng sau
  let cm = lunar.month;
  if (lunar.leap && lunar.day > 15) cm = (cm % 12) + 1;
  const menhPos = mod12(2 + (cm - 1) - hour.idx);
  const thanPos = mod12(2 + (cm - 1) + hour.idx);

  // Cục: theo Can năm và cung Mệnh
  const canRow = canIdx % 5; // Giáp/Kỷ=0, Ất/Canh=1, Bính/Tân=2, Đinh/Nhâm=3, Mậu/Quý=4
  const cucHanh = CUC_TABLE[canRow][Math.floor(menhPos / 2)];
  const cucNum = CUC_NUM[cucHanh];
  const cucIdx = CUC_HANH.indexOf(cucHanh);
  const tuViPos = TU_VI_TABLE[cucIdx][Math.min(30, Math.max(1, lunar.day)) - 1];

  const starMap = placeStars(tuViPos);
  const palaces: PalaceInfo[] = PALACES.map((name, i) => {
    const chi = mod12(menhPos + i);
    return {
      index: i,
      name,
      chi,
      stars: (starMap[chi] || []).map((id) => ({ id, bright: brightOf(id, chi) })),
    };
  });
  const thanPalace = palaces.find((p) => p.chi === thanPos)?.name;

  // Mệnh vô chính diệu → mượn chính tinh cung Thiên Di
  const menhStarsOwn = palaces[0].stars;
  const voChinh = menhStarsOwn.length === 0;
  const menhStars = voChinh ? palaces[6].stars : menhStarsOwn;

  // Đại vận: Dương Nam & Âm Nữ đi thuận; Âm Nam & Dương Nữ đi nghịch
  const forward = (duong && !female) || (!duong && female);
  const daiVan: DaiVan[] = [];
  for (let k = 0; k < 11; k++) {
    const chi = mod12(menhPos + (forward ? k : -k));
    const p = palaces.find((x) => x.chi === chi) as PalaceInfo;
    daiVan.push({
      fromAge: cucNum + 10 * k,
      toAge: cucNum + 10 * k + 9,
      palace: p.name,
      chi,
      stars: p.stars.map((s) => s.id),
    });
  }
  const tuoi = base.tuoiAm;
  const currentDaiVan = daiVan.find((d) => tuoi >= d.fromAge && tuoi <= d.toAge) || (tuoi < cucNum ? undefined : daiVan[daiVan.length - 1]);

  // Cách cục: xét tam phương tứ chính của Mệnh (Mệnh, Tài Bạch, Quan Lộc, Thiên Di)
  const tp = [0, 4, 8, 6].flatMap((i) => palaces[i].stars.map((s) => s.id));
  const has = (ids: StarId[]) => ids.filter((x) => tp.includes(x)).length;
  const cach: string[] = [];
  if (has(['thatsat', 'phaquan', 'thamlang']) >= 3) cach.push('sat-pha-tham');
  if (has(['thienco', 'thaiam', 'thiendong', 'thienluong']) >= 3) cach.push('co-nguyet-dong-luong');
  if (has(['tuvi', 'thienphu', 'vukhuc', 'thientuong', 'liemtrinh']) >= 3) cach.push('tu-phu-vu-tuong');
  if (tp.includes('thaiduong') && tp.includes('thaiam')) cach.push('nhat-nguyet');
  if (tp.includes('cumon') && tp.includes('thaiduong')) cach.push('cu-nhat');
  if (palaces[0].stars.some((s) => s.id === 'tuvi') && palaces[0].stars.some((s) => s.id === 'thienphu')) cach.push('tu-phu-dong-cung');

  return {
    ...base,
    chartMonth: cm,
    hasChart: true,
    menhPos,
    thanPos,
    thanPalace,
    cuc: { hanh: cucHanh, num: cucNum },
    tuViPos,
    palaces,
    daiVan,
    currentDaiVan,
    menhVoChinhDieu: voChinh,
    menhStars,
    cach,
  };
}
