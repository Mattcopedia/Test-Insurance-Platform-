import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../cn'

/**
 * Extracted from Figma node 267:832 (sign in client page)
 *
 * Sign In CTA (node 941:1607–1608):
 *   bg: #000000  |  text: white  |  font: Karla Bold 20px
 *   h: 60px  |  border-radius: 10px  |  width: 480px (full-width)
 *
 * Social buttons (Google / Facebook / Apple — nodes 941:1595–1605):
 *   bg: white  |  shadow: 0px 4px 90px rgba(0,0,0,0.1)  |  rounded-[10px]
 *   font: Karla Medium 20px  |  text: rgba(0,0,0,0.8)
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-[10px] border border-transparent',
    'font-sans leading-none whitespace-nowrap select-none',
    'transition-all duration-150 ease-in-out',
    'cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      /**
       * default  — solid black CTA, matches "Sign In" / "Continue" in Figma
       * outline  — bordered, transparent bg (secondary actions)
       * ghost    — no bg, no border (tertiary / icon-adjacent)
       * destructive — red fill (delete / cancel actions)
       */
      variant: {
        default: ['bg-black text-white font-bold', 'hover:bg-neutral-800'],
        outline: [
          'border-black text-black bg-transparent font-medium',
          'hover:bg-black hover:text-white',
        ],
        ghost: ['bg-transparent text-black font-medium', 'hover:bg-black/10'],
        destructive: ['bg-red-600 text-white font-bold', 'hover:bg-red-700'],
      },
      /**
       * sm  — compact inline actions
       * md  — standard form actions  (48 px)
       * lg  — primary CTA; matches Figma's 60 px Sign In button exactly
       */
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-12 px-5 text-base',
        lg: 'h-[60px] px-6 text-[20px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      fullWidth: true,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * Renders the child element as the root node via Radix Slot, forwarding all
   * props. Use this to style a Next.js <Link> as a button without extra DOM nodes.
   *
   * @example
   * <Button asChild>
   *   <Link href="/dashboard">Go to dashboard</Link>
   * </Button>
   */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
