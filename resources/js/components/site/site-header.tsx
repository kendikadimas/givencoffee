import { Link, usePage } from '@inertiajs/react';
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
        const onScroll = (): void => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const items: Array<{ label: string; href: string }> = [
        { label: str(t('ui.nav.home')), href: `/${locale}` },
        { label: str(t('ui.nav.about')), href: `/${locale}/about` },
        { label: str(t('ui.nav.product')), href: `/${locale}/product` },
        { label: str(t('ui.nav.process')), href: `/${locale}/process` },
        { label: str(t('ui.nav.export')), href: `/${locale}/export` },
        { label: str(t('ui.nav.contact')), href: `/${locale}/contact` },
        { label: str(t('ui.nav.blog')), href: `/${locale}/blog` },
    ];

    const { url } = usePage();
    const pathname = url.split('?')[0];

    const otherLocale = locale === 'en' ? 'id' : 'en';
    const currentPath = pathname.replace(/^\/(en|id)(?=\/|$)/, '');
    const localeHref = `/${otherLocale}${currentPath || ''}`;

    const isContactPage = pathname.includes('/contact');
    const solid = scrolled || open || isContactPage;
    const dark = !solid;

    const isActive = (href: string) => {
        if (href === `/${locale}`) {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }

        return pathname.startsWith(href);
    };

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                solid
                    ? 'bg-cream/92 text-ink shadow-[0_4px_24px_-4px_rgba(34,26,18,0.06)] backdrop-blur-md'
                    : 'bg-gradient-to-b from-ink/60 via-ink/20 to-transparent text-cream backdrop-blur-[2px]',
            )}
        >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
                <Logo href={`/${locale}`} variant={dark ? 'white' : 'color'} />

                <nav className="hidden items-center gap-8 lg:flex">
                    {items.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'relative text-sm font-medium tracking-wide transition-all duration-200',
                                    active
                                        ? dark
                                            ? 'font-semibold text-cream'
                                            : 'font-semibold text-terra'
                                        : dark
                                          ? 'text-cream/80 hover:text-cream'
                                          : 'text-ink/75 hover:text-terra',
                                )}
                            >
                                {item.label}
                                {active && (
                                    <span
                                        className={cn(
                                            'absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full',
                                            dark ? 'bg-terra' : 'bg-terra',
                                        )}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3.5">
                    <Link
                        href={localeHref}
                        aria-label="Switch Language"
                        className={cn(
                            'flex items-center gap-1 rounded-full border p-1 text-[11px] font-semibold tracking-wider transition-all',
                            dark
                                ? 'border-cream/25 bg-black/20 text-cream backdrop-blur-xs hover:border-cream/50'
                                : 'border-border/90 bg-white/70 text-ink shadow-xs hover:border-terra/60',
                        )}
                    >
                        <span
                            className={cn(
                                'rounded-full px-2 py-0.5 transition-all',
                                locale === 'en'
                                    ? 'bg-terra text-cream shadow-xs'
                                    : dark
                                      ? 'text-cream/70 hover:text-cream'
                                      : 'text-ink/60 hover:text-ink',
                            )}
                        >
                            EN
                        </span>
                        <span
                            className={cn(
                                'rounded-full px-2 py-0.5 transition-all',
                                locale === 'id'
                                    ? 'bg-terra text-cream shadow-xs'
                                    : dark
                                      ? 'text-cream/70 hover:text-cream'
                                      : 'text-ink/60 hover:text-ink',
                            )}
                        >
                            ID
                        </span>
                    </Link>

                    <Cta
                        href={`/${locale}/contact`}
                        variant={dark ? 'outline-light' : 'terra'}
                        className="hidden md:inline-flex"
                    >
                        {str(t('ui.cta.sample'))}
                    </Cta>

                    <button
                        type="button"
                        aria-label="Menu"
                        className={cn(
                            'grid size-10 place-items-center rounded-full border transition-colors lg:hidden',
                            dark
                                ? 'border-cream/25 bg-black/20 text-cream'
                                : 'border-border bg-white text-ink',
                        )}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-t border-border/80 bg-cream/95 px-6 pt-4 pb-8 backdrop-blur-lg lg:hidden">
                    <ul className="flex flex-col">
                        {items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-between border-b border-border/60 py-4 font-display text-xl text-ink transition-colors hover:text-terra"
                                >
                                    <span>{item.label}</span>
                                    {isActive(item.href) && (
                                        <span className="size-2 rounded-full bg-terra" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <Cta
                            href={`/${locale}/contact`}
                            variant="terra"
                            className="w-full"
                        >
                            {str(t('ui.cta.sample'))}
                        </Cta>
                    </div>
                </nav>
            )}
        </header>
    );
}
