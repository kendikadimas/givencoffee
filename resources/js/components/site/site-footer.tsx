import { Link, usePage } from '@inertiajs/react';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

import { Logo } from '@/components/site/logo';
import { useTranslations, str } from '@/hooks/use-translations';

type SiteSettings = {
    company_name?: string;
    email?: string;
    email_sample?: string;
    phone?: string;
    whatsapp?: string;
    whatsapp_url?: string;
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
        { label: str(t('ui.nav.export')), href: `/${locale}/export` },
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
                {/* Upper B2B Direct Strip — clean editorial row, no box */}
                <div className="mb-16 flex flex-wrap items-center justify-between gap-8 border-b border-cream/10 pb-14">
                    <div className="max-w-xl">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {locale === 'en' ? 'Direct Export Trade' : 'Ekspor Langsung'}
                        </p>
                        <h3 className="font-display text-3xl leading-[1.1] tracking-tight text-cream md:text-4xl">
                            {locale === 'en'
                                ? 'Looking for Specialty Indonesian Green Beans?'
                                : 'Mencari Kopi Specialty Asal Indonesia?'}
                        </h3>
                    </div>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-terra px-8 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep hover:shadow-glow-terra hover:-translate-y-0.5"
                    >
                        {str(t('ui.cta.sample'))}
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
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                                            {str(t('contact.info.emailExport'))}
                                        </p>
                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="transition-colors hover:text-cream hover:underline"
                                        >
                                            {settings.email}
                                        </a>
                                    </div>
                                </li>
                            )}
                            {settings.email_sample && (
                                <li className="flex gap-3">
                                    <Mail className="mt-0.5 size-4 shrink-0 text-terra" />
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                                            {str(t('contact.info.emailSample'))}
                                        </p>
                                        <a
                                            href={`mailto:${settings.email_sample}`}
                                            className="transition-colors hover:text-cream hover:underline"
                                        >
                                            {settings.email_sample}
                                        </a>
                                    </div>
                                </li>
                            )}
                            {settings.whatsapp && (
                                <li className="flex gap-3">
                                    <svg className="mt-0.5 size-4 shrink-0 text-terra" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L.057 23.522a.5.5 0 0 0 .606.61l5.82-1.525A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.127-1.415l-.362-.214-3.758.985.999-3.648-.235-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
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
                </div>
            </div>
        </footer>
    );
}
