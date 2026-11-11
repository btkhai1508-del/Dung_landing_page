import React, { useEffect } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

const ZALO_GROUP_URL = 'https://zalo.me/g/jgxfxq6uu7xuuobade3o';

export const ThankYouPage: React.FC<ThankYouPageProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-stone-800 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        {/* Direct Zalo Button */}
        <a
          href={ZALO_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-5 rounded-2xl font-bold text-white text-sm sm:text-base bg-[#0068ff] hover:bg-[#0054cc] transition-all duration-200 flex items-center justify-center gap-2.5 text-center cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="uppercase tracking-wider font-bold">
            Vào zalo nhận cách đón lộc trong nhóm
          </span>
          <ExternalLink className="w-4 h-4 shrink-0 opacity-80" />
        </a>

        {/* Cropped QR Code - Blended seamlessly on white background */}
        <div className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] flex items-center justify-center">
          <img
            src="/assets/aistudio/zalo_qr_only.png"
            alt="Mã QR Zalo"
            className="w-full h-full object-contain block"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
