import React from 'react';

interface SectionHeadingProps {
  title?: string;
  description?: string;
  className?: string;
  maxWidthDesc?: string;
  titleClassName?: string;
  descClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title = 'Section Title',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  className = '',
  maxWidthDesc = 'max-w-[580px]',
  titleClassName = '',
  descClassName = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10 mb-10 md:mb-16 ${className}`}>
      {/* Signature Positivus Green Highlight Badge */}
      <div className="inline-flex items-center px-[9px] py-1 bg-[#B9FF66] rounded-[7px] max-w-full">
        <h2 className={`font-['Space_Grotesk'] ${titleClassName || 'font-medium'} text-[22px] sm:text-[30px] md:text-[38px] leading-[32px] sm:leading-[40px] md:leading-[48px] text-black tracking-tight break-words`}>
          {title}
        </h2>
      </div>
      {/* Subheading explanation */}
      {description && (
        <p className={`font-['Space_Grotesk'] ${descClassName || 'font-normal text-[16px] sm:text-[18px] leading-[23px] text-black'} ${maxWidthDesc}`}>
          {description}
        </p>
      )}
    </div>
  );
};
