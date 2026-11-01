import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ContactIllustration } from './PositivusIllustrations';

export const ContactSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'sayHi' | 'getQuote'>('sayHi');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Section Title 6"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          maxWidthDesc="max-w-[323px]"
        />

        {/* Grey Form Card */}
        <div className="relative bg-[#F3F3F3] rounded-[45px] p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-10 overflow-hidden">
          {/* Left: Interactive Form */}
          <form onSubmit={handleSubmit} className="w-full lg:max-w-[556px] flex flex-col gap-8 z-10">
            {/* Custom Radio Button Group */}
            <div className="flex items-center gap-8">
              {/* Say Hi */}
              <label
                onClick={() => setInquiryType('sayHi')}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <div className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center shrink-0">
                  {inquiryType === 'sayHi' && <div className="w-4 h-4 rounded-full bg-[#B9FF66]" />}
                </div>
                <span className="font-['Space_Grotesk'] text-[18px] text-black">Say Hi</span>
              </label>

              {/* Get a Quote */}
              <label
                onClick={() => setInquiryType('getQuote')}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <div className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center shrink-0">
                  {inquiryType === 'getQuote' && <div className="w-4 h-4 rounded-full bg-[#B9FF66]" />}
                </div>
                <span className="font-['Space_Grotesk'] text-[18px] text-black">Get a Quote</span>
              </label>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-input" className="font-['Space_Grotesk'] text-[16px] leading-[28px] text-black">
                  Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-[59px] px-6 bg-white border border-black rounded-[14px] font-['Space_Grotesk'] text-[18px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-input" className="font-['Space_Grotesk'] text-[16px] leading-[28px] text-black">
                  Email*
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-[59px] px-6 bg-white border border-black rounded-[14px] font-['Space_Grotesk'] text-[18px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-input" className="font-['Space_Grotesk'] text-[16px] leading-[28px] text-black">
                  Message*
                </label>
                <textarea
                  id="message-input"
                  rows={5}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-[180px] sm:h-[190px] p-6 bg-white border border-black rounded-[14px] font-['Space_Grotesk'] text-[18px] text-black placeholder:text-[#898989] focus:outline-none focus:ring-2 focus:ring-[#B9FF66] resize-none"
                />
              </div>
            </div>

            {/* Submission Status Message */}
            {submitted && (
              <div className="p-4 bg-[#B9FF66] text-black rounded-[14px] font-['Space_Grotesk'] text-center font-medium">
                Lorem ipsum dolor sit amet!
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[68px] bg-[#191A23] rounded-[14px] font-['Space_Grotesk'] text-[20px] font-normal text-white hover:bg-[#B9FF66] hover:text-[#191A23] transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              Get Started
            </button>
          </form>

          {/* Right Vector Illustration (shifted right per layout) */}
          <div className="hidden lg:flex shrink-0 items-center justify-center -mr-16">
            <ContactIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};
