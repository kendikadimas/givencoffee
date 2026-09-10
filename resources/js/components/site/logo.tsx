import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

type LogoProps = {
    href: string;
    className?: string;
    variant?: 'color' | 'white';
};

export function Logo({ href, className, variant = 'color' }: LogoProps) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center transition-opacity hover:opacity-90',
                className,
            )}
        >
            <img
                src={
                    variant === 'white'
                        ? '/images/real/logo-white-cropped.png'
                        : '/images/real/logo-cropped.png'
                }
                alt="Given Coffee"
                className="h-28 w-auto object-contain md:h-36"
            />
        </Link>
    );
}
