import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

type LogoProps = {
    href: string;
    className?: string;
    variant?: 'color' | 'white';
};

export function Logo({ href, className, variant = 'color' }: LogoProps) {
    return (
        <Link href={href} className={cn('flex items-center transition-opacity hover:opacity-90', className)}>
            <img
                src={variant === 'white' ? '/images/real/logo-white.png' : '/images/real/logo.png'}
                alt="Given Coffee"
                className="h-10 w-auto object-contain md:h-12"
            />
        </Link>
    );
}
