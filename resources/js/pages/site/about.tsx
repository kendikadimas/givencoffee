import { Check, Compass, Droplet, HeartHandshake, Mountain, ShieldCheck, Sprout, Sun } from 'lucide-react';

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
        { label: facts.altitude, value: facts.altitudeValue, icon: Mountain },
        { label: facts.variety, value: facts.varietyValue, icon: Sprout },
        { label: facts.process, value: facts.processValue, icon: Droplet },
        { label: facts.harvest, value: facts.harvestValue, icon: Sun },
    ];

    const sustainabilityPillars = [
        {
            title: locale === 'en' ? 'Direct Farmer Partnership' : 'Kemitraan Petani Langsung',
            desc: locale === 'en' ? 'Purchasing directly at premium prices above standard fair trade rates.' : 'Membeli langsung dari petani dengan harga premium di atas pasar komoditas.',
            icon: HeartHandshake,
        },
        {
            title: locale === 'en' ? 'Eco-Conscious Processing' : 'Pengolahan Ramah Lingkungan',
            desc: locale === 'en' ? 'Recirculated water systems and organic pulp composting.' : 'Sistem sirkulasi air efisien dan daur ulang limbah kulit kopi menjadi pupuk organik.',
            icon: Sprout,
        },
        {
            title: locale === 'en' ? '100% Traceability' : 'Ketertelusuran Penuh',
            desc: locale === 'en' ? 'Every lot tracked from specific farm elevation down to container shipping.' : 'Setiap batch dapat dilacak asal kebun, ketinggian, hingga proses pengiriman.',
            icon: ShieldCheck,
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
                eyebrow={str(t('about.hero.eyebrow'))}
                title={str(t('about.hero.title'))}
                subtitle={str(t('about.hero.subtitle'))}
            />

            {/* Brand Story Section */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1000px] px-5 md:px-8">
                    <Reveal>
                        <div className="card-luxury p-8 md:p-14">
                            <span className="badge-pill mb-4 border-terra/40 bg-terra/10 text-terra">
                                {str(t('about.story.eyebrow'))}
                            </span>
                            <h2 className="font-display text-3xl leading-[1.14] tracking-tight text-ink md:text-5xl">
                                {str(t('about.story.title'))}
                            </h2>
                            <div className="mt-8 space-y-6 text-lg leading-relaxed text-coffee">
                                <p className="text-xl leading-relaxed font-medium text-ink/90">
                                    {str(t('about.story.body'))}
                                </p>
                                <p>
                                    {str(t('about.story.body2'))}
                                </p>
                            </div>

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
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Origin & Farm Section */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8 lg:gap-20">
                    <Reveal>
                        <div className="relative">
                            <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-earth-lg">
                                <img
                                    src="/images/real/Geopark_Caldera_Toba.jpg"
                                    alt="Volcanic highlands of Lake Toba caldera"
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                            <div className="absolute -bottom-5 -left-5 hidden rounded-sm border border-forest/20 bg-forest-deep p-5 text-cream shadow-earth-lg md:block">
                                <p className="font-display text-2xl font-bold text-cream">Toba Caldera</p>
                                <p className="text-xs uppercase tracking-widest text-cream/70">Geopark Heritage Terroir</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <SectionHeading
                            eyebrow={str(t('about.origin.eyebrow'))}
                            title={str(t('about.origin.title'))}
                            body={str(t('about.origin.body'))}
                        />

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            {factRows.map((row) => {
                                const Icon = row.icon;
                                return (
                                    <div
                                        key={row.label}
                                        className="rounded-sm border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-terra/40 hover:shadow-earth"
                                    >
                                        <div className="flex items-center gap-2 text-terra">
                                            <Icon className="size-4" />
                                            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coffee">
                                                {row.label}
                                            </dt>
                                        </div>
                                        <dd className="mt-2 font-display text-lg font-bold text-ink">
                                            {row.value}
                                        </dd>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Farm to Harvest Journey Timeline */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('about.timeline.eyebrow'))}
                        title={str(t('about.timeline.title'))}
                        className="mx-auto max-w-xl text-center"
                        align="center"
                    />

                    <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {steps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 80}>
                                <div className="card-luxury flex h-full flex-col justify-between p-6">
                                    <div>
                                        <span className="font-display text-4xl font-light text-terra">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="mt-4 font-display text-lg font-bold text-ink">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-coffee">
                                            {step.text}
                                        </p>
                                    </div>
                                    <div className="mt-6 h-0.5 w-6 rounded-full bg-terra/40" />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability Section */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                <div className="pointer-events-none absolute -top-20 right-0 size-96 rounded-full bg-forest/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 size-96 rounded-full bg-black/40 blur-3xl" />

                <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
                    <Reveal>
                        <div className="text-center">
                            <span className="badge-origin border-cream/25 bg-cream/15 text-cream">
                                {str(t('about.sustainability.eyebrow'))}
                            </span>
                            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.14] text-cream md:text-5xl">
                                {str(t('about.sustainability.title'))}
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
                                {str(t('about.sustainability.body'))}
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {sustainabilityPillars.map((p, idx) => {
                            const Icon = p.icon;
                            return (
                                <Reveal key={p.title} delay={idx * 100}>
                                    <div className="flex h-full flex-col justify-between rounded-sm border border-cream/15 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cream/30 hover:bg-white/10">
                                        <div>
                                            <span className="grid size-12 place-items-center rounded-full bg-cream/10 text-cream">
                                                <Icon className="size-6 text-terra" />
                                            </span>
                                            <h3 className="mt-6 font-display text-xl font-medium text-cream">
                                                {p.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-cream/70">
                                                {p.desc}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-terra">
                                            <Check className="size-4" />
                                            <span>{locale === 'en' ? 'Active Commitment' : 'Komitmen Aktif'}</span>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
