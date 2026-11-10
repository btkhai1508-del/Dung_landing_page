// Kho nội dung: Bánh xe hạnh phúc (8 lĩnh vực), rào cản, nhu cầu hỗ trợ, kế hoạch hành động.

export type AreaKey = 'health' | 'family' | 'finance' | 'career' | 'relationships' | 'selfDevelopment' | 'spirituality' | 'community';

export const AREAS: { key: AreaKey; label: string }[] = [
  { key: 'health', label: 'Sức Khỏe' },
  { key: 'family', label: 'Gia Đình' },
  { key: 'finance', label: 'Tài Chính' },
  { key: 'career', label: 'Sự Nghiệp' },
  { key: 'relationships', label: 'Mối Quan Hệ' },
  { key: 'selfDevelopment', label: 'Phát Triển Bản Thân' },
  { key: 'spirituality', label: 'Tinh Thần & Nội Tâm' },
  { key: 'community', label: 'Đóng Góp Xã Hội' },
];

interface Band {
  read: string;
  actions: string[];
}
export interface AreaInfo {
  meaning: string;
  low: Band;
  mid: Band;
  high: Band;
}

export const AREA_INFO: Record<AreaKey, AreaInfo> = {
  health: {
    meaning: 'Sức khỏe là nền móng của mọi lĩnh vực còn lại: năng lượng thể chất, giấc ngủ, dinh dưỡng và khả năng phục hồi.',
    low: {
      read: 'Điểm sức khỏe đang thấp: cơ thể có thể đang báo hiệu mệt mỏi, thiếu ngủ hoặc ít vận động. Đây là lĩnh vực nên ưu tiên trước vì nó ảnh hưởng đến mọi điều khác.',
      actions: ['Ngủ đúng giờ: đặt giờ đi ngủ cố định trong 14 ngày', 'Đi bộ nhanh 20 phút mỗi ngày', 'Uống đủ nước và bỏ một thói quen ăn uống không tốt'],
    },
    mid: {
      read: 'Sức khỏe ở mức trung bình: đủ dùng nhưng chưa có nhiều năng lượng dư. Một vài thói quen nhỏ có thể nâng điểm rõ rệt.',
      actions: ['Tập thể dục 3 buổi mỗi tuần', 'Khám sức khỏe định kỳ nếu đã quá 12 tháng', 'Thiết lập 10 phút giãn cơ/hít thở mỗi sáng'],
    },
    high: {
      read: 'Sức khỏe của bạn đang tốt: đây là nguồn năng lượng quý giá. Hãy duy trì và chia sẻ thói quen tốt với người thân.',
      actions: ['Duy trì lịch vận động hiện có', 'Rủ một người thân cùng tập', 'Ghi lại thói quen hiệu quả nhất của bạn'],
    },
  },
  family: {
    meaning: 'Gia đình là nơi nạp năng lượng cảm xúc: sự thấu hiểu, thời gian chất lượng và cảm giác thuộc về.',
    low: {
      read: 'Điểm gia đình đang thấp: có thể đang thiếu thời gian, thiếu đối thoại hoặc tồn tại những hiểu lầm chưa nói. Đây là lúc nên bắt đầu bằng những bước nhỏ và chân thành.',
      actions: ['Dành 30 phút mỗi ngày không điện thoại bên người thân', 'Viết một lời cảm ơn cho một thành viên trong gia đình', 'Đặt một bữa ăn chung cố định mỗi tuần'],
    },
    mid: {
      read: 'Gia đình ở mức khá: có tình cảm nhưng vẫn còn khoảng trống để thấu hiểu nhau hơn. Một vài nghi thức chung sẽ làm mối quan hệ gần hơn.',
      actions: ['Tổ chức một hoạt động chung mỗi tháng', 'Hỏi mỗi người một câu: “Gần đây con/bạn/mình cần gì?”', 'Chia sẻ một điều bạn biết ơn trong bữa tối'],
    },
    high: {
      read: 'Gia đình là nguồn sức mạnh lớn của bạn. Hãy tiếp tục vun đắp và đóng vai trò lan tỏa sự gắn kết cho cả dòng họ.',
      actions: ['Ghi lại truyền thống gia đình bạn muốn giữ', 'Tạo kỷ niệm chung đều đặn', 'Giúp người thân đang gặp khó khăn'],
    },
  },
  finance: {
    meaning: 'Tài chính là sự an tâm và quyền chủ động: thu nhập, chi tiêu, tích lũy và các quyết định về tiền bạc.',
    low: {
      read: 'Điểm tài chính đang thấp: có thể đang chịu áp lực thu chi hoặc chưa có kế hoạch rõ ràng. Hãy bắt đầu bằng việc nhìn rõ dòng tiền của chính mình.',
      actions: ['Ghi chép mọi khoản chi trong 30 ngày', 'Đặt quỹ dự phòng khởi đầu bằng 1 tháng chi tiêu', 'Liệt kê nguồn thu hiện tại và một nguồn thu có thể thêm'],
    },
    mid: {
      read: 'Tài chính ở mức ổn: đủ chi dùng nhưng chưa tạo ra nhiều tự do. Nên chuyển từ “đủ sống” sang “có hệ thống tích lũy”.',
      actions: ['Chia thu nhập theo tỷ lệ chi tiêu – tiết kiệm – đầu tư', 'Tự động chuyển tiết kiệm ngay khi nhận thu nhập', 'Học một khóa ngắn về quản lý tài chính cá nhân'],
    },
    high: {
      read: 'Tài chính của bạn đang vững: bạn có nền để chọn lựa. Bước tiếp theo là để tiền làm việc và phục vụ các giá trị bạn coi trọng.',
      actions: ['Rà soát danh mục đầu tư và rủi ro', 'Đặt mục tiêu tài chính 3–5 năm', 'Dành một khoản cố định cho gia đình hoặc cộng đồng'],
    },
  },
  career: {
    meaning: 'Sự nghiệp là nơi bạn đóng góp năng lực: sự hài lòng với công việc, thu nhập xứng đáng và lộ trình phát triển.',
    low: {
      read: 'Điểm sự nghiệp đang thấp: có thể công việc chưa đúng sở trường hoặc thiếu hướng phát triển. Hãy làm rõ điều bạn thật sự muốn.',
      actions: ['Liệt kê 3 việc bạn làm giỏi và thấy có ý nghĩa', 'Hẹn 1 người bạn kính trọng để xin góp ý về hướng đi', 'Đặt một mục tiêu nghề nghiệp 6 tháng cụ thể'],
    },
    mid: {
      read: 'Sự nghiệp ở mức khá: bạn đang ổn nhưng chưa bứt phá. Đây là lúc tăng chuyên môn và mở rộng tầm ảnh hưởng.',
      actions: ['Chọn một kỹ năng then chốt để học trong 90 ngày', 'Tạo danh mục thành tích để đàm phán', 'Mở rộng quan hệ nghề nghiệp mỗi tháng'],
    },
    high: {
      read: 'Sự nghiệp của bạn đang tốt: hãy nghĩ đến việc dẫn dắt người khác và để lại giá trị lâu dài.',
      actions: ['Dẫn dắt hoặc cố vấn một người trẻ hơn', 'Đặt mục tiêu sự nghiệp 3–5 năm', 'Đảm bảo công việc không lấn át gia đình và sức khỏe'],
    },
  },
  relationships: {
    meaning: 'Mối quan hệ là mạng lưới nâng đỡ: bạn bè, đối tác, sự tôn trọng và đồng hành.',
    low: {
      read: 'Điểm mối quan hệ đang thấp: có thể bạn thấy cô đơn hoặc thiếu người chia sẻ. Một vài kết nối chân thành sẽ tạo khác biệt lớn.',
      actions: ['Chủ động nhắn tin cho một người bạn lâu chưa gặp', 'Tham gia một nhóm/lớp theo sở thích', 'Thực hành lắng nghe chủ động trong mỗi cuộc trò chuyện'],
    },
    mid: {
      read: 'Mối quan hệ ở mức khá: bạn có kết nối nhưng có thể chưa đủ sâu. Hãy dành thời gian cho những người quan trọng.',
      actions: ['Hẹn một buổi cà phê mỗi tuần với người quan trọng', 'Nói rõ lời cảm ơn và ghi nhận', 'Tạo ranh giới lành mạnh với các mối quan hệ tiêu hao'],
    },
    high: {
      read: 'Bạn có mạng lưới quan hệ tốt: hãy tiếp tục là cầu nối và hỗ trợ những người xung quanh.',
      actions: ['Giới thiệu hai người có thể giúp nhau', 'Duy trì liên lạc đều đặn', 'Tạo một nhóm hỗ trợ cùng phát triển'],
    },
  },
  selfDevelopment: {
    meaning: 'Phát triển bản thân là sự tiến bộ có chủ đích: học hỏi, rèn tư duy và mở rộng năng lực mỗi ngày.',
    low: {
      read: 'Điểm phát triển bản thân đang thấp: có thể bạn đang bận rộn nên chưa có thời gian cho việc học. Hãy bắt đầu bằng khoảng thời gian nhỏ nhưng đều.',
      actions: ['Đọc hoặc nghe 15 phút mỗi ngày', 'Chọn một kỹ năng để học trong 30 ngày', 'Viết 3 dòng nhật ký học được mỗi tối'],
    },
    mid: {
      read: 'Phát triển bản thân ở mức khá: bạn có học nhưng chưa có hệ thống. Hãy đặt mục tiêu và đo lường tiến bộ.',
      actions: ['Lập kế hoạch học 90 ngày với mục tiêu cụ thể', 'Tìm một người đồng hành học cùng', 'Áp dụng kiến thức vào một dự án thực tế'],
    },
    high: {
      read: 'Bạn đang phát triển rất tốt: hãy chia sẻ điều bạn học và biến nó thành giá trị cho người khác.',
      actions: ['Viết hoặc chia sẻ một bài học mỗi tuần', 'Thử một lĩnh vực hoàn toàn mới', 'Dạy lại cho người khác'],
    },
  },
  spirituality: {
    meaning: 'Tinh thần & nội tâm là sự an yên: cân bằng cảm xúc, làm chủ tâm trí và cảm giác có ý nghĩa.',
    low: {
      read: 'Điểm nội tâm đang thấp: có thể bạn đang căng thẳng, lo âu hoặc thiếu những khoảng lặng. Hãy chăm sóc tâm trí như chăm sóc cơ thể.',
      actions: ['Thiền hoặc hít thở 10 phút mỗi sáng', 'Viết ra 3 điều biết ơn trước khi ngủ', 'Hạn chế mạng xã hội 1 giờ trước khi ngủ'],
    },
    mid: {
      read: 'Nội tâm ở mức khá: bạn có lúc bình an, có lúc dao động. Duy trì thực hành đều giúp tâm vững hơn.',
      actions: ['Chọn một thực hành tĩnh (thiền, cầu nguyện, đi dạo yên lặng) và giữ 21 ngày', 'Viết nhật ký cảm xúc mỗi tuần', 'Đặt ra một ngày “tĩnh” mỗi tháng'],
    },
    high: {
      read: 'Nội tâm của bạn đang vững: đây là nền tảng quý để bạn đồng hành cùng người khác.',
      actions: ['Chia sẻ thực hành của bạn với người cần', 'Tiếp tục thực hành đều đặn', 'Tham gia nhóm thiền/chia sẻ'],
    },
  },
  community: {
    meaning: 'Đóng góp xã hội là sự trao đi giá trị: giúp đỡ người khác và sống vì điều lớn hơn bản thân.',
    low: {
      read: 'Điểm đóng góp đang thấp: có thể bạn đang tập trung vào bản thân và gia đình, điều đó hoàn toàn bình thường. Bắt đầu bằng những việc nhỏ sẽ mang lại cảm giác ý nghĩa.',
      actions: ['Giúp một người một việc nhỏ mỗi tuần', 'Quyên góp thời gian hoặc kiến thức cho một nhóm bạn tin', 'Chia sẻ một kinh nghiệm hữu ích với người cần'],
    },
    mid: {
      read: 'Đóng góp ở mức khá: bạn có cho đi nhưng chưa thường xuyên. Một cam kết đều đặn sẽ làm sâu sắc ý nghĩa sống.',
      actions: ['Chọn một hoạt động thiện nguyện đều đặn mỗi tháng', 'Dùng chuyên môn để hỗ trợ cộng đồng', 'Rủ người thân cùng tham gia'],
    },
    high: {
      read: 'Bạn đang sống có ý nghĩa với cộng đồng: hãy cân bằng việc cho đi với việc chăm sóc bản thân.',
      actions: ['Xây dựng một dự án đóng góp lâu dài', 'Truyền cảm hứng cho người khác cùng làm', 'Chú ý để không kiệt sức khi cho đi'],
    },
  },
};

// Gợi ý theo Hành bản mệnh cho từng lĩnh vực
export const HANH_AREA_TIP: Record<string, Record<AreaKey, string>> = {
  Kim: {
    health: 'Mệnh Kim: chú ý phổi và hô hấp – tập thở sâu, giữ không khí sạch.',
    family: 'Mệnh Kim: nói lời mềm và thể hiện sự quan tâm bằng hành động cụ thể.',
    finance: 'Mệnh Kim: lợi thế kỷ luật – lập ngân sách rõ ràng và theo dõi đều.',
    career: 'Mệnh Kim: hợp vị trí đòi hỏi tiêu chuẩn và tính chính xác.',
    relationships: 'Mệnh Kim: hạn chế phê bình, tập ghi nhận ưu điểm của người khác.',
    selfDevelopment: 'Mệnh Kim: học có hệ thống, chọn chương trình bài bản.',
    spirituality: 'Mệnh Kim: thực hành thiền hơi thở và buông bỏ sự cầu toàn.',
    community: 'Mệnh Kim: đóng góp bằng chuyên môn, quy trình và tính công bằng.',
  },
  Mộc: {
    health: 'Mệnh Mộc: chú ý gan, mắt và gân cơ – giãn cơ, ngủ trước 23h.',
    family: 'Mệnh Mộc: cùng gia đình vun trồng cây hoặc đi dạo thiên nhiên.',
    finance: 'Mệnh Mộc: lợi thế phát triển – chọn đầu tư dài hạn, tránh phân tán.',
    career: 'Mệnh Mộc: hợp giáo dục, sáng tạo và công việc có sự tăng trưởng.',
    relationships: 'Mệnh Mộc: mở rộng quan hệ nhưng giữ chiều sâu với vài người thân thiết.',
    selfDevelopment: 'Mệnh Mộc: học liên tục, đọc nhiều thể loại và thử điều mới.',
    spirituality: 'Mệnh Mộc: thiền ở nơi nhiều cây xanh, đi bộ buổi sáng.',
    community: 'Mệnh Mộc: nâng đỡ, hướng dẫn người trẻ và trồng cây/bảo vệ môi trường.',
  },
  Thủy: {
    health: 'Mệnh Thủy: chú ý thận, xương, tai – uống đủ nước, giữ ấm lưng.',
    family: 'Mệnh Thủy: lắng nghe cảm xúc và tạo không gian trò chuyện nhẹ nhàng.',
    finance: 'Mệnh Thủy: dòng tiền cần “bờ” – lập quỹ dự phòng và tự động tiết kiệm.',
    career: 'Mệnh Thủy: hợp công việc linh hoạt, thương mại, nghiên cứu, truyền thông.',
    relationships: 'Mệnh Thủy: kết nối khéo nhưng đừng giữ mọi thứ trong lòng.',
    selfDevelopment: 'Mệnh Thủy: học qua trải nghiệm và ghi chép suy ngẫm.',
    spirituality: 'Mệnh Thủy: thiền cạnh nước (biển, hồ), viết nhật ký cảm xúc.',
    community: 'Mệnh Thủy: kết nối nguồn lực, làm cầu nối giữa người cần và người có thể giúp.',
  },
  Hỏa: {
    health: 'Mệnh Hỏa: chú ý tim mạch, huyết áp, giấc ngủ – “làm nguội” cơ thể bằng nghỉ ngơi.',
    family: 'Mệnh Hỏa: dùng nhiệt huyết để tạo niềm vui, nhưng chờ bình tĩnh trước khi tranh luận.',
    finance: 'Mệnh Hỏa: tránh quyết định tiền bạc khi cảm xúc cao; chờ 48 giờ.',
    career: 'Mệnh Hỏa: hợp truyền thông, dẫn dắt, huấn luyện, bán hàng.',
    relationships: 'Mệnh Hỏa: tỏa sáng nhưng chừa chỗ cho người khác nói.',
    selfDevelopment: 'Mệnh Hỏa: học qua thử thách và những mục tiêu có thời hạn.',
    spirituality: 'Mệnh Hỏa: thiền ngắn, đi bộ chậm, tập thở dài ra.',
    community: 'Mệnh Hỏa: truyền cảm hứng, dẫn dắt nhóm thiện nguyện.',
  },
  Thổ: {
    health: 'Mệnh Thổ: chú ý dạ dày, tiêu hóa – ăn đều giờ, hạn chế lo nghĩ khi ăn.',
    family: 'Mệnh Thổ: thể hiện tình yêu bằng sự có mặt và những bữa cơm gia đình.',
    finance: 'Mệnh Thổ: lợi thế tích lũy chắc – hợp quỹ tiết kiệm, bất động sản.',
    career: 'Mệnh Thổ: hợp vai trò ổn định, quản trị, xây dựng nền móng.',
    relationships: 'Mệnh Thổ: là điểm tựa; nhớ nói ra nhu cầu của mình.',
    selfDevelopment: 'Mệnh Thổ: học chậm mà chắc, ôn lại và thực hành đều.',
    spirituality: 'Mệnh Thổ: thực hành biết ơn và đi bộ trên đất, vườn.',
    community: 'Mệnh Thổ: phục vụ bền bỉ, giữ gìn và chăm sóc cộng đồng quanh mình.',
  },
};

// Phong cách thay đổi theo số chủ đạo
export const LP_CHANGE_STYLE: Record<number, string> = {
  1: 'Bạn thay đổi tốt nhất khi tự đặt mục tiêu và có quyền quyết định; hãy chọn một mục tiêu và bắt đầu ngay.',
  2: 'Bạn thay đổi tốt nhất khi có người đồng hành; hãy tìm một “bạn đồng hành” để cùng cam kết.',
  3: 'Bạn thay đổi tốt nhất khi quá trình vui và có sáng tạo; hãy biến kế hoạch thành trò chơi và chia sẻ tiến độ.',
  4: 'Bạn thay đổi tốt nhất khi có kế hoạch chi tiết; hãy chia mục tiêu thành các bước nhỏ có lịch cụ thể.',
  5: 'Bạn thay đổi tốt nhất khi có sự đa dạng; hãy đổi kiểu tập luyện/học tập mỗi tuần để không chán.',
  6: 'Bạn thay đổi tốt nhất khi gắn với người thân; hãy biến thay đổi thành hoạt động chung với gia đình.',
  7: 'Bạn thay đổi tốt nhất khi hiểu rõ lý do; hãy nghiên cứu trước, sau đó thực hành tĩnh và đều.',
  8: 'Bạn thay đổi tốt nhất khi có mục tiêu đo lường được; hãy đặt chỉ số và xem tiến độ hằng tuần.',
  9: 'Bạn thay đổi tốt nhất khi gắn với ý nghĩa lớn; hãy nhớ “tại sao” và chia sẻ hành trình với người khác.',
  11: 'Bạn thay đổi tốt nhất khi bám theo trực giác kết hợp thói quen nền; hãy tạo nghi thức buổi sáng giữ bạn ở mặt đất.',
  22: 'Bạn thay đổi tốt nhất khi có tầm nhìn lớn và cột mốc nhỏ; hãy chia mục tiêu thành các giai đoạn 90 ngày.',
  33: 'Bạn thay đổi tốt nhất khi chăm sóc bản thân trước; hãy đặt thời gian riêng cố định cho mình.',
};

// Rào cản (khớp với các lựa chọn trong form)
export const OBSTACLE_TIP: Record<string, { meaning: string; solution: string }> = {
  'Thiếu thời gian': {
    meaning: 'Thường không phải thiếu thời gian mà là thiếu ưu tiên rõ ràng.',
    solution: 'Dùng nguyên tắc “2 phút”: chỉ bắt đầu 2 phút mỗi ngày. Khóa một khung giờ cố định, ưu tiên 1 việc quan trọng nhất mỗi sáng.',
  },
  'Thiếu kiến thức': {
    meaning: 'Bạn đang thiếu một lộ trình học có hệ thống, không phải thiếu năng lực.',
    solution: 'Chọn 1 nguồn học đáng tin, học 15–20 phút mỗi ngày và áp dụng ngay vào một việc thực tế.',
  },
  'Thiếu người đồng hành': {
    meaning: 'Bạn cần một môi trường có người cùng chí hướng để duy trì động lực.',
    solution: 'Tìm một bạn đồng hành và hẹn kiểm tra tiến độ mỗi tuần; tham gia cộng đồng cùng mục tiêu.',
  },
  'Thiếu tài chính': {
    meaning: 'Hạn chế về tài chính có thể bắt đầu từ việc chưa nhìn rõ dòng tiền.',
    solution: 'Ghi chép chi tiêu 30 ngày, cắt 10% khoản không cần thiết, ưu tiên học các kỹ năng có thể tạo thu nhập.',
  },
  'Chưa biết bắt đầu từ đâu': {
    meaning: 'Quá nhiều lựa chọn làm bạn bị “đứng yên”.',
    solution: 'Chọn một bước nhỏ nhất, làm trong 7 ngày rồi đánh giá. Hành động nhỏ sẽ làm rõ hướng đi.',
  },
  'Khó duy trì thói quen': {
    meaning: 'Thói quen khó duy trì khi mục tiêu quá lớn hoặc thiếu nhắc nhở.',
    solution: 'Gắn thói quen mới vào một thói quen có sẵn (ví dụ sau khi đánh răng), theo dõi bằng lịch đánh dấu, thưởng cho bản thân mỗi tuần.',
  },
  'Chưa có phương pháp phù hợp': {
    meaning: 'Có thể bạn đã thử nhiều cách nhưng chưa tìm được cách hợp với tính cách của mình.',
    solution: 'Dựa vào số chủ đạo và bản mệnh của bạn trong báo cáo này để chọn phong cách thay đổi phù hợp, thử 3 tuần rồi điều chỉnh.',
  },
};

export const SUPPORT_TIP: Record<string, string> = {
  'Tài liệu hướng dẫn chuyên sâu': 'Bạn thích học bằng tài liệu: hãy đọc kỹ báo cáo này và lưu lại các gợi ý để áp dụng dần.',
  'Video ngắn dễ hiểu, dễ áp dụng': 'Bạn thích video ngắn: mỗi ngày dành 10 phút xem một nội dung và áp dụng ngay một điều.',
  'File âm thanh thiền & nghe mỗi ngày': 'Bạn hợp với âm thanh: nghe thiền mỗi sáng hoặc trước khi ngủ để nuôi dưỡng nội tâm.',
  'Bài tập thực hành rèn luyện từng bước': 'Bạn thích thực hành: hãy làm đủ các bài tập nhỏ trong kế hoạch 30 ngày bên dưới.',
  'Cộng đồng học tập cùng nhau tốt lên': 'Bạn có nhu cầu cộng đồng: tìm bạn đồng hành và chia sẻ tiến độ hằng tuần.',
  'Buổi chia sẻ Zoom trực tiếp từ thầy Dũng': 'Bạn thích học trực tiếp: các buổi chia sẻ trực tiếp sẽ giúp bạn đặt câu hỏi và nhận phản hồi.',
  'Được đồng hành, cố vấn riêng': 'Bạn cần người đồng hành riêng: hãy ghi lại câu hỏi quan trọng nhất của mình để trao đổi khi có cơ hội.',
};

export const FAMILY_TIME_TEXT: Record<string, string> = {
  'Thường xuyên': 'Bạn đang dành nhiều thời gian cho gia đình – đây là nguồn năng lượng lớn. Hãy nâng chất lượng: những khoảnh khắc không điện thoại và những cuộc trò chuyện sâu.',
  'Thỉnh thoảng': 'Bạn thỉnh thoảng có thời gian cho gia đình. Một lịch cố định (ví dụ bữa tối chủ nhật) sẽ giúp thời gian chung trở nên đều đặn.',
  'Hiếm khi': 'Bạn hiếm khi có thời gian cho gia đình. Hãy bắt đầu từ 20 phút mỗi ngày thật sự có mặt; chất lượng quan trọng hơn số lượng.',
  'Gần như không': 'Bạn gần như không có thời gian cho gia đình. Đây là tín hiệu cần điều chỉnh: hãy đặt ra một “giờ vàng” hằng ngày dành riêng cho người thân và thông báo cho họ.',
};

// Mức cân bằng tổng thể
export const BALANCE_TEXT = {
  avgLow: 'Điểm trung bình đang thấp: cuộc sống có thể đang ở giai đoạn nhiều áp lực. Hãy chọn đúng một lĩnh vực để nâng điểm trước thay vì cố sửa tất cả.',
  avgMid: 'Điểm trung bình ở mức trung bình – khá: cuộc sống tương đối ổn nhưng còn nhiều dư địa để cân bằng hơn.',
  avgHigh: 'Điểm trung bình khá cao: bạn đang sống khá cân bằng. Hãy giữ nhịp và chọn thêm một mục tiêu mới để tiếp tục phát triển.',
  spreadHigh: 'Các lĩnh vực chênh lệch lớn: có lĩnh vực rất mạnh nhưng có lĩnh vực rất thấp. Bánh xe lăn êm hơn khi bạn nâng lĩnh vực thấp nhất lên vài bậc.',
  spreadLow: 'Các lĩnh vực khá đều nhau: bánh xe đã khá tròn, chỉ cần nâng dần đồng đều.',
};

// Kế hoạch ưu tiên theo lĩnh vực: 4 tuần
export const PRIORITY_PLAN: Record<AreaKey, { why: string; weeks: string[]; metric: string }> = {
  health: {
    why: 'Sức khỏe là nền cho mọi thứ: khi cơ thể đủ năng lượng, bạn dễ cải thiện các lĩnh vực khác.',
    weeks: ['Tuần 1: Ngủ đúng giờ và đi bộ 15 phút mỗi ngày.', 'Tuần 2: Thêm 2 buổi vận động mạnh hơn và bỏ một thói quen ăn uống không tốt.', 'Tuần 3: Lập thực đơn đơn giản cho cả tuần và uống đủ nước.', 'Tuần 4: Đo lại cân nặng/cảm giác năng lượng và đặt mục tiêu cho tháng tiếp theo.'],
    metric: 'Số buổi vận động mỗi tuần, giờ ngủ trung bình.',
  },
  family: {
    why: 'Gia đình là nơi nạp lại năng lượng; cải thiện gia đình sẽ nâng cảm giác hạnh phúc chung.',
    weeks: ['Tuần 1: Mỗi ngày 20 phút không điện thoại bên người thân.', 'Tuần 2: Tổ chức một bữa ăn chung có chủ đề “điều biết ơn”.', 'Tuần 3: Nói chuyện riêng với từng thành viên, hỏi họ cần gì ở bạn.', 'Tuần 4: Lên kế hoạch một hoạt động chung mỗi tháng.'],
    metric: 'Số giờ chất lượng bên gia đình mỗi tuần.',
  },
  finance: {
    why: 'Tài chính chủ động giúp bạn giảm lo âu và có quyền lựa chọn nhiều hơn.',
    weeks: ['Tuần 1: Ghi chép toàn bộ chi tiêu và liệt kê các khoản nợ/cam kết.', 'Tuần 2: Chia thu nhập thành các quỹ chi tiêu, tiết kiệm, dự phòng.', 'Tuần 3: Cắt giảm 10% khoản không cần thiết và tự động chuyển tiết kiệm.', 'Tuần 4: Đặt mục tiêu thu nhập thêm và lập kế hoạch 90 ngày.'],
    metric: 'Tỷ lệ tiết kiệm trên thu nhập, quỹ dự phòng.',
  },
  career: {
    why: 'Sự nghiệp liên quan đến giá trị bản thân và thu nhập; một bước rõ ràng giúp bạn tự tin hơn.',
    weeks: ['Tuần 1: Viết ra 3 thế mạnh và 3 điều bạn muốn thay đổi trong công việc.', 'Tuần 2: Hẹn trao đổi với một người bạn kính trọng về hướng đi.', 'Tuần 3: Chọn một kỹ năng then chốt và bắt đầu học 20 phút mỗi ngày.', 'Tuần 4: Hoàn thành một dự án nhỏ thể hiện kỹ năng mới.'],
    metric: 'Số giờ học kỹ năng, mục tiêu nghề nghiệp đã hoàn thành.',
  },
  relationships: {
    why: 'Các mối quan hệ chất lượng là nguồn hỗ trợ tinh thần và cơ hội cho mọi lĩnh vực.',
    weeks: ['Tuần 1: Liên hệ 3 người bạn quan trọng bạn lâu chưa gặp.', 'Tuần 2: Thực hành lắng nghe chủ động, không ngắt lời.', 'Tuần 3: Tham gia một hoạt động nhóm mới.', 'Tuần 4: Đánh giá các mối quan hệ nâng đỡ và các mối quan hệ tiêu hao.'],
    metric: 'Số cuộc trò chuyện chất lượng mỗi tuần.',
  },
  selfDevelopment: {
    why: 'Phát triển bản thân là “lãi kép”: mỗi ngày tiến một chút, sau một năm khác biệt rất lớn.',
    weeks: ['Tuần 1: Chọn một kỹ năng và đọc/nghe 15 phút mỗi ngày.', 'Tuần 2: Ghi lại 3 điều học được mỗi tối.', 'Tuần 3: Áp dụng vào một việc thực tế.', 'Tuần 4: Chia sẻ điều bạn học với người khác và chọn kỹ năng kế tiếp.'],
    metric: 'Số ngày học liên tiếp, số kỹ năng đã áp dụng.',
  },
  spirituality: {
    why: 'Nội tâm vững giúp bạn quyết định sáng suốt và bớt bị cuốn theo hoàn cảnh.',
    weeks: ['Tuần 1: Thiền hoặc hít thở 5 phút mỗi sáng.', 'Tuần 2: Tăng lên 10 phút và viết 3 điều biết ơn mỗi tối.', 'Tuần 3: Hạn chế mạng xã hội 1 giờ trước khi ngủ.', 'Tuần 4: Dành một buổi ở thiên nhiên trong im lặng.'],
    metric: 'Số ngày thực hành liên tiếp, chất lượng giấc ngủ.',
  },
  community: {
    why: 'Cho đi mang lại ý nghĩa sống và niềm vui bền vững.',
    weeks: ['Tuần 1: Giúp đỡ một người một việc nhỏ.', 'Tuần 2: Tìm một hoạt động thiện nguyện phù hợp với bạn.', 'Tuần 3: Tham gia lần đầu và ghi lại cảm nhận.', 'Tuần 4: Đặt cam kết đều đặn hằng tháng.'],
    metric: 'Số giờ/việc giúp đỡ người khác mỗi tháng.',
  },
};

// Gợi ý theo năm cá nhân gắn với lĩnh vực ưu tiên
export const PERSONAL_YEAR_AREA_LINK =
  'Năm cá nhân của bạn quyết định “nhịp” hành động: hãy chọn việc phù hợp với chủ đề của năm thay vì ép bản thân đi ngược dòng.';
