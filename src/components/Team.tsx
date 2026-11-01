import React from 'react';
import { SectionHeading } from './SectionHeading';
import { TeamAvatar } from './PositivusIllustrations';
import { LinkedInIcon } from './PositivusIcons';

interface TeamProps {
  onSeeAllClick?: () => void;
}

export const Team: React.FC<TeamProps> = ({ onSeeAllClick }) => {
  const teamMembers = [
    {
      id: 1,
      name: 'Subtitle 20',
      role: 'Subtitle 21',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Subtitle 22',
      role: 'Subtitle 23',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      name: 'Subtitle 24',
      role: 'Subtitle 25',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 4,
      name: 'Subtitle 26',
      role: 'Subtitle 27',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 5,
      name: 'Subtitle 28',
      role: 'Subtitle 29',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 6,
      name: 'Subtitle 30',
      role: 'Subtitle 31',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  return (
    <section id="team" className="w-full py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Section Title 4"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          maxWidthDesc="max-w-[473px]"
        />

        {/* 6 Team Member Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              className="bg-white border border-[#191A23] rounded-[45px] p-8 sm:p-9 positivus-shadow flex flex-col justify-between gap-7 hover:-translate-y-1 transition-all duration-200"
            >
              {/* Top Row: Picture + Name/Role + LinkedIn Button */}
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-end gap-5">
                  <TeamAvatar index={idx} name={member.name} />
                  <div className="flex flex-col">
                    <h4 className="font-['Space_Grotesk'] font-medium text-[20px] leading-[26px] text-black">
                      {member.name}
                    </h4>
                    <p className="font-['Space_Grotesk'] font-normal text-[16px] sm:text-[18px] leading-[23px] text-black">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* LinkedIn Icon Button */}
                <a
                  href="#contact"
                  className="w-[34px] h-[34px] rounded-full bg-black flex items-center justify-center shrink-0 text-[#B9FF66] hover:bg-[#B9FF66] hover:text-black transition-colors self-start cursor-pointer"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Horizontal line divider */}
              <div className="w-full h-px bg-black/80" />

              {/* Bio Paragraph */}
              <p className="font-['Space_Grotesk'] font-normal text-[16px] sm:text-[18px] leading-[23px] text-black">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* See All Team Button positioned at bottom-right or centered on mobile */}
        <div className="flex justify-end mt-10 sm:mt-12">
          <button
            onClick={onSeeAllClick}
            className="w-full sm:w-[269px] font-['Space_Grotesk'] text-[18px] sm:text-[20px] font-normal text-white bg-[#191A23] rounded-[14px] px-[35px] py-[20px] hover:bg-[#B9FF66] hover:text-[#191A23] transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
