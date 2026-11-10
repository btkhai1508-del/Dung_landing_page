// Kho nội dung: Thiên can, Địa chi (12 con giáp), Ngũ hành, 30 Nạp âm.
// Phân loại nạp âm theo "Tử Vi Hàm Số" (Nguyễn Phát Lộc); diễn giải viết lại bằng lời văn riêng.

export const CAN_INFO: { duongAm: string; hanh: string; image: string; text: string }[] = [
  { duongAm: 'Dương', hanh: 'Mộc', image: 'Cây đại thụ', text: 'Giáp mang khí chất của cây lớn: ngay thẳng, có chí hướng, thích dẫn dắt và che chở. Bạn bền chí nhưng đôi khi cứng, khó cúi đầu.' },
  { duongAm: 'Âm', hanh: 'Mộc', image: 'Hoa cỏ mềm mại', text: 'Ất mang khí chất của dây leo, hoa cỏ: mềm mại, khéo thích nghi, nhẹ nhàng nhưng dẻo dai. Bạn biết “uốn mình” để vượt qua nghịch cảnh.' },
  { duongAm: 'Dương', hanh: 'Hỏa', image: 'Mặt trời', text: 'Bính mang khí chất của mặt trời: nhiệt huyết, rộng rãi, thích tỏa sáng và giúp đỡ. Bạn dễ nóng, cần học kiên nhẫn.' },
  { duongAm: 'Âm', hanh: 'Hỏa', image: 'Ngọn đèn', text: 'Đinh mang khí chất ngọn đèn: ấm áp, tinh tế, giàu cảm xúc và có chiều sâu. Bạn tỏa sáng rõ nhất ở nơi có sự tin cậy.' },
  { duongAm: 'Dương', hanh: 'Thổ', image: 'Ngọn núi', text: 'Mậu mang khí chất ngọn núi: vững chãi, đáng tin, trầm ổn và nhiều trách nhiệm. Bạn là điểm tựa cho người khác nhưng chậm thay đổi.' },
  { duongAm: 'Âm', hanh: 'Thổ', image: 'Đất ruộng', text: 'Kỷ mang khí chất đất ruộng: kín đáo, nuôi dưỡng, khéo vun vén và tỉ mỉ. Bạn âm thầm làm nhiều hơn nói.' },
  { duongAm: 'Dương', hanh: 'Kim', image: 'Thanh kiếm', text: 'Canh mang khí chất thanh kiếm: quyết đoán, thẳng thắn, thích công bằng. Bạn dứt khoát nhưng đôi khi sắc quá làm người khác e ngại.' },
  { duongAm: 'Âm', hanh: 'Kim', image: 'Châu báu', text: 'Tân mang khí chất châu báu: tinh tế, có gu thẩm mỹ, trọng danh dự và sạch sẽ. Bạn nhạy cảm với lời nói và cần được tôn trọng.' },
  { duongAm: 'Dương', hanh: 'Thủy', image: 'Sông biển', text: 'Nhâm mang khí chất sông biển: rộng lớn, năng động, trí tuệ linh hoạt và hay thay đổi. Bạn có tầm nhìn xa, cần một “bờ” là mục tiêu rõ ràng.' },
  { duongAm: 'Âm', hanh: 'Thủy', image: 'Sương mưa', text: 'Quý mang khí chất sương mưa: dịu dàng, trực giác tốt, kín đáo và giàu trí tưởng tượng. Bạn thấm vào mọi nơi một cách lặng lẽ.' },
];

export interface ChiInfo {
  animal: string;
  hours: string;
  hanh: string;
  personality: string;
  career: string;
  love: string;
  caution: string;
  lucky: string;
}

export const CHI_INFO: ChiInfo[] = [
  { animal: 'Chuột', hours: '23h–1h', hanh: 'Thủy', personality: 'Thông minh, nhanh nhạy, khéo xoay xở và biết nắm bắt cơ hội. Bạn có sức hút xã hội và nhạy cảm với thông tin.', career: 'Kinh doanh, thương mại, truyền thông, tài chính, môi giới, nghiên cứu.', love: 'Chung thủy nhưng hay lo lắng; cần cảm giác an toàn trong tình cảm.', caution: 'Hay lo xa, tính toán quá kỹ và dễ nóng nảy khi áp lực.', lucky: 'Xanh dương, đen, trắng; số 2, 3; hướng Bắc.' },
  { animal: 'Trâu', hours: '1h–3h', hanh: 'Thổ', personality: 'Kiên nhẫn, chăm chỉ, đáng tin và làm việc đến nơi đến chốn. Bạn ít nói nhưng đáng tin cậy.', career: 'Nông nghiệp, xây dựng, kỹ thuật, bất động sản, tài chính, quản trị vận hành.', love: 'Yêu chậm, sâu và bền; thể hiện bằng hành động hơn lời nói.', caution: 'Cứng đầu, khó thay đổi, hay giữ trong lòng.', lucky: 'Vàng, nâu, xanh lá; số 1, 4; hướng Đông Bắc.' },
  { animal: 'Hổ', hours: '3h–5h', hanh: 'Mộc', personality: 'Dũng cảm, tự tin, có khí chất lãnh đạo và thích thử thách. Bạn truyền năng lượng mạnh cho người xung quanh.', career: 'Lãnh đạo, quân sự, thể thao, kinh doanh, luật, truyền thông.', love: 'Nhiệt tình, hào phóng; cần người đủ tự tin đứng cạnh.', caution: 'Nóng nảy, ham thắng, đôi khi liều lĩnh.', lucky: 'Xanh lá, xanh dương, đen; số 1, 3, 4; hướng Đông.' },
  { animal: 'Mèo', hours: '5h–7h', hanh: 'Mộc', personality: 'Dịu dàng, tinh tế, khéo ngoại giao và yêu sự hài hòa. Bạn nhạy cảm với cái đẹp và biết tránh xung đột.', career: 'Nghệ thuật, thiết kế, giáo dục, ngoại giao, dịch vụ, chăm sóc sức khỏe.', love: 'Lãng mạn, tinh tế, cần sự dịu dàng và an toàn.', caution: 'Hay do dự, ngại đối đầu và dễ lo lắng.', lucky: 'Xanh lá, hồng, tím; số 3, 4, 6; hướng Đông.' },
  { animal: 'Rồng', hours: '7h–9h', hanh: 'Thổ', personality: 'Tự tin, đầy năng lượng, có tham vọng và sức hút. Bạn thích làm điều lớn và có khả năng truyền cảm hứng.', career: 'Lãnh đạo, khởi nghiệp, truyền thông, nghệ thuật, kiến trúc, công nghệ.', love: 'Nồng nhiệt, thích được ngưỡng mộ; cần người tôn trọng cá tính.', caution: 'Cái tôi lớn, dễ kiêu và kỳ vọng cao.', lucky: 'Vàng, bạc, trắng; số 1, 6, 7; hướng Đông Nam.' },
  { animal: 'Rắn', hours: '9h–11h', hanh: 'Hỏa', personality: 'Sâu sắc, thông minh, trực giác tốt và kín đáo. Bạn quan sát kỹ và quyết định có chiều sâu.', career: 'Nghiên cứu, tài chính, tâm lý, y học, triết học, chuyên gia tư vấn.', love: 'Say đắm nhưng kín đáo; cần sự tin tưởng tuyệt đối.', caution: 'Đa nghi, hay giữ bí mật, dễ ghen.', lucky: 'Đỏ, vàng, đen; số 2, 8, 9; hướng Nam.' },
  { animal: 'Ngựa', hours: '11h–13h', hanh: 'Hỏa', personality: 'Năng động, nhiệt tình, yêu tự do và giao tiếp giỏi. Bạn giàu năng lượng và thích những trải nghiệm mới.', career: 'Truyền thông, bán hàng, du lịch, nghệ thuật, thể thao, kinh doanh.', love: 'Nồng nhiệt, thẳng thắn; cần tự do và sự đồng điệu.', caution: 'Thiếu kiên nhẫn, hay thay đổi và bốc đồng.', lucky: 'Đỏ, cam, xanh lá; số 2, 3, 7; hướng Nam.' },
  { animal: 'Dê', hours: '13h–15h', hanh: 'Thổ', personality: 'Dịu dàng, giàu cảm xúc, sáng tạo và có óc thẩm mỹ. Bạn quan tâm đến người khác và thích sự yên bình.', career: 'Nghệ thuật, giáo dục, chăm sóc, thiết kế, ẩm thực, dịch vụ.', love: 'Chân thành, chăm sóc nhưng nhạy cảm; cần được trân trọng.', caution: 'Dễ bi quan, phụ thuộc và thiếu quyết đoán.', lucky: 'Xanh lá, đỏ, vàng; số 2, 7; hướng Tây Nam.' },
  { animal: 'Khỉ', hours: '15h–17h', hanh: 'Kim', personality: 'Thông minh, hoạt bát, hài hước và giải quyết vấn đề linh hoạt. Bạn học nhanh và thích những thử thách trí tuệ.', career: 'Công nghệ, giáo dục, giải trí, kinh doanh, tư vấn, nghiên cứu.', love: 'Vui vẻ, lém lỉnh; cần sự mới mẻ và sự tôn trọng trí tuệ.', caution: 'Hay nghịch, thiếu kiên nhẫn và dễ chủ quan.', lucky: 'Trắng, vàng, xanh dương; số 1, 7, 8; hướng Tây Nam.' },
  { animal: 'Gà', hours: '17h–19h', hanh: 'Kim', personality: 'Chăm chỉ, ngăn nắp, có óc quan sát và thẳng thắn. Bạn coi trọng nguyên tắc và hình ảnh cá nhân.', career: 'Quản lý, tài chính, truyền thông, thẩm mỹ, kế toán, giảng dạy.', love: 'Tận tâm, chu đáo; mong người đồng hành tinh tế và đúng giờ.', caution: 'Hay phê bình, cầu toàn và khắt khe.', lucky: 'Vàng, nâu, trắng; số 5, 7, 8; hướng Tây.' },
  { animal: 'Chó', hours: '19h–21h', hanh: 'Thổ', personality: 'Trung thành, trung thực, có tinh thần trách nhiệm và công bằng. Bạn là người bạn đáng tin cậy.', career: 'Pháp luật, an ninh, y tế, giáo dục, công tác xã hội, quản lý.', love: 'Chung thủy và bảo vệ; cần cảm giác an toàn và sự tin tưởng.', caution: 'Hay lo lắng, đa nghi và bi quan.', lucky: 'Đỏ, xanh lá, tím; số 3, 4, 9; hướng Tây Bắc.' },
  { animal: 'Heo', hours: '21h–23h', hanh: 'Thủy', personality: 'Chân thành, rộng lượng, lạc quan và thích tận hưởng cuộc sống. Bạn dễ tin người và có lòng tốt tự nhiên.', career: 'Ẩm thực, dịch vụ, nghệ thuật, chăm sóc, du lịch, tài chính.', love: 'Hào phóng, ấm áp; cần người trân trọng sự chân thành.', caution: 'Dễ tin người, dễ bị lợi dụng và tiêu pha thoải mái.', lucky: 'Vàng, xám, nâu, xanh dương; số 2, 5, 8; hướng Bắc.' },
];

export interface HanhInfo {
  image: string;
  trait: string;
  strengths: string;
  watch: string;
  careers: string;
  colorsOwn: string;
  colorsSupport: string;
  colorsAvoid: string;
  direction: string;
  numbers: string;
  organs: string;
  advice: string;
  sinh: string;
  khac: string;
}

export const HANH_INFO: Record<'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ', HanhInfo> = {
  Kim: {
    image: 'Kim loại – sự sắc bén, nguyên tắc và giá trị',
    trait: 'Người mệnh Kim thường quyết đoán, ngăn nắp, trọng nguyên tắc và có tiêu chuẩn cao. Bạn nhìn nhận rõ đúng sai, thích sự rõ ràng và làm việc có hệ thống.',
    strengths: 'Kỷ luật, công bằng, tinh tế, giỏi phân tích và dứt khoát.',
    watch: 'Dễ cứng nhắc, lạnh lùng, hay phê bình và khó buông bỏ.',
    careers: 'Tài chính, ngân hàng, kỹ thuật, luật, quản trị, cơ khí, trang sức, công nghệ, giáo dục.',
    colorsOwn: 'Trắng, xám, ghi, bạc, ánh kim',
    colorsSupport: 'Vàng, nâu, nâu đất (Thổ sinh Kim)',
    colorsAvoid: 'Đỏ, cam, hồng đậm, tím (Hỏa khắc Kim)',
    direction: 'Tây, Tây Bắc',
    numbers: '4, 9',
    organs: 'Phổi, đại tràng, da, hô hấp',
    advice: 'Học cách mềm dẻo và nói lời ghi nhận; đặt chỗ cho cảm xúc trong lịch làm việc. Tập hít thở sâu và giữ không khí nhà ở trong lành.',
    sinh: 'Kim sinh Thủy',
    khac: 'Kim khắc Mộc',
  },
  Mộc: {
    image: 'Cây cối – sự sinh trưởng, sáng tạo và nhân ái',
    trait: 'Người mệnh Mộc thường giàu sức sống, thích phát triển, sáng tạo và có lòng nhân hậu. Bạn luôn hướng đến sự học hỏi và mở rộng.',
    strengths: 'Phát triển bền bỉ, sáng tạo, nhân ái, linh hoạt và có tầm nhìn lớn.',
    watch: 'Dễ phân tán, nóng vội và hay lo lắng khi bị kìm hãm.',
    careers: 'Giáo dục, nghệ thuật, thiết kế, y tế, môi trường, thời trang, truyền thông, nông nghiệp, tư vấn.',
    colorsOwn: 'Xanh lá, xanh ngọc',
    colorsSupport: 'Đen, xanh dương (Thủy sinh Mộc)',
    colorsAvoid: 'Trắng, xám, ghi, ánh kim (Kim khắc Mộc)',
    direction: 'Đông, Đông Nam',
    numbers: '3, 8',
    organs: 'Gan, mật, gân cơ, mắt',
    advice: 'Dành thời gian ở nơi nhiều cây xanh, đi bộ buổi sáng và giữ lịch ngủ đều; chia nhỏ mục tiêu để tránh phân tán.',
    sinh: 'Mộc sinh Hỏa',
    khac: 'Mộc khắc Thổ',
  },
  Thủy: {
    image: 'Nước – sự linh hoạt, trí tuệ và chiều sâu',
    trait: 'Người mệnh Thủy thường thông minh, linh hoạt, nhạy cảm và giỏi thích nghi. Bạn có trực giác tốt và khả năng len vào những chỗ người khác khó đến.',
    strengths: 'Trí tuệ, ứng biến, giao tiếp khéo và tầm nhìn xa.',
    watch: 'Dễ thay đổi, thiếu ổn định và đôi khi lo lắng, đa nghi.',
    careers: 'Thương mại, logistics, truyền thông, nghiên cứu, tư vấn, du lịch, giáo dục, nghệ thuật, thủy hải sản.',
    colorsOwn: 'Đen, xanh dương, xanh navy',
    colorsSupport: 'Trắng, xám, ánh kim (Kim sinh Thủy)',
    colorsAvoid: 'Vàng, nâu đất (Thổ khắc Thủy)',
    direction: 'Bắc',
    numbers: '1, 6',
    organs: 'Thận, bàng quang, xương, tai',
    advice: 'Uống đủ nước, giữ ấm vùng lưng-thận và tập thói quen cố định để làm “bờ” cho dòng nước chảy ổn định.',
    sinh: 'Thủy sinh Mộc',
    khac: 'Thủy khắc Hỏa',
  },
  Hỏa: {
    image: 'Lửa – sự nhiệt huyết, truyền cảm hứng và ánh sáng',
    trait: 'Người mệnh Hỏa thường nhiệt tình, năng động, thẳng thắn và có sức truyền cảm hứng. Bạn thích tỏa sáng và hành động nhanh.',
    strengths: 'Nhiệt huyết, tự tin, quyết đoán, giao tiếp cuốn hút.',
    watch: 'Dễ nóng nảy, thiếu kiên nhẫn và làm việc nhiều rồi “cháy hết”.',
    careers: 'Truyền thông, marketing, nghệ thuật, giải trí, năng lượng, công nghệ, nhà hàng, bán hàng, huấn luyện.',
    colorsOwn: 'Đỏ, cam, hồng, tím',
    colorsSupport: 'Xanh lá (Mộc sinh Hỏa)',
    colorsAvoid: 'Đen, xanh dương đậm (Thủy khắc Hỏa)',
    direction: 'Nam',
    numbers: '2, 7',
    organs: 'Tim, ruột non, huyết áp, mắt',
    advice: 'Dành thời gian nghỉ ngơi “làm nguội”, thiền hoặc tắm nước mát; đặt giới hạn cho cảm xúc nóng trước khi phản ứng.',
    sinh: 'Hỏa sinh Thổ',
    khac: 'Hỏa khắc Kim',
  },
  Thổ: {
    image: 'Đất – sự vững vàng, nuôi dưỡng và bao dung',
    trait: 'Người mệnh Thổ thường trầm ổn, trung thực, đáng tin và có tinh thần trách nhiệm. Bạn là điểm tựa cho người khác và thích sự ổn định.',
    strengths: 'Kiên định, đáng tin, nuôi dưỡng, kiên nhẫn và thực tế.',
    watch: 'Dễ bảo thủ, chậm thay đổi, lo xa và hay ôm đồm.',
    careers: 'Bất động sản, xây dựng, nông nghiệp, tài chính, quản trị, giáo dục, y tế, dịch vụ khách hàng.',
    colorsOwn: 'Vàng, nâu, màu đất',
    colorsSupport: 'Đỏ, cam, hồng (Hỏa sinh Thổ)',
    colorsAvoid: 'Xanh lá cây (Mộc khắc Thổ)',
    direction: 'Trung tâm, Tây Nam, Đông Bắc',
    numbers: '5, 0, 2, 8',
    organs: 'Dạ dày, lá lách, tiêu hóa, cơ bắp',
    advice: 'Ăn uống đều giờ, hạn chế lo nghĩ khi ăn và thử một thói quen mới mỗi tháng để giữ sự linh hoạt.',
    sinh: 'Thổ sinh Kim',
    khac: 'Thổ khắc Thủy',
  },
};

// Quan hệ ngũ hành sinh khắc
export const HANH_ORDER = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ']; // vòng tương sinh
export const HANH_SINH: Record<string, string> = { Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim' };
export const HANH_KHAC: Record<string, string> = { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim' };

// 30 nạp âm: chỉ mục khớp NAP_AM trong tuviEngine
export const NAP_AM_TEXT: { image: string; text: string }[] = [
  { image: 'Vàng dưới đáy biển', text: 'Giá trị lớn nhưng ẩn sâu: bạn cần thời gian và đúng thời điểm để được nhìn thấy. Đừng vội phô trương – hãy trau dồi năng lực, cơ hội sẽ “trồi lên” khi bạn sẵn sàng.' },
  { image: 'Lửa trong lò', text: 'Nội lực bền và ấm: bạn có nhiệt huyết ổn định, càng được “rèn” càng tinh. Hợp với việc cần sự kiên trì và chuyên môn.' },
  { image: 'Cây trong rừng lớn', text: 'Bạn mang khí chất của cánh rừng: nhân ái, có tầm vóc và thích sống cùng cộng đồng. Phát huy khi làm việc nhóm và dẫn dắt người khác trưởng thành.' },
  { image: 'Đất ven đường', text: 'Bạn là mảnh đất bao dung, ai cũng có thể đi qua: tốt bụng, dễ hòa nhập nhưng đôi khi bị lợi dụng. Cần xác định ranh giới và mục tiêu riêng.' },
  { image: 'Vàng ở mũi kiếm', text: 'Sắc bén, quyết đoán và dám đối mặt. Bạn có sức mạnh bứt phá nhưng cần học cách mềm mỏng để không làm tổn thương người khác.' },
  { image: 'Lửa trên đỉnh núi', text: 'Ánh sáng rộng, tầm nhìn xa và thích làm điều lớn. Bạn dễ nổi bật; hãy giữ khiêm tốn để ngọn lửa không bị gió lớn thổi tắt.' },
  { image: 'Nước dưới khe suối', text: 'Bạn mềm mại, kiên nhẫn và bền bỉ chảy về phía trước. Thích nghi tốt, thành tựu đến từ tích lũy chứ không phải bùng nổ.' },
  { image: 'Đất trên mặt thành', text: 'Vững chắc, bảo vệ và có trách nhiệm. Bạn là người giữ ổn định cho người khác nhưng cần dám thay đổi khi cần.' },
  { image: 'Vàng trong sáp trắng', text: 'Giá trị tinh tế, cần được nâng niu. Bạn tinh tế, dễ nhạy cảm; trong môi trường phù hợp bạn phát sáng rõ rệt.' },
  { image: 'Gỗ cây dương liễu', text: 'Mềm mại, dẻo dai và biết uốn mình theo gió. Bạn thích nghi giỏi, tinh tế trong giao tiếp và có sức bền cảm xúc.' },
  { image: 'Nước giữa dòng suối', text: 'Trong trẻo, giàu năng lượng và luôn chuyển động. Bạn có trí tuệ linh hoạt, thích học hỏi và lan tỏa sự tươi mới.' },
  { image: 'Đất trên nóc nhà', text: 'Bạn là lớp che chắn cho gia đình và người thân. Bao bọc, có trách nhiệm; cần nhớ chăm sóc mình trước.' },
  { image: 'Lửa sấm sét', text: 'Mạnh mẽ, bùng nổ và có khả năng tạo thay đổi nhanh. Bạn truyền cảm hứng bằng năng lượng lớn; cần học cách điều tiết cảm xúc.' },
  { image: 'Gỗ tùng bách', text: 'Chịu được sương gió và giữ vững khí tiết. Bạn bền chí, ngay thẳng, càng khó khăn càng trưởng thành.' },
  { image: 'Nước chảy thành dòng dài', text: 'Bền bỉ, rộng lớn và có tầm nhìn lâu dài. Bạn kiên trì tích lũy, thành quả đến chậm nhưng bền.' },
  { image: 'Vàng trong cát', text: 'Giá trị ẩn trong sự bình dị. Bạn cần chịu khó “sàng lọc” và kiên trì mới lộ ra tài năng; càng trải nghiệm càng sáng.' },
  { image: 'Lửa dưới chân núi', text: 'Ấm áp, khiêm tốn và làm điều âm thầm. Bạn có nguồn năng lượng ổn định, được tin cậy trong tập thể.' },
  { image: 'Cây ở đồng bằng', text: 'Hòa đồng, dễ thích nghi, thân thiện với mọi người. Bạn mạnh khi có môi trường nuôi dưỡng và mục tiêu rõ ràng.' },
  { image: 'Đất trên vách', text: 'Bền bỉ, tỉ mỉ và hy sinh thầm lặng. Bạn giỏi xây dựng chi tiết và gìn giữ nền tảng.' },
  { image: 'Vàng pha lá bạc', text: 'Sáng đẹp, tinh tế và thu hút. Bạn có khiếu thẩm mỹ, cần giữ sự tự tin và không để vẻ ngoài che mất giá trị thực.' },
  { image: 'Lửa ngọn đèn', text: 'Ánh sáng ấm, nhẹ nhàng và soi đường cho người khác. Bạn giàu cảm xúc và sâu sắc; phát huy khi làm nghề giúp đỡ, giảng dạy.' },
  { image: 'Nước trên trời (mưa)', text: 'Bạn mang tính nuôi dưỡng và lan tỏa. Lý tưởng cao, nhân ái, mong muốn đem lại lợi ích cho nhiều người.' },
  { image: 'Đất vùng rộng lớn', text: 'Rộng rãi, bao dung và thích kết nối cộng đồng. Bạn là người cho đi dễ dàng; hãy biết giữ phần cho mình.' },
  { image: 'Vàng làm trang sức', text: 'Tinh xảo, quý phái và trọng hình thức. Bạn có gu thẩm mỹ, thích điều đẹp và biết cách chăm chút bản thân.' },
  { image: 'Gỗ cây dâu', text: 'Bạn là người nuôi dưỡng âm thầm, kiên nhẫn và tận tụy. Thành quả đến từ sự chăm chỉ và tấm lòng.' },
  { image: 'Nước khe lớn', text: 'Bạn mang sức mạnh của dòng chảy đều đặn: hiền hòa mà kiên định. Thích nghi tốt và có nội lực dồi dào.' },
  { image: 'Đất lẫn trong cát', text: 'Bạn giản dị, gần gũi và dễ hòa nhập. Cần xây dựng sự gắn kết, tránh phân tán năng lượng.' },
  { image: 'Lửa trên trời (mặt trời)', text: 'Ánh sáng rộng lớn, nhiệt huyết và có tầm nhìn. Bạn thích dẫn dắt, truyền cảm hứng và làm điều có ý nghĩa.' },
  { image: 'Gỗ cây thạch lựu', text: 'Rực rỡ, nhiều tiềm năng và ngọt ngào ở bên trong. Bạn có sức hút, thích làm đẹp cho cuộc sống.' },
  { image: 'Nước biển lớn', text: 'Bao la, bao dung và có chiều sâu. Bạn có tầm nhìn xa và nội lực lớn; cần giữ thế cân bằng để không bị cuốn theo cảm xúc.' },
];
