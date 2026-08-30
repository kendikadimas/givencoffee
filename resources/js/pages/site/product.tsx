import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { Seo } from '@/components/site/seo';
import { str, useTranslations } from '@/hooks/use-translations';

type Spec = { label: string; value: string };

type Product = {
    id?: number;
    name: string;
    subtitle: string;
    specs: Spec[];
    cupping?: { notes?: string; traits?: string[] };
    images: { hero?: string; packaging?: string };
};

type ProductProps = {
    products?: Product[];
};

export default function Product({ products = [] }: ProductProps) {
    const { t, locale } = useTranslations();

    const [showcase, ...rest] = products;

    return (
        <>
            <Seo
                title={str(t('product.hero.title'))}
                description={str(t('product.hero.body'))}
                path={`/${locale}/product`}
                image="/images/real/product-close-up.jpeg"
            />

            {/* Hero — split panel: left dark text, right full-bleed image */}
            <section className="relative flex min-h-[80vh] overflow-hidden bg-ink lg:min-h-[90vh]">
                {/* Left panel */}
                <div className="relative z-10 flex w-full flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pb-24 lg:w-[55%] lg:pr-16">
                    <div className="absolute inset-0 lg:hidden">
                    <img
                        src="/images/real/beansonacontainer3.jpeg"
                        alt="Indonesian highland specialty green coffee beans"
                        fetchPriority="high"
                        className="size-full object-cover opacity-40"
                    />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
                    </div>
                    <Reveal className="relative">
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-terra">
                            {str(t('product.hero.eyebrow'))}
                        </p>
                        <h1 className="max-w-2xl font-display text-4xl leading-[1.04] tracking-tight text-cream md:text-6xl lg:text-7xl">
                            {str(t('product.hero.title'))}
                        </h1>
                        <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-cream/75 md:text-lg">
                            {str(t('product.hero.body'))}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-terra-deep"
                            >
                                {str(t('ui.cta.sample'))}
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="#collection"
                                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:border-cream/60"
                            >
                                {str(t('product.hero.subtitle'))}
                            </Link>
                        </div>
                    </Reveal>
                </div>

                {/* Right panel — full-bleed image, desktop only */}
                <div className="absolute inset-y-0 right-0 hidden w-[47%] overflow-hidden lg:block">
                    <img
                        src="/images/real/beansonacontainer3.jpeg"
                        alt="Indonesian highland specialty green coffee beans"
                        fetchPriority="high"
                        className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
                </div>
            </section>

            {/* Collection Showcase */}
            <section id="collection" className="relative bg-bone py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">

                    {showcase && (
                        <Reveal>
                            {/* Showcase: image top 60vh full-width, specs below as horizontal table */}
                            <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-earth-lg">
                                {/* Full-width image with overlay */}
                                <div className="group relative overflow-hidden">
                                    <img
                                        src={showcase.images?.hero ?? '/images/real/product.jpeg'}
                                        alt={showcase.name}
                                        loading="lazy"
                                        className="aspect-[21/9] w-full object-cover transition-transform duration-700 group-hover:scale-103"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                                        <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                                            Grade 1 Specialty
                                        </span>
                                        <h2 className="mt-3 font-display text-4xl font-bold text-cream md:text-6xl">
                                            {showcase.name}
                                        </h2>
                                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-terra">
                                            {showcase.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Specs — horizontal table layout, no borders on cells */}
                                <div className="p-8 md:p-12">
                                    {showcase.specs.length > 0 && (
                                        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border/60 pt-8 sm:grid-cols-3 lg:grid-cols-4">
                                            {showcase.specs.map((s) => (
                                                <div key={s.label}>
                                                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee/70">
                                                        {s.label}
                                                    </dt>
                                                    <dd className="mt-1 font-display text-sm font-bold text-ink">
                                                        {s.value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}

                                    {showcase.cupping?.traits && showcase.cupping.traits.length > 0 && (
                                        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/40 pt-6">
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee/70 mr-2">
                                                {showcase.cupping.notes ?? 'Cupping notes'}
                                            </span>
                                            {showcase.cupping.traits.map((trait) => (
                                                <span
                                                    key={trait}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-terra/10 px-3 py-1 text-xs font-semibold text-terra"
                                                >
                                                    <Check className="size-3" />
                                                    {trait}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/40 pt-8">
                                        <Link
                                            href={`/${locale}/product/${showcase.id}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-espresso"
                                        >
                                            {str(t('product.collection.viewDetails'))}
                                            <ArrowRight className="size-4" />
                                        </Link>
                                        <Link
                                            href={`/${locale}/contact`}
                                            className="inline-flex items-center gap-2 rounded-full border border-border/90 px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-terra hover:text-terra"
                                        >
                                            {str(t('ui.cta.sample'))}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Subsequent products */}
                    {rest.length > 0 && (
                        <div className="mt-8 space-y-6">
                            {rest.map((p) => (
                                <Reveal key={p.id ?? p.name}>
                                    <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-earth sm:flex">
                                        <div className="group relative shrink-0 overflow-hidden sm:w-[40%]">
                                            <img
                                                src={p.images?.hero ?? '/images/real/product.jpeg'}
                                                alt={p.name}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center px-6 py-8 sm:w-[60%] sm:px-8">
                                            <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">{p.name}</h2>
                                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-terra">{p.subtitle}</p>
                                            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-5 sm:grid-cols-3">
                                                {p.specs.slice(0, 6).map((s) => (
                                                    <div key={s.label}>
                                                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee/70">{s.label}</dt>
                                                        <dd className="mt-0.5 font-display text-sm font-bold text-ink">{s.value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                                <Link
                                                    href={`/${locale}/product/${p.id}`}
                                                    className="inline-flex items-center gap-2 rounded-full bg-terra px-5 py-2 text-sm font-semibold text-cream transition-all hover:bg-terra-deep"
                                                >
                                                    {str(t('product.collection.viewDetails'))}
                                                    <ArrowRight className="size-4" />
                                                </Link>
                                                <Link
                                                    href={`/${locale}/contact`}
                                                    className="inline-flex items-center gap-2 rounded-full border border-border/90 px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-terra hover:text-terra"
                                                >
                                                    {str(t('ui.cta.sample'))}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
