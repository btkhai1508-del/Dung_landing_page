import React from 'react';
import { useEditor } from '../../context/EditorContext';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Save,
  Check,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { DevicePreviewSwitcher } from './DevicePreviewSwitcher';

interface TopToolbarProps {
  onBack?: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ onBack }) => {
  const {
    project,
    canUndo,
    canRedo,
    undo,
    redo,
    isCleanPreview,
    setIsCleanPreview,
    saveProject,
    isSavedToastVisible,
    isMobileEditorMode,
    setIsMobileEditorMode,
  } = useEditor();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shadow-xs">
      {/* Left: Back button & Project Name */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            title="Quay lại"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Sẵn sàng chỉnh sửa" />
          <h1 className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
            {project.name}
          </h1>
        </div>
      </div>

      {/* Center: Device Switcher (Desktop) or Preview Badge (Mobile) */}
      <div className="flex items-center gap-2">
        {!isMobileEditorMode && (
          <div className="hidden md:flex items-center">
            <DevicePreviewSwitcher />
          </div>
        )}

        {/* Undo & Redo Controls */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
          <button
            type="button"
            disabled={!canUndo}
            onClick={undo}
            className={`p-1.5 rounded text-gray-700 transition-colors ${
              canUndo ? 'hover:bg-white hover:shadow-xs active:scale-95' : 'opacity-30 cursor-not-allowed'
            }`}
            title="Hoàn tác (Undo)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3.5 bg-gray-200 mx-0.5" />
          <button
            type="button"
            disabled={!canRedo}
            onClick={redo}
            className={`p-1.5 rounded text-gray-700 transition-colors ${
              canRedo ? 'hover:bg-white hover:shadow-xs active:scale-95' : 'opacity-30 cursor-not-allowed'
            }`}
            title="Làm lại (Redo)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Preview mode toggle, Mobile/Desktop Switcher, Save Button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Toggle Clean Preview */}
        <button
          type="button"
          onClick={() => setIsCleanPreview(!isCleanPreview)}
          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
            isCleanPreview
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
          title={isCleanPreview ? 'Quay lại chế độ Chỉnh sửa' : 'Xem trước (Ẩn khung viền chỉnh sửa)'}
        >
          {isCleanPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isCleanPreview ? 'Đang xem trước' : 'Xem trước'}</span>
        </button>

        {/* Desktop user can toggle mobile editor interface */}
        <button
          type="button"
          onClick={() => setIsMobileEditorMode(!isMobileEditorMode)}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
          title="Chuyển đổi giữa giao diện Biên tập trên Máy tính và Điện thoại"
        >
          {isMobileEditorMode ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Giao diện Desktop</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chế độ Mobile Editor</span>
            </>
          )}
        </button>

        {/* Save button */}
        <button
          type="button"
          onClick={saveProject}
          className="flex items-center gap-1.5 bg-[#191A23] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-all cursor-pointer shadow-xs active:scale-95"
          title="Lưu trang"
        >
          {isSavedToastVisible ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Đã lưu!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lưu</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
