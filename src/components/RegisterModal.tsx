import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBSUB_UKWpZdeJXmNEk-Xjq1CN10bykbJTb_mhFa9dH_Nu6OqIzM9hFJAq2MH772xoBA/exec';

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
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
      // Gửi dữ liệu theo chuẩn URLSearchParams (Form Data) để Google Apps Script nhận 100% không bị CORS hay null
      const formData = new URLSearchParams();
      formData.append('name', name.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formData.toString(),
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
          <h2 className="font-['Space_Grotesk'] font-extrabold text-[22px] sm:text-[28px] leading-[28px] sm:leading-[34px] text-black tracking-tight uppercase text-center">
            <span className="block">THỬ THÁCH 2 NGÀY MIỄN PHÍ -</span>
            <span className="block">BÍ MẬT</span>
            <span className="block">DÒNG TIỀN 30 TRIỆU-</span>
            <span className="block">AFFILIATE-</span>
            <span className="block">CHỈ CẦN (BẤM ĐIỆN THOẠI)</span>
          </h2>
        </div>

        {/* Subtitle: Căn giữa */}
        <p className="mt-4 font-['Space_Grotesk'] font-medium text-[15px] sm:text-[17px] leading-[22px] sm:leading-[25px] text-black text-center">
          Chỉ 7 chỗ duy nhất- Điền thông tin của bạn xuống dưới để được giữ chỗ:
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
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
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
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
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
              className="w-full h-[54px] sm:h-[58px] px-5 bg-white border border-black rounded-[16px] font-['Space_Grotesk'] text-[16px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
            />
          </div>

          {/* Success message */}
          {isSuccess && (
            <div className="p-3 bg-[#B9FF66] text-black text-center font-['Space_Grotesk'] font-bold rounded-[14px] text-sm border border-black animate-fadeIn">
              ✓ Đã giữ chỗ thành công! Vé miễn phí đang được gửi đến bạn.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[58px] sm:h-[62px] bg-[#191A23] text-white font-['Space_Grotesk'] font-bold text-[17px] sm:text-[19px] rounded-[16px] hover:bg-[#B9FF66] hover:text-[#191A23] transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl uppercase tracking-wider border border-[#191A23] flex items-center justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'ĐANG XỬ LÝ...' : 'GỬI VÉ MIỄN PHÍ CHO TÔI'}
          </button>

          {/* Faint grey text */}
          <p className="font-['Space_Grotesk'] text-[13px] text-neutral-400 text-center select-none pt-1">
            thông tin của bạn được bảo mật tuyệt đối
          </p>
        </form>
      </div>
    </div>
  );
};
