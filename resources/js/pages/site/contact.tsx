import { router, usePage } from '@inertiajs/react';
import { Clock, Globe2, Mail, MapPin, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { Seo } from '@/components/site/seo';
import { str, useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

type SiteSettings = {
    email?: string;
    phone?: string;
    whatsapp?: string;
    whatsapp_url?: string;
    address?: string;
    hours?: string;
    map_embed?: string;
};

type ExportInfo = {
    served: string;
    servedValue: string;
    terms: string;
    termsValue: string;
    min: string;
    minValue: string;
    ports: string;
    portsValue: string;
};

type ContactProps = {
    settings: SiteSettings;
    faqs?: Array<{ id?: number; question: string; answer: string }>;
};

function Field({
    label,
    error,
    required,
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink">
                {label}
                {required && <span className="text-terra"> *</span>}
            </span>
            {children}
            {error && <span className="mt-2 block text-xs font-medium text-destructive">{error}</span>}
        </label>
    );
}

const inputClass =
    'w-full rounded-sm border border-border/90 bg-card px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-coffee/50 focus:border-terra focus:ring-2 focus:ring-terra/20';

export default function Contact({ settings, faqs = [] }: ContactProps) {
    const { t, locale } = useTranslations();
    const page = usePage();
    const errors = (page.props.errors ?? {}) as Record<string, string>;
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        country: '',
        quantity: '',
        message: '',
    });

    const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = (e: FormEvent): void => {
        e.preventDefault();
        setProcessing(true);

        router.post(
            `/${locale}/contact/inquiry`,
            form,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setProcessing(false);
                    setSubmitted(true);
                },
                onError: () => setProcessing(false),
            },
        );
    };

    const exportInfo = t('contact.export') as unknown as ExportInfo;
    const exportRows = [
        { label: exportInfo.served, value: exportInfo.servedValue },
        { label: exportInfo.terms, value: exportInfo.termsValue },
        { label: exportInfo.min, value: exportInfo.minValue },
        { label: exportInfo.ports, value: exportInfo.portsValue },
    ];

    const faqItems = faqs.length > 0
        ? faqs
        : (t('contact.faq.items') as unknown as Array<{ q: string; a: string }>).map(
              (item) => ({ question: item.q, answer: item.a }),
          );

    return (
        <>
            <Seo
                title={str(t('contact.hero.title'))}
                description={str(t('contact.hero.subtitle'))}
                path={`/${locale}/contact`}
                image="/images/contact-hero.jpg"
            />

            {/* Hero — eyebrow #1 (only eyebrow in this section) */}
            <PageHero
                image="/images/contact-hero.jpg"
                eyebrow={str(t('contact.hero.eyebrow'))}
                title={str(t('contact.hero.title'))}
                subtitle={str(t('contact.hero.subtitle'))}
            />

            {/* Main Contact Section: form (7 cols) + business info (5 cols) */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

                        {/* Form — col-span-7 */}
                        <Reveal className="lg:col-span-7">
                            <div className="card-luxury p-8 md:p-12">
                                <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
                                    {str(t('contact.form.title'))}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-coffee">
                                    {str(t('contact.form.description'))}
                                </p>

                                {submitted ? (
                                    <div className="mt-8 rounded-sm border border-forest/30 bg-olive/80 p-8 text-center">
                                        <ShieldCheck className="mx-auto size-10 text-forest" />
                                        <p className="mt-3 font-display text-2xl font-bold text-forest-deep">
                                            {str(t('contact.form.success'))}
                                        </p>
                                        <p className="mt-2 text-sm text-forest-deep/80">
                                            {locale === 'en'
                                                ? 'Our export sales team will review your inquiry and contact you within 24 business hours.'
                                                : 'Tim ekspor kami akan meninjau pesan Anda dan merespons dalam 24 jam kerja.'}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field
                                                label={str(t('contact.form.name'))}
                                                required
                                                error={errors.name}
                                            >
                                                <input
                                                    className={inputClass}
                                                    placeholder={str(t('contact.form.namePh'))}
                                                    value={form.name}
                                                    onChange={update('name')}
                                                    required
                                                />
                                            </Field>
                                            <Field
                                                label={str(t('contact.form.company'))}
                                                error={errors.company}
                                            >
                                                <input
                                                    className={inputClass}
                                                    placeholder={str(t('contact.form.companyPh'))}
                                                    value={form.company}
                                                    onChange={update('company')}
                                                />
                                            </Field>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field
                                                label={str(t('contact.form.email'))}
                                                required
                                                error={errors.email}
                                            >
                                                <input
                                                    type="email"
                                                    className={inputClass}
                                                    placeholder={str(t('contact.form.emailPh'))}
                                                    value={form.email}
                                                    onChange={update('email')}
                                                    required
                                                />
                                            </Field>
                                            <Field
                                                label={str(t('contact.form.country'))}
                                                error={errors.country}
                                            >
                                                <input
                                                    className={inputClass}
                                                    placeholder={str(t('contact.form.countryPh'))}
                                                    value={form.country}
                                                    onChange={update('country')}
                                                />
                                            </Field>
                                        </div>

                                        <Field
                                            label={str(t('contact.form.quantity'))}
                                            error={errors.quantity}
                                        >
                                            <input
                                                className={inputClass}
                                                placeholder={str(t('contact.form.quantityPh'))}
                                                value={form.quantity}
                                                onChange={update('quantity')}
                                            />
                                        </Field>

                                        <Field
                                            label={str(t('contact.form.message'))}
                                            required
                                            error={errors.message}
                                        >
                                            <textarea
                                                className={cn(inputClass, 'min-h-36 resize-y')}
                                                placeholder={str(t('contact.form.messagePh'))}
                                                value={form.message}
                                                onChange={update('message')}
                                                required
                                            />
                                        </Field>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terra px-8 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep hover:shadow-glow-terra active:translate-y-0 disabled:opacity-60"
                                        >
                                            <Send className="size-4" />
                                            {str(t('contact.form.submit'))}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </Reveal>

                        {/* Business Info — col-span-5, simple stack (no cards) */}
                        <Reveal delay={120} className="lg:col-span-5">
                            <h3 className="font-display text-2xl font-bold text-ink">
                                {str(t('contact.info.title'))}
                            </h3>

                            <ul className="mt-6 divide-y divide-border/60">
                                {settings.address && (
                                    <li className="flex items-start gap-4 py-5">
                                        <MapPin className="mt-0.5 size-5 shrink-0 text-forest" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-coffee">
                                                {str(t('contact.info.office'))}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-ink leading-relaxed">
                                                {settings.address}
                                            </p>
                                        </div>
                                    </li>
                                )}
                                {settings.email && (
                                    <li className="flex items-start gap-4 py-5">
                                        <Mail className="mt-0.5 size-5 shrink-0 text-forest" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-coffee">
                                                {str(t('contact.info.email'))}
                                            </p>
                                            <a
                                                href={`mailto:${settings.email}`}
                                                className="mt-1 block text-sm font-medium text-ink transition-colors hover:text-terra"
                                            >
                                                {settings.email}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {settings.whatsapp && (
                                    <li className="flex items-start gap-4 py-5">
                                        <MessageCircle className="mt-0.5 size-5 shrink-0 text-forest" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-coffee">
                                                {str(t('contact.info.whatsapp'))}
                                            </p>
                                            <a
                                                href={settings.whatsapp_url ?? '#'}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 block text-sm font-medium text-ink transition-colors hover:text-terra"
                                            >
                                                {settings.whatsapp}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {settings.hours && (
                                    <li className="flex items-start gap-4 py-5">
                                        <Clock className="mt-0.5 size-5 shrink-0 text-forest" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-coffee">
                                                Operational Hours
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-ink">
                                                {settings.hours}
                                            </p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Export Info — dark (ink) bg, eyebrow #2 (only 1 more after hero), asymmetric layout */}
            <section className="bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                            {str(t('contact.export.eyebrow' as any) || 'Export Ready')}
                        </p>
                    </Reveal>

                    {/* First stat: Markets — full-width horizontal banner */}
                    <Reveal>
                        <div className="mt-4 flex items-baseline justify-between border-b border-cream/10 pb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/50">
                                {exportRows[0].label}
                            </p>
                            <p className="font-display text-5xl font-bold text-cream md:text-7xl">
                                {exportRows[0].value}
                            </p>
                        </div>
                    </Reveal>

                    {/* Remaining 3 stats — 3-col grid */}
                    <div className="mt-8 grid gap-8 sm:grid-cols-3">
                        {exportRows.slice(1).map((row, i) => (
                            <Reveal key={row.label} delay={(i + 1) * 80}>
                                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                                    {row.label}
                                </dt>
                                <dd className="mt-3 font-display text-3xl font-bold text-cream md:text-4xl">
                                    {row.value}
                                </dd>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ — 2-col split, no accordion, no eyebrow */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-16 lg:grid-cols-12">
                        {/* Left: heading + description */}
                        <Reveal className="lg:col-span-4">
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('contact.faq.title'))}
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-coffee">
                                {str(t('contact.faq.description' as any) || '')}
                            </p>
                        </Reveal>

                        {/* Right: plain divide-y FAQ rows */}
                        <Reveal delay={80} className="lg:col-span-8">
                            <dl className="divide-y divide-border/60">
                                {faqItems.map((item) => (
                                    <div key={item.question} className="pt-5 first:pt-0">
                                        <dt className="font-semibold text-ink">{item.question}</dt>
                                        <dd className="mt-1 pb-5 text-sm text-coffee">{item.answer}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Map Section — kept as-is */}
            {settings.map_embed && (
                <section className="relative bg-bone pb-24 md:pb-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            title={str(t('contact.map.title'))}
                            align="center"
                            className="mx-auto mb-10"
                        />
                        <div className="overflow-hidden rounded-sm border border-border/80 bg-olive shadow-earth [&>iframe]:block [&>iframe]:h-[420px] [&>iframe]:w-full [&>iframe]:border-0"
                            dangerouslySetInnerHTML={{
                                __html: settings.map_embed,
                            }}
                        />
                    </div>
                </section>
            )}
        </>
    );
}
