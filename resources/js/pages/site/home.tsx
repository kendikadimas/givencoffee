import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowRight, Award, BadgeCheck, CheckCircle2, ChevronRight, Compass, Flame, Globe2, Handshake, Layers, MapPin, Quote, Route, Sparkles } from 'lucide-react';

import { Cta } from '@/components/site/cta';
import { InstagramFeed } from '@/components/site/instagram-feed';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
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
    testimonials?: Array<{ id?: number; name: string; role: string; quote: string; image?: string | null }>;
};

type WhyItem = { title: string; text: string };

export default function Home({ product, products = [], testimonials = [] }: HomeProps) {
    const { t, locale } = useTranslations();
    const seoSettings = useSeoSettings();
    const featuredProduct = product ?? products[0] ?? null;

    const whyItems = arr<WhyItem>(t('home.why.items'));
    const whyIcons = [MapPin, Handshake, BadgeCheck, Route];

    const stats = [
        { label: locale === 'en' ? 'Elevation' : 'Ketinggian', value: '1,400–1,750 MASL' },
        { label: locale === 'en' ? 'SCA Cupping Score' : 'Skor Cupping SCA', value: '84+ Specialty' },
        { label: locale === 'en' ? 'Annual Capacity' : 'Kapasitas Ekspor', value: '100+ Tonnes/Yr' },
        { label: locale === 'en' ? 'Direct Trade' : 'Kemitraan Langsung', value: '100% Traceable' },
    ];

    return (
        <>
            <Seo
                title={str(t('home.hero.title'))}
                description={str(t('ui.meta.defaultDescription'))}
                path={`/${locale}`}
                type="website"
                jsonLd={organizationJsonLd(seoSettings)}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink pt-36 pb-20 md:pb-24">
                <img
                    src="/images/real/beansonacontainer.jpeg"
                    alt="Freshly harvested coffee beans from the Indonesian highlands"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-65 transition-transform duration-1000 ease-out hover:scale-105"
                />
                
                {/* Atmospheric overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
                <div className="pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-terra/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-forest/20 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                                <Sparkles className="size-3 text-terra" />
                                {str(t('home.hero.eyebrow'))}
                            </span>
                            <span className="hidden items-center gap-1.5 rounded-full border border-cream/20 bg-white/10 px-3 py-1 text-xs font-semibold text-cream/90 backdrop-blur-xs sm:inline-flex">
                                <Globe2 className="size-3 text-cream/70" />
                                Dolok Sanggul, North Sumatra
                            </span>
                        </div>

                        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.03] tracking-tight text-cream md:text-7xl lg:text-8xl">
                            {str(t('home.hero.title'))}
                        </h1>
                        
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-xl font-light">
                            {str(t('home.hero.subtitle'))}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Cta href={`/${locale}/product`} variant="terra" className="px-7 py-3 text-base">
                                {str(t('home.hero.ctaPrimary'))}
                                <ArrowRight className="size-4" />
                            </Cta>
                            <Cta href={`/${locale}/contact`} variant="outline-light" className="px-7 py-3 text-base">
                                {str(t('home.hero.ctaSecondary'))}
                            </Cta>
                        </div>

                        {/* Terroir & Export Quick Stats */}
                        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-cream/15 pt-8 sm:grid-cols-4 md:gap-8">
                            {stats.map((st) => (
                                <div key={st.label} className="border-l border-terra/50 pl-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/55">
                                        {st.label}
                                    </p>
                                    <p className="mt-1 font-display text-lg font-medium text-cream md:text-xl">
                                        {st.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div className="absolute bottom-8 right-8 hidden text-cream/40 md:block">
                    <ArrowDown className="size-5 animate-bounce" />
                </div>
            </section>

            {/* About Teaser Section */}
            <section className="relative overflow-hidden bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <Reveal className="lg:col-span-6">
                            <div className="relative">
                                <div className="overflow-hidden rounded-sm border border-border/80 bg-cream shadow-earth-lg">
                                    <img
                                        src="/images/real/closeup-greenbeans.jpeg"
                                        alt="Specialty Indonesian green beans ready for export"
                                        loading="lazy"
                                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 hidden rounded-sm border border-border/80 bg-cream/95 p-6 shadow-earth-lg backdrop-blur-md md:block">
                                    <span className="badge-origin mb-2">Terroir & Origin</span>
                                    <p className="font-display text-3xl font-bold text-forest">100+ MT</p>
                                    <p className="text-xs uppercase tracking-[0.18em] text-coffee">
                                        {locale === 'en' ? 'Annual Export Capacity' : 'Kapasitas Ekspor Tahunan'}
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={120} className="lg:col-span-6">
                            <SectionHeading
                                eyebrow={str(t('home.about.eyebrow'))}
                                title={str(t('home.about.title'))}
                                body={str(t('home.about.body'))}
                            />
                            
                            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/70 pt-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-terra" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-ink">
                                            {locale === 'en' ? 'Volcanic Rich Soil' : 'Tanah Vulkanik Subur'}
                                        </h4>
                                        <p className="text-xs text-coffee mt-0.5">
                                            {locale === 'en' ? 'Lake Toba microclimate' : 'Mikroklimat Danau Toba'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-terra" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-ink">
                                            {locale === 'en' ? 'Ethical Direct Trade' : 'Perdagangan Berkelanjutan'}
                                        </h4>
                                        <p className="text-xs text-coffee mt-0.5">
                                            {locale === 'en' ? 'Empowering local smallholders' : 'Mendukung petani lokal'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/${locale}/about`}
                                className="mt-8 inline-flex items-center gap-2 rounded-full border border-terra/40 bg-terra/10 px-5 py-2.5 text-sm font-semibold text-terra transition-all hover:border-terra hover:bg-terra hover:text-cream"
                            >
                                {str(t('home.about.link'))}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Featured Product Highlight */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                {/* Background ambient lighting */}
                <div className="pointer-events-none absolute -top-40 right-10 size-96 rounded-full bg-terra/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 size-96 rounded-full bg-black/40 blur-3xl" />

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span className="badge-pill border-terra/40 bg-terra/25 text-cream">
                                    {str(t('home.product.eyebrow'))}
                                </span>
                                <h2 className="mt-3 font-display text-4xl leading-[1.06] tracking-tight text-cream md:text-6xl">
                                    {str(t('home.product.title'))}
                                </h2>
                            </div>
                            <Link
                                href={`/${locale}/product`}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-cream"
                            >
                                {locale === 'en' ? 'View All Catalog' : 'Lihat Semua Katalog'}
                                <ChevronRight className="size-4" />
                            </Link>
                        </div>
                    </Reveal>

                    {featuredProduct && (
                        <div className="mt-14 grid items-stretch gap-10 rounded-sm border border-cream/15 bg-black/25 p-6 backdrop-blur-md md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:p-10 lg:p-12">
                            <Reveal>
                                <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-sm border border-cream/20 bg-ink">
                                    <img
                                        src={featuredProduct.images?.hero ?? '/images/real/product.jpeg'}
                                        alt={featuredProduct.name}
                                        loading="lazy"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                                    
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex flex-wrap gap-2">
                                            {['Dark Chocolate', 'Brown Sugar', 'Orange Zest', 'Clean Finish'].map((note) => (
                                                <span
                                                    key={note}
                                                    className="rounded-full border border-cream/30 bg-black/40 px-3 py-1 text-xs font-medium text-cream backdrop-blur-xs"
                                                >
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={120} className="flex flex-col justify-between">
                                <div>
                                    <span className="badge-origin border-terra/40 bg-terra/20 text-cream">
                                        {featuredProduct.subtitle}
                                    </span>
                                    <h3 className="mt-4 font-display text-3xl leading-tight text-cream md:text-5xl">
                                        {featuredProduct.name}
                                    </h3>
                                    <p className="mt-5 leading-relaxed text-cream/75">
                                        {str(t('home.product.body'))}
                                    </p>

                                    {featuredProduct.specs && featuredProduct.specs.length > 0 && (
                                        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-cream/15 py-6">
                                            {featuredProduct.specs.slice(0, 4).map((spec) => (
                                                <div key={spec.label} className="rounded-xs bg-white/5 p-3">
                                                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                                                        {spec.label}
                                                    </dt>
                                                    <dd className="mt-1 font-display text-sm font-medium text-cream">
                                                        {spec.value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <Cta href={`/${locale}/product/${featuredProduct.id ?? ''}`} variant="terra">
                                        {str(t('home.product.cta'))}
                                        <ArrowRight className="size-4" />
                                    </Cta>
                                    <Cta href={`/${locale}/contact`} variant="outline-light">
                                        {str(t('ui.cta.sample'))}
                                    </Cta>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Us (Value Propositions) */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('home.why.eyebrow'))}
                        title={str(t('home.why.title'))}
                        align="center"
                        className="mx-auto"
                    />

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {whyItems.map((item, i) => {
                            const Icon = whyIcons[i % whyIcons.length];

                            return (
                                <Reveal key={item.title} delay={i * 80}>
                                    <div className="card-luxury flex h-full flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="grid size-12 place-items-center rounded-full border border-forest/20 bg-olive text-forest shadow-xs">
                                                    <Icon className="size-5" />
                                                </span>
                                                <span className="font-display text-2xl font-light text-terra/60">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className="mt-6 font-display text-xl text-ink">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2.5 text-sm leading-relaxed text-coffee">
                                                {item.text}
                                            </p>
                                        </div>
                                        <div className="mt-6 h-0.5 w-8 rounded-full bg-terra/40" />
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials / Roasters Section */}
            {testimonials.length > 0 && (
                <section className="relative overflow-hidden bg-bone py-24 md:py-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            eyebrow={str(t('home.testimonials.eyebrow'))}
                            title={str(t('home.testimonials.title'))}
                            align="center"
                            className="mx-auto"
                        />
                        <div className="mt-14 grid gap-6 md:grid-cols-3">
                            {testimonials.map((item, i) => (
                                <Reveal key={item.id ?? item.name} delay={i * 90}>
                                    <figure className="card-luxury flex h-full flex-col justify-between">
                                        <div>
                                            <Quote className="size-8 text-terra/70" />
                                            <blockquote className="mt-4 leading-relaxed text-ink/90 italic">
                                                &ldquo;{item.quote}&rdquo;
                                            </blockquote>
                                        </div>
                                        <figcaption className="mt-8 flex items-center gap-4 border-t border-border/80 pt-5">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    className="size-12 rounded-full border border-terra/30 object-cover"
                                                />
                                            ) : (
                                                <span className="grid size-12 place-items-center rounded-full bg-olive font-display text-lg font-bold text-forest">
                                                    {item.name.charAt(0)}
                                                </span>
                                            )}
                                            <div>
                                                <p className="font-display text-base font-bold text-ink">{item.name}</p>
                                                {item.role && (
                                                    <p className="text-xs uppercase tracking-[0.14em] text-coffee">
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

            {/* Ceremony CTA Section */}
            <section className="relative overflow-hidden py-28 md:py-40">
                <img
                    src="/images/real/pouchgreenbeans.jpeg"
                    alt="Roasted and green specialty coffee beans"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/65" />
                <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,rgba(184,92,56,0.15),transparent_70%]" />

                <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
                    <Reveal>
                        <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                            {str(t('home.ceremony.eyebrow'))}
                        </span>
                        <h2 className="mt-4 font-display text-4xl leading-[1.08] text-cream md:text-6xl">
                            {str(t('home.ceremony.title'))}
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
                            {str(t('home.ceremony.body'))}
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Cta href={`/${locale}/contact`} variant="terra" className="px-8 py-3 text-base">
                                {str(t('home.ceremony.ctaPrimary'))}
                            </Cta>
                            <Cta href={`/${locale}/contact`} variant="outline-light" className="px-8 py-3 text-base">
                                {str(t('home.ceremony.ctaSecondary'))}
                            </Cta>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Instagram feed */}
            <InstagramFeed />
        </>
    );
}
