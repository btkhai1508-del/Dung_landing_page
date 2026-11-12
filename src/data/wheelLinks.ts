// Kho nội dung: liên kết giữa các lĩnh vực của Bánh xe cuộc đời (Wheel of Life).
// Khung phân tích tham khảo bài giới thiệu của Pure Coaching (purecoaching.vn) và thực hành coaching phổ biến;
// toàn bộ diễn giải được viết lại bằng lời văn riêng, mang tính tham khảo.

import type { AreaKey } from './lifeWheel';

// ---------- Cách đọc bánh xe ----------
export const HOW_TO_READ: string[] = [
  'Bánh xe cuộc đời là cách nhìn nhanh toàn cảnh cuộc sống: mỗi “nan hoa” là một lĩnh vực, điểm càng cao thì nan càng dài. Mục đích không phải để chấm điểm hay phán xét bản thân, mà để nhận ra nhu cầu nào đang bị bỏ quên.',
  'Điểm của bạn được đọc theo cảm nhận hiện tại, từ 1 (rất thiếu) đến 10 (đủ đầy). Điểm thấp là tín hiệu cần chăm sóc, không phải thất bại. Bạn cũng không cần đạt 10/10 ở mọi nan: mỗi giai đoạn đời (mới lập nghiệp, nuôi con nhỏ, chăm cha mẹ…) cho phép các nan khác nhau.',
  'Điều quan trọng hơn từng con số riêng lẻ là hình dạng và mối liên kết: các lĩnh vực luôn tác động qua lại. Một nan thụt sâu có thể làm cả bánh xe chao đảo, còn một nan được nâng lên đúng chỗ có thể kéo nhiều nan khác đi lên theo.',
];

// ---------- 5 mức điểm ----------
export const LEVELS: { max: number; label: string; tone: 'alarm' | 'low' | 'mid' | 'good' | 'full'; lead: (name: string) => string }[] = [
  { max: 2, label: 'Cần chăm sóc ngay', tone: 'alarm', lead: (n) => `${n} đang ở mức rất thấp. Đây là tín hiệu cần chăm sóc sớm — không phải thất bại, mà là lời nhắc từ chính cuộc sống của bạn.` },
  { max: 4, label: 'Đang thiếu hụt', tone: 'low', lead: (n) => `${n} đang thiếu hụt so với nhu cầu của bạn. Đây là vùng nên được ưu tiên vì nó dễ kéo các lĩnh vực khác xuống.` },
  { max: 6, label: 'Tạm ổn', tone: 'mid', lead: (n) => `${n} ở mức tạm ổn: đủ dùng nhưng chưa đủ đầy. Một vài thay đổi nhỏ và đều đặn có thể nâng điểm rõ rệt.` },
  { max: 8, label: 'Khá tốt', tone: 'good', lead: (n) => `${n} đang khá tốt: đây là nguồn lực bạn có thể dùng để nâng những lĩnh vực còn yếu.` },
  { max: 10, label: 'Viên mãn', tone: 'full', lead: (n) => `${n} đang rất đủ đầy. Hãy duy trì và để ý rằng điểm cao này không đang được đánh đổi bằng lĩnh vực khác.` },
];

// ---------- Câu hỏi suy ngẫm ----------
export const AREA_QUESTIONS: Record<AreaKey, string[]> = {
  health: ['Sáng thức dậy, bạn thấy sảng khoái hay thường uể oải?', 'Một thói quen nhỏ nào về ngủ, ăn, vận động bạn sẵn sàng bắt đầu từ tuần này?'],
  family: ['Lần gần nhất bạn thật sự lắng nghe người thân mà không nhìn điện thoại là khi nào?', 'Điều gì ở gia đình khiến bạn biết ơn, và điều gì bạn muốn nói mà chưa nói?'],
  finance: ['Bạn có biết rõ mỗi tháng tiền đi đâu và còn lại bao nhiêu không?', 'Nếu bớt lo về tiền, bạn sẽ làm điều gì khác đi?'],
  career: ['Bạn đang làm việc vì nghĩa vụ hay vì thấy công việc là cách mình đóng góp giá trị?', 'Một bước nhỏ nào sẽ đưa công việc gần hơn với điều bạn thật sự giỏi?'],
  relationships: ['Có ai bạn có thể gọi lúc khó khăn mà không phải e ngại không?', 'Mối quan hệ nào đang nâng đỡ bạn và mối quan hệ nào đang làm bạn mệt?'],
  selfDevelopment: ['Gần đây bạn học được điều gì khiến mình thay đổi cách nghĩ hoặc cách làm?', 'Bạn có dành thời gian cho chính mình mỗi ngày để nuôi dưỡng tâm hồn không?'],
  spirituality: ['Trong ngày, bạn có khoảng lặng nào để nghe cơ thể và tâm trí mình không?', 'Điều gì giúp bạn thấy bình an nhất, và lần gần nhất bạn làm điều đó là khi nào?'],
  community: ['Bạn đang giúp ai, hoặc muốn giúp ai, bằng thứ mình có (thời gian, kiến thức, sự lắng nghe)?', 'Khi giúp người khác, bạn cảm thấy thế nào về chính mình?'],
};

// ---------- 28 cặp liên kết ----------
export interface PairLink {
  a: AreaKey;
  b: AreaKey;
  /** Mức tác động của a → b và b → a (1 nhẹ, 2 vừa, 3 mạnh) */
  w: [number, number];
  /** Cơ chế tác động hai chiều */
  link: string;
  /** Khi a mạnh, a giúp b như thế nào */
  aToB: string;
  /** Khi b mạnh, b giúp a như thế nào */
  bToA: string;
}

export const LINKS: PairLink[] = [
  { a: 'health', b: 'family', w: [2, 2], link: 'Cơ thể mệt thì ít kiên nhẫn với người thân, còn nhà nhiều căng thẳng lại làm giấc ngủ và ăn uống đi xuống.', aToB: 'Khi khỏe, bạn có năng lượng để có mặt và lắng nghe gia đình; bắt đầu bằng một bữa cơm chung hoặc buổi đi dạo cùng nhau.', bToA: 'Gia đình ấm là chỗ nạp lại sức: hãy rủ người thân cùng tập và cùng ăn uống lành mạnh.' },
  { a: 'health', b: 'finance', w: [1, 2], link: 'Sức khỏe kém làm tốn tiền chữa trị và giảm khả năng kiếm tiền; áp lực tiền bạc lại khiến ăn ngủ thất thường.', aToB: 'Khỏe là nền để làm việc bền; ngủ đủ giúp quyết định tiền bạc sáng suốt hơn.', bToA: 'Tài chính vững cho phép bạn đầu tư vào ăn uống, khám sức khỏe và nghỉ ngơi đúng nghĩa.' },
  { a: 'health', b: 'career', w: [3, 2], link: 'Làm quá sức để đổi lấy thành tích sẽ bào mòn sức khỏe, còn sức khỏe yếu lại làm năng suất và hứng khởi giảm.', aToB: 'Năng lượng tốt giúp bạn tập trung sâu và làm hiệu quả hơn trong ít giờ hơn.', bToA: 'Công việc có ý nghĩa và ranh giới giờ giấc rõ ràng giúp bạn bớt căng thẳng, từ đó ngủ và ăn uống tốt hơn.' },
  { a: 'health', b: 'relationships', w: [1, 2], link: 'Mệt mỏi làm bạn ngại gặp gỡ, còn thiếu kết nối khiến cơ thể ít vận động và dễ buồn.', aToB: 'Khỏe thì dễ tham gia hoạt động cùng bạn bè và mở rộng kết nối.', bToA: 'Có người cùng đi bộ, cùng tập là cách giữ thói quen sức khỏe bền nhất.' },
  { a: 'health', b: 'selfDevelopment', w: [2, 1], link: 'Mệt mỏi làm giảm khả năng học; thiếu hướng phát triển lại khiến bạn dễ buông thả thói quen chăm sóc bản thân.', aToB: 'Cơ thể khỏe giúp trí nhớ và sự tập trung tốt hơn, học nhanh hơn.', bToA: 'Học cách chăm sóc bản thân (giấc ngủ, dinh dưỡng, thói quen) là phát triển bản thân có tác dụng ngay.' },
  { a: 'health', b: 'spirituality', w: [3, 3], link: 'Cơ thể và tâm trí là một: căng thẳng kéo dài làm cơ thể kiệt sức, còn cơ thể mệt thì tâm trạng đi xuống.', aToB: 'Vận động và ngủ đủ làm dịu tâm trí rất nhanh.', bToA: 'Thiền, hít thở, viết nhật ký giảm căng thẳng và cải thiện giấc ngủ.' },
  { a: 'health', b: 'community', w: [1, 2], link: 'Khi cạn năng lượng, bạn khó cho đi; khi chỉ cho đi mà không nghỉ, bạn dễ kiệt sức.', aToB: 'Khỏe thì có sức tham gia các hoạt động giúp người.', bToA: 'Giúp người đúng mức mang lại niềm vui và cảm giác có ý nghĩa, tiếp thêm sức sống.' },
  { a: 'family', b: 'finance', w: [1, 2], link: 'Áp lực tiền bạc là nguồn căng thẳng phổ biến trong gia đình, còn thiếu hòa thuận làm quyết định tài chính khó thống nhất.', aToB: 'Gia đình đồng lòng giúp lập ngân sách chung và cùng đi qua giai đoạn khó.', bToA: 'Tài chính ổn tạo không gian cho thời gian và trải nghiệm chung của gia đình.' },
  { a: 'family', b: 'career', w: [1, 2], link: 'Công việc chiếm hết thời gian làm gia đình xa cách, còn nhà căng thẳng làm bạn mất tập trung ở chỗ làm.', aToB: 'Gia đình vững là điểm tựa tinh thần giúp bạn dám theo đuổi mục tiêu công việc.', bToA: 'Sự nghiệp ổn định tạo điều kiện dành thời gian chất lượng cho gia đình, nếu bạn giữ ranh giới giờ giấc.' },
  { a: 'family', b: 'relationships', w: [2, 2], link: 'Gia đình là nơi học cách kết nối đầu tiên; thiếu kết nối bên ngoài khiến người nhà phải gánh toàn bộ nhu cầu cảm xúc của bạn.', aToB: 'Gia đình hòa thuận giúp bạn tự tin hơn khi giao tiếp bên ngoài.', bToA: 'Bạn bè tốt giúp bạn có góc nhìn mới và bớt kỳ vọng quá mức vào người nhà.' },
  { a: 'family', b: 'selfDevelopment', w: [2, 2], link: 'Học cách lắng nghe và giao tiếp là phát triển bản thân có lợi trực tiếp cho gia đình.', aToB: 'Gia đình ủng hộ giúp bạn có thời gian và động lực để học.', bToA: 'Càng hiểu mình, bạn càng bớt phản ứng nóng và thấu hiểu người thân hơn.' },
  { a: 'family', b: 'spirituality', w: [2, 3], link: 'Tâm bình yên thì dễ yêu thương, còn gia đình xáo động làm nội tâm khó yên.', aToB: 'Gia đình ấm áp là nền tảng cảm giác an toàn và thuộc về.', bToA: 'Nội tâm vững giúp bạn ứng xử bình tĩnh hơn khi gia đình có mâu thuẫn.' },
  { a: 'family', b: 'community', w: [2, 1], link: 'Tình thương bắt đầu từ nhà; cho đi bên ngoài mà bỏ quên người nhà dễ để lại khoảng trống.', aToB: 'Gia đình là nơi bạn học yêu thương, rồi lan tỏa ra cộng đồng.', bToA: 'Cùng gia đình làm một việc thiện nguyện nhỏ vừa gắn kết vừa có ý nghĩa.' },
  { a: 'finance', b: 'career', w: [2, 3], link: 'Thu nhập gắn chặt với công việc: thiếu hướng đi nghề nghiệp thì tiền khó tăng, còn áp lực tiền bạc khiến bạn dễ chấp nhận công việc không hợp.', aToB: 'Tài chính vững cho bạn đủ an tâm để chọn công việc đúng sở trường thay vì chỉ chọn lương.', bToA: 'Công việc phát triển (kỹ năng, vị trí) là đường nhanh nhất để tăng thu nhập.' },
  { a: 'finance', b: 'relationships', w: [1, 2], link: 'Tiền bạc dễ làm quan hệ căng thẳng (vay mượn, so sánh), còn mạng lưới tốt mở ra cơ hội kiếm tiền.', aToB: 'Tài chính ổn giúp bạn tham gia và giữ quan hệ mà không bị áp lực.', bToA: 'Mối quan hệ tốt mở ra cơ hội, lời giới thiệu và hợp tác.' },
  { a: 'finance', b: 'selfDevelopment', w: [2, 3], link: 'Không đầu tư học thì thu nhập khó tăng, còn thiếu tiền lại hạn chế khả năng đầu tư cho bản thân.', aToB: 'Có nguồn lực thì dễ đầu tư vào khóa học, sách và người cố vấn.', bToA: 'Kỹ năng và hiểu biết tài chính là khoản đầu tư sinh lời nhất.' },
  { a: 'finance', b: 'spirituality', w: [1, 2], link: 'Lo lắng về tiền làm tâm trí khó yên, còn tâm bất an dễ dẫn đến chi tiêu theo cảm xúc.', aToB: 'Tài chính ổn giúp bớt nỗi lo nền tảng, tâm trí nhẹ hơn.', bToA: 'Nội tâm vững giúp bạn quyết định tiền bạc bình tĩnh, tránh chi tiêu theo cảm xúc.' },
  { a: 'finance', b: 'community', w: [1, 1], link: 'Thiếu tiền thì khó cho đi bằng tiền, nhưng vẫn cho đi được bằng thời gian; cho đi lại giúp bạn nhìn tiền như công cụ phục vụ.', aToB: 'Có dư dả thì có thể đóng góp bằng tiền theo kế hoạch.', bToA: 'Đóng góp giúp bạn bớt nỗi sợ thiếu và nhìn tiền bạc nhẹ nhàng hơn.' },
  { a: 'career', b: 'relationships', w: [2, 2], link: 'Công việc quá tải làm mất thời gian cho bạn bè, còn thiếu kết nối khiến sự nghiệp thiếu người nâng đỡ.', aToB: 'Sự nghiệp tốt mang lại các mối quan hệ chuyên môn chất lượng.', bToA: 'Mạng lưới tốt là nguồn cơ hội, phản hồi và hỗ trợ trong nghề.' },
  { a: 'career', b: 'selfDevelopment', w: [2, 3], link: 'Học hỏi liên tục là động lực thăng tiến, còn công việc đơn điệu làm cạn hứng thú học.', aToB: 'Công việc có thử thách cho bạn môi trường để học và áp dụng ngay.', bToA: 'Kỹ năng mới là cách nhanh nhất để tăng giá trị của bạn trong sự nghiệp.' },
  { a: 'career', b: 'spirituality', w: [1, 2], link: 'Công việc không có ý nghĩa làm nội tâm trống rỗng, còn nội tâm bất an làm giảm sự tập trung và sáng tạo.', aToB: 'Công việc đúng ý nghĩa nuôi dưỡng cảm giác sống có mục đích.', bToA: 'Tâm bình tĩnh giúp tập trung sâu và quyết định tốt trong công việc.' },
  { a: 'career', b: 'community', w: [1, 1], link: 'Công việc có thể là cách đóng góp; đóng góp cho cộng đồng lại nhắc bạn về ý nghĩa nghề nghiệp.', aToB: 'Dùng chuyên môn để giúp người khác làm tăng cảm giác ý nghĩa của công việc.', bToA: 'Những việc thiện nguyện giúp mở rộng kỹ năng và quan hệ chuyên môn.' },
  { a: 'relationships', b: 'selfDevelopment', w: [2, 2], link: 'Quan hệ chất lượng thúc đẩy học hỏi, còn hiểu mình giúp bạn chọn đúng người đồng hành.', aToB: 'Bạn bè tốt cho phản hồi thật và góc nhìn mới.', bToA: 'Hiểu mình giúp bạn kết nối chân thật và đặt ranh giới lành mạnh.' },
  { a: 'relationships', b: 'spirituality', w: [2, 3], link: 'Cô đơn làm nội tâm bất an, còn nội tâm bất an làm bạn khó mở lòng.', aToB: 'Có người để chia sẻ là liều thuốc cho tâm trí.', bToA: 'Tâm vững giúp bạn lắng nghe và kết nối chân thành hơn.' },
  { a: 'relationships', b: 'community', w: [2, 2], link: 'Cho đi là cách kết bạn tự nhiên, còn có nhiều bạn cũng tạo cơ hội để cùng giúp đỡ.', aToB: 'Mạng lưới tốt giúp bạn dễ tìm cộng đồng để đóng góp.', bToA: 'Hoạt động chung vì điều tử tế gắn kết rất nhanh.' },
  { a: 'selfDevelopment', b: 'spirituality', w: [2, 2], link: 'Học để hiểu mình và rèn nội tâm là hai việc đi cùng nhau.', aToB: 'Học và tự nhận thức giúp bạn gọi tên cảm xúc và bớt phản ứng.', bToA: 'Tâm tĩnh giúp học sâu và nhớ lâu.' },
  { a: 'selfDevelopment', b: 'community', w: [2, 2], link: 'Điều học được có ý nghĩa nhất khi chia sẻ, còn giúp người khác cũng là cách học nhanh nhất.', aToB: 'Kiến thức của bạn là món quà có thể đóng góp.', bToA: 'Dạy lại cho người khác giúp bạn hiểu sâu hơn.' },
  { a: 'spirituality', b: 'community', w: [2, 2], link: 'Nội tâm vững giúp cho đi không mong đáp lại, còn cho đi làm nội tâm nhẹ nhàng.', aToB: 'Bình an trong lòng giúp việc giúp người bền hơn, không kiệt sức.', bToA: 'Cho đi mang lại cảm giác ý nghĩa và kết nối, nuôi dưỡng tâm hồn.' },
];

// ---------- Ba trụ cột ----------
export type GroupKey = 'self' | 'bond' | 'achieve';
export const GROUPS: { key: GroupKey; label: string; areas: AreaKey[] }[] = [
  { key: 'self', label: 'Nền tảng bản thân', areas: ['health', 'selfDevelopment', 'spirituality'] },
  { key: 'bond', label: 'Gắn kết & cho đi', areas: ['family', 'relationships', 'community'] },
  { key: 'achieve', label: 'Thành tựu & tiền bạc', areas: ['career', 'finance'] },
];

export const GROUP_PATTERN: Record<string, string> = {
  'self>bond': 'Nền bản thân (sức khỏe, học hỏi, nội tâm) của bạn đang vững hơn phần gắn kết với người khác. Hãy dùng nền vững này để chủ động kết nối: mời một người thân hoặc một người bạn cùng làm một việc nhỏ.',
  'self>achieve': 'Bạn có nền bản thân tốt nhưng thành tựu và tiền bạc chưa tương xứng: nội lực chưa được chuyển thành kết quả. Chọn một mục tiêu nghề nghiệp hoặc tài chính rõ ràng và đặt kế hoạch 90 ngày.',
  'bond>self': 'Bạn đang sống nhiều cho người khác (gia đình, bạn bè, cộng đồng) trong khi nền bản thân còn thiếu, và mô hình này dễ dẫn đến kiệt sức. Hãy đặt giờ riêng cố định cho sức khỏe và nội tâm.',
  'bond>achieve': 'Quan hệ của bạn phong phú nhưng sự nghiệp và tài chính còn yếu. Hãy dùng mạng lưới này để mở cơ hội, đồng thời cẩn trọng với việc cho đi vượt quá khả năng.',
  'achieve>self': 'Thành tựu và tiền bạc đang đi trước, còn nền bản thân (sức khỏe, nội tâm, học hỏi) đi sau. Mô hình này dễ dẫn đến kiệt sức nếu kéo dài; đây là lúc đầu tư lại cho cơ thể và tâm trí.',
  'achieve>bond': 'Công việc và tiền bạc đang vượt trội so với gắn kết với người khác: nguy cơ là “thành công mà cô đơn”. Hãy dành thời gian chất lượng cho người thân và bạn bè.',
  balanced: 'Ba trụ cột (bản thân, gắn kết, thành tựu) khá cân bằng, đây là nền tốt để bạn bứt phá ở bất kỳ hướng nào bạn chọn.',
};

// ---------- Hình dạng bánh xe ----------
export const SHAPE_TEXT = {
  round: 'Bánh xe khá tròn: các lĩnh vực đi cùng nhau nên bánh xe lăn êm. Điều cần là nâng dần đồng đều thay vì tập trung đột phá một lĩnh vực.',
  uneven: 'Bánh xe hơi méo: có vài nan nhô cao và vài nan thụt vào. Bánh xe vẫn lăn được nhưng sẽ có những chỗ xóc, nhất là khi gặp áp lực.',
  lopsided: 'Bánh xe méo rõ: nan cao nhất và thấp nhất cách nhau nhiều. Với hình dạng này, bạn dễ thấy mệt dù một vài lĩnh vực rất tốt, vì nan thấp đang làm cả bánh xe chao đảo.',
  allLow: 'Phần lớn các nan đều thấp: đây là giai đoạn nhiều áp lực. Đừng cố sửa tất cả cùng lúc; hãy bắt đầu từ nền tảng nhất (giấc ngủ, sức khỏe, khoảng tĩnh cho bản thân).',
  allHigh: 'Bánh xe lớn và đều: bạn đang sống khá đủ đầy. Hãy giữ nhịp, định kỳ kiểm tra lại và chọn một hướng phát triển mới.',
  dents: 'Có nhiều nan thụt sâu (từ 4 điểm trở xuống): nhiều “lỗ hổng” cùng lúc dễ khiến bạn quá tải nếu cố sửa hết. Hãy chọn một đến hai nan then chốt.',
};

// ---------- Vòng xoáy ----------
export interface Cycle {
  key: string;
  name: string;
  members: AreaKey[];
  down: string;
  up: string;
  breakAdvice: string;
}
export const CYCLES: Cycle[] = [
  {
    key: 'energy', name: 'Vòng năng lượng – hiệu suất – thu nhập', members: ['health', 'spirituality', 'career', 'finance'],
    down: 'Sức khỏe và nội tâm yếu làm năng suất giảm, thu nhập và áp lực tăng, rồi lo lắng, thức khuya lại làm sức khỏe yếu thêm.',
    up: 'Cơ thể khỏe và tâm trí tĩnh giúp làm việc hiệu quả, thu nhập ổn, bớt áp lực và có điều kiện đầu tư tiếp cho sức khỏe.',
    breakAdvice: 'Cắt vòng ở mắt xích rẻ nhất: ngủ đúng giờ và 15 phút vận động mỗi ngày trong 2 tuần.',
  },
  {
    key: 'bond', name: 'Vòng gắn kết – an yên', members: ['family', 'relationships', 'spirituality'],
    down: 'Ít kết nối làm bạn cô đơn và căng thẳng, dễ cáu hoặc khép kín, rồi kết nối càng ít đi.',
    up: 'Kết nối chân thành làm bạn an tâm, nên dễ yêu thương và mở lòng hơn, rồi kết nối càng sâu.',
    breakAdvice: 'Chủ động một cuộc trò chuyện chân thành mỗi ngày với một người thân hoặc bạn bè.',
  },
  {
    key: 'growth', name: 'Vòng học hỏi – nghề nghiệp – thu nhập', members: ['selfDevelopment', 'career', 'finance'],
    down: 'Ngừng học làm kỹ năng cũ dần, khó thăng tiến và tăng thu nhập, rồi không còn nguồn lực để học tiếp.',
    up: 'Học đúng thứ cần giúp tăng giá trị trong công việc, thu nhập tăng và có thêm nguồn lực để học sâu hơn.',
    breakAdvice: 'Dành 15–20 phút mỗi ngày cho một kỹ năng gắn trực tiếp với công việc của bạn.',
  },
  {
    key: 'meaning', name: 'Vòng ý nghĩa – cho đi', members: ['community', 'spirituality', 'relationships'],
    down: 'Ít cho đi làm thiếu cảm giác ý nghĩa, nội tâm trống dần, rồi càng thu mình khỏi mọi người.',
    up: 'Cho đi giúp nội tâm nhẹ nhàng và mở rộng quan hệ, từ đó bạn có thêm động lực để cho đi.',
    breakAdvice: 'Làm một việc giúp đỡ nhỏ mỗi tuần, bằng thời gian hoặc kiến thức bạn có.',
  },
];

// ---------- Sau khi xem bánh xe ----------
export const NEXT_STEPS: string[] = [
  'Nhìn lại hình dạng bánh xe mà không tự trách: điểm thấp là thông tin để chăm sóc, không phải bản án.',
  'Chọn một nan hoa then chốt, thay vì cố nâng cả tám lĩnh vực cùng lúc (cách này dễ gây quá tải và bỏ cuộc).',
  'Chỉ cam kết một hành động nhỏ cho hôm nay: đi bộ 15 phút, gọi cho một người thân hoặc từ chối một việc quá sức.',
  'Chấm lại bánh xe sau 3 tháng (hoặc cuối năm) để thấy hình dạng thay đổi ra sao và điều chỉnh nan then chốt cho giai đoạn mới.',
];
