// Phân tích chuyên sâu cho 3 lĩnh vực trọng yếu của Bánh xe cuộc đời: Sức khỏe, Tài chính, Sự nghiệp.
// Hiện khi điểm dưới 6, hoặc khi đó là điểm thấp nhất trong 8 lĩnh vực (và không quá cao).
// Nội dung mang tính định hướng, không thay thế tư vấn y tế, tài chính hay pháp lý.

import type { AreaKey } from './lifeWheel';

export const SUPPORT_PHONE = '0903616569';
export const SUPPORT_EMAIL = 'chaukhai9905@gmail.com';
export const SUPPORT_ZALO_LINK = `https://zalo.me/${SUPPORT_PHONE}`;

export const FOCUS_KEYS: AreaKey[] = ['health', 'finance', 'career'];

export interface FocusInfo {
  why: string;
  signs: string[];
  causes: string[];
  ripples: string[];
  plan: { title: string; items: string[] }[];
  mistakes: string[];
  contactReason: string;
  caution: string;
}

export const FOCUS_INFO: Record<'health' | 'finance' | 'career', FocusInfo> = {
  health: {
    why:
      'Sức khỏe là điều kiện để mọi mục tiêu khác đi được xa: khi cơ thể thiếu năng lượng, bạn khó tập trung, dễ cáu gắt, và các quyết định về tiền bạc, công việc cũng kém sáng suốt hơn. Điểm sức khỏe thấp thường là dấu hiệu của một thói quen đã kéo dài chứ không phải một sự cố nhất thời, nên càng để lâu càng khó đảo ngược.',
    signs: [
      'Thức dậy vẫn thấy mệt, cần cà phê hoặc đồ ngọt mới tỉnh',
      'Ngủ muộn, ngủ chập chờn hoặc giật mình giữa đêm',
      'Hay đau mỏi vai gáy, đau đầu, đầy bụng mỗi khi căng thẳng',
      'Ít vận động, ăn uống thất thường hoặc ăn theo cảm xúc',
    ],
    causes: [
      'Giấc ngủ thiếu và không đều giờ',
      'Căng thẳng kéo dài mà chưa có cách xả lành mạnh',
      'Ít vận động, ăn uống thiếu điều độ',
      'Chưa khám sức khỏe định kỳ nên chưa biết rõ cơ thể đang ở đâu',
    ],
    ripples: [
      'Sự nghiệp: năng suất và hứng khởi giảm, dễ kiệt sức giữa chừng',
      'Tài chính: quyết định thiếu tỉnh táo và phát sinh chi phí chữa trị',
      'Gia đình: ít kiên nhẫn, ít thời gian chất lượng cho người thân',
      'Tinh thần: dễ lo âu, mất ngủ, vòng xoáy càng khó thoát',
    ],
    plan: [
      {
        title: '30 ngày đầu: ổn định nền',
        items: [
          'Đi ngủ và thức dậy cùng một giờ (chênh không quá 30 phút) trong 30 ngày liên tục.',
          'Đi bộ nhanh 20 phút mỗi ngày và uống đủ nước.',
          'Chọn một thói quen gây hại nhất (thức khuya, đồ uống ngọt, hút thuốc…) và cắt giảm trước.',
        ],
      },
      {
        title: '60 ngày: nâng sức bền',
        items: [
          'Tăng lên 3 buổi vận động mỗi tuần, mỗi buổi 30–45 phút.',
          'Lập thực đơn đơn giản cho cả tuần để bớt ăn theo cảm xúc.',
          'Nếu đã hơn 12 tháng chưa khám tổng quát, hãy đặt lịch khám.',
        ],
      },
      {
        title: '90 ngày: giữ nhịp và đo lại',
        items: [
          'Đo lại cân nặng, chất lượng giấc ngủ và năng lượng buổi sáng, so với ngày đầu.',
          'Rủ một người thân hoặc bạn bè cùng tập để giữ động lực lâu dài.',
          'Điều chỉnh kế hoạch theo kết quả thật thay vì theo cảm giác.',
        ],
      },
    ],
    mistakes: [
      'Dồn tập luyện thật nặng vài tuần rồi bỏ cuộc',
      'Chờ “khi nào rảnh” mới chăm sóc sức khỏe',
      'Bỏ qua tín hiệu nhỏ của cơ thể cho đến khi thành vấn đề lớn',
    ],
    contactReason:
      'Sức khỏe cần một kế hoạch phù hợp riêng với cơ thể, lịch sinh hoạt và bản mệnh của bạn. Có người đồng hành giúp bạn đi đúng hướng và không bỏ cuộc giữa chừng.',
    caution: 'Nội dung chỉ mang tính định hướng, không thay thế tư vấn y tế. Nếu có triệu chứng kéo dài, hãy đi khám bác sĩ.',
  },
  finance: {
    why:
      'Tài chính là cảm giác an toàn và quyền chủ động của bạn. Khi tiền bạc bất ổn, nỗi lo len vào giấc ngủ, các mối quan hệ và cả công việc. Điểm tài chính thấp thường đến từ ba chỗ: thu nhập chưa đủ, chi tiêu chưa được kiểm soát, hoặc chưa có hệ thống tích lũy. Cả ba đều có thể cải thiện từng bước nếu bắt đầu từ việc nhìn rõ dòng tiền của chính mình.',
    signs: [
      'Cuối tháng thường cạn tiền hoặc phải vay mượn tạm',
      'Không biết rõ mỗi tháng tiền đi đâu',
      'Chưa có khoản dự phòng đủ cho 3 tháng chi tiêu',
      'Lo lắng về tiền ảnh hưởng đến giấc ngủ và tâm trạng',
    ],
    causes: [
      'Thu nhập phụ thuộc vào một nguồn duy nhất',
      'Chi tiêu theo cảm xúc, thiếu ngân sách rõ ràng',
      'Nợ hoặc cam kết lớn chưa được sắp xếp thứ tự ưu tiên',
      'Thiếu kiến thức về quản lý tiền và đầu tư an toàn',
    ],
    ripples: [
      'Gia đình: căng thẳng, dễ cãi vã vì tiền',
      'Sức khỏe: lo lắng kéo dài làm ăn ngủ thất thường',
      'Tinh thần: cảm giác bất an thường trực',
      'Phát triển bản thân: thiếu nguồn lực để đầu tư học hỏi',
    ],
    plan: [
      {
        title: '30 ngày đầu: nhìn rõ dòng tiền',
        items: [
          'Ghi chép mọi khoản thu và chi trong 30 ngày, không bỏ khoản nhỏ nào.',
          'Liệt kê toàn bộ khoản nợ và cam kết hằng tháng, kèm lãi suất.',
          'Đặt quỹ dự phòng khởi đầu bằng 1 tháng chi tiêu.',
        ],
      },
      {
        title: '60 ngày: lập hệ thống',
        items: [
          'Chia thu nhập thành các phần: chi tiêu thiết yếu, tiết kiệm, dự phòng, phát triển.',
          'Tự động chuyển khoản tiết kiệm ngay khi nhận thu nhập.',
          'Cắt giảm khoảng 10% khoản chi không cần thiết và ưu tiên trả khoản nợ lãi cao.',
        ],
      },
      {
        title: '90 ngày: mở rộng nguồn thu',
        items: [
          'Tạo thêm một nguồn thu nhỏ từ kỹ năng bạn đang có.',
          'Đặt mục tiêu tài chính cho 12 tháng tới, chia thành mốc theo quý.',
          'Học nền tảng đầu tư an toàn trước khi đưa tiền vào bất kỳ kênh nào.',
        ],
      },
    ],
    mistakes: [
      'Đầu tư theo tin đồn khi chưa có quỹ dự phòng',
      'Cắt giảm mọi chi tiêu đến mức không duy trì được',
      'Giấu vấn đề tiền bạc với người thân thay vì cùng nhau giải quyết',
    ],
    contactReason:
      'Tài chính liên quan đến nhiều quyết định lớn. Một kế hoạch thu – chi – tích lũy được thiết kế theo hoàn cảnh riêng của bạn giúp tránh những sai lầm tốn kém.',
    caution: 'Nội dung chỉ mang tính định hướng, không phải tư vấn đầu tư hay pháp lý.',
  },
  career: {
    why:
      'Sự nghiệp là nơi bạn đổi năng lực lấy thu nhập và ý nghĩa. Điểm thấp thường báo hiệu công việc chưa đúng sở trường, thiếu hướng phát triển hoặc đang kiệt sức. Vì nghề nghiệp gắn chặt với thu nhập, thời gian dành cho gia đình và sức khỏe, nếu chậm xử lý thì nhiều lĩnh vực khác cũng bị kéo theo.',
    signs: [
      'Sáng thức dậy ngại đi làm',
      'Làm nhiều nhưng không thấy tiến bộ hoặc không được ghi nhận',
      'Thu nhập không tăng dù kỹ năng đã tăng',
      'Thường nghĩ đến việc bỏ nhưng chưa biết làm gì tiếp theo',
    ],
    causes: [
      'Công việc chưa khớp với thế mạnh và giá trị cá nhân',
      'Thiếu kỹ năng then chốt cho bước phát triển kế tiếp',
      'Môi trường hoặc cách làm việc với cấp trên chưa phù hợp',
      'Chưa có mục tiêu nghề nghiệp rõ ràng cho 1–3 năm tới',
    ],
    ripples: [
      'Tài chính: thu nhập khó tăng, áp lực tiền bạc lớn dần',
      'Sức khỏe: kiệt sức hoặc chán nản kéo dài',
      'Gia đình: mang căng thẳng công việc về nhà, ít thời gian chất lượng',
      'Phát triển bản thân: chững lại, mất động lực học',
    ],
    plan: [
      {
        title: '30 ngày đầu: nhìn rõ mình',
        items: [
          'Viết ra 3 thế mạnh lớn nhất, 3 phần việc bạn thích và 3 phần việc bạn muốn bớt đi.',
          'Hẹn trao đổi với một người bạn kính trọng để xin góp ý về hướng đi.',
          'Xác định một kỹ năng then chốt giúp bạn bước lên nấc tiếp theo.',
        ],
      },
      {
        title: '60 ngày: xây năng lực thấy được',
        items: [
          'Dành 20 phút mỗi ngày cho kỹ năng then chốt đó.',
          'Nhận một dự án nhỏ để thể hiện kỹ năng mới và ghi lại kết quả.',
          'Tập hợp thành tích thành một bản tóm tắt rõ ràng, có số liệu.',
        ],
      },
      {
        title: '90 ngày: đưa ra quyết định',
        items: [
          'Đàm phán vai trò hoặc thu nhập dựa trên thành tích đã ghi lại, hoặc cân nhắc hướng đi mới với kế hoạch an toàn.',
          'Đặt mục tiêu nghề nghiệp 12 tháng với các mốc cụ thể.',
          'Duy trì thói quen học và mở rộng quan hệ nghề nghiệp mỗi tháng.',
        ],
      },
    ],
    mistakes: [
      'Nghỉ việc vội vàng khi chưa có kế hoạch tiếp theo',
      'Chỉ làm chăm mà không làm cho thành quả được nhìn thấy',
      'So sánh với người khác thay vì so với chính mình của tháng trước',
    ],
    contactReason:
      'Chọn hướng đi nghề nghiệp là quyết định quan trọng. Một buổi định hướng cùng chuyên gia giúp bạn nhìn rõ thế mạnh, lộ trình và bước đi an toàn.',
    caution: 'Nội dung chỉ mang tính định hướng, quyết định cuối cùng thuộc về bạn.',
  },
};

export const SEVERITY_NOTE = {
  urgent: 'Điểm đang ở mức rất thấp, đây là lĩnh vực nên ưu tiên xử lý sớm nhất.',
  low: 'Điểm đang dưới mức ổn, nên có kế hoạch rõ ràng trong 30 ngày tới.',
  weakest: 'Điểm không thấp tuyệt đối, nhưng đang là điểm yếu nhất trong bánh xe của bạn. Tinh chỉnh lĩnh vực này sẽ giúp bánh xe tròn và lăn êm hơn.',
};
