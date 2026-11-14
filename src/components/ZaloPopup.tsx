import React, { useCallback, useEffect, useRef, useState } from 'react';

export const ZALO_GROUP_LINK = 'https://zalo.me/g/jgxfxq6uu7xuuobade3o';
const OPEN_EVENT = 'open-zalo-popup';
const AFTER_MS = 60_000; // lần 1: sau 1 phút
const SHARE_TEXT =
  'Mình vừa nhận được bản phân tích tử vi và thần số học chi tiết rất hay. Bạn vào nhóm Zalo này để nhận nhé:';

/** Dòng chữ nhỏ ở cuối trang để mở lại cửa sổ Zalo nếu người dùng lỡ đóng. */
export const ZaloOpenButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    className={`inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FA5B13] px-7 py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-[#FA5B13]/40 ring-4 ring-[#FA5B13]/20 transition hover:bg-[#e24f0d] active:scale-95 ${className}`}
  >
    Vui lòng tham gia nhóm Zalo Gieo Hạt để nhận kết quả &rarr;
  </button>
);

const seen = {
  get: (k: string) => {
    try {
      return !!sessionStorage.getItem(k);
    } catch {
      return false;
    }
  },
  set: (k: string) => {
    try {
      sessionStorage.setItem(k, '1');
    } catch {
      /* bỏ qua */
    }
  },
};

/**
 * MỘT cửa sổ Zalo duy nhất (vào nhóm Zalo Gieo Hạt + rủ người thân), mở ở hai thời điểm:
 *  1) sau 1 phút kể từ khi vào trang;
 *  2) khi người dùng cuộn xuống cuối trang.
 * Mỗi thời điểm chỉ kích hoạt một lần mỗi phiên; nếu cửa sổ đang mở thì không mở chồng.
 * Tắt bằng nút ×, phím Esc hoặc bấm ra ngoài.
 */
export const ZaloPopups: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const openRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    openRef.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    const K_TIME = 'gh3_zalo_after_1min';
    const K_BOTTOM = 'gh3_zalo_at_bottom';
    let timer: number | undefined;
    let bottomTimer: number | undefined;
    let scrolledDown = false;
    let bottomFired = seen.get(K_BOTTOM);

    // Thời điểm 1: sau 1 phút
    if (!seen.get(K_TIME)) {
      timer = window.setTimeout(() => {
        seen.set(K_TIME);
        show();
      }, AFTER_MS);
    }

    // Thời điểm 2: cuộn xuống cuối trang
    const onScroll = () => {
      if (bottomFired) return;
      if (window.scrollY > 300) scrolledDown = true;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (scrolledDown && atBottom) {
        bottomFired = true;
        seen.set(K_BOTTOM);
        bottomTimer = window.setTimeout(show, 600);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      if (timer) window.clearTimeout(timer);
      if (bottomTimer) window.clearTimeout(bottomTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const share = async () => {
    const text = `${SHARE_TEXT} ${ZALO_GROUP_LINK}`;
    try {
      if (navigator.share) {
        await navigator.share({ text, url: ZALO_GROUP_LINK });
        return;
      }
    } catch {
      /* người dùng huỷ chia sẻ → rơi xuống sao chép */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Sao chép nội dung này để gửi cho người thân:', text);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="zalo-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FBF7F1] text-[#1F1A17] p-7 sm:p-9 shadow-2xl font-be-vietnam"
      >
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Đóng"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-[#6B625B] hover:bg-black/5 cursor-pointer"
        >
          ×
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8590C]">Nhóm Zalo Gieo Hạt</p>
        <h2 id="zalo-title" className="mt-2 pr-8 font-playfair-heading text-[26px] leading-[1.25] italic font-medium">
          Vui lòng tham gia nhóm Zalo Gieo Hạt để được nhận kết quả phân tích tử vi, thần số học chi tiết
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4A423C]">
          Bấm nút bên dưới, hoặc quét mã QR nếu bạn đang xem trên máy tính, rồi bấm “Tham gia nhóm”.
        </p>

        <div className="mt-6 flex flex-col items-center gap-5">
          <img
            src="/assets/zalo-gh3-qr.jpg"
            alt="Mã QR vào nhóm Zalo Gieo Hạt"
            width={208}
            height={208}
            className="h-[208px] w-[208px] rounded-2xl bg-white object-contain p-2 ring-1 ring-black/10"
          />
          <a
            href={ZALO_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-[#E8590C] py-3.5 text-center text-[15px] font-bold text-white hover:bg-[#cf4f09] transition"
          >
            Vào nhóm Zalo Gieo Hạt
          </a>
        </div>

        <div className="mt-7 border-t border-black/10 pt-5">
          <p className="text-[15px] leading-relaxed text-[#4A423C]">
            Bạn có người thân, bạn bè đang loay hoay chuyện sức khỏe, tiền bạc hay gia đình? Một lời rủ nhẹ nhàng của bạn có thể giúp họ bắt đầu hiểu mình hơn.
          </p>
          <button
            onClick={share}
            className="mt-3 w-full rounded-full border border-[#1F1A17]/25 py-3 text-[14px] font-semibold hover:bg-black/5 transition cursor-pointer"
          >
            {copied ? 'Đã sao chép, gửi cho người thân nhé' : 'Gửi link nhóm cho người thân'}
          </button>
        </div>
      </div>
    </div>
  );
};
