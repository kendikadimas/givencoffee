import { Quote } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { Seo } from '@/components/site/seo';
import { arr, str, useTranslations } from '@/hooks/use-translations';

type TimelineStep = { title: string; text: string };

type OriginFacts = {
    altitude: string;
    altitudeValue: string;
    variety: string;
    varietyValue: string;
    process: string;
    processValue: string;
    harvest: string;
    harvestValue: string;
};

export default function About() {
    const { t, locale } = useTranslations();

    const steps = arr<TimelineStep>(t('about.timeline.steps'));
    const facts: OriginFacts = {
        altitude: str(t('about.origin.altitude')),
        altitudeValue: str(t('about.origin.altitudeValue')),
        variety: str(t('about.origin.variety')),
        varietyValue: str(t('about.origin.varietyValue')),
        process: str(t('about.origin.process')),
        processValue: str(t('about.origin.processValue')),
        harvest: str(t('about.origin.harvest')),
        harvestValue: str(t('about.origin.harvestValue')),
    };
    const factRows = [
        { label: facts.altitude, value: facts.altitudeValue },
        { label: facts.variety, value: facts.varietyValue },
        { label: facts.process, value: facts.processValue },
        { label: facts.harvest, value: facts.harvestValue },
    ];

    return (
        <>
            <Seo
                title={str(t('about.hero.title'))}
                description={str(t('about.hero.subtitle'))}
                path={`/${locale}/about`}
                image="/images/real/Geopark_Caldera_Toba.jpg"
            />

            <PageHero
                image="/images/real/Geopark_Caldera_Toba.jpg"
                eyebrow={str(t('about.hero.eyebrow'))}
                title={str(t('about.hero.title'))}
                subtitle={str(t('about.hero.subtitle'))}
            />

            {/* Story */}
            <section className="mx-auto max-w-[900px] px-5 py-24 md:px-8 md:py-32">
                <Reveal>
                    <p className="eyebrow">{str(t('about.story.eyebrow'))}</p>
                    <h2 className="mt-4 font-display text-3xl leading-[1.15] tracking-tight text-ink md:text-5xl">
                        {str(t('about.story.title'))}
                    </h2>
                </Reveal>
                <Reveal delay={120}>
                    <div className="mt-8 space-y-6 text-lg leading-relaxed text-coffee">
                        <p>
                            {str(t('about.story.body'))}
                        </p>
                        <p>
                            {str(t('about.story.body2'))}
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Origin & Farm */}
            <section className="bg-white py-24 md:py-32">
                <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:gap-20 md:px-8">
                    <Reveal>
                        <img
                            src="/images/real/Geopark_Caldera_Toba.jpg"
                            alt="Volcanic highlands where our coffee grows"
                            loading="lazy"
                            className="aspect-[4/3] w-full rounded-sm object-cover"
                        />
                    </Reveal>
                    <Reveal delay={120}>
                        <SectionHeading
                            eyebrow={str(t('about.origin.eyebrow'))}
                            title={str(t('about.origin.title'))}
                            body={str(t('about.origin.body'))}
                        />
                        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
                            {factRows.map((row) => (
                                <div
                                    key={row.label}
                                    className="border-l-2 border-terra pl-4"
                                >
                                    <dt className="text-xs uppercase tracking-[0.18em] text-coffee">
                                        {row.label}
                                    </dt>
                                    <dd className="mt-1 font-display text-lg text-ink">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </section>

            {/* Timeline */}
            <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
                <SectionHeading
                    eyebrow={str(t('about.timeline.eyebrow'))}
                    title={str(t('about.timeline.title'))}
                    className="mx-auto max-w-xl text-center"
                />

                <div className="mx-auto mt-16 grid max-w-4xl gap-px overflow-hidden rounded-sm bg-border md:grid-cols-5">
                    {steps.map((step, i) => (
                        <Reveal key={step.title} delay={i * 90} className="bg-white">
                            <div className="flex h-full flex-col p-6">
                                <span className="font-display text-4xl text-terra">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="mt-4 font-display text-lg text-ink">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-coffee">
                                    {step.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Sustainability */}
            <section className="bg-olive py-24 md:py-32">
                <div className="mx-auto max-w-[900px] px-5 text-center md:px-8">
                    <Reveal>
                        <p className="eyebrow text-forest">{str(t('about.sustainability.eyebrow'))}</p>
                        <h2 className="mt-4 font-display text-3xl leading-[1.15] text-forest-deep md:text-5xl">
                            {str(t('about.sustainability.title'))}
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-forest-deep/80">
                            {str(t('about.sustainability.body'))}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Founder quote */}
            <section className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid items-center gap-12 md:grid-cols-5 md:gap-16">
                    <Reveal className="md:col-span-2">
                        <img
                            src="/images/about-founder.jpg"
                            alt="Founder portrait"
                            loading="lazy"
                            className="aspect-[4/5] w-full rounded-sm object-cover"
                        />
                    </Reveal>
                    <Reveal delay={120} className="md:col-span-3">
                        <Quote className="size-8 text-terra" />
                        <blockquote className="mt-4 font-display text-2xl leading-[1.25] text-ink md:text-4xl">
                            {str(t('about.quote.text'))}
                        </blockquote>
                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-terra">
                            {str(t('about.quote.name'))}
                        </p>
                        <p className="mt-1 text-sm text-coffee">{str(t('about.quote.role'))}</p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
