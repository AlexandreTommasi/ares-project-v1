import { forwardRef } from 'react';
import { buttonVariants } from './variants';
import { ButtonProps } from './types';
import { clsx } from 'clsx';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
