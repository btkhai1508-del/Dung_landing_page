import React, { useState } from 'react';
import {
  Gift,
  ArrowRight,
  Menu,
  X,
  Sprout,
  Compass,
} from 'lucide-react';
import { RegisterModal } from './RegisterModal';
import { ThankYouPage } from './ThankYouPage';

export const StraightforwardLandingPage: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  // Chuyển hướng ngay sang trang khảo sát /bando
  const goToBando = () => {
    window.history.pushState({}, '', '/bando');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user completed registration, render the dedicated Thank You Page
  if (isThankYouOpen) {
    return <ThankYouPage onBackToHome={() => setIsThankYouOpen(false)} />;
  }

  const headingClass = 'font-playfair-heading italic font-medium';

  const navItems = [
    { id: 'sec-01', number: '01', label: 'Bản chất vận hành' },
    { id: 'sec-02', number: '02', label: '6 Quy luật vũ trụ' },
    { id: 'sec-03', number: '03', label: 'Ba góc nhìn chân lý' },
    { id: 'sec-04', number: '04', label: 'Tử vi & Vận mệnh' },
    { id: 'sec-05', number: '05', label: 'Giá trị khảo sát' },
    { id: 'sec-06', number: '06', label: 'Khảo sát ngay' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#191A23] font-be-vietnam antialiased flex flex-col relative">
      {/* TOP BAR NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs font-be-vietnam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo / Brand Mark: Hạt giống nảy mầm */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center text-[#FA5B13] border border-[#FFD8C2] shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-5 h-5 text-[#FA5B13] stroke-[2.3]" />
            </div>
            <span className={`text-2xl sm:text-3xl tracking-tight text-gray-950 ${headingClass}`}>
              Dũng Gieo Hạt
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#FA5B13] hover:bg-[#FFF5F0] transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={goToBando}
              className="px-5 py-2.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Khảo sát Bản Đồ ngay</span>
            </button>
          </div>

          {/* Mobile Right Action + Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={goToBando}
              className="px-3 py-1.5 bg-[#FA5B13] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Khảo Sát</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg border border-gray-200 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Tablet Hamburger (Between sm and lg) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg border border-gray-200 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full p-2.5 rounded-xl hover:bg-[#FFF5F0] text-left text-sm font-semibold text-gray-800 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  goToBando();
                }}
                className="w-full py-3 bg-[#FA5B13] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Khảo sát Bản Đồ ngay</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-x-hidden font-be-vietnam">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#141820] text-white px-6 sm:px-12 py-16 sm:py-24 border-b border-gray-800">
          {/* Dimmed soft orange/amber atmospheric background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4D2214]/70 via-[#241B18]/85 to-[#0F141C] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_25%_25%,rgba(250,91,19,0.18),transparent_65%)] pointer-events-none" />

          {/* Background Mountain Photo with soft opacity */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Bình minh trên đỉnh núi"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none"
          />

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
              <div className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#FFA877] font-semibold text-xs tracking-widest uppercase font-be-vietnam shadow-sm">
                KIẾN THỨC · TRẢI NGHIỆM · ỨNG DỤNG · THAY ĐỔI CUỘC SỐNG
              </div>

              <div className="space-y-2">
                <p className="text-base sm:text-xl text-[#FFA877] font-semibold tracking-wide drop-shadow-md">
                  Tại Sao Có Người Cùng Lá Số Tử Vi Như Nhau Nhưng Cuộc Đời Lại Khác Biệt?
                </p>
                <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${headingClass} leading-[1.25] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] [text-wrap:balance]`}>
                  <span className="block">Bạn Có Thể Thay Đổi Tương Lai</span>
                  <span className="block text-[#FFAB76] mt-1 underline decoration-white/30">Không Chỉ Là Số Phận</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-be-vietnam max-w-xl">
                Hiểu đúng về năng lượng, tần số rung động và các quy luật vận hành của vũ trụ để làm chủ lá số tử vi, sức khỏe, tài chính và các mối quan hệ và kiến tạo cuộc sống mà bạn mong muốn.
              </p>

              {/* Handwritten Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-[#FFA877] text-2xl sm:text-3xl font-dancing-script font-bold leading-snug shadow-lg text-center sm:text-left">
                “Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”
              </div>

              {/* CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={goToBando}
                  className="w-full sm:w-auto px-8 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold text-base rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer font-be-vietnam"
                >
                  <Compass className="w-5 h-5 text-white" />
                  <span>KHẢO SÁT BẢN ĐỒ NGAY &gt;</span>
                </button>
              </div>
            </div>

            {/* Right: External Hero Image */}
            <div className="lg:col-span-5 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
                alt="Làm chủ tương lai trước bình minh vũ trụ"
                className="w-full max-w-sm aspect-4/5 object-cover rounded-3xl shadow-2xl border-2 border-white/10"
              />
            </div>
          </div>
        </section>

        {/* SECTION 01: BẢN CHẤT VẬN HÀNH */}
        <section id="sec-01" className="px-6 sm:px-12 py-16 sm:py-24 border-b border-gray-200 relative overflow-hidden bg-white">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80"
            alt="Năng lượng vũ trụ"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
          />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`text-4xl font-bold text-[#FA5B13] ${headingClass}`}>01</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-be-vietnam">
                THẾ GIỚI NÀY VẬN HÀNH NHƯ THẾ NÀO?
              </span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-bold text-gray-900 mb-8 leading-snug ${headingClass}`}>
              Mọi Thứ Đều Là Năng Lượng Và Tần Số Rung Động
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text content (7 cols) */}
              <div className="lg:col-span-7 space-y-5 text-base text-gray-700 leading-relaxed font-be-vietnam">
                <p className="text-base sm:text-lg text-gray-900 leading-relaxed">
                  Từ hạt vật chất nhỏ nhất đến ngôi sao xa xôi, mọi thứ trong vũ trụ đều là năng lượng và luôn rung động ở một tần số nhất định.
                </p>
                <p>
                  Khi bạn hiểu và biết cách điều chỉnh năng lượng, tần số rung động của chính mình, bạn sẽ thu hút những điều tương đồng, từ đó thay đổi cục diện cuộc đời.
                </p>
              </div>

              {/* External Cosmic Earth Image (5 cols) */}
              <div className="lg:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85"
                  alt="Trái Đất và tần số năng lượng vũ trụ"
                  className="w-full aspect-16/10 object-cover rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: 6 QUY LUẬT VŨ TRỤ */}
        <section id="sec-02" className="px-6 sm:px-12 py-16 sm:py-24 bg-[#FAFAFA] border-b border-gray-200 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1500&q=80"
            alt="Bầu trời sao vũ trụ"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none"
          />

          <div className="max-w-5xl mx-auto space-y-10 relative z-10">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className={`text-4xl font-bold text-[#FA5B13] ${headingClass}`}>02</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-be-vietnam">
                  Quy luật tất yếu
                </span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold text-gray-900 leading-snug ${headingClass}`}>
                Những Quy Luật Vận Hành Của Vũ trụ Ảnh Hưởng Đến Bạn
              </h2>
              <p className="text-gray-600 mt-2 text-base font-be-vietnam">
                Khi hiểu và ứng dụng các quy luật này, bạn có thể chủ động thay đổi vận mệnh thay vì bị động chờ đợi.
              </p>
            </div>

            {/* 6 Rules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Luật Hấp dẫn',
                  desc: 'Thu hút những điều tương đồng với tần số của bạn',
                  img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Quy luật Nhân quả',
                  desc: 'Mọi hành động đều tạo ra kết quả tương ứng',
                  img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Quy luật Năng lượng',
                  desc: 'Năng lượng luôn được bảo toàn và chuyển hóa',
                  img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Quy luật Tần số rung động',
                  desc: 'Cùng tần số sẽ gặp nhau',
                  img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Quy luật Âm Dương',
                  desc: 'Mọi thứ đều có hai mặt và luôn cân bằng',
                  img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Quy luật Thay đổi',
                  desc: 'Vũ trụ luôn vận động và bạn luôn có lựa chọn',
                  img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
                },
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:border-[#FA5B13] hover:shadow-lg transition-all overflow-hidden group"
                >
                  <img
                    src={rule.img}
                    alt={rule.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5 font-be-vietnam">
                    <h3 className="font-bold text-gray-900 text-2xl mb-1.5 group-hover:text-[#FA5B13] transition-colors font-writing-title">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-be-vietnam">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03: BA GÓC NHÌN CÙNG CHUNG MỘT CHÂN LÝ */}
        <section id="sec-03" className="px-6 sm:px-12 py-16 sm:py-24 border-b border-gray-200 bg-white relative">
          <div className="max-w-5xl mx-auto space-y-10 relative z-10">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className={`text-4xl font-bold text-[#FA5B13] ${headingClass}`}>03</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-be-vietnam">
                  Hội tụ minh triết
                </span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold text-gray-900 leading-snug ${headingClass}`}>
                Ba Góc Nhìn Cùng Chung Một Chân Lý
              </h2>
              <p className="text-gray-600 mt-2 text-base font-be-vietnam">
                Dù ở tôn giáo hay khoa học, các bậc minh triết đều chỉ ra rằng thế giới này là sự vận hành của năng lượng và tần số rung động.
              </p>
            </div>

            {/* 3 Perspectives Cards with User Uploaded Images: Đức Phật Thích Ca Mâu Ni, Chúa Jesus, Albert Einstein */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. PHẬT GIÁO - Đức Phật Thích Ca Mâu Ni */}
              <div className="rounded-2xl bg-[#FFF9F5] border border-[#FFD8C2] overflow-hidden flex flex-col justify-between group shadow-xs">
                <div>
                  <div className="overflow-hidden">
                    <img
                      src="/assets/aistudio/image_17712691.png"
                      alt="Đức Phật Thích Ca Mâu Ni"
                      className="w-full h-80 sm:h-96 object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3 font-be-vietnam">
                    <h3 className={`text-3xl sm:text-4xl font-bold text-gray-900 ${headingClass}`}>Phật Giáo</h3>
                    <div className="space-y-1.5 text-sm text-gray-700 leading-relaxed font-be-vietnam">
                      <p>Tâm tạo cảnh.</p>
                      <p>Nghiệp tạo vận mệnh.</p>
                      <p>Chuyển hóa từ bên trong thì cuộc sống sẽ thay đổi.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CÔNG GIÁO - Chúa Jesus */}
              <div className="rounded-2xl bg-[#F0F7FF] border border-[#C0E5F7] overflow-hidden flex flex-col justify-between group shadow-xs">
                <div>
                  <div className="overflow-hidden">
                    <img
                      src="/assets/aistudio/image_d4bd035b.png"
                      alt="Chúa Jesus"
                      className="w-full h-80 sm:h-96 object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3 font-be-vietnam">
                    <h3 className={`text-3xl sm:text-4xl font-bold text-gray-900 ${headingClass}`}>Công Giáo</h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-be-vietnam">
                      Đức tin, yêu thương và sống thiện lành sẽ mở ra những cơ hội và bình an trong cuộc sống.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. KHOA HỌC - Albert Einstein */}
              <div className="rounded-2xl bg-[#F4F6F8] border border-[#B8CCD7] overflow-hidden flex flex-col justify-between group shadow-xs">
                <div>
                  <div className="overflow-hidden">
                    <img
                      src="/assets/aistudio/image_77fd1b77.png"
                      alt="Albert Einstein"
                      className="w-full h-80 sm:h-96 object-cover object-[center_14%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3 font-be-vietnam">
                    <h3 className={`text-3xl sm:text-4xl font-bold text-gray-900 ${headingClass}`}>Khoa Học</h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-be-vietnam">
                      Mọi thứ trong vũ trụ, kể cả con người, đều là năng lượng và rung động ở những tần số khác nhau.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Banner */}
            <div className={`p-6 sm:p-8 rounded-2xl bg-[#1E3D59] text-white text-center text-xl sm:text-2xl ${headingClass} leading-relaxed shadow-lg relative overflow-hidden`}>
              <p className="relative z-10">
                “Khi bạn thay đổi tần số rung động, bạn sẽ thu hút những điều tương đồng và tạo ra những thay đổi lớn trong cuộc sống.”
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04: GIẢI MÃ LÁ SỐ TỬ VI */}
        <section id="sec-04" className="px-6 sm:px-12 py-16 sm:py-24 bg-[#FAFAFA] border-b border-gray-200 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
            alt="Bầu trời đêm"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
          />

          <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className={`text-4xl font-bold text-[#FA5B13] ${headingClass}`}>04</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-be-vietnam">
                  Làm chủ số phận
                </span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold text-gray-900 leading-snug ${headingClass}`}>
                Tại Sao Có Người Cùng Lá Số Tử Vi Như Nhau Nhưng Cuộc Đời Lại Khác Biệt?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text analysis (7 cols) */}
              <div className="lg:col-span-7 space-y-5 font-be-vietnam">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 text-base text-gray-700 leading-relaxed space-y-3 shadow-xs">
                  <p>
                    Lá số tử vi và số phận là có thật, nhưng nó chỉ đúng nhiều đối với những người sống phó mặc cho hoàn cảnh cuộc sống.
                  </p>
                  <p className="font-semibold text-gray-900">
                    Còn những người thay đổi tư duy, làm chủ năng lượng, rèn luyện thói quen và hành động tích cực thì sẽ không bị ảnh hưởng nhiều bởi lá số tử vi hay số phận, thậm chí còn chuyển hóa được những vận hạn.
                  </p>
                </div>

                {/* 6 Lợi ích */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-be-vietnam">
                    KHI HIỂU ĐÚNG VÀ ỨNG DỤNG, BẠN CÓ THỂ:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Cải thiện sức khỏe', icon: '❤️' },
                      { label: 'Thu hút tài chính', icon: '💰' },
                      { label: 'Xây dựng mối quan hệ tốt đẹp', icon: '🤝' },
                      { label: 'Bình an nội tâm', icon: '🕊️' },
                      { label: 'Hóa giải vận hạn', icon: '🛡️' },
                      { label: 'Kiến tạo cuộc sống như ý', icon: '✨' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3.5 bg-white rounded-xl border border-gray-200 font-semibold text-xs sm:text-sm text-gray-800 shadow-xs font-be-vietnam"
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={goToBando}
                    className="px-6 py-3.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2 cursor-pointer transition-transform active:scale-95 font-be-vietnam"
                  >
                    <Compass className="w-4 h-4" />
                    <span>KHẢO SÁT BẢN ĐỒ NGAY &gt;</span>
                  </button>
                </div>
              </div>

              {/* External Destiny Image (5 cols) */}
              <div className="lg:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85"
                  alt="Làm chủ số phận và kiến tạo cuộc sống"
                  className="w-full aspect-4/5 object-cover rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: GIÁ TRỊ NHẬN ĐƯỢC TỪ BẢN ĐỒ HẠNH PHÚC */}
        <section id="sec-05" className="px-6 sm:px-12 py-16 sm:py-24 bg-gradient-to-b from-white via-[#FFF9F5] to-white border-b border-gray-200 relative">
          <div className="max-w-5xl mx-auto space-y-12 relative z-10">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className={`text-4xl font-bold text-[#FA5B13] ${headingClass}`}>05</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-be-vietnam">
                  KHẢO SÁT BẢN ĐỒ HẠNH PHÚC
                </span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold text-gray-900 leading-snug ${headingClass}`}>
                Nếu Bạn Làm Khảo Sát, Bạn Sẽ Nhận Được Điều Gì?
              </h2>
              <p className="text-gray-600 mt-3 text-base sm:text-lg font-be-vietnam max-w-3xl leading-relaxed">
                Chỉ khoảng <strong>5–7 phút</strong> tĩnh tâm nhìn lại chính mình, bạn sẽ nhận được một bản đồ định hướng may đo riêng cho cuộc đời của bạn và gia đình:
              </p>
            </div>

            {/* 4 Giá Trị Nhận Được Khi Khảo Sát */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  number: '01',
                  title: 'Đo Lường Chuẩn Xác 8 Khía Cạnh Cuộc Đời',
                  subtitle: 'Bánh Xe Hạnh Phúc Toàn Diện',
                  desc: 'Trực quan hóa điểm số thực tế trên biểu đồ Radar: Sức khỏe, Gia đình, Tài chính, Sự nghiệp, Mối quan hệ, Phát triển bản thân, Tinh thần nội tâm và Đóng góp xã hội. Nhìn rõ ngay điểm tựa năng lượng mạnh nhất và điểm nghẽn cốt lõi đang kìm hãm bạn.',
                  tag: 'Bánh xe hạnh phúc',
                },
                {
                  number: '02',
                  title: 'Giải Mã Bản Mệnh, Tử Vi & Tần Số Năng Lượng',
                  subtitle: 'Theo Ngày Tháng Năm Sinh & Giờ Sinh',
                  desc: 'Tính toán chính xác Can Chi năm sinh, Ngũ Hành Nạp Âm, Cung Phi Bát Trạch (Đông / Tây Tứ Mệnh) và Con số đường đời Thần số học. Giúp bạn thấu hiểu điểm mạnh thiên bẩm, bài học số mệnh và cách đón nhận cơ hội thuận theo tự nhiên.',
                  tag: 'Tử vi & Thần số học',
                },
                {
                  number: '03',
                  title: 'Phương Pháp Dung Hòa & Gắn Kết Gia Đình',
                  subtitle: 'Thấu Hiểu Tương Quan Năng Lượng',
                  desc: 'Nhận diện sự tương thích năng lượng giữa bạn và những người thân yêu (vợ/chồng, con cái, cha mẹ). Cung cấp giải pháp giao tiếp, lắng nghe và chuyển hóa mâu thuẫn để kiến tạo tổ ấm hòa thuận, yêu thương.',
                  tag: 'Gắn kết người thân',
                },
                {
                  number: '04',
                  title: 'Giải Pháp Hóa Giải Rào Cản & Hành Động 90 Ngày',
                  subtitle: 'Lộ Trình Cá Nhân Hóa Dành Riêng Cho Bạn',
                  desc: 'Định vị lĩnh vực ưu tiên cải thiện cấp thiết nhất trong 90 ngày tới. Nhận diện các rào cản vô thức (thời gian, tài chính, thói quen cũ) và nhận bản báo cáo giải pháp chi tiết gửi trực tiếp về Zalo/Email/Messenger trong 24h.',
                  tag: 'Kế hoạch chuyển hóa',
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group font-be-vietnam relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF0E6] text-[#FA5B13] border border-[#FFD8C2]">
                        {item.tag}
                      </span>
                      <span className={`text-2xl font-bold text-gray-300 group-hover:text-[#FA5B13] transition-colors ${headingClass}`}>
                        {item.number}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-bold text-gray-900 text-xl sm:text-2xl leading-snug ${headingClass}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#FA5B13] mt-1 uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-be-vietnam">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Ngay Dưới Section 05 */}
            <div className="pt-4 text-center">
              <button
                onClick={goToBando}
                className="w-full sm:w-auto px-10 py-4.5 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer font-be-vietnam"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>KHẢO SÁT BẢN ĐỒ NGAY &gt;</span>
              </button>
              <p className="text-xs text-gray-500 mt-2.5 font-medium">
                * Hoàn toàn miễn phí · Nhận ngay kết quả phân tích sơ bộ & báo cáo chuyên sâu
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 06: LỜI KẾT & KÊU GỌI HÀNH ĐỘNG */}
        <section id="sec-06" className="px-6 sm:px-12 py-20 sm:py-28 bg-[#191A23] text-white relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
            alt="Bình minh mới"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity pointer-events-none"
          />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-normal leading-snug text-white max-w-3xl mx-auto ${headingClass} [text-wrap:balance]`}>
              “Mỗi ngày là một lựa chọn, và bạn luôn có quyền thay đổi cuộc đời mình!”
            </h2>

            <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed font-be-vietnam">
              Chỉ cần một hành động nhỏ, bạn có thể mở ra những thay đổi lớn cho cuộc sống của mình.
            </p>

            <div className="pt-2">
              <button
                onClick={goToBando}
                className="px-10 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold text-base rounded-2xl shadow-2xl inline-flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer font-be-vietnam"
              >
                <Compass className="w-5 h-5" />
                <span>KHẢO SÁT BẢN ĐỒ NGAY &gt;</span>
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 sm:px-12 py-10 bg-white border-t border-gray-200 font-be-vietnam">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#FA5B13] stroke-[2.3]" />
              <span className={`font-bold text-[#FA5B13] ${headingClass} text-xl`}>Dũng Gieo Hạt</span>
              <span>© Straightforward Guidelines. All Rights Reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollTo('sec-01')} className="hover:text-black cursor-pointer">
                Lên đầu trang
              </button>
              <button onClick={goToBando} className="hover:text-black cursor-pointer">
                Khảo sát Bản Đồ ngay
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* POPUP MODAL ĐIỀN THÔNG TIN NHẬN QUÀ */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => {
          setIsRegisterOpen(false);
          setIsThankYouOpen(true);
        }}
      />
    </div>
  );
};
