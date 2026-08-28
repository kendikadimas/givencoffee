import { CheckCircle2, FlaskConical, Gauge, Globe2, ShieldCheck } from 'lucide-react';

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
                        title={str(t('process.journey.title'))}
                        align="left"
                    />

                    <div className="mt-20 space-y-20">
                        {/* Steps 1–2: zigzag image+text */}
                        {steps.slice(0, 2).map((step, i) => {
                            const flipped = i % 2 === 1;
                            return (
                                <Reveal key={step.title}>
                                    <div className="card-luxury grid items-center gap-10 p-6 md:grid-cols-[55fr_45fr] md:gap-16 md:p-10 lg:p-12">
                                        <div className={flipped ? 'md:order-2' : ''}>
                                            <div className="overflow-hidden rounded-sm border border-border/80 bg-ink shadow-earth">
                                                <img
                                                    src={journeyImages[i]}
                                                    alt={step.title}
                                                    loading="lazy"
                                                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                        <div className={flipped ? 'md:order-1' : ''}>
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
                                    </div>
                                </Reveal>
                            );
                        })}

                        {/* Step 3: full-width image with text overlay bottom-left */}
                        {steps[2] && (
                            <Reveal>
                                <div className="relative overflow-hidden rounded-sm border border-border/80 shadow-earth-lg">
                                    <img
                                        src={journeyImages[2]}
                                        alt={steps[2].title}
                                        loading="lazy"
                                        className="aspect-[16/6] w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 max-w-xl px-8 py-10 md:px-12 md:py-12">
                                        <span className="font-display text-5xl font-light text-terra md:text-6xl">
                                            03
                                        </span>
                                        <h3 className="mt-3 font-display text-3xl font-bold text-cream md:text-4xl">
                                            {steps[2].title}
                                        </h3>
                                        <p className="mt-3 text-base leading-relaxed text-cream/80">
                                            {steps[2].text}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {/* Steps 4–5: 2-col portrait card grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {steps.slice(3).map((step, i) => (
                                <Reveal key={step.title} delay={i * 90}>
                                    <div className="card-luxury overflow-hidden">
                                        <div className="overflow-hidden rounded-sm border border-border/80 bg-ink shadow-earth">
                                            <img
                                                src={journeyImages[i + 3]}
                                                alt={step.title}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <div className="flex items-center gap-4">
                                                <span className="font-display text-5xl font-light text-terra md:text-6xl">
                                                    {String(i + 4).padStart(2, '0')}
                                                </span>
                                                <div className="h-0.5 flex-1 bg-border/80" />
                                            </div>
                                            <h3 className="mt-5 font-display text-2xl font-bold text-ink md:text-3xl">
                                                {step.title}
                                            </h3>
                                            <p className="mt-3 text-base leading-relaxed text-coffee">
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Control & Grading */}
            <section className="relative overflow-hidden bg-forest-deep py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-12 md:grid-cols-[60fr_40fr] md:gap-16">
                        {/* Left: first QC point with large display number */}
                        {qc[0] && (
                            <Reveal>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <SectionHeading
                                            title={str(t('process.qc.title'))}
                                            body={str(t('process.qc.body'))}
                                            light
                                            align="left"
                                        />
                                        <div className="mt-12">
                                            <span className="font-display text-[6rem] font-light leading-none text-terra/60 md:text-[8rem]">
                                                01
                                            </span>
                                            <h3 className="mt-4 font-display text-2xl font-bold text-cream md:text-3xl">
                                                {qc[0].title}
                                            </h3>
                                            <p className="mt-3 max-w-lg text-base leading-relaxed text-cream/70">
                                                {qc[0].text}
                                            </p>
                                            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-terra">
                                                <ShieldCheck className="size-4" />
                                                <span>SCA Standard Protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {/* Right: QC points 2 and 3 stacked */}
                        <div className="divide-y divide-border/60">
                            {qc.slice(1).map((point, i) => {
                                const Icon = qcIcons[(i + 1) % qcIcons.length];
                                return (
                                    <Reveal key={point.title} delay={i * 90}>
                                        <div className="py-8 first:pt-0">
                                            <span className="grid size-10 place-items-center rounded-full border border-terra/30 bg-terra/10 text-terra">
                                                <Icon className="size-4.5" />
                                            </span>
                                            <span className="mt-4 block font-display text-3xl font-light text-terra/60">
                                                {String(i + 2).padStart(2, '0')}
                                            </span>
                                            <h3 className="mt-2 font-display text-xl font-bold text-cream">
                                                {point.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-cream/70">
                                                {point.text}
                                            </p>
                                            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-terra">
                                                <ShieldCheck className="size-3.5" />
                                                <span>SCA Standard Protocol</span>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Export Readiness & International Logistics */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                <div className="pointer-events-none absolute -top-20 right-0 size-96 rounded-full bg-terra/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 size-96 rounded-full bg-black/40 blur-3xl" />

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        title={str(t('process.export.title'))}
                        body={str(t('process.export.body'))}
                        light
                        align="left"
                    />

                    <dl className="mt-16 grid grid-rows-[auto_auto] gap-6 md:grid-cols-[1fr_1fr]">
                        {/* First stat: double-height on left */}
                        {exportRows[0] && (
                            <Reveal>
                                <div className="flex h-full flex-col justify-between rounded-sm border border-cream/15 bg-white/5 p-10 backdrop-blur-sm transition-all hover:border-cream/30 hover:bg-white/10 md:row-span-2">
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
                                            {exportRows[0].label}
                                        </dt>
                                        <dd className="mt-6 font-display text-5xl font-bold leading-snug text-cream md:text-6xl">
                                            {exportRows[0].value}
                                        </dd>
                                    </div>
                                    <div className="mt-8 flex items-center gap-1.5 text-xs text-terra">
                                        <Globe2 className="size-3.5" />
                                        <span>International Export</span>
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {/* Stats 2–4: right column */}
                        {exportRows.slice(1).map((row, i) => (
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
