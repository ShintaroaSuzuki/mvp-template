// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import clsx, { ClassValue } from 'clsx';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { twMerge } from 'tailwind-merge';

export const cn = (...classNames: ClassValue[]) => {
    return twMerge(clsx(...classNames));
};
