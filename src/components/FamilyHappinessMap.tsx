import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sprout,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Volume1,
  VolumeX,
  Plus,
} from 'lucide-react';

interface FamilyMember {
  name: string;
  relationship: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ' | '';
}

interface FormData {
  // Trang 2: Về bạn
  fullName: string;
  birthDate: string;
  birthTime: string;
  gender: 'Nam' | 'Nữ' | '';
  city: string;
  occupation: string;

  // Trang 3: Gia đình
  familyTime: string;
  includeRelatives: boolean;
  relatives: FamilyMember[];

  // Trang 4: Bánh xe hạnh phúc (1-10)
  wheelScores: {
    health: number;
    family: number;
    finance: number;
    career: number;
    relationships: number;
    selfDevelopment: number;
    spirituality: number;
    community: number;
  };

  // Trang 5: Điều mong muốn
  priorityArea: string;
  desireChange: string;
  obstacles: string[];
  obstacleOther: string;
  supportMethods: string[];

  // Trang 6: Nhận bản đồ
  phone: string;
  email: string;
  deliveryChannels: string[];
  consent: boolean;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  birthDate: '',
  birthTime: '',
  gender: '',
  city: '',
  occupation: '',
  familyTime: '',
  includeRelatives: false,
  relatives: [],
  wheelScores: {
    health: 7,
    family: 7,
    finance: 6,
    career: 6,
    relationships: 7,
    selfDevelopment: 6,
    spirituality: 6,
    community: 5,
  },
  priorityArea: 'Sức Khỏe',
  desireChange: '',
  obstacles: [],
  obstacleOther: '',
  supportMethods: [],
  phone: '',
  email: '',
  deliveryChannels: ['Zalo'],
  consent: false,
};

const LIFE_AREAS = [
  { key: 'health', num: '01', label: 'Sức Khỏe', desc: 'Thể chất, năng lượng và thói quen chăm sóc cơ thể' },
  { key: 'family', num: '02', label: 'Gia Đình', desc: 'Sự thấu hiểu, gắn kết và thời gian bên người thân' },
  { key: 'finance', num: '03', label: 'Tài Chính', desc: 'Thu nhập, chi tiêu, tích lũy và sự an tâm tài chính' },
  { key: 'career', num: '04', label: 'Sự Nghiệp', desc: 'Sự hài lòng, thu nhập xứng đáng và lộ trình phát triển' },
  { key: 'relationships', num: '05', label: 'Mối Quan Hệ', desc: 'Bạn bè, đối tác, sự tôn trọng và đồng hành' },
  { key: 'selfDevelopment', num: '06', label: 'Phát Triển Bản Thân', desc: 'Học hỏi điều mới, rèn tư duy và tiến bộ mỗi ngày' },
  { key: 'spirituality', num: '07', label: 'Tinh Thần & Nội Tâm', desc: 'Sự an yên, cân bằng cảm xúc và làm chủ tâm trí' },
  { key: 'community', num: '08', label: 'Đóng Góp Xã Hội', desc: 'Trao đi giá trị, giúp đỡ người khác và phụng sự' },
];

const OBSTACLE_OPTIONS = [
  'Thiếu thời gian',
  'Thiếu kiến thức',
  'Thiếu người đồng hành',
  'Thiếu tài chính',
  'Chưa biết bắt đầu từ đâu',
  'Khó duy trì thói quen',
  'Chưa có phương pháp phù hợp',
];

const SUPPORT_OPTIONS = [
  'Tài liệu hướng dẫn chuyên sâu',
  'Video ngắn dễ hiểu, dễ áp dụng',
  'File âm thanh thiền & nghe mỗi ngày',
  'Bài tập thực hành rèn luyện từng bước',
  'Cộng đồng học tập cùng nhau tốt lên',
  'Buổi chia sẻ Zoom trực tiếp từ thầy Dũng',
  'Được đồng hành, cố vấn riêng',
];

// Hình ảnh nền authentic chất lượng cao cho từng bước
const STEP_BACKGROUNDS: Record<number, { url: string; quote: string }> = {
  1: {
    // Bước 1: Khởi đầu, ánh bình minh ấm áp bước đi cùng nhau
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=85',
    quote: '“Hiểu được người là khôn ngoan, hiểu được chính mình là giác ngộ.”',
  },
  2: {
    // Bước 2: Nhìn lại bản thân, mặt hồ tĩnh lặng lúc rạng đông
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=85',
    quote: '“Khi bạn thấu hiểu chính mình, mọi quyết định trong cuộc đời đều trở nên rõ ràng.”',
  },
  3: {
    // Bước 3: Gia đình yêu thương, vòng tay ấm áp
    url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=2000&q=85',
    quote: '“Gia đình là nơi cuộc sống bắt đầu và tình yêu không bao giờ kết thúc.”',
  },
  4: {
    // Bước 4: Vũ trụ, hành tinh và sự cân bằng tròn đầy của 8 nan hoa
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=85',
    quote: '“Bánh xe chỉ có thể lăn xa khi mọi nan hoa đều cân bằng và tròn đầy.”',
  },
  5: {
    // Bước 5: Chân trời mới, ánh nắng xuyên mây đón nhận sự thay đổi
    url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=2000&q=85',
    quote: '“Chỉ cần bạn có mong muốn thay đổi, vũ trụ sẽ mở ra những con đường mới.”',
  },
  6: {
    // Bước 6: Bầu trời đầy sao, định vị số phận & hạt mầm tương lai
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85',
    quote: '“Mỗi hạt mầm bạn gieo hôm nay sẽ nảy nở thành cây đời hạnh phúc ngày mai.”',
  },
  7: {
    // Bước hoàn tất: Tương lai được tạo ra bởi những gì bạn làm hôm nay
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85',
    quote: '“Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”',
  },
};

// Helper tính con số chủ đạo thần số học
function calculateLifePath(birthDateStr: string): number {
  if (!birthDateStr) return 0;
  const digits = birthDateStr.replace(/\D/g, '').split('').map(Number);
  if (digits.length < 8) return 0;
  let sum = digits.reduce((acc, d) => acc + d, 0);
  while (sum > 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').map(Number).reduce((acc, d) => acc + d, 0);
  }
  return sum;
}

// 3 mức âm lượng: Vừa (medium ~ 0.35), Nhỏ (low ~ 0.15), Tắt (mute = 0)
type VolumeLevel = 'medium' | 'low' | 'mute';

const VOLUME_VALUES: Record<VolumeLevel, number> = {
  medium: 0.35,
  low: 0.15,
  mute: 0,
};

export const FamilyHappinessMap: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Âm lượng 3 mức độ: Vừa -> Nhỏ -> Tắt (chỉ icon loa, không có chữ)
  const [volumeLevel, setVolumeLevel] = useState<VolumeLevel>('medium');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo và phát nhạc Piano thiền chill thực thụ
  useEffect(() => {
    const audio = new Audio('/audio/meditation-piano.mp3');
    audio.loop = true;
    audio.volume = VOLUME_VALUES.medium;
    audioRef.current = audio;

    // 1. Cố gắng tự động phát ngay khi vào trang
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Trình duyệt chặn autoplay khi chưa có tương tác -> bật ngay khi người dùng chạm/click/cuộn
        const enableAudioOnGesture = () => {
          if (audioRef.current && volumeLevel !== 'mute') {
            audioRef.current.play().catch(() => {});
          }
          window.removeEventListener('click', enableAudioOnGesture);
          window.removeEventListener('touchstart', enableAudioOnGesture);
          window.removeEventListener('scroll', enableAudioOnGesture);
          window.removeEventListener('keydown', enableAudioOnGesture);
        };

        window.addEventListener('click', enableAudioOnGesture, { once: true });
        window.addEventListener('touchstart', enableAudioOnGesture, { once: true });
        window.addEventListener('scroll', enableAudioOnGesture, { once: true });
        window.addEventListener('keydown', enableAudioOnGesture, { once: true });
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Chuyển đổi 3 mức độ âm lượng: Vừa -> Nhỏ -> Tắt -> Vừa
  const cycleVolume = () => {
    let nextLevel: VolumeLevel;
    if (volumeLevel === 'medium') {
      nextLevel = 'low';
    } else if (volumeLevel === 'low') {
      nextLevel = 'mute';
    } else {
      nextLevel = 'medium';
    }

    setVolumeLevel(nextLevel);

    if (audioRef.current) {
      if (nextLevel === 'mute') {
        audioRef.current.muted = true;
        audioRef.current.volume = 0;
      } else {
        audioRef.current.muted = false;
        audioRef.current.volume = VOLUME_VALUES[nextLevel];
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, isCompleted]);

  const headingClass = 'font-playfair-heading italic font-medium';

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 2) {
      if (!formData.fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên đầy đủ';
      if (!formData.birthDate) errs.birthDate = 'Vui lòng chọn ngày tháng năm sinh';
      if (!formData.gender) errs.gender = 'Vui lòng chọn giới tính';
      if (!formData.city.trim()) errs.city = 'Vui lòng nhập tỉnh/thành phố';
      if (!formData.occupation.trim()) errs.occupation = 'Vui lòng nhập công việc hiện tại';
    }

    if (step === 3) {
      if (!formData.familyTime) errs.familyTime = 'Vui lòng chọn mức độ thời gian cùng gia đình';
      if (formData.includeRelatives) {
        if (formData.relatives.length === 0) {
          errs.relatives = 'Vui lòng thêm ít nhất một người thân hoặc chọn "Không"';
        } else {
          formData.relatives.forEach((rel, idx) => {
            if (!rel.name.trim()) errs[`rel_name_${idx}`] = 'Vui lòng nhập tên người thân';
            if (!rel.relationship.trim()) errs[`rel_rel_${idx}`] = 'Vui lòng nhập mối quan hệ';
            if (!rel.birthDate) errs[`rel_dob_${idx}`] = 'Vui lòng chọn ngày sinh';
            if (!rel.gender) errs[`rel_gender_${idx}`] = 'Vui lòng chọn giới tính';
          });
        }
      }
    }

    if (step === 5) {
      if (!formData.priorityArea) errs.priorityArea = 'Vui lòng chọn một lĩnh vực ưu tiên';
    }

    if (step === 6) {
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!formData.phone.trim()) {
        errs.phone = 'Vui lòng nhập số điện thoại hoặc Zalo';
      } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
        errs.phone = 'Số điện thoại chưa đúng định dạng Việt Nam';
      }

      if (formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          errs.email = 'Email chưa đúng định dạng';
        }
      }

      if (formData.deliveryChannels.length === 0) {
        errs.deliveryChannels = 'Vui lòng chọn ít nhất một kênh nhận bản đồ';
      }

      if (!formData.consent) {
        errs.consent = 'Vui lòng xác nhận đồng ý để hệ thống lập bản đồ';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyVvzC75rDJbWAJ-J-xHxG34x0MAsrJvvFAfnNKh_0PVN7YfqK9y1ttFKYHoZtKYzVghA/exec';
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.fullName.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('type', 'BAN_DO_HANH_PHUC_GIA_DINH');

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formDataToSend.toString(),
      });
    } catch (err) {
      console.log('Submission note:', err);
    } finally {
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  };

  const addRelative = () => {
    if (formData.relatives.length < 3) {
      setFormData({
        ...formData,
        relatives: [
          ...formData.relatives,
          { name: '', relationship: '', birthDate: '', gender: '' },
        ],
      });
    }
  };

  const removeRelative = (index: number) => {
    setFormData({
      ...formData,
      relatives: formData.relatives.filter((_, i) => i !== index),
    });
  };

  const updateRelative = (index: number, field: keyof FamilyMember, val: string) => {
    const updated = [...formData.relatives];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, relatives: updated });
  };

  const toggleObstacle = (item: string) => {
    const exists = formData.obstacles.includes(item);
    setFormData({
      ...formData,
      obstacles: exists
        ? formData.obstacles.filter((x) => x !== item)
        : [...formData.obstacles, item],
    });
  };

  const toggleSupport = (item: string) => {
    const exists = formData.supportMethods.includes(item);
    setFormData({
      ...formData,
      supportMethods: exists
        ? formData.supportMethods.filter((x) => x !== item)
        : [...formData.supportMethods, item],
    });
  };

  const toggleChannel = (channel: string) => {
    const exists = formData.deliveryChannels.includes(channel);
    setFormData({
      ...formData,
      deliveryChannels: exists
        ? formData.deliveryChannels.filter((c) => c !== channel)
        : [...formData.deliveryChannels, channel],
    });
  };

  const userLifePath = useMemo(() => calculateLifePath(formData.birthDate), [formData.birthDate]);

  const radarPoints = useMemo(() => {
    const scores = [
      formData.wheelScores.health,
      formData.wheelScores.family,
      formData.wheelScores.finance,
      formData.wheelScores.career,
      formData.wheelScores.relationships,
      formData.wheelScores.selfDevelopment,
      formData.wheelScores.spirituality,
      formData.wheelScores.community,
    ];

    const center = 150;
    const maxRadius = 115;
    const total = scores.length;

    return scores
      .map((val, idx) => {
        const angle = (Math.PI * 2 / total) * idx - Math.PI / 2;
        const radius = (val / 10) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  }, [formData.wheelScores]);

  const activeBgInfo = STEP_BACKGROUNDS[isCompleted ? 7 : currentStep] || STEP_BACKGROUNDS[1];

  return (
    <div className="relative min-h-screen text-white font-be-vietnam antialiased flex flex-col selection:bg-[#FA5B13] selection:text-white bg-neutral-950">
      {/* ======================================================== */}
      {/* BACKGROUND ĐÍCH THỰC (AUTHENTIC PHOTOGRAPHY) + DARK TRANSPARENCY */}
      {/* ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {Object.entries(STEP_BACKGROUNDS).map(([k, item]) => {
          const active = isCompleted ? k === '7' : Number(k) === currentStep;
          return (
            <img
              key={k}
              src={item.url}
              alt=""
              loading="eager"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-600 ease-in-out ${
                active ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          );
        })}
        {/* Lớp phủ Dark Transparency calibrated (50% - 55% đen mờ):
            Cho phép thấy rõ ràng hình ảnh thiên nhiên, bình minh, gia đình, vũ trụ đằng sau
            đồng thời giữ độ tương phản cao giúp chữ trắng và các nút cam hiển thị sắc nét */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
      </div>

      {/* ======================================================== */}
      {/* HEADER LIỀN MẠCH TRÊN NỀN DARK TRANSPARENCY */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-30 bg-black/35 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-3">
          {/* Logo brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FA5B13]/20 flex items-center justify-center text-[#FA5B13] border border-[#FA5B13]/40">
              <Sprout className="w-5 h-5 text-[#FA5B13] stroke-[2.3]" />
            </div>
            <div>
              <span className={`text-xl sm:text-2xl text-white tracking-tight leading-none block ${headingClass}`}>
                Dũng Gieo Hạt
              </span>
              <span className="text-xs sm:text-sm text-white font-medium tracking-wide">
                Bản Đồ Hạnh Phúc Gia Đình
              </span>
            </div>
          </div>

          {/* Right controls: Loa 3 mức độ (Vừa / Nhỏ / Tắt) + Tiến trình */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Nút loa 3 mức độ (Vừa -> Nhỏ -> Tắt mute, chỉ icon loa, không có chữ) */}
            <button
              type="button"
              onClick={cycleVolume}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border shadow-sm ${
                volumeLevel === 'medium'
                  ? 'bg-[#FA5B13]/30 text-[#FFA877] border-[#FA5B13] shadow-md ring-2 ring-[#FA5B13]/40'
                  : volumeLevel === 'low'
                  ? 'bg-white/20 text-white border-white/40 hover:bg-white/30'
                  : 'bg-white/10 text-white/80 border-white/25 hover:bg-white/20'
              }`}
              title={
                volumeLevel === 'medium'
                  ? 'Âm lượng vừa (Bấm để giảm nhỏ)'
                  : volumeLevel === 'low'
                  ? 'Âm lượng nhỏ (Bấm để tắt âm)'
                  : 'Đang tắt âm (Bấm để bật âm lượng vừa)'
              }
              aria-label={`Âm lượng: ${volumeLevel === 'medium' ? 'Vừa' : volumeLevel === 'low' ? 'Nhỏ' : 'Tắt tiếng'}`}
            >
              {volumeLevel === 'medium' && <Volume2 className="w-5 h-5 text-[#FFA877]" />}
              {volumeLevel === 'low' && <Volume1 className="w-5 h-5 text-white" />}
              {volumeLevel === 'mute' && <VolumeX className="w-5 h-5 text-white/80" />}
            </button>

            {/* Step progress */}
            {!isCompleted && (
              <div className="hidden sm:flex items-center gap-2.5">
                <span className="text-sm font-bold text-white">
                  {currentStep}/6
                </span>
                <div className="w-24 bg-white/25 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#FA5B13] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile progress bar */}
        {!isCompleted && (
          <div className="sm:hidden w-full bg-white/15 h-1.5">
            <div
              className="bg-[#FA5B13] h-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* LINEAR PAGE CONTENT - CHỮ LỚN RÕ RÀNG CHO NGƯỜI LỚN */}
      {/* ======================================================== */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* DÒNG TRÍCH DẪN DANCING SCRIPT TRÊN NỀN ẢNH VŨ TRỤ/THIÊN NHIÊN (CHỮ LỚN) */}
        <div key={`quote-${isCompleted ? 7 : currentStep}`} className="mb-8 pb-4 border-b border-white/15 text-center sm:text-left animate-fade">
          <p className="font-dancing-script text-2xl sm:text-3xl text-[#FFA877] leading-relaxed [text-wrap:balance] drop-shadow-md">
            {activeBgInfo.quote}
          </p>
        </div>

        {/* VIEW KHI HOÀN TẤT */}
        {isCompleted ? (
          <div className="space-y-10 animate-fade">
            {/* Header Result */}
            <div className="space-y-3.5">
              <div className="flex items-baseline gap-2.5">
                <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>✓</span>
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                  HOÀN TẤT KHẢO SÁT
                </span>
              </div>
              <h1 className={`text-2xl sm:text-4xl text-white leading-[1.3] ${headingClass} [text-wrap:balance]`}>
                <span className="block">Bản Đồ Hạnh Phúc Của Bạn</span>
                <span className="block text-[#FA5B13] mt-1 not-italic font-bold font-be-vietnam">
                  Đã Được Tạo Thành Công!
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white leading-relaxed font-normal pt-1">
                Cảm ơn bạn <strong className="font-bold text-white">{formData.fullName}</strong> đã dành thời gian nhìn lại chính mình và gia đình.
              </p>
            </div>

            {/* Radar Diagram & Analysis */}
            <div className="py-6 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="relative w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] shrink-0 mx-auto">
                <svg width="280" height="280" viewBox="0 0 300 300" className="overflow-visible">
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, lIdx) => {
                    const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                      const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
                      const r = 115 * level;
                      return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                    }).join(' ');
                    return (
                      <polygon
                        key={lIdx}
                        points={pts}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.18)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
                    const x2 = 150 + 115 * Math.cos(angle);
                    const y2 = 150 + 115 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="150"
                        y1="150"
                        x2={x2}
                        y2={y2}
                        stroke="rgba(255, 255, 255, 0.18)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  <polygon
                    points={radarPoints}
                    fill="rgba(250, 91, 19, 0.35)"
                    stroke="#FA5B13"
                    strokeWidth="2.5"
                  />

                  {LIFE_AREAS.map((area, i) => {
                    const score = formData.wheelScores[area.key as keyof typeof formData.wheelScores];
                    const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
                    const r = (score / 10) * 115;
                    const x = 150 + r * Math.cos(angle);
                    const y = 150 + r * Math.sin(angle);
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="#FFFFFF"
                        stroke="#FA5B13"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Linear Breakdown List (Chữ lớn rõ ràng) */}
              <div className="w-full space-y-3">
                {LIFE_AREAS.map((area) => {
                  const score = formData.wheelScores[area.key as keyof typeof formData.wheelScores];
                  return (
                    <div key={area.key} className="flex items-center justify-between py-2 border-b border-white/10 text-sm sm:text-base">
                      <span className="text-white font-medium truncate pr-2">{area.label}</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="w-24 sm:w-28 bg-white/15 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#FA5B13] h-full rounded-full"
                            style={{ width: `${score * 10}%` }}
                          />
                        </div>
                        <span className="font-bold text-white w-9 text-right text-sm sm:text-base">
                          {score}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NUMEROLOGY LIFE PATH */}
            {userLifePath > 0 && (
              <div className="space-y-3.5 py-5 p-6 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md">
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest block">
                  THẦN SỐ HỌC & TẦN SỐ NĂNG LƯỢNG
                </span>
                
                {/* Tiêu đề kết hợp badge non-breaking Số 9 */}
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3 className={`text-2xl sm:text-3xl text-white font-bold ${headingClass}`}>
                    Con Số Đường Đời Của Bạn:
                  </h3>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FA5B13] text-white border border-[#FA5B13] font-be-vietnam font-bold text-lg sm:text-xl whitespace-nowrap shadow-md">
                    Số&nbsp;{userLifePath}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
                  Năng lượng ngày sinh {formData.birthDate} cho thấy bạn mang bài học đường đời số {userLifePath} với những tiềm năng phát triển và sự gắn kết gia đình. Bản phân tích đầy đủ và chi tiết sẽ được gửi trực tiếp đến bạn qua{' '}
                  <strong className="text-white font-bold">{formData.deliveryChannels.join(', ')}</strong> ({formData.phone}).
                </p>
              </div>
            )}

            {/* Next Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://zalo.me/g/a2y2x036pqkwzig7u9ri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95"
              >
                <span>Vào Nhóm Zalo Nhận Bản Đồ Đầy Đủ</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        ) : (
          /* LINEAR MULTI-STEP QUESTIONS - CHỮ LỚN RÕ RÀNG */
          <div className="space-y-10">
            {/* TRANG 1: GIỚI THIỆU */}
            {currentStep === 1 && (
              <div key="step-1" className="space-y-8 animate-fade">
                <div className="space-y-3.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>01</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      BẮT ĐẦU KHẢO SÁT
                    </span>
                  </div>
                  <h1 className={`text-2xl sm:text-4xl text-white leading-[1.3] ${headingClass} [text-wrap:balance]`}>
                    <span className="block">Bản Đồ Hạnh Phúc Gia Đình:</span>
                    <span className="block text-[#FFA877] mt-1">Khám Phá Bản Thân & Kết Nối</span>
                  </h1>
                  <p className="text-base sm:text-lg text-white leading-relaxed font-normal pt-1">
                    Chỉ khoảng <strong>5–7 phút</strong> suy ngẫm chân thật, bạn sẽ nhận được một bản đồ được may đo riêng:
                  </p>
                </div>

                <div className="space-y-4 py-5 border-y border-white/15 text-base sm:text-lg text-white">
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA5B13] font-bold text-lg leading-none mt-1">•</span>
                    <span><strong>Bánh xe hạnh phúc:</strong> Đo lường chính xác 8 khía cạnh cốt lõi trong đời sống.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA5B13] font-bold text-lg leading-none mt-1">•</span>
                    <span><strong>Tử vi & Thần số học:</strong> Nhận diện tần số năng lượng và bài học cuộc đời theo ngày sinh.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FA5B13] font-bold text-lg leading-none mt-1">•</span>
                    <span><strong>Gợi ý dung hòa gia đình:</strong> Phương pháp kết nối năng lượng giữa các thành viên.</span>
                  </div>
                </div>

                <p className="text-base text-white/95 italic font-medium">
                  * Không có câu trả lời đúng hay sai, bạn chỉ cần trả lời theo đúng cảm nhận chân thực nhất của mình.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95"
                  >
                    <span>Bắt Đầu Trả Lời</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* TRANG 2: VỀ BẠN */}
            {currentStep === 2 && (
              <div key="step-2" className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>02</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      THÔNG TIN CÁ NHÂN
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Một Chút Về Bạn
                  </h2>
                  <p className="text-base text-white pt-1 font-normal">
                    Ngày tháng năm sinh giúp AI tính toán chính xác phần Tử vi và Thần số học riêng cho bạn.
                  </p>
                </div>

                <div className="space-y-6 border-t border-white/15 pt-6">
                  {/* Họ tên */}
                  <div className="space-y-2">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      1. Họ và tên đầy đủ <span className="text-[#FA5B13]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn An"
                      className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/60"
                    />
                    {errors.fullName && <p className="text-sm text-red-300 font-medium">{errors.fullName}</p>}
                  </div>

                  {/* Ngày sinh & Giờ sinh */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-2">
                      <label className="block text-base sm:text-lg font-semibold text-white">
                        2. Ngày tháng năm sinh (Dương lịch) <span className="text-[#FA5B13]">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs [color-scheme:dark]"
                      />
                      {errors.birthDate && <p className="text-sm text-red-300 font-medium">{errors.birthDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-base sm:text-lg font-semibold text-white">
                        3. Giờ sinh <span className="text-white font-normal text-sm sm:text-base">(bỏ qua nếu không nhớ)</span>
                      </label>
                      <input
                        type="time"
                        value={formData.birthTime}
                        onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Giới tính */}
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      4. Giới tính <span className="text-[#FA5B13]">*</span>
                    </label>
                    <div className="flex gap-3">
                      {['Nam', 'Nữ'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g as 'Nam' | 'Nữ' })}
                          className={`px-8 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer border ${
                            formData.gender === g
                              ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30 scale-102'
                              : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <p className="text-sm text-red-300 font-medium">{errors.gender}</p>}
                  </div>

                  {/* Tỉnh thành */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      5. Tỉnh/Thành phố đang sinh sống <span className="text-[#FA5B13]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
                      className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/60"
                    />
                    {errors.city && <p className="text-sm text-red-300 font-medium">{errors.city}</p>}
                  </div>

                  {/* Công việc */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      6. Bạn hiện đang làm công việc gì? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="Kinh doanh, Tự do, Nghỉ hưu, Nội trợ, Văn phòng..."
                      className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/60"
                    />
                    {errors.occupation && <p className="text-sm text-red-300 font-medium">{errors.occupation}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* TRANG 3: GIA ĐÌNH BẠN */}
            {currentStep === 3 && (
              <div key="step-3" className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>03</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      GIA ĐÌNH & NGƯỜI THÂN
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Gia Đình Của Bạn
                  </h2>
                </div>

                <div className="space-y-8 border-t border-white/15 pt-6">
                  {/* Câu 7 */}
                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      7. Gia đình bạn có thường xuyên dành thời gian chất lượng cùng nhau không? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {['Thường xuyên', 'Thỉnh thoảng', 'Hiếm khi', 'Gần như không'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, familyTime: opt })}
                          className={`py-3.5 px-3 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer border text-center ${
                            formData.familyTime === opt
                              ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30 scale-102'
                              : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {errors.familyTime && <p className="text-sm text-red-300 font-medium">{errors.familyTime}</p>}
                  </div>

                  {/* Câu 8: Khai báo người thân */}
                  <div className="space-y-3 pt-3 border-t border-white/15">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      8. Bạn có muốn nhận thêm gợi ý kết nối cho những người thân đang sống cùng không? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <p className="text-base text-white font-normal">
                      Mỗi người chỉ cần 4 thông tin ngắn. Tối đa 3 người thân (vợ/chồng, con, cha/mẹ).
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            includeRelatives: true,
                            relatives: formData.relatives.length === 0 ? [{ name: '', relationship: '', birthDate: '', gender: '' }] : formData.relatives,
                          });
                        }}
                        className={`px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer border ${
                          formData.includeRelatives
                            ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30'
                            : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                        }`}
                      >
                        ✓ Có, thêm người thân
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, includeRelatives: false, relatives: [] })}
                        className={`px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer border ${
                          !formData.includeRelatives
                            ? 'bg-white/25 text-white border-white/40'
                            : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                        }`}
                      >
                        ✕ Không, chỉ cho mình tôi
                      </button>
                    </div>
                  </div>

                  {/* Danh sách người thân liền mạch */}
                  {formData.includeRelatives && (
                    <div className="space-y-6 pt-3">
                      {formData.relatives.map((rel, idx) => (
                        <div key={idx} className="space-y-3 pb-6 border-b border-white/15">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-wider text-[#FFA877]">
                              Người thân #{idx + 1}
                            </span>
                            {formData.relatives.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRelative(idx)}
                                className="text-sm text-white/80 hover:text-red-400 cursor-pointer underline"
                              >
                                Xóa
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <input
                              type="text"
                              value={rel.name}
                              onChange={(e) => updateRelative(idx, 'name', e.target.value)}
                              placeholder="Họ tên hoặc tên gọi..."
                              className="py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white bg-black/35 placeholder:text-white/60"
                            />
                            <input
                              type="text"
                              value={rel.relationship}
                              onChange={(e) => updateRelative(idx, 'relationship', e.target.value)}
                              placeholder="Quan hệ (Vợ/Chồng, Con, Cha/Mẹ...)"
                              className="py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white bg-black/35 placeholder:text-white/60"
                            />
                            <input
                              type="date"
                              value={rel.birthDate}
                              onChange={(e) => updateRelative(idx, 'birthDate', e.target.value)}
                              className="py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white bg-black/35 [color-scheme:dark]"
                            />
                            <div className="flex gap-2">
                              {['Nam', 'Nữ'].map((g) => (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => updateRelative(idx, 'gender', g)}
                                  className={`flex-1 py-2 rounded-xl border text-sm font-semibold cursor-pointer ${
                                    rel.gender === g
                                      ? 'bg-[#FA5B13] text-white border-[#FA5B13]'
                                      : 'border-white/30 text-white bg-black/30'
                                  }`}
                                >
                                  {g}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      {formData.relatives.length < 3 && (
                        <button
                          type="button"
                          onClick={addRelative}
                          className="text-sm sm:text-base font-semibold text-[#FFA877] hover:underline flex items-center gap-1.5 cursor-pointer pt-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Thêm một người thân nữa ({formData.relatives.length}/3)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TRANG 4: BÁNH XE HẠNH PHÚC (8 LĨNH VỰC) */}
            {currentStep === 4 && (
              <div key="step-4" className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>04</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      ĐÁNH GIÁ 8 KHÍA CẠNH
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Bánh Xe Hạnh Phúc Của Bạn
                  </h2>
                  <p className="text-base text-white pt-1 font-normal">
                    Hãy tự chấm mức độ hài lòng hiện tại của bạn từ 1 (rất chưa hài lòng) đến 10 (rất hài lòng).
                  </p>
                </div>

                <div className="divide-y divide-white/15 border-t border-white/15">
                  {LIFE_AREAS.map((area) => {
                    const currentScore = formData.wheelScores[area.key as keyof typeof formData.wheelScores];
                    return (
                      <div key={area.key} className="py-5 sm:py-6 space-y-3">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-white text-base sm:text-lg block truncate">
                              {area.label}
                            </span>
                            <p className="text-base text-white mt-0.5 font-normal leading-snug">
                              {area.desc}
                            </p>
                          </div>
                          <span className="font-bold text-base sm:text-lg text-[#FFA877] shrink-0">
                            {currentScore}&nbsp;/&nbsp;10
                          </span>
                        </div>

                        {/* 1 - 10 Selector Line (Mobile Friendly Touch, Ô Lớn Dễ Bấm) */}
                        <div className="grid grid-cols-10 gap-1.5 pt-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  wheelScores: {
                                    ...formData.wheelScores,
                                    [area.key]: num,
                                  },
                                });
                              }}
                              className={`h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center border ${
                                currentScore === num
                                  ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/40 font-extrabold scale-105'
                                  : 'bg-black/35 hover:bg-black/50 text-white border-white/30'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TRANG 5: ĐIỀU BẠN MONG MUỐN */}
            {currentStep === 5 && (
              <div key="step-5" className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>05</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      KỲ VỌNG & MỤC TIÊU
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Điều Bạn Mong Muốn Nhất
                  </h2>
                </div>

                <div className="space-y-8 border-t border-white/15 pt-6">
                  {/* Câu 17 */}
                  <div className="space-y-2.5">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      17. Nếu chỉ cải thiện một lĩnh vực trong 90 ngày tới, bạn sẽ chọn lĩnh vực nào? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <select
                      value={formData.priorityArea}
                      onChange={(e) => setFormData({ ...formData, priorityArea: e.target.value })}
                      className="w-full py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white bg-black/45 font-medium [color-scheme:dark]"
                    >
                      {LIFE_AREAS.map((a) => (
                        <option key={a.key} value={a.label} className="bg-[#141820] text-white py-2">
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Câu 18 */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      18. Nếu cuộc sống tốt hơn sau 90 ngày, bạn mong điều gì cụ thể sẽ thay đổi?{' '}
                      <span className="text-white font-normal text-sm sm:text-base">(không bắt buộc)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.desireChange}
                      onChange={(e) => setFormData({ ...formData, desireChange: e.target.value })}
                      placeholder="Chia sẻ mong ước của bạn..."
                      className="w-full py-3 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white bg-black/35 resize-none placeholder:text-white/60"
                    />
                  </div>

                  {/* Câu 19: Rào cản */}
                  <div className="space-y-3 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      19. Điều gì đang cản trở bạn thay đổi? <span className="text-white font-normal text-sm sm:text-base">(chọn nhiều)</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {OBSTACLE_OPTIONS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleObstacle(item)}
                          className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer border ${
                            formData.obstacles.includes(item)
                              ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30 scale-102'
                              : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Câu 20: Cách hỗ trợ */}
                  <div className="space-y-3 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      20. Bạn muốn được hỗ trợ theo cách nào? <span className="text-white font-normal text-sm sm:text-base">(chọn nhiều)</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {SUPPORT_OPTIONS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleSupport(item)}
                          className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all cursor-pointer border ${
                            formData.supportMethods.includes(item)
                              ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30 scale-102'
                              : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TRANG 6: NHẬN BẢN ĐỒ HẠNH PHÚC */}
            {currentStep === 6 && (
              <form key="step-6" onSubmit={handleSubmit} className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>06</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      BƯỚC CUỐI CÙNG
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Nhận Bản Đồ Hạnh Phúc Của Bạn
                  </h2>
                  <p className="text-base text-white pt-1 font-normal">
                    Bản đồ cá nhân hóa sẽ được chuyên gia và AI tổng hợp gửi qua kênh bạn chọn dưới đây.
                  </p>
                </div>

                <div className="space-y-7 border-t border-white/15 pt-6">
                  {/* SĐT / Zalo */}
                  <div className="space-y-2">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      21. Số điện thoại / Zalo để nhận báo cáo <span className="text-[#FA5B13]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901234567"
                      className="w-full py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white bg-black/35 placeholder:text-white/60"
                    />
                    {errors.phone && <p className="text-sm text-red-300 font-medium">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      22. Email <span className="text-white font-normal text-sm sm:text-base">(không bắt buộc)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ban@gmail.com"
                      className="w-full py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white bg-black/35 placeholder:text-white/60"
                    />
                    {errors.email && <p className="text-sm text-red-300 font-medium">{errors.email}</p>}
                  </div>

                  {/* Kênh nhận */}
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      23. Bạn muốn nhận bản đồ và tài liệu qua kênh nào? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Zalo', 'Email', 'Messenger', 'Chỉ nhận bản đồ'].map((channel) => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => toggleChannel(channel)}
                          className={`px-5 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all cursor-pointer border ${
                            formData.deliveryChannels.includes(channel)
                              ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-md shadow-[#FA5B13]/30 scale-102'
                              : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                          }`}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>
                    {errors.deliveryChannels && <p className="text-sm text-red-300 font-medium">{errors.deliveryChannels}</p>}
                  </div>

                  {/* Đồng ý */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-base sm:text-lg text-white font-normal leading-relaxed">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 accent-[#FA5B13] w-5 h-5 shrink-0"
                      />
                      <span className="[text-wrap:balance]">
                        Tôi đồng ý cho sử dụng thông tin trên để tạo báo cáo cá nhân hóa và gửi tài liệu phù hợp. (Thông tin được cam kết bảo mật 100%).
                      </span>
                    </label>
                    {errors.consent && <p className="text-sm text-red-300 font-medium mt-1">{errors.consent}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Đang xử lý dữ liệu...</span>
                      ) : (
                        <>
                          <span>Hoàn Tất & Xem Bản Đồ Hạnh Phúc</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* LINEAR PAGINATION BUTTONS */}
            {currentStep > 1 && currentStep < 6 && (
              <div className="pt-8 border-t border-white/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-base font-semibold text-white hover:text-[#FFA877] inline-flex items-center gap-2 cursor-pointer transition-colors py-2.5 px-3 rounded-lg hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-gray-950 font-bold rounded-xl text-base sm:text-lg inline-flex items-center gap-2.5 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* LINEAR FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm sm:text-base text-white font-normal">
        © 2026 Dũng Gieo Hạt · Bản Đồ Hạnh Phúc Gia Đình. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};
