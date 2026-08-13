import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CtaProps = {
    href: string;
    children: ReactNode;
    variant?: 'terra' | 'outline' | 'dark' | 'outline-light';
    className?: string;
};

const variants: Record<NonNullable<CtaProps['variant']>, string> = {
    terra: 'bg-terra text-cream hover:bg-terra-deep',
    dark: 'bg-ink text-cream hover:bg-espresso',
    outline: 'border border-ink/25 bg-transparent text-ink hover:border-ink',
    'outline-light':
        'border border-cream/40 bg-transparent text-cream hover:bg-white hover:text-ink',
};

export function Cta({ href, children, variant = 'terra', className }: CtaProps) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 active:translate-y-px',
                variants[variant],
                className,
            )}
        >
            {children}
        </Link>
    );
}
