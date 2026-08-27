import { Link, usePage } from '@inertiajs/react';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';

import { Logo } from '@/components/site/logo';
import { useTranslations, str } from '@/hooks/use-translations';

type SiteSettings = {
    company_name?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    hours?: string;
    social_instagram?: string;
    social_facebook?: string;
    social_linkedin?: string;
    social_youtube?: string;
};

export function SiteFooter() {
    const { t, locale } = useTranslations();
    const settings = ((usePage().props.settings ?? {}) as SiteSettings) ?? {};

    const menu: Array<{ label: string; href: string }> = [
        { label: str(t('ui.nav.home')), href: `/${locale}` },
        { label: str(t('ui.nav.about')), href: `/${locale}/about` },
        { label: str(t('ui.nav.product')), href: `/${locale}/product` },
        { label: str(t('ui.nav.process')), href: `/${locale}/process` },
        { label: str(t('ui.nav.contact')), href: `/${locale}/contact` },
        { label: str(t('ui.nav.blog')), href: `/${locale}/blog` },
    ];

    const socials = [
        { href: settings.social_instagram, icon: Instagram, label: 'Instagram' },
        { href: settings.social_facebook, icon: Facebook, label: 'Facebook' },
        { href: settings.social_linkedin, icon: Linkedin, label: 'LinkedIn' },
    ].filter((s) => s.href);

    const displayAddress =
        settings.address ||
        str(t('contact.info.address')) ||
        'Dolok Sanggul, Kec. Dolok sanggul, Kabupaten Humbang Hasundutan, Sumatera Utara 22457';

    return (
        <footer className="relative overflow-hidden bg-ink text-cream">
            {/* Subtle atmospheric ambient glow */}
            <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-terra/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-10 size-80 rounded-full bg-forest/10 blur-3xl" />

            <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
                {/* Upper B2B Direct Strip */}
                <div className="mb-14 grid items-center gap-6 rounded-sm border border-cream/15 bg-cream/5 p-6 backdrop-blur-xs md:grid-cols-[1fr_auto] md:p-8">
                    <div>
                        <span className="badge-origin mb-2 border-terra/40 bg-terra/20 text-cream">
                            {locale === 'en' ? 'Direct Export Trade' : 'Ekspor Langsung'}
                        </span>
                        <h3 className="font-display text-2xl tracking-tight text-cream md:text-3xl">
                            {locale === 'en'
                                ? 'Looking for Specialty Indonesian Green Beans?'
                                : 'Mencari Kopi Specialty Asal Indonesia?'}
                        </h3>
                        <p className="mt-1 text-sm text-cream/70">
                            {locale === 'en'
                                ? 'Request cupping samples, spec sheets, or contract pricing directly.'
                                : 'Minta sampel cupping, lembar spesifikasi, atau penawaran kontrak langsung.'}
                        </p>
                    </div>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-terra px-6 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep hover:shadow-glow-terra hover:-translate-y-0.5"
                    >
                        {str(t('ui.cta.sample'))} →
                    </Link>
                </div>

                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Logo href={`/${locale}`} variant="white" className="text-cream" />
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
                            {str(t('ui.footer.tagline'))}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-terra">
                            <span>2°15&apos;N 98°45&apos;E</span>
                            <span className="opacity-40">•</span>
                            <span>Dolok Sanggul, North Sumatra</span>
                        </div>
                        {socials.length > 0 && (
                            <div className="mt-6 flex gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        className="grid size-10 place-items-center rounded-full border border-cream/20 bg-white/5 text-cream/80 transition-all hover:border-terra hover:bg-terra hover:text-cream hover:shadow-glow-terra"
                                    >
                                        <s.icon className="size-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                            {str(t('ui.footer.menu'))}
                        </h4>
                        <ul className="mt-5 space-y-3">
                            {menu.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-cream/70 transition-colors hover:text-cream"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                            {str(t('ui.footer.contact'))}
                        </h4>
                        <ul className="mt-5 space-y-3.5 text-sm text-cream/75">
                            {displayAddress && (
                                <li className="flex gap-3">
                                    <MapPin className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <span>{displayAddress}</span>
                                </li>
                            )}
                            {settings.email && (
                                <li className="flex gap-3">
                                    <Mail className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="transition-colors hover:text-cream hover:underline"
                                    >
                                        {settings.email}
                                    </a>
                                </li>
                            )}
                            {settings.whatsapp && (
                                <li className="flex gap-3">
                                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <a
                                        href={settings.whatsapp_url ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="transition-colors hover:text-cream hover:underline"
                                    >
                                        {settings.whatsapp}
                                    </a>
                                </li>
                            )}
                            {settings.hours && (
                                <li className="flex gap-3">
                                    <Clock className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <span>{settings.hours}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/50 md:flex-row md:items-center">
                    <p>
                        © {new Date().getFullYear()} {settings.company_name ?? 'Given Coffee'}.{' '}
                        {str(t('ui.footer.rights'))}
                    </p>
                    <Link href="/admin/login" className="opacity-50 transition-opacity hover:opacity-100">
                        {str(t('ui.nav.admin'))}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
