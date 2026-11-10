/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - DŨNG GIEO HẠT: LƯU DỮ LIỆU, EMAIL SAU 30 PHÚT, TRA CỨU KẾT QUẢ
 * ------------------------------------------------------------------------------
 * 1) Web ghi dữ liệu vào đúng tab (Quà Tặng Tầng 1 / Affiliate / tab đầu tiên).
 * 2) Tab "Quà Tặng Tầng 1": cột A là Mã DDMMXXX (XXX = STT trong ngày, 001–999).
 * 3) Sau khi người dùng hoàn thành khảo sát /bando, hệ thống gửi 1 email kèm mã
 *    tra cứu SAU 30 PHÚT (hàng đợi + trigger mỗi 5 phút).
 * 4) Trang /ketqua gọi doGet?action=result&phone=...&code=... để lấy dữ liệu người dùng.
 *
 * SAU KHI DÁN CODE NÀY:
 *   a. Chạy hàm setupTriggers() MỘT LẦN trong trình soạn thảo (cấp quyền khi được hỏi).
 *   b. Deploy → Manage deployments → Edit → New version → Deploy.
 *   c. Điền RESULT_PAGE_URL bên dưới (địa chỉ trang kết quả, ví dụ https://tenmien.com/ketqua).
 * ==============================================================================
 */

// 1. CẤU HÌNH
const SPREADSHEET_ID = "12Yb-Fu56Lnuc7lA7g23Atf8cWpThiJObud5HQjZzZEg"; // Sheet Dũng Gieo Hạt
const BRAND_NAME = "Dũng Gieo Hạt";
const RESULT_PAGE_URL = "";          // ví dụ: "https://tenmien.com/ketqua" — để trống thì email chỉ hướng dẫn bằng chữ
const MAIL_DELAY_MINUTES = 30;       // gửi email sau khi hoàn thành khảo sát
const MAIL_PREFIX = "mail_";
const EMAIL_SENT_HEADER = "Email đã gửi lúc";
const TZ = "Asia/Ho_Chi_Minh";

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ----------------------------------------------------------------------------
// GET: kiểm tra hoạt động / tra cứu kết quả
// ----------------------------------------------------------------------------
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === "result") return jsonOut(lookupResult(p.phone, p.code));
  return jsonOut({ status: "ready", message: "Webhook Dũng Gieo Hạt đang hoạt động bình thường!" });
}

// ----------------------------------------------------------------------------
// POST: nhận dữ liệu từ các form của website
// ----------------------------------------------------------------------------
function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    let body = {};
    if (e && e.postData && e.postData.contents && e.postData.type !== "application/x-www-form-urlencoded") {
      try { body = JSON.parse(e.postData.contents); } catch (err) {}
    }
    const get = (key) => String(params[key] || body[key] || "").trim();

    const customerName = get("name");
    const customerPhone = get("phone");
    const customerEmail = get("email");
    const formType = get("formType") || get("form");
    const sheetName = resolveSheetName(formType, get("sheet"));
    const isBando = normalizeName(sheetName) === normalizeName(BANDO_SHEET);

    // Các cột cần ghi (tiêu đề → giá trị), theo đúng thứ tự frontend gửi lên
    let fields = {};
    try { fields = JSON.parse(get("fields") || "{}"); } catch (err) {}
    if (Object.keys(fields).length === 0) {
      // Frontend bản cũ không gửi `fields` → tự dựng lại từ các tham số rời
      fields = isBando
        ? buildBandoFieldsFromLegacy(get)
        : { "Họ Và Tên": customerName, "SĐT": customerPhone, "Email": customerEmail };
    }

    const timestamp = new Date().toLocaleString("vi-VN", { timeZone: TZ });
    let duplicate = false;
    let code = "";

    const lock = LockService.getScriptLock();
    try {
      lock.waitLock(20000);

      // Chống ghi trùng: cùng tab + cùng người gửi lại trong 60 giây thì bỏ qua
      const cache = CacheService.getScriptCache();
      const dupKey = "dup_" + Utilities.base64EncodeWebSafe(
        Utilities.computeDigest(Utilities.DigestAlgorithm.MD5,
          [sheetName, customerName, customerPhone, customerEmail].map(normalizeName).join("|"), Utilities.Charset.UTF_8));
      duplicate = !!cache.get(dupKey);

      if (!duplicate) {
        cache.put(dupKey, "1", 60);
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = getTargetSheet(ss, sheetName);
        let row = Object.assign({ "Thời Gian": timestamp }, fields);
        if (isBando) {
          ensureFirstColumn(sheet, CODE_HEADER);
          code = nextDailyCode(sheet.getName());
          row = Object.assign({ [CODE_HEADER]: code }, row);
        }
        writeRowByHeaders(sheet, row);

        // Hẹn gửi email kèm mã sau MAIL_DELAY_MINUTES phút (chỉ với khảo sát có mã)
        if (isBando && code && customerEmail && customerEmail.indexOf("@") !== -1) {
          scheduleResultEmail(code, customerName, customerEmail, customerPhone);
        }
      }
    } catch (sheetError) {
      Logger.log("Lỗi ghi Google Sheet: " + sheetError.toString());
    } finally {
      lock.releaseLock();
    }

    return jsonOut({
      status: "success",
      sheet: sheetName || "(tab đầu tiên)",
      duplicate: duplicate,
      code: code,
      form: formType,
      saved: { name: customerName, phone: customerPhone, email: customerEmail },
    });
  } catch (error) {
    return jsonOut({ status: "error", message: error.toString() });
  }
}

const BANDO_SHEET = "Quà Tặng Tầng 1";
const CODE_HEADER = "Mã";
const AFFILIATE_SHEET = "Affiliate";

// Sinh mã DDMMXXX theo giờ Việt Nam. XXX đếm lại từ 001 mỗi ngày (lưu trong Script Properties).
function nextDailyCode(sheetName) {
  const now = new Date();
  const dd = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd");
  const mm = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "MM");
  const dayKey = "seq_" + normalizeName(sheetName) + "_" + Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "yyyyMMdd");
  const props = PropertiesService.getScriptProperties();
  const seq = Number(props.getProperty(dayKey) || "0") + 1;
  props.setProperty(dayKey, String(seq));
  return dd + mm + String(seq).padStart(3, "0");
}

// Đảm bảo cột `header` nằm ở cột A. Tab cũ chưa có thì chèn thêm 1 cột vào đầu.
function ensureFirstColumn(sheet, header) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1).setValue(header);
    return;
  }
  const first = String(sheet.getRange(1, 1).getValue());
  if (normalizeName(first) !== normalizeName(header)) {
    sheet.insertColumnBefore(1);
    sheet.getRange(1, 1).setValue(header);
  }
}

// Chuẩn hoá tên để so khớp: bỏ dấu, không phân biệt hoa thường, gộp khoảng trắng
function normalizeName(text) {
  return String(text || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/\s+/g, " ").trim();
}

// Tìm tab theo tên (không phân biệt hoa thường/dấu). Không có tên → tab đầu tiên.
// Chưa có tab → tự tạo mới.
function getTargetSheet(ss, sheetName) {
  if (!sheetName) return ss.getSheets()[0];
  const wanted = normalizeName(sheetName);
  const found = ss.getSheets().find((s) => normalizeName(s.getName()) === wanted);
  return found || ss.insertSheet(sheetName);
}

// Chọn tab theo loại form (hỗ trợ cả frontend bản cũ vốn gửi nhầm tab)
function resolveSheetName(formType, requested) {
  const f = String(formType || "").toUpperCase();
  if (f === "THU_THACH_AFFILIATE") return AFFILIATE_SHEET;
  if (f === "BANDO" || f === "BAN_DO_HANH_PHUC") return BANDO_SHEET;
  if (f === "QUA_TANG_MIEN_PHI") return "";   // popup trang chủ → tab đầu tiên
  return requested;
}

// Thứ tự cột của tab "Quà Tặng Tầng 1" khi frontend bản cũ chỉ gửi tham số rời
const BANDO_LEGACY_COLUMNS = [
  ["Họ Và Tên", "Họ và tên", "fullName", "name"],
  ["SĐT", "Số điện thoại", "phone"],
  ["Email", "Email", "email"],
  ["Ngày sinh", "Ngày sinh", "birthDate"],
  ["Giờ sinh", "Giờ sinh", "birthTime"],
  ["Giới tính", "Giới tính", "gender"],
  ["Tỉnh thành", "Tỉnh thành", "city"],
  ["Nghề nghiệp", "Nghề nghiệp", "occupation"],
  ["Số chủ đạo", "Số chủ đạo", "lifePathNumber"],
  ["Năm Can Chi", "Năm Can Chi", "tuViCanChi"],
  ["Bản Mệnh", "Bản Mệnh", "tuViNguHanh"],
  ["Cung Mệnh", "Cung Mệnh", "tuViCungMenh"],
  ["Thời gian cho gia đình", "Thời gian cho gia đình", "familyTime"],
  ["Có người thân đi kèm", "Có người thân đi kèm", "includeRelatives"],
  ["Thông tin người thân", "Thông tin người thân", "relatives"],
  ["Sức Khỏe", "Sức Khỏe"],
  ["Gia Đình", "Gia Đình"],
  ["Tài Chính", "Tài Chính"],
  ["Sự Nghiệp", "Sự Nghiệp"],
  ["Mối Quan Hệ", "Mối Quan Hệ"],
  ["Phát Triển Bản Thân", "Phát Triển Bản Thân"],
  ["Tinh Thần & Nội Tâm", "Tinh Thần & Nội Tâm"],
  ["Đóng Góp Xã Hội", "Đóng Góp Xã Hội"],
  ["Điểm trung bình bánh xe", "Điểm trung bình bánh xe"],
  ["Bánh xe hạnh phúc", "Bánh xe hạnh phúc", "wheelScores"],
  ["Lĩnh vực ưu tiên", "Lĩnh vực ưu tiên", "priorityArea"],
  ["Mong muốn thay đổi", "desireChange"],
  ["Rào cản lớn nhất", "Rào cản lớn nhất", "obstacles"],
  ["Nhận quà tặng giải pháp chi tiết", "Nhận quà tặng giải pháp chi tiết", "wantGiftSolution"],
  ["Hình thức hỗ trợ", "supportMethods"],
  ["Kênh nhận bản đồ", "Kênh nhận bản đồ", "deliveryChannels"],
  ["Đồng ý điều khoản", "consent"],
];

function buildBandoFieldsFromLegacy(get) {
  const out = {};
  BANDO_LEGACY_COLUMNS.forEach((col) => {
    const value = col.slice(1).map(get).find((v) => v !== "") || "";
    out[col[0]] = value;
  });
  return out;
}

const isBlank = (v) => String(v === null || v === undefined ? "" : v).trim() === "";

// Ghi 1 dòng theo hàng tiêu đề (dòng 1):
// - Dòng ghi = ngay dưới dòng cuối cùng có dữ liệu ở các cột CÓ tiêu đề
//   (ghi chú lẻ ở cột không tiêu đề không làm dữ liệu bị đẩy xuống).
// - Tiêu đề chưa có thì thêm vào ô tiêu đề trống đầu tiên mà cột bên dưới cũng trống,
//   nếu không có thì thêm ở cuối.
// - Chỉ ghi vào đúng các ô của form, không xoá nội dung khác trên dòng.
// - Mọi giá trị ghi dạng chữ (giữ số 0 đầu của SĐT, Mã).
function writeRowByHeaders(sheet, data) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const grid = (lastRow > 0 && lastCol > 0) ? sheet.getRange(1, 1, lastRow, lastCol).getValues() : [];
  const headers = grid.length ? grid[0].map(String) : [];
  const normalized = headers.map(normalizeName);
  const columnHasData = (c) => grid.some((r, i) => i > 0 && !isBlank(r[c]));

  const colOf = {};
  Object.keys(data).forEach((key) => {
    let idx = normalized.indexOf(normalizeName(key));
    if (idx === -1) {
      idx = headers.findIndex((h, c) => isBlank(h) && !columnHasData(c) && !Object.values(colOf).includes(c));
      if (idx === -1) idx = Math.max(headers.length, 0);
      headers[idx] = key;
      normalized[idx] = normalizeName(key);
      sheet.getRange(1, idx + 1).setValue(key);
    }
    colOf[key] = idx;
  });

  // Dòng cuối có dữ liệu thật trong các cột có tiêu đề
  let lastDataRow = 1;
  for (let r = grid.length - 1; r >= 1; r--) {
    if (headers.some((h, c) => !isBlank(h) && c < grid[r].length && !isBlank(grid[r][c]))) {
      lastDataRow = r + 1;
      break;
    }
  }
  const target = lastDataRow + 1;

  const width = Math.max(...Object.values(colOf)) + 1;
  const range = sheet.getRange(target, 1, 1, width);
  const values = range.getValues()[0];
  Object.keys(colOf).forEach((key) => {
    const v = data[key];
    values[colOf[key]] = isBlank(v) ? "" : "'" + String(v);
  });
  range.setValues([values]);
}

// ----------------------------------------------------------------------------
// TRA CỨU KẾT QUẢ CHO TRANG /ketqua
// ----------------------------------------------------------------------------
function normalizePhone(v) {
  let d = String(v === null || v === undefined ? "" : v).replace(/\D/g, "");
  if (d.indexOf("84") === 0 && d.length >= 11) d = "0" + d.slice(2);
  if (d.length === 9) d = "0" + d;
  return d;
}
function normalizeCode(v) {
  const d = String(v === null || v === undefined ? "" : v).replace(/\D/g, "");
  return d ? d.padStart(7, "0") : "";
}
function cellText(v) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, "dd/MM/yyyy");
  return String(v === null || v === undefined ? "" : v).trim();
}

function lookupResult(phoneRaw, codeRaw) {
  const phone = normalizePhone(phoneRaw);
  const code = normalizeCode(codeRaw);
  if (phone.length < 9 || code.length < 7) return { ok: false, error: "invalid" };

  // Giới hạn số lần thử sai: tối đa 8 lần / số điện thoại / giờ
  const cache = CacheService.getScriptCache();
  const tryKey = "try_" + phone;
  const tries = Number(cache.get(tryKey) || "0");
  if (tries >= 8) return { ok: false, error: "locked" };

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const wanted = normalizeName(BANDO_SHEET);
  const sheet = ss.getSheets().find((s) => normalizeName(s.getName()) === wanted);
  if (!sheet || sheet.getLastRow() < 2) return failLookup(cache, tryKey, tries);

  const values = sheet.getDataRange().getValues();
  const headers = values[0].map((h) => normalizeName(h));
  const col = (name) => headers.indexOf(normalizeName(name));
  const cCode = col(CODE_HEADER);
  const cPhone = col("SĐT");
  if (cCode < 0 || cPhone < 0) return failLookup(cache, tryKey, tries);

  let rowIdx = -1;
  for (let r = values.length - 1; r >= 1; r--) {
    if (normalizeCode(values[r][cCode]) === code && normalizePhone(values[r][cPhone]) === phone) { rowIdx = r; break; }
  }
  if (rowIdx < 0) return failLookup(cache, tryKey, tries);

  const row = values[rowIdx];
  const val = (name) => { const i = col(name); return i < 0 ? "" : cellText(row[i]); };
  let extra = {};
  try { extra = JSON.parse(val("Dữ liệu báo cáo") || "{}"); } catch (err) {}

  const scoreOf = (name) => { const m = /(\d+)/.exec(val(name)); return m ? Number(m[1]) : null; };
  cache.remove(tryKey);
  return {
    ok: true,
    record: {
      code: code,
      name: val("Họ Và Tên"),
      birthDate: val("Ngày sinh"),
      birthTime: val("Giờ sinh"),
      gender: val("Giới tính"),
      city: val("Tỉnh thành"),
      occupation: val("Nghề nghiệp"),
      familyTime: val("Thời gian cho gia đình"),
      scores: {
        health: scoreOf("Sức Khỏe"), family: scoreOf("Gia Đình"), finance: scoreOf("Tài Chính"),
        career: scoreOf("Sự Nghiệp"), relationships: scoreOf("Mối Quan Hệ"),
        selfDevelopment: scoreOf("Phát Triển Bản Thân"), spirituality: scoreOf("Tinh Thần & Nội Tâm"),
        community: scoreOf("Đóng Góp Xã Hội"),
      },
      priority: val("Lĩnh vực ưu tiên"),
      desire: val("Mong muốn thay đổi"),
      obstacles: extra.obstacles || splitList(val("Rào cản lớn nhất")),
      support: extra.support || splitList(val("Hình thức hỗ trợ")),
      relatives: extra.relatives || [],
      relativesText: val("Thông tin người thân"),
    },
  };
}
function splitList(s) { return String(s || "").split(/,\s*/).map((x) => x.trim()).filter(Boolean); }
function failLookup(cache, tryKey, tries) {
  cache.put(tryKey, String(tries + 1), 3600);
  return { ok: false, error: "notfound" };
}

// ----------------------------------------------------------------------------
// HÀNG ĐỢI EMAIL (gửi sau MAIL_DELAY_MINUTES phút)
// ----------------------------------------------------------------------------
function scheduleResultEmail(code, name, email, phone) {
  const due = Date.now() + MAIL_DELAY_MINUTES * 60 * 1000;
  PropertiesService.getScriptProperties().setProperty(
    MAIL_PREFIX + code,
    JSON.stringify({ code: code, name: name, to: email, phone: phone, due: due, tries: 0 })
  );
  try { ensureMailTrigger(); } catch (err) { Logger.log("Chưa tạo được trigger — hãy chạy setupTriggers(): " + err); }
}

function ensureMailTrigger() {
  const exists = ScriptApp.getProjectTriggers().some((t) => t.getHandlerFunction() === "processMailQueue");
  if (!exists) ScriptApp.newTrigger("processMailQueue").timeBased().everyMinutes(5).create();
}

/** CHẠY MỘT LẦN thủ công sau khi dán code: tạo trigger kiểm tra hàng đợi mỗi 5 phút. */
function setupTriggers() {
  ensureMailTrigger();
  Logger.log("Đã thiết lập trigger processMailQueue (mỗi 5 phút).");
}

function processMailQueue() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const all = props.getProperties();
    const now = Date.now();
    Object.keys(all).filter((k) => k.indexOf(MAIL_PREFIX) === 0).forEach((k) => {
      let job;
      try { job = JSON.parse(all[k]); } catch (err) { props.deleteProperty(k); return; }
      if (job.due > now) return;
      try {
        sendResultEmail(job);
        props.deleteProperty(k);
        markEmailSent(job.code);
      } catch (err) {
        job.tries = (job.tries || 0) + 1;
        Logger.log("Gửi email lỗi (" + job.code + ", lần " + job.tries + "): " + err);
        if (job.tries >= 5) props.deleteProperty(k);
        else props.setProperty(k, JSON.stringify(job));
      }
    });
  } finally {
    lock.releaseLock();
  }
}

// Ghi thời điểm đã gửi email vào cột "Email đã gửi lúc" của đúng dòng
function markEmailSent(code) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const wanted = normalizeName(BANDO_SHEET);
    const sheet = ss.getSheets().find((s) => normalizeName(s.getName()) === wanted);
    if (!sheet || sheet.getLastRow() < 2) return;
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map((h) => normalizeName(h));
    const cCode = headers.indexOf(normalizeName(CODE_HEADER));
    if (cCode < 0) return;
    let cSent = headers.indexOf(normalizeName(EMAIL_SENT_HEADER));
    if (cSent < 0) {
      cSent = headers.findIndex((h, i) => h === "" && !values.some((r, ri) => ri > 0 && !isBlank(r[i])));
      if (cSent < 0) cSent = values[0].length;
      sheet.getRange(1, cSent + 1).setValue(EMAIL_SENT_HEADER);
    }
    for (let r = values.length - 1; r >= 1; r--) {
      if (normalizeCode(values[r][cCode]) === normalizeCode(code)) {
        sheet.getRange(r + 1, cSent + 1).setValue("'" + new Date().toLocaleString("vi-VN", { timeZone: TZ }));
        return;
      }
    }
  } catch (err) {
    Logger.log("Không ghi được trạng thái email: " + err);
  }
}

// ----------------------------------------------------------------------------
// EMAIL: thiết kế mới — nền giấy ấm, thẻ mã tra cứu nổi bật, không còn Zalo/QR
// ----------------------------------------------------------------------------
function escapeHtml(s) {
  return String(s === null || s === undefined ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function maskPhone(p) {
  const d = normalizePhone(p);
  return d.length >= 7 ? d.slice(0, 3) + "****" + d.slice(-3) : "số điện thoại bạn đã đăng ký";
}

function sendResultEmail(job) {
  const name = job.name || "bạn";
  const code = job.code;
  const phoneHint = maskPhone(job.phone);
  const hasUrl = !!RESULT_PAGE_URL;
  const subject = "Mã tra cứu Bản Đồ Hạnh Phúc của bạn: " + code;

  const INK = "#1F1A17", MUTE = "#6B625B", PAPER = "#F4EFE8", CARD = "#FFFDF9", ACCENT = "#E8590C", DARK = "#16130F", LINE = "#E9E1D6";
  const SERIF = "Georgia, 'Times New Roman', serif";
  const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const step = (n, title, text) =>
    '<tr><td width="44" valign="top" style="padding:0 0 18px 0;">' +
      '<div style="width:34px;height:34px;line-height:34px;border-radius:17px;background:' + ACCENT + ';color:#fff;font:700 15px/34px ' + SANS + ';text-align:center;">' + n + '</div>' +
    '</td><td valign="top" style="padding:3px 0 18px 0;">' +
      '<div style="font:700 15px/22px ' + SANS + ';color:' + INK + ';">' + title + '</div>' +
      '<div style="font:400 14px/22px ' + SANS + ';color:' + MUTE + ';">' + text + '</div>' +
    '</td></tr>';

  const feature = (t, d) =>
    '<tr><td width="18" valign="top" style="padding:7px 0 0 0;"><div style="width:7px;height:7px;border-radius:4px;background:' + ACCENT + ';"></div></td>' +
    '<td style="padding:0 0 12px 0;"><span style="font:700 14px/22px ' + SANS + ';color:' + INK + ';">' + t + '</span>' +
    '<span style="font:400 14px/22px ' + SANS + ';color:' + MUTE + ';"> — ' + d + '</span></td></tr>';

  const button = hasUrl
    ? '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:6px 0 4px 0;"><tr><td style="border-radius:999px;background:' + ACCENT + ';">' +
      '<a href="' + escapeHtml(RESULT_PAGE_URL + (RESULT_PAGE_URL.indexOf("?") >= 0 ? "&" : "?") + "code=" + code) + '" target="_blank" style="display:inline-block;padding:15px 30px;font:700 15px/20px ' + SANS + ';color:#ffffff;text-decoration:none;letter-spacing:.3px;">Xem kết quả của tôi &rarr;</a>' +
      '</td></tr></table>'
    : "";

  const step1 = hasUrl
    ? 'Bấm nút <strong>“Xem kết quả của tôi”</strong> bên dưới (hoặc mở trang kết quả của ' + BRAND_NAME + ').'
    : 'Mở trang kết quả trên website ' + BRAND_NAME + ' (đường dẫn kết thúc bằng <strong>/ketqua</strong>).';

  const html =
'<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
'<title>' + escapeHtml(subject) + '</title></head>' +
'<body style="margin:0;padding:0;background:' + PAPER + ';">' +
'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:' + PAPER + ';"><tr><td align="center" style="padding:28px 12px;">' +
'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:' + CARD + ';border-radius:20px;overflow:hidden;">' +

// Đầu thư
'<tr><td style="background:' + DARK + ';padding:26px 34px;">' +
  '<div style="font:italic 700 26px/32px ' + SERIF + ';color:#FFF4E8;">' + BRAND_NAME + '</div>' +
  '<div style="font:600 11px/18px ' + SANS + ';color:#F2A774;letter-spacing:2.2px;text-transform:uppercase;padding-top:4px;">Thay đổi tương lai &middot; Không chỉ là số phận</div>' +
'</td></tr>' +

// Lời chào
'<tr><td style="padding:38px 34px 6px 34px;">' +
  '<div style="font:600 11px/16px ' + SANS + ';color:' + ACCENT + ';letter-spacing:2.4px;text-transform:uppercase;">Bản đồ hạnh phúc gia đình</div>' +
  '<h1 style="margin:12px 0 14px 0;font:400 30px/38px ' + SERIF + ';color:' + INK + ';">Cảm ơn ' + escapeHtml(name) + ', bản đồ của bạn đã được lập.</h1>' +
  '<p style="margin:0;font:400 15px/26px ' + SANS + ';color:' + MUTE + ';">Bạn vừa dành thời gian nhìn lại chính mình và gia đình – đó đã là một bước thay đổi. ' +
  'Báo cáo cá nhân hóa của bạn gồm thần số học, tử vi, bánh xe hạnh phúc và kế hoạch hành động riêng. Để mở báo cáo, bạn chỉ cần mã dưới đây.</p>' +
'</td></tr>' +

// Thẻ mã
'<tr><td style="padding:26px 34px 8px 34px;">' +
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:' + DARK + ';border-radius:16px;"><tr><td align="center" style="padding:28px 20px;">' +
    '<div style="font:600 11px/16px ' + SANS + ';color:#F2A774;letter-spacing:2.6px;text-transform:uppercase;">Mã tra cứu của bạn</div>' +
    '<div style="font:700 44px/56px \'Courier New\', Courier, monospace;color:#FFFFFF;letter-spacing:7px;padding:10px 0 6px 0;">' + escapeHtml(code) + '</div>' +
    '<div style="font:400 12px/18px ' + SANS + ';color:#BFB5AB;">Gồm ngày – tháng – số thứ tự đăng ký. Dùng cùng số điện thoại ' + escapeHtml(phoneHint) + '</div>' +
  '</td></tr></table>' +
'</td></tr>' +

// Cách xem
'<tr><td style="padding:30px 34px 4px 34px;">' +
  '<div style="font:700 17px/24px ' + SERIF + ';color:' + INK + ';padding-bottom:16px;">Cách xem kết quả</div>' +
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
    step(1, 'Mở trang kết quả', step1) +
    step(2, 'Nhập số điện thoại', 'Số điện thoại bạn đã dùng khi điền khảo sát.') +
    step(3, 'Nhập mã tra cứu', 'Mã gồm 7 chữ số ở trên, rồi bấm xem để mở báo cáo của riêng bạn.') +
  '</table>' + button +
'</td></tr>' +

// Nội dung báo cáo
'<tr><td style="padding:22px 34px 6px 34px;">' +
  '<div style="font:700 17px/24px ' + SERIF + ';color:' + INK + ';padding-bottom:14px;">Bên trong báo cáo của bạn</div>' +
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
    feature('Thần số học', 'số chủ đạo, sứ mệnh, năm cá nhân và các giai đoạn đời') +
    feature('Tử vi &amp; bản mệnh', 'tuổi, nạp âm, cung phi và lá số theo giờ sinh') +
    feature('Bánh xe hạnh phúc', '8 lĩnh vực cuộc sống kèm gợi ý cho từng điểm số') +
    feature('Gia đình', 'mức độ hòa hợp với từng người thân bạn đã khai') +
    feature('Kế hoạch 30 ngày', 'những bước nhỏ, đúng với tính cách của bạn') +
  '</table>' +
'</td></tr>' +

// Câu trích
'<tr><td style="padding:14px 34px 8px 34px;">' +
  '<div style="border-top:1px solid ' + LINE + ';padding-top:22px;font:italic 400 18px/28px ' + SERIF + ';color:' + INK + ';">“Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”</div>' +
'</td></tr>' +

// Lưu ý & chữ ký
'<tr><td style="padding:18px 34px 34px 34px;">' +
  '<p style="margin:0 0 18px 0;font:400 13px/22px ' + SANS + ';color:' + MUTE + ';">Hãy lưu lại email này. Mã chỉ mở được báo cáo khi đi cùng số điện thoại của bạn, vì vậy bạn có thể yên tâm về sự riêng tư.</p>' +
  '<p style="margin:0;font:400 14px/22px ' + SANS + ';color:' + MUTE + ';">Chúc bạn một hành trình hiểu mình và thay đổi thật nhiều ý nghĩa,<br>' +
  '<strong style="font:italic 700 17px/28px ' + SERIF + ';color:' + INK + ';">Dũng Gieo Hạt &amp; Ban Hỗ Trợ</strong></p>' +
'</td></tr>' +

// Chân thư
'<tr><td style="background:' + PAPER + ';padding:18px 34px;text-align:center;">' +
  '<p style="margin:0;font:400 11px/18px ' + SANS + ';color:#9A9087;">© 2026 ' + BRAND_NAME + '. Email này được gửi tự động sau khi bạn hoàn thành khảo sát trên website.</p>' +
'</td></tr>' +

'</table></td></tr></table></body></html>';

  const plain =
    "Cảm ơn " + name + ", bản đồ hạnh phúc của bạn đã được lập.\n\n" +
    "MÃ TRA CỨU CỦA BẠN: " + code + "\n" +
    "(dùng cùng số điện thoại " + phoneHint + ")\n\n" +
    "Cách xem kết quả:\n" +
    "1. Mở trang kết quả" + (hasUrl ? ": " + RESULT_PAGE_URL : " trên website (đường dẫn kết thúc bằng /ketqua)") + "\n" +
    "2. Nhập số điện thoại bạn đã đăng ký\n" +
    "3. Nhập mã tra cứu ở trên\n\n" +
    "Hãy lưu lại email này.\n— " + BRAND_NAME;

  GmailApp.sendEmail(job.to, subject, plain, { htmlBody: html, name: BRAND_NAME });
}
