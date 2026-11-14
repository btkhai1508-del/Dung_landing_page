import React from 'react';

export const AI_DISCLAIMER =
  'Nội dung này được tổng hợp bằng AI từ các nguồn dữ liệu mở, chỉ mang tính chất chiêm nghiệm, giải trí và giúp bạn hiểu thêm về bản thân. Đây không phải là lời khẳng định, định hướng quyết định cuộc đời hay tư vấn tài chính/sức khỏe.';

/** Lưu ý nội dung do AI tổng hợp: hiện ở đầu trang hoàn tất, đầu và cuối báo cáo kết quả. */
export const AiDisclaimer: React.FC<{ className?: string; subtle?: boolean }> = ({ className = '', subtle = false }) => (
  <p
    role="note"
    className={`leading-relaxed ${
      subtle
        ? 'text-xs text-white/50'
        : 'rounded-2xl bg-white/[0.07] px-4 py-3 text-sm text-white/80'
    } ${className}`}
  >
    <strong className="font-semibold text-[#FFA877]">Lưu ý: </strong>
    {AI_DISCLAIMER}
  </p>
);
