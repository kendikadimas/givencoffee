import { Link } from '@inertiajs/react';
import { ArrowRight, Droplets, Leaf, Mountain, Sparkles } from 'lucide-react';

import { Cta } from '@/components/site/cta';
import { InstagramFeed } from '@/components/site/instagram-feed';
import { Reveal } from '@/components/site/reveal';
import { Seo, organizationJsonLd, useSeoSettings } from '@/components/site/seo';
import { arr, str, useTranslations } from '@/hooks/use-translations';

type Product = {
    id?: number;
    name: string;
    subtitle: string;
    body?: string;
    images: { hero?: string };
    specs?: Array<{ label: string; value: string }>;
};

type HomeProps = {
    product?: Product | null;
    products?: Product[];
    testimonials?: Array<{
        id?: number;
        name: string;
        role: string;
        quote: string;
        image?: string | null;
    }>;
};

type WhyItem = { title: string; text: string };

export default function Home({
    product,
    products = [],
    testimonials = [],
}: HomeProps) {
    const { t, locale } = useTranslations();
    const seoSettings = useSeoSettings();
    const featuredProduct = product ?? products[0] ?? null;
    const whyItems = arr<WhyItem>(t('home.why.items'));
    const whyIcons = [Droplets, Sparkles, Leaf, Mountain];
    const processSteps = arr<{ title: string; text: string }>(
        t('home.process.steps'),
    );

    return (
        <>
            <Seo
                title={str(t('home.hero.title'))}
                description={str(t('ui.meta.defaultDescription'))}
                path={`/${locale}`}
                type="website"
                jsonLd={organizationJsonLd(seoSettings)}
            />

            {/* Hero — full-bleed, text anchored bottom-left, right side has floating spec strip */}
            <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink pb-20 md:pb-24">
                <img
                    src="/images/real/closeup-greenbeans.jpeg"
                    alt="Freshly harvested coffee beans from the Indonesian highlands"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <div className="grid items-end gap-10 lg:grid-cols-[1fr_320px]">
                        <Reveal>
                            <p className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('home.hero.eyebrow'))}
                            </p>
                            <h1 className="max-w-4xl font-display text-[2.4rem] leading-[1.08] tracking-tight text-cream md:text-5xl lg:text-[3.25rem]">
                                {str(t('home.hero.title'))}
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
                                {str(t('home.hero.subtitle'))}
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Cta
                                    href={`/${locale}/product`}
                                    variant="terra"
                                    className="px-7 py-3 text-base"
                                >
                                    {str(t('home.hero.ctaPrimary'))}
                                </Cta>
                                <Cta
                                    href={`/${locale}/contact`}
                                    variant="outline-light"
                                    className="px-7 py-3 text-base"
                                >
                                    {str(t('home.hero.ctaSecondary'))}
                                </Cta>
                            </div>
                        </Reveal>

                        {/* Floating spec strip — right column, desktop only */}
                        {featuredProduct?.specs &&
                            featuredProduct.specs.length > 0 && (
                                <Reveal delay={150} className="hidden lg:block">
                                    <div className="rounded-sm border border-cream/15 bg-ink/60 p-6 backdrop-blur-md">
                                        <p className="mb-4 text-[10px] font-semibold tracking-[0.22em] text-terra uppercase">
                                            {featuredProduct.name}
                                        </p>
                                        <dl className="space-y-3">
                                            {featuredProduct.specs
                                                .slice(0, 5)
                                                .map((s) => (
                                                    <div
                                                        key={s.label}
                                                        className="flex items-baseline justify-between gap-4 border-b border-cream/10 pb-3 last:border-0 last:pb-0"
                                                    >
                                                        <dt className="text-[10px] font-semibold tracking-wider text-cream/40 uppercase">
                                                            {s.label}
                                                        </dt>
                                                        <dd className="text-right text-xs font-semibold text-cream/90">
                                                            {s.value}
                                                        </dd>
                                                    </div>
                                                ))}
                                        </dl>
                                    </div>
                                </Reveal>
                            )}
                    </div>
                </div>
            </section>

            {/* About — text-first editorial, image on right as tall portrait */}
            <section className="relative overflow-hidden bg-cream">
                <div className="mx-auto max-w-[1400px]">
                    <div className="grid lg:grid-cols-[1fr_480px]">
                        {/* Left: text block with generous padding */}
                        <Reveal className="flex flex-col justify-center px-5 py-24 md:px-12 md:py-32 lg:px-16">
                            <div className="max-w-[560px]">
                                <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    {str(t('home.about.eyebrow'))}
                                </p>
                                <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                                    {str(t('home.about.title'))}
                                </h2>
                                <p className="mt-6 text-base leading-relaxed text-coffee md:text-lg">
                                    {str(t('home.about.body'))}
                                </p>
                                <div className="mt-10 flex items-center gap-3">
                                    <Link
                                        href={`/${locale}/about`}
                                        className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-terra"
                                    >
                                        {str(t('home.about.link'))}
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* Inline stat row */}
                            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
                                {[
                                    {
                                        n: '15+',
                                        label:
                                            locale === 'en'
                                                ? 'Years exporting'
                                                : 'Tahun ekspor',
                                    },
                                    {
                                        n: '300–400 MT',
                                        label:
                                            locale === 'en'
                                                ? 'Annual capacity'
                                                : 'Kapasitas tahunan',
                                    },
                                    {
                                        n: '85.5+',
                                        label:
                                            locale === 'en'
                                                ? 'SCA cupping score'
                                                : 'Skor cupping SCA',
                                    },
                                ].map((s) => (
                                    <div key={s.n}>
                                        <p className="font-display text-3xl font-bold text-ink md:text-4xl">
                                            {s.n}
                                        </p>
                                        <p className="mt-1 text-xs text-coffee">
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Right: tall portrait image, no rounded corners, bleeds to edge */}
                        <Reveal delay={100} className="w-full">
                            <div className="relative h-[420px] w-full overflow-hidden bg-center lg:h-full lg:min-h-[560px]">
                                <img
                                    src="/images/real/whitepouch.jpeg"
                                    alt="Specialty Indonesian green beans"
                                    loading="lazy"
                                    className="absolute inset-0 size-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cream/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-cream/40" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Why — oversized numbered list, no cards, ink background */}
            <section className="relative bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="mb-16 flex items-end justify-between gap-8">
                        <Reveal>
                            <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('home.why.eyebrow'))}
                            </p>
                            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-5xl">
                                {str(t('home.why.title'))}
                            </h2>
                        </Reveal>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {whyItems.map((item, i) => {
                            const Icon = whyIcons[i % whyIcons.length];

                            return (
                                <Reveal key={item.title} delay={i * 60}>
                                    <div className="flex flex-col gap-5 rounded-sm border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm">
                                        <span className="flex size-12 items-center justify-center rounded-full border border-terra/30 bg-terra/10">
                                            <Icon className="size-5 text-terra" />
                                        </span>
                                        <h3 className="font-display text-xl font-bold text-cream">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-cream/60">
                                            {item.text}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Product teaser — bone bg, text left / image right */}
            {featuredProduct && (
                <section className="relative overflow-hidden bg-bone py-24 md:py-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <div className="grid items-stretch gap-12 lg:grid-cols-[1fr_440px] lg:gap-20">
                            {/* Left — content */}
                            <Reveal className="flex flex-col justify-center">
                                <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    {str(t('home.product.eyebrow'))}
                                </p>
                                <h2 className="font-display text-4xl leading-[1.06] tracking-tight text-ink md:text-5xl">
                                    {str(t('home.product.title'))}
                                </h2>
                                <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-coffee/50 uppercase">
                                    {str(t('home.product.subtitle'))}
                                </p>
                                <p className="mt-6 max-w-lg text-base leading-relaxed text-coffee md:text-lg">
                                    {str(t('home.product.body'))}
                                </p>

                                {featuredProduct.specs &&
                                    featuredProduct.specs.length > 0 && (
                                        <dl className="mt-10 grid grid-cols-2 gap-3 border-t border-border/60 pt-8 sm:grid-cols-3">
                                            {featuredProduct.specs
                                                .slice(0, 6)
                                                .map((s) => (
                                                    <div
                                                        key={s.label}
                                                        className="border border-border/60 bg-cream/60 px-4 py-3"
                                                    >
                                                        <dt className="text-[10px] font-semibold tracking-[0.18em] text-coffee/40 uppercase">
                                                            {s.label}
                                                        </dt>
                                                        <dd className="mt-1.5 text-sm text-ink">
                                                            {s.value}
                                                        </dd>
                                                    </div>
                                                ))}
                                        </dl>
                                    )}

                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={`/${locale}/product`}
                                        className="group inline-flex items-center gap-2 bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
                                    >
                                        {str(t('home.product.cta'))}
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href={`/${locale}/contact`}
                                        className="inline-flex items-center gap-2 border border-border/80 px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-terra hover:text-terra"
                                    >
                                        {str(t('ui.cta.sample'))}
                                    </Link>
                                </div>
                            </Reveal>

                            {/* Right — tall portrait image, no border-radius */}
                            <Reveal delay={100}>
                                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[560px]">
                                    <img
                                        src={
                                            featuredProduct.images?.hero ??
                                            '/images/real/product.jpeg'
                                        }
                                        alt={featuredProduct.name}
                                        loading="lazy"
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    <div className="absolute bottom-6 left-6">
                                        <span className="inline-block border border-terra/40 bg-ink/60 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-cream uppercase backdrop-blur-sm">
                                            {locale === 'en'
                                                ? 'Specialty Grade · SCA 85.5+'
                                                : 'Specialty Grade · SCA 85.5+'}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}

            {/* Process strip — 4 steps, bone bg */}
            <section className="relative border-t border-border/60 bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    {str(t('home.process.eyebrow'))}
                                </p>
                                <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                                    {str(t('home.process.title'))}
                                </h2>
                            </div>
                            <Link
                                href={`/${locale}/process`}
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-terra"
                            >
                                {str(t('home.process.link'))}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </Reveal>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step, i) => (
                            <Reveal key={step.title} delay={i * 70}>
                                <div className="relative overflow-hidden border border-border/60 bg-cream/50 p-7">
                                    {/* Watermark number */}
                                    <span className="absolute -top-4 -right-3 font-display text-[96px] leading-none font-bold text-ink/[0.04] select-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="relative flex flex-col gap-4">
                                        <span className="text-[11px] font-semibold tracking-[0.24em] text-terra uppercase">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-base font-semibold text-ink">
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] leading-relaxed text-coffee/70">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image strip */}
            <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                    {
                        src: '/images/real/beansonacontainer.jpeg',
                        alt: 'Green beans in container',
                    },
                    {
                        src: '/images/add/warehouse-1.jpg',
                        alt: 'Warehouse operations',
                    },
                    {
                        src: '/images/add/sun-drying.jpg',
                        alt: 'Sun drying process',
                    },
                    {
                        src: '/images/add/truck-front.jpg',
                        alt: 'Export delivery truck',
                    },
                ].map((img) => (
                    <div key={img.src} className="overflow-hidden">
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Export snapshot — asymmetric 2-col, ink bg */}
            <section className="relative bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-16 lg:grid-cols-[1fr_480px] lg:gap-24">
                        {/* Left — headline + port anchor */}
                        <Reveal>
                            <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('home.exportSnap.eyebrow'))}
                            </p>
                            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-5xl">
                                {str(t('home.exportSnap.title'))}
                            </h2>
                            <div className="mt-12 border-t border-cream/10 pt-10">
                                <p className="text-[10px] font-semibold tracking-[0.22em] text-terra/70 uppercase">
                                    {locale === 'en'
                                        ? 'Departure port'
                                        : 'Pelabuhan keberangkatan'}
                                </p>
                                <p className="mt-2 font-display text-2xl font-light text-cream/60 md:text-3xl">
                                    Belawan Port, Medan
                                </p>
                                <p className="mt-1 text-xs text-cream/30">
                                    North Sumatra, Indonesia
                                </p>
                            </div>
                            <Link
                                href={`/${locale}/export`}
                                className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-cream"
                            >
                                {str(t('home.exportSnap.link'))}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Reveal>

                        {/* Right — 3 data rows stacked */}
                        <Reveal delay={80}>
                            <div className="divide-y divide-cream/10 border-y border-cream/10">
                                {[
                                    {
                                        label: str(t('home.exportSnap.moq')),
                                        value: str(t('home.exportSnap.moqLcl')),
                                        sub: str(t('home.exportSnap.moqFcl')),
                                    },
                                    {
                                        label: str(
                                            t('home.exportSnap.incoterms'),
                                        ),
                                        value: str(
                                            t('home.exportSnap.incotermsList'),
                                        ),
                                        sub: null,
                                    },
                                    {
                                        label: str(
                                            t('home.exportSnap.packaging'),
                                        ),
                                        value: str(
                                            t('home.exportSnap.packagingValue'),
                                        ),
                                        sub: str(
                                            t('home.exportSnap.certsList'),
                                        ),
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="grid grid-cols-[120px_1fr] gap-4 py-7"
                                    >
                                        <p className="pt-0.5 text-[10px] leading-tight font-semibold tracking-[0.22em] text-terra/70 uppercase">
                                            {row.label}
                                        </p>
                                        <div>
                                            <p className="text-sm font-semibold text-cream">
                                                {row.value}
                                            </p>
                                            {row.sub && (
                                                <p className="mt-1 text-[13px] leading-relaxed text-cream/40">
                                                    {row.sub}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Testimonials — dark bg, large single quote with name row */}
            {testimonials.length > 0 && (
                <section className="relative overflow-hidden bg-espresso py-24 md:py-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <Reveal>
                            <p className="mb-12 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('home.testimonials.eyebrow'))}
                            </p>
                        </Reveal>
                        <div className="space-y-12">
                            {testimonials.slice(0, 3).map((item, i) => (
                                <Reveal
                                    key={item.id ?? item.name}
                                    delay={i * 80}
                                >
                                    <figure className="grid gap-6 border-t border-cream/10 pt-10 first:border-0 first:pt-0 lg:grid-cols-[1fr_260px] lg:gap-16">
                                        <blockquote className="font-display text-2xl leading-relaxed text-cream md:text-3xl">
                                            &ldquo;{item.quote}&rdquo;
                                        </blockquote>
                                        <figcaption className="flex items-center gap-4 lg:flex-col lg:items-start lg:justify-end">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    className="size-12 shrink-0 rounded-full border border-cream/20 object-cover"
                                                />
                                            ) : (
                                                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-terra/20 font-display text-base font-bold text-terra">
                                                    {item.name.charAt(0)}
                                                </span>
                                            )}
                                            <div>
                                                <p className="font-semibold text-cream">
                                                    {item.name}
                                                </p>
                                                {item.role && (
                                                    <p className="mt-0.5 text-xs text-cream/50">
                                                        {item.role}
                                                    </p>
                                                )}
                                            </div>
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Sample CTA — centered card on image bg */}
            <section className="relative overflow-hidden py-36 md:py-48">
                <img
                    src="/images/real/beansonacontainer4.jpeg"
                    alt="Given Coffee specialty green beans"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/70" />
                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="mx-auto max-w-4xl rounded-sm border border-cream/15 bg-ink/60 px-8 py-12 text-center backdrop-blur-md md:px-14 md:py-16">
                            <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('home.sample.eyebrow'))}
                            </p>
                            <h2 className="font-display text-3xl leading-[1.06] text-cream md:text-4xl">
                                {str(t('home.sample.title'))}
                            </h2>
                            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/75">
                                {str(t('home.sample.body'))}
                            </p>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                <Cta
                                    href={`/${locale}/contact`}
                                    variant="terra"
                                    className="px-8 py-3 text-base"
                                >
                                    {str(t('home.sample.cta'))}
                                </Cta>
                                <Cta
                                    href={`/${locale}/export`}
                                    variant="outline-light"
                                    className="px-8 py-3 text-base"
                                >
                                    {str(t('home.sample.ctaSecondary'))}
                                </Cta>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <InstagramFeed />
        </>
    );
}
