import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Analytics } from '@/components/site/analytics';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';

type SiteLayoutProps = {
    children: ReactNode;
};

type SiteSettings = {
    ga_id?: string;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    const settings = ((usePage().props.settings ?? {}) as SiteSettings) ?? {};

    // ponytail: marketing site is a locked light theme; admin keeps its own toggle
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    return (
        <div className="flex min-h-[100dvh] flex-col bg-white text-ink">
            <Analytics gaId={settings.ga_id} />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
