import { Compass, Mountain } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
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

    const sustainabilityPillars = [
        {
            title: locale === 'en' ? 'Direct Farmer Partnership' : 'Kemitraan Petani Langsung',
            desc: locale === 'en' ? 'Purchasing directly at premium prices above standard fair trade rates.' : 'Membeli langsung dari petani dengan harga premium di atas pasar komoditas.',
        },
        {
            title: locale === 'en' ? 'Eco-Conscious Processing' : 'Pengolahan Ramah Lingkungan',
            desc: locale === 'en' ? 'Recirculated water systems and organic pulp composting.' : 'Sistem sirkulasi air efisien dan daur ulang limbah kulit kopi menjadi pupuk organik.',
        },
        {
            title: locale === 'en' ? '100% Traceability' : 'Ketertelusuran Penuh',
            desc: locale === 'en' ? 'Every lot tracked from specific farm elevation down to container shipping.' : 'Setiap batch dapat dilacak asal kebun, ketinggian, hingga proses pengiriman.',
        },
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
                title={str(t('about.hero.title'))}
                subtitle={str(t('about.hero.subtitle'))}
            />

            {/* Brand Story — editorial, left-aligned, no card wrapper */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1000px] px-5 md:px-8">
                    <Reveal>
                        <p className="text-xl leading-relaxed font-medium text-ink/90 md:text-2xl">
                            {str(t('about.story.body'))}
                        </p>
                        <p className="mt-6 text-base leading-relaxed text-coffee md:text-lg">
                            {str(t('about.story.body2'))}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/80 pt-6 text-sm text-coffee">
                            <div className="flex items-center gap-2">
                                <Compass className="size-4 text-terra" />
                                <span>Dolok Sanggul, North Sumatra</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mountain className="size-4 text-terra" />
                                <span>1,400 – 1,750 MASL</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Origin — full-width image, facts horizontal strip below */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-sm border border-border/80 bg-ink shadow-earth-lg">
                            <img
                                src="/images/real/Geopark_Caldera_Toba.jpg"
                                alt="Volcanic highlands of Lake Toba caldera"
                                loading="lazy"
                                className="aspect-[21/9] w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                <p className="font-display text-2xl font-bold text-cream md:text-3xl">Toba Caldera</p>
                                <p className="mt-1 text-xs uppercase tracking-widest text-cream/70">Geopark Heritage Terroir</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-14 font-display text-3xl leading-[1.14] tracking-tight text-ink md:text-4xl">
                            {str(t('about.origin.title'))}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-coffee md:text-lg">
                            {str(t('about.origin.body'))}
                        </p>
                    </Reveal>

                    <Reveal delay={150}>
                        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/80 bg-border/80 md:grid-cols-4">
                            {[
                                { label: facts.altitude, value: facts.altitudeValue },
                                { label: facts.variety, value: facts.varietyValue },
                                { label: facts.process, value: facts.processValue },
                                { label: facts.harvest, value: facts.harvestValue },
                            ].map((row) => (
                                <div key={row.label} className="bg-card p-5 transition-colors hover:bg-bone">
                                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coffee">
                                        {row.label}
                                    </dt>
                                    <dd className="mt-2 font-display text-lg font-bold text-ink">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Timeline — horizontal numbered strip, not 5-col cards */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ink md:text-5xl">
                            {str(t('about.timeline.title'))}
                        </h2>
                    </Reveal>

                    <div className="mt-14 grid gap-0 divide-y divide-border/60 border-y border-border/60 md:mt-16 md:grid-cols-5 md:divide-y-0 md:divide-x md:border-0">
                        {steps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 60}>
                                <div className="py-8 md:py-0 md:px-6">
                                    <span className="font-display text-4xl font-light text-terra">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-3 font-display text-lg font-bold text-ink">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-coffee">
                                        {step.text}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability — asymmetric: headline + first pillar left, two pillars stacked right */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
                    <div className="grid gap-12 md:grid-cols-12 md:gap-16">
                        <Reveal className="md:col-span-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                                {str(t('about.sustainability.eyebrow'))}
                            </p>
                            <h2 className="mt-3 font-display text-3xl leading-[1.14] text-cream md:text-4xl">
                                {str(t('about.sustainability.title'))}
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-cream/75 md:text-lg">
                                {str(t('about.sustainability.body'))}
                            </p>

                            <div className="mt-10 rounded-sm border border-cream/15 bg-white/5 p-6">
                                <h3 className="font-display text-lg font-medium text-cream">
                                    {sustainabilityPillars[0].title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                                    {sustainabilityPillars[0].desc}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={100} className="md:col-span-7">
                            <div className="space-y-5">
                                {sustainabilityPillars.slice(1).map((p) => (
                                    <div
                                        key={p.title}
                                        className="rounded-sm border border-cream/15 bg-white/5 p-6 transition-colors hover:border-cream/30"
                                    >
                                        <h3 className="font-display text-lg font-medium text-cream">
                                            {p.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-cream/70">
                                            {p.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
