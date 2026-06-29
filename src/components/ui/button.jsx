import { Button } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible='size-'])],
  {
    variants: {
      variant: {
        default,
          'border-border bg-background hover,
          'bg-secondary text-secondary-foreground hover,
          'hover,
          'bg-destructive/10 text-destructive hover,
        link,
      },
      size: {
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]=inline-start],
        xs),10px)] px-2 text-xs in-data-[slot=button-group]=inline-end]=inline-start]='size-'])],
        sm),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]=inline-end]=inline-start]='size-'])],
        lg=inline-end]=inline-start],
        icon,
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]='size-'])],
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group],
        'icon-lg',
      },
    },
    defaultVariants: {
      variant,
      size,
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
