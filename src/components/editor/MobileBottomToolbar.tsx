import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { PlusCircle, Edit3, Palette, Layers, MoreHorizontal } from 'lucide-react';
import { MobileBottomTab } from '../../types/editor';

export const MobileBottomToolbar: React.FC = () => {
  const { activeBottomTab, setActiveBottomTab, selectedElementId } = useEditor();

  const handleTabClick = (tab: MobileBottomTab) => {
    if (activeBottomTab === tab) {
      setActiveBottomTab('none'); // Toggle dismiss
    } else {
      setActiveBottomTab(tab);
    }
  };

  const toolbarButtons: { id: MobileBottomTab; label: string; icon: React.ReactNode; requiresSelection?: boolean }[] = [
    {
      id: 'add',
      label: 'Thêm',
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      id: 'edit',
      label: 'Sửa',
      icon: <Edit3 className="w-5 h-5" />,
      requiresSelection: true,
    },
    {
      id: 'style',
      label: 'Kiểu dáng',
      icon: <Palette className="w-5 h-5" />,
      requiresSelection: true,
    },
    {
      id: 'layers',
      label: 'Lớp',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 'more',
      label: 'Thêm nữa',
      icon: <MoreHorizontal className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {toolbarButtons.map((btn) => {
          const isActive = activeBottomTab === btn.id;
          const isDisabled = btn.requiresSelection && !selectedElementId;

          return (
            <button
              key={btn.id}
              type="button"
              disabled={isDisabled}
              onClick={() => handleTabClick(btn.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isDisabled
                  ? 'opacity-35 cursor-not-allowed text-gray-400'
                  : isActive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-gray-600 hover:text-black active:bg-gray-100'
              }`}
            >
              <div className="relative">
                {btn.icon}
                {btn.requiresSelection && selectedElementId && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </div>
              <span className="text-[11px] mt-0.5 font-medium">{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
