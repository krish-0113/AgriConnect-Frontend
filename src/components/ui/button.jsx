import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const buttonVariants = {
  variant: {
    default: 'bg-primary text-white hover:bg-emerald-600 shadow-md shadow-primary/10',
    outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
    secondary: 'bg-secondary text-white hover:bg-amber-600 shadow-md shadow-secondary/10',
    ghost: 'hover:bg-muted text-foreground',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/10',
    link: 'text-primary underline-offset-4 hover:underline bg-transparent p-0',
  },
  size: {
    default: 'h-11 px-6 text-sm rounded-xl',
    xs: 'h-8 px-2.5 text-xs rounded-lg',
    sm: 'h-9 px-4 text-xs rounded-xl',
    lg: 'h-14 px-8 text-base rounded-2xl',
    icon: 'h-10 w-10 rounded-xl',
  }
};

const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-bold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

  const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default;
  const sizeClass = buttonVariants.size[size] || buttonVariants.size.default;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.01, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(baseClasses, variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };
