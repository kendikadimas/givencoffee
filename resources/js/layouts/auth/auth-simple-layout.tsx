import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-bone p-6 md:p-10">
            <Link
                href={home('en')}
                className="flex flex-col items-center gap-3"
            >
                <img
                    src="/images/real/logo.png"
                    alt="Given Coffee"
                    className="h-24 w-auto object-contain"
                />
                <span className="sr-only">{title}</span>
            </Link>

            <div className="w-full max-w-sm rounded-md border border-border bg-cream p-8 shadow-earth">
                <div className="space-y-2">
                    <p className="font-display text-2xl font-bold text-ink">{title}</p>
                    <p className="text-sm text-coffee">{description}</p>
                </div>
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
}

