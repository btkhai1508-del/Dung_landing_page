// Kho nội dung: hồ sơ chi tiết từng người thân, nối thần số học của họ với Bánh xe cuộc đời của bạn.
// Nội dung mang tính tham khảo, viết lại bằng lời văn riêng.

import type { AreaKey } from './lifeWheel';

export const MAX_RELATIVES = 10;

// ---------- Mỗi số chủ đạo: giúp được gì, cần gì, nói chuyện ra sao ----------
export interface LpFamily {
  gives: AreaKey[];
  needs: AreaKey[];
  giveText: string;
  needText: string;
  talk: string;
  appreciate: string;
  conflict: string;
}

export const LP_FAMILY: Record<number, LpFamily> = {
  1: {
    gives: ['career', 'selfDevelopment'],
    needs: ['relationships', 'family'],
    giveText: 'Người số 1 thường tự lập và dám khởi đầu, nên có thể truyền động lực hành động, giúp bạn dám quyết định và bắt đầu việc còn dang dở.',
    needText: 'Họ cần được lắng nghe và cảm nhận sự tôn trọng thay vì bị chỉ đạo; họ cũng thường ngại nói ra nhu cầu được yêu thương.',
    talk: 'Nói thẳng, ngắn gọn và đưa ra lựa chọn thay vì ra lệnh.',
    appreciate: 'Ghi nhận sự chủ động và nỗ lực tự thân của họ.',
    conflict: 'Dễ va chạm khi bị ép làm theo hoặc bị chê trước mặt người khác.',
  },
  2: {
    gives: ['family', 'relationships', 'spirituality'],
    needs: ['selfDevelopment', 'career'],
    giveText: 'Người số 2 nhạy cảm và biết lắng nghe, nên là chỗ dựa tinh thần, giúp bạn dịu lại và gắn kết hơn với mọi người.',
    needText: 'Họ cần được khuyến khích tự tin nói ra mong muốn; nếu không họ dễ nhường nhịn đến mức quên nhu cầu của mình.',
    talk: 'Nói nhẹ nhàng, hỏi cảm nhận của họ và cho họ thời gian để trả lời.',
    appreciate: 'Cảm ơn sự quan tâm thầm lặng của họ.',
    conflict: 'Dễ tổn thương vì lời nói nặng hoặc sự thờ ơ.',
  },
  3: {
    gives: ['relationships', 'spirituality', 'community'],
    needs: ['finance', 'career'],
    giveText: 'Người số 3 vui vẻ và truyền cảm hứng, nên có thể mang không khí nhẹ nhõm, giúp bạn bớt nặng nề và mở rộng kết nối.',
    needText: 'Họ cần sự hỗ trợ để giữ kỷ luật với tiền bạc và hoàn thành việc đã bắt đầu; họ dễ bị tổn thương khi bị chê dù bề ngoài vui vẻ.',
    talk: 'Dùng giọng tích cực, cho họ không gian kể chuyện và cùng cười.',
    appreciate: 'Khen ý tưởng và sự sáng tạo của họ.',
    conflict: 'Dễ chán và né tránh khi bị nhắc nhở nặng nề.',
  },
  4: {
    gives: ['finance', 'health', 'career'],
    needs: ['spirituality', 'relationships'],
    giveText: 'Người số 4 thực tế và có kỷ luật, nên có thể giúp bạn lập kế hoạch tài chính, xây thói quen sức khỏe và hoàn thành công việc đều đặn.',
    needText: 'Họ cần học cách linh hoạt và thư giãn; họ thể hiện tình cảm bằng hành động nên thường cần được nghe lời yêu thương rõ ràng.',
    talk: 'Đưa ra kế hoạch cụ thể, thời gian rõ ràng và giữ lời hứa.',
    appreciate: 'Ghi nhận sự đáng tin và công sức âm thầm của họ.',
    conflict: 'Dễ căng thẳng khi kế hoạch thay đổi đột ngột.',
  },
  5: {
    gives: ['selfDevelopment', 'relationships', 'career'],
    needs: ['finance', 'family'],
    giveText: 'Người số 5 linh hoạt và thích khám phá, nên có thể mở ra góc nhìn mới, kéo bạn ra khỏi lối mòn và thử điều chưa từng làm.',
    needText: 'Họ cần sự tự do có trách nhiệm; họ dễ chi tiêu bốc đồng và ngại những ràng buộc kéo dài.',
    talk: 'Cho họ lựa chọn, tránh gò ép bằng quy tắc cứng và rủ họ cùng trải nghiệm.',
    appreciate: 'Khen sự linh hoạt và tinh thần dám thử của họ.',
    conflict: 'Dễ va chạm khi cảm thấy bị kiểm soát.',
  },
  6: {
    gives: ['family', 'health', 'community'],
    needs: ['spirituality', 'selfDevelopment'],
    giveText: 'Người số 6 chu đáo và có trách nhiệm, nên là trái tim ấm của gia đình, giúp bạn được chăm sóc và có chỗ nghỉ ngơi.',
    needText: 'Họ thường gánh quá nhiều cho người khác, nên cần được nghỉ ngơi và được chăm sóc lại.',
    talk: 'Nói lời cảm ơn cụ thể và hỏi xem họ cần gì, thay vì chỉ nhận.',
    appreciate: 'Ghi nhận sự hy sinh và chu đáo hằng ngày của họ.',
    conflict: 'Dễ buồn khi cố gắng không được nhìn thấy, hoặc khi người thân không nghe lời khuyên.',
  },
  7: {
    gives: ['selfDevelopment', 'spirituality', 'career'],
    needs: ['relationships', 'family'],
    giveText: 'Người số 7 sâu sắc và ham học, nên có thể giúp bạn hiểu mình, học sâu và tìm sự tĩnh lặng.',
    needText: 'Họ cần không gian riêng nhưng cũng cần được chủ động kết nối nhẹ nhàng, vì họ ít khi tự mở lời.',
    talk: 'Nói có lý lẽ, tôn trọng sự im lặng của họ và đừng dồn họ phải trả lời ngay.',
    appreciate: 'Ghi nhận kiến thức và sự điềm tĩnh của họ.',
    conflict: 'Dễ rút lui khi bị hỏi dồn hoặc bị ép chia sẻ.',
  },
  8: {
    gives: ['finance', 'career'],
    needs: ['health', 'family', 'spirituality'],
    giveText: 'Người số 8 có tầm nhìn và khả năng tổ chức, nên có thể giúp bạn nghĩ lớn hơn về tiền bạc, sự nghiệp và cách đạt kết quả.',
    needText: 'Họ thường dồn hết cho công việc, nên cần được nhắc nghỉ ngơi và cần thời gian chất lượng cho gia đình.',
    talk: 'Nói vào kết quả và con số, tôn trọng thời gian của họ và hẹn trước khi cần trao đổi sâu.',
    appreciate: 'Ghi nhận thành quả và trách nhiệm họ đang gánh.',
    conflict: 'Dễ áp đặt khi căng thẳng; họ khó chịu khi bị phản bác trước đông người.',
  },
  9: {
    gives: ['community', 'spirituality', 'relationships'],
    needs: ['finance', 'health', 'career'],
    giveText: 'Người số 9 bao dung và giàu lý tưởng, nên có thể giúp bạn nhìn rộng hơn, biết cho đi và buông những điều không cần mang theo.',
    needText: 'Họ cần thực tế hơn với tiền bạc và sức khỏe, và cần được bảo vệ khỏi việc cho đi quá mức.',
    talk: 'Nói về ý nghĩa và giá trị, lắng nghe câu chuyện của họ và đừng chế giễu lý tưởng.',
    appreciate: 'Ghi nhận lòng tốt và tầm nhìn của họ.',
    conflict: 'Dễ thất vọng khi người khác không sống đúng giá trị họ đặt ra.',
  },
};

// ---------- Cách gia đình có thể đồng hành theo "năm cá nhân" của họ ----------
export const FAMILY_YEAR_HELP: Record<number, string> = {
  1: 'Năm này là mùa khởi đầu của họ: hãy khuyến khích dự định mới và tránh dập tắt ý tưởng khi nó còn non.',
  2: 'Năm này họ cần kiên nhẫn và kết nối: hãy dành thời gian lắng nghe và đừng thúc ép họ quyết định nhanh.',
  3: 'Năm này họ nở rộ về biểu đạt: hãy cùng họ vui chơi, khen những điều họ sáng tạo và chia sẻ.',
  4: 'Năm này họ làm việc chăm chỉ và xây nền: hãy giúp họ giữ sức khỏe, nhắc nghỉ ngơi và chia sẻ việc nhà.',
  5: 'Năm này họ nhiều thay đổi: hãy cho họ không gian thích nghi, giữ những nếp sinh hoạt gia đình ổn định làm điểm tựa.',
  6: 'Năm này gia đình và trách nhiệm là trọng tâm của họ: hãy chia sẻ gánh nặng và cùng nhau làm những việc ấm áp.',
  7: 'Năm này họ hướng vào bên trong: hãy tôn trọng thời gian một mình của họ và đừng hiểu lầm sự im lặng.',
  8: 'Năm này họ nhiều việc và áp lực kết quả: hãy ủng hộ, nhưng nhớ rủ họ nghỉ ngơi và ăn cùng gia đình.',
  9: 'Năm này họ khép lại một chặng: hãy giúp họ buông điều đã cũ, tha thứ và chuẩn bị cho khởi đầu mới.',
};

// ---------- Giai đoạn tuổi ----------
export const STAGES: { max: number; label: string; tip: string }[] = [
  { max: 12, label: 'Trẻ nhỏ', tip: 'Ở tuổi này, trẻ cần sự có mặt, lời khen cụ thể và nếp sinh hoạt đều đặn. Chơi cùng con mỗi ngày quan trọng hơn dạy dỗ nhiều.' },
  { max: 17, label: 'Tuổi thiếu niên', tip: 'Ở tuổi này, các em cần được lắng nghe và tôn trọng sự riêng tư. Đặt ranh giới rõ ràng nhưng giải thích lý do, và tránh so sánh với người khác.' },
  { max: 29, label: 'Tuổi trẻ', tip: 'Ở tuổi này, họ đang định hình hướng đi và đôi khi hoang mang. Hãy hỏi thay vì khuyên, và ủng hộ lựa chọn của họ khi họ đã suy nghĩ kỹ.' },
  { max: 59, label: 'Tuổi trưởng thành', tip: 'Ở tuổi này, họ thường gánh nhiều vai trò cùng lúc. Chia sẻ việc, hỏi thăm sức khỏe và dành thời gian chất lượng giúp họ nhẹ gánh.' },
  { max: 200, label: 'Tuổi cao niên', tip: 'Ở tuổi này, họ cần sự hiện diện, những cuộc gọi đều đặn và cảm giác vẫn có ích. Hãy nghe họ kể chuyện và nhờ họ chia sẻ kinh nghiệm.' },
];

// ---------- Gợi ý hoạt động chung theo ngũ hành ----------
export const HANH_ACTIVITY: Record<string, string> = {
  Kim: 'cùng dọn dẹp, sắp xếp lại một góc nhà hoặc nấu một món gọn gàng, tinh tế',
  Mộc: 'đi dạo ở nơi nhiều cây xanh hoặc cùng trồng một chậu cây',
  Thủy: 'cùng nấu ăn, đi picnic bên hồ hoặc nói chuyện thong thả bên tách trà',
  Hỏa: 'cùng nấu một bữa thật vui, nghe nhạc hoặc chơi một trò chơi cả nhà',
  Thổ: 'ăn một bữa cơm gia đình đầy đủ hoặc làm vườn, nấu nướng cùng nhau',
};

export const FAMILY_SCORE_NOTE = {
  low: 'Điểm Gia đình của bạn đang thấp, nên việc đầu tư vào các mối quan hệ dưới đây là ưu tiên thật sự chứ không phải việc “làm cho có”.',
  mid: 'Điểm Gia đình của bạn ở mức trung bình, vài thay đổi nhỏ và đều đặn trong cách trò chuyện sẽ nâng điểm rõ rệt.',
  high: 'Điểm Gia đình của bạn đang tốt; hãy dùng phần dưới đây để hiểu thêm từng người và giữ vững sự gắn kết.',
};

// ---------- Nối vai trò người thân với các lĩnh vực của bánh xe (khi điểm của bạn ở lĩnh vực đó còn thấp) ----------
export const ROLE_WHEEL: Record<string, Partial<Record<AreaKey, string>>> = {
  couple: {
    finance: 'Với bạn đời, tài chính là chủ đề nên nói chung: cùng lập ngân sách và mục tiêu tiết kiệm thay vì mỗi người một hướng, vì áp lực tiền bạc rất dễ biến thành căng thẳng trong hôn nhân.',
    health: 'Cùng bạn đời đi bộ hoặc ăn uống lành mạnh là cách giữ thói quen sức khỏe dễ nhất, vì có người nhắc và có người cùng đi.',
    spirituality: 'Một khoảng yên tĩnh chung mỗi ngày (cùng uống trà, đi dạo, không điện thoại) giúp cả hai bình an hơn.',
  },
  child: {
    selfDevelopment: 'Cùng con học một điều mới mỗi tuần vừa nâng điểm phát triển bản thân của bạn vừa kéo hai bố mẹ con lại gần nhau hơn.',
    health: 'Sinh hoạt đều giờ và vận động cùng con là cách tốt để chính bạn cũng giữ được nhịp sống lành mạnh.',
    community: 'Cùng con làm một việc tử tế nhỏ (tặng đồ cũ, giúp hàng xóm) dạy con biết cho đi và cho bạn cảm giác có ý nghĩa.',
  },
  parent: {
    health: 'Rủ cha mẹ cùng vận động nhẹ và khám sức khỏe định kỳ, vừa chăm họ vừa nhắc chính bạn chăm mình.',
    finance: 'Nói chuyện cởi mở với cha mẹ về chi phí và dự phòng giúp tránh những căng thẳng bất ngờ về tiền.',
    spirituality: 'Nghe cha mẹ kể chuyện xưa là cách giúp tâm bạn lắng xuống và hiểu mình đến từ đâu.',
  },
  sibling: {
    relationships: 'Anh chị em là mối quan hệ dài nhất đời bạn; một cuộc gọi đều đặn mỗi tuần giúp điểm Mối quan hệ của bạn tăng rõ rệt.',
    finance: 'Nếu có chuyện tiền bạc giữa anh chị em, hãy thống nhất rõ ràng bằng lời nói trước, đừng để thành hiểu lầm.',
  },
  grand: {
    spirituality: 'Nghe ông bà kể chuyện và cùng làm những nghi thức nhỏ của gia đình giúp nội tâm bạn yên và có gốc rễ.',
    health: 'Chăm sóc ông bà (ăn uống, đi lại, khám bệnh) cũng là lúc bạn học cách chăm sóc sức khỏe của chính mình.',
  },
  other: {
    relationships: 'Dành thời gian chất lượng cho người thân này là cách nâng điểm Mối quan hệ của bạn.',
  },
};
