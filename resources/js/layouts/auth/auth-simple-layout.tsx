import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-bone p-6 md:p-10">
            <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-terra/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-0 size-80 rounded-full bg-forest/10 blur-3xl" />

            <Link
                href={home('en')}
                className="relative flex flex-col items-center gap-3"
            >
                <img
                    src="/images/real/logo.png"
                    alt="Given Coffee"
                    className="h-24 w-auto object-contain"
                />
                <span className="sr-only">{title}</span>
            </Link>

            <div className="shadow-earth relative mt-8 w-full max-w-sm rounded-sm border border-border bg-cream p-8">
                <div className="space-y-2">
                    <p className="font-display text-2xl font-bold text-ink">
                        {title}
                    </p>
                    <p className="text-sm text-coffee">{description}</p>
                </div>
                <div className="mt-6">{children}</div>
            </div>
        </div>
    );
}
