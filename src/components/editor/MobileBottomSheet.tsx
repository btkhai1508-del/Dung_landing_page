import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import {
  X,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  Eye,
  EyeOff,
  Sparkles,
  Layout,
  Sliders,
} from 'lucide-react';
import { ElementType } from '../../types/editor';

// Colors from Figma Redo & Positivus Design System
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

export const MobileBottomSheet: React.FC = () => {
  const {
    activeBottomTab,
    setActiveBottomTab,
    selectedElement,
    selectedSection,
    project,
    updateElementContent,
    updateElementStyles,
    updateSectionStyles,
    addElement,
    deleteElement,
    moveElement,
    toggleSectionVisibility,
    selectElement,
    switchTemplate,
  } = useEditor();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (activeBottomTab === 'none') {
    return null;
  }

  const closeSheet = () => {
    setActiveBottomTab('none');
    setIsExpanded(false);
  };

  const getSheetTitle = () => {
    switch (activeBottomTab) {
      case 'add':
        return 'Thêm thành phần mới';
      case 'edit':
        return selectedElement ? `Sửa: ${selectedElement.label}` : 'Chỉnh sửa nội dung';
      case 'style':
        return selectedElement ? `Kiểu dáng: ${selectedElement.label}` : 'Thiết lập kiểu dáng';
      case 'layers':
        return 'Danh sách các lớp & khối';
      case 'more':
        return 'Tùy chọn & Mẫu thiết kế';
      default:
        return 'Chỉnh sửa';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSheet}
        className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-xs"
      />

      {/* Sliding Sheet */}
      <div
        className={`fixed left-0 right-0 bottom-[54px] z-50 bg-white rounded-t-[24px] shadow-2xl border-t border-gray-200 transition-all duration-300 flex flex-col ${
          isExpanded ? 'h-[80vh]' : 'max-h-[55vh]'
        }`}
      >
        {/* Drag Handle & Header */}
        <div className="pt-2.5 pb-2 px-4 border-b border-gray-100 shrink-0">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2 cursor-pointer"
            title="Kéo hoặc nhấn để mở rộng/thu gọn"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="text-sm font-bold text-gray-900 truncate">{getSheetTitle()}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] font-semibold text-blue-600 px-2 py-0.5 rounded hover:bg-blue-50"
              >
                {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              </button>
              <button
                type="button"
                onClick={closeSheet}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: ADD */}
          {activeBottomTab === 'add' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-medium">
                Chọn thành phần để thêm vào mục hiện tại:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { type: 'heading', label: 'Tiêu đề lớn', icon: 'H', desc: 'Tiêu đề phân mục' },
                  { type: 'paragraph', label: 'Đoạn văn', icon: '¶', desc: 'Mô tả nội dung' },
                  { type: 'button', label: 'Nút CTA', icon: '▣', desc: 'Hành động kêu gọi' },
                  { type: 'card', label: 'Thẻ thông tin', icon: '◻', desc: 'Hộp nội dung nổi bật' },
                  { type: 'badge', label: 'Huy hiệu', icon: '✦', desc: 'Nhãn thông tin ngắn' },
                  { type: 'quote', label: 'Trích dẫn', icon: '“', desc: 'Châm ngôn, đúc kết' },
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
                      setActiveBottomTab('edit');
                    }}
                    className="flex flex-col items-start p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                        {item.icon}
                      </span>
                      <span className="text-xs font-bold text-gray-800">{item.label}</span>
                    </div>
                    <span className="text-[11px] text-gray-500">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EDIT */}
          {activeBottomTab === 'edit' && selectedElement && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nội dung chính ({selectedElement.label})
                </label>
                <textarea
                  value={selectedElement.content}
                  onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
                  rows={selectedElement.type === 'heading' ? 2 : 4}
                  className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Nhập nội dung..."
                />
              </div>

              {selectedElement.type === 'card' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nội dung phụ / Chú thích thẻ
                  </label>
                  <textarea
                    value={selectedElement.subContent || ''}
                    onChange={(e) =>
                      updateElementContent(selectedElement.id, selectedElement.content, e.target.value)
                    }
                    rows={2}
                    className="w-full text-sm p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Mô tả phụ..."
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveBottomTab('style')}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100"
                >
                  Điều chỉnh Kiểu dáng & Màu sắc →
                </button>
                <button
                  type="button"
                  onClick={() => deleteElement(selectedElement.id)}
                  className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 py-1.5 px-2.5 rounded-lg border border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STYLE */}
          {activeBottomTab === 'style' && selectedElement && (
            <div className="space-y-4">
              {/* Text Alignment */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Căn lề</label>
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
                      className={`p-2 rounded-lg border text-xs font-medium cursor-pointer ${
                        selectedElement.styles.textAlign === align.id
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                          : 'bg-white border-gray-200 text-gray-700'
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
                  Màu sắc phần tử ({selectedElement.styles.color || '#000000'})
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => updateElementStyles(selectedElement.id, { color: c.hex })}
                      className="w-7 h-7 rounded-full border border-gray-300 shadow-xs relative transition-transform active:scale-90"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedElement.styles.color === c.hex && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
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
                        className="w-7 h-7 rounded-full border border-gray-300 shadow-xs relative transition-transform active:scale-90"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedElement.styles.backgroundColor === c.hex && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Section Background if applicable */}
              {selectedSection && (
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Màu nền phân mục: {selectedSection.title}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() =>
                          updateSectionStyles(selectedSection.id, { backgroundColor: c.hex })
                        }
                        className="w-6 h-6 rounded-md border border-gray-300 shadow-xs relative"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: LAYERS */}
          {activeBottomTab === 'layers' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-medium">
                Cấu trúc phân mục và phần tử trang:
              </p>
              <div className="space-y-2">
                {project.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="border border-gray-200 rounded-xl p-2.5 bg-gray-50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 truncate">{sec.title}</span>
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(sec.id)}
                        className="text-gray-500 hover:text-black p-1"
                      >
                        {sec.isVisible ? (
                          <Eye className="w-3.5 h-3.5 text-green-600" />
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
                            onClick={() => {
                              selectElement(el.id, sec.id);
                              setActiveBottomTab('edit');
                            }}
                            className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer ${
                              isSelected
                                ? 'bg-blue-100/80 text-blue-900 font-bold'
                                : 'hover:bg-white text-gray-700'
                            }`}
                          >
                            <span className="truncate max-w-[180px]">{el.label}: {el.content}</span>
                            <div className="flex items-center gap-1">
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
            </div>
          )}

          {/* TAB 5: MORE */}
          {activeBottomTab === 'more' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Chuyển đổi mẫu giao diện (Templates)
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      switchTemplate('straightforward-redo');
                      closeSheet();
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 cursor-pointer ${
                      project.templateId === 'straightforward-redo'
                        ? 'border-orange-500 bg-orange-50/50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FA5B13] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ⮌
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Redo Brand Guidelines (Figma)</h4>
                      <p className="text-[11px] text-gray-500">
                        Hệ thống quy chuẩn thương hiệu, màu sắc, typography & logo từ Figma.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchTemplate('nang-luong-tu-vi');
                      closeSheet();
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 cursor-pointer ${
                      project.templateId === 'nang-luong-tu-vi'
                        ? 'border-yellow-500 bg-yellow-50/50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Thay Đổi Tương Lai (Năng Lượng & Tử Vi)</h4>
                      <p className="text-[11px] text-gray-500">
                        Nội dung đầy đủ: 6 Quy luật vũ trụ, 3 góc nhìn chân lý, 5 bộ quà tặng Ebook.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                <p>• Đồng bộ dữ liệu liên tục giữa chế độ Mobile và Desktop</p>
                <p>• Sử dụng Undo/Redo bất cứ khi nào cần hoàn tác</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
