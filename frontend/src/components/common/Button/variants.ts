import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    variant: {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
    size: {
      sm: 'h-9 px-3',
      md: 'h-10 px-4',
      lg: 'h-11 px-8',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
