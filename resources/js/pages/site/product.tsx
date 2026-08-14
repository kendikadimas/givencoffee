import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

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
    cupping: { notes: string; traits: string[] };
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

            {/* Hero — general collection */}
            <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink pt-32 pb-16">
                <img
                    src="/images/real/closeup-greenbeans.jpeg"
                    alt="Indonesian highland green beans close-up"
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

                <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="eyebrow text-terra">{str(t('product.hero.eyebrow'))}</p>
                        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-cream md:text-8xl">
                            {str(t('product.hero.title'))}
                        </h1>
                        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-terra">
                            {str(t('product.hero.subtitle'))}
                        </p>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl">
                            {str(t('product.hero.body'))}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Collection — one alternating section per product */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
                    <SectionHeading
                        eyebrow={str(t('product.collection.eyebrow'))}
                        title={str(t('product.collection.title'))}
                        body={str(t('product.collection.body'))}
                    />
                </div>

                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <div className="space-y-20 pb-20 md:space-y-24 md:pb-24">
                            {products.map((p, i) => {
                                const flipped = i % 2 === 1;
                                const pCore = p.specs.filter(isCore);

                                return (
                                    <div
                                        key={p.id ?? p.name}
                                        className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                                    >
                                        <Reveal className={flipped ? 'md:order-2' : ''}>
                                            <div className="relative overflow-hidden rounded-sm">
                                                <img
                                                    src={p.images?.hero ?? '/images/real/product.jpeg'}
                                                    alt={p.name}
                                                    loading="lazy"
                                                    className="aspect-[4/3] w-full object-cover"
                                                />
                                                <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-white font-display text-sm text-ink shadow-md">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                        </Reveal>

                                        <Reveal delay={100} className={flipped ? 'md:order-1' : ''}>
                                            <h2 className="font-display text-2xl leading-tight text-ink md:text-3xl">
                                                {p.name}
                                            </h2>
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                                                {p.subtitle}
                                            </p>

                                            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                                                {pCore.slice(0, 4).map((s) => (
                                                    <div key={s.label}>
                                                        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-coffee">
                                                            {s.label}
                                                        </dt>
                                                        <dd className="mt-0.5 font-display text-sm leading-snug text-ink">
                                                            {s.value}
                                                        </dd>
                                                    </div>
                                                ))}
                                            </dl>

                                            <div className="mt-6">
                                                <Link
                                                    href={`/${locale}/product/${p.id}`}
                                                    className="inline-flex items-center gap-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep"
                                                >
                                                    {str(t('product.collection.viewDetails'))}
                                                    <ArrowRight className="size-4" />
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
