import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { TopToolbar } from './TopToolbar';
import { CanvasRenderer } from './CanvasRenderer';
import { MobileBottomToolbar } from './MobileBottomToolbar';
import { MobileBottomSheet } from './MobileBottomSheet';

interface MobileEditorProps {
  onBack?: () => void;
}

export const MobileEditor: React.FC<MobileEditorProps> = ({ onBack }) => {
  const { isSavedToastVisible } = useEditor();

  return (
    <div className="flex flex-col h-screen w-full bg-[#F3F4F6] overflow-hidden select-none">
      {/* Top sticky toolbar */}
      <TopToolbar onBack={onBack} />

      {/* Main Touch Canvas */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 pb-24">
        <div className="max-w-[420px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[calc(100vh-140px)]">
          <CanvasRenderer isMobileContainer={true} />
        </div>
      </main>

      {/* Floating Save Toast Notification */}
      {isSavedToastVisible && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#191A23] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fadeIn border border-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Đã lưu thành công tất cả thay đổi!</span>
        </div>
      )}

      {/* Context-Sensitive Sliding Bottom Sheet */}
      <MobileBottomSheet />

      {/* Fixed One-Handed Bottom Editing Toolbar */}
      <MobileBottomToolbar />
    </div>
  );
};
