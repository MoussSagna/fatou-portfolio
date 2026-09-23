import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

/**
 * shadcn/ui Button, re-skinned for the portfolio: pill shapes, ink primary,
 * hairline outline. Variants limited to those present in the mockup.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-sans font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-soft) outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-ink text-white hover:bg-terracotta',
        outline: 'border border-ink/80 bg-transparent text-ink hover:bg-ink hover:text-white',
        ghost: 'text-ink hover:bg-nude-200',
      },
      size: {
        default: 'h-12 px-6 text-[0.9375rem]',
        lg: 'h-14 px-8 text-base',
        icon: 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
