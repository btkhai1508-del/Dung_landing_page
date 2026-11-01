import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { TopToolbar } from './TopToolbar';
import { CanvasRenderer } from './CanvasRenderer';
import {
  Layers,
  PlusCircle,
  Palette,
  Eye,
  EyeOff,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Monitor,
  Tablet,
  Smartphone,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { ElementType } from '../../types/editor';

const PRESET_COLORS = [
  { name: 'Redo Orange', hex: '#FA5B13' },
  { name: 'Navy Blue', hex: '#1E3D59' },
  { name: 'Blue Tint', hex: '#B8CCD7' },
  { name: 'Baby Blue', hex: '#C0E5F7' },
  { name: 'Dark Neutral', hex: '#191A23' },
  { name: 'Energy Yellow', hex: '#FACC15' },
  { name: 'Ruby Red', hex: '#DC2626' },
  { name: 'Pure White', hex: '#FFFFFF' },
];

interface DesktopEditorProps {
  onBack?: () => void;
}

export const DesktopEditor: React.FC<DesktopEditorProps> = ({ onBack }) => {
  const {
    project,
    selectedElement,
    selectedSection,
    previewDevice,
    updateElementContent,
    updateElementStyles,
    updateSectionStyles,
    addElement,
    deleteElement,
    moveElement,
    toggleSectionVisibility,
    selectElement,
    switchTemplate,
    isSavedToastVisible,
  } = useEditor();

  const [activeLeftTab, setActiveLeftTab] = useState<'layers' | 'elements' | 'templates'>('layers');

  // Compute viewport container width based on device preview
  const getCanvasWidthClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-[375px] my-6 rounded-3xl shadow-2xl border-4 border-gray-800';
      case 'tablet':
        return 'w-[768px] my-6 rounded-2xl shadow-xl border-2 border-gray-400';
      case 'desktop':
      default:
        return 'w-full max-w-[1240px] my-4 shadow-md rounded-xl border border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#E5E7EB] overflow-hidden select-none">
      {/* Top sticky bar */}
      <TopToolbar onBack={onBack} />

      {/* Main Workspace with 3 columns: Left Sidebar | Center Canvas | Right Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          {/* Tab Navigation */}
          <div className="flex items-center border-b border-gray-200 p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => setActiveLeftTab('layers')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeLeftTab === 'layers'
                  ? 'bg-white text-blue-600 shadow-xs border border-gray-200'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cấu trúc</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLeftTab('elements')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeLeftTab === 'elements'
                  ? 'bg-white text-blue-600 shadow-xs border border-gray-200'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Thêm mới</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLeftTab('templates')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeLeftTab === 'templates'
                  ? 'bg-white text-blue-600 shadow-xs border border-gray-200'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mẫu</span>
            </button>
          </div>

          {/* Left Tab Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* TAB 1: LAYERS */}
            {activeLeftTab === 'layers' && (
              <div className="space-y-2.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Phân mục & Phần tử
                </p>
                {project.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="border border-gray-200 rounded-xl p-2.5 bg-gray-50/70 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 truncate">{sec.title}</span>
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(sec.id)}
                        className="text-gray-400 hover:text-black p-0.5"
                      >
                        {sec.isVisible ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="pl-2 space-y-1 border-l-2 border-gray-300">
                      {sec.elements.map((el) => {
                        const isSelected = selectedElement?.id === el.id;
                        return (
                          <div
                            key={el.id}
                            onClick={() => selectElement(el.id, sec.id)}
                            className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer ${
                              isSelected
                                ? 'bg-blue-100 text-blue-900 font-bold'
                                : 'hover:bg-white text-gray-600'
                            }`}
                          >
                            <span className="truncate max-w-[140px]">{el.label}</span>
                            <div className="flex items-center gap-1 opacity-60 hover:opacity-100">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveElement(el.id, 'up');
                                }}
                                className="p-0.5 hover:text-black"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveElement(el.id, 'down');
                                }}
                                className="p-0.5 hover:text-black"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: ELEMENTS */}
            {activeLeftTab === 'elements' && (
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Kéo hoặc nhấn để thêm phần tử
                </p>
                {[
                  { type: 'heading', label: 'Tiêu đề (Heading)', desc: 'Tiêu đề lớn phân mục' },
                  { type: 'paragraph', label: 'Đoạn văn (Paragraph)', desc: 'Mô tả nội dung chi tiết' },
                  { type: 'button', label: 'Nút bấm (Button CTA)', desc: 'Kêu gọi hành động' },
                  { type: 'card', label: 'Thẻ thông tin (Card)', desc: 'Hộp nội dung nổi bật' },
                  { type: 'badge', label: 'Huy hiệu (Badge)', desc: 'Thẻ gắn nhãn ngắn' },
                  { type: 'quote', label: 'Trích dẫn (Quote)', desc: 'Châm ngôn dẫn dắt' },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      if (selectedSection) {
                        addElement(selectedSection.id, item.type as ElementType);
                      } else if (project.sections[0]) {
                        addElement(project.sections[0].id, item.type as ElementType);
                      }
                    }}
                    className="w-full flex flex-col items-start p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer"
                  >
                    <span className="text-xs font-bold text-gray-900">{item.label}</span>
                    <span className="text-[11px] text-gray-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* TAB 3: TEMPLATES */}
            {activeLeftTab === 'templates' && (
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Mẫu thiết kế có sẵn
                </p>
                <div
                  onClick={() => switchTemplate('straightforward-redo')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    project.templateId === 'straightforward-redo'
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-400'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded bg-[#FA5B13] text-white flex items-center justify-center text-xs font-bold">
                      ⮌
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">Redo Brand Guidelines</h4>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Mẫu Straightforward từ Figma: Màu sắc, Typography, Logo & Art direction.
                  </p>
                </div>

                <div
                  onClick={() => switchTemplate('nang-luong-tu-vi')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    project.templateId === 'nang-luong-tu-vi'
                      ? 'border-yellow-500 bg-yellow-50/40 ring-1 ring-yellow-400'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded bg-[#0F172A] text-yellow-400 flex items-center justify-center text-xs font-bold">
                      ⚡
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">Năng Lượng & Tử Vi</h4>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Trang đích đầy đủ: 6 quy luật vũ trụ, 3 góc nhìn chân lý, 5 quà tặng Ebook.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER CANVASCROLL WORKSPACE */}
        <main className="flex-1 overflow-auto flex justify-center items-start p-4 bg-gray-100">
          <div className={`${getCanvasWidthClass()} bg-white overflow-hidden transition-all duration-300`}>
            <CanvasRenderer isMobileContainer={previewDevice === 'mobile'} />
          </div>
        </main>

        {/* RIGHT INSPECTOR PANEL */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 p-4 overflow-y-auto space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Thuộc tính phần tử</span>
            </h3>
            {selectedElement && (
              <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                {selectedElement.type}
              </span>
            )}
          </div>

          {selectedElement ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nội dung ({selectedElement.label})
                </label>
                <textarea
                  value={selectedElement.content}
                  onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
                  rows={selectedElement.type === 'heading' ? 2 : 4}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {selectedElement.type === 'card' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nội dung chú thích thẻ
                  </label>
                  <textarea
                    value={selectedElement.subContent || ''}
                    onChange={(e) =>
                      updateElementContent(selectedElement.id, selectedElement.content, e.target.value)
                    }
                    rows={2}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}

              {/* Text Alignment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Căn lề</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'left', icon: <AlignLeft className="w-4 h-4 mx-auto" /> },
                    { id: 'center', icon: <AlignCenter className="w-4 h-4 mx-auto" /> },
                    { id: 'right', icon: <AlignRight className="w-4 h-4 mx-auto" /> },
                  ].map((align) => (
                    <button
                      key={align.id}
                      type="button"
                      onClick={() =>
                        updateElementStyles(selectedElement.id, {
                          textAlign: align.id as 'left' | 'center' | 'right',
                        })
                      }
                      className={`p-2 rounded-lg border text-xs cursor-pointer ${
                        selectedElement.styles.textAlign === align.id
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                          : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {align.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Màu chữ ({selectedElement.styles.color || '#000000'})
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => updateElementStyles(selectedElement.id, { color: c.hex })}
                      className="w-6 h-6 rounded-full border border-gray-300 shadow-xs relative transition-transform active:scale-90"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedElement.styles.color === c.hex && (
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color for Button / Card */}
              {(selectedElement.type === 'button' || selectedElement.type === 'card') && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Màu nền ({selectedElement.styles.backgroundColor || 'Mặc định'})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() =>
                          updateElementStyles(selectedElement.id, { backgroundColor: c.hex })
                        }
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-xs relative transition-transform active:scale-90"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedElement.styles.backgroundColor === c.hex && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions: Delete element */}
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => deleteElement(selectedElement.id)}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa phần tử</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-xs">Nhấp vào một phần tử trên khung xem để tùy chỉnh thuộc tính.</p>
            </div>
          )}

          {/* Section Customizer */}
          {selectedSection && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-800">
                Phân mục: {selectedSection.title}
              </h4>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Màu nền phân mục
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() =>
                        updateSectionStyles(selectedSection.id, { backgroundColor: c.hex })
                      }
                      className="w-5 h-5 rounded-md border border-gray-300 shadow-xs relative"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Floating Save Toast Notification */}
      {isSavedToastVisible && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#191A23] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fadeIn border border-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Đã lưu thành công tất cả thay đổi!</span>
        </div>
      )}
    </div>
  );
};
