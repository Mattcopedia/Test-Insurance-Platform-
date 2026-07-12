'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import Image from 'next/image'

const DirectorAvatar = '/assets/images/DirectorAvatar.png'
const OfeimunAvatar = '/assets/images/MathiasAvatar.png'
const ValOjumahAvatar = '/assets/images/ValOjumahAvatar.png'
const JoshuaAvatar = '/assets/images/JoshuaAvatar.png'
const BigRukAvatar = '/assets/images/BigRukAvatar.png'
const PaulAvatar = '/assets/images/PaulAvatar.png'
const KingsleyAvatar = '/assets/images/KingsleyAvatar.png'

const TEAM = [
  {
    name: 'Odinaka Joshua Chioma',
    role: 'CEO',
    photo: JoshuaAvatar,
    bio: 'Joshua Chioma is a Former Software Engineer at Microsoft. He is a Technical Lead and Senior Software Engineer with 9+ years of experience building scalable, high-performance backend systems across fintech, banking, e-commerce, and enterprise platforms.',
    initials: 'OJ',
    bg: 'bg-[#1e40af]',
  },
  {
    name: 'Frank Njiiri',
    role: 'Executive Director',
    org: 'Wrapa Insurtech East Africa Limited',
    bio: "Leads WRAPA's expansion across East Africa, driving strategic partnerships and growth in the region's insurance market.",
    photo: DirectorAvatar,
    initials: 'FN',
    bg: 'bg-[#002046]',
  },
  {
    name: 'Paul Ehimen',
    photo: PaulAvatar,
    role: 'Executive Director & Co-Founder',
    bio: 'Paul E. Ehimen is a co- founder and executive director of Wrapa ltd. He graduated from the University of Benin with a degree in Industrial Physics and also holds a Master of Business Management (MBM) from Metropolitan London business school.Mr Ehimen is an oil and gas professional specializing in business, commercial, project management and local content development. ',
    initials: 'PE',
    bg: 'bg-[#002046]',
  },
  {
    name: 'Kingsley Chukwuka',
    photo: KingsleyAvatar,
    role: 'CFO & Co-founder',
    bio: 'Kingsley Chukwuka, ACA is a seasoned finance and business development professional with over 18 years of experience spanning accounting, audit, taxation, logistics, oil & gas, and corporate strategy. As a Chartered Accountant and business leader, he has successfully led financial management, business growth initiatives, multimillion-dollar project financing, and cross-border logistics operations, bringing a strong blend of commercial acumen, operational excellence, and strategic leadership.',
    initials: 'KC',
    bg: 'bg-[#002046]',
  },
  {
    name: 'Bruno Otakhogbogie',
    role: 'Executive Director and CTO',
    bio: 'Software Engineer ',
    initials: 'BO',
    bg: 'bg-[#990505]',
  },
  {
    name: 'Oghenerukevwe Ojumah',
    photo: BigRukAvatar,
    role: 'Executive Director & Co-Founder',
    bio: 'A graduate of Economics from the University of Houston, Texas, [Your Name] is a seasoned business professional, serial entrepreneur, and co-founder of WRAPA, an innovative technology-driven platform focused on transforming access to insurance and related financial services in Nigeria and across Africa.With over a decade of experience in the insurance industry, he built a distinguished career spanning strategic planning, business development, digital transformation, and e-business marketing',
    initials: 'OO',
    bg: 'bg-[#166534]',
  },
  {
    name: 'Omonigho Val Ojumah',
    role: 'Chairman',
    photo: ValOjumahAvatar,
    bio: "Val Ojumah is a distinguished insurance executive and transformational business leader with more than three decades of experience in insurance brokerage, life insurance, strategic management, and digital innovation. A former Managing Director and CEO of FBN Insurance Limited, he successfully led the company from inception to become one of Nigeria's leading life insurance institutions. Recognized as Africa's Insurance CEO of the Year 2020, Ojumah has built a reputation for driving growth.",
    initials: 'OV',
    bg: 'bg-[#166534]',
  },
  {
    name: 'Ofeimun Mathias Olumese',
    role: 'Head of IT',
    photo: OfeimunAvatar,
    bio: 'Ofeimun Mathias Olumese is a Software Engineer with 4+ years of experience building scalable, production-grade web and mobile applications primarily in healthcare and finTech products.As a Doctor of Pharmacy (PharmD), I have extensive experience in pharmacotherapy and patient counseling,I bring a rare mix of clinical insight and engineering depth, allowing me to design systems that are not only technically sound but also reliable, secure, and genuinely user-centric.',
    bg: 'bg-[#1e40af]',
    initials: 'OM',
  },
  {
    name: 'Victor Onyegbado',
    role: 'CLO',
    bio: '',
    initials: 'VO',
    bg: 'bg-[#166534]',
  },
]

type TeamMember = (typeof TEAM)[number]

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn('p-2', scrollRevealClasses(isInView, 'card'))}
      style={scrollRevealStagger(isInView, index % 3)}
    >
      <div
        className={cn(
          'bg-white rounded-[18px] p-8 lg:p-10 flex flex-col gap-5 h-full ',
          'border-2 border-transparent shadow-[0px_4px_160px_0px_rgba(0,0,0,0.06)]',
          'hover:border-[#990505] hover:-translate-y-1 hover:shadow-[0px_12px_48px_0px_rgba(0,0,0,0.12)]',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out'
        )}
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
    </div>
  )
}

export function AboutTeam() {
  const { ref: headingRef, isInView: headingInView } = useInView()

  return (
    <section className="bg-[#fafbfd] py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={cn('mb-10 lg:mb-16', scrollRevealClasses(headingInView, 'heading'))}
        >
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
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
