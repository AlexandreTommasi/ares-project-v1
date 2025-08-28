import { forwardRef } from 'react';
import { inputVariants } from './variants';
import { InputProps } from './types';
import { clsx } from 'clsx';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(inputVariants({ className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
