import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

type LogoProps = {
    href: string;
    className?: string;
    variant?: 'color' | 'white';
};

export function Logo({ href, className, variant = 'color' }: LogoProps) {
    return (
        <Link href={href} className={cn('flex items-center', className)}>
            <img
                src={variant === 'white' ? '/images/real/logo-white.png' : '/images/real/logo.png'}
                alt="Given Coffee"
                className="h-40 w-auto md:h-40"
            />
        </Link>
    );
}
