// Kho nội dung: Bát trạch, cung Mệnh/Thân, Cục, 12 cung, cách cục, đại vận.

export type DirKey = 'sinhKhi' | 'thienY' | 'dienNien' | 'phucVi' | 'tuyetMenh' | 'nguQuy' | 'lucSat' | 'hoaHai';

export const BAT_TRACH_DIR: Record<string, Record<DirKey, string>> = {
  Khảm: { sinhKhi: 'Đông Nam', thienY: 'Đông', dienNien: 'Nam', phucVi: 'Bắc', tuyetMenh: 'Tây Nam', nguQuy: 'Đông Bắc', lucSat: 'Tây', hoaHai: 'Tây Bắc' },
  Ly: { sinhKhi: 'Đông', thienY: 'Đông Nam', dienNien: 'Bắc', phucVi: 'Nam', tuyetMenh: 'Tây Bắc', nguQuy: 'Tây', lucSat: 'Đông Bắc', hoaHai: 'Tây Nam' },
  Chấn: { sinhKhi: 'Nam', thienY: 'Bắc', dienNien: 'Đông Nam', phucVi: 'Đông', tuyetMenh: 'Tây', nguQuy: 'Tây Nam', lucSat: 'Tây Bắc', hoaHai: 'Đông Bắc' },
  Tốn: { sinhKhi: 'Bắc', thienY: 'Nam', dienNien: 'Đông', phucVi: 'Đông Nam', tuyetMenh: 'Đông Bắc', nguQuy: 'Tây Bắc', lucSat: 'Tây Nam', hoaHai: 'Tây' },
  Càn: { sinhKhi: 'Tây', thienY: 'Đông Bắc', dienNien: 'Tây Nam', phucVi: 'Tây Bắc', tuyetMenh: 'Nam', nguQuy: 'Đông', lucSat: 'Bắc', hoaHai: 'Đông Nam' },
  Khôn: { sinhKhi: 'Đông Bắc', thienY: 'Tây', dienNien: 'Tây Bắc', phucVi: 'Tây Nam', tuyetMenh: 'Bắc', nguQuy: 'Đông Nam', lucSat: 'Đông', hoaHai: 'Nam' },
  Cấn: { sinhKhi: 'Tây Nam', thienY: 'Tây Bắc', dienNien: 'Tây', phucVi: 'Đông Bắc', tuyetMenh: 'Đông Nam', nguQuy: 'Bắc', lucSat: 'Nam', hoaHai: 'Đông' },
  Đoài: { sinhKhi: 'Tây Bắc', thienY: 'Tây Nam', dienNien: 'Đông Bắc', phucVi: 'Tây', tuyetMenh: 'Đông', nguQuy: 'Nam', lucSat: 'Đông Nam', hoaHai: 'Bắc' },
};

export const DIR_MEANING: Record<DirKey, { label: string; good: boolean; text: string }> = {
  sinhKhi: { label: 'Sinh Khí', good: true, text: 'Hướng của tài lộc, sức sống và cơ hội phát triển – nên đặt cửa chính, bàn làm việc hoặc quay mặt về hướng này.' },
  thienY: { label: 'Thiên Y', good: true, text: 'Hướng của sức khỏe và quý nhân – nên đặt đầu giường hoặc chỗ ngồi chính của gia đình/bàn ăn.' },
  dienNien: { label: 'Diên Niên', good: true, text: 'Hướng của sự bền vững trong quan hệ và hôn nhân – tốt cho phòng ngủ, phòng khách sum họp.' },
  phucVi: { label: 'Phục Vị', good: true, text: 'Hướng của sự bình an và ổn định tinh thần – tốt cho nơi nghỉ ngơi, thiền, học tập.' },
  tuyetMenh: { label: 'Tuyệt Mệnh', good: false, text: 'Hướng cần tránh nhất: dễ hao tổn năng lượng và sức khỏe – không nên đặt đầu giường hoặc bàn làm việc quay về hướng này.' },
  nguQuy: { label: 'Ngũ Quỷ', good: false, text: 'Hướng dễ gây phiền phức, tranh cãi và thị phi – hạn chế đặt bếp hoặc cửa chính ở đây.' },
  lucSat: { label: 'Lục Sát', good: false, text: 'Hướng ảnh hưởng đến các mối quan hệ và tình cảm – tránh đặt giường hoặc chỗ ngồi chính ở hướng này.' },
  hoaHai: { label: 'Họa Hại', good: false, text: 'Hướng dễ gây rắc rối nhỏ, tiểu nhân – nên dùng cho khu vực ít sử dụng như kho, lối đi.' },
};

export const QUAI_TEXT: Record<string, string> = {
  Khảm: 'Cung Khảm (Thủy) – nhóm Đông Tứ Mệnh: bạn linh hoạt, khôn khéo, nhạy bén với cơ hội và có chiều sâu. Hợp cuộc sống có sự lưu thông và yên tĩnh.',
  Ly: 'Cung Ly (Hỏa) – nhóm Đông Tứ Mệnh: bạn sáng, nhiệt huyết, có sức lan tỏa và thích được công nhận. Hợp không gian thoáng sáng, nhiều ánh sáng tự nhiên.',
  Chấn: 'Cung Chấn (Mộc) – nhóm Đông Tứ Mệnh: bạn năng động, quyết đoán, có tinh thần khởi xướng. Hợp những nơi nhiều cây xanh và sự vận động.',
  Tốn: 'Cung Tốn (Mộc) – nhóm Đông Tứ Mệnh: bạn mềm mại, khéo giao tiếp và giàu sáng tạo. Hợp không gian gọn gàng, thoáng gió, nhiều cây cối.',
  Càn: 'Cung Càn (Kim) – nhóm Tây Tứ Mệnh: bạn có khí chất lãnh đạo, kỷ luật và trách nhiệm. Hợp không gian trang nghiêm, ngăn nắp và vững chãi.',
  Khôn: 'Cung Khôn (Thổ) – nhóm Tây Tứ Mệnh: bạn bao dung, nuôi dưỡng, kiên nhẫn và thực tế. Hợp không gian ấm áp, yên ổn, nhiều chất liệu tự nhiên.',
  Cấn: 'Cung Cấn (Thổ) – nhóm Tây Tứ Mệnh: bạn trầm ổn, kiên định, suy nghĩ chín chắn và thích sự chắc chắn. Hợp không gian tĩnh, vững và ít xáo trộn.',
  Đoài: 'Cung Đoài (Kim) – nhóm Tây Tứ Mệnh: bạn duyên dáng, giao tiếp tốt, ưa niềm vui và sự thẩm mỹ. Hợp không gian đẹp, thoải mái cho trò chuyện.',
};

export const GROUP_TEXT: Record<string, string> = {
  'Đông Tứ Mệnh': 'Nhóm Đông Tứ Mệnh (Khảm, Ly, Chấn, Tốn): hợp các hướng Đông, Đông Nam, Nam, Bắc; nên tránh các hướng nhóm Tây.',
  'Tây Tứ Mệnh': 'Nhóm Tây Tứ Mệnh (Càn, Khôn, Cấn, Đoài): hợp các hướng Tây, Tây Bắc, Tây Nam, Đông Bắc; nên tránh các hướng nhóm Đông.',
};

// ---- Cung Mệnh đóng ở địa chi nào (theo tháng & giờ sinh) ----
export const MENH_AT: string[] = [
  'Mệnh tại Tý: nhanh nhạy, linh hoạt, giỏi nắm bắt thông tin và xoay xở; cần thêm sự kiên định để không bị phân tán.',
  'Mệnh tại Sửu: bền chí, chân thật, làm chắc từng bước; khởi đầu chậm nhưng đi xa và bền.',
  'Mệnh tại Dần: tiên phong, tự tin, thích dẫn dắt và hành động; hãy kiểm soát nóng vội.',
  'Mệnh tại Mão: hòa nhã, tinh tế, giỏi ngoại giao và yêu cái đẹp; cần rèn quyết đoán.',
  'Mệnh tại Thìn: tham vọng, có ý chí và sức chịu đựng; thích làm những điều lớn và cần giữ khiêm tốn.',
  'Mệnh tại Tỵ: sâu sắc, kín đáo, có chiều sâu trí tuệ và trực giác; nên chia sẻ nhiều hơn.',
  'Mệnh tại Ngọ: nhiệt huyết, thẳng thắn, giàu năng lượng và sức truyền cảm hứng; tránh bốc đồng.',
  'Mệnh tại Mùi: nhân hậu, nhạy cảm, giàu tình cảm và có khiếu nghệ thuật; cần tự tin hơn.',
  'Mệnh tại Thân: linh hoạt, khéo léo, học nhanh và thích nghi tốt; hãy tập trung vào mục tiêu chính.',
  'Mệnh tại Dậu: tinh tế, chuẩn mực, có óc thẩm mỹ và trọng danh dự; tránh khắt khe quá mức.',
  'Mệnh tại Tuất: trung thực, trách nhiệm, có tinh thần bảo vệ; cần bớt lo xa và đa nghi.',
  'Mệnh tại Hợi: rộng lượng, giàu tình cảm, lạc quan và dễ gần; cần học cách từ chối.',
];

export const THAN_TEXT: Record<string, string> = {
  'Mệnh': 'Thân cư Mệnh (Mệnh Thân đồng cung): cuộc đời gắn liền với nỗ lực và quyết định của chính bạn; càng tự chủ, càng vững vàng.',
  'Phúc Đức': 'Thân cư Phúc Đức: hậu vận thiên về đời sống tinh thần và phúc đức; làm việc thiện, giữ tâm an giúp vận tốt hơn.',
  'Quan Lộc': 'Thân cư Quan Lộc: sự nghiệp là điểm tựa lớn của cuộc đời; thành tựu trong công việc mang lại sự tự tin và ý nghĩa sống.',
  'Tài Bạch': 'Thân cư Tài Bạch: tiền bạc và vật chất có ảnh hưởng lớn đến hạnh phúc; cần học quản lý tài chính và giữ cân bằng với các giá trị khác.',
  'Phu Thê': 'Thân cư Phu Thê: hôn nhân và các mối quan hệ gần gũi ảnh hưởng mạnh đến cuộc sống; chọn đúng người đồng hành rất quan trọng.',
  'Thiên Di': 'Thân cư Thiên Di: môi trường bên ngoài, đi xa, giao tế có vai trò lớn; bạn phát triển mạnh khi ra ngoài và mở rộng quan hệ.',
};

export const CUC_TEXT: Record<string, string> = {
  Thủy: 'Thủy Nhị Cục: tính linh hoạt, thích nghi và nhạy bén như dòng nước; vận khởi từ sớm, đòi hỏi sự kiên định để không bị xô đẩy theo hoàn cảnh.',
  Mộc: 'Mộc Tam Cục: tính phát triển, nhân ái và sáng tạo như cây cối; vận tiến triển đều đặn nếu có môi trường nuôi dưỡng.',
  Kim: 'Kim Tứ Cục: tính quyết đoán, nguyên tắc và có tiêu chuẩn cao; vận ổn định khi bạn biết mài giũa bản thân và giữ lòng mềm.',
  Thổ: 'Thổ Ngũ Cục: tính vững vàng, đáng tin và nuôi dưỡng; vận đến chậm mà chắc, thành quả bền với người kiên trì.',
  Hỏa: 'Hỏa Lục Cục: tính nhiệt huyết, năng động và quyết liệt; vận có lúc bứt phá mạnh, cần điều tiết cảm xúc để không “cháy nhanh”.',
};

// ---- Ý nghĩa 12 cung chức ----
export const PALACE_TEXT: Record<string, string> = {
  'Mệnh': 'Cung Mệnh: tính cách, thiên hướng và vận trình chung của đời người – đây là cung quan trọng nhất của lá số.',
  'Phụ Mẫu': 'Cung Phụ Mẫu: quan hệ với cha mẹ, cấp trên, thầy cô và giấy tờ, học vấn.',
  'Phúc Đức': 'Cung Phúc Đức: phúc phần, đời sống tinh thần, dòng họ và sự bình an trong tâm.',
  'Điền Trạch': 'Cung Điền Trạch: nhà đất, tài sản tích lũy và không gian sống.',
  'Quan Lộc': 'Cung Quan Lộc: sự nghiệp, danh tiếng, công danh và năng lực làm việc.',
  'Nô Bộc': 'Cung Nô Bộc: bạn bè, đồng nghiệp, nhân sự dưới quyền và các mối quan hệ xã hội.',
  'Thiên Di': 'Cung Thiên Di: môi trường bên ngoài, đi xa, cơ hội và cách thế giới nhìn nhận bạn.',
  'Tật Ách': 'Cung Tật Ách: sức khỏe thể chất, tinh thần và những điểm cần chú ý để phòng ngừa.',
  'Tài Bạch': 'Cung Tài Bạch: khả năng kiếm tiền, giữ tiền và cách bạn quan hệ với tài chính.',
  'Tử Tức': 'Cung Tử Tức: con cái, sự sáng tạo và mối quan hệ với thế hệ sau.',
  'Phu Thê': 'Cung Phu Thê: hôn nhân, tình yêu và người bạn đời.',
  'Huynh Đệ': 'Cung Huynh Đệ: anh chị em, bạn bè thân và những người cùng hợp tác.',
};

// ---- Cách cục thường gặp ----
export const CACH_TEXT: Record<string, { name: string; text: string }> = {
  'tu-phu-vu-tuong': { name: 'Cách Tử – Phủ – Vũ – Tướng', text: 'Tam phương của Mệnh có nhóm sao thiên về quản trị, tài lộc và lãnh đạo: bạn có xu hướng vững vàng, biết tổ chức và được tin cậy. Hợp với những vai trò điều hành, quản lý, tài chính.' },
  'sat-pha-tham': { name: 'Cách Sát – Phá – Tham', text: 'Tam phương của Mệnh có Thất Sát, Phá Quân, Tham Lang: đời có nhiều biến động nhưng cũng nhiều cơ hội bứt phá; bạn không hợp lối mòn, hợp khởi nghiệp, đổi mới, những lĩnh vực cần dũng khí.' },
  'co-nguyet-dong-luong': { name: 'Cách Cơ – Nguyệt – Đồng – Lương', text: 'Tam phương của Mệnh có nhóm sao thiên về trí tuệ, tình cảm và sự ổn định: bạn hợp công việc chuyên môn, phục vụ cộng đồng, giảng dạy, tư vấn. Đời sống nhẹ nhàng, thích sự bình an.' },
  'nhat-nguyet': { name: 'Cách Nhật – Nguyệt', text: 'Tam phương của Mệnh có cả Thái Dương và Thái Âm: bạn có sự cân bằng giữa lý trí và cảm xúc, giữa hành động và nuôi dưỡng; độ sáng của hai sao quyết định sức mạnh của cách này.' },
  'cu-nhat': { name: 'Cách Cự – Nhật', text: 'Tam phương của Mệnh có Cự Môn và Thái Dương: bạn có tài ăn nói, tư duy sắc bén và sức ảnh hưởng, hợp những nghề dùng ngôn ngữ như truyền thông, giảng dạy, luật, diễn thuyết.' },
  'tu-phu-dong-cung': { name: 'Tử – Phủ đồng cung', text: 'Tử Vi và Thiên Phủ cùng tọa Mệnh: đây là sự kết hợp “vua và kho” – có khí chất lãnh đạo, biết giữ gìn và xây dựng tài sản; cần giữ khiêm tốn và bảo vệ các mối quan hệ.' },
};

// ---- Chủ đề của từng giai đoạn đại vận (10 năm) theo cung ----
export const DAI_VAN_TEXT: Record<string, string> = {
  'Mệnh': 'Đại vận rơi vào cung Mệnh: giai đoạn khẳng định bản thân, nhiều cơ hội tự quyết; nên đặt mục tiêu cá nhân rõ ràng.',
  'Phụ Mẫu': 'Đại vận rơi vào cung Phụ Mẫu: giai đoạn học hỏi, quan hệ với người lớn và cấp trên nổi bật; chú ý giấy tờ, bằng cấp.',
  'Phúc Đức': 'Đại vận rơi vào cung Phúc Đức: giai đoạn thiên về đời sống tinh thần; nên chăm sóc tâm, gia đình và dòng họ.',
  'Điền Trạch': 'Đại vận rơi vào cung Điền Trạch: giai đoạn thuận lợi cho việc ổn định nhà cửa, tích lũy tài sản.',
  'Quan Lộc': 'Đại vận rơi vào cung Quan Lộc: giai đoạn của sự nghiệp; thích hợp cho việc thăng tiến, mở rộng và đảm nhận vai trò lớn.',
  'Nô Bộc': 'Đại vận rơi vào cung Nô Bộc: các mối quan hệ bạn bè, đối tác, nhân sự là điểm quan trọng; chọn người đồng hành cẩn thận.',
  'Thiên Di': 'Đại vận rơi vào cung Thiên Di: giai đoạn ra ngoài, đi xa, mở rộng mối quan hệ; thay đổi môi trường có thể mang cơ hội.',
  'Tật Ách': 'Đại vận rơi vào cung Tật Ách: nên đặc biệt chăm sóc sức khỏe, khám định kỳ và giữ nhịp sống cân bằng.',
  'Tài Bạch': 'Đại vận rơi vào cung Tài Bạch: giai đoạn tập trung vào tiền bạc; hãy xây hệ thống thu – chi – đầu tư bài bản.',
  'Tử Tức': 'Đại vận rơi vào cung Tử Tức: giai đoạn của con cái và sự sáng tạo; thuận lợi cho việc ươm mầm dự án mới.',
  'Phu Thê': 'Đại vận rơi vào cung Phu Thê: giai đoạn của hôn nhân, tình cảm và đối tác; chú ý vun đắp quan hệ.',
  'Huynh Đệ': 'Đại vận rơi vào cung Huynh Đệ: giai đoạn bạn bè, anh em và hợp tác nổi bật; dựa vào mạng lưới tin cậy.',
};

export const AM_DUONG_DAI_VAN = {
  forward: 'Đại vận của bạn đi thuận chiều (Dương Nam / Âm Nữ): các giai đoạn lần lượt chuyển qua cung kế tiếp theo chiều kim đồng hồ.',
  backward: 'Đại vận của bạn đi nghịch chiều (Âm Nam / Dương Nữ): các giai đoạn lần lượt chuyển qua cung ngược chiều kim đồng hồ.',
};

export const BRIGHT_NOTE = {
  sang: 'Sao ở vị trí sáng (miếu/vượng/đắc): ưu điểm của sao phát huy rõ, ảnh hưởng thuận lợi.',
  binh: 'Sao ở vị trí bình hòa: ưu và nhược cân bằng, phụ thuộc vào các sao đi cùng và nỗ lực cá nhân.',
  ham: 'Sao ở vị trí hãm: ưu điểm bị che mờ, cần chủ động rèn luyện mặt yếu; các lời khuyên trong báo cáo càng quan trọng.',
};
