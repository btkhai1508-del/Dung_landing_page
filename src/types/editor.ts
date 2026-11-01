export type ElementType = 'heading' | 'subheading' | 'paragraph' | 'button' | 'image' | 'badge' | 'card' | 'quote' | 'list-item';

export interface StyleProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  maxWidth?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface EditorElement {
  id: string;
  type: ElementType;
  label: string;
  content: string;
  subContent?: string;
  icon?: string;
  imageUrl?: string;
  badgeText?: string;
  styles: StyleProps;
}

export interface EditorSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingY?: string;
  borderBottom?: boolean;
  elements: EditorElement[];
  isVisible: boolean;
}

export interface ProjectData {
  id: string;
  name: string;
  templateId: 'straightforward-redo' | 'nang-luong-tu-vi' | 'positivus-affiliate';
  updatedAt: string;
  sections: EditorSection[];
}

export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
export type MobileBottomTab = 'none' | 'add' | 'edit' | 'style' | 'layers' | 'more';
