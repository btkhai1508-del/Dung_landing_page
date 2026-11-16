import React, { useEffect, useState } from 'react';
import { Gift, Sprout, ArrowRight } from 'lucide-react';

// Trang chủ "Lời chào hàng" — Bí mật về Phúc Lộc (nội dung đầy đủ theo file "Landing Page Lời Chào hàng").
// Giao diện dùng chung theme với trang khảo sát /bando (FamilyHappinessMap):
// nền ảnh phủ tối, chữ trắng, điểm nhấn cam #FA5B13 / #FFA877, tiêu đề Playfair nghiêng.
// Mỗi quà tặng 1–5 là một phần riêng, đánh số cam lớn. Mọi nút nhận quà dẫn tới /bando.

// Ảnh nền Unsplash cho từng phần (đổi mờ dần khi cuộn tới phần đó), không trùng ảnh của /bando.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`;
const SECTION_BGS = [
  unsplash('photo-1614130020598-093435d7f1a2'), // Mở đầu: đèn lồng đỏ trong đêm (nền tối, chữ dễ đọc)
  unsplash('photo-1689689753534-30a3182ed023'), // Bắt đầu từ chính bạn: con đường lên đỉnh núi
  unsplash('photo-1522075782449-e45a34f1ddfb'), // Quà 1: người ngồi tĩnh lặng ngắm núi
  unsplash('photo-1576089073624-b5751a8f4de9'), // Quà 2–5: gia đình quây quần bên mâm cơm
  unsplash('photo-1528722828814-77b9b83aafb2'), // Lời kết: dải ngân hà
];

const headingClass = 'font-playfair-heading italic font-medium';
const BTN_PRIMARY =
  'min-h-[52px] px-6 sm:px-9 py-3.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95';
const BODY = 'text-base sm:text-lg text-white/90 leading-relaxed';
const BOX = 'py-5 border-y border-white/15';

const goToBando = () => {
  window.history.pushState({}, '', '/bando');
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CtaButton: React.FC<{ label?: string; className?: string }> = ({ label = 'NHẬN QUÀ TẶNG 1', className = 'w-full sm:w-auto' }) => (
  <button onClick={goToBando} className={`${BTN_PRIMARY} ${className}`}>
    <Gift className="w-5 h-5 shrink-0" />
    <span>{label}</span>
    <ArrowRight className="w-5 h-5 shrink-0" />
  </button>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="text-[#FA5B13] font-bold text-lg leading-none mt-1">•</span>
    <span>{children}</span>
  </li>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className={`text-2xl sm:text-4xl text-white leading-[1.3] ${headingClass} [text-wrap:balance]`}>{children}</h2>
);

// Tiêu đề mỗi món quà: số thứ tự màu cam lớn + tên quà
const GiftTitle: React.FC<{ no: number; name: string; sub?: string }> = ({ no, name, sub }) => (
  <div className="flex items-start gap-4 sm:gap-5">
    <span className={`text-6xl sm:text-7xl leading-[0.85] font-bold text-[#FA5B13] ${headingClass} shrink-0`}>{no}</span>
    <div>
      <h2 className={`text-2xl sm:text-4xl text-white leading-[1.25] ${headingClass} [text-wrap:balance]`}>{name}</h2>
      {sub && <p className={`text-lg sm:text-2xl text-[#FFA877] mt-1 ${headingClass} [text-wrap:balance]`}>{sub}</p>}
    </div>
  </div>
);

const ValueNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base sm:text-lg text-white leading-relaxed pl-3 border-l-2 border-[#FFA877] py-1 bg-white/5 rounded-r-lg">
    <span className="text-[#FFA877] font-semibold">Giá trị bạn nhận: </span>
    {children}
  </p>
);

// 6 điều khám phá trong Quà tặng 1
const DISCOVERIES: { q: string; body: string[]; bullets?: string[]; end: string }[] = [
  {
    q: 'Bạn có những thế mạnh nào đang chờ được phát huy?',
    body: [
      'Có những việc bạn làm tự nhiên đến mức tưởng rằng ai cũng làm được. Có những nét tính cách vừa là ưu điểm, vừa khiến bạn gặp khó khi đặt vào hoàn cảnh khác.',
      'Qua phần luận giải bản mệnh, cung Mệnh và các chỉ số thần số học, bạn tìm hiểu:',
    ],
    bullets: [
      'Những thế mạnh được mô tả trong báo cáo của mình.',
      'Thiên hướng hành động, cảm xúc và suy nghĩ.',
      'Những điểm cần lưu ý để tự đối chiếu với trải nghiệm thực tế.',
    ],
    end: 'Bắt đầu hiểu mình bằng cả điều đáng phát huy và điều đáng điều chỉnh.',
  },
  {
    q: 'Báo cáo của bạn nói gì về tài lộc và công việc?',
    body: [
      'Công việc, tiền bạc và cách ứng xử của bạn có những điểm gì đáng chú ý?',
      'Khám phá phần luận giải về cung Tài Bạch, Quan Lộc cùng các nội dung công việc và tiền bạc trong thần số học.',
      'Bạn có thêm góc nhìn để xem xét thiên hướng công việc, cách mình phản ứng trước cơ hội và những thói quen liên quan đến tiền bạc.',
    ],
    end: 'Đọc phần của mình. Đối chiếu câu chuyện của mình. Nhận ra những điều cần tìm hiểu sâu hơn.',
  },
  {
    q: 'Bên trong bạn thực sự mong muốn điều gì?',
    body: [
      'Có khi điều bạn thể hiện ra ngoài chưa nói hết điều bạn cần ở bên trong.',
      'Bộ báo cáo có những phần luận giải về số Linh hồn, Nhân cách, Sứ mệnh, Ngày sinh và Thái độ, cùng biểu đồ ngày sinh.',
      'Từ đó, bạn có những câu hỏi để nhìn lại:',
    ],
    bullets: [
      'Điều gì khiến mình cảm thấy cuộc sống có ý nghĩa?',
      'Mình thường thể hiện bản thân như thế nào?',
      'Những phản ứng và thói quen nào đang lặp lại?',
      'Điều gì mình muốn vun đắp hoặc thay đổi?',
    ],
    end: 'Hiểu điều mình thật sự coi trọng là một bước quan trọng trên hành trình đón lộc cùng phúc.',
  },
  {
    q: 'Giai đoạn bạn đang đi qua có gì đáng suy ngẫm?',
    body: [
      'Báo cáo trình bày các giai đoạn đại vận trong tử vi, các đỉnh cao và thử thách trong thần số học, cùng nội dung: năm cá nhân, tháng cá nhân.',
      'Bạn được đọc những chủ đề và bài học mà các hệ thống này gắn với từng giai đoạn, rồi đối chiếu với hành trình đã qua và những điều đang quan tâm.',
    ],
    end: 'Bạn đang dành sự chú ý cho điều gì — và còn điều gì cần được nhìn lại?',
  },
  {
    q: 'Cuộc sống hiện tại đang nâng đỡ bạn ở đâu, cần chăm chút ở đâu?',
    body: [
      'Phần Bánh xe cuộc đời tập hợp những câu trả lời tự đánh giá của bạn thành một bức tranh dễ theo dõi.',
      'Bạn nhìn lại mức độ hài lòng ở từng lĩnh vực, những phần đang tốt và những phần cần quan tâm hơn.',
      'Báo cáo còn có các gợi ý thực hành và câu hỏi tự suy ngẫm theo từng lĩnh vực.',
    ],
    end: 'Thay vì để mọi trăn trở nằm chung trong đầu, hãy gọi tên điều mình muốn cải thiện và chọn một điểm bắt đầu.',
  },
  {
    q: 'Bạn có thể hiểu thêm điều gì về những người thân yêu?',
    body: [
      'Bạn mong lộc đến cùng một gia đình hòa hợp. Sự thấu hiểu cũng cần được vun đắp từ những người gần gũi nhất.',
      'Khi bạn cung cấp thông tin người thân theo biểu mẫu, phần gia đình bổ sung các nội dung luận giải về tính cách, điểm mạnh, điều cần lưu ý và những khác biệt để cùng suy ngẫm.',
      'Kèm theo đó là những gợi ý về lắng nghe, chia sẻ và dành thời gian cho nhau.',
    ],
    end: 'Thêm một góc nhìn để bớt vội phán xét, biết đặt câu hỏi và quan tâm đến nhau sâu hơn.',
  },
];

// Quà tặng 2–5, mỗi quà một phần riêng
const BONUS_GIFTS: { no: number; name: string; tagline: string; body: string[]; value: string; cta?: boolean }[] = [
  {
    no: 2,
    name: 'Bộ giải pháp Vun Phúc',
    tagline: 'Đưa an vui và hòa hợp vào nhà.',
    body: [
      'Bạn được tiếp cận những giải pháp khiến các mối quan hệ xung quanh gia đình, người thân và bạn bè tốt đẹp hơn. Tinh thần an lạc, nội tâm mạnh mẽ vững vàng. Tạo phúc cho xã hội cũng là tích đức cho đời sau.',
    ],
    value: 'chất liệu học hỏi, thực hành để vun đắp nội tâm bình an, gia đình yêu thương và những kết nối chân thành.',
    cta: true,
  },
  {
    no: 3,
    name: 'Chìa khóa Hút Lộc',
    tagline: 'Hút về những tài lộc đang chờ bạn bấy lâu.',
    body: [
      'Bạn sẽ nhận trọn bộ quy trình “Chìa khóa hút lộc”, để hút những tài lộc đang chờ chúng ta bấy lâu nhưng chúng ta chưa biết hút về.',
    ],
    value: 'một cách bắt đầu có trình tự để nhận diện tài lộc đang đứng chờ và hành động để hút vào nhà.',
    cta: true,
  },
  {
    no: 4,
    name: 'Chìa khóa Trường Thọ Tự Nhiên',
    tagline: 'Dành sự quan tâm đúng cách cho cơ thể đang đồng hành cùng bạn mỗi ngày.',
    body: [
      'Phần kiến thức tập trung vào những mặt thiết thực:',
      'Cùng đi qua một quãng đời, tại sao có người càng có tuổi càng nhẹ nhõm, tinh anh và tràn đầy sinh lực, trẻ lâu… còn có người lại sớm hao mòn? Câu trả lời nằm ở những yếu tố thầm lặng đang nuôi dưỡng sự sống quanh bạn từng giờ.',
    ],
    value: 'nhận trọn bộ bí mật của sự trường thọ tự nhiên bền vững.',
  },
  {
    no: 5,
    name: 'Môi trường Đồng Hành',
    tagline: 'Có nơi để liên tục nâng cao cách thu hút Phúc – Lộc – Thọ về, đặt câu hỏi và cùng thực hành.',
    body: [
      'Bạn được tham gia những hoạt động học hỏi và hỗ trợ dành cho người nhận quà trong cộng đồng của tôi. Một môi trường đề cao phát triển bản thân, trao giá trị, giúp đỡ nhau và cùng tiến bộ.',
    ],
    value: 'sự kết nối trọn đời để tiếp tục hành trình nâng cao Phúc – Lộc – Thọ cho đời sau.',
    cta: true,
  },
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
    // Ít phần nên tính trực tiếp mỗi lần cuộn là đủ nhẹ; React bỏ qua khi giá trị không đổi.
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
        {/* MỞ ĐẦU */}
        <section data-bg="0" className="space-y-6 animate-fade">
          <h1 className={`text-3xl sm:text-5xl text-white leading-[1.25] ${headingClass} [text-wrap:balance] drop-shadow-lg`}>
            <span className="block">Bí mật về Phúc Lộc</span>
            <span className="block text-[#FFA877] mt-1">đã có sẵn xung quanh bạn!</span>
          </h1>
          <p className="text-lg sm:text-xl text-white leading-relaxed">
            Vì sao có người đón nhận được rất nhiều lộc, còn có người vẫn mãi mong chờ?
          </p>
          <div className={`${BOX} ${BODY} space-y-3`}>
            <p>Ai cũng mong tài lộc đến với mình.</p>
            <p>
              Nhưng điều đặc biệt lưu ý hơn là khi lộc đến,{' '}
              <strong className="text-white">tiền bạc thêm đủ đầy, lòng thêm vui, sức khỏe được gìn giữ và gia đình càng hòa hợp.</strong>
            </p>
            <p>Chứ không phải lộc đến, lại kéo theo lo âu, tranh giành, bất hòa và những hệ lụy nặng nề.</p>
          </div>
          <p className={`text-xl sm:text-2xl text-[#FFA877] ${headingClass} [text-wrap:balance]`}>
            Cùng là đón lộc — vì sao điều đến sau nó lại khác nhau đến vậy?
          </p>
          <ul className={`${BODY} space-y-3`}>
            <Bullet>Lộc hiện diện ở đâu?</Bullet>
            <Bullet>Điều gì khiến bạn chưa nhận ra, chưa đón được?</Bullet>
            <Bullet>Và làm sao để lộc đến cùng phúc, để sự đủ đầy đi cùng niềm vui và bình an?</Bullet>
          </ul>
        </section>

        {/* BẮT ĐẦU TỪ CHÍNH BẠN */}
        <section data-bg="1" className="space-y-6">
          <SectionTitle>
            Muốn tìm lời giải, hãy bắt đầu từ người trực tiếp đón nhận lộc:{' '}
            <span className="text-[#FFA877]">CHÍNH BẠN.</span>
          </SectionTitle>
          <ul className={`${BODY} space-y-3`}>
            <Bullet>Bạn đã hiểu mình thế nào?</Bullet>
            <Bullet>Đã nhận ra những điều gì đang tác động đến phúc lộc của mình?</Bullet>
            <Bullet>Đã biết mình cần tìm hiểu điều gì trước khi biết cách đón nhận?</Bullet>
          </ul>
          <div className={BOX}>
            <p className="text-sm sm:text-base font-semibold text-[#FFA877] mb-4">Hành trình ấy bắt đầu từng bước:</p>
            <ol className="space-y-4 text-base sm:text-lg">
              {[
                ['Hiểu mình', 'qua tử vi và thần số học'],
                ['Hiểu những tác động', 'quanh mình'],
                ['Tìm hiểu quy luật', 'và cách đón nhận phúc lộc'],
              ].map(([t, d], i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FA5B13] text-white font-bold flex items-center justify-center shrink-0 text-sm">{i + 1}</span>
                  <span className="pt-0.5">
                    <strong>{t}</strong> <span className="text-white/80">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className={BODY}>
            Bộ quà tử vi – thần số học tôi gửi tặng chính là <strong className="text-white">bước mở đầu</strong> để bạn khám phá{' '}
            <strong className="text-[#FFA877]">CHÍNH BẠN.</strong>
          </p>
          <p className={`text-xl sm:text-2xl text-white ${headingClass} [text-wrap:balance]`}>
            Vậy bạn sẽ khám phá những gì về chính mình qua món quà này?
          </p>
          <CtaButton label="NHẬN QUÀ TẶNG MIỄN PHÍ" />
        </section>

        {/* QUÀ TẶNG 1 */}
        <section data-bg="2" className="space-y-8">
          <GiftTitle no={1} name="Bản Đồ Hiểu Mình" sub="Khám phá chính bạn — người trực tiếp đón nhận phúc lộc" />
          <div className={`${BODY} space-y-3`}>
            <p>
              Bạn mong tài lộc đến, gia đình hòa hợp và cuộc sống bình an. Vậy bạn đã hiểu những thế mạnh, mong muốn và điều cần điều chỉnh của chính mình chưa?
            </p>
            <p>
              Tôi gửi tặng bạn bộ báo cáo kết hợp <strong className="text-white">Tử vi – Thần số học – Bánh xe cuộc đời</strong>, được xây dựng từ thông tin cá nhân và những câu trả lời bạn cung cấp.
            </p>
            <p>
              Trong đó là những góc nhìn để bạn khám phá bản thân, đối chiếu với cuộc sống và bắt đầu trả lời những câu hỏi quan trọng dưới đây.
            </p>
          </div>

          <div className="border-t border-white/15">
            {DISCOVERIES.map((d, i) => (
              <article key={d.q} className="py-6 border-b border-white/15 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-start gap-2.5">
                  <span className="text-[#FA5B13]">{i + 1}.</span>
                  <span>{d.q}</span>
                </h3>
                <div className="text-base sm:text-lg text-white/85 leading-relaxed space-y-2.5 sm:pl-6">
                  {d.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {d.bullets && (
                    <ul className="space-y-2">
                      {d.bullets.map((b) => (
                        <Bullet key={b}>{b}</Bullet>
                      ))}
                    </ul>
                  )}
                  <p className="text-[#FFA877] font-semibold">{d.end}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className={`text-xl sm:text-3xl text-white ${headingClass} [text-wrap:balance]`}>
              Một bộ báo cáo — từ hiểu mình đến nhìn lại cuộc sống
            </h3>
            <div className={`${BODY} space-y-3`}>
              <p>Bạn nhận được những nội dung để đọc về bản thân, những câu hỏi để đối chiếu và những gợi ý để bắt đầu thực hành.</p>
              <p>
                Từ thế mạnh và nội tâm đến công việc, tiền bạc, các giai đoạn cuộc đời và mối quan hệ gia đình — tất cả được tập hợp để bạn dành sự chú ý trọn vẹn hơn cho chính mình.
              </p>
              <p className="text-white font-semibold">
                Đó là giá trị của bước đầu tiên: hiểu người đang mong đón nhận phúc lộc — <span className="text-[#FFA877]">CHÍNH BẠN.</span>
              </p>
            </div>
          </div>
          <CtaButton />
          <p className="text-sm text-white/75 italic">
            * Đây là những gợi ý tích cực từ dân gian mang tính tham khảo, với mong muốn bạn có cuộc sống tốt đẹp hơn!
          </p>
        </section>

        {/* CHUYỂN TIẾP SANG QUÀ 2–5 */}
        <section data-bg="3" className="space-y-6">
          <SectionTitle>
            <span className="block">Hiểu mình là bước đầu.</span>
            <span className="block text-[#FFA877] mt-1">Điều rất giá trị tiếp theo là biết cách nhận diện và đón Phúc – Lộc – Thọ vào nhà.</span>
          </SectionTitle>
          <div className={`${BODY} space-y-3`}>
            <p>Bạn đã có mong muốn: lộc đến, cuộc sống thêm đủ đầy, gia đình thêm hòa hợp và bản thân khỏe mạnh để tận hưởng.</p>
            <p>
              Để tiếp nối mong muốn ấy, sau khi bạn nhận Quà tặng 1, tôi dành tặng bạn thêm{' '}
              <strong className="text-[#FFA877]">TRỌN BỘ QUÀ ĐÓN NHẬN PHÚC – LỘC – THỌ.</strong>
            </p>
          </div>
        </section>

        {/* QUÀ TẶNG 2–5: mỗi quà một phần riêng */}
        {BONUS_GIFTS.map((g) => (
          <section key={g.no} data-bg="3" className="space-y-6">
            <GiftTitle no={g.no} name={g.name} sub={g.tagline} />
            <div className={`${BODY} space-y-3`}>
              {g.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ValueNote>{g.value}</ValueNote>
            {g.cta && <CtaButton />}
          </section>
        ))}

        {/* LỜI KẾT */}
        <section data-bg="4" className="space-y-6">
          <SectionTitle>Nếu bạn không bắt đầu, điều gì sẽ xảy ra?</SectionTitle>
          <div className={`${BOX} ${BODY} space-y-3`}>
            <p>Bạn vẫn mong tài lộc đến, gia đình hòa hợp và bản thân khỏe mạnh. Bạn đã mong bao lâu rồi?</p>
            <p>
              Nhưng những câu hỏi về chính mình vẫn còn đó. Những điều cần quan tâm vẫn bị để lại phía sau. Và mong muốn một cuộc sống tốt đẹp hơn lại tiếp tục chờ đến “một ngày nào đó”.
            </p>
            <p className="text-white font-semibold">
              Một tháng nữa, một năm nữa… bạn muốn vẫn đang mong chờ, hay đã bắt đầu hiểu mình và từng bước thu hút PHÚC – LỘC – THỌ?
            </p>
            <p>Bạn chưa cần có mọi câu trả lời mới bắt đầu. Bước đầu tiên là dành cho chính mình cơ hội tìm hiểu.</p>
            <p className="text-[#FFA877] font-semibold">Bộ quà đã ở đây. Quyết định bắt đầu nằm ở bạn.</p>
          </div>
          <p className="font-dancing-script text-2xl sm:text-3xl text-[#FFA877] leading-relaxed [text-wrap:balance] drop-shadow-md">
            “Đừng để mong muốn đón lộc cùng phúc chỉ dừng lại ở một lời thỉnh cầu mà chưa có thay đổi!”
          </p>
          <p className={BODY}>
            Bắt đầu bằng quyết định của chính bạn. Thu hút Phúc – Lộc – Thọ bằng những điều bạn học và thực hành.
          </p>
          <CtaButton label="TÔI MUỐN NHẬN QUÀ VÀ BẮT ĐẦU NGAY" />
        </section>
      </main>

      {/* Thanh nhận quà dính đáy trên điện thoại (giống thanh nút /bando) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-20 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/80 backdrop-blur-md border-t border-white/15">
        <CtaButton label="NHẬN QUÀ MIỄN PHÍ" className="w-full" />
      </div>
    </div>
  );
};
