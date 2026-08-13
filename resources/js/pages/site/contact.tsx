import { router, usePage } from '@inertiajs/react';
import { Clock, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
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
            <span className="mb-2 block text-sm font-medium text-ink">
                {label}
                {required && <span className="text-terra"> *</span>}
            </span>
            {children}
            {error && <span className="mt-2 block text-sm text-terra-deep">{error}</span>}
        </label>
    );
}

const inputClass =
    'w-full rounded-md border border-input bg-white px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-coffee/50 focus:border-terra focus:ring-2 focus:ring-terra/30';

export default function Contact({ settings }: ContactProps) {
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

    return (
        <>
            <Seo
                title={str(t('contact.hero.title'))}
                description={str(t('contact.hero.subtitle'))}
                path={`/${locale}/contact`}
                image="/images/contact-hero.jpg"
            />

            <PageHero
                image="/images/contact-hero.jpg"
                eyebrow={str(t('contact.hero.eyebrow'))}
                title={str(t('contact.hero.title'))}
                subtitle={str(t('contact.hero.subtitle'))}
            />

            <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
                    {/* Form */}
                    <Reveal className="lg:col-span-3">
                        <div className="rounded-sm border border-border bg-white p-7 md:p-10">
                            <h2 className="font-display text-2xl text-ink md:text-3xl">
                                {str(t('contact.form.title'))}
                            </h2>
                            <p className="mt-2 text-sm text-coffee">
                                {str(t('contact.form.description'))}
                            </p>

                            {submitted ? (
                                <div className="mt-8 rounded-md bg-olive px-6 py-8 text-center">
                                    <p className="font-display text-xl text-forest-deep">
                                        {str(t('contact.form.success'))}
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
                                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terra px-7 text-sm font-semibold text-cream transition-all hover:bg-terra-deep active:translate-y-px disabled:opacity-60"
                                    >
                                        <Send className="size-4" />
                                        {str(t('contact.form.submit'))}
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>

                    {/* Business info */}
                    <Reveal delay={120} className="lg:col-span-2">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">
                            {str(t('contact.info.title'))}
                        </h3>
                        <ul className="mt-6 space-y-5">
                            {settings.address && (
                                <li className="flex gap-4">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive text-forest">
                                        <MapPin className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {str(t('contact.info.office'))}
                                        </p>
                                        <p className="mt-0.5 text-sm text-coffee">
                                            {settings.address}
                                        </p>
                                    </div>
                                </li>
                            )}
                            {settings.email && (
                                <li className="flex gap-4">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive text-forest">
                                        <Mail className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {str(t('contact.info.email'))}
                                        </p>
                                        <a
                                            href={`mailto:${settings.email}`}
                                            className="mt-0.5 block text-sm text-coffee hover:text-terra"
                                        >
                                            {settings.email}
                                        </a>
                                    </div>
                                </li>
                            )}
                            {settings.whatsapp && (
                                <li className="flex gap-4">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive text-forest">
                                        <MessageCircle className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {str(t('contact.info.whatsapp'))}
                                        </p>
                                        <a
                                            href={settings.whatsapp_url ?? '#'}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-0.5 block text-sm text-coffee hover:text-terra"
                                        >
                                            {settings.whatsapp}
                                        </a>
                                    </div>
                                </li>
                            )}
                            {settings.hours && (
                                <li className="flex gap-4">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-olive text-forest">
                                        <Clock className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {str(t('contact.info.office'))}
                                        </p>
                                        <p className="mt-0.5 text-sm text-coffee">
                                            {settings.hours}
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </Reveal>
                </div>

                {/* Export info */}
                <div className="mt-20 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
                    {exportRows.map((row, i) => (
                        <Reveal key={row.label} delay={i * 80} className="bg-white">
                            <div className="flex h-full flex-col p-7">
                                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
                                    {row.label}
                                </dt>
                                <dd className="mt-3 font-display text-lg leading-snug text-ink">
                                    {row.value}
                                </dd>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Map */}
            <section className="pb-24 md:pb-32">
                <SectionHeading
                    title={str(t('contact.map.title'))}
                    align="center"
                    className="mx-auto mb-10"
                />
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div
                        className="overflow-hidden rounded-sm border border-border bg-olive [&>iframe]:block [&>iframe]:h-[420px] [&>iframe]:w-full [&>iframe]:border-0"
                        dangerouslySetInnerHTML={{
                            __html: settings.map_embed ?? '',
                        }}
                    />
                </div>
            </section>
        </>
    );
}
