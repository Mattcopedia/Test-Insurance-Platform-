import { cn } from '@wrapa/ui'
import Image from 'next/image'

const TEAM = [
  {
    name: 'Frank Njiiri',
    role: 'Executive Director',
    org: 'Wrapa Insurtech East Africa Limited',
    bio: "Leads WRAPA's expansion across East Africa, driving strategic partnerships and growth in the region's insurance market.",
    photo:
      'https://res.cloudinary.com/dxpnod1bu/image/upload/v1780681756/executive_director_zobo7x.jpg',
    initials: 'FN',
    bg: 'bg-[#002046]',
  },
  {
    name: 'Paul Ehimen',
    role: 'Co-founder & CEO',
    bio: 'Former Head of Partnerships at Oil and Gas. Building WRAPA to solve the problem he lived firsthand.',
    initials: 'PE',
    bg: 'bg-[#002046]',
  },
  {
    name: 'Bruno',
    role: 'Co-founder & CTO',
    bio: 'Software Engineer ',
    initials: 'AM',
    bg: 'bg-[#990505]',
  },
  {
    name: 'Rukevwe Ojumah',
    role: 'Co Founder',
    bio: 'FIRS Tax Officer and a tax consultant.',
    initials: 'RO',
    bg: 'bg-[#166534]',
  },

  {
    name: 'Joshua',
    role: 'Engineering Head and Backend Developer',
    bio: 'Former Software Engineer at Microsoft. Ensures WRAPA operates at the highest standard across all markets.',
    initials: 'JE',
    bg: 'bg-[#1e40af]',
  },
]

export function AboutTeam() {
  return (
    <section className="bg-[#fafbfd] py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section heading */}
        <div className="mb-10 lg:mb-16">
          <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            The people behind WRAPA
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[1.6] text-black/60 max-w-[660px]">
            A team of operators, engineers, and insurance practitioners who have lived the problem
            they are solving.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-[18px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.06)] p-8 lg:p-10 flex flex-col gap-5"
            >
              {/* Avatar */}
              {'photo' in member && member.photo ? (
                <div className="size-[72px] lg:size-[88px] rounded-full overflow-hidden shrink-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={88}
                    height={88}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    'size-[72px] lg:size-[88px] rounded-full flex items-center justify-center shrink-0',
                    member.bg
                  )}
                >
                  <span className="font-serif font-bold text-white text-[22px] lg:text-[26px] leading-none">
                    {member.initials}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-serif text-[20px] lg:text-[26px] font-bold text-black/80 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[14px] lg:text-[16px] text-[#990505] font-semibold mt-1">
                  {member.role}
                </p>
                {'org' in member && member.org && (
                  <p className="text-[12px] lg:text-[13px] text-black/40 font-medium mt-0.5">
                    {member.org}
                  </p>
                )}
              </div>

              <p className="text-[15px] lg:text-[17px] leading-[1.7] text-black/60">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
