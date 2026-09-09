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
    terra: 'bg-terra text-cream shadow-sm hover:bg-terra-deep hover:shadow-glow-terra hover:-translate-y-0.5',
    dark: 'bg-ink text-cream shadow-sm hover:bg-espresso hover:shadow-earth hover:-translate-y-0.5',
    outline:
        'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/5 hover:-translate-y-0.5',
    'outline-light':
        'border border-cream/35 bg-white/5 backdrop-blur-xs text-cream hover:border-cream hover:bg-cream hover:text-ink hover:-translate-y-0.5',
};

export function Cta({
    href,
    children,
    variant = 'terra',
    className,
}: CtaProps) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-200 active:translate-y-0 disabled:opacity-50',
                variants[variant],
                className,
            )}
        >
            {children}
        </Link>
    );
}
