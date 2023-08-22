'use client';

import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/app/_utils';

export default function CreateUserButton({
    children,
    ...props
}: ComponentPropsWithoutRef<'button'>) {
    const router = useRouter();

    const handleClick = () => {
        router.push('new');
    };
    return (
        <button
            onClick={handleClick}
            {...props}
            className={cn(
                'rounded-lg px-10 py-2.5 text-sm hover:font-semibold disabled:hover:font-normal',
                props.className
            )}
        >
            {children}
        </button>
    );
}
