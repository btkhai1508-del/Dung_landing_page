import React, { useState } from 'react';
import { submitToSheet } from '../lib/submitToSheet';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  // Tùy biến nội dung popup cho từng landing page (mặc định: trang Dũng Gieo Hạt)
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  submitLabel?: string;
  successMessage?: string;
  formType?: string;
  /** Tab Google Sheet để lưu. Bỏ trống → tab đầu tiên (Thông tin). */
  sheetName?: string;
}


export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  eyebrow = 'DŨNG GIEO HẠT · ĐĂNG KÝ MIỄN PHÍ',
  title = 'BỘ QUÀ TẶNG ĐỔI ĐỜI & THAY ĐỔI TƯƠNG LAI',
  highlight = 'KHÔNG CHỈ LÀ SỐ PHẬN',
  subtitle = 'Điền thông tin của bạn xuống dưới để nhận trọn bộ Ebook, tài liệu & kích hoạt vé giữ chỗ miễn phí:',
  submitLabel = 'GỬI BỘ QUÀ TẶNG & VÉ MIỄN PHÍ CHO TÔI',
  successMessage = '✓ Đã giữ chỗ thành công! Bộ quà tặng và vé đang được chuyển tiếp tới bạn.',
  formType = 'QUA_TANG_MIEN_PHI',
  sheetName,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !phone && !email) return;

    setIsSubmitting(true);

    try {
      await submitToSheet({
        sheet: sheetName,
        form: formType,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        fields: {
          'Họ Và Tên': name.trim(),
          'SĐT': phone.trim(),
          'Email': email.trim(),
        },
      });
    } catch (err) {
      console.error('Lỗi gửi form:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
        setEmail('');
        onClose();
        onSuccess?.();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Pop-up Window Container */}
      <div className="relative bg-white rounded-[28px] sm:rounded-[36px] max-w-[540px] w-full p-6 sm:p-10 border-2 border-[#191A23] shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button ✕ */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors cursor-pointer"
          aria-label="Đóng cửa sổ"
        >
          ✕
        </button>

        {/* Title: Căn giữa */}
        <div className="flex flex-col gap-1 text-center pt-2">
          <span className="text-xs font-bold tracking-widest text-[#FA5B13] uppercase">
            {eyebrow}
          </span>
          <h2 className="font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] font-extrabold text-[18px] sm:text-[22px] leading-[25px] sm:leading-[30px] text-black tracking-tight uppercase text-center mt-1.5 [text-wrap:balance]">
            <span className="block">{title}</span>
            <span className="block text-[#FA5B13] mt-0.5">{highlight}</span>
          </h2>
        </div>

        {/* Subtitle: Căn giữa */}
        <p className="mt-3.5 font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] font-medium text-[15px] sm:text-[17px] leading-[22px] sm:leading-[25px] text-neutral-800 text-center">
          {subtitle}
        </p>

        {/* 3 Textboxes Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5 sm:gap-4">
          {/* Ô 1: Tên của bạn */}
          <div>
            <input
              type="text"
              required
              placeholder="Tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#FA5B13]"
            />
          </div>

          {/* Ô 2: SĐT của bạn */}
          <div>
            <input
              type="tel"
              required
              placeholder="SĐT của bạn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#FA5B13]"
            />
          </div>

          {/* Ô 3: Email của bạn */}
          <div>
            <input
              type="email"
              required
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#FA5B13]"
            />
          </div>

          {/* Success message */}
          {isSuccess && (
            <div className="p-3 bg-[#FFF0E6] text-[#C2410C] text-center font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] font-bold rounded-[14px] text-sm border border-[#FA5B13] animate-fadeIn">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[58px] sm:h-[62px] bg-[#FA5B13] hover:bg-[#DD4900] text-white font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] font-bold text-[17px] sm:text-[19px] rounded-[16px] transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl uppercase tracking-wider border border-[#FA5B13] flex items-center justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'ĐANG XỬ LÝ...' : submitLabel}
          </button>

          {/* Faint grey text */}
          <p className="font-['Space_Grotesk','Be_Vietnam_Pro',sans-serif] text-[13px] text-neutral-400 text-center select-none pt-1">
            thông tin của bạn được bảo mật tuyệt đối
          </p>
        </form>
      </div>
    </div>
  );
};
