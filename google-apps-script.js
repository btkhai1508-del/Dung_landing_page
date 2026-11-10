/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - DŨNG GIEO HẠT WEBHOOK & EMAIL TỰ ĐỘNG
 * Chủ đề: Thay Đổi Tương Lai, Không Chỉ Là Số Phận
 * ==============================================================================
 */

// 1. CẤU HÌNH LIÊN KẾT GOOGLE SHEET & ZALO
const SPREADSHEET_ID = "12Yb-Fu56Lnuc7lA7g23Atf8cWpThiJObud5HQjZzZEg"; // Sheet Dũng Gieo Hạt
const ZALO_LINK = "https://zalo.me/g/a2y2x036pqkwzig7u9ri";
const BRAND_NAME = "Dũng Gieo Hạt";
const PROGRAM_NAME = "Thay Đổi Tương Lai - Không Chỉ Là Số Phận";

// Tự động tạo ảnh mã QR Zalo chất lượng cao để nhúng vào email
const ZALO_QR_URL = "https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=" + encodeURIComponent(ZALO_LINK);

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ready",
    message: "Webhook Dũng Gieo Hạt đang hoạt động bình thường!"
  })).setMimeType(ContentService.MimeType.JSON);
}

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
    const sheetName = get("sheet");   // "Quà Tặng Tầng 1" (/bando), "Affiliate", hoặc rỗng = tab đầu tiên
    const formType = get("form");

    // Các cột cần ghi (tiêu đề → giá trị), theo đúng thứ tự frontend gửi lên
    let fields = {};
    try { fields = JSON.parse(get("fields") || "{}"); } catch (err) {}
    if (Object.keys(fields).length === 0) {
      fields = { "Họ Và Tên": customerName, "SĐT": customerPhone, "Email": customerEmail };
    }

    const timestamp = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // 1. Lưu vào đúng tab Google Sheet
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = getTargetSheet(ss, sheetName);
      const row = Object.assign({ "Thời Gian": timestamp }, fields);

      if (normalizeName(sheet.getName()) === normalizeName(BANDO_SHEET)) {
        // Tab "Quà Tặng Tầng 1": cột đầu tiên là Mã DDMMXXX (XXX = STT trong ngày, 001–999)
        const lock = LockService.getScriptLock();
        lock.waitLock(15000);
        try {
          ensureFirstColumn(sheet, CODE_HEADER);
          appendRowByHeaders(sheet, Object.assign({ [CODE_HEADER]: "'" + nextDailyCode(sheet.getName()) }, row));
        } finally {
          lock.releaseLock();
        }
      } else {
        appendRowByHeaders(sheet, row);
      }
    } catch (sheetError) {
      Logger.log("Lỗi ghi Google Sheet: " + sheetError.toString());
    }

    // 2. Gửi email xác nhận kèm nút Zalo, mã QR Code và châm ngôn Dancing Script
    if (customerEmail && customerEmail.indexOf("@") !== -1) {
      sendWelcomeEmail(customerName || "Bạn", customerEmail);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      sheet: sheetName || "(tab đầu tiên)",
      form: formType,
      saved: { name: customerName, phone: customerPhone, email: customerEmail }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

const BANDO_SHEET = "Quà Tặng Tầng 1";
const CODE_HEADER = "Mã";

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

// Ghi 1 dòng theo hàng tiêu đề (dòng 1) của tab: cột nào khớp tiêu đề thì ghi vào đó,
// tiêu đề chưa có thì tự thêm cột mới ở cuối.
function appendRowByHeaders(sheet, data) {
  const lastCol = sheet.getLastColumn();
  let headers = (sheet.getLastRow() > 0 && lastCol > 0)
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String)
    : [];
  const normalized = headers.map(normalizeName);

  const row = new Array(headers.length).fill("");
  Object.keys(data).forEach((key) => {
    let idx = normalized.indexOf(normalizeName(key));
    if (idx === -1) {
      headers.push(key);
      normalized.push(normalizeName(key));
      row.push("");
      idx = headers.length - 1;
    }
    row[idx] = data[key];
  });

  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.appendRow(row);
}

/**
 * Gửi email chào mừng chuẩn nhận diện Dũng Gieo Hạt
 * - Đã fix 100% lỗi font/ký tự dấu hỏi chấm hình thoi (diamond question mark)
 * - Tích hợp châm ngôn Dancing Script tuyệt đẹp như trên website
 * - Nút bấm và mã QR Code nhóm Zalo
 */
function sendWelcomeEmail(name, toEmail) {
  const subject = "[Dũng Gieo Hạt] Xác Nhận Đăng Ký - Thay Đổi Tương Lai, Không Chỉ Là Số Phận";

  const htmlBody = `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dũng Gieo Hạt</title>
    <!-- Import Google Font Dancing Script cho email -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #191A23; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8F9FA; padding: 30px 10px;">
      <tr>
        <td align="center">
          
          <!-- THẺ CONTAINER CHÍNH -->
          <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.07); border: 1px solid #ECEFF2;">
            
            <!-- HEADER BRAND: TÔNG NỀN TỐI SANG TRỌNG & CAM ẤM -->
            <tr>
              <td style="background-color: #141820; padding: 24px 30px; border-bottom: 3px solid #FA5B13;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" valign="middle">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr>
                          <!-- Logo Box: Dùng mã HTML entity mầm cây chuẩn, không bị Gmail xóa như SVG -->
                          <td style="background-color: #FFF0E6; width: 42px; height: 42px; border-radius: 12px; text-align: center; vertical-align: middle; border: 1.5px solid #FFD8C2;">
                            <span style="font-size: 22px; line-height: 1; display: inline-block;">&#127793;</span>
                          </td>
                          <td style="padding-left: 12px;">
                            <span style="font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.3px; display: block;">Dũng Gieo Hạt</span>
                            <span style="font-size: 11px; color: #FFA877; font-weight: 500; text-transform: uppercase; letter-spacing: 0.8px;">Gieo Hạt Thiện Lành · Kiến Tạo Tương Lai</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="right" valign="middle">
                      <span style="font-size: 11px; font-weight: 700; background-color: #FA5B13; color: #FFFFFF; padding: 7px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">
                        ĐÃ XÁC NHẬN
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- NỘI DUNG CHÍNH -->
            <tr>
              <td style="padding: 34px 30px 24px 30px;">
                
                <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #FA5B13; text-transform: uppercase; letter-spacing: 1px;">
                  CHÚC MỪNG BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG!
                </p>
                
                <h1 style="font-size: 26px; font-weight: 800; line-height: 34px; color: #141820; margin: 0 0 18px 0; letter-spacing: -0.5px;">
                  Xin chào <span style="color: #FA5B13;">` + name + `</span>,
                </h1>

                <!-- HỘP TRÍCH DẪN ĐỒNG BỘ 100% TIẾNG VIỆT KHÔNG LỖI DẤU TRÊN GMAIL -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0 26px 0;">
                  <tr>
                    <td style="background-color: #141820; border-radius: 18px; padding: 22px 24px; text-align: center; border-left: 5px solid #FA5B13; box-shadow: 0 6px 16px rgba(0,0,0,0.15);">
                      <p style="font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-style: italic; font-size: 20px; font-weight: 500; color: #FFA877; margin: 0 0 6px 0; line-height: 30px; letter-spacing: 0.2px;">
                        &ldquo;Tương lai không được dự đoán,<br>tương lai được tạo ra bởi những gì bạn làm hôm nay.&rdquo;
                      </p>
                      <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                        &mdash; DŨNG GIEO HẠT &mdash;
                      </span>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 15px; line-height: 25px; color: #374151; margin: 0 0 16px 0;">
                  Thông tin giữ chỗ của bạn cho chương trình <strong>"Thay Đổi Tương Lai - Không Chỉ Là Số Phận"</strong> đã được ghi nhận thành công trên hệ thống.
                </p>

                <p style="font-size: 15px; line-height: 25px; color: #374151; margin: 0 0 24px 0;">
                  Để thấu hiểu bản chất năng lượng, tần số rung động và vận dụng 6 quy luật vũ trụ nhằm làm chủ vận mệnh, <strong>toàn bộ tài liệu mật, trọn bộ Ebook đổi đời, lịch học và link Zoom sẽ được gửi độc quyền trong Nhóm Kín Zalo</strong>.
                </p>

                <!-- KHUNG HƯỚNG DẪN 3 BƯỚC -->
                <div style="background-color: #FFF8F5; border: 1.5px solid #FFE4D6; border-radius: 18px; padding: 22px 24px; margin-bottom: 26px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                    <tr>
                      <td style="background-color: #FA5B13; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                        HƯỚNG DẪN 3 BƯỚC
                      </td>
                      <td style="padding-left: 10px; font-size: 14px; font-weight: 700; text-transform: uppercase; color: #C2410C; letter-spacing: 0.5px;">
                        ĐỂ NHẬN ĐẦY ĐỦ QUÀ TẶNG:
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 14px; line-height: 22px; color: #431407;">
                        <strong>1. Bấm nút màu cam</strong> bên dưới (hoặc quét mã QR) để vào Nhóm Zalo Kín.
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 14px; line-height: 22px; color: #431407;">
                        <strong>2. Bấm "Tham gia nhóm"</strong> để ban tổ chức duyệt giữ chỗ cho bạn.
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 14px; line-height: 22px; color: #431407;">
                        <strong>3. Đọc tin nhắn Ghim</strong> tại nhóm để tải trọn bộ Ebook & nhận thông báo lịch buổi chia sẻ.
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- NÚT BẤM VÀO NHÓM ZALO TRÊN ĐIỆN THOẠI (KHÔNG CÓ KÝ TỰ LỖI) -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                  <tr>
                    <td align="center">
                      <a href="` + ZALO_LINK + `" target="_blank" style="display: block; width: 90%; max-width: 440px; background-color: #FA5B13; color: #FFFFFF; font-size: 16px; font-weight: 800; text-decoration: none; padding: 18px 24px; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; box-shadow: 0 6px 20px rgba(250,91,19,0.35);">
                        BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO &rarr;
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- PHẦN MÃ QR CODE CHO NGƯỜI MỞ BẰNG MÁY TÍNH -->
                <div style="background-color: #FAFAFA; border: 1px dashed #CBD5E1; border-radius: 20px; padding: 24px 20px; text-align: center; margin: 26px 0;">
                  <p style="font-size: 14px; font-weight: 700; color: #1E293B; margin: 0 0 6px 0; text-transform: uppercase;">
                    HOẶC QUÉT MÃ QR DƯỚI ĐÂY BẰNG ZALO:
                  </p>
                  <p style="font-size: 13px; color: #64748B; margin: 0 0 16px 0;">
                    (Dành cho bạn đang mở email trên Máy tính / Laptop)
                  </p>
                  
                  <!-- HÌNH ẢNH MÃ QR -->
                  <div style="display: inline-block; padding: 12px; background-color: #FFFFFF; border-radius: 16px; border: 2px solid #141820; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <img src="` + ZALO_QR_URL + `" width="190" height="190" alt="Mã QR Nhóm Zalo Dũng Gieo Hạt" style="display: block; border-radius: 8px;" />
                  </div>

                  <p style="font-size: 12px; color: #64748B; margin: 14px 0 0 0;">
                    Link dự phòng nếu không quét được: <br>
                    <a href="` + ZALO_LINK + `" style="color: #FA5B13; font-weight: 600; text-decoration: underline; word-break: break-all;">` + ZALO_LINK + `</a>
                  </p>
                </div>

                <!-- CẢNH BÁO GIỮ CHỖ -->
                <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px 16px; border-radius: 0 10px 10px 0; margin-bottom: 24px;">
                  <p style="margin: 0; font-size: 13px; line-height: 20px; color: #92400E; font-weight: 600;">
                    Lưu ý quan trọng: Nhóm Zalo kín chỉ duyệt cho người có trong danh sách đăng ký. Hãy tham gia ngay để không bị bỏ lỡ tài liệu và vé giữ chỗ của bạn.
                  </p>
                </div>

                <div style="height: 1px; background-color: #E5E7EB; margin: 28px 0 20px 0;"></div>

                <!-- CHỮ KÝ -->
                <p style="font-size: 14px; line-height: 22px; color: #4B5563; margin: 0;">
                  Chúc bạn luôn an lạc, thấu hiểu quy luật và làm chủ cuộc đời!<br>
                  <strong style="color: #141820; font-size: 15px;">Dũng Gieo Hạt & Ban Hỗ Trợ</strong>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #F8F9FA; border-top: 1px solid #EEF2F6; padding: 18px 30px; text-align: center;">
                <p style="margin: 0; font-size: 11px; line-height: 18px; color: #9CA3AF;">
                  © 2026 Dũng Gieo Hạt. Mọi quyền được bảo lưu.<br>
                  Email này được gửi tự động khi bạn đăng ký nhận tài liệu trên website.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  // Gửi email qua GmailApp
  GmailApp.sendEmail(toEmail, subject, "Chúc mừng bạn đã đăng ký thành công! Hãy vào nhóm Zalo để nhận trọn bộ tài liệu: " + ZALO_LINK, {
    htmlBody: htmlBody,
    name: BRAND_NAME
  });
}
