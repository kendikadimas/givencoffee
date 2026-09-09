import { ChevronLeft, ChevronRight, Compass, Mountain } from 'lucide-react';
import { useEffect, useState } from 'react';

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
            title:
                locale === 'en'
                    ? 'Direct Farmer Partnership'
                    : 'Kemitraan Petani Langsung',
            desc:
                locale === 'en'
                    ? 'Purchasing directly at premium prices above standard fair trade rates.'
                    : 'Membeli langsung dari petani dengan harga premium di atas pasar komoditas.',
        },
        {
            title:
                locale === 'en'
                    ? 'Eco-Conscious Processing'
                    : 'Pengolahan Ramah Lingkungan',
            desc:
                locale === 'en'
                    ? 'Recirculated water systems and organic pulp composting.'
                    : 'Sistem sirkulasi air efisien dan daur ulang limbah kulit kopi menjadi pupuk organik.',
        },
        {
            title:
                locale === 'en' ? '100% Traceability' : 'Ketertelusuran Penuh',
            desc:
                locale === 'en'
                    ? 'Every lot tracked from specific farm elevation down to container shipping.'
                    : 'Setiap batch dapat dilacak asal kebun, ketinggian, hingga proses pengiriman.',
        },
    ];

    const storySlides = [
        {
            src: '/images/add/buyer-visit.jpg',
            alt: 'Given Coffee buyer visit at warehouse',
            tag: locale === 'en' ? 'Direct Partnership' : 'Kemitraan Langsung',
            title:
                locale === 'en'
                    ? 'Connecting global roasters directly to North Sumatra highlands.'
                    : 'Menghubungkan roastery global langsung ke dataran tinggi Sumatera Utara.',
            desc:
                locale === 'en'
                    ? 'Warehouse & sourcing operations · Dolok Sanggul'
                    : 'Operasional gudang & sourcing · Dolok Sanggul',
            focus: 'center 35%',
        },
        {
            src: '/images/add/truck-front.jpg',
            alt: 'Given Coffee branded delivery truck',
            tag: locale === 'en' ? 'Supply Chain' : 'Rantai Pasok Terpadu',
            title:
                locale === 'en'
                    ? 'Dedicated logistics ensuring fresh crop preservation.'
                    : 'Logistik terdedikasi menjaga kualitas panen tetap segar hingga pengiriman.',
            desc:
                locale === 'en'
                    ? 'Direct inland transport to Belawan Port'
                    : 'Transportasi langsung ke Pelabuhan Belawan',
        },
        {
            src: '/images/add/warehouse-1.jpg',
            alt: 'Warehouse storage operations',
            tag: locale === 'en' ? 'Storage Standard' : 'Standar Penyimpanan',
            title:
                locale === 'en'
                    ? 'Climate-controlled warehouse with GrainPro hermetic packing.'
                    : 'Gudang terkontrol dengan pengemasan hermetik GrainPro berkualitas.',
            desc:
                locale === 'en'
                    ? 'Dolok Sanggul Central Storage Facility'
                    : 'Fasilitas Penyimpanan Pusat Dolok Sanggul',
        },
    ];

    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % storySlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [storySlides.length]);

    const prevSlide = () => {
        setActiveSlide((prev) =>
            prev === 0 ? storySlides.length - 1 : prev - 1,
        );
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % storySlides.length);
    };

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

            {/* Story — warm bone background, editorial story left, visual card right */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid items-stretch gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
                        {/* Left: Editorial story text */}
                        <Reveal className="flex flex-col justify-between">
                            <div>
                                <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    {str(t('about.story.eyebrow'))}
                                </p>
                                <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                                    {str(t('about.story.title'))}
                                </h2>
                                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-coffee">
                                    <div className="flex items-center gap-2">
                                        <Compass className="size-4 text-terra" />
                                        <span>
                                            Dolok Sanggul, North Sumatra
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mountain className="size-4 text-terra" />
                                        <span>
                                            {locale === 'en'
                                                ? '1,500 – 1,700 MASL'
                                                : '1.500 – 1.700 MDPL'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-10 space-y-6">
                                    <p className="text-xl leading-relaxed text-ink/90 md:text-2xl">
                                        {str(t('about.story.body'))}
                                    </p>
                                    <p className="text-base leading-relaxed text-coffee md:text-lg">
                                        {str(t('about.story.body2'))}
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Right: visual interactive carousel card */}
                        <Reveal delay={100} className="flex flex-col">
                            <div className="group relative min-h-[460px] w-full flex-1 overflow-hidden rounded-sm border border-border/70 shadow-xs">
                                {storySlides.map((slide, idx) => (
                                    <div
                                        key={slide.src}
                                        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-700 ease-in-out ${
                                            idx === activeSlide
                                                ? 'z-10 opacity-100'
                                                : 'pointer-events-none z-0 opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={slide.src}
                                            alt={slide.alt}
                                            loading="lazy"
                                            style={{
                                                objectPosition: slide.focus
                                                    ? slide.focus
                                                    : 'center',
                                            }}
                                            className="absolute inset-0 size-full scale-[1.35] object-cover object-center transition-transform duration-1000 group-hover:scale-150"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent" />

                                        <div className="relative z-10 flex flex-col p-6 pb-16 text-cream md:p-8 md:pb-16">
                                            <span className="self-start rounded-full border border-terra/40 bg-terra px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-cream uppercase shadow-xs">
                                                {slide.tag}
                                            </span>
                                            <p className="mt-3 font-display text-lg leading-snug font-bold text-cream md:text-xl">
                                                {slide.title}
                                            </p>
                                            <p className="mt-1 text-xs text-cream/80">
                                                {slide.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Carousel Controls & Indicators */}
                                <div className="absolute right-5 bottom-4 z-20 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={prevSlide}
                                        aria-label="Previous slide"
                                        className="flex size-7 items-center justify-center rounded-full border border-cream/30 bg-ink/80 text-cream backdrop-blur-xs transition hover:border-terra hover:bg-terra"
                                    >
                                        <ChevronLeft className="size-3.5" />
                                    </button>
                                    <div className="flex items-center gap-1.5 px-1">
                                        {storySlides.map((_, dotIdx) => (
                                            <button
                                                key={dotIdx}
                                                type="button"
                                                onClick={() =>
                                                    setActiveSlide(dotIdx)
                                                }
                                                aria-label={`Go to slide ${dotIdx + 1}`}
                                                className={`h-1.5 rounded-full transition-all ${
                                                    dotIdx === activeSlide
                                                        ? 'w-4 bg-terra'
                                                        : 'w-1.5 bg-cream/40 hover:bg-cream/70'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={nextSlide}
                                        aria-label="Next slide"
                                        className="flex size-7 items-center justify-center rounded-full border border-cream/30 bg-ink/80 text-cream backdrop-blur-xs transition hover:border-terra hover:bg-terra"
                                    >
                                        <ChevronRight className="size-3.5" />
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Origin facts — full-bleed image, horizontal stat bar pinned below */}
            <section className="relative bg-cream">
                <Reveal>
                    <div className="relative overflow-hidden">
                        <img
                            src="/images/real/Geopark_Caldera_Toba.jpg"
                            alt="Volcanic highlands of Lake Toba caldera"
                            loading="lazy"
                            className="aspect-[21/8] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
                        <div className="absolute bottom-0 left-0 px-5 py-8 md:px-12 md:py-10">
                            <p className="mb-1 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('about.origin.eyebrow'))}
                            </p>
                            <h2 className="font-display text-3xl font-bold text-cream md:text-5xl">
                                {str(t('about.origin.title'))}
                            </h2>
                        </div>
                    </div>
                </Reveal>

                {/* Stat cards — 4-col */}
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {[
                            {
                                label: facts.altitude,
                                value: facts.altitudeValue,
                            },
                            { label: facts.variety, value: facts.varietyValue },
                            { label: facts.process, value: facts.processValue },
                            { label: facts.harvest, value: facts.harvestValue },
                        ].map((f, i) => (
                            <Reveal key={f.label} delay={i * 60}>
                                <div className="relative overflow-hidden border border-border/60 bg-cream/50 px-5 py-6">
                                    <span className="absolute -top-3 -right-2 font-display text-[72px] leading-none font-bold text-ink/[0.04] select-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-[10px] font-semibold tracking-[0.22em] text-terra uppercase">
                                        {f.label}
                                    </p>
                                    <p className="mt-2 text-sm text-ink">
                                        {f.value}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal>
                        <p className="max-w-2xl py-8 text-sm leading-relaxed text-coffee md:py-10">
                            {str(t('about.origin.body'))}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Timeline — oversized number + content rows */}
            <section className="relative bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(t('about.timeline.eyebrow'))}
                        </p>
                        <h2 className="mb-16 font-display text-3xl font-bold text-cream md:text-4xl">
                            {str(t('about.timeline.title'))}
                        </h2>
                    </Reveal>

                    <div className="divide-y divide-cream/10 border-y border-cream/10">
                        {steps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 60}>
                                <div className="grid grid-cols-[80px_1fr] items-baseline gap-8 py-8 md:grid-cols-[140px_1fr] md:gap-16">
                                    <span className="font-display text-5xl leading-none font-light text-terra/25 md:text-7xl">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="grid gap-2 md:grid-cols-[220px_1fr] md:gap-12">
                                        <h3 className="text-base font-semibold text-cream">
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] leading-relaxed text-cream/50">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photo grid — operations proof */}
            <section className="bg-bone py-16 md:py-20">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {[
                            {
                                src: '/images/add/warehouse-1.jpg',
                                alt: 'Warehouse storage',
                            },
                            {
                                src: '/images/add/truck-front.jpg',
                                alt: 'Given Coffee delivery truck',
                            },
                            {
                                src: '/images/add/warehouse-stacking.jpg',
                                alt: 'Bag stacking',
                            },
                            {
                                src: '/images/add/sun-drying.jpg',
                                alt: 'Sun drying process',
                            },
                        ].map((img) => (
                            <Reveal key={img.src}>
                                <div className="overflow-hidden rounded-sm border border-border/60">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability — dark full-bleed, 3 pillars as horizontal row */}
            <section className="relative overflow-hidden bg-forest-deep py-24 md:py-32">
                <div className="pointer-events-none absolute -top-24 right-0 size-[500px] rounded-full bg-terra/8 blur-3xl" />

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(t('about.sustainability.eyebrow'))}
                        </p>
                        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                            <h2 className="max-w-lg font-display text-3xl font-bold text-cream md:text-4xl">
                                {str(t('about.sustainability.title'))}
                            </h2>
                        </div>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
                            {str(t('about.sustainability.body'))}
                        </p>
                    </Reveal>

                    {/* 3 pillars — full-width horizontal row, separated by vertical dividers */}
                    <div className="mt-16 grid gap-0 border-t border-cream/15 md:grid-cols-3">
                        {sustainabilityPillars.map((p, i) => (
                            <Reveal key={p.title} delay={i * 80}>
                                <div className="border-b border-cream/15 px-0 py-8 md:border-r md:border-b-0 md:px-14 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                                    <span className="font-display text-4xl font-light text-terra/30">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-5 font-display text-xl font-bold text-cream">
                                        {p.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-cream/65">
                                        {p.desc}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Pull quote */}
                    <Reveal delay={100}>
                        <blockquote className="mt-16 border-l-2 border-terra/40 pl-8">
                            <p className="font-display text-xl leading-relaxed text-cream/80 md:text-2xl">
                                &ldquo;{str(t('about.quote.text'))}&rdquo;
                            </p>
                            <footer className="mt-4 text-xs font-semibold tracking-[0.2em] text-terra uppercase">
                                {str(t('about.quote.name'))} —{' '}
                                {str(t('about.quote.role'))}
                            </footer>
                        </blockquote>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
