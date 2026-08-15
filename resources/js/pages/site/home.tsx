import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowRight, BadgeCheck, Handshake, MapPin, Route } from 'lucide-react';

import { Cta } from '@/components/site/cta';
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
};

type WhyItem = { title: string; text: string };

export default function Home({ product, products = [] }: HomeProps) {
    const { t, locale } = useTranslations();
    const seoSettings = useSeoSettings();
    const featuredProduct = product ?? products[0] ?? null;

    const whyItems = arr<WhyItem>(t('home.why.items'));
    const whyIcons = [MapPin, Handshake, BadgeCheck, Route];

    return (
        <>
            <Seo
                title={str(t('home.hero.title'))}
                description={str(t('ui.meta.defaultDescription'))}
                path={`/${locale}`}
                type="website"
                jsonLd={organizationJsonLd(seoSettings)}
            />

            {/* Hero */}
            <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink">
                <img
                    src="/images/real/beansonacontainer.jpeg"
                    alt="Freshly harvested coffee beans from the Indonesian highlands"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-40 md:px-8 md:pb-28">
                    <Reveal>
                        <p className="eyebrow mb-5 text-terra">{str(t('home.hero.eyebrow'))}</p>
                        <h1 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-cream md:text-7xl">
                            {str(t('home.hero.title'))}
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
                            {str(t('home.hero.subtitle'))}
                        </p>
                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Cta href={`/${locale}/product`} variant="terra">
                                {str(t('home.hero.ctaPrimary'))}
                                <ArrowRight className="size-4" />
                            </Cta>
                            <Cta href={`/${locale}/contact`} variant="outline-light">
                                {str(t('home.hero.ctaSecondary'))}
                            </Cta>
                        </div>
                    </Reveal>
                </div>

                <div className="absolute bottom-8 right-8 hidden text-cream/50 md:block">
                    <ArrowDown className="size-5 animate-bounce" />
                </div>
            </section>

            {/* About teaser */}
            <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                    <Reveal className="order-2 md:order-1">
                        <div className="relative">
                            <img
                                src="/images/real/closeup-greenbeans.jpeg"
                                alt="Coffee growing in the Indonesian highlands"
                                loading="lazy"
                                className="aspect-3/2 w-full rounded-sm object-cover"
                            />
                            <div className="absolute -bottom-5 -right-5 hidden rounded-sm bg-olive px-6 py-5 md:block">
                                <p className="font-display text-3xl text-forest">100</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-forest/70">
                                    {locale === 'en' ? 'Tonnes / Year' : 'Ton / Tahun'}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={120} className="order-1 md:order-2">
                        <SectionHeading
                            eyebrow={str(t('home.about.eyebrow'))}
                            title={str(t('home.about.title'))}
                            body={str(t('home.about.body'))}
                        />
                        <Link
                            href={`/${locale}/about`}
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-terra-deep"
                        >
                            {str(t('home.about.link'))}
                            <ArrowRight className="size-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Product highlight */}
            <section className="bg-forest-deep py-24 text-cream md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="eyebrow text-terra">{str(t('home.product.eyebrow'))}</p>
                        <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
                            {str(t('home.product.title'))}
                        </h2>
                    </Reveal>

                    {featuredProduct && (
                        <div className="mt-12 grid items-stretch gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:gap-24">
                            <Reveal>
                                <div className="relative h-full min-h-[24rem] overflow-hidden rounded-sm bg-ink">
                                    <img
                                        src={featuredProduct.images?.hero ?? '/images/real/product.jpeg'}
                                        alt={featuredProduct.name}
                                        loading="lazy"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                                    <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.2em] text-cream/80">
                                        {str(t('product.notes.eyebrow'))}
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal delay={120} className="flex flex-col justify-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                                    {featuredProduct.subtitle}
                                </p>
                                <h3 className="mt-4 max-w-xl font-display text-4xl leading-[1.04] tracking-tight text-cream md:text-6xl">
                                    {featuredProduct.name}
                                </h3>
                                <p className="mt-6 max-w-xl leading-relaxed text-cream/70">
                                    {str(t('home.product.body'))}
                                </p>

                                {featuredProduct.specs && featuredProduct.specs.length > 0 && (
                                    <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-y border-cream/15 py-6">
                                        {featuredProduct.specs.slice(0, 4).map((spec) => (
                                            <div key={spec.label}>
                                                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                                                    {spec.label}
                                                </dt>
                                                <dd className="mt-1 text-sm leading-snug text-cream">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                )}

                                <div className="mt-8 flex flex-wrap items-center gap-5">
                                    <Link
                                        href={`/${locale}/product/${featuredProduct.id ?? ''}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-cream"
                                    >
                                        {str(t('home.product.cta'))}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    <Cta href={`/${locale}/contact`} variant="outline-light">
                                        {str(t('ui.cta.sample'))}
                                    </Cta>
                                </div>
                            </Reveal>
                        </div>
                    )}
                </div>
            </section>

            {/* Why us */}
            <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
                <SectionHeading
                    eyebrow={str(t('home.why.eyebrow'))}
                    title={str(t('home.why.title'))}
                    align="center"
                    className="mx-auto"
                />

                <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
                    {whyItems.map((item, i) => {
                        const Icon = whyIcons[i % whyIcons.length];

                        return (
                            <Reveal key={item.title} delay={i * 90} className="bg-white">
                                <div className="flex h-full flex-col p-8">
                                    <span className="grid size-12 place-items-center rounded-full bg-olive text-forest">
                                        <Icon className="size-5" />
                                    </span>
                                    <h3 className="mt-6 font-display text-xl text-ink">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-coffee">
                                        {item.text}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* Ceremony CTA */}
            <section className="relative overflow-hidden py-28 md:py-40">
                <img
                    src="/images/real/pouchgreenbeans.jpeg"
                    alt="Roasted coffee in the Indonesian highlands"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/70" />

                <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
                    <Reveal>
                        <p className="eyebrow text-terra">{str(t('home.ceremony.eyebrow'))}</p>
                        <h2 className="mt-4 font-display text-4xl leading-[1.08] text-cream md:text-6xl">
                            {str(t('home.ceremony.title'))}
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/75">
                            {str(t('home.ceremony.body'))}
                        </p>
                        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                            <Cta href={`/${locale}/contact`} variant="terra">
                                {str(t('home.ceremony.ctaPrimary'))}
                            </Cta>
                            <Cta href={`/${locale}/contact`} variant="outline-light">
                                {str(t('home.ceremony.ctaSecondary'))}
                            </Cta>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
