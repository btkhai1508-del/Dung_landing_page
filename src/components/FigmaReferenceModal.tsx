import React, { useState } from 'react';
import { X, ExternalLink, ZoomIn, Eye, Sparkles, Layers, Palette, Type, Sprout } from 'lucide-react';

interface FigmaReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FigmaReferenceModal: React.FC<FigmaReferenceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'tablet' | 'styles' | 'source' | 'tokens'>('desktop');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const figmaAssets = [
    {
      id: 'desktop',
      label: 'Desktop Layout',
      src: '/assets/aistudio/Desktop_56bd17c1.png',
      desc: 'Bố cục Desktop đầy đủ từ Figma Straightforward Brand Guidelines',
    },
    {
      id: 'tablet',
      label: 'Tablet Layout',
      src: '/assets/aistudio/Tablet_a48681b2.png',
      desc: 'Bố cục Tablet thu gọn với thanh menu dọc và lưới thích ứng',
    },
    {
      id: 'styles',
      label: 'Design System & Styles',
      src: '/assets/aistudio/Styles_95759612.png',
      desc: 'Hệ thống Text Styles, Typography, Color Palette và Organisms',
    },
    {
      id: 'source',
      label: 'Ảnh Nguồn Nội Dung',
      src: '/assets/aistudio/web__i_u_h__ng_FP1_37a78bf9.png',
      desc: 'Ảnh gốc chứa toàn bộ nội dung, 6 quy luật và 5 cuốn quà tặng',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#191A23] text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#FA5B13] text-white flex items-center justify-center font-bold text-sm">
              <Sprout className="w-4 h-4 text-white stroke-[2.3]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">Figma Reference & Brand Guidelines</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-[#FA5B13] uppercase tracking-wider">
                  Community Template
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                Straightforward Brand Guidelines (Dũng Gieo Hạt) & Nguồn Nội Dung
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.figma.com/site/SO2o2X742OfD9MlK47oGzf/Straightforward-Brand-Guidelines--Community-?node-id=0-3&t=gfshn9vSY9CeHVrV-4"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <span>Mở Figma Gốc</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-gray-100 border-b border-gray-200 overflow-x-auto shrink-0">
          {figmaAssets.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-xs font-bold border border-gray-300'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tokens'
                ? 'bg-white text-[#FA5B13] shadow-xs font-bold border border-gray-300'
                : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
            }`}
          >
            🎨 Token Màu & Typography
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {activeTab === 'tokens' ? (
            <div className="space-y-6">
              {/* Colors */}
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#FA5B13]" />
                  <span>Primary & Secondary Palette Tokens</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'Dũng Gieo Hạt Orange', hex: '#FA5B13', role: 'Primary Accent & Action' },
                    { name: 'Blue Tint', hex: '#B8CCD7', role: 'Primary Neutral Tone' },
                    { name: 'Navy Blue', hex: '#1E3D59', role: 'Secondary Hero & Stability' },
                    { name: 'Baby Blue', hex: '#C0E5F7', role: 'Primary Surface Tint' },
                    { name: 'Deep Orange', hex: '#DD4900', role: 'Hover Action Tone' },
                    { name: 'Dark Neutral', hex: '#191A23', role: 'Headings & Footer' },
                    { name: 'Dark Grey', hex: '#3A3A35', role: 'Secondary Body' },
                    { name: 'Pure White', hex: '#FFFFFF', role: 'Background Surface' },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      className="p-3 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2"
                    >
                      <div
                        className="w-full h-12 rounded-xl border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className="font-bold text-xs text-gray-900">{color.name}</p>
                        <p className="font-mono text-[11px] text-gray-500">{color.hex}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{color.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#1E3D59]" />
                  <span>Typography System</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA5B13]">Primary Title / Writing Font</span>
                    <h5 className="text-3xl font-bold font-writing-title text-black">Dancing Script (SemiBold 600)</h5>
                    <p className="text-xs text-gray-600 leading-relaxed font-be-vietnam">
                      Phông chữ viết tay chuẩn tiếng Việt, nét vừa vặn (không quá thick, không quá thin) cùng độ dancy nhịp điệu ~50% uyển chuyển, dễ nhìn.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3D59]">Body Text Font</span>
                    <h5 className="text-xl font-bold font-be-vietnam text-black">Be Vietnam Pro</h5>
                    <p className="text-xs text-gray-600 leading-relaxed font-be-vietnam">
                      Phông chữ tối ưu chuẩn tiếng Việt cho toàn bộ văn bản nội dung chi tiết, mô tả và nút hành động.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Image viewer
            <div className="space-y-3">
              {figmaAssets
                .filter((item) => item.id === activeTab)
                .map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 px-1">
                      <span>{item.desc}</span>
                      <button
                        onClick={() => setZoomedImage(item.src)}
                        className="flex items-center gap-1 text-[#FA5B13] hover:underline font-semibold cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Xem kích thước lớn</span>
                      </button>
                    </div>

                    <div
                      onClick={() => setZoomedImage(item.src)}
                      className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm cursor-zoom-in group relative overflow-hidden"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-auto rounded-xl max-h-[65vh] object-contain mx-auto transition-transform group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5" /> Nhấp để phóng to toàn màn hình
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-gray-500">
            Mẫu tham chiếu từ Figma Straightforward Brand Guidelines (Community Template)
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#191A23] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedImage}
            alt="Figma Zoom"
            className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
