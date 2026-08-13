import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Cta } from '@/components/site/cta';
import { Logo } from '@/components/site/logo';
import { useTranslations, str } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

export function SiteHeader() {
    const { t, locale } = useTranslations();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = (): void => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const items: Array<{ label: string; href: string }> = [
        { label: str(t('ui.nav.home')), href: `/${locale}` },
        { label: str(t('ui.nav.about')), href: `/${locale}/about` },
        { label: str(t('ui.nav.product')), href: `/${locale}/product` },
        { label: str(t('ui.nav.process')), href: `/${locale}/process` },
        { label: str(t('ui.nav.contact')), href: `/${locale}/contact` },
        { label: str(t('ui.nav.blog')), href: `/${locale}/blog` },
    ];

    const otherLocale = locale === 'en' ? 'id' : 'en';
    const currentPath =
        typeof window !== 'undefined'
            ? window.location.pathname.replace(/^\/(en|id)(?=\/|$)/, '')
            : '';
    const localeHref = `/${otherLocale}${currentPath}`;

    const dark = !scrolled && !open;

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
                scrolled || open
                    ? 'border-b border-border/70 bg-white/95 text-ink backdrop-blur-md'
                    : 'border-b border-transparent bg-transparent text-cream',
            )}
        >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
                <Logo href={`/${locale}`} variant={dark ? 'white' : 'color'} />

                <nav className="hidden items-center gap-7 lg:flex">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href={localeHref}
                        className={cn(
                            'flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                            dark
                                ? 'border-cream/30 text-cream hover:bg-white/10'
                                : 'border-ink/20 text-ink hover:border-ink',
                        )}
                    >
                        <span
                            className={cn(
                                'rounded-full px-1.5 py-0.5',
                                locale === 'en' ? 'bg-terra text-cream' : 'opacity-60',
                            )}
                        >
                            EN
                        </span>
                        <span className="opacity-40">/</span>
                        <span
                            className={cn(
                                'rounded-full px-1.5 py-0.5',
                                locale === 'id' ? 'bg-terra text-cream' : 'opacity-60',
                            )}
                        >
                            ID
                        </span>
                    </Link>

                    <Cta href={`/${locale}/contact`} className="hidden md:inline-flex">
                        {str(t('ui.cta.sample'))}
                    </Cta>

                    <button
                        type="button"
                        aria-label="Menu"
                        className="grid size-10 place-items-center rounded-full lg:hidden"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-t border-border/70 bg-white/95 px-5 pb-6 pt-3 backdrop-blur-md lg:hidden">
                    <ul className="flex flex-col">
                        {items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-between border-b border-border/50 py-4 font-display text-xl"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5">
                        <Cta href={`/${locale}/contact`} className="w-full">
                            {str(t('ui.cta.sample'))}
                        </Cta>
                    </div>
                </nav>
            )}
        </header>
    );
}
