// Kho nội dung: Biểu đồ ngày sinh (lưới 3×3), các mũi tên cá tính và ba bình diện.
// Bố cục: 3 6 9 / 2 5 8 / 1 4 7. Khung phân tích theo "The Complete Book of Numerology".

export interface DigitInfo {
  domain: string;
  none: string;
  one: string;
  many: string;
}

export const DIGIT: Record<number, DigitInfo> = {
  1: {
    domain: 'Cái tôi & khả năng biểu đạt',
    none: 'Vắng số 1: bạn có thể ngại nói ra ý kiến và cảm xúc thật, dễ thu mình hoặc nhường người khác. Luyện nói rõ điều mình muốn là bài học lớn.',
    one: 'Có một số 1: bạn biểu đạt bản thân ở mức cân bằng, thường cân nhắc trước khi nói.',
    many: 'Nhiều số 1: bạn nói nhiều, bộc lộ rõ cái tôi và thích được lắng nghe; hãy chú ý chừa chỗ cho người khác.',
  },
  2: {
    domain: 'Trực giác & sự nhạy cảm',
    none: 'Vắng số 2: bạn có thể ít để ý đến sắc thái cảm xúc của người khác. Hãy luyện lắng nghe và quan sát.',
    one: 'Có một số 2: trực giác và sự nhạy cảm ở mức vừa phải, giúp bạn hiểu người khác khi cần.',
    many: 'Nhiều số 2: bạn rất nhạy cảm và dễ bị tác động bởi cảm xúc xung quanh; cần học cách đặt ranh giới năng lượng.',
  },
  3: {
    domain: 'Trí nhớ, tưởng tượng & sáng tạo',
    none: 'Vắng số 3: bạn có thể thấy khó nối ý tưởng với thực tế hoặc thể hiện sự sáng tạo. Hãy tập viết, vẽ, kể chuyện để mở kênh này.',
    one: 'Có một số 3: óc sáng tạo vừa đủ, giúp bạn liên kết ý tưởng và hành động.',
    many: 'Nhiều số 3: trí tưởng tượng phong phú, nhớ giỏi và dễ nảy ra ý tưởng; cẩn thận không biến ý tưởng thành những giấc mơ không thực hiện.',
  },
  4: {
    domain: 'Thực tế, tổ chức & kỷ luật',
    none: 'Vắng số 4: bạn có thể chưa quen với việc làm theo quy trình và chi tiết. Lập danh sách và thói quen cố định là chìa khóa.',
    one: 'Có một số 4: bạn có khả năng thực tế cơ bản và biết lúc nào cần làm việc nghiêm túc.',
    many: 'Nhiều số 4: bạn rất thực tế, ngăn nắp và chịu khó; hãy cẩn thận khi cứng nhắc hoặc quá cầu toàn.',
  },
  5: {
    domain: 'Trung tâm cảm xúc & sự cân bằng',
    none: 'Vắng số 5: bạn có thể thấy khó bày tỏ cảm xúc thật hoặc đôi lúc thiếu điểm tựa cảm xúc. Thiền, viết nhật ký và nói chuyện với người tin cậy sẽ giúp.',
    one: 'Có một số 5: bạn có sự cân bằng cảm xúc tự nhiên và biết điều chỉnh trong nhiều hoàn cảnh.',
    many: 'Nhiều số 5: cảm xúc mạnh mẽ và nhu cầu tự do cao; hãy học cách điều tiết để không bị cuốn theo bốc đồng.',
  },
  6: {
    domain: 'Gia đình, trách nhiệm & sự hài hòa',
    none: 'Vắng số 6: bạn có thể ít gắn bó với những việc nhà, trách nhiệm gia đình hoặc cam kết lâu dài. Dành thời gian cho gia đình là bài học.',
    one: 'Có một số 6: bạn có trách nhiệm với gia đình ở mức cân bằng, biết quan tâm khi cần.',
    many: 'Nhiều số 6: bạn rất gắn bó với gia đình và có xu hướng lo lắng cho mọi người; hãy tập buông bớt gánh nặng.',
  },
  7: {
    domain: 'Học hỏi, phân tích & tâm linh',
    none: 'Vắng số 7: bạn ít khi “học từ bài học đau thương”; hãy rèn tư duy phân tích và đừng bỏ qua trực giác.',
    one: 'Có một số 7: bạn biết học từ trải nghiệm và có chiều sâu vừa phải.',
    many: 'Nhiều số 7: bạn phân tích sâu, thích nghiên cứu và có chiều sâu tinh thần; hãy tránh khép kín và hoài nghi quá mức.',
  },
  8: {
    domain: 'Trách nhiệm, quyền lực & ra quyết định',
    none: 'Vắng số 8: bạn có thể ngại nhận trách nhiệm lớn hoặc quản lý tiền bạc. Rèn tư duy tài chính và ra quyết định sẽ giúp bạn vững hơn.',
    one: 'Có một số 8: bạn có năng lực tổ chức và ra quyết định vừa đủ trong công việc.',
    many: 'Nhiều số 8: bạn có xu hướng gánh nhiều trách nhiệm và muốn kiểm soát; hãy học ủy thác.',
  },
  9: {
    domain: 'Tham vọng, lý tưởng & lòng nhân ái',
    none: 'Vắng số 9: bạn có thể ít nghĩ đến bức tranh lớn hoặc đóng góp xã hội. Tham gia hoạt động thiện nguyện sẽ mở rộng tầm nhìn.',
    one: 'Có một số 9: bạn có lý tưởng và lòng nhân ái ở mức cân bằng.',
    many: 'Nhiều số 9: lý tưởng cao, tham vọng và tình thương; hãy gắn lý tưởng với kế hoạch thực tế để không thất vọng.',
  },
};

export const ARROW_PRESENT: Record<string, { name: string; text: string }> = {
  '123': { name: 'Mũi tên Kế hoạch', text: 'Bạn suy nghĩ có trật tự và biết lập kế hoạch trước khi hành động; điều này giúp bạn đi đúng hướng. Hãy chú ý đừng lập kế hoạch quá lâu mà quên bắt đầu.' },
  '456': { name: 'Mũi tên Ý chí', text: 'Bạn có ý chí mạnh và khả năng kiên trì đạt mục tiêu. Điều cần chú ý là sự cứng đầu khi người khác góp ý.' },
  '789': { name: 'Mũi tên Hành động', text: 'Bạn là người năng động và dám làm; giỏi biến mục tiêu thành kết quả. Hãy nhớ nghỉ ngơi để tránh quá tải.' },
  '147': { name: 'Mũi tên Thực tế', text: 'Bạn thực tế, khéo tay và có khả năng tổ chức công việc rõ ràng. Hãy để chỗ cho cảm xúc và sáng tạo.' },
  '258': { name: 'Mũi tên Cảm xúc', text: 'Bạn nhạy cảm, đồng cảm và có thế giới nội tâm phong phú. Cần có cách lành mạnh để xả cảm xúc và đặt ranh giới.' },
  '369': { name: 'Mũi tên Trí tuệ', text: 'Bạn có trí nhớ tốt, tư duy sắc và khả năng học hỏi nhanh. Hãy cân bằng giữa suy nghĩ với hành động.' },
  '159': { name: 'Mũi tên Quyết tâm', text: 'Bạn có sự quyết tâm và kiên định mạnh mẽ, ít khi bỏ cuộc trước khó khăn. Cần thêm sự mềm dẻo để không rơi vào bướng bỉnh.' },
  '357': { name: 'Mũi tên Tâm linh', text: 'Bạn có chiều sâu tinh thần, trực giác nhạy và xu hướng tìm ý nghĩa cuộc sống. Hãy kết hợp chiều sâu với thực hành đời thường.' },
};

export const ARROW_MISSING: Record<string, { name: string; text: string }> = {
  '123': { name: 'Thiếu Mũi tên Kế hoạch', text: 'Bạn có thể thấy khó sắp xếp suy nghĩ và hay làm theo cảm hứng. Dùng sổ tay, danh sách việc và bước nhỏ để tạo trật tự.' },
  '456': { name: 'Thiếu Mũi tên Ý chí', text: 'Bạn dễ nản và mất hướng khi gặp trở ngại. Đặt mục tiêu nhỏ, có hạn chót và người đồng hành giúp bạn duy trì ý chí.' },
  '789': { name: 'Thiếu Mũi tên Hành động', text: 'Bạn dễ suy nghĩ nhiều hơn hành động. Hãy đặt “quy tắc 5 phút” để bắt đầu và tăng dần.' },
  '147': { name: 'Thiếu Mũi tên Thực tế', text: 'Bạn có thể kém tổ chức trong việc thực tế như giấy tờ, tiền bạc. Dùng ứng dụng, lịch và thói quen cố định để bù.' },
  '258': { name: 'Thiếu Mũi tên Cảm xúc', text: 'Bạn có thể ít bộc lộ cảm xúc. Luyện nói về cảm xúc và viết nhật ký sẽ làm mối quan hệ gần gũi hơn.' },
  '369': { name: 'Thiếu Mũi tên Trí tuệ', text: 'Bạn có thể thấy trí nhớ chưa vững. Ghi chú, đọc đều đặn và học bằng hình ảnh giúp bạn tiến bộ.' },
  '159': { name: 'Thiếu Mũi tên Quyết tâm (Mũi tên Trì hoãn)', text: 'Bạn dễ chần chừ vì thiếu điểm tựa. Hãy biến mục tiêu thành thói quen hằng ngày để tạo đà.' },
  '357': { name: 'Thiếu Mũi tên Tâm linh (Mũi tên Hoài nghi)', text: 'Bạn thích bằng chứng và thường hoài nghi. Đây là sức mạnh khi biết đặt câu hỏi; hãy cho phép mình mở lòng với điều chưa chứng minh được.' },
};

export const PLANES: Record<'physical' | 'emotional' | 'mental', { name: string; high: string; mid: string; low: string }> = {
  physical: {
    name: 'Bình diện Hành động (1-4-7)',
    high: 'Bạn thiên về hành động và thực tế: giỏi làm, giỏi tổ chức, thích thấy kết quả cụ thể.',
    mid: 'Bình diện hành động ở mức cân bằng: bạn biết lúc nào nên làm và lúc nào nên nghỉ.',
    low: 'Bình diện hành động còn mỏng: bạn dễ nghĩ nhiều hơn làm; thói quen nhỏ mỗi ngày sẽ bù đắp.',
  },
  emotional: {
    name: 'Bình diện Cảm xúc (2-5-8)',
    high: 'Bạn giàu cảm xúc và trực giác: nhạy cảm, thấu hiểu nhưng cũng dễ bị tác động.',
    mid: 'Bình diện cảm xúc cân bằng: bạn biết cảm nhận và vẫn giữ được bình tĩnh.',
    low: 'Bình diện cảm xúc còn mỏng: bạn có thể khó diễn đạt cảm xúc; hãy luyện chia sẻ và viết nhật ký.',
  },
  mental: {
    name: 'Bình diện Trí tuệ (3-6-9)',
    high: 'Bạn thiên về tư duy: học nhanh, nhớ giỏi, thích phân tích và tìm hiểu.',
    mid: 'Bình diện trí tuệ cân bằng: bạn kết hợp suy nghĩ với cảm xúc và hành động tốt.',
    low: 'Bình diện trí tuệ còn mỏng: hãy nuôi thói quen đọc, ghi chép và học một kỹ năng mới.',
  },
};

// Hòa hợp giữa 2 số chủ đạo (dùng cho phần Gia đình).
// 1 = rất hợp, 2 = hợp, 3 = bình thường, 4 = cần nỗ lực, 5 = dễ va chạm
const COMPAT_PAIRS: Record<string, number> = {
  '1-1': 3, '1-2': 3, '1-3': 1, '1-4': 4, '1-5': 1, '1-6': 2, '1-7': 3, '1-8': 4, '1-9': 2,
  '2-2': 2, '2-3': 3, '2-4': 1, '2-5': 5, '2-6': 1, '2-7': 2, '2-8': 1, '2-9': 3,
  '3-3': 2, '3-4': 5, '3-5': 2, '3-6': 1, '3-7': 4, '3-8': 3, '3-9': 1,
  '4-4': 3, '4-5': 5, '4-6': 2, '4-7': 2, '4-8': 1, '4-9': 4,
  '5-5': 3, '5-6': 4, '5-7': 1, '5-8': 3, '5-9': 2,
  '6-6': 2, '6-7': 4, '6-8': 3, '6-9': 1,
  '7-7': 2, '7-8': 3, '7-9': 3,
  '8-8': 3, '8-9': 4,
  '9-9': 2,
};
export function lifePathCompat(a: number, b: number): number {
  const base = (n: number) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);
  const x = Math.min(base(a), base(b));
  const y = Math.max(base(a), base(b));
  return COMPAT_PAIRS[`${x}-${y}`] ?? 3;
}
export const COMPAT_TEXT: Record<number, string> = {
  1: 'Hai số chủ đạo rất hòa hợp: dễ hiểu nhau, nâng đỡ nhau và bổ sung điểm yếu cho nhau.',
  2: 'Hai số chủ đạo khá hòa hợp: có nhiều điểm chung, chỉ cần giao tiếp rõ ràng là êm ấm.',
  3: 'Hai số chủ đạo ở mức trung bình: không xung khắc, vun đắp bằng thời gian và sự quan tâm.',
  4: 'Hai số chủ đạo có nhiều khác biệt về nhịp sống và cách nhìn: cần nhiều kiên nhẫn, lắng nghe và dung hòa.',
  5: 'Hai số chủ đạo dễ va chạm vì khác biệt lớn về nhu cầu: hãy thống nhất một vài quy tắc chung và tôn trọng cách của nhau.',
};
