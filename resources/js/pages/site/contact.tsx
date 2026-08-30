import { router, usePage } from '@inertiajs/react';
import { Clock, Mail, MapPin, MessageCircle, Send, ShieldCheck, Globe2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import { Reveal } from '@/components/site/reveal';
import { Seo } from '@/components/site/seo';
import { str, useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

type SiteSettings = {
    email?: string;
    email_sample?: string;
    phone?: string;
    whatsapp?: string;
    whatsapp_url?: string;
    address?: string;
    hours?: string;
    map_embed?: string;
};

type ExportInfo = {
    served: string; servedValue: string;
    terms: string; termsValue: string;
    min: string; minValue: string;
    ports: string; portsValue: string;
};

type ContactProps = {
    settings: SiteSettings;
    faqs?: Array<{ id?: number; question: string; answer: string }>;
};

function Field({ label, error, required, children }: {
    label: string; error?: string; required?: boolean; children: ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-coffee">
                {label}{required && <span className="text-terra"> *</span>}
            </span>
            {children}
            {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
        </label>
    );
}

const inputClass = 'w-full border-0 border-b border-border/80 bg-transparent px-0 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-coffee/40 focus:border-terra focus:ring-0';

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-border/60 last:border-0">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
                <span className="text-sm font-semibold text-ink">{question}</span>
                <ChevronDown className={cn('size-4 shrink-0 text-coffee transition-transform duration-200', open && 'rotate-180')} />
            </button>
            {open && (
                <p className="pb-5 text-sm leading-relaxed text-coffee">{answer}</p>
            )}
        </div>
    );
}

export default function Contact({ settings, faqs = [] }: ContactProps) {
    const { t, locale } = useTranslations();
    const page = usePage();
    const errors = (page.props.errors ?? {}) as Record<string, string>;
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        name: '', company: '', email: '', phone: '',
        country: '', annual_demand: '', shipping_address: '',
    });

    const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = (e: FormEvent): void => {
        e.preventDefault();
        setProcessing(true);
        router.post(`/${locale}/contact/inquiry`, form, {
            preserveScroll: true,
            onSuccess: () => {
 setProcessing(false); setSubmitted(true); 
},
            onError: () => setProcessing(false),
        });
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
                image="/images/real/Geopark_Caldera_Toba.jpg"
            />

            {/* Split-screen: form (cream left) + info panel (ink right) — no hero, start immediately */}
            <div className="min-h-screen lg:grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">

                {/* Left — form on cream */}
                <section className="flex flex-col justify-center bg-cream px-5 py-28 md:px-12 lg:px-16 lg:py-36">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('contact.hero.eyebrow'))}
                        </p>
                        <h1 className="font-display text-4xl leading-[1.06] tracking-tight text-ink md:text-5xl">
                            {str(t('contact.hero.title'))}
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-coffee">
                            {str(t('contact.hero.subtitle'))}
                        </p>
                    </Reveal>

                    <div className="mt-12">
                        {submitted ? (
                            <Reveal>
                                <div className="flex flex-col items-start gap-4 rounded-sm border border-forest/30 bg-olive/60 p-8">
                                    <ShieldCheck className="size-10 text-forest" />
                                    <p className="font-display text-xl text-ink">{str(t('contact.form.success'))}</p>
                                </div>
                            </Reveal>
                        ) : (
                            <Reveal delay={80}>
                                <form onSubmit={submit} className="space-y-6" noValidate>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label={str(t('contact.form.name'))} required error={errors.name}>
                                            <input className={inputClass} placeholder={str(t('contact.form.namePh'))} value={form.name} onChange={update('name')} required />
                                        </Field>
                                        <Field label={str(t('contact.form.company'))} required error={errors.company}>
                                            <input className={inputClass} placeholder={str(t('contact.form.companyPh'))} value={form.company} onChange={update('company')} required />
                                        </Field>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label={str(t('contact.form.email'))} required error={errors.email}>
                                            <input type="email" className={inputClass} placeholder={str(t('contact.form.emailPh'))} value={form.email} onChange={update('email')} required />
                                        </Field>
                                        <Field label={str(t('contact.form.phone'))} required error={errors.phone}>
                                            <input type="tel" className={inputClass} placeholder={str(t('contact.form.phonePh'))} value={form.phone} onChange={update('phone')} required />
                                        </Field>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label={str(t('contact.form.country'))} required error={errors.country}>
                                            <input className={inputClass} placeholder={str(t('contact.form.countryPh'))} value={form.country} onChange={update('country')} required />
                                        </Field>
                                        <Field label={str(t('contact.form.annualDemand'))} required error={errors.annual_demand}>
                                            <input className={inputClass} placeholder={str(t('contact.form.annualDemandPh'))} value={form.annual_demand} onChange={update('annual_demand')} required />
                                        </Field>
                                    </div>

                                    <Field label={str(t('contact.form.shippingAddress'))} required error={errors.shipping_address}>
                                        <input className={inputClass} placeholder={str(t('contact.form.shippingAddressPh'))} value={form.shipping_address} onChange={update('shipping_address')} required />
                                    </Field>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-sm font-semibold text-cream transition-all hover:bg-espresso disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <span className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                                            ) : (
                                                <Send className="size-4" />
                                            )}
                                            {str(t('contact.form.submit'))}
                                        </button>
                                    </div>
                                </form>
                            </Reveal>
                        )}
                    </div>
                </section>

                {/* Right — dark ink info panel, sticky on desktop */}
                <aside className="relative bg-ink px-5 py-16 md:px-10 lg:sticky lg:top-0 lg:py-36">
                    <div className="pointer-events-none absolute -top-20 right-0 size-80 rounded-full bg-terra/10 blur-3xl" />

                    <Reveal className="relative">
                        {/* Export info table */}
                        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-terra">
                            {str(t('contact.export.title'))}
                        </p>
                        <dl className="divide-y divide-cream/10">
                            {exportRows.map((row) => (
                                <div key={row.label} className="py-4">
                                    <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">{row.label}</dt>
                                    <dd className="text-sm font-semibold text-cream">{row.value}</dd>
                                </div>
                            ))}
                        </dl>

                        {/* Official contact information */}
                        <div className="mt-10 space-y-4 border-t border-cream/10 pt-10">
                            {settings.email && (
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">{str(t('contact.info.emailExport'))}</p>
                                    <a href={`mailto:${settings.email}`} className="mt-1 flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                                        <Mail className="size-4 shrink-0 text-terra" />
                                        {settings.email}
                                    </a>
                                </div>
                            )}
                            {settings.email_sample && (
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">{str(t('contact.info.emailSample'))}</p>
                                    <a href={`mailto:${settings.email_sample}`} className="mt-1 flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                                        <Mail className="size-4 shrink-0 text-terra" />
                                        {settings.email_sample}
                                    </a>
                                </div>
                            )}
                            {settings.whatsapp_url && (
                                <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-cream/70 transition-colors hover:text-cream">
                                    <MessageCircle className="size-4 shrink-0 text-terra" />
                                    {settings.whatsapp}
                                </a>
                            )}
                            {settings.address && (
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">{str(t('contact.info.office'))}</p>
                                    <div className="mt-1 flex items-start gap-3 text-sm text-cream/70">
                                        <MapPin className="mt-0.5 size-4 shrink-0 text-terra" />
                                        {settings.address}
                                    </div>
                                </div>
                            )}
                            {settings.hours && (
                                <div className="flex items-center gap-3 text-sm text-cream/70">
                                    <Clock className="size-4 shrink-0 text-terra" />
                                    {settings.hours}
                                </div>
                            )}
                        </div>

                        {/* Certifications strip */}
                        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-cream/10 pt-10 text-[10px] font-semibold uppercase tracking-wider text-cream/40">
                            <Globe2 className="size-3.5 text-terra" />
                            <span>NIB</span><span>·</span>
                            <span>Halal</span><span>·</span>
                            <span>Phytosanitary</span><span>·</span>
                            <span>CoO</span>
                        </div>
                    </Reveal>
                </aside>
            </div>

            {/* FAQ — bone bg, borderless accordion, full-width */}
            <section className="bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[860px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('contact.faq.eyebrow'))}
                        </p>
                        <h2 className="mb-12 font-display text-3xl font-bold text-ink md:text-4xl">
                            {str(t('contact.faq.title'))}
                        </h2>
                    </Reveal>
                    <div>
                        {faqItems.map((item) => (
                            <FaqItem key={item.question} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Map */}
            {settings.map_embed && (
                <section className="bg-bone pb-24 md:pb-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <div
                            className="overflow-hidden rounded-sm border border-border/80 shadow-earth [&>iframe]:block [&>iframe]:h-[420px] [&>iframe]:w-full [&>iframe]:border-0"
                            dangerouslySetInnerHTML={{ __html: settings.map_embed }}
                        />
                    </div>
                </section>
            )}
        </>
    );
}
