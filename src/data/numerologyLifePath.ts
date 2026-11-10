// Kho nội dung: Số chủ đạo (Life Path) 1–9, 11, 22, 33.
// Nội dung tham khảo hệ Pythagoras (D. A. Phillips – The Complete Book of Numerology) và được viết lại bằng lời văn riêng.

export interface LifePathInfo {
  title: string;
  keywords: string[];
  essence: string;
  strengths: string[];
  challenges: string[];
  career: string;
  love: string;
  family: string;
  money: string;
  health: string;
  shadow: string;
  growth: string;
  mantra: string;
}

export const LIFE_PATH: Record<number, LifePathInfo> = {
  1: {
    title: 'Người Tiên Phong',
    keywords: ['Độc lập', 'Khởi xướng', 'Quyết đoán', 'Dẫn dắt'],
    essence:
      'Số 1 là năng lượng của hạt giống đầu tiên: bạn đến cuộc đời này để mở đường, tự đứng trên đôi chân mình và biến ý tưởng thành hành động. Bạn sống đúng nhất khi được tự quyết định, và thường là người dám bước trước khi người khác còn do dự.',
    strengths: [
      'Dám bắt đầu khi người khác còn chần chừ',
      'Ý chí mạnh, đủ bền bỉ để đi qua áp lực',
      'Tư duy độc lập, hướng đến giải pháp',
      'Khả năng truyền cảm hứng và kéo người khác đi cùng',
    ],
    challenges: [
      'Dễ cứng đầu, khó lắng nghe khi đã quyết',
      'Ôm hết việc về mình rồi tự cô lập',
      'Nóng vội, thiếu kiên nhẫn với nhịp chậm của người khác',
      'Cái tôi lớn khiến dễ va chạm với người cùng chí hướng',
    ],
    career:
      'Hợp khởi nghiệp, quản lý dự án, kinh doanh tự chủ, tư vấn, sáng tạo nội dung mang dấu ấn riêng. Bạn làm tốt nhất ở vị trí được trao quyền quyết định và mục tiêu rõ ràng; môi trường nhiều tầng duyệt, nhiều quy trình cứng sẽ bào mòn năng lượng của bạn.',
    love:
      'Bạn cần một người đồng hành đủ tự tin để đứng cạnh chứ không đứng sau. Tình yêu bền khi hai bên tôn trọng không gian riêng của nhau; điều cần học là nói ra nhu cầu được yêu thương thay vì tỏ ra mạnh mẽ.',
    family:
      'Trong gia đình, bạn thường là trụ cột hoặc người đi tiên phong cho cả nhà. Hãy nhớ rằng người thân đôi khi cần được lắng nghe hơn là được chỉ đường.',
    money:
      'Tiền đến mạnh nhất khi bạn tự tạo ra nguồn thu của mình. Cẩn thận những quyết định đầu tư vội vàng; nên có một người bạn tin cậy để phản biện trước các khoản lớn.',
    health:
      'Năng lượng dồi dào nhưng dễ kiệt sức vì làm việc quá độ. Chú ý tim mạch, huyết áp, đầu và vai gáy; cần những khoảng nghỉ có chủ đích.',
    shadow:
      'Khi mất cân bằng, sự tự tin biến thành áp đặt, sự độc lập biến thành cô độc, và bạn khó nhận ra mình đang đẩy người thân ra xa.',
    growth:
      'Tập hỏi “bạn nghĩ sao?” trước khi quyết định ở những việc liên quan đến người khác, và học cách ủy thác. Dẫn dắt giỏi không phải là làm hết, mà là làm cho người khác lớn lên cùng mình.',
    mantra: 'Tôi đủ mạnh để dẫn đường và đủ khiêm tốn để lắng nghe.',
  },
  2: {
    title: 'Người Kết Nối',
    keywords: ['Hòa hợp', 'Nhạy cảm', 'Hợp tác', 'Tinh tế'],
    essence:
      'Số 2 là năng lượng của sự gắn kết: bạn cảm nhận được điều người khác chưa nói thành lời và biết cách đặt mọi thứ vào thế cân bằng. Bạn mạnh ở sự kiên nhẫn, tinh tế và khả năng làm cầu nối giữa những người rất khác nhau.',
    strengths: [
      'Lắng nghe sâu, thấu cảm nhanh',
      'Khéo hòa giải, tạo không khí dễ chịu',
      'Kiên nhẫn và đáng tin trong hợp tác lâu dài',
      'Chú ý chi tiết, cảm nhận được điều tinh tế',
    ],
    challenges: [
      'Dễ lo lắng và quá để tâm đến lời nói của người khác',
      'Ngại xung đột nên hay nuốt lời vào trong',
      'Do dự khi phải tự quyết',
      'Dễ đặt nhu cầu của mình xuống cuối danh sách',
    ],
    career:
      'Hợp tư vấn, giáo dục, chăm sóc sức khỏe, nhân sự, ngoại giao, thiết kế, nghệ thuật và mọi công việc cần làm việc nhóm. Bạn tỏa sáng ở vai trò “người đứng sau” giúp cả đội vận hành trơn tru.',
    love:
      'Tình yêu với bạn là sự đồng hành và thấu hiểu. Bạn chung thủy, biết quan tâm, nhưng cần được đáp lại bằng sự dịu dàng; đừng im lặng chịu đựng – hãy nói điều bạn cần.',
    family:
      'Bạn thường là người giữ không khí êm ấm cho cả nhà. Hãy cho phép mình được nghỉ ngơi, vì gia đình hạnh phúc không đòi hỏi bạn phải gánh mọi cảm xúc.',
    money:
      'Tiền ổn định hơn khi làm trong tập thể hoặc cùng đối tác đáng tin. Bạn dễ chi cho người khác nhiều hơn cho mình; nên đặt sẵn một khoản tiết kiệm cố định hằng tháng.',
    health:
      'Hệ tiêu hóa và thần kinh phản ứng rất rõ với căng thẳng cảm xúc. Thiền, hít thở, đi bộ nhẹ và giấc ngủ đều đặn là liều thuốc tốt nhất.',
    shadow:
      'Khi mất cân bằng, sự nhạy cảm thành tổn thương dễ dàng, sự hòa nhã thành lệ thuộc và bạn đánh mất tiếng nói riêng.',
    growth:
      'Mỗi ngày hãy nói “không” một lần với điều không phù hợp và “có” một lần với điều bạn thật sự muốn. Sự dịu dàng của bạn mạnh nhất khi đi cùng ranh giới rõ ràng.',
    mantra: 'Tôi quý trọng người khác và cũng quý trọng chính mình.',
  },
  3: {
    title: 'Người Truyền Cảm Hứng',
    keywords: ['Sáng tạo', 'Biểu đạt', 'Lạc quan', 'Giao tiếp'],
    essence:
      'Số 3 là năng lượng của niềm vui sáng tạo: bạn có tài biến ý tưởng thành lời, hình ảnh, âm thanh và biến không khí xung quanh thành nơi dễ thở hơn. Bạn mang đến sự nhẹ nhàng, hài hước và khả năng nhìn thấy mặt sáng của mọi việc.',
    strengths: [
      'Diễn đạt cuốn hút, dễ tạo thiện cảm',
      'Trí tưởng tượng và óc sáng tạo phong phú',
      'Lạc quan, giúp người khác lấy lại tinh thần',
      'Thích nghi nhanh, học cái mới dễ dàng',
    ],
    challenges: [
      'Phân tán năng lượng vào quá nhiều việc dở dang',
      'Dễ nói nhiều hơn làm khi thiếu kỷ luật',
      'Nhạy với lời chê dù bề ngoài vui vẻ',
      'Chi tiêu theo cảm hứng, khó giữ tiền',
    ],
    career:
      'Hợp truyền thông, nội dung, nghệ thuật, giảng dạy, bán hàng, MC, marketing, sáng tạo và các nghề cần kết nối con người. Hãy chọn nghề cho bạn được “nói” – bằng lời, hình hoặc ý tưởng.',
    love:
      'Bạn yêu bằng sự vui vẻ và lãng mạn, cần bạn đời biết cười cùng mình. Điều giúp mối quan hệ bền là dám nói về cảm xúc thật, kể cả những điều không vui.',
    family:
      'Bạn là người thổi sinh khí cho các buổi sum họp. Hãy dành thời gian cho những cuộc trò chuyện sâu, không chỉ là những câu chuyện vui.',
    money:
      'Thu nhập có thể đến từ nhiều nguồn sáng tạo, nhưng dễ “vào nhanh – ra nhanh”. Chia tiền thành các hũ cố định (chi tiêu – tiết kiệm – đầu tư) sẽ giúp bạn giữ được thành quả.',
    health:
      'Chú ý cổ họng, hô hấp và sự hưng phấn kéo dài gây mất ngủ. Hoạt động nghệ thuật, nhảy múa, hát hoặc viết lách giúp giải tỏa năng lượng.',
    shadow:
      'Khi mất cân bằng, sự duyên dáng thành hời hợt, niềm vui thành lảng tránh vấn đề và những lời hứa không được thực hiện.',
    growth:
      'Chọn một dự án quan trọng nhất và đi đến cùng trước khi bắt đầu dự án mới. Tài năng của bạn lớn nhất khi có kỷ luật đi kèm cảm hứng.',
    mantra: 'Tôi biểu đạt chân thật và biến cảm hứng thành thành quả.',
  },
  4: {
    title: 'Người Xây Nền',
    keywords: ['Kỷ luật', 'Thực tế', 'Bền bỉ', 'Đáng tin'],
    essence:
      'Số 4 là năng lượng của nền móng vững chắc: bạn xây từng viên gạch một cách kiên nhẫn và có hệ thống. Bạn là người mà gia đình và đồng nghiệp tin cậy giao việc quan trọng vì bạn nói được làm được.',
    strengths: [
      'Tổ chức, lập kế hoạch và quản lý chi tiết rất tốt',
      'Kiên trì, đáng tin, có trách nhiệm',
      'Tư duy thực tế, ít bị cuốn theo lời hứa suông',
      'Làm việc có hệ thống, tạo nên thành quả bền',
    ],
    challenges: [
      'Cứng nhắc, khó thích nghi khi kế hoạch thay đổi',
      'Quá khắt khe với bản thân và người khác',
      'Lo xa, dễ bị ám ảnh bởi sự an toàn',
      'Khó thư giãn, dễ biến mình thành “cỗ máy” làm việc',
    ],
    career:
      'Hợp kế toán, tài chính, kỹ thuật, xây dựng, bất động sản, vận hành, quản trị, pháp lý, nông nghiệp và mọi lĩnh vực cần quy trình rõ ràng. Bạn thành công nhờ sự tích lũy bền bỉ hơn là bước nhảy vọt.',
    love:
      'Bạn thể hiện tình yêu qua hành động: lo toan, bảo vệ, xây dựng tổ ấm. Hãy tập nói lời yêu thương và dành những khoảnh khắc không kế hoạch cho nhau.',
    family:
      'Bạn là chỗ dựa thực tế của gia đình. Đừng quên rằng người thân đôi khi chỉ cần sự có mặt, không cần giải pháp.',
    money:
      'Bạn có năng khiếu tiết kiệm và tích lũy dài hạn. Hợp với tài sản hữu hình, quỹ dự phòng, đầu tư đều đặn; tránh những khoản “làm giàu nhanh”.',
    health:
      'Cột sống, xương khớp và cơ bắp dễ căng cứng vì ngồi lâu và lo nghĩ. Vận động đều đặn, giãn cơ và dành thời gian vui chơi thật sự.',
    shadow:
      'Khi mất cân bằng, sự ngăn nắp thành kiểm soát, sự thận trọng thành bi quan và bạn bỏ lỡ cơ hội vì sợ rủi ro.',
    growth:
      'Mỗi tuần hãy làm một việc không nằm trong kế hoạch, chỉ vì vui. Sự linh hoạt không làm bạn mất đi nền tảng – nó giúp nền tảng ấy lớn lên.',
    mantra: 'Tôi xây từng bước vững vàng và vẫn để cuộc sống có chỗ cho niềm vui.',
  },
  5: {
    title: 'Người Tự Do',
    keywords: ['Linh hoạt', 'Khám phá', 'Thay đổi', 'Phiêu lưu'],
    essence:
      'Số 5 là năng lượng của tự do và trải nghiệm: bạn cần chuyển động, cần cái mới và học nhanh qua những lần dấn thân. Bạn thích nghi tốt với biến động và là người đưa những luồng gió mới vào bất cứ nơi nào bạn đến.',
    strengths: [
      'Linh hoạt, thích nghi nhanh với hoàn cảnh mới',
      'Tò mò, học hỏi và ứng biến giỏi',
      'Giao tiếp, thuyết phục và kết nối rộng',
      'Dám thử, không sợ thay đổi',
    ],
    challenges: [
      'Dễ chán, khó kiên định với một việc dài hạn',
      'Bốc đồng trong quyết định và chi tiêu',
      'Sợ bị ràng buộc nên ngại cam kết',
      'Tìm kích thích mới để né tránh vấn đề bên trong',
    ],
    career:
      'Hợp kinh doanh, bán hàng, truyền thông, du lịch, công nghệ, tư vấn, nghề tự do và mọi công việc có sự thay đổi. Môi trường lặp lại đơn điệu sẽ nhanh chóng làm bạn mất hứng.',
    love:
      'Bạn cần một người đồng hành cho bạn cảm giác tự do nhưng vẫn gắn kết. Cam kết sẽ nhẹ nhàng hơn khi hai bên cùng tạo ra những trải nghiệm mới thay vì giữ nhau bằng những quy tắc.',
    family:
      'Bạn mang năng lượng mới cho gia đình qua những chuyến đi và hoạt động chung. Hãy giữ lời hứa nhỏ – đó là cách người thân cảm thấy yên tâm khi bạn luôn chuyển động.',
    money:
      'Thu nhập thường biến động, có thể tăng mạnh khi bạn đúng thời điểm. Hãy có quỹ dự phòng đủ 6 tháng và quy tắc đợi 48 giờ trước các quyết định chi lớn.',
    health:
      'Hệ thần kinh dễ quá tải; chú ý giấc ngủ, dạ dày và thói quen kích thích (cà phê, đồ ngọt, màn hình). Vận động ngoài trời và đa dạng giúp cân bằng.',
    shadow:
      'Khi mất cân bằng, tự do thành trốn chạy, linh hoạt thành thiếu kiên định và bạn để lại nhiều dang dở phía sau.',
    growth:
      'Đặt cho mình một “mỏ neo”: một thói quen hằng ngày và một cam kết dài hạn. Tự do thật sự là lựa chọn có ý thức, không phải việc tránh mọi ràng buộc.',
    mantra: 'Tôi tự do vì tôi chọn cam kết có ý thức.',
  },
  6: {
    title: 'Người Nuôi Dưỡng',
    keywords: ['Yêu thương', 'Trách nhiệm', 'Hài hòa', 'Phụng sự'],
    essence:
      'Số 6 là năng lượng của tình yêu có trách nhiệm: bạn quan tâm đến gia đình, cộng đồng và biết biến không gian xung quanh thành nơi ấm áp, đẹp đẽ. Bạn thường là người mà mọi người tìm đến khi cần lời khuyên hoặc một bờ vai.',
    strengths: [
      'Quan tâm chu đáo, biết chăm sóc người khác',
      'Có óc thẩm mỹ, tạo ra sự hài hòa',
      'Công bằng, trung thực và có trách nhiệm',
      'Biết lắng nghe, được tin cậy làm người cố vấn',
    ],
    challenges: [
      'Ôm đồm trách nhiệm của người khác',
      'Cầu toàn và dễ phán xét khi thấy sai lệch',
      'Dễ kiệt sức vì cho đi mà quên nhận lại',
      'Can thiệp quá sâu vào cuộc sống của người thân',
    ],
    career:
      'Hợp giáo dục, y tế, tư vấn, chăm sóc khách hàng, nhân sự, thiết kế nội thất, ẩm thực, nghệ thuật, tổ chức phi lợi nhuận và các công việc phục vụ cộng đồng.',
    love:
      'Bạn là người bạn đời hết lòng, mong mỏi xây tổ ấm bền vững. Hãy để người kia được chia sẻ trách nhiệm, và cho phép bản thân cũng được chăm sóc.',
    family:
      'Gia đình là trung tâm của đời bạn. Hạnh phúc của cả nhà sẽ bền hơn khi bạn nói rõ kỳ vọng thay vì kỳ vọng ngầm.',
    money:
      'Bạn kiếm tiền tốt từ nghề liên quan đến chăm sóc, giáo dục, sắc đẹp, nhà cửa. Cẩn thận chi tiêu quá mức cho gia đình và người khác – hãy đặt ngân sách cho cả bản thân.',
    health:
      'Chú ý tim, ngực, hệ nội tiết và áp lực từ việc “gánh” cảm xúc người khác. Dành thời gian riêng, chăm sóc bản thân như chăm sóc người thân.',
    shadow:
      'Khi mất cân bằng, sự quan tâm thành kiểm soát, sự hy sinh thành oán trách thầm lặng.',
    growth:
      'Học cách giúp mà không gánh thay. Trao cho người thân quyền tự chịu trách nhiệm là biểu hiện cao nhất của tình yêu.',
    mantra: 'Tôi yêu thương trọn vẹn và vẫn giữ trọn mình.',
  },
  7: {
    title: 'Người Tìm Chân Lý',
    keywords: ['Phân tích', 'Nội tâm', 'Trí tuệ', 'Tâm linh'],
    essence:
      'Số 7 là năng lượng của người đi tìm câu trả lời sâu xa: bạn muốn hiểu bản chất của sự việc, thích nghiên cứu, suy ngẫm và cần những khoảng yên tĩnh. Bạn có trực giác nhạy bén và đôi khi như “nhìn thấy” điều ẩn sau bề mặt.',
    strengths: [
      'Tư duy phân tích sâu, nhìn ra bản chất vấn đề',
      'Trực giác nhạy và khả năng tập trung cao',
      'Ham học hỏi, chuyên sâu trong lĩnh vực mình chọn',
      'Điềm tĩnh, có chiều sâu nội tâm',
    ],
    challenges: [
      'Khép kín, khó chia sẻ cảm xúc',
      'Hoài nghi quá mức, khó tin tưởng',
      'Cầu toàn trong suy nghĩ nên chậm hành động',
      'Dễ cô lập mình khi bị tổn thương',
    ],
    career:
      'Hợp nghiên cứu, khoa học, công nghệ, phân tích dữ liệu, tâm lý, triết học, chữa lành, viết lách, tài chính chuyên sâu. Bạn thành công khi trở thành chuyên gia thay vì làm việc đại trà.',
    love:
      'Bạn cần sự gần gũi về tinh thần trước khi mở lòng. Người đồng hành lý tưởng biết tôn trọng thời gian một mình của bạn; điều cần học là chia sẻ cảm xúc dù chưa hoàn hảo.',
    family:
      'Bạn thể hiện sự quan tâm bằng sự có mặt tĩnh lặng và lời khuyên chắc chắn. Hãy để người thân biết bạn đang nghĩ gì để họ không hiểu lầm sự im lặng.',
    money:
      'Bạn kiếm tiền từ chuyên môn sâu và tri thức. Thận trọng nên bạn ít liều lĩnh, nhưng đôi khi bỏ lỡ cơ hội vì phân tích quá lâu – hãy đặt thời hạn ra quyết định.',
    health:
      'Chú ý giấc ngủ, hệ thần kinh và tình trạng suy nghĩ quá nhiều. Thiên nhiên, thiền, yoga và khoảng yên tĩnh hằng ngày rất cần thiết.',
    shadow:
      'Khi mất cân bằng, sự sâu sắc thành xa cách, sự thận trọng thành nghi ngờ mọi người.',
    growth:
      'Mỗi ngày hãy chia sẻ với một người tin cậy một điều bạn đang nghĩ hoặc cảm nhận. Trí tuệ của bạn sẽ có ích hơn khi được đem ra phục vụ người khác.',
    mantra: 'Tôi tin vào trực giác của mình và mở lòng với những người đáng tin.',
  },
  8: {
    title: 'Người Kiến Tạo Thành Tựu',
    keywords: ['Quyền lực', 'Tham vọng', 'Tài lộc', 'Tổ chức'],
    essence:
      'Số 8 là năng lượng của thành tựu và sự cân bằng giữa vật chất với tinh thần: bạn có tầm nhìn lớn, khả năng tổ chức nguồn lực và sức chịu đựng để theo đuổi mục tiêu dài hạn. Bạn muốn tạo ra giá trị thật sự và được ghi nhận xứng đáng.',
    strengths: [
      'Tầm nhìn chiến lược và khả năng điều phối nguồn lực',
      'Sức bền và kỷ luật để theo đuổi mục tiêu lớn',
      'Nhạy bén về tài chính, kinh doanh',
      'Dám nhận trách nhiệm lớn và ra quyết định khó',
    ],
    challenges: [
      'Làm việc quá sức, cân bằng cuộc sống kém',
      'Đo giá trị bản thân bằng thành tích và tiền bạc',
      'Dễ áp đặt, thiếu mềm mỏng khi quyền lực tăng',
      'Khó thể hiện sự mong manh với người thân',
    ],
    career:
      'Hợp quản trị, kinh doanh, tài chính, bất động sản, đầu tư, luật, điều hành tổ chức lớn. Bạn thành công khi dẫn dắt hệ thống; thu nhập thường tăng theo trách nhiệm.',
    love:
      'Bạn cần người đồng hành mạnh mẽ nhưng biết nhắc bạn nghỉ ngơi. Tình yêu bền khi bạn dành thời gian chất lượng thay vì chỉ cung cấp vật chất.',
    family:
      'Bạn thường gánh vai trò nuôi sống và bảo vệ gia đình. Hãy cho người thân thấy sự dịu dàng song song với sự vững chãi.',
    money:
      'Số 8 gắn với chu kỳ lên xuống của tiền bạc: có thể rất giàu, cũng có thể thăng trầm. Hãy xây hệ thống quản lý tài chính, đa dạng nguồn thu và giữ nguyên tắc minh bạch.',
    health:
      'Căng thẳng công việc ảnh hưởng đến tim mạch, dạ dày, huyết áp. Lịch nghỉ cố định và thể thao đều đặn là khoản đầu tư sinh lợi nhất.',
    shadow:
      'Khi mất cân bằng, tham vọng thành kiểm soát, quyền lực thành lấn át và bạn đánh đổi các mối quan hệ lấy thành tích.',
    growth:
      'Đo thành công bằng cả bốn trục: tài chính, sức khỏe, các mối quan hệ và ý nghĩa. Sự giàu có bền nhất là khi nó lan tỏa tới nhiều người.',
    mantra: 'Tôi tạo ra thịnh vượng và sử dụng nó để phụng sự.',
  },
  9: {
    title: 'Người Nhân Văn',
    keywords: ['Bao dung', 'Lý tưởng', 'Cống hiến', 'Hoàn tất'],
    essence:
      'Số 9 là năng lượng của lòng bao dung và tầm nhìn rộng: bạn nghĩ cho cộng đồng, muốn làm điều ý nghĩa và có khả năng buông bỏ để bắt đầu chặng mới. Bạn được người khác cảm nhận như một người có chiều sâu, rộng lượng và giàu lý tưởng.',
    strengths: [
      'Lòng trắc ẩn và tầm nhìn nhân văn',
      'Sáng tạo, truyền cảm hứng bằng lý tưởng sống',
      'Hào phóng, dễ chia sẻ nguồn lực',
      'Hiểu bức tranh lớn, biết buông để tiến lên',
    ],
    challenges: [
      'Lý tưởng hóa nên dễ thất vọng',
      'Khó từ chối, dễ bị lợi dụng lòng tốt',
      'Níu giữ quá khứ hoặc những mối quan hệ đã hết',
      'Đôi khi thiếu thực tế trong kế hoạch',
    ],
    career:
      'Hợp giáo dục, y tế, nghệ thuật, truyền thông, tổ chức xã hội, tư vấn, coaching, lãnh đạo có sứ mệnh. Bạn có động lực nhất khi công việc có ý nghĩa vượt ra ngoài thu nhập.',
    love:
      'Bạn yêu rộng lượng và sâu sắc nhưng dễ đặt lý tưởng lên người mình yêu. Hãy chấp nhận sự không hoàn hảo của đối phương và của chính mình.',
    family:
      'Bạn là người bao dung trong gia đình, thường hòa giải các mâu thuẫn. Hãy học cách nhận lại sự quan tâm thay vì chỉ cho đi.',
    money:
      'Bạn dễ cho đi nhiều hơn nhận. Hãy xây hệ thống tài chính để lòng hào phóng có nền tảng bền vững; thu nhập ổn khi gắn với giá trị bạn cống hiến.',
    health:
      'Chú ý hệ miễn dịch, hô hấp và các tổn thương cảm xúc chưa lành. Việc buông bỏ có chủ ý, viết nhật ký và thiên nhiên giúp bạn hồi phục.',
    shadow:
      'Khi mất cân bằng, lòng tốt thành hy sinh vô điều kiện, lý tưởng thành chỉ trích và bạn khó buông các chuyện đã qua.',
    growth:
      'Tập kết thúc những điều đã hết ý nghĩa: một mối quan hệ, một thói quen, một niềm tin cũ. Khoảng trống bạn tạo ra là nơi điều mới bắt đầu.',
    mantra: 'Tôi buông điều đã xong để đón điều mới đang đến.',
  },
  11: {
    title: 'Người Soi Sáng (Số Bậc Thầy 11)',
    keywords: ['Trực giác', 'Truyền cảm hứng', 'Nhạy cảm', 'Tầm nhìn'],
    essence:
      'Số 11 là số bậc thầy của trực giác và cảm hứng: bạn mang năng lượng của số 2 (nhạy cảm, kết nối) ở mức cao hơn, thường cảm nhận điều người khác chưa thấy và có sức truyền cảm hứng tự nhiên. Con đường này đòi hỏi bạn học cách giữ vững bản thân trong khi nhận nhiều tín hiệu từ xung quanh.',
    strengths: [
      'Trực giác mạnh và khả năng nhìn ra tiềm năng của người khác',
      'Truyền cảm hứng bằng sự hiện diện và câu chuyện',
      'Tầm nhìn sáng tạo, vượt khỏi lối mòn',
      'Nhạy bén về cảm xúc và năng lượng',
    ],
    challenges: [
      'Căng thẳng thần kinh, dễ lo âu',
      'Nhạy cảm quá mức, dễ hấp thụ cảm xúc người khác',
      'Kỳ vọng cao ở bản thân và dễ tự phê bình',
      'Dao động giữa tự tin và nghi ngờ',
    ],
    career:
      'Hợp coaching, tư vấn, sáng tạo nghệ thuật, truyền thông, chữa lành, giảng dạy và các vai trò truyền cảm hứng. Bạn cần công việc có ý nghĩa tinh thần và không gian để sáng tạo.',
    love:
      'Bạn cần mối quan hệ có chiều sâu và sự thấu hiểu. Hãy tránh lý tưởng hóa đối phương và học cách đặt ranh giới năng lượng.',
    family:
      'Bạn nhạy với bầu không khí trong gia đình. Dành thời gian riêng để “làm sạch” năng lượng giúp bạn hiện diện trọn vẹn hơn với người thân.',
    money:
      'Thu nhập đến khi bạn làm đúng sứ mệnh. Có thể không ổn định lúc đầu; nên có nguồn thu thực tế song song với dự án truyền cảm hứng.',
    health:
      'Hệ thần kinh là điểm cần chăm sóc: ngủ đủ, hạn chế kích thích, thiền, tiếp xúc thiên nhiên. Hãy ghi lại cảm xúc để không tích tụ.',
    shadow:
      'Khi quá tải, bạn chuyển sang lo âu, né tránh hoặc dùng số 2 – phụ thuộc vào người khác.',
    growth:
      'Xây thói quen hằng ngày giữ bạn ở “mặt đất”: vận động, ăn uống đều, những việc thực tế nhỏ. Tầm nhìn cao chỉ trở thành hiện thực khi có nền thực hành vững.',
    mantra: 'Tôi tin ánh sáng của mình và đứng vững trên mặt đất.',
  },
  22: {
    title: 'Người Kiến Tạo Vĩ Đại (Số Bậc Thầy 22)',
    keywords: ['Tầm nhìn lớn', 'Thực thi', 'Hệ thống', 'Di sản'],
    essence:
      'Số 22 là số bậc thầy của người biến giấc mơ lớn thành công trình thật: bạn kết hợp trực giác của số 11 với sự thực tế của số 4. Bạn có khả năng nhìn bức tranh lớn và đủ kỷ luật để xây từng phần cho đến khi nó thành hình.',
    strengths: [
      'Tầm nhìn lớn kèm khả năng triển khai cụ thể',
      'Tổ chức hệ thống và con người xuất sắc',
      'Bền bỉ trước áp lực dài hạn',
      'Có khả năng tạo ra di sản cho nhiều người',
    ],
    challenges: [
      'Áp lực vô hình từ kỳ vọng của chính mình',
      'Dễ hạ xuống năng lượng số 4 – lo toan, cứng nhắc',
      'Cầu toàn khiến chậm bắt đầu',
      'Khó chia sẻ gánh nặng với người khác',
    ],
    career:
      'Hợp kiến trúc, kinh doanh quy mô, quản trị tổ chức, phát triển cộng đồng, giáo dục, công nghệ, dự án xã hội. Bạn cần dự án đủ lớn để đáng công sức.',
    love:
      'Bạn cần người đồng hành tin vào tầm nhìn của bạn và nhắc bạn nghỉ ngơi. Hãy dành chỗ cho sự giản dị bên cạnh những mục tiêu lớn.',
    family:
      'Gia đình là nền móng cho những gì bạn xây. Hãy chia sẻ tầm nhìn với người thân để họ đồng hành, không đứng ngoài.',
    money:
      'Tiềm năng thu nhập lớn khi bạn dẫn dắt hệ thống. Cần quản trị rủi ro bài bản, tách bạch tài chính cá nhân và dự án.',
    health:
      'Căng thẳng tích lũy lâu dài. Lịch nghỉ, vận động, ăn uống đều và tiếp xúc thiên nhiên là phần không thể bỏ.',
    shadow:
      'Khi quá tải, bạn rơi vào cầu toàn, kiểm soát và cảm giác mình phải gánh cả thế giới.',
    growth:
      'Chia nhỏ tầm nhìn thành các cột mốc 90 ngày và ăn mừng từng cột mốc. Công trình vĩ đại được xây bằng những ngày làm việc bình thường.',
    mantra: 'Tôi biến tầm nhìn thành hiện thực, từng bước một.',
  },
  33: {
    title: 'Người Thầy Của Yêu Thương (Số Bậc Thầy 33)',
    keywords: ['Chữa lành', 'Phụng sự', 'Yêu thương vô điều kiện', 'Hướng dẫn'],
    essence:
      'Số 33 là số bậc thầy hiếm nhất, kết hợp sự nuôi dưỡng của số 6 với tầm nhìn của số 11 và 22: bạn được sinh ra để nâng đỡ, dạy dỗ và chữa lành. Đây là con đường của sự phụng sự bằng tình thương, đòi hỏi bạn phải học cách yêu thương mình đầu tiên.',
    strengths: [
      'Lòng từ bi sâu sắc và khả năng chữa lành người khác',
      'Truyền cảm hứng bằng tấm gương sống',
      'Biết cách giảng dạy và dẫn dắt bằng sự dịu dàng',
      'Hy sinh vì mục đích lớn',
    ],
    challenges: [
      'Dễ kiệt sức vì gánh nỗi đau của người khác',
      'Đặt nhu cầu bản thân xuống cuối cùng',
      'Kỳ vọng mình phải hoàn hảo trong vai trò người cho',
      'Khó đặt ranh giới với người cần giúp đỡ',
    ],
    career:
      'Hợp giáo dục, chữa lành, tư vấn tâm lý, y tế, công tác xã hội, nghệ thuật có sứ mệnh, lãnh đạo cộng đồng. Bạn có động lực khi công việc nâng đỡ nhiều người.',
    love:
      'Bạn yêu rất sâu và dễ hy sinh quá mức. Hãy tìm người biết chăm sóc lại bạn và tôn trọng ranh giới của bạn.',
    family:
      'Bạn là trái tim của gia đình. Hãy nhớ rằng bạn cũng cần được chăm sóc, và việc nhờ giúp đỡ không làm bạn kém đi.',
    money:
      'Tiền đến tự nhiên khi bạn phục vụ đúng cách, nhưng bạn dễ cho đi quá mức. Cần cơ chế tài chính rõ ràng để lòng tốt bền vững.',
    health:
      'Chú ý tim, hệ miễn dịch và kiệt sức cảm xúc. Thời gian một mình, thiên nhiên và sự thực hành tự chăm sóc là bắt buộc.',
    shadow:
      'Khi mất cân bằng, bạn trở thành người hy sinh âm thầm rồi oán trách hoặc kiệt quệ.',
    growth:
      'Áp dụng quy tắc “mặt nạ dưỡng khí”: chăm sóc mình trước để chăm sóc người khác bền lâu. Dạy bằng gương sống sẽ có sức mạnh hơn dạy bằng hy sinh.',
    mantra: 'Tôi chữa lành người khác bằng cách trước hết chữa lành chính mình.',
  },
};
