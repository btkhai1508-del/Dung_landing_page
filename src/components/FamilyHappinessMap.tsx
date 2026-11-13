import React, { useState, useEffect, useMemo } from 'react';
import { submitToSheet, checkPhoneExists, SHEET_TABS } from '../lib/submitToSheet';
import { BirthDateInput, isoToVN } from './BirthDateInput';
import { TimeInput24, isValidTime24 } from './TimeInput24';
import { ZaloPopups, ZaloOpenButton } from './ZaloPopup';
import { computeNumerology } from '../lib/numerology';
import { computeTuVi } from '../lib/tuviEngine';
import {
  Sprout,
  ArrowRight,
  ArrowLeft,
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
  wantGiftSolution: 'Có' | 'Không';

  // Trang 6: Nhận bản đồ
  phone: string;
  email: string;
  deliveryChannels: string[];
  consent: boolean;
}

// Năm sinh hợp lệ: từ 1900 đến hôm nay (chặn gõ nhầm như năm 3111)
const MIN_BIRTH_DATE = '1900-01-01';
const todayISO = () => new Date().toISOString().slice(0, 10);
const isIsoDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v || '');
function birthDateError(value: string): string | null {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Vui lòng nhập đúng ngày/tháng/năm, ví dụ 15/08/1990';
  if (value < MIN_BIRTH_DATE) return 'Năm sinh phải từ 1900 trở về sau';
  if (value > todayISO()) return 'Ngày sinh không được ở tương lai, vui lòng kiểm tra lại năm sinh';
  return null;
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
    health: 0,
    family: 0,
    finance: 0,
    career: 0,
    relationships: 0,
    selfDevelopment: 0,
    spirituality: 0,
    community: 0,
  },
  priorityArea: 'Sức Khỏe',
  desireChange: '',
  obstacles: [],
  obstacleOther: '',
  supportMethods: [],
  wantGiftSolution: 'Có',
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
    // Bước xem lại trước khi gửi
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85',
    quote: '“Dừng lại một chút để chắc rằng điều bạn chia sẻ đúng với chính mình.”',
  },
  8: {
    // Bước hoàn tất: Tương lai được tạo ra bởi những gì bạn làm hôm nay
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85',
    quote: '“Tương lai không được dự đoán, tương lai được tạo ra bởi những gì bạn làm hôm nay.”',
  },
};

// Helper tính con số chủ đạo thần số học
function calculateLifePath(birthDateStr: string): number {
  if (!isIsoDate(birthDateStr)) return 0;
  const [y, m, d] = birthDateStr.split('-').map(Number);
  return computeNumerology('', d, m, y).lifePath;
}

// Thông tin cơ bản Tử vi & Ngũ hành lấy từ bộ tính chuẩn (lịch âm, nạp âm 60 hoa giáp, Bát trạch)
interface TuViInfo {
  canChiNam: string;
  nguHanh: string;
  cungMenh: string;
  conSoChuDao: number;
  amDuong: string;
  namSinh: number;
}

function calculateTuVi(birthDateStr: string, gender: string = 'Nam'): TuViInfo {
  if (!isIsoDate(birthDateStr)) {
    return {
      canChiNam: 'Giáp Thìn',
      nguHanh: 'Hỏa (Phú Đăng Hỏa)',
      cungMenh: 'Chấn (Mộc) - Đông Tứ Mệnh',
      conSoChuDao: 9,
      amDuong: 'Dương Nam',
      namSinh: 2024,
    };
  }
  const [y, m, d] = birthDateStr.split('-').map(Number);
  const tv = computeTuVi(d, m, y, gender);
  return {
    canChiNam: tv.canChi,
    nguHanh: `${tv.napAm.hanh} (${tv.napAm.name})`,
    cungMenh: `${tv.batTrach.name} (${tv.batTrach.hanh}) - ${tv.batTrach.group}`,
    conSoChuDao: calculateLifePath(birthDateStr),
    amDuong: tv.amDuongLabel,
    namSinh: y,
  };
}

export const FamilyHappinessMap: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [phoneDuplicate, setPhoneDuplicate] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [editingFromReview, setEditingFromReview] = useState(false);
  const [reviewConfirmed, setReviewConfirmed] = useState(false);

  // Trang thông báo quyền riêng tư & xin sự đồng ý
  const [isPrivacyStep, setIsPrivacyStep] = useState<boolean>(false);
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);
  const [privacyError, setPrivacyError] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, isCompleted, isPrivacyStep]);

  const headingClass = 'font-playfair-heading italic font-medium';

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 2) {
      if (!formData.birthDate) errs.birthDate = 'Vui lòng chọn ngày tháng năm sinh';
      else if (birthDateError(formData.birthDate)) errs.birthDate = birthDateError(formData.birthDate)!;
      if (formData.birthTime && !isValidTime24(formData.birthTime)) errs.birthTime = 'Giờ sinh chưa đúng. Hãy nhập theo giờ 24h, ví dụ 17:45, hoặc xóa trống nếu không nhớ.';
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
            if (!rel.relationship.trim()) errs[`rel_rel_${idx}`] = 'Vui lòng nhập mối quan hệ';
            if (!rel.birthDate) errs[`rel_dob_${idx}`] = 'Vui lòng chọn ngày sinh';
            else if (birthDateError(rel.birthDate)) errs[`rel_dob_${idx}`] = birthDateError(rel.birthDate)!;
            if (!rel.gender) errs[`rel_gender_${idx}`] = 'Vui lòng chọn giới tính';
          });
        }
      }
    }

    if (step === 4) {
      const missing = LIFE_AREAS.filter((a) => !formData.wheelScores[a.key as keyof typeof formData.wheelScores]);
      if (missing.length > 0) {
        errs.wheelScores = 'Vui lòng tự chấm điểm cho đầy đủ cả 8 khía cạnh trước khi tiếp tục.';
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

      if (!formData.consent) {
        errs.consent = 'Vui lòng xác nhận đồng ý để hệ thống lập bản đồ';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;
    if (currentStep === 6) {
      // Mỗi số điện thoại chỉ làm khảo sát một lần
      setCheckingPhone(true);
      const exists = await checkPhoneExists(formData.phone);
      setCheckingPhone(false);
      if (exists) {
        setPhoneDuplicate(true);
        return;
      }
      setPhoneDuplicate(false);
    }
    if (editingFromReview) {
      setEditingFromReview(false);
      setCurrentStep(7);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  // Từ trang xem lại: bấm "Sửa" để quay về đúng phần cần chỉnh
  const editStep = (step: number) => {
    setEditingFromReview(true);
    setReviewConfirmed(false);
    setCurrentStep(step);
  };

  const handlePrev = () => {
    if (currentStep === 2) {
      setIsPrivacyStep(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra lại toàn bộ các bước; nếu có chỗ chưa hợp lệ thì đưa người dùng về đúng bước đó
    for (const st of [2, 3, 4, 5, 6]) {
      if (!validateStep(st)) {
        setEditingFromReview(true);
        setCurrentStep(st);
        return;
      }
    }
    setIsSubmitting(true);
    const alreadyExists = await checkPhoneExists(formData.phone);
    if (alreadyExists) {
      setIsSubmitting(false);
      setPhoneDuplicate(true);
      setEditingFromReview(true);
      setCurrentStep(6);
      return;
    }
    try {
      // Tính toán điểm số Bánh xe hạnh phúc
      const scores = formData.wheelScores;
      const wheelValues = Object.values(scores);
      const totalScore = wheelValues.reduce((sum, val) => sum + val, 0);
      const avgScore = (totalScore / wheelValues.length).toFixed(1);
      const wheelSummary = `Sức Khỏe: ${scores.health}/10 | Gia Đình: ${scores.family}/10 | Tài Chính: ${scores.finance}/10 | Sự Nghiệp: ${scores.career}/10 | Mối Quan Hệ: ${scores.relationships}/10 | Phát Triển Bản Thân: ${scores.selfDevelopment}/10 | Tinh Thần & Nội Tâm: ${scores.spirituality}/10 | Đóng Góp Xã Hội: ${scores.community}/10 (TB: ${avgScore}/10)`;

      // Danh sách rào cản gộp cả mục Khác nếu có
      const allObstacles = [...formData.obstacles];
      if (formData.obstacleOther && formData.obstacleOther.trim()) {
        allObstacles.push(`Khác: ${formData.obstacleOther.trim()}`);
      }
      const obstaclesText = allObstacles.join(', ');

      // Thông tin chi tiết người thân đi kèm
      const relativesDetail =
        formData.includeRelatives && formData.relatives.length > 0
          ? formData.relatives
              .map(
                (r, i) =>
                  `Người ${i + 1}: ${r.name || 'Chưa rõ'} (${r.relationship || 'Người thân'}, ${r.birthDate ? isoToVN(r.birthDate) : 'Chưa rõ NS'}, ${r.gender || 'Chưa rõ GT'})`
              )
              .join('; ')
          : 'Không có';

      // Số chủ đạo thần số học & Tử vi bản mệnh
      const lifePath = calculateLifePath(formData.birthDate);
      const tuViData = calculateTuVi(formData.birthDate, formData.gender);

      // Lưu toàn bộ thông tin form /bando vào tab "Quà Tặng Tầng 1"
      const fullName = formData.fullName.trim();
      const phone = formData.phone.trim();
      const email = formData.email.trim();
      await submitToSheet({
        sheet: SHEET_TABS.bando,
        form: 'bando',
        name: fullName,
        phone,
        email,
        fields: {
          'Họ Và Tên': fullName,
          'SĐT': phone,
          'Email': email,
          'Ngày sinh': isoToVN(formData.birthDate),
          'Giờ sinh': formData.birthTime || 'Không rõ',
          'Giới tính': formData.gender,
          'Tỉnh thành': formData.city.trim(),
          'Nghề nghiệp': formData.occupation.trim(),
          'Số chủ đạo': String(lifePath),
          'Năm Can Chi': tuViData.canChiNam,
          'Bản Mệnh': tuViData.nguHanh,
          'Cung Mệnh': tuViData.cungMenh,
          'Thời gian cho gia đình': formData.familyTime,
          'Có người thân đi kèm': formData.includeRelatives ? 'Có' : 'Không',
          'Thông tin người thân': relativesDetail,
          'Sức Khỏe': `${scores.health}/10`,
          'Gia Đình': `${scores.family}/10`,
          'Tài Chính': `${scores.finance}/10`,
          'Sự Nghiệp': `${scores.career}/10`,
          'Mối Quan Hệ': `${scores.relationships}/10`,
          'Phát Triển Bản Thân': `${scores.selfDevelopment}/10`,
          'Tinh Thần & Nội Tâm': `${scores.spirituality}/10`,
          'Đóng Góp Xã Hội': `${scores.community}/10`,
          'Điểm trung bình bánh xe': `${avgScore}/10`,
          'Bánh xe hạnh phúc': wheelSummary,
          'Lĩnh vực ưu tiên': formData.priorityArea,
          'Mong muốn thay đổi': formData.desireChange ? formData.desireChange.trim() : '',
          'Rào cản lớn nhất': obstaclesText,
          'Nhận quà tặng giải pháp chi tiết': formData.wantGiftSolution,
          'Hình thức hỗ trợ': formData.supportMethods.join(', '),
          'Kênh nhận bản đồ': 'Nhóm Zalo Gieo Hạt',
          'Đồng ý điều khoản': formData.consent ? 'Đồng ý' : 'Chưa',
          // Dữ liệu có cấu trúc để trang /ketqua dựng báo cáo (không phụ thuộc vào cách ghép chuỗi)
          'Dữ liệu báo cáo': JSON.stringify({
            relatives:
              formData.includeRelatives && formData.relatives.length > 0
                ? formData.relatives.map((r) => ({
                    name: r.name || '',
                    relationship: r.relationship || '',
                    birthDate: r.birthDate ? isoToVN(r.birthDate) : '',
                    gender: r.gender || '',
                  }))
                : [],
            obstacles: allObstacles,
            support: formData.supportMethods,
          }),
        },
      });
    } catch (err) {
      console.log('Submission note:', err);
    } finally {
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  };

  const addRelative = () => {
    if (formData.relatives.length < 10) {
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

  const tuViInfo = useMemo(() => calculateTuVi(formData.birthDate, formData.gender), [formData.birthDate, formData.gender]);

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

  const activeBgInfo = STEP_BACKGROUNDS[isCompleted ? 8 : currentStep] || STEP_BACKGROUNDS[1];

  return (
    <div className="relative min-h-screen text-white font-be-vietnam antialiased flex flex-col selection:bg-[#FA5B13] selection:text-white bg-neutral-950">
      {/* ======================================================== */}
      {/* BACKGROUND ĐÍCH THỰC (AUTHENTIC PHOTOGRAPHY) + DARK TRANSPARENCY */}
      {/* ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {Object.entries(STEP_BACKGROUNDS).map(([k, item]) => {
          const active = isCompleted ? k === '8' : isPrivacyStep ? k === '1' : Number(k) === currentStep;
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

          {/* Right controls: Tiến trình */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Step progress */}
            {!isCompleted && (
              <div className="hidden sm:flex items-center gap-2.5">
                <span className="text-sm font-bold text-white">
                  {isPrivacyStep ? 'Quyền riêng tư' : `${currentStep}/7`}
                </span>
                <div className="w-24 bg-white/25 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#FA5B13] h-full transition-all duration-300 rounded-full"
                    style={{ width: isPrivacyStep ? '15%' : `${(currentStep / 7) * 100}%` }}
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
              style={{ width: isPrivacyStep ? '15%' : `${(currentStep / 7) * 100}%` }}
            />
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* LINEAR PAGE CONTENT - CHỮ LỚN RÕ RÀNG CHO NGƯỜI LỚN */}
      {/* ======================================================== */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* DÒNG TRÍCH DẪN DANCING SCRIPT TRÊN NỀN ẢNH VŨ TRỤ/THIÊN NHIÊN (CHỮ LỚN) */}
        <div key={`quote-${isCompleted ? 8 : isPrivacyStep ? 'privacy' : currentStep}`} className="mb-8 pb-4 border-b border-white/15 text-center sm:text-left animate-fade">
          {currentStep === 1 && !isPrivacyStep && !isCompleted && (
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase mb-2 font-be-vietnam drop-shadow-lg">
              QUÀ TẶNG
            </h2>
          )}
          <p className="font-dancing-script text-2xl sm:text-3xl text-[#FFA877] leading-relaxed [text-wrap:balance] drop-shadow-md">
            {isPrivacyStep ? '“Sự tôn trọng và thấu hiểu luôn bắt đầu từ niềm tin và sự chân thành.”' : activeBgInfo.quote}
          </p>
        </div>

        {/* VIEW KHI HOÀN TẤT */}
        {isCompleted ? (
          <div className="space-y-14 animate-fade">
            {/* Lời cảm ơn */}
            <header className="space-y-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Hoàn tất khảo sát</p>
              <h1 className={`text-3xl sm:text-5xl text-white leading-[1.2] ${headingClass} [text-wrap:balance]`}>
                Bản đồ hạnh phúc của bạn đã sẵn sàng
              </h1>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-[56ch]">
                Cảm ơn {formData.fullName.trim() ? <strong className="font-semibold text-white">{formData.fullName.trim()}</strong> : 'bạn'} đã dành thời gian nhìn lại chính mình và gia đình.
                Bước cuối cùng: vui lòng tham gia <strong className="font-semibold text-[#FFA877]">nhóm Zalo Gieo Hạt</strong> để được nhận kết quả phân tích tử vi và thần số học chi tiết.
              </p>
            </header>

            {/* Nhóm Zalo Gieo Hạt: cửa sổ tự mở khi đọc đến cuối trang */}
            <ZaloPopups />

            {/* Thông tin cơ bản */}
            <section className="space-y-5">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Thông tin của bạn</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 text-sm sm:text-base">
                {[
                  ['Họ và tên', formData.fullName.trim() || 'Không ghi'],
                  ['Giới tính', formData.gender],
                  ['Ngày sinh', isoToVN(formData.birthDate)],
                  ['Giờ sinh', formData.birthTime || 'Không rõ'],
                  ['Nơi sinh sống', formData.city || 'Chưa cập nhật'],
                  ['Nghề nghiệp', formData.occupation || 'Chưa cập nhật'],
                  ['Zalo', formData.phone],
                  ['Email', formData.email || 'Không có'],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-white/55 text-xs sm:text-sm">{k}</dt>
                    <dd className="mt-1 font-semibold text-white break-words">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Tử vi — bản xem nhanh */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Tử vi & bản mệnh</h2>
                <span className="text-sm text-white/60">{tuViInfo.amDuong}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/55 text-sm">Năm sinh Can Chi</p>
                  <p className={`mt-1 text-2xl sm:text-3xl text-white ${headingClass}`}>
                    {tuViInfo.canChiNam} <span className="text-white/50 text-lg sm:text-xl">· {tuViInfo.namSinh}</span>
                  </p>
                </div>
                <div>
                  <p className="text-white/55 text-sm">Bản mệnh (Ngũ hành nạp âm)</p>
                  <p className={`mt-1 text-2xl sm:text-3xl text-[#FFA877] ${headingClass}`}>{tuViInfo.nguHanh}</p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-[60ch]">
                Đây mới là bản xem nhanh. Muốn nhận thêm phần luận giải{' '}
                <span className="text-white/60">Cung Phi Bát Trạch, Cung Mệnh & Thân, Cung Phu Thê, Cung Tài Bạch</span>,
                vui lòng tham gia <strong className="font-semibold text-white">nhóm Zalo Gieo Hạt</strong> để được nhận kết quả phân tích chi tiết.
              </p>
            </section>

            {/* Bánh xe hạnh phúc */}
            <section className="space-y-6">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]">Bánh xe hạnh phúc</h2>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
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
                <ul className="w-full space-y-3.5">
                  {LIFE_AREAS.map((area) => {
                    const score = formData.wheelScores[area.key as keyof typeof formData.wheelScores];
                    return (
                      <li key={area.key} className="flex items-center justify-between gap-3 text-sm sm:text-base">
                        <span className="text-white/90 truncate">{area.label}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-24 sm:w-28 bg-white/15 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#FA5B13] h-full rounded-full" style={{ width: `${score * 10}%` }} />
                          </div>
                          <span className="font-semibold text-white w-10 text-right tabular-nums">{score}/10</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            <div className="text-center"><ZaloOpenButton /></div>
          </div>
        ) : (
          /* LINEAR MULTI-STEP QUESTIONS - CHỮ LỚN RÕ RÀNG */
          <div className="space-y-10">
            {/* TRANG 1: GIỚI THIỆU */}
            {currentStep === 1 && !isPrivacyStep && (
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
                    <span><strong>Bánh xe hạnh phúc:</strong> Đo lường 8 khía cạnh cốt lõi trong đời sống hiện tại và giải pháp thay đổi để hạnh phúc hơn</span>
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
                    onClick={() => {
                      setIsPrivacyStep(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95"
                  >
                    <span>Bắt Đầu Trả Lời</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* TRANG THÔNG BÁO QUYỀN RIÊNG TƯ & XIN SỰ ĐỒNG Ý */}
            {isPrivacyStep && (
              <div key="privacy-step" className="space-y-8 animate-fade font-be-vietnam">
                {/* Header */}
                <div className="space-y-2.5">
                  <span className="text-xs sm:text-sm font-bold text-[#FFA877] uppercase tracking-widest block">
                    BẢO MẬT & QUYỀN RIÊNG TƯ
                  </span>
                  <h1 className={`text-2xl sm:text-4xl text-white leading-[1.3] ${headingClass} [text-wrap:balance]`}>
                    Quyền Riêng Tư Của Bạn Rất Quan Trọng
                  </h1>
                  <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal pt-1">
                    Trước khi bắt đầu, chúng tôi muốn bạn biết rõ cách thông tin của mình được sử dụng và bảo vệ.
                  </p>
                </div>

                {/* Nội dung chính sách đầy đủ - Trình bày trang trọng, thanh lịch, dễ đọc, không đóng hộp rườm rà */}
                <div className="border-t border-b border-white/15 py-6 space-y-6 text-white/90 leading-relaxed">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-[#FA5B13] font-bold">1.</span>
                      <span>Ai thực hiện khảo sát?</span>
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 pl-5">
                      [Tên pháp lý của cá nhân/doanh nghiệp: Dũng Gieo Hạt & Đội ngũ Chuyên gia Bản Đồ Hạnh Phúc], liên hệ tại chaukhai9905@gmail.com.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-[#FA5B13] font-bold">2.</span>
                      <span>Chúng tôi thu thập những gì?</span>
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 pl-5">
                      Thông tin bạn tự nguyện cung cấp về bản thân, ngày sinh, mức độ hài lòng với cuộc sống, mục tiêu cá nhân và cảm nhận về các mối quan hệ gia đình.
                    </p>
                    <p className="text-xs sm:text-sm text-white/70 italic pl-5">
                      * Một số câu trả lời có thể chứa thông tin riêng tư hoặc dữ liệu cá nhân nhạy cảm. Bạn không cần cung cấp thông tin ngoài phạm vi mình cảm thấy phù hợp.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-[#FA5B13] font-bold">3.</span>
                      <span>Thông tin được dùng để làm gì?</span>
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 pl-5">
                      Tổng hợp câu trả lời, phân tích những lĩnh vực bạn muốn cải thiện, tạo và gửi bản báo cáo cá nhân hóa theo lựa chọn của bạn.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-[#FA5B13] font-bold">4.</span>
                      <span>Bạn có những quyền gì?</span>
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 pl-5">
                      Bạn có quyền yêu cầu xem, chỉnh sửa, rút lại sự đồng ý hoặc yêu cầu xóa dữ liệu của mình theo quy định pháp luật.
                    </p>
                    <p className="text-xs sm:text-sm text-[#FFA877] font-medium pl-5 pt-1">
                      Liên hệ thực hiện quyền: chaukhai9905@gmail.com.
                    </p>
                  </div>

                </div>

                {/* Checkbox Xin Sự Đồng Ý */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-start gap-3.5 cursor-pointer text-base sm:text-lg text-white font-normal leading-relaxed select-none">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => {
                        setPrivacyConsent(e.target.checked);
                        if (e.target.checked) setPrivacyError('');
                      }}
                      className="mt-1.5 accent-[#FA5B13] w-5 h-5 shrink-0"
                    />
                    <span className="[text-wrap:balance]">
                      Tôi đã đọc, hiểu rõ và đồng ý cho phép thu thập, xử lý thông tin cá nhân theo đúng Chính sách Quyền riêng tư nêu trên.
                    </span>
                  </label>
                  {privacyError && <p className="text-sm text-red-300 font-semibold pl-8">{privacyError}</p>}
                </div>

                {/* Action buttons */}
                <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPrivacyStep(false);
                      setCurrentStep(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto text-base font-semibold text-white/80 hover:text-white inline-flex items-center justify-center gap-2 cursor-pointer transition-colors py-3 px-4 rounded-xl hover:bg-white/10"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Quay lại trang giới thiệu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!privacyConsent) {
                        setPrivacyError('Vui lòng tích chọn đồng ý với Quyền riêng tư trước khi tiếp tục.');
                        return;
                      }
                      setIsPrivacyStep(false);
                      setCurrentStep(2);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95"
                  >
                    <span>Đồng Ý & Tiếp Tục</span>
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
                      1. Họ và tên đầy đủ <span className="text-white/55 font-normal text-base">(không bắt buộc)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn An"
                      className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/60"
                    />
                    <div className="text-xs sm:text-sm text-white/90 italic font-normal leading-relaxed pl-3 border-l-2 border-[#FFA877] py-1 bg-white/5 rounded-r-lg">
                      <span className="text-[#FFA877] font-semibold not-italic">* Lưu ý: </span>
                      Nếu bạn muốn tính thêm các chỉ số như số sứ mệnh, linh hồn, nhân cách, biểu đạt thì tự nguyện điền họ tên khai sinh đầy đủ, hoặc bỏ trống không ghi. Nếu tên không đúng thì bản báo cáo sẽ không chính xác.
                    </div>
                    {errors.fullName && <p className="text-sm text-red-300 font-medium">{errors.fullName}</p>}
                  </div>

                  {/* Ngày sinh & Giờ sinh */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div className="space-y-2">
                      <label htmlFor="birthDate" className="block text-base sm:text-lg font-semibold text-white">
                        2. Ngày tháng năm sinh (Dương lịch) <span className="text-[#FA5B13]">*</span>
                      </label>
                      <BirthDateInput
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={(v) => setFormData((prev) => ({ ...prev, birthDate: v }))}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white tabular-nums tracking-wide transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/45"
                      />
                      {errors.birthDate && <p className="text-sm text-red-300 font-medium">{errors.birthDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-base sm:text-lg font-semibold text-white">
                        3. Giờ sinh <span className="text-white font-normal text-sm sm:text-base">(bỏ qua nếu không nhớ)</span>
                      </label>
                      <TimeInput24
                        value={formData.birthTime}
                        onChange={(v) => setFormData((prev) => ({ ...prev, birthTime: v }))}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white tabular-nums transition-all bg-black/35 backdrop-blur-xs placeholder:text-white/45"
                      />
                      <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed pl-1">
                        <span className="text-[#FFA877] font-semibold not-italic">* Lưu ý: </span>
                        nhập theo <strong className="not-italic text-white">giờ 24h</strong> (không dùng AM/PM), ví dụ 05:30 là 5 giờ 30 sáng, 17:45 là 5 giờ 45 chiều. Gõ số liền, ô tự thêm dấu “:”.
                      </p>
                      {errors.birthTime && <p className="text-sm text-red-300 font-medium">{errors.birthTime}</p>}
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
                      Mỗi người chỉ cần 4 thông tin ngắn. Tối đa 10 người thân trong gia đình (vợ/chồng, con, cha/mẹ, anh chị em, ông bà…). Mỗi người sẽ có một phần báo cáo chi tiết riêng.
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
                      <div className="text-xs sm:text-sm text-white/90 italic font-normal leading-relaxed pl-3 border-l-2 border-[#FFA877] py-1 bg-white/5 rounded-r-lg">
                        <span className="text-[#FFA877] font-semibold not-italic">* Lưu ý: </span>
                        Tên người thân điền đúng (theo khai sinh) thì các chỉ số tính từ tên (số sứ mệnh, linh hồn, nhân cách) càng chính xác. Nếu không chắc tên, bạn có thể bỏ trống, báo cáo vẫn đầy đủ phần ngày sinh. Nếu tên không đúng thì các chỉ số này sẽ không chính xác.
                      </div>
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
                            <div className="sm:col-span-2 space-y-1.5">
                              <input
                                type="text"
                                value={rel.name}
                                onChange={(e) => updateRelative(idx, 'name', e.target.value)}
                                placeholder="Họ và tên đầy đủ của người thân (điền đúng thì báo cáo chính xác hơn)"
                                className="w-full py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white bg-black/35 placeholder:text-white/60"
                              />
                              <p className="text-xs sm:text-sm text-white/75 italic pl-1">
                                "Bạn cam kết đã được người thân đồng ý khảo sát. Họ tên có thể để trống."
                              </p>
                            </div>
                            <input
                              type="text"
                              value={rel.relationship}
                              onChange={(e) => updateRelative(idx, 'relationship', e.target.value)}
                              placeholder="Quan hệ (Vợ/Chồng, Con, Cha/Mẹ...)"
                              className="py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white bg-black/35 placeholder:text-white/60"
                            />
                            <BirthDateInput
                              value={rel.birthDate}
                              onChange={(v) => updateRelative(idx, 'birthDate', v)}
                              className="py-2.5 px-3.5 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-sm sm:text-base text-white tabular-nums bg-black/35 placeholder:text-white/45"
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
                            {[errors[`rel_rel_${idx}`], errors[`rel_dob_${idx}`], errors[`rel_gender_${idx}`]]
                              .filter(Boolean)
                              .map((msg) => (
                                <p key={msg} className="text-sm text-red-300 font-medium">{msg}</p>
                              ))}
                          </div>
                        </div>
                      ))}

                      {formData.relatives.length < 10 && (
                        <button
                          type="button"
                          onClick={addRelative}
                          className="text-sm sm:text-base font-semibold text-[#FFA877] hover:underline flex items-center gap-1.5 cursor-pointer pt-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Thêm một người thân nữa ({formData.relatives.length}/10)</span>
                        </button>
                      )}
                      {errors.relatives && <p className="text-sm text-red-300 font-medium">{errors.relatives}</p>}
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
                    Hãy tự cảm nhận mức độ hài lòng hiện tại của bạn từ 1 (rất chưa hài lòng) đến 10 (rất hài lòng).
                  </p>
                  {errors.wheelScores && (
                    <div className="p-3.5 rounded-xl bg-red-500/25 border border-red-500/50 text-red-200 text-sm sm:text-base font-semibold mt-2">
                      {errors.wheelScores}
                    </div>
                  )}
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
                            {currentScore === 0 ? (
                              <span className="text-white/60 text-sm font-normal italic">(Chưa chấm điểm)</span>
                            ) : (
                              `${currentScore} / 10`
                            )}
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

                  {/* Câu 18: Rào cản */}
                  <div className="space-y-3 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      18. Điều gì đang cản trở bạn thay đổi? <span className="text-white font-normal text-sm sm:text-base">(chọn nhiều)</span>
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

                  {/* Câu 19: Tặng thêm bộ quà tặng giải pháp chi tiết */}
                  <div className="space-y-3 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white [text-wrap:balance]">
                      19. Bạn có muốn nhận thêm bộ quà tặng giải pháp chi tiết cho vấn đề cá nhân của bạn không? <span className="text-[#FA5B13]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, wantGiftSolution: 'Có' })}
                        className={`p-4 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          formData.wantGiftSolution === 'Có'
                            ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-lg shadow-[#FA5B13]/40 scale-102 ring-2 ring-white/30'
                            : 'bg-black/35 hover:bg-black/50 text-white border-white/30'
                        }`}
                      >
                        <span>✓ Có, tôi muốn nhận</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, wantGiftSolution: 'Không' })}
                        className={`p-4 rounded-xl text-base sm:text-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          formData.wantGiftSolution === 'Không'
                            ? 'bg-[#FA5B13] text-white border-[#FA5B13] shadow-lg shadow-[#FA5B13]/40 scale-102 ring-2 ring-white/30'
                            : 'bg-black/35 hover:bg-black/50 text-white/80 border-white/30'
                        }`}
                      >
                        <span>Không, cảm ơn</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TRANG 6: NHẬN BẢN ĐỒ HẠNH PHÚC */}
            {currentStep === 6 && (
              <div key="step-6" className="space-y-8 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>06</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      BƯỚC CUỐI CÙNG
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Nhận Giải Pháp Nâng Cao Hạnh Phúc
                  </h2>
                  <p className="text-base text-white pt-1 font-normal">
                    Nhận bản đồ và tài liệu
                  </p>
                </div>

                <div className="space-y-7 border-t border-white/15 pt-6">
                  {/* SĐT / Zalo */}
                  <div className="space-y-2">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      20. Số điện thoại / Zalo để nhận báo cáo & quà tặng <span className="text-[#FA5B13]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (phoneDuplicate) setPhoneDuplicate(false);
                      }}
                      onBlur={async () => {
                        const raw = formData.phone.replace(/\s+/g, '');
                        if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(raw)) return;
                        const exists = await checkPhoneExists(raw);
                        if (exists) setPhoneDuplicate(true);
                      }}
                      placeholder="0901234567"
                      className="w-full py-3.5 px-4 rounded-xl border border-white/25 focus:border-[#FA5B13] outline-none text-base sm:text-lg text-white bg-black/35 placeholder:text-white/60"
                    />
                    {errors.phone && <p className="text-sm text-red-300 font-medium">{errors.phone}</p>}
                    {phoneDuplicate && (
                      <p role="alert" className="text-sm sm:text-base text-red-200 font-medium leading-relaxed">
                        Số điện thoại này đã làm khảo sát rồi, mỗi số chỉ làm được một lần. Bạn có thể xem kết quả của mình tại{' '}
                        <a href="/ketqua" className="underline underline-offset-4 text-white">trang kết quả</a>, hoặc dùng một số điện thoại khác.
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-base sm:text-lg font-semibold text-white">
                      21. Email <span className="text-white font-normal text-sm sm:text-base">(không bắt buộc)</span>
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

                  {/* Quote cam kết bảo mật & quyền dữ liệu cá nhân */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/45 border border-white/20 text-sm sm:text-base text-white/95 leading-relaxed font-normal shadow-inner">
                    <p className="italic">
                      "Chúng tôi cam kết thông tin được bảo mật 100% và chỉ dùng cho khảo sát giải pháp nâng cao hạnh phúc, bạn có thể từ chối cung cấp thông tin không bắt buộc và thực hiện các quyền liên quan đến dữ liệu cá nhân theo quy định pháp luật."
                    </p>
                  </div>

                  {/* Đồng ý */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer text-base sm:text-lg text-white font-normal leading-relaxed">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 accent-[#FA5B13] w-5 h-5 shrink-0"
                      />
                      <span className="[text-wrap:balance]">
                        Tôi đồng ý cho sử dụng thông tin trên để tạo báo cáo cá nhân hóa và gửi tài liệu phù hợp.
                      </span>
                    </label>
                    {errors.consent && <p className="text-sm text-red-300 font-medium mt-1">{errors.consent}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* TRANG 7: XEM LẠI TRƯỚC KHI GỬI */}
            {currentStep === 7 && (
              <form key="step-7" onSubmit={handleSubmit} className="space-y-9 animate-fade">
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className={`text-4xl sm:text-5xl font-bold text-[#FA5B13] ${headingClass}`}>07</span>
                    <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">XEM LẠI TRƯỚC KHI GỬI</span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl text-white ${headingClass} [text-wrap:balance]`}>
                    Kiểm tra lại thông tin của bạn
                  </h2>
                </div>

                <div className="rounded-2xl bg-[#FA5B13]/20 p-4 sm:p-5 text-base sm:text-lg text-white leading-relaxed">
                  <strong className="font-bold">Lưu ý quan trọng: </strong>
                  sau khi bấm “Gửi khảo sát”, bạn <strong className="font-bold">không thể sửa lại</strong> thông tin. Hãy đọc kỹ từng phần. Nếu cần chỉnh chỗ nào, bấm “Sửa” ở phần đó rồi quay lại đây.
                </div>

                {(() => {
                  const sc = formData.wheelScores;
                  const allObstacles = [...formData.obstacles, ...(formData.obstacleOther.trim() ? [`Khác: ${formData.obstacleOther.trim()}`] : [])];
                  const relativesText =
                    formData.includeRelatives && formData.relatives.length > 0
                      ? formData.relatives
                          .map((r, i) => `Người ${i + 1}: ${r.name.trim() || 'Không ghi tên'} (${r.relationship || 'Người thân'}), ${r.birthDate ? isoToVN(r.birthDate) : 'chưa rõ ngày sinh'}, ${r.gender || 'chưa rõ giới tính'}`)
                          .join('\n')
                      : 'Không khai báo người thân';
                  const sections: { title: string; step: number; rows: [string, string][] }[] = [
                    {
                      title: 'Thông tin cơ bản',
                      step: 2,
                      rows: [
                        ['Họ và tên', formData.fullName.trim() || 'Không ghi'],
                        ['Ngày sinh (dương lịch)', isoToVN(formData.birthDate)],
                        ['Giờ sinh', formData.birthTime || 'Không rõ'],
                        ['Giới tính', formData.gender],
                        ['Tỉnh/thành phố', formData.city.trim()],
                        ['Công việc', formData.occupation.trim()],
                      ],
                    },
                    {
                      title: 'Gia đình',
                      step: 3,
                      rows: [
                        ['Thời gian dành cho gia đình', formData.familyTime],
                        ['Người thân khai kèm', relativesText],
                      ],
                    },
                    {
                      title: 'Bánh xe hạnh phúc',
                      step: 4,
                      rows: LIFE_AREAS.map((a) => [a.label, `${sc[a.key as keyof typeof sc]}/10`] as [string, string]),
                    },
                    {
                      title: 'Điều bạn mong muốn',
                      step: 5,
                      rows: [
                        ['Lĩnh vực muốn cải thiện trước', formData.priorityArea],
                        ['Điều muốn thay đổi', formData.desireChange.trim() || 'Không ghi'],
                        ['Rào cản lớn nhất', allObstacles.length ? allObstacles.join(', ') : 'Không chọn'],
                        ['Nhận giải pháp chi tiết', formData.wantGiftSolution],
                        ['Cách muốn được hỗ trợ', formData.supportMethods.length ? formData.supportMethods.join(', ') : 'Không chọn'],
                      ],
                    },
                    {
                      title: 'Liên hệ',
                      step: 6,
                      rows: [
                        ['Số điện thoại / Zalo', formData.phone.trim()],
                        ['Email', formData.email.trim() || 'Không có'],
                      ],
                    },
                  ];
                  return sections.map((sec) => (
                    <section key={sec.title} className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFA877]">{sec.title}</h3>
                        <button
                          type="button"
                          onClick={() => editStep(sec.step)}
                          className="cursor-pointer text-sm font-semibold text-white underline underline-offset-4 hover:text-[#FFA877] transition-colors"
                        >
                          Sửa phần này
                        </button>
                      </div>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {sec.rows.map(([k, v]) => (
                          <div key={k} className="min-w-0">
                            <dt className="text-xs sm:text-sm text-white/55">{k}</dt>
                            <dd className="mt-1 text-[15px] sm:text-base font-semibold text-white break-words whitespace-pre-line">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ));
                })()}

                {phoneDuplicate && (
                  <p role="alert" className="text-base text-red-200 font-medium leading-relaxed">
                    Số điện thoại này đã làm khảo sát rồi, mỗi số chỉ làm được một lần. Bạn có thể xem kết quả tại{' '}
                    <a href="/ketqua" className="underline underline-offset-4 text-white">trang kết quả</a>, hoặc bấm “Sửa phần này” ở mục Liên hệ để dùng số khác.
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer text-base sm:text-lg text-white leading-relaxed">
                  <input
                    type="checkbox"
                    checked={reviewConfirmed}
                    onChange={(e) => setReviewConfirmed(e.target.checked)}
                    className="mt-1 accent-[#FA5B13] w-5 h-5 shrink-0"
                  />
                  <span className="[text-wrap:balance]">Tôi đã kiểm tra kỹ và hiểu rằng sau khi gửi sẽ không sửa lại được.</span>
                </label>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(6)}
                    className="text-base font-semibold text-white hover:text-[#FFA877] inline-flex items-center gap-2 cursor-pointer transition-colors py-2.5 px-3 rounded-lg hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !reviewConfirmed}
                    className="px-9 py-4 bg-[#FA5B13] hover:bg-[#DD4900] text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#FA5B13]/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Đang gửi...</span>
                    ) : (
                      <>
                        <span>Gửi khảo sát</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* LINEAR PAGINATION BUTTONS */}
            {currentStep > 1 && currentStep < 7 && (
              <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                {editingFromReview ? (
                  <span />
                ) : (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-base font-semibold text-white hover:text-[#FFA877] inline-flex items-center gap-2 cursor-pointer transition-colors py-2.5 px-3 rounded-lg hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={checkingPhone}
                  className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-gray-950 font-bold rounded-xl text-base sm:text-lg inline-flex items-center gap-2.5 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-60"
                >
                  <span>
                    {checkingPhone
                      ? 'Đang kiểm tra...'
                      : editingFromReview
                        ? 'Lưu & quay lại trang xem lại'
                        : currentStep === 6
                          ? 'Xem lại thông tin'
                          : 'Tiếp tục'}
                  </span>
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
