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
        <footer className="bg-ink text-cream">
            <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Logo href={`/${locale}`} variant="white" className="text-cream" />
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
                            {str(t('ui.footer.tagline'))}
                        </p>
                        {socials.length > 0 && (
                            <div className="mt-6 flex gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        className="grid size-10 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-terra hover:text-terra"
                                    >
                                        <s.icon className="size-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
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
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
                            {str(t('ui.footer.contact'))}
                        </h4>
                        <ul className="mt-5 space-y-3 text-sm text-cream/70">
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
                                        className="hover:text-cream"
                                    >
                                        {settings.email}
                                    </a>
                                </li>
                            )}
                            {settings.whatsapp && (
                                <li className="flex gap-3">
                                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <span>{settings.whatsapp}</span>
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

                <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row md:items-center">
                    <p>
                        © {new Date().getFullYear()} {settings.company_name ?? 'Given Coffee'}.{' '}
                        {str(t('ui.footer.rights'))}
                    </p>
                    <Link href="/admin/login" className="opacity-60 transition-opacity hover:opacity-100">
                        {str(t('ui.nav.admin'))}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
