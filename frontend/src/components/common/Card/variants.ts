import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    wrapper: 'rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'text-2xl font-semibold leading-none tracking-tight',
    description: 'text-sm text-gray-400',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },
});
