// Kho nội dung: các chỉ số thần số học từ tên, ngày sinh, đỉnh cao, thử thách, nghiệp quả.

type NumMap = Record<number, string>;

// ---- Số Sứ mệnh / Biểu đạt (từ toàn bộ chữ cái trong tên) ----
export const EXPRESSION: NumMap = {
  1: 'Cái tên bạn mang năng lượng của người dẫn đầu: bạn thể hiện mình tốt nhất qua sự chủ động, sáng kiến và tinh thần tiên phong. Người khác nhìn bạn như một người có chính kiến và dám bắt đầu.',
  2: 'Cái tên bạn mang năng lượng của sự kết nối: tài năng của bạn thể hiện qua việc lắng nghe, hợp tác và làm cho mọi thứ vận hành hài hòa. Bạn mạnh nhất khi làm việc cùng người khác.',
  3: 'Cái tên bạn mang năng lượng sáng tạo và biểu đạt: bạn có tài ăn nói, viết lách, nghệ thuật hoặc khả năng làm cho người khác thấy vui. Hãy dùng giọng nói và ý tưởng của mình như một món quà.',
  4: 'Cái tên bạn mang năng lượng của sự bền vững: tài năng của bạn là xây dựng hệ thống, tổ chức và biến kế hoạch thành thực tế. Bạn được tin cậy vì làm đến nơi đến chốn.',
  5: 'Cái tên bạn mang năng lượng của sự linh hoạt và truyền thông: bạn giỏi thích nghi, thuyết phục và đưa ý tưởng mới ra thế giới. Môi trường đa dạng giúp bạn phát huy.',
  6: 'Cái tên bạn mang năng lượng của sự chăm sóc: tài năng của bạn là làm cho người khác cảm thấy được yêu thương, được an toàn và được hỗ trợ. Bạn hợp với những công việc nuôi dưỡng con người.',
  7: 'Cái tên bạn mang năng lượng của trí tuệ và chiều sâu: bạn thể hiện mình qua phân tích, nghiên cứu và sự chuyên môn hóa. Bạn là người mà người khác tìm đến để hỏi những câu hỏi khó.',
  8: 'Cái tên bạn mang năng lượng của thành tựu: bạn có khả năng tổ chức, quản trị và biến mục tiêu lớn thành kết quả cụ thể. Bạn thể hiện mình tốt nhất ở những vị trí có quyền quyết định.',
  9: 'Cái tên bạn mang năng lượng của sự bao dung: bạn thể hiện mình qua việc phụng sự, chia sẻ và truyền cảm hứng nhân văn. Công việc có ý nghĩa xã hội sẽ khiến bạn phát huy tối đa.',
  11: 'Cái tên bạn mang năng lượng bậc thầy của trực giác: bạn có thể truyền cảm hứng và soi sáng cho người khác nếu giữ được sự cân bằng cho chính mình.',
  22: 'Cái tên bạn mang năng lượng bậc thầy của người kiến tạo: bạn có khả năng biến tầm nhìn lớn thành công trình cụ thể, ảnh hưởng đến nhiều người.',
  33: 'Cái tên bạn mang năng lượng bậc thầy của người thầy chữa lành: bạn được kêu gọi nâng đỡ, giảng dạy và phụng sự bằng tình thương.',
};

// ---- Số Linh hồn / Nội tâm (từ nguyên âm trong tên) ----
export const SOUL_URGE: NumMap = {
  1: 'Sâu bên trong, bạn khao khát sự tự chủ và được là chính mình. Bạn cảm thấy thỏa mãn khi tự mình tạo ra điều gì đó và không bị ai áp đặt.',
  2: 'Sâu bên trong, bạn khao khát sự hòa hợp và những mối quan hệ chân thành. Bình yên đến với bạn khi được yêu thương và được cùng ai đó đi chung một hướng.',
  3: 'Sâu bên trong, bạn khao khát được sáng tạo, vui vẻ và được thể hiện bản thân. Bạn nuôi dưỡng tâm hồn bằng nghệ thuật, tiếng cười và những cuộc trò chuyện.',
  4: 'Sâu bên trong, bạn khao khát sự an toàn, ổn định và trật tự. Bạn yên lòng khi mọi thứ có nền móng rõ ràng và bạn biết mình đang đứng ở đâu.',
  5: 'Sâu bên trong, bạn khao khát tự do, trải nghiệm và sự đổi mới. Bạn nạp năng lượng bằng những chuyến đi, người mới và điều chưa biết.',
  6: 'Sâu bên trong, bạn khao khát yêu thương và được cần đến. Hạnh phúc của bạn gắn với gia đình, tổ ấm và việc chăm sóc người mình thương.',
  7: 'Sâu bên trong, bạn khao khát hiểu sự thật và có không gian riêng để suy ngẫm. Bạn nạp năng lượng bằng sự yên tĩnh, thiên nhiên và kiến thức sâu.',
  8: 'Sâu bên trong, bạn khao khát thành tựu, sự công nhận và khả năng tạo ảnh hưởng. Bạn cần cảm giác mình đang xây nên điều có giá trị thật.',
  9: 'Sâu bên trong, bạn khao khát sống có ý nghĩa và đóng góp cho điều lớn hơn bản thân. Bạn bình an khi được cho đi mà không cần đáp lại.',
  11: 'Sâu bên trong, bạn khao khát tìm kiếm sự thức tỉnh tinh thần và truyền cảm hứng cho người khác bằng trực giác của mình.',
  22: 'Sâu bên trong, bạn khao khát xây dựng điều lớn lao, có ích và để lại di sản bền vững.',
  33: 'Sâu bên trong, bạn khao khát chữa lành và nâng đỡ người khác bằng tình thương không điều kiện.',
};

// ---- Số Nhân cách (từ phụ âm: cách người khác cảm nhận bạn) ----
export const PERSONALITY: NumMap = {
  1: 'Người khác thấy bạn là người tự tin, quyết đoán và có chủ kiến; đôi khi họ ngại tiếp cận vì bạn trông rất độc lập.',
  2: 'Người khác thấy bạn là người dịu dàng, dễ gần và biết lắng nghe; họ thoải mái chia sẻ với bạn.',
  3: 'Người khác thấy bạn là người duyên dáng, vui vẻ và biểu cảm; bạn dễ trở thành tâm điểm của không khí nhóm.',
  4: 'Người khác thấy bạn là người nghiêm túc, đáng tin và thực tế; họ yên tâm giao việc cho bạn.',
  5: 'Người khác thấy bạn là người năng động, cuốn hút và thích khám phá; bạn mang lại cảm giác mới mẻ.',
  6: 'Người khác thấy bạn là người ấm áp, quan tâm và có trách nhiệm; họ cảm thấy được che chở cạnh bạn.',
  7: 'Người khác thấy bạn là người điềm tĩnh, bí ẩn và sâu sắc; họ đoán bạn đang suy nghĩ nhiều điều.',
  8: 'Người khác thấy bạn là người mạnh mẽ, có uy và thành đạt; bạn tạo ấn tượng của một người có thể dẫn dắt.',
  9: 'Người khác thấy bạn là người rộng lượng, giàu cảm xúc và có tầm nhìn; họ dễ cảm mến bạn.',
  11: 'Người khác cảm nhận bạn như người có sức hút đặc biệt, nhạy cảm và truyền cảm hứng.',
  22: 'Người khác cảm nhận bạn như người có tầm vóc, đáng nể và có khả năng làm việc lớn.',
  33: 'Người khác cảm nhận bạn như người dịu dàng, bao dung và nâng đỡ.',
};

// ---- Số Ngày sinh (tài năng bẩm sinh theo ngày bạn chào đời) ----
export const BIRTH_DAY: NumMap = {
  1: 'Tài năng bẩm sinh: khởi xướng và tự lập.',
  2: 'Tài năng bẩm sinh: nhạy cảm, hợp tác và giữ hòa khí.',
  3: 'Tài năng bẩm sinh: biểu đạt, sáng tạo và truyền niềm vui.',
  4: 'Tài năng bẩm sinh: tổ chức, kiên trì và làm việc có hệ thống.',
  5: 'Tài năng bẩm sinh: linh hoạt, thích nghi và giao tiếp.',
  6: 'Tài năng bẩm sinh: chăm sóc, trách nhiệm và tạo ra sự hài hòa.',
  7: 'Tài năng bẩm sinh: phân tích, trực giác và chiều sâu nội tâm.',
  8: 'Tài năng bẩm sinh: quản trị, tầm nhìn và khả năng tạo thành tựu.',
  9: 'Tài năng bẩm sinh: bao dung, cảm hứng và tầm nhìn nhân văn.',
  10: 'Ngày sinh số 10: bạn mang năng lượng khởi đầu mạnh của số 1 trong chu kỳ mới; tự chủ nhưng cần học cách hợp tác.',
  11: 'Ngày sinh số 11: số bậc thầy – trực giác nhạy bén, khả năng truyền cảm hứng và cần sống cân bằng thần kinh.',
  12: 'Ngày sinh số 12: kết hợp sáng tạo (3) với khởi xướng (1) – bạn biết đưa ý tưởng ra thế giới một cách duyên dáng.',
  13: 'Ngày sinh số 13: gốc rễ của kỷ luật (4) – làm việc chăm chỉ là chìa khóa; hãy chuyển sự lười biếng thành thói quen đều đặn.',
  14: 'Ngày sinh số 14: tự do và thay đổi (5) cùng sự thực tế (1) – bạn học cách cân bằng khám phá với trách nhiệm.',
  15: 'Ngày sinh số 15: yêu thương, duyên dáng (6) – tài năng nghệ thuật và khả năng thu hút; hãy cẩn thận với việc quá hy sinh.',
  16: 'Ngày sinh số 16: chiều sâu trí tuệ (7) – cái tôi bị thử thách để đi vào khiêm nhường và tâm linh.',
  17: 'Ngày sinh số 17: tầm nhìn (8) kết hợp trí tuệ; bạn có thể thành công qua kiến thức chuyên sâu và sự cô đọng.',
  18: 'Ngày sinh số 18: sức mạnh vật chất và tinh thần; bài học là dùng quyền lực với lòng nhân.',
  19: 'Ngày sinh số 19: độc lập và tự lực mạnh; bài học là biết nhờ cậy và cho phép người khác giúp đỡ.',
  20: 'Ngày sinh số 20: nhạy cảm, trực giác tinh tế; sức mạnh đến từ hợp tác và sự kiên nhẫn.',
  21: 'Ngày sinh số 21: sáng tạo, thu hút xã hội; tài năng lớn khi bạn tự tin thể hiện.',
  22: 'Ngày sinh số 22: số bậc thầy – tầm nhìn lớn kèm khả năng thực hiện; áp lực cao nhưng tiềm năng rất lớn.',
  23: 'Ngày sinh số 23: nhanh nhạy, giao tiếp, thích ứng; may mắn khi bạn hành động có mục đích.',
  24: 'Ngày sinh số 24: gia đình và trách nhiệm (6) với sự nhạy cảm (2); bạn là người dựa vững chắc cho người thân.',
  25: 'Ngày sinh số 25: phân tích (7) với nhạy cảm (2); bạn học qua trải nghiệm và rèn kiên nhẫn.',
  26: 'Ngày sinh số 26: tổ chức, quản trị (8) với trách nhiệm (6); lưu ý cân bằng giữa tiền bạc và các mối quan hệ.',
  27: 'Ngày sinh số 27: trí tuệ (7) và tầm nhìn nhân văn (9); bạn có chiều sâu và khả năng sáng tạo độc đáo.',
  28: 'Ngày sinh số 28: tự chủ (1) cùng quyền lực (8); bạn học cách hợp tác để thành công bền vững.',
  29: 'Ngày sinh số 29: số 11 ẩn bên trong – trực giác mạnh, tình cảm sâu sắc, dễ tổn thương.',
  30: 'Ngày sinh số 30: sáng tạo (3) và khả năng biểu đạt nổi bật; năng lượng thích hợp cho nghệ thuật và truyền thông.',
  31: 'Ngày sinh số 31: sáng tạo (3) cùng nền tảng (4); bạn biến ý tưởng thành sản phẩm thực.',
};

// ---- Số Thái độ (ngày + tháng): cách bạn phản ứng với cuộc sống ----
export const ATTITUDE: NumMap = {
  1: 'Phản ứng đầu tiên của bạn thường là hành động: tự mình giải quyết, tự chịu trách nhiệm và đi thẳng vào vấn đề.',
  2: 'Phản ứng đầu tiên của bạn thường là quan sát và cảm nhận: bạn muốn hiểu mọi người trước khi hành động.',
  3: 'Phản ứng đầu tiên của bạn thường là biểu đạt: bạn nói ra, chia sẻ và tìm cách nhìn vấn đề tích cực.',
  4: 'Phản ứng đầu tiên của bạn thường là sắp xếp: bạn lập kế hoạch, tìm cách thực tế và ổn định tình hình.',
  5: 'Phản ứng đầu tiên của bạn thường là thích nghi: bạn thử cách mới, thay đổi hướng và tìm sự linh hoạt.',
  6: 'Phản ứng đầu tiên của bạn thường là quan tâm: bạn nghĩ cho người xung quanh và tìm giải pháp hài hòa.',
  7: 'Phản ứng đầu tiên của bạn thường là rút lại suy nghĩ: bạn phân tích, tìm hiểu rồi mới quyết định.',
  8: 'Phản ứng đầu tiên của bạn thường là nắm quyền chủ động: bạn đánh giá tình hình và ra quyết định mạnh mẽ.',
  9: 'Phản ứng đầu tiên của bạn thường là bao dung: bạn nhìn bức tranh lớn và sẵn sàng thông cảm.',
  11: 'Phản ứng đầu tiên của bạn thường dựa vào trực giác: bạn cảm nhận trước khi lý giải.',
  22: 'Phản ứng đầu tiên của bạn thường là tìm cách xây giải pháp lâu dài, ở quy mô lớn.',
  33: 'Phản ứng đầu tiên của bạn thường là che chở và nâng đỡ người khác trước khi nghĩ đến mình.',
};

// ---- Số Trưởng thành (Số chủ đạo + Số sứ mệnh): hình ảnh bạn hướng tới ở nửa sau cuộc đời ----
export const MATURITY: NumMap = {
  1: 'Từ khoảng 35–40 tuổi, bạn dần tìm thấy sức mạnh của sự tự chủ và dám dẫn dắt theo cách của mình.',
  2: 'Từ khoảng 35–40 tuổi, bạn ngày càng coi trọng hợp tác, sự hòa hợp và các mối quan hệ chất lượng.',
  3: 'Từ khoảng 35–40 tuổi, khả năng biểu đạt và sáng tạo của bạn nở rộ, bạn có xu hướng sống nhẹ nhàng và vui vẻ hơn.',
  4: 'Từ khoảng 35–40 tuổi, bạn tìm thấy sự bình yên trong nền tảng vững chắc, nề nếp và những thành quả tích lũy.',
  5: 'Từ khoảng 35–40 tuổi, bạn khao khát tự do hơn, dám thay đổi và khám phá những hướng đi mới.',
  6: 'Từ khoảng 35–40 tuổi, gia đình, cộng đồng và trách nhiệm yêu thương trở thành trọng tâm của cuộc đời.',
  7: 'Từ khoảng 35–40 tuổi, bạn hướng vào chiều sâu: học hỏi, suy ngẫm và tìm ý nghĩa tinh thần.',
  8: 'Từ khoảng 35–40 tuổi, bạn có xu hướng đạt thành tựu và sự độc lập tài chính, nếu giữ được sự cân bằng.',
  9: 'Từ khoảng 35–40 tuổi, bạn hướng đến việc cống hiến, chia sẻ và để lại giá trị cho người khác.',
  11: 'Từ khoảng 35–40 tuổi, trực giác và khả năng truyền cảm hứng của bạn trở nên rõ rệt.',
  22: 'Từ khoảng 35–40 tuổi, bạn có cơ hội xây dựng công trình lớn mang tính di sản.',
  33: 'Từ khoảng 35–40 tuổi, vai trò người nâng đỡ và dẫn dắt bằng tình thương ngày càng rõ.',
};

// ---- Đỉnh cao (Pinnacle): chủ đề của từng giai đoạn ----
export const PINNACLE: NumMap = {
  1: 'Giai đoạn của sự tự lập: học cách đứng trên đôi chân mình, khởi xướng và dám chịu trách nhiệm cho quyết định của bản thân.',
  2: 'Giai đoạn của hợp tác: các mối quan hệ, sự kiên nhẫn và làm việc nhóm là chìa khóa; hãy học cách lắng nghe và chờ đúng thời điểm.',
  3: 'Giai đoạn của sáng tạo: biểu đạt bản thân, mở rộng giao tiếp và vui sống; cơ hội đến qua sự kết nối và ý tưởng.',
  4: 'Giai đoạn xây nền: làm việc chăm chỉ, tổ chức tài chính, sức khỏe và gia đình; thành quả đến từ sự kiên định.',
  5: 'Giai đoạn thay đổi: nhiều dịch chuyển về nơi ở, công việc, mối quan hệ; linh hoạt và học nhanh giúp bạn đón cơ hội.',
  6: 'Giai đoạn của gia đình và trách nhiệm: tình yêu, nhà cửa, việc chăm sóc người thân và cộng đồng nổi bật.',
  7: 'Giai đoạn của nội tâm: học sâu, nghiên cứu, chuyên môn hóa; thời gian cho riêng mình giúp bạn sáng rõ.',
  8: 'Giai đoạn thành tựu: sự nghiệp, tài chính và quyền lực nổi bật; hãy cân bằng giữa tham vọng và các mối quan hệ.',
  9: 'Giai đoạn hoàn tất và cống hiến: buông điều cũ, mở lòng, phục vụ điều lớn hơn; thích hợp cho làm thiện nguyện và chia sẻ.',
  11: 'Giai đoạn thức tỉnh: trực giác nhạy bén, cơ hội truyền cảm hứng; cần chăm sóc hệ thần kinh.',
  22: 'Giai đoạn kiến tạo: cơ hội xây dựng điều lớn có giá trị lâu dài; cần kỷ luật và sự cân bằng.',
  33: 'Giai đoạn phụng sự: nâng đỡ, chữa lành, dạy dỗ; cần chăm sóc bản thân song song.',
};

// ---- Thử thách (0–8): bài học cần vượt qua ----
export const CHALLENGE: NumMap = {
  0: 'Thử thách 0: bạn được tự do lựa chọn con đường; bài học là tin vào bản thân và không dựa vào khuôn mẫu có sẵn.',
  1: 'Thử thách 1: học sự tự tin và độc lập – tránh vừa phụ thuộc người khác vừa áp đặt người khác.',
  2: 'Thử thách 2: học sự nhạy cảm cân bằng – đừng để lời nói của người khác làm bạn mất phương hướng.',
  3: 'Thử thách 3: học sự biểu đạt chân thành – vượt qua nỗi sợ bị chê và sự phân tán.',
  4: 'Thử thách 4: học sự kỷ luật và kiên nhẫn – làm việc đều đặn thay vì chờ cảm hứng.',
  5: 'Thử thách 5: học sự tự do có trách nhiệm – tiết chế bốc đồng và cám dỗ.',
  6: 'Thử thách 6: học cách yêu thương không kiểm soát – ranh giới lành mạnh trong gia đình.',
  7: 'Thử thách 7: học sự tin tưởng – mở lòng thay vì khép kín và hoài nghi.',
  8: 'Thử thách 8: học cách dùng quyền lực và tiền bạc có đạo đức – không để vật chất định nghĩa giá trị.',
};

// ---- Nợ nghiệp (Karmic Debt) ----
export const KARMIC_DEBT_TEXT: NumMap = {
  13: 'Nợ nghiệp 13/4: trong quá khứ (theo cách nhìn của thần số học), sự lười biếng hoặc né tránh công việc để lại bài học; kỷ luật, siêng năng và hoàn thành việc đã bắt đầu là cách bạn chuyển hóa. Gợi ý: chia nhỏ mục tiêu và duy trì thói quen mỗi ngày.',
  14: 'Nợ nghiệp 14/5: sự thiếu tiết chế với tự do, thói quen hoặc cám dỗ để lại bài học; bạn chuyển hóa bằng sự điều độ và cam kết. Gợi ý: đặt giới hạn rõ ràng và theo đuổi các trải nghiệm lành mạnh.',
  16: 'Nợ nghiệp 16/7: cái tôi và sự kiêu hãnh cần được học khiêm nhường; cuộc đời có thể “phá bỏ” những gì dựng trên nền cái tôi để bạn xây lại trên nền chân thật. Gợi ý: thực hành biết ơn và sống khiêm nhường.',
  19: 'Nợ nghiệp 19/1: sự lạm dụng quyền lực hoặc ích kỷ để lại bài học; bạn chuyển hóa bằng cách học nhận sự giúp đỡ, biết cho đi và hợp tác. Gợi ý: nhờ cậy đúng lúc và chia sẻ thành quả với người cùng làm.',
};

// ---- Bài học nghiệp (số vắng mặt trong tên) ----
export const KARMIC_LESSON: NumMap = {
  1: 'Thiếu số 1 trong tên: bạn cần rèn sự tự tin, chủ động quyết định và dám tự đứng ra làm.',
  2: 'Thiếu số 2 trong tên: bạn cần rèn sự kiên nhẫn, hợp tác và quan tâm đến cảm xúc người khác.',
  3: 'Thiếu số 3 trong tên: bạn cần rèn khả năng biểu đạt, tự tin nói ra ý tưởng và cảm xúc.',
  4: 'Thiếu số 4 trong tên: bạn cần rèn tính kỷ luật, tổ chức và hoàn thành việc theo kế hoạch.',
  5: 'Thiếu số 5 trong tên: bạn cần rèn sự linh hoạt, dám thay đổi và thử cái mới.',
  6: 'Thiếu số 6 trong tên: bạn cần rèn trách nhiệm với gia đình, sự cam kết và quan tâm người thân.',
  7: 'Thiếu số 7 trong tên: bạn cần rèn sự phân tích, thời gian cho nội tâm và niềm tin vào trực giác.',
  8: 'Thiếu số 8 trong tên: bạn cần rèn tư duy tài chính, tổ chức nguồn lực và quản lý tiền bạc.',
  9: 'Thiếu số 9 trong tên: bạn cần rèn lòng bao dung, cho đi và nhìn bức tranh rộng hơn.',
};

// ---- Giai đoạn trong chu kỳ 9 năm cá nhân ----
export const PERSONAL_YEAR: Record<
  number,
  { title: string; theme: string; focus: string[]; avoid: string[]; love: string; money: string; career: string }
> = {
  1: {
    title: 'Năm Khởi Đầu',
    theme: 'Hạt giống mới được gieo: đây là thời điểm bắt đầu chu kỳ 9 năm mới, năng lượng tự chủ và quyết đoán tăng cao.',
    focus: ['Đặt mục tiêu lớn cho 9 năm tới', 'Bắt đầu dự án hoặc thói quen mới', 'Dám tự quyết thay vì chờ người khác'],
    avoid: ['Trì hoãn vì sợ sai', 'Phụ thuộc quá nhiều vào ý kiến người khác', 'Bốc đồng bỏ qua rủi ro'],
    love: 'Thời điểm tốt để bắt đầu mối quan hệ mới hoặc làm mới mối quan hệ hiện tại bằng cách nói rõ mong muốn.',
    money: 'Tạo nguồn thu mới; chọn một hướng và cam kết thay vì phân tán.',
    career: 'Đề xuất sáng kiến, nhận vai trò dẫn dắt hoặc khởi nghiệp.',
  },
  2: {
    title: 'Năm Hợp Tác',
    theme: 'Nhịp chậm lại để kết nối: quan hệ, đối tác và sự kiên nhẫn là chủ đề chính.',
    focus: ['Xây dựng quan hệ, đối tác đáng tin', 'Lắng nghe và hợp tác', 'Chăm sóc sức khỏe tinh thần'],
    avoid: ['Ép kết quả quá nhanh', 'Giữ trong lòng thay vì nói ra', 'Quyết định khi quá nhạy cảm'],
    love: 'Mối quan hệ sâu sắc hơn nếu bạn lắng nghe và chia sẻ cảm xúc chân thành.',
    money: 'Tiền đến qua hợp tác; ưu tiên tích lũy ổn định hơn mạo hiểm.',
    career: 'Làm việc nhóm, kết nối và củng cố mạng lưới.',
  },
  3: {
    title: 'Năm Sáng Tạo',
    theme: 'Năng lượng biểu đạt và niềm vui: ý tưởng, giao tiếp và các mối quan hệ xã hội nở rộ.',
    focus: ['Sáng tạo và chia sẻ ý tưởng', 'Mở rộng giao tiếp và mạng lưới', 'Chăm chút niềm vui và sự hứng khởi'],
    avoid: ['Phân tán vào quá nhiều việc', 'Chi tiêu theo cảm hứng', 'Nói nhiều hơn làm'],
    love: 'Hẹn hò, gặp gỡ vui vẻ; hãy thành thật trong cảm xúc thay vì chỉ đùa.',
    money: 'Thu nhập từ sáng tạo, truyền thông; cần kiểm soát chi tiêu.',
    career: 'Truyền thông, trình bày, giới thiệu dự án, xây thương hiệu cá nhân.',
  },
  4: {
    title: 'Năm Xây Nền',
    theme: 'Năm làm việc chăm chỉ: tổ chức, kỷ luật và xây nền móng cho các năm sau.',
    focus: ['Lập kế hoạch dài hạn và theo dõi tiến độ', 'Tổ chức tài chính, sức khỏe, nhà cửa', 'Rèn kỷ luật hằng ngày'],
    avoid: ['Bỏ qua sức khỏe vì làm việc quá sức', 'Cứng nhắc khi cần thích nghi', 'Mong kết quả nhanh'],
    love: 'Mối quan hệ cần sự ổn định, cam kết thực tế và thời gian chất lượng.',
    money: 'Tích lũy, trả nợ, đầu tư dài hạn; tránh đầu cơ.',
    career: 'Hoàn thiện quy trình, học kỹ năng nền tảng, xây hệ thống.',
  },
  5: {
    title: 'Năm Thay Đổi',
    theme: 'Chuyển động và tự do: nhiều cơ hội mới, biến động, du lịch và những ngã rẽ bất ngờ.',
    focus: ['Đón cơ hội và thử điều mới', 'Linh hoạt thích nghi', 'Mở rộng quan hệ và trải nghiệm'],
    avoid: ['Quyết định bốc đồng', 'Buông bỏ cam kết quan trọng', 'Chạy theo kích thích'],
    love: 'Mối quan hệ cần tự do và tươi mới; nói rõ nhu cầu về không gian cá nhân.',
    money: 'Thu nhập biến động; hãy giữ quỹ dự phòng.',
    career: 'Thay đổi vị trí, thử lĩnh vực mới, bán hàng, truyền thông.',
  },
  6: {
    title: 'Năm Gia Đình & Trách Nhiệm',
    theme: 'Năm của tình yêu, nhà cửa và trách nhiệm: gia đình, các mối quan hệ gần gũi và cộng đồng.',
    focus: ['Dành thời gian cho gia đình', 'Chăm sóc nhà cửa và các mối quan hệ', 'Cân bằng cho đi và nhận lại'],
    avoid: ['Ôm đồm vấn đề của người khác', 'Cầu toàn quá mức', 'Quên chăm sóc bản thân'],
    love: 'Phù hợp để cam kết, kết hôn hoặc làm sâu sắc mối quan hệ.',
    money: 'Chi cho gia đình và nhà cửa tăng; lập ngân sách rõ ràng.',
    career: 'Dịch vụ, chăm sóc, giáo dục, những vai trò cần trách nhiệm.',
  },
  7: {
    title: 'Năm Nội Tâm',
    theme: 'Năm chậm lại để học sâu và nhìn lại: nghiên cứu, suy ngẫm, và củng cố đời sống tinh thần.',
    focus: ['Học chuyên sâu một lĩnh vực', 'Dành thời gian một mình mỗi ngày', 'Chăm sóc sức khỏe và giấc ngủ'],
    avoid: ['Ép bản thân hành động quá nhiều', 'Cô lập hoàn toàn', 'Quyết định lớn khi chưa đủ thông tin'],
    love: 'Cần không gian riêng, nhưng hãy chia sẻ suy nghĩ để người thân không hiểu lầm.',
    money: 'Không phải năm đẩy mạnh đầu tư lớn; ưu tiên học và phân tích.',
    career: 'Nghiên cứu, hoàn thiện chuyên môn, viết lách.',
  },
  8: {
    title: 'Năm Thành Tựu',
    theme: 'Năm của quyền lực, tiền bạc và kết quả: những gì bạn đã gieo trong các năm trước bắt đầu cho trái.',
    focus: ['Đặt mục tiêu tài chính cụ thể', 'Dẫn dắt và ra quyết định lớn', 'Quản lý thời gian và năng lượng'],
    avoid: ['Làm việc quá sức', 'Áp đặt quyền lực', 'Bỏ bê gia đình và sức khỏe'],
    love: 'Giữ cân bằng giữa công việc và mối quan hệ; dành thời gian có chất lượng.',
    money: 'Tăng thu nhập, đàm phán, đầu tư có kế hoạch; cẩn trọng pháp lý.',
    career: 'Thăng tiến, mở rộng quy mô, nhận trách nhiệm lớn.',
  },
  9: {
    title: 'Năm Hoàn Tất',
    theme: 'Năm kết thúc chu kỳ: buông bỏ điều đã hết ý nghĩa và chuẩn bị cho khởi đầu mới.',
    focus: ['Hoàn thành những dự án dang dở', 'Dọn dẹp quan hệ, thói quen, đồ đạc', 'Tha thứ và cho đi'],
    avoid: ['Bắt đầu dự án lớn vào cuối năm', 'Níu kéo điều đã hết', 'Tự phê bình quá mức'],
    love: 'Kết thúc những mối quan hệ không còn phù hợp; chữa lành để đón điều mới.',
    money: 'Dọn dẹp tài chính, thanh toán nợ, hạn chế khoản đầu tư lớn.',
    career: 'Hoàn tất công việc, bàn giao, học điều mới để chuẩn bị chu kỳ tiếp theo.',
  },
};

// ---- Tháng cá nhân ----
export const PERSONAL_MONTH: NumMap = {
  1: 'Tháng cá nhân 1: tháng để khởi xướng – hãy bắt đầu điều bạn đã trì hoãn.',
  2: 'Tháng cá nhân 2: tháng để kết nối – lắng nghe, hợp tác và chăm sóc các mối quan hệ.',
  3: 'Tháng cá nhân 3: tháng để sáng tạo và giao tiếp – chia sẻ ý tưởng, gặp gỡ và vui chơi.',
  4: 'Tháng cá nhân 4: tháng để tổ chức – dọn dẹp, lập kế hoạch và làm việc có hệ thống.',
  5: 'Tháng cá nhân 5: tháng để thay đổi – thử điều mới, đi đâu đó và linh hoạt.',
  6: 'Tháng cá nhân 6: tháng cho gia đình – quan tâm người thân và nhà cửa.',
  7: 'Tháng cá nhân 7: tháng cho nội tâm – nghỉ ngơi, học, suy ngẫm.',
  8: 'Tháng cá nhân 8: tháng cho kết quả – tập trung tài chính, công việc và quyết định lớn.',
  9: 'Tháng cá nhân 9: tháng hoàn tất – kết thúc, buông, tha thứ và cho đi.',
};
