import { CheckCircle2, FlaskConical, Gauge } from 'lucide-react';

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

            {/* Farm to cup journey */}
            <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
                <SectionHeading
                    eyebrow={str(t('process.journey.eyebrow'))}
                    title={str(t('process.journey.title'))}
                />

                <div className="mt-16 space-y-20">
                    {steps.map((step, i) => {
                        const flipped = i % 2 === 1;
                        const fullBleed = i === 2;

                        if (fullBleed) {
                            return (
                                <section
                                    key={step.title}
                                    className="relative flex min-h-[60vh] items-center overflow-hidden rounded-sm"
                                >
                                    <img
                                        src={journeyImages[i]}
                                        alt={step.title}
                                        loading="lazy"
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-ink/65" />
                                    <div className="relative mx-auto max-w-xl px-5 py-20 text-center md:px-8">
                                        <span className="font-display text-6xl text-terra">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="mt-3 font-display text-3xl text-cream md:text-4xl">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 leading-relaxed text-cream/80">
                                            {step.text}
                                        </p>
                                    </div>
                                </section>
                            );
                        }

                        return (
                            <Reveal key={step.title}>
                                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                                    <div className={flipped ? 'md:order-2' : ''}>
                                        <div className="flex items-center gap-4">
                                            <span className="font-display text-5xl text-terra md:text-6xl">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="h-px flex-1 bg-border" />
                                        </div>
                                        <h3 className="mt-6 font-display text-3xl text-ink">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 max-w-md leading-relaxed text-coffee">
                                            {step.text}
                                        </p>
                                    </div>
                                    <div className={flipped ? 'md:order-1' : ''}>
                                        <img
                                            src={journeyImages[i]}
                                            alt={step.title}
                                            loading="lazy"
                                            className="aspect-[16/10] w-full rounded-sm object-cover"
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* Quality control */}
            <section className="bg-white py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('process.qc.eyebrow'))}
                        title={str(t('process.qc.title'))}
                        body={str(t('process.qc.body'))}
                    />
                    <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-3">
                        {qc.map((point, i) => {
                            const Icon = qcIcons[i % qcIcons.length];

                            return (
                                <Reveal key={point.title} delay={i * 90} className="bg-white">
                                    <div className="flex h-full flex-col p-8">
                                        <span className="grid size-11 place-items-center rounded-full bg-olive text-forest">
                                            <Icon className="size-5" />
                                        </span>
                                        <h3 className="mt-5 font-display text-xl text-ink">
                                            {point.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-coffee">
                                            {point.text}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Export readiness */}
            <section className="bg-forest-deep py-24 text-cream md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('process.export.eyebrow'))}
                        title={str(t('process.export.title'))}
                        body={str(t('process.export.body'))}
                        light
                    />
                    <dl className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                        {exportRows.map((row, i) => (
                            <Reveal key={row.label} delay={i * 90} className="bg-forest-deep">
                                <div className="flex h-full flex-col p-8">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                                        {row.label}
                                    </dt>
                                    <dd className="mt-3 font-display text-xl leading-snug text-cream">
                                        {row.value}
                                    </dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>
        </>
    );
}
