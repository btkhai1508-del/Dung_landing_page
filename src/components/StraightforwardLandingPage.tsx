import React, { useEffect, useState } from 'react';
import { Gift, Sprout, ArrowRight } from 'lucide-react';

// Trang chủ "Lời chào hàng" — Bí mật về Phúc Lộc.
// Giao diện dùng chung theme với trang khảo sát /bando (FamilyHappinessMap):
// nền ảnh phủ tối, chữ trắng, điểm nhấn cam #FA5B13 / #FFA877, tiêu đề Playfair nghiêng.
// Mọi nút nhận quà dẫn tới /bando (Quà tặng 1 — Bản đồ hiểu mình).

// Ảnh nền Unsplash cho từng phần (đổi mờ dần khi cuộn tới phần đó), không trùng ảnh của /bando.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`;
const SECTION_BGS = [
  unsplash('photo-1614130020598-093435d7f1a2'), // Mở đầu: đèn lồng đỏ trong đêm (nền tối, chữ dễ đọc)
  unsplash('photo-1689689753534-30a3182ed023'), // 01 Hành trình: con đường lên đỉnh núi
  unsplash('photo-1522075782449-e45a34f1ddfb'), // 02 Quà 1: người ngồi tĩnh lặng ngắm núi
  unsplash('photo-1576089073624-b5751a8f4de9'), // 03 Quà 2–5: gia đình quây quần bên mâm cơm
  unsplash('photo-1528722828814-77b9b83aafb2'), // 04 Lời kết: dải ngân hà
];

const headingClass = 'font-playfair-heading italic font-medium';
const BTN_PRIMARY =
  'min-h-[52px] px-6 sm:px-9 py-3.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95';
const LABEL = 'text-xs sm:text-sm font-bold text-white uppercase tracking-widest';

const goToBando = () => {
  window.history.pushState({}, '', '/bando');
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CtaButton: React.FC<{ label?: string; className?: string }> = ({ label = 'NHẬN QUÀ TẶNG MIỄN PHÍ', className = '' }) => (
  <button onClick={goToBando} className={`${BTN_PRIMARY} ${className}`}>
    <Gift className="w-5 h-5 shrink-0" />
    <span>{label}</span>
    <ArrowRight className="w-5 h-5 shrink-0" />
  </button>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-3">
    <span className="text-[#FA5B13] font-bold text-lg leading-none mt-1">•</span>
    <span>{children}</span>
  </div>
);

const SectionHead: React.FC<{ no: string; label: string; title: React.ReactNode }> = ({ no, label, title }) => (
  <div className="space-y-3.5">
    <div className="flex items-baseline gap-2.5">
      <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>{no}</span>
      <span className={LABEL}>{label}</span>
    </div>
    <h2 className={`text-2xl sm:text-4xl text-white leading-[1.3] ${headingClass} [text-wrap:balance]`}>{title}</h2>
  </div>
);

const GIFT_1_POINTS: [string, string][] = [
  ['Thế mạnh đang chờ phát huy', 'qua bản mệnh, cung Mệnh và các chỉ số thần số học.'],
  ['Tài lộc & công việc', 'luận giải cung Tài Bạch, Quan Lộc và thói quen tiền bạc của bạn.'],
  ['Điều bên trong bạn thực sự mong muốn', 'số Linh hồn, Nhân cách, Sứ mệnh và biểu đồ ngày sinh.'],
  ['Giai đoạn bạn đang đi qua', 'đại vận tử vi, đỉnh cao – thử thách, năm và tháng cá nhân.'],
  ['Bánh xe cuộc đời', 'nhìn rõ lĩnh vực đang nâng đỡ bạn và nơi cần chăm chút hơn.'],
  ['Thấu hiểu người thân yêu', 'gợi ý lắng nghe, chia sẻ để gia đình thêm hòa hợp.'],
];

const BONUS_GIFTS: [string, string][] = [
  ['Quà 2 · Bộ giải pháp Vun Phúc', 'Đưa an vui và hòa hợp vào nhà — nội tâm bình an, gia đình yêu thương, kết nối chân thành.'],
  ['Quà 3 · Chìa khóa Hút Lộc', 'Quy trình có trình tự để nhận diện tài lộc đang đứng chờ và hành động để hút vào nhà.'],
  ['Quà 4 · Chìa khóa Trường Thọ Tự Nhiên', 'Bí mật để càng có tuổi càng nhẹ nhõm, tinh anh, tràn đầy sinh lực và trẻ lâu.'],
  ['Quà 5 · Môi trường Đồng Hành', 'Cộng đồng cùng học, cùng thực hành — kết nối trọn đời trên hành trình Phúc – Lộc – Thọ.'],
];

export const StraightforwardLandingPage: React.FC = () => {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Bí mật về Phúc Lộc đã có sẵn xung quanh bạn | Dũng Gieo Hạt';
    return () => {
      document.title = prev;
    };
  }, []);

  // Phần nào đang nằm giữa màn hình thì hiện ảnh nền của phần đó
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'));
    // Chỉ 5 phần nên tính trực tiếp mỗi lần cuộn là đủ nhẹ; React bỏ qua khi giá trị không đổi.
    const update = () => {
      const mid = window.innerHeight / 2;
      let idx = 0;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= mid) idx = Number(s.dataset.bg);
      });
      setActiveBg(idx);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white font-be-vietnam antialiased flex flex-col selection:bg-[#FA5B13] selection:text-white bg-neutral-950">
      {/* Nền ảnh + lớp phủ tối (giống /bando) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {SECTION_BGS.map((url, i) => (
          <img
            key={url}
            src={url}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
              i === activeBg ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/35 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FA5B13]/20 flex items-center justify-center border border-[#FA5B13]/40">
              <Sprout className="w-5 h-5 text-[#FA5B13] stroke-[2.3]" />
            </div>
            <div>
              <span className={`text-xl sm:text-2xl text-white tracking-tight leading-none block ${headingClass}`}>Dũng Gieo Hạt</span>
              <span className="text-xs sm:text-sm text-white font-medium tracking-wide">Đón nhận Phúc – Lộc – Thọ</span>
            </div>
          </div>
          <button
            onClick={goToBando}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-sm cursor-pointer transition-all active:scale-95"
          >
            <Gift className="w-4 h-4" /> Nhận quà
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-28 sm:pb-16 space-y-14 sm:space-y-20">
        {/* HERO */}
        <section data-bg="0" className="space-y-6 text-center sm:text-left animate-fade">
          <p className="font-dancing-script text-2xl sm:text-3xl text-[#FFA877] leading-relaxed [text-wrap:balance] drop-shadow-md">
            “Hiểu được người là khôn ngoan, hiểu được chính mình là giác ngộ.”
          </p>
          <h1 className={`text-3xl sm:text-5xl text-white leading-[1.25] ${headingClass} [text-wrap:balance] drop-shadow-lg`}>
            <span className="block">Bí mật về Phúc Lộc</span>
            <span className="block text-[#FFA877] mt-1">đã có sẵn xung quanh bạn!</span>
          </h1>
          <p className="text-lg sm:text-xl text-white leading-relaxed">
            Vì sao có người đón nhận được rất nhiều lộc, còn có người vẫn mãi mong chờ?
          </p>
          <div className="py-5 border-y border-white/15 text-base sm:text-lg text-white/90 leading-relaxed space-y-3 text-left">
            <p>
              Ai cũng mong tài lộc đến. Nhưng điều quan trọng hơn là khi lộc đến,{' '}
              <strong className="text-white">tiền bạc đủ đầy, lòng thêm vui, sức khỏe được gìn giữ và gia đình càng hòa hợp</strong> — chứ không kéo theo lo âu, tranh giành và bất hòa.
            </p>
            <p>
              Muốn lộc đến cùng phúc, hãy bắt đầu từ người trực tiếp đón nhận lộc:{' '}
              <strong className="text-[#FFA877]">CHÍNH BẠN.</strong>
            </p>
          </div>
          <CtaButton className="w-full sm:w-auto" />
        </section>

        {/* 01 — HÀNH TRÌNH */}
        <section data-bg="1" className="space-y-6">
          <SectionHead no="01" label="Hành trình bắt đầu từng bước" title="Hiểu mình trước, rồi mới biết cách đón nhận" />
          <ol className="py-5 border-y border-white/15 space-y-4 text-base sm:text-lg">
            {[
              ['Hiểu mình', 'qua tử vi và thần số học'],
              ['Hiểu những tác động', 'đang ảnh hưởng đến phúc lộc quanh mình'],
              ['Tìm hiểu quy luật', 'và cách đón nhận phúc lộc vào nhà'],
            ].map(([t, d], i) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FA5B13] text-white font-bold flex items-center justify-center shrink-0 text-sm">{i + 1}</span>
                <span className="pt-0.5">
                  <strong>{t}</strong> <span className="text-white/80">— {d}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 02 — QUÀ TẶNG 1 */}
        <section data-bg="2" className="space-y-6">
          <SectionHead
            no="02"
            label="Quà tặng 1"
            title={
              <>
                <span className="block">Bản Đồ Hiểu Mình:</span>
                <span className="block text-[#FFA877] mt-1">Tử vi – Thần số học – Bánh xe cuộc đời</span>
              </>
            }
          />
          <p className="text-base sm:text-lg text-white leading-relaxed">
            Bộ báo cáo được xây dựng từ thông tin và câu trả lời của chính bạn. Bạn sẽ khám phá:
          </p>
          <div className="space-y-4 py-5 border-y border-white/15 text-base sm:text-lg text-white">
            {GIFT_1_POINTS.map(([t, d]) => (
              <Bullet key={t}>
                <strong>{t}:</strong> <span className="text-white/85">{d}</span>
              </Bullet>
            ))}
          </div>
          <CtaButton label="NHẬN QUÀ TẶNG 1" className="w-full sm:w-auto" />
          <p className="text-sm text-white/75 italic">
            * Đây là những gợi ý tích cực từ dân gian mang tính tham khảo, với mong muốn bạn có cuộc sống tốt đẹp hơn.
          </p>
        </section>

        {/* 03 — QUÀ TẶNG 2–5 */}
        <section data-bg="3" className="space-y-6">
          <SectionHead
            no="03"
            label="Nhận quà 1 — mở thêm quà 2 đến 5"
            title={
              <>
                <span className="block">Trọn bộ quà đón nhận</span>
                <span className="block text-[#FFA877] mt-1">Phúc – Lộc – Thọ vào nhà</span>
              </>
            }
          />
          <div className="py-5 border-y border-white/15 space-y-5">
            {BONUS_GIFTS.map(([t, d], i) => (
              <div key={t} className={`space-y-1.5 ${i > 0 ? 'pt-5 border-t border-white/10' : ''}`}>
                <h3 className="text-base sm:text-lg font-bold text-white">{t}</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — LỜI KẾT */}
        <section data-bg="4" className="space-y-6">
          <SectionHead no="04" label="Quyết định nằm ở bạn" title="Nếu bạn không bắt đầu, điều gì sẽ xảy ra?" />
          <div className="py-5 border-y border-white/15 text-base sm:text-lg text-white/90 leading-relaxed space-y-3">
            <p>
              Một tháng nữa, một năm nữa… bạn muốn <strong className="text-white">vẫn đang mong chờ</strong>, hay đã bắt đầu hiểu mình và từng bước thu hút <strong className="text-white">PHÚC – LỘC – THỌ</strong>?
            </p>
            <p>Bạn chưa cần có mọi câu trả lời mới bắt đầu. Bộ quà đã ở đây.</p>
          </div>
          <p className="font-dancing-script text-2xl sm:text-3xl text-[#FFA877] leading-relaxed [text-wrap:balance] drop-shadow-md text-center sm:text-left">
            “Đừng để mong muốn đón lộc cùng phúc chỉ dừng lại ở một lời thỉnh cầu.”
          </p>
          <CtaButton label="TÔI MUỐN NHẬN QUÀ VÀ BẮT ĐẦU NGAY" className="w-full sm:w-auto" />
        </section>
      </main>

      {/* Thanh nhận quà dính đáy trên điện thoại (giống thanh nút /bando) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-20 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/80 backdrop-blur-md border-t border-white/15">
        <CtaButton label="NHẬN QUÀ MIỄN PHÍ" className="w-full" />
      </div>
    </div>
  );
};
