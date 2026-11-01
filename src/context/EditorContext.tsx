import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProjectData, EditorElement, EditorSection, PreviewDevice, MobileBottomTab, StyleProps } from '../types/editor';
import { REDO_BRAND_TEMPLATE, NANG_LUONG_TU_VI_TEMPLATE } from '../data/defaultTemplates';

interface EditorContextType {
  project: ProjectData;
  selectedElementId: string | null;
  selectedSectionId: string | null;
  selectedElement: EditorElement | null;
  selectedSection: EditorSection | null;
  previewDevice: PreviewDevice;
  isMobileEditorMode: boolean;
  isCleanPreview: boolean;
  canUndo: boolean;
  canRedo: boolean;
  activeBottomTab: MobileBottomTab;
  isSavedToastVisible: boolean;
  
  // Actions
  selectElement: (elementId: string | null, sectionId?: string | null) => void;
  selectSection: (sectionId: string | null) => void;
  updateElementContent: (elementId: string, content: string, subContent?: string) => void;
  updateElementStyles: (elementId: string, styles: Partial<StyleProps>) => void;
  updateSectionStyles: (sectionId: string, styles: { backgroundColor?: string; textColor?: string }) => void;
  addElement: (sectionId: string, type: EditorElement['type']) => void;
  deleteElement: (elementId: string) => void;
  moveElement: (elementId: string, direction: 'up' | 'down') => void;
  toggleSectionVisibility: (sectionId: string) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setIsMobileEditorMode: (enabled: boolean) => void;
  setIsCleanPreview: (preview: boolean) => void;
  setActiveBottomTab: (tab: MobileBottomTab) => void;
  switchTemplate: (templateId: 'straightforward-redo' | 'nang-luong-tu-vi') => void;
  saveProject: () => void;
  undo: () => void;
  redo: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<ProjectData>(NANG_LUONG_TU_VI_TEMPLATE);
  const [history, setHistory] = useState<ProjectData[]>([NANG_LUONG_TU_VI_TEMPLATE]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  
  const [selectedElementId, setSelectedElementId] = useState<string | null>('el_tv_main_title');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('sec_tuvi_hero');
  
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [isMobileEditorMode, setIsMobileEditorMode] = useState<boolean>(false);
  const [isCleanPreview, setIsCleanPreview] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState<MobileBottomTab>('none');
  const [isSavedToastVisible, setIsSavedToastVisible] = useState<boolean>(false);

  // Auto-detect mobile screen width on mount & resize
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      if (isSmallScreen) {
        setIsMobileEditorMode(true);
        setPreviewDevice('mobile');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pushHistory = useCallback((newProject: ProjectData) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newProject];
    });
    setHistoryIndex((prev) => prev + 1);
    setProject(newProject);
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setProject(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setProject(history[newIndex]);
    }
  };

  const selectElement = (elementId: string | null, sectionId?: string | null) => {
    setSelectedElementId(elementId);
    if (sectionId) {
      setSelectedSectionId(sectionId);
    } else if (elementId) {
      // Find parent section
      for (const sec of project.sections) {
        if (sec.elements.some((el) => el.id === elementId)) {
          setSelectedSectionId(sec.id);
          break;
        }
      }
    }
    // Auto-open Edit bottom sheet on mobile if element is tapped and bottom tab is none
    if (elementId && isMobileEditorMode && activeBottomTab === 'none') {
      setActiveBottomTab('edit');
    }
  };

  const selectSection = (sectionId: string | null) => {
    setSelectedSectionId(sectionId);
  };

  // Find selected objects
  let selectedElement: EditorElement | null = null;
  let selectedSection: EditorSection | null = null;

  for (const sec of project.sections) {
    if (sec.id === selectedSectionId) {
      selectedSection = sec;
    }
    for (const el of sec.elements) {
      if (el.id === selectedElementId) {
        selectedElement = el;
        selectedSection = sec;
        break;
      }
    }
  }

  const updateElementContent = (elementId: string, content: string, subContent?: string) => {
    const updatedSections = project.sections.map((section) => ({
      ...section,
      elements: section.elements.map((el) => {
        if (el.id === elementId) {
          return {
            ...el,
            content,
            subContent: subContent !== undefined ? subContent : el.subContent,
          };
        }
        return el;
      }),
    }));

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
  };

  const updateElementStyles = (elementId: string, styles: Partial<StyleProps>) => {
    const updatedSections = project.sections.map((section) => ({
      ...section,
      elements: section.elements.map((el) => {
        if (el.id === elementId) {
          return {
            ...el,
            styles: {
              ...el.styles,
              ...styles,
            },
          };
        }
        return el;
      }),
    }));

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
  };

  const updateSectionStyles = (sectionId: string, styles: { backgroundColor?: string; textColor?: string }) => {
    const updatedSections = project.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          ...styles,
        };
      }
      return section;
    });

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
  };

  const addElement = (sectionId: string, type: EditorElement['type']) => {
    const newId = `el_${Date.now()}`;
    let newElement: EditorElement;

    switch (type) {
      case 'heading':
        newElement = {
          id: newId,
          type: 'heading',
          label: 'Tiêu đề mới',
          content: 'Tiêu đề bài viết hoặc phân mục',
          styles: { fontSize: 'text-2xl md:text-3xl', fontWeight: 'font-bold', color: '#191A23' },
        };
        break;
      case 'paragraph':
        newElement = {
          id: newId,
          type: 'paragraph',
          label: 'Đoạn văn mới',
          content: 'Nhập nội dung mô tả chi tiết tại đây...',
          styles: { fontSize: 'text-base', color: '#4B5563', lineHeight: 'leading-relaxed' },
        };
        break;
      case 'button':
        newElement = {
          id: newId,
          type: 'button',
          label: 'Nút bấm CTA',
          content: 'Khám phá ngay',
          styles: {
            backgroundColor: '#FA5B13',
            color: '#FFFFFF',
            padding: 'px-6 py-3',
            borderRadius: 'rounded-xl',
            fontWeight: 'font-bold',
            textAlign: 'center',
          },
        };
        break;
      case 'badge':
        newElement = {
          id: newId,
          type: 'badge',
          label: 'Huy hiệu / Điểm nhấn',
          content: 'TÍNH NĂNG MỚI',
          styles: {
            fontSize: 'text-xs',
            fontWeight: 'font-bold',
            color: '#FA5B13',
            padding: 'px-3 py-1',
            borderRadius: 'rounded-full',
          },
        };
        break;
      case 'card':
        newElement = {
          id: newId,
          type: 'card',
          label: 'Thẻ thông tin',
          content: 'Thẻ nội dung nổi bật',
          subContent: 'Mô tả thông tin chi tiết bên trong thẻ',
          styles: {
            backgroundColor: '#FFFFFF',
            padding: 'p-4',
            borderRadius: 'rounded-xl',
            borderWidth: 'border',
            borderColor: '#E5E7EB',
          },
        };
        break;
      case 'quote':
        newElement = {
          id: newId,
          type: 'quote',
          label: 'Trích dẫn',
          content: '“Sự kiên trì và rõ ràng tạo ra kết quả phi thường.”',
          styles: { fontSize: 'text-base', color: '#374151', textAlign: 'center' },
        };
        break;
      default:
        newElement = {
          id: newId,
          type: 'paragraph',
          label: 'Nội dung',
          content: 'Nội dung mới',
          styles: { fontSize: 'text-base', color: '#000000' },
        };
    }

    const updatedSections = project.sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          elements: [...sec.elements, newElement],
        };
      }
      return sec;
    });

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };

    pushHistory(newProject);
    setSelectedElementId(newId);
    setSelectedSectionId(sectionId);
    if (isMobileEditorMode) {
      setActiveBottomTab('edit');
    }
  };

  const deleteElement = (elementId: string) => {
    const updatedSections = project.sections.map((sec) => ({
      ...sec,
      elements: sec.elements.filter((el) => el.id !== elementId),
    }));

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
    setSelectedElementId(null);
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const updatedSections = project.sections.map((sec) => {
      const index = sec.elements.findIndex((el) => el.id === elementId);
      if (index === -1) return sec;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sec.elements.length) return sec;

      const newElements = [...sec.elements];
      const [moved] = newElements.splice(index, 1);
      newElements.splice(newIndex, 0, moved);

      return {
        ...sec,
        elements: newElements,
      };
    });

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const updatedSections = project.sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          isVisible: !sec.isVisible,
        };
      }
      return sec;
    });

    const newProject: ProjectData = {
      ...project,
      updatedAt: new Date().toISOString(),
      sections: updatedSections,
    };
    pushHistory(newProject);
  };

  const switchTemplate = (templateId: 'straightforward-redo' | 'nang-luong-tu-vi') => {
    const nextTemplate = templateId === 'straightforward-redo' ? REDO_BRAND_TEMPLATE : NANG_LUONG_TU_VI_TEMPLATE;
    setProject(nextTemplate);
    setHistory([nextTemplate]);
    setHistoryIndex(0);
    if (nextTemplate.sections[0]?.elements[0]) {
      setSelectedElementId(nextTemplate.sections[0].elements[0].id);
      setSelectedSectionId(nextTemplate.sections[0].id);
    } else {
      setSelectedElementId(null);
      setSelectedSectionId(null);
    }
  };

  const saveProject = () => {
    setIsSavedToastVisible(true);
    setTimeout(() => {
      setIsSavedToastVisible(false);
    }, 2400);
  };

  return (
    <EditorContext.Provider
      value={{
        project,
        selectedElementId,
        selectedSectionId,
        selectedElement,
        selectedSection,
        previewDevice,
        isMobileEditorMode,
        isCleanPreview,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        activeBottomTab,
        isSavedToastVisible,
        selectElement,
        selectSection,
        updateElementContent,
        updateElementStyles,
        updateSectionStyles,
        addElement,
        deleteElement,
        moveElement,
        toggleSectionVisibility,
        setPreviewDevice,
        setIsMobileEditorMode,
        setIsCleanPreview,
        setActiveBottomTab,
        switchTemplate,
        saveProject,
        undo,
        redo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
