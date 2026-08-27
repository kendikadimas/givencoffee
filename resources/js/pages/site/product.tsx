import { Link } from '@inertiajs/react';
import { ArrowRight, Check, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
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

    const isCore = (s: Spec): boolean => /type|weight|form|process|altitude|origin/i.test(s.label);

    return (
        <>
            <Seo
                title={str(t('product.hero.title'))}
                description={str(t('product.hero.body'))}
                path={`/${locale}/product`}
                image="/images/real/product-close-up.jpeg"
            />

            {/* Hero — Specialty Coffee Catalog */}
            <section className="relative flex min-h-[64vh] items-end overflow-hidden bg-ink pt-36 pb-20 md:min-h-[70vh] md:pb-24">
                <img
                    src="/images/real/closeup-greenbeans.jpeg"
                    alt="Indonesian highland specialty green coffee beans"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
                <div className="pointer-events-none absolute -bottom-10 right-10 size-96 rounded-full bg-terra/20 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                            <Sparkles className="size-3 text-terra" />
                            {str(t('product.hero.eyebrow'))}
                        </span>
                        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.04] tracking-tight text-cream md:text-7xl lg:text-8xl">
                            {str(t('product.hero.title'))}
                        </h1>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-terra">
                            {str(t('product.hero.subtitle'))}
                        </p>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg font-light">
                            {str(t('product.hero.body'))}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Collection Showcase */}
            <section className="relative bg-bone py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('product.collection.eyebrow'))}
                        title={str(t('product.collection.title'))}
                        body={str(t('product.collection.body'))}
                    />

                    <div className="mt-16 space-y-16 md:space-y-20">
                        {products.map((p, i) => {
                            const flipped = i % 2 === 1;
                            const pCore = p.specs.filter(isCore);

                            return (
                                <div
                                    key={p.id ?? p.name}
                                    className="card-luxury grid items-center gap-8 md:grid-cols-12 md:gap-12 p-6 md:p-10"
                                >
                                    <Reveal className={flipped ? 'md:order-2 md:col-span-6' : 'md:col-span-6'}>
                                        <div className="group relative overflow-hidden rounded-sm border border-border/80 bg-ink shadow-earth">
                                            <img
                                                src={p.images?.hero ?? '/images/real/product.jpeg'}
                                                alt={p.name}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full border border-border/80 bg-cream/90 font-display text-sm font-bold text-ink shadow-md backdrop-blur-xs">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="absolute bottom-4 right-4 rounded-full border border-cream/30 bg-black/50 px-3.5 py-1 text-xs font-semibold text-cream backdrop-blur-xs">
                                                Grade 1 Specialty
                                            </span>
                                        </div>
                                    </Reveal>

                                    <Reveal delay={100} className={flipped ? 'md:order-1 md:col-span-6' : 'md:col-span-6'}>
                                        <span className="badge-origin border-terra/30 bg-terra/10 text-terra font-semibold">
                                            {p.subtitle}
                                        </span>
                                        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
                                            {p.name}
                                        </h2>

                                        <dl className="mt-6 grid grid-cols-2 gap-3 rounded-sm border border-border/80 bg-card p-4">
                                            {pCore.slice(0, 4).map((s) => (
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

                                        <div className="mt-8 flex flex-wrap items-center gap-4">
                                            <Link
                                                href={`/${locale}/product/${p.id}`}
                                                className="inline-flex items-center gap-2 rounded-full bg-terra px-6 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep hover:shadow-glow-terra hover:-translate-y-0.5"
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
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
