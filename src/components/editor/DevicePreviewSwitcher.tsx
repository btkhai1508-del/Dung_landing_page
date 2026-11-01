import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { PreviewDevice } from '../../types/editor';

export const DevicePreviewSwitcher: React.FC = () => {
  const { previewDevice, setPreviewDevice } = useEditor();

  const devices: { id: PreviewDevice; label: string; icon: React.ReactNode; widthLabel: string }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4" />, widthLabel: '1440px' },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-4 h-4" />, widthLabel: '768px' },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4" />, widthLabel: '375px' },
  ];

  return (
    <div className="flex items-center bg-[#F3F4F6] p-1 rounded-xl border border-gray-200">
      {devices.map((d) => {
        const isActive = previewDevice === d.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => setPreviewDevice(d.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? 'bg-white text-black shadow-xs font-bold border border-gray-200'
                : 'text-gray-500 hover:text-black hover:bg-gray-200/60'
            }`}
            title={`Chuyển sang khung nhìn ${d.label} (${d.widthLabel})`}
          >
            {d.icon}
            <span className="hidden sm:inline">{d.label}</span>
          </button>
        );
      })}
    </div>
  );
};
