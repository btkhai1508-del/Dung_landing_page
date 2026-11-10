// Kho nội dung: hòa hợp giữa các thành viên gia đình (con giáp, ngũ hành, vai trò).

export type Role = 'couple' | 'child' | 'parent' | 'sibling' | 'grand' | 'other';

export const ROLE_LABEL: Record<Role, string> = {
  couple: 'Vợ / Chồng',
  child: 'Con cái',
  parent: 'Cha mẹ',
  sibling: 'Anh chị em',
  grand: 'Ông bà',
  other: 'Người thân',
};

export function detectRole(rel: string): Role {
  const r = (rel || '').toLowerCase();
  if (/(vợ|chồng|bạn đời|người yêu|bồ)/.test(r)) return 'couple';
  if (/(ông|bà nội|bà ngoại|\bbà\b)/.test(r) && !/(bà xã)/.test(r)) return 'grand';
  if (/(cha|mẹ|bố|\bba\b|\bmá\b|ba mẹ)/.test(r)) return 'parent';
  if (/(anh|chị|em|sibling)/.test(r)) return 'sibling';
  if (/(con|cháu)/.test(r)) return 'child';
  return 'other';
}

export const ROLE_TIP: Record<Role, string> = {
  couple: 'Với bạn đời, điều quý nhất là thời gian chất lượng và lời nói thật lòng. Mỗi tuần dành một buổi hẹn không bàn chuyện công việc và con cái.',
  child: 'Với con, hãy quan sát tính cách riêng thay vì so sánh. Lắng nghe con trước khi hướng dẫn, và dành những khoảnh khắc chơi cùng không điện thoại.',
  parent: 'Với cha mẹ, sự có mặt và những cuộc gọi đều đặn quan trọng hơn quà cáp. Hỏi chuyện, nghe kể và ghi lại những câu chuyện quý của họ.',
  sibling: 'Với anh chị em, hãy giữ liên lạc đều đặn và tránh so sánh. Một buổi họp mặt định kỳ giúp tình thân bền chặt.',
  grand: 'Với ông bà, thời gian bên nhau là món quà lớn nhất. Hãy cùng ăn một bữa cơm, nghe kể chuyện và chụp lại những kỷ niệm.',
  other: 'Với người thân này, sự quan tâm chân thành và thái độ lắng nghe sẽ xây nên gắn kết bền vững.',
};

export const CHI_REL = {
  tamhop: { label: 'Tam hợp', score: 2, text: 'Hai tuổi thuộc nhóm tam hợp: có sự thuận lợi tự nhiên, dễ hỗ trợ nhau trong công việc và cuộc sống.' },
  luchop: { label: 'Lục hợp', score: 2, text: 'Hai tuổi lục hợp: dễ gắn kết, bổ sung cho nhau và có sự thấu hiểu ngầm.' },
  xung: { label: 'Tương xung', score: -2, text: 'Hai tuổi tương xung: tính cách và nhịp sống dễ đối nghịch. Khi hiểu điều này, bạn có thể chủ động nhường nhịn và tạo quy tắc chung để hạn chế va chạm.' },
  hai: { label: 'Tương hại', score: -1, text: 'Hai tuổi tương hại: dễ có những hiểu lầm nhỏ tích tụ. Hãy nói chuyện sớm, tránh giữ trong lòng.' },
  binh: { label: 'Bình hòa', score: 0, text: 'Hai tuổi không xung không hợp rõ rệt: quan hệ phụ thuộc chủ yếu vào cách bạn và người thân đối xử với nhau.' },
} as const;

export const HANH_REL = {
  tyHoa: { label: 'Cùng hành', score: 1, text: 'Cùng hành bản mệnh: dễ đồng cảm và hiểu nhịp sống của nhau; chú ý không “nhân đôi” điểm yếu chung.' },
  sinhNhap: { label: 'Họ sinh cho bạn', score: 1, text: 'Hành bản mệnh của người thân sinh cho hành của bạn: họ dễ là nguồn nâng đỡ tinh thần và thực tế cho bạn.' },
  sinhXuat: { label: 'Bạn sinh cho họ', score: 1, text: 'Hành bản mệnh của bạn sinh cho hành của họ: bạn thường là người nâng đỡ; hãy nhớ giữ năng lượng cho mình.' },
  khacNhap: { label: 'Họ khắc bạn', score: -1, text: 'Hành bản mệnh của người thân khắc hành của bạn: đôi khi bạn cảm thấy bị áp lực khi ở cạnh; hãy giao tiếp nhẹ nhàng và đặt ranh giới.' },
  khacXuat: { label: 'Bạn khắc họ', score: -1, text: 'Hành bản mệnh của bạn khắc hành của họ: bạn dễ vô tình gây áp lực; hãy lắng nghe và dùng lời nói mềm.' },
} as const;

export const OVERALL: { min: number; label: string; text: string }[] = [
  { min: 3, label: 'Rất hòa hợp', text: 'Nhìn tổng thể, hai bạn có nhiều điểm hỗ trợ nhau; hãy trân trọng và tạo thêm kỷ niệm chung.' },
  { min: 1, label: 'Khá hòa hợp', text: 'Nhìn tổng thể, mối quan hệ khá thuận lợi; vài điều chỉnh nhỏ trong giao tiếp sẽ làm quan hệ gần gũi hơn.' },
  { min: 0, label: 'Cân bằng', text: 'Nhìn tổng thể, mối quan hệ ở mức cân bằng; sự quan tâm hằng ngày sẽ quyết định mức độ gắn kết.' },
  { min: -2, label: 'Cần dung hòa', text: 'Nhìn tổng thể, hai bạn có nhiều khác biệt; cần lắng nghe và thống nhất vài nguyên tắc chung.' },
  { min: -99, label: 'Cần nhiều kiên nhẫn', text: 'Nhìn tổng thể, hai bạn khác nhau khá nhiều; đây là cơ hội rèn sự kiên nhẫn và thấu hiểu. Hãy biến khác biệt thành sự bổ sung.' },
];
