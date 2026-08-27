import { CheckCircle2, FlaskConical, Gauge, Globe2, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { Seo } from '@/components/site/seo';
import { arr, str, useTranslations } from '@/hooks/use-translations';

type JourneyStep = { title: string; text: string };
type QcPoint = { title: string; text: string };

type ExportInfo = {
    capacity: { label: string; value: string };
    lead: { label: string; value: string };
    terms: { label: string; value: string };
    docs: { label: string; value: string };
};

const journeyImages = [
    '/images/real/cherry.jpg',
    '/images/process/pulping.jpg',
    '/images/process/drying.jpg',
    '/images/process/milling.jpg',
    '/images/process/roasting.jpg',
];

export default function Process() {
    const { t, locale } = useTranslations();

    const steps = arr<JourneyStep>(t('process.journey.steps'));
    const qc = arr<QcPoint>(t('process.qc.points'));
    const qcIcons = [Gauge, CheckCircle2, FlaskConical];
    const exportInfo = t('process.export') as unknown as ExportInfo;
    const exportRows = [
        exportInfo.capacity,
        exportInfo.lead,
        exportInfo.terms,
        exportInfo.docs,
    ];

    return (
        <>
            <Seo
                title={str(t('process.hero.title'))}
                description={str(t('process.hero.subtitle'))}
                path={`/${locale}/process`}
                image="/images/process/hero.jpg"
            />

            <PageHero
                image="/images/process/hero.jpg"
                eyebrow={str(t('process.hero.eyebrow'))}
                title={str(t('process.hero.title'))}
                subtitle={str(t('process.hero.subtitle'))}
            />

            {/* Farm to Cup Visual Journey */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('process.journey.eyebrow'))}
                        title={str(t('process.journey.title'))}
                        align="center"
                        className="mx-auto"
                    />

                    <div className="mt-20 space-y-20">
                        {steps.map((step, i) => {
                            const flipped = i % 2 === 1;
                            const fullBleed = i === 2;

                            if (fullBleed) {
                                return (
                                    <section
                                        key={step.title}
                                        className="relative flex min-h-[60vh] items-center overflow-hidden rounded-sm border border-border/80 shadow-earth-lg"
                                    >
                                        <img
                                            src={journeyImages[i]}
                                            alt={step.title}
                                            loading="lazy"
                                            className="absolute inset-0 size-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
                                        <div className="relative mx-auto max-w-2xl px-6 py-20 text-center md:px-8">
                                            <span className="badge-pill mb-3 border-terra/40 bg-terra/20 text-cream">
                                                Stage {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="mt-2 font-display text-3xl text-cream md:text-5xl">
                                                {step.title}
                                            </h3>
                                            <p className="mt-5 text-base leading-relaxed text-cream/80 md:text-lg font-light">
                                                {step.text}
                                            </p>
                                        </div>
                                    </section>
                                );
                            }

                            return (
                                <Reveal key={step.title}>
                                    <div className="card-luxury grid items-center gap-10 p-6 md:grid-cols-2 md:gap-16 md:p-10 lg:p-12">
                                        <div className={flipped ? 'md:order-2' : ''}>
                                            <div className="flex items-center gap-4">
                                                <span className="font-display text-5xl font-light text-terra md:text-6xl">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <div className="h-0.5 flex-1 bg-border/80" />
                                            </div>
                                            <h3 className="mt-6 font-display text-3xl font-bold text-ink md:text-4xl">
                                                {step.title}
                                            </h3>
                                            <p className="mt-4 max-w-md text-base leading-relaxed text-coffee">
                                                {step.text}
                                            </p>
                                        </div>
                                        <div className={flipped ? 'md:order-1' : ''}>
                                            <div className="overflow-hidden rounded-sm border border-border/80 bg-ink shadow-earth">
                                                <img
                                                    src={journeyImages[i]}
                                                    alt={step.title}
                                                    loading="lazy"
                                                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quality Control & Grading */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('process.qc.eyebrow'))}
                        title={str(t('process.qc.title'))}
                        body={str(t('process.qc.body'))}
                        align="center"
                        className="mx-auto"
                    />

                    <div className="mt-16 grid gap-6 sm:grid-cols-3">
                        {qc.map((point, i) => {
                            const Icon = qcIcons[i % qcIcons.length];

                            return (
                                <Reveal key={point.title} delay={i * 90}>
                                    <div className="card-luxury flex h-full flex-col justify-between">
                                        <div>
                                            <span className="grid size-12 place-items-center rounded-full border border-forest/20 bg-olive text-forest shadow-xs">
                                                <Icon className="size-5" />
                                            </span>
                                            <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                                                {point.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-coffee">
                                                {point.text}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-terra">
                                            <ShieldCheck className="size-4" />
                                            <span>SCA Standard Protocol</span>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Export Readiness & International Logistics */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                <div className="pointer-events-none absolute -top-20 right-0 size-96 rounded-full bg-terra/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 size-96 rounded-full bg-black/40 blur-3xl" />

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('process.export.eyebrow'))}
                        title={str(t('process.export.title'))}
                        body={str(t('process.export.body'))}
                        light
                        align="center"
                        className="mx-auto"
                    />

                    <dl className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {exportRows.map((row, i) => (
                            <Reveal key={row.label} delay={i * 90}>
                                <div className="flex h-full flex-col justify-between rounded-sm border border-cream/15 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cream/30 hover:bg-white/10">
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
                                            {row.label}
                                        </dt>
                                        <dd className="mt-4 font-display text-2xl font-bold leading-snug text-cream">
                                            {row.value}
                                        </dd>
                                    </div>
                                    <div className="mt-6 flex items-center gap-1.5 text-xs text-terra">
                                        <Globe2 className="size-3.5" />
                                        <span>International Export</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>
        </>
    );
}
