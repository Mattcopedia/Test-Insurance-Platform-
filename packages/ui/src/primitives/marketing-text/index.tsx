import { cn } from '../../cn'
const DEFAULT_HEADING = 'Your journey begins with peace of mind.'

const DEFAULT_BODY =
  "Your journey begins with peace of mind. With our car insurance coverage, you're not just protecting your vehicle; you're safeguarding your mobility. Unexpected accidents and unforeseen events can happen, but worry not – we've got you covered."

export interface MarketingTextProps {
  heading?: string
  body: string
  className?: string
  ImageComponent?: React.ElementType
  imageSrc: string
}

function MarketingText({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  className,
  ImageComponent,
  imageSrc,
}: MarketingTextProps) {
  return (
    <div className={cn('flex w-full flex-col items-center gap-3 text-center', className)}>
      <h1
        className={cn(
          'font-sans font-normal text-[28px] sm:text-[32px]  lg:text-[24px] text-black/80 leading-tight'
        )}
      >
        {heading}
      </h1>

      <ImageComponent src={imageSrc} alt="Marketing" width={500} height={500} />

      <p
        className={cn(
          'font-sans font-normal',
          'text-[13px] sm:text-[14px] lg:text-[14.54px]',
          'leading-[19.833px]',
          'text-black/70',
          'max-w-[400px]'
        )}
      >
        {body}
      </p>
    </div>
  )
}

export { MarketingText }
