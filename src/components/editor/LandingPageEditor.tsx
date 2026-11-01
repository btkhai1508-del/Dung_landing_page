import React from 'react';
import { EditorProvider, useEditor } from '../../context/EditorContext';
import { DesktopEditor } from './DesktopEditor';
import { MobileEditor } from './MobileEditor';

interface LandingPageEditorInnerProps {
  onBack?: () => void;
}

const LandingPageEditorInner: React.FC<LandingPageEditorInnerProps> = ({ onBack }) => {
  const { isMobileEditorMode } = useEditor();

  if (isMobileEditorMode) {
    return <MobileEditor onBack={onBack} />;
  }

  return <DesktopEditor onBack={onBack} />;
};

interface LandingPageEditorProps {
  onBack?: () => void;
}

export const LandingPageEditor: React.FC<LandingPageEditorProps> = ({ onBack }) => {
  return (
    <EditorProvider>
      <LandingPageEditorInner onBack={onBack} />
    </EditorProvider>
  );
};
