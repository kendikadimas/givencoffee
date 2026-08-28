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

            {/* Hero */}
            <section className="relative flex min-h-[64vh] items-end overflow-hidden bg-ink pt-36 pb-20 md:min-h-[70vh] md:pb-24">
                <img
                    src="/images/real/closeup-greenbeans.jpeg"
                    alt="Indonesian highland specialty green coffee beans"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <h1 className="max-w-4xl font-display text-4xl leading-[1.04] tracking-tight text-cream md:text-7xl lg:text-8xl">
                            {str(t('product.hero.title'))}
                        </h1>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-terra">
                            {str(t('product.hero.subtitle'))}
                        </p>
                        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-cream/80 md:text-lg">
                            {str(t('product.hero.body'))}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-glow-terra"
                            >
                                {str(t('ui.cta.sample'))}
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="#collection"
                                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:border-cream/60"
                            >
                                {str(t('ui.cta.sample'))}
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Collection Showcase */}
            <section id="collection" className="relative bg-bone py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">

                    {/* Wide single-product showcase (first / only product) */}
                    {showcase && (
                        <Reveal>
                            <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-earth md:flex">
                                {/* Image — 55% */}
                                <div className="group relative shrink-0 overflow-hidden md:w-[55%]">
                                    <img
                                        src={showcase.images?.hero ?? '/images/real/product.jpeg'}
                                        alt={showcase.name}
                                        loading="lazy"
                                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <span className="absolute bottom-4 right-4 rounded-full border border-cream/30 bg-black/50 px-3.5 py-1 text-xs font-semibold text-cream backdrop-blur-xs">
                                        Grade 1 Specialty
                                    </span>
                                </div>

                                {/* Content — 45% */}
                                <Reveal delay={100} className="flex flex-col justify-center px-8 py-10 md:w-[45%] md:px-12 md:py-14">
                                    <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                                        {showcase.name}
                                    </h2>
                                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-terra">
                                        {showcase.subtitle}
                                    </p>

                                    {/* All specs — 2-col dl grid */}
                                    {showcase.specs.length > 0 && (
                                        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border/60 pt-8">
                                            {showcase.specs.map((s) => (
                                                <div key={s.label} className="border-l-2 border-terra/40 pl-3">
                                                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee">
                                                        {s.label}
                                                    </dt>
                                                    <dd className="mt-0.5 font-display text-sm font-bold leading-snug text-ink">
                                                        {s.value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}

                                    {/* Cupping notes as inline chips */}
                                    {showcase.cupping?.traits && showcase.cupping.traits.length > 0 && (
                                        <div className="mt-6">
                                            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee">
                                                {showcase.cupping.notes ?? str(t('product.collection.cuppingNotes'))}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
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
                                        </div>
                                    )}

                                    <div className="mt-10 flex flex-wrap items-center gap-4">
                                        <Link
                                            href={`/${locale}/product/${showcase.id}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-glow-terra"
                                        >
                                            {str(t('product.collection.viewDetails'))}
                                            <ArrowRight className="size-4" />
                                        </Link>
                                        <Link
                                            href={`/${locale}/contact`}
                                            className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-terra hover:text-terra"
                                        >
                                            {str(t('ui.cta.sample'))}
                                        </Link>
                                    </div>
                                </Reveal>
                            </div>
                        </Reveal>
                    )}

                    {/* Subsequent products — compact 2-col horizontal cards */}
                    {rest.length > 0 && (
                        <div className="mt-8 space-y-6">
                            {rest.map((p) => (
                                <Reveal key={p.id ?? p.name}>
                                    <div className="overflow-hidden rounded-sm border border-border/80 bg-card shadow-earth sm:flex">
                                        {/* Image — 40% */}
                                        <div className="group relative shrink-0 overflow-hidden sm:w-[40%]">
                                            <img
                                                src={p.images?.hero ?? '/images/real/product.jpeg'}
                                                alt={p.name}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content — 60% */}
                                        <div className="flex flex-col justify-center px-6 py-8 sm:w-[60%] sm:px-8">
                                            <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                                                {p.name}
                                            </h2>
                                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                                                {p.subtitle}
                                            </p>

                                            {/* Key specs only */}
                                            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-5 sm:grid-cols-3">
                                                {p.specs.slice(0, 6).map((s) => (
                                                    <div key={s.label} className="border-l-2 border-terra/40 pl-2.5">
                                                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee">
                                                            {s.label}
                                                        </dt>
                                                        <dd className="mt-0.5 font-display text-sm font-bold leading-snug text-ink">
                                                            {s.value}
                                                        </dd>
                                                    </div>
                                                ))}
                                            </dl>

                                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                                <Link
                                                    href={`/${locale}/product/${p.id}`}
                                                    className="inline-flex items-center gap-2 rounded-full bg-terra px-5 py-2 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-glow-terra"
                                                >
                                                    {str(t('product.collection.viewDetails'))}
                                                    <ArrowRight className="size-4" />
                                                </Link>
                                                <Link
                                                    href={`/${locale}/contact`}
                                                    className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-card px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-terra hover:text-terra"
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
