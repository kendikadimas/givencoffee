import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

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
    testimonials?: Array<{ id?: number; name: string; role: string; quote: string; image?: string | null }>;
};

type WhyItem = { title: string; text: string };

export default function Home({ product, products = [], testimonials = [] }: HomeProps) {
    const { t, locale } = useTranslations();
    const seoSettings = useSeoSettings();
    const featuredProduct = product ?? products[0] ?? null;

    const whyItems = arr<WhyItem>(t('home.why.items'));

    return (
        <>
            <Seo
                title={str(t('home.hero.title'))}
                description={str(t('ui.meta.defaultDescription'))}
                path={`/${locale}`}
                type="website"
                jsonLd={organizationJsonLd(seoSettings)}
            />

            {/* Hero — clean, no badges, no stats strip */}
            <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink pt-36 pb-20 md:pb-24">
                <img
                    src="/images/real/beansonacontainer.jpeg"
                    alt="Freshly harvested coffee beans from the Indonesian highlands"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-65 transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <h1 className="max-w-4xl font-display text-5xl leading-[1.03] tracking-tight text-cream md:text-7xl lg:text-8xl">
                            {str(t('home.hero.title'))}
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-xl font-light">
                            {str(t('home.hero.subtitle'))}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Cta href={`/${locale}/product`} variant="terra" className="px-7 py-3 text-base">
                                {str(t('home.hero.ctaPrimary'))}
                            </Cta>
                            <Cta href={`/${locale}/contact`} variant="outline-light" className="px-7 py-3 text-base">
                                {str(t('home.hero.ctaSecondary'))}
                            </Cta>
                        </div>

                    </Reveal>
                </div>
            </section>

            {/* About Teaser — asymmetric: large image left, text right, no eyebrow */}
            <section className="relative overflow-hidden bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                        <Reveal className="lg:col-span-7">
                            <div className="relative overflow-hidden rounded-sm border border-border/80 bg-cream shadow-earth-lg">
                                <img
                                    src="/images/real/closeup-greenbeans.jpeg"
                                    alt="Specialty Indonesian green beans ready for export"
                                    loading="lazy"
                                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-8">
                                    <p className="font-display text-3xl font-bold text-cream">100+ MT</p>
                                    <p className="text-xs uppercase tracking-[0.18em] text-cream/70">
                                        {locale === 'en' ? 'Annual Export Capacity' : 'Kapasitas Ekspor Tahunan'}
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={120} className="lg:col-span-5">
                            <h2 className="font-display text-3xl leading-[1.14] tracking-tight text-ink md:text-4xl">
                                {str(t('home.about.title'))}
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-coffee md:text-lg">
                                {str(t('home.about.body'))}
                            </p>

                            <div className="mt-8 space-y-4 border-t border-border/70 pt-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-ink">
                                        {locale === 'en' ? 'Volcanic Rich Soil' : 'Tanah Vulkanik Subur'}
                                    </h4>
                                    <p className="text-xs text-coffee mt-0.5">
                                        {locale === 'en' ? 'Lake Toba microclimate' : 'Mikroklimat Danau Toba'}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-ink">
                                        {locale === 'en' ? 'Ethical Direct Trade' : 'Perdagangan Berkelanjutan'}
                                    </h4>
                                    <p className="text-xs text-coffee mt-0.5">
                                        {locale === 'en' ? 'Empowering local smallholders' : 'Mendukung petani lokal'}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/${locale}/about`}
                                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-terra-deep"
                            >
                                {str(t('home.about.link'))}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Featured Product — full-width image on top, specs below */}
            <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    {featuredProduct && (
                        <Reveal>
                            <div className="grid items-stretch gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
                                <div className="group relative overflow-hidden rounded-sm border border-cream/20 bg-ink">
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

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                                            {featuredProduct.subtitle}
                                        </p>
                                        <h3 className="mt-3 font-display text-3xl leading-tight text-cream md:text-5xl">
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
                                        </Cta>
                                        <Cta href={`/${locale}/contact`} variant="outline-light">
                                            {str(t('ui.cta.sample'))}
                                        </Cta>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Why Us — bento: first item wide, rest 2-col, no icons, no numbered badges */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ink md:text-5xl">
                            {str(t('home.why.title'))}
                        </h2>
                    </Reveal>

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Reveal className="sm:col-span-2 lg:col-span-2">
                            <div className="flex h-full flex-col justify-between rounded-sm border border-border/90 bg-bone p-8 transition-all duration-300 hover:border-terra/50 md:p-10">
                                <div>
                                    <h3 className="font-display text-2xl text-ink md:text-3xl">
                                        {whyItems[0]?.title}
                                    </h3>
                                    <p className="mt-3 max-w-lg text-base leading-relaxed text-coffee">
                                        {whyItems[0]?.text}
                                    </p>
                                </div>
                                <div className="mt-8 h-px w-full bg-border/60" />
                            </div>
                        </Reveal>

                        {whyItems.slice(1, 3).map((item, i) => (
                            <Reveal key={item.title} delay={(i + 1) * 80}>
                                <div className="flex h-full flex-col justify-between rounded-sm border border-border/90 bg-bone p-8 transition-all duration-300 hover:border-terra/50">
                                    <div>
                                        <h3 className="font-display text-xl text-ink">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2.5 text-sm leading-relaxed text-coffee">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}

                        {whyItems.slice(3).map((item) => (
                            <Reveal key={item.title}>
                                <div className="flex h-full flex-col justify-between rounded-sm border border-border/90 bg-bone p-8 transition-all duration-300 hover:border-terra/50 sm:col-span-2 lg:col-span-3">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <h3 className="font-display text-xl text-ink">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-coffee">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials — full-width quote, no grid, no eyebrow */}
            {testimonials.length > 0 && (
                <section className="relative overflow-hidden bg-bone py-24 md:py-32">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <div className="grid gap-10 md:grid-cols-12">
                            <Reveal className="md:col-span-4">
                                <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ink md:text-4xl">
                                    {str(t('home.testimonials.title'))}
                                </h2>
                                <div className="mt-6 h-12 w-px bg-terra/40" />
                            </Reveal>

                            <Reveal delay={80} className="md:col-span-8">
                                <div className="space-y-8">
                                    {testimonials.slice(0, 3).map((item, i) => (
                                        <figure
                                            key={item.id ?? item.name}
                                            className="border-l-2 border-terra/40 pl-6 transition-colors hover:border-terra"
                                        >
                                            <blockquote className="text-lg leading-relaxed text-ink/90 md:text-xl">
                                                &ldquo;{item.quote}&rdquo;
                                            </blockquote>
                                            <figcaption className="mt-4 flex items-center gap-3">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        loading="lazy"
                                                        className="size-10 rounded-full border border-terra/30 object-cover"
                                                    />
                                                ) : (
                                                    <span className="grid size-10 place-items-center rounded-full bg-olive font-display text-sm font-bold text-forest">
                                                        {item.name.charAt(0)}
                                                    </span>
                                                )}
                                                <div>
                                                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                                                    {item.role && (
                                                        <p className="text-xs text-coffee">{item.role}</p>
                                                    )}
                                                </div>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}

            {/* Ceremony CTA — full-bleed, no eyebrow */}
            <section className="relative overflow-hidden py-28 md:py-40">
                <img
                    src="/images/real/pouchgreenbeans.jpeg"
                    alt="Roasted and green specialty coffee beans"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/65" />

                <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
                    <Reveal>
                        <h2 className="font-display text-4xl leading-[1.08] text-cream md:text-6xl">
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

            <InstagramFeed />
        </>
    );
}
