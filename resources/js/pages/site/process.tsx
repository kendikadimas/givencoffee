import { CheckCircle2, FlaskConical, Gauge, Globe2, ShieldCheck } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
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

const journeyImages: { src: string; position?: string }[] = [
    { src: '/images/real/cherry.jpg' },
    { src: '/images/real/beansonacontainer5.jpeg' },
    { src: '/images/add/sun-drying.jpg' },
    { src: '/images/real/pouchgreenbeans2.jpeg' },
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
                image="/images/real/cherry.jpg"
            />

            <PageHero
                image="/images/real/cherry.jpg"
                eyebrow={str(t('process.hero.eyebrow'))}
                title={str(t('process.hero.title'))}
                subtitle={str(t('process.hero.subtitle'))}
                align="left"
            />

            {/* Journey — numbered list with alternating image/no-image, bone bg */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('process.journey.eyebrow'))}
                        </p>
                        <h2 className="mb-20 font-display text-3xl font-bold text-ink md:text-4xl">
                            {str(t('process.journey.title'))}
                        </h2>
                    </Reveal>

                    <div className="space-y-0 divide-y divide-border/60">
                        {steps.map((step, i) => {
                            const imgEntry = journeyImages[i];
                            const img = imgEntry?.src;
                            const imgPosition = imgEntry?.position ?? 'object-center';
                            const flipped = i % 2 === 1;
                            return (
                                <Reveal key={step.title} delay={i * 60}>
                                    <div className={`grid items-center gap-8 py-12 md:py-16 ${img ? 'md:grid-cols-[1fr_1fr]' : 'md:grid-cols-[64px_1fr_1fr]'}`}>
                                        {!img && (
                                            <span className="font-display text-5xl font-light text-terra/30 md:text-6xl">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        )}
                                        <div className={img && flipped ? 'md:order-2' : ''}>
                                            {img && (
                                                <span className="mb-5 block font-display text-5xl font-light text-terra/30 md:text-6xl">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            )}
                                            <h3 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                                {step.title}
                                            </h3>
                                            <p className="mt-4 max-w-md text-base leading-relaxed text-coffee">
                                                {step.text}
                                            </p>
                                        </div>
                                        {img && (
                                            <div className={`rounded-sm border border-border/80 shadow-earth ${flipped ? 'md:order-1' : ''}`}>
                                                <img
                                                    src={img}
                                                    alt={step.title}
                                                    loading="lazy"
                                                    className="w-full rounded-sm transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* QC — cream bg, 3-col equal with thick top border rule, no ambient glows */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('process.qc.eyebrow'))}
                        </p>
                        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('process.qc.title'))}
                            </h2>
                            <p className="text-base leading-relaxed text-coffee md:text-lg">
                                {str(t('process.qc.body'))}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-0 border-t-2 border-ink md:grid-cols-3">
                        {qc.map((point, i) => {
                            const Icon = qcIcons[i % qcIcons.length];
                            return (
                                <Reveal key={point.title} delay={i * 80}>
                                    <div className="border-r border-border/60 px-0 py-10 pr-8 last:border-r-0 last:pr-0 md:px-12 md:first:pl-0 md:last:pr-0">
                                        <div className="mb-5 flex items-center gap-3">
                                            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-terra/30 bg-terra/10">
                                                <Icon className="size-4.5 text-terra" />
                                            </span>
                                            <span className="font-display text-3xl font-light text-ink/20">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                                            {point.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-coffee">
                                            {point.text}
                                        </p>
                                        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-terra">
                                            <ShieldCheck className="size-3.5" />
                                            <span>SCA Standard Protocol</span>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Export readiness — ink bg, horizontal stat table, no floating orbs */}
            <section className="bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('process.export.eyebrow'))}
                        </p>
                        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
                                {str(t('process.export.title'))}
                            </h2>
                            <p className="text-base leading-relaxed text-cream/65">
                                {str(t('process.export.body'))}
                            </p>
                        </div>
                    </Reveal>

                    {/* Stat rows — horizontal table-style, no card borders */}
                    <dl className="divide-y divide-cream/10 border-t border-cream/10">
                        {exportRows.map((row, i) => (
                            <Reveal key={row.label} delay={i * 70}>
                                <div className="grid items-baseline gap-4 py-6 md:grid-cols-[240px_1fr] md:py-8">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
                                        {row.label}
                                    </dt>
                                    <dd className="font-display text-xl font-bold text-cream md:text-2xl">
                                        {row.value}
                                    </dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>

                    <Reveal delay={100}>
                        <div className="mt-12 flex items-center gap-2 border-t border-cream/10 pt-10 text-xs text-cream/40">
                            <Globe2 className="size-4 text-terra" />
                            <span className="uppercase tracking-wider">International Export · Licensed PT Exporter</span>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
