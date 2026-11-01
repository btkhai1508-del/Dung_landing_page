import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { EditorElement, EditorSection } from '../../types/editor';
import { Trash2, ArrowUp, ArrowDown, Edit3 } from 'lucide-react';

interface CanvasRendererProps {
  isMobileContainer?: boolean;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({ isMobileContainer = false }) => {
  const {
    project,
    selectedElementId,
    selectElement,
    deleteElement,
    moveElement,
    isCleanPreview,
    isMobileEditorMode,
    setActiveBottomTab,
  } = useEditor();

  const handleElementClick = (e: React.MouseEvent, element: EditorElement, section: EditorSection) => {
    e.stopPropagation();
    selectElement(element.id, section.id);
    if (isMobileEditorMode) {
      setActiveBottomTab('edit');
    }
  };

  const renderElement = (element: EditorElement, section: EditorSection) => {
    const isSelected = !isCleanPreview && selectedElementId === element.id;

    let contentNode = null;
    switch (element.type) {
      case 'heading':
        contentNode = (
          <h2
            className={`${element.styles.fontSize || 'text-3xl'} ${element.styles.fontWeight || 'font-bold'} ${
              element.styles.textAlign ? `text-${element.styles.textAlign}` : ''
            } ${element.styles.lineHeight || ''} ${element.styles.padding || ''}`}
            style={{ color: element.styles.color }}
          >
            {element.content}
          </h2>
        );
        break;

      case 'subheading':
        contentNode = (
          <h3
            className={`${element.styles.fontSize || 'text-xl'} ${element.styles.fontWeight || 'font-semibold'} ${
              element.styles.textAlign ? `text-${element.styles.textAlign}` : ''
            } ${element.styles.padding || ''}`}
            style={{ color: element.styles.color }}
          >
            {element.content}
          </h3>
        );
        break;

      case 'paragraph':
        contentNode = (
          <p
            className={`${element.styles.fontSize || 'text-base'} ${element.styles.lineHeight || 'leading-relaxed'} ${
              element.styles.textAlign ? `text-${element.styles.textAlign}` : ''
            } ${element.styles.maxWidth || ''} ${element.styles.padding || ''}`}
            style={{ color: element.styles.color }}
          >
            {element.content}
          </p>
        );
        break;

      case 'button':
        contentNode = (
          <div className={element.styles.textAlign === 'center' ? 'flex justify-center' : ''}>
            <button
              className={`inline-block transition-transform active:scale-95 shadow-sm font-semibold cursor-pointer ${
                element.styles.padding || 'px-6 py-3'
              } ${element.styles.borderRadius || 'rounded-xl'} ${element.styles.fontSize || 'text-base'}`}
              style={{
                backgroundColor: element.styles.backgroundColor || '#FA5B13',
                color: element.styles.color || '#FFFFFF',
              }}
              onClick={(e) => {
                if (isCleanPreview) {
                  // In preview, button can trigger an interaction
                } else {
                  handleElementClick(e, element, section);
                }
              }}
            >
              {element.content}
            </button>
          </div>
        );
        break;

      case 'badge':
        contentNode = (
          <div className={element.styles.textAlign === 'center' ? 'flex justify-center' : ''}>
            <span
              className={`inline-block font-semibold ${element.styles.fontSize || 'text-xs'} ${
                element.styles.padding || 'px-3 py-1'
              } ${element.styles.borderRadius || 'rounded-full'}`}
              style={{
                color: element.styles.color || '#FA5B13',
                backgroundColor: element.styles.backgroundColor || 'transparent',
                letterSpacing: element.styles.letterSpacing ? '0.1em' : undefined,
              }}
            >
              {element.content}
            </span>
          </div>
        );
        break;

      case 'card':
        contentNode = (
          <div
            className={`shadow-xs transition-shadow hover:shadow-md ${element.styles.padding || 'p-5'} ${
              element.styles.borderRadius || 'rounded-xl'
            } ${element.styles.borderWidth || ''}`}
            style={{
              backgroundColor: element.styles.backgroundColor || '#FFFFFF',
              borderColor: element.styles.borderColor || '#E5E7EB',
              color: element.styles.color || 'inherit',
            }}
          >
            <h4 className="font-bold text-base md:text-lg mb-1">{element.content}</h4>
            {element.subContent && (
              <p className="text-xs md:text-sm opacity-80 leading-relaxed">{element.subContent}</p>
            )}
          </div>
        );
        break;

      case 'quote':
        contentNode = (
          <blockquote
            className={`italic font-medium ${element.styles.fontSize || 'text-lg'} ${
              element.styles.textAlign ? `text-${element.styles.textAlign}` : 'text-center'
            } ${element.styles.padding || 'py-3'}`}
            style={{ color: element.styles.color || '#4B5563' }}
          >
            {element.content}
          </blockquote>
        );
        break;

      default:
        contentNode = <div>{element.content}</div>;
    }

    return (
      <div
        key={element.id}
        onClick={(e) => handleElementClick(e, element, section)}
        className={`relative group transition-all duration-150 rounded-lg ${
          !isCleanPreview ? 'cursor-pointer hover:ring-2 hover:ring-blue-400/60 p-1 -m-1' : ''
        } ${isSelected ? 'ring-2 ring-blue-600 bg-blue-50/20 z-10' : ''}`}
      >
        {/* Selection Badge & Action Toolbar */}
        {isSelected && !isCleanPreview && (
          <div className="absolute -top-7 left-0 flex items-center gap-1 bg-blue-600 text-white text-[11px] font-semibold py-0.5 px-2 rounded-t shadow-md z-30 pointer-events-auto">
            <span>{element.label}</span>
            <div className="flex items-center ml-2 border-l border-blue-400/50 pl-1.5 gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveElement(element.id, 'up');
                }}
                className="hover:text-blue-200 p-0.5"
                title="Di chuyển lên"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveElement(element.id, 'down');
                }}
                className="hover:text-blue-200 p-0.5"
                title="Di chuyển xuống"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
              {isMobileEditorMode && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBottomTab('edit');
                  }}
                  className="hover:text-blue-200 p-0.5"
                  title="Sửa nội dung"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteElement(element.id);
                }}
                className="hover:text-red-200 p-0.5 text-red-100"
                title="Xóa phần tử"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {contentNode}
      </div>
    );
  };

  return (
    <div
      className={`w-full min-h-full transition-all bg-white select-none ${
        isMobileContainer ? 'max-w-[420px] mx-auto' : ''
      }`}
    >
      {project.sections
        .filter((sec) => sec.isVisible)
        .map((section) => (
          <section
            key={section.id}
            className={`w-full px-4 sm:px-8 transition-colors ${section.paddingY || 'py-12'} ${
              section.borderBottom ? 'border-b border-gray-200' : ''
            }`}
            style={{
              backgroundColor: section.backgroundColor || '#FFFFFF',
              color: section.textColor || '#000000',
            }}
          >
            <div className="max-w-[1040px] mx-auto space-y-4">
              {section.subtitle && (
                <p className="text-xs font-semibold tracking-wider uppercase opacity-75">
                  {section.subtitle}
                </p>
              )}
              {section.elements.map((el) => renderElement(el, section))}
            </div>
          </section>
        ))}
    </div>
  );
};
