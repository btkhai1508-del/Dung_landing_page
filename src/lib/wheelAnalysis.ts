// Phân tích Bánh xe cuộc đời theo MỨC ĐIỂM và LIÊN KẾT giữa các lĩnh vực:
// hình dạng bánh xe, ba trụ cột, nan hoa then chốt (keystone), 28 cặp liên kết, các vòng xoáy.

import { AREAS, AreaKey } from '../data/lifeWheel';
import { LINKS, LEVELS, GROUPS, GROUP_PATTERN, SHAPE_TEXT, CYCLES, PairLink } from '../data/wheelLinks';

export type Scores = Record<AreaKey, number>;

const labelOf = (k: AreaKey) => AREAS.find((a) => a.key === k)!.label;
const fmt = (k: AreaKey, s: Scores) => `${labelOf(k)} (${s[k]}/10)`;

export function levelInfo(key: AreaKey, score: number) {
  const lv = LEVELS.find((l) => score <= l.max) || LEVELS[LEVELS.length - 1];
  return { label: lv.label, tone: lv.tone, lead: lv.lead(labelOf(key)) };
}

// Trọng số tác động from → to
function weight(from: AreaKey, to: AreaKey): number {
  for (const l of LINKS) {
    if (l.a === from && l.b === to) return l.w[0];
    if (l.b === from && l.a === to) return l.w[1];
  }
  return 1;
}
// Câu "from mạnh thì giúp to như thế nào"
function lever(from: AreaKey, to: AreaKey): string {
  for (const l of LINKS) {
    if (l.a === from && l.b === to) return l.aToB;
    if (l.b === from && l.a === to) return l.bToA;
  }
  return '';
}

type InsightType = 'support' | 'bothLow' | 'imbalance' | 'bothHigh';
interface Insight {
  a: AreaKey;
  b: AreaKey;
  type: InsightType;
  strong?: AreaKey;
  weak?: AreaKey;
  severity: number;
  title: string;
  text: string;
  action?: string;
  pair: PairLink;
}

function pairInsight(p: PairLink, s: Scores): Insight | null {
  const sa = s[p.a];
  const sb = s[p.b];
  const A = fmt(p.a, s);
  const B = fmt(p.b, s);
  const wmax = Math.max(p.w[0], p.w[1]);

  if (sa <= 5 && sb <= 5 && sa + sb <= 9) {
    // cùng thấp: đề xuất bắt đầu từ lĩnh vực có tác động mạnh hơn
    const from = p.w[0] >= p.w[1] ? p.a : p.b;
    const to = from === p.a ? p.b : p.a;
    return {
      a: p.a, b: p.b, type: 'bothLow', severity: (20 - sa - sb) * wmax, pair: p,
      title: `${labelOf(p.a)} ↔ ${labelOf(p.b)}`,
      text: `${A} và ${B} đang cùng thấp và kéo nhau xuống. ${p.link}`,
      action: `Nên bắt đầu từ ${labelOf(from)}, vì lĩnh vực này tác động mạnh tới ${labelOf(to)}: ${lever(from, to)}`,
    };
  }
  const gap = Math.abs(sa - sb);
  const hi = Math.max(sa, sb);
  const lo = Math.min(sa, sb);
  if (gap >= 3 && hi >= 7 && lo <= 6) {
    const strong = sa >= sb ? p.a : p.b;
    const weak = strong === p.a ? p.b : p.a;
    const imbalance = gap >= 5 && hi >= 8 && lo <= 4;
    const w = weight(strong, weak);
    return {
      a: p.a, b: p.b, strong, weak, pair: p,
      type: imbalance ? 'imbalance' : 'support',
      severity: gap * w * (imbalance ? 1.3 : 1),
      title: imbalance ? `${labelOf(p.a)} ↔ ${labelOf(p.b)}` : `${labelOf(strong)} → ${labelOf(weak)}`,
      text: imbalance
        ? `${fmt(strong, s)} rất cao trong khi ${fmt(weak, s)} rất thấp; có thể bạn đang đánh đổi ${labelOf(weak)} để có ${labelOf(strong)}. ${p.link}`
        : `${fmt(strong, s)} đang khá mạnh trong khi ${fmt(weak, s)} còn yếu, nên đây là điểm tựa để nâng ${labelOf(weak)}.`,
      action: lever(strong, weak),
    };
  }
  if (sa >= 8 && sb >= 8) {
    return {
      a: p.a, b: p.b, type: 'bothHigh', severity: 0.5, pair: p,
      title: `${labelOf(p.a)} ↔ ${labelOf(p.b)}`,
      text: `${A} và ${B} cùng ở mức cao và đang nâng đỡ nhau. Hãy giữ nhịp cho cả hai.`,
      action: p.aToB,
    };
  }
  return null;
}

export interface WheelAnalysis {
  levels: Record<string, { label: string; tone: string; lead: string }>;
  shape: { label: string; text: string; spread: number; lowCount: number };
  groups: { key: string; label: string; avg: number }[];
  groupText: string;
  keystone: { key: string; label: string; score: number; text: string; note: string; affected: { label: string; score: number }[] };
  links: { tone: InsightType; title: string; text: string; action?: string }[];
  related: Record<string, { label: string; score: number; tone: string; text: string }[]>;
  cycles: { name: string; state: 'down' | 'up'; text: string; weakest: { label: string; score: number }; advice: string }[];
}

export function analyzeWheel(s: Scores, priority: AreaKey | null): WheelAnalysis {
  const keys = AREAS.map((a) => a.key);
  const vals = keys.map((k) => s[k]);
  const avg = vals.reduce((t, v) => t + v, 0) / vals.length;
  const spread = Math.max(...vals) - Math.min(...vals);
  const lowCount = vals.filter((v) => v <= 4).length;

  // ---- mức điểm ----
  const levels: WheelAnalysis['levels'] = {};
  keys.forEach((k) => (levels[k] = levelInfo(k, s[k])));

  // ---- hình dạng ----
  let shape: WheelAnalysis['shape'];
  if (avg < 4.5) shape = { label: 'Phần lớn các nan đều thấp', text: SHAPE_TEXT.allLow, spread, lowCount };
  else if (avg >= 8 && spread <= 2) shape = { label: 'Bánh xe lớn và đều', text: SHAPE_TEXT.allHigh, spread, lowCount };
  else if (lowCount >= 4) shape = { label: 'Nhiều nan thụt sâu', text: SHAPE_TEXT.dents, spread, lowCount };
  else if (spread >= 5) shape = { label: 'Bánh xe méo rõ', text: SHAPE_TEXT.lopsided, spread, lowCount };
  else if (spread >= 3) shape = { label: 'Bánh xe hơi méo', text: SHAPE_TEXT.uneven, spread, lowCount };
  else shape = { label: 'Bánh xe khá tròn', text: SHAPE_TEXT.round, spread, lowCount };

  // ---- ba trụ cột ----
  const groups = GROUPS.map((g) => ({ key: g.key as string, label: g.label, avg: Math.round((g.areas.reduce((t, k) => t + s[k], 0) / g.areas.length) * 10) / 10 }));
  const gSorted = [...groups].sort((a, b) => b.avg - a.avg);
  const groupText =
    gSorted[0].avg - gSorted[gSorted.length - 1].avg >= 1.5
      ? GROUP_PATTERN[`${gSorted[0].key}>${gSorted[gSorted.length - 1].key}`]
      : GROUP_PATTERN.balanced;

  // ---- liên kết ----
  const insights = LINKS.map((p) => pairInsight(p, s)).filter(Boolean) as Insight[];
  const pickLinks = (): Insight[] => {
    const cap: Record<InsightType, number> = { imbalance: 2, support: 2, bothLow: 3, bothHigh: 3 };
    const used: Record<InsightType, number> = { imbalance: 0, support: 0, bothLow: 0, bothHigh: 0 };
    const perArea: Record<string, number> = {};
    const chosen: Insight[] = [];
    const pool = [...insights].filter((i) => i.type !== 'bothHigh').sort((a, b) => b.severity - a.severity);
    // ưu tiên lấy đủ từng loại theo trần, sau đó mới bù thêm theo mức độ
    for (const i of pool) {
      if (chosen.length >= 6) break;
      if (used[i.type] >= cap[i.type]) continue;
      if ((perArea[i.a] || 0) >= 3 || (perArea[i.b] || 0) >= 3) continue;
      chosen.push(i);
      used[i.type]++;
      perArea[i.a] = (perArea[i.a] || 0) + 1;
      perArea[i.b] = (perArea[i.b] || 0) + 1;
    }
    if (!chosen.length) {
      // không có cặp lệch/cùng thấp: lấy vài cặp cùng cao để người dùng thấy điểm mạnh liên kết
      return insights.filter((i) => i.type === 'bothHigh').sort((a, b) => b.pair.w[0] + b.pair.w[1] - (a.pair.w[0] + a.pair.w[1])).slice(0, 3);
    }
    const order: Record<InsightType, number> = { imbalance: 0, bothLow: 1, support: 2, bothHigh: 3 };
    return chosen.sort((a, b) => order[a.type] - order[b.type] || b.severity - a.severity);
  };
  const topLinks = pickLinks().map((i) => ({ tone: i.type, title: i.title, text: i.text, action: i.action }));

  // ---- nan hoa then chốt ----
  const foundation: AreaKey[] = ['health', 'spirituality'];
  const total = (x: AreaKey) => {
    const lv = keys.filter((y) => y !== x && s[y] <= 6).reduce((t, y) => t + weight(x, y) * (7 - s[y]), 0);
    const own = s[x] <= 6 ? (7 - s[x]) * 1.5 : 0;
    return lv + own;
  };
  let candidates = keys.filter((k) => s[k] <= 7);
  if (lowCount >= 4) {
    const f = foundation.filter((k) => s[k] <= 7);
    if (f.length) candidates = f;
  }
  if (!candidates.length) candidates = [[...keys].sort((a, b) => s[a] - s[b])[0]];
  candidates.sort((a, b) => total(b) - total(a) || s[a] - s[b]);
  const key = candidates[0];

  const affected = keys
    .filter((y) => y !== key && s[y] <= 6)
    .sort((a, b) => weight(key, b) * (7 - s[b]) - weight(key, a) * (7 - s[a]))
    .slice(0, 3);
  let kText: string;
  if (affected.length) {
    kText =
      `Nan hoa then chốt của bạn là ${fmt(key, s)}. Đây là lĩnh vực mà khi cải thiện sẽ kéo theo nhiều lĩnh vực khác: ` +
      `${affected.map((y) => fmt(y, s)).join(', ')}. ` +
      affected.slice(0, 2).map((y) => `${labelOf(y)}: ${lever(key, y)}`).join(' ');
  } else if (Math.min(...vals) >= 8) {
    kText = `Bánh xe của bạn đã rất đầy nên chưa cần một nan then chốt để “cứu”. Điều quan trọng là giữ nhịp và để ý các điểm cao không đang đánh đổi nhau; lĩnh vực thấp nhất hiện là ${fmt(key, s)}.`;
  } else if (spread <= 1) {
    kText = `Các lĩnh vực của bạn đang khá đều nhau nên chưa có nan then chốt rõ rệt. Sức khỏe và nội tâm là nền cho mọi thứ còn lại, nên hãy duy trì hai nan này và chọn thêm lĩnh vực bạn thấy hứng thú nhất để nâng tiếp.`;
  } else {
    kText = `Các lĩnh vực của bạn khá đều. ${fmt(key, s)} là điểm thấp nhất nên là nơi nên chăm sóc tiếp để bánh xe tròn hơn.`;
  }
  if (lowCount >= 4) kText += ' Vì có nhiều nan thấp cùng lúc, bắt đầu từ nền tảng (sức khỏe, nội tâm) sẽ nhẹ và bền hơn là sửa tất cả cùng lúc.';
  let note = '';
  if (priority && priority !== key) {
    note =
      weight(key, priority) >= 2 && s[priority] <= 7
        ? `Bạn đã chọn ưu tiên ${fmt(priority, s)}. Hai hướng không mâu thuẫn: hãy bắt đầu từ ${labelOf(key)} vì ${lever(key, priority).replace(/^./, (c) => c.toLowerCase())} Sau đó tiếp tục với ${labelOf(priority)}.`
        : `Bạn đã chọn ưu tiên ${fmt(priority, s)}. Bạn có thể làm song song: một hành động nhỏ cho ${labelOf(key)} và một hành động nhỏ cho ${labelOf(priority)}.`;
  } else if (priority && priority === key) {
    note = `Lĩnh vực bạn chọn ưu tiên (${labelOf(priority)}) trùng với nan then chốt mà dữ liệu cho thấy, đây là một lựa chọn rất hợp lý.`;
  }

  // ---- gợi ý theo từng lĩnh vực ----
  const related: WheelAnalysis['related'] = {};
  keys.forEach((x) => {
    const mine = insights.filter((i) => i.a === x || i.b === x).sort((a, b) => b.severity - a.severity).slice(0, 2);
    related[x] = mine.map((i) => {
      const other = i.a === x ? i.b : i.a;
      let text = '';
      if (i.type === 'bothLow') text = `Cùng thấp với ${labelOf(other)}: ${i.pair.link}`;
      else if (i.type === 'bothHigh') text = `Cùng ${labelOf(other)} đang nâng đỡ nhau.`;
      else if (i.weak === x) text = i.type === 'imbalance' ? `Có thể đang bị đánh đổi vì ${labelOf(other)} rất cao: ${i.pair.link}` : `${labelOf(other)} đang mạnh và có thể nâng lĩnh vực này: ${lever(other, x)}`;
      else text = i.type === 'imbalance' ? `Điểm cao này có thể đang đánh đổi ${labelOf(other)}: ${i.pair.link}` : `Thế mạnh này có thể nâng ${labelOf(other)}: ${lever(x, other)}`;
      return { label: labelOf(other), score: s[other], tone: i.type, text };
    });
  });

  // ---- vòng xoáy ----
  const cycles: WheelAnalysis['cycles'] = [];
  CYCLES.forEach((c) => {
    const m = c.members.map((k) => s[k]);
    const a = m.reduce((t, v) => t + v, 0) / m.length;
    const weakestKey = [...c.members].sort((x, y) => s[x] - s[y])[0];
    if (a <= 5.5) {
      cycles.push({ name: c.name, state: 'down', text: c.down, weakest: { label: labelOf(weakestKey), score: s[weakestKey] }, advice: `${c.breakAdvice} Mắt xích yếu nhất hiện là ${fmt(weakestKey, s)}.` });
    } else if (a >= 7.5) {
      cycles.push({ name: c.name, state: 'up', text: c.up, weakest: { label: labelOf(weakestKey), score: s[weakestKey] }, advice: `Giữ nhịp đang tốt; mắt xích cần để ý là ${fmt(weakestKey, s)}.` });
    }
  });

  return {
    levels,
    shape,
    groups,
    groupText,
    keystone: { key, label: labelOf(key), score: s[key], text: kText, note, affected: affected.map((y) => ({ label: labelOf(y), score: s[y] })) },
    links: topLinks,
    related,
    cycles,
  };
}
