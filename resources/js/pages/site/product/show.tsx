import { Link } from '@inertiajs/react';
import { ArrowLeft, FileText, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Cta } from '@/components/site/cta';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { Seo } from '@/components/site/seo';
import { str, useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

type Spec = { label: string; value: string };
type Packaging = { title: string; text: string; tag: string };

type Product = {
    id: number;
    name: string;
    subtitle: string;
    story: string[];
    specs: Spec[];
    cupping?: { notes?: string; traits?: string[] };
    packaging: Packaging[];
    images: { hero?: string; packaging?: string };
    spec_pdf?: string | null;
};

type ProductProps = {
    product: Product;
    products: Product[];
};

export default function ProductShow({ product, products = [] }: ProductProps) {
    const { t, locale } = useTranslations();

    const heroImage = product.images?.hero ?? '/images/real/product.jpeg';
    const packagingImage = product.images?.packaging ?? '/images/real/whitepouch2.jpeg';
    const detailImages = [heroImage, packagingImage, '/images/real/closeup-greenbeans.jpeg'].filter(Boolean);

    const [activeImage, setActiveImage] = useState<string>(heroImage);

    // Filter out any price specifications
    const cleanSpecs = product.specs.filter((s) => !/price|harga/i.test(s.label));
    const keySpecs = cleanSpecs.filter((s) => /type|jenis|weight|berat|form|bentuk|process|proses|altitude|ketinggian/i.test(s.label));
    const traits = product.cupping?.traits ?? ['Tropical Fruit', 'Subtle Chocolate', 'Herbal Aroma', 'Low Acidity', 'Natural Sweetness'];
    const cuppingNotes = product.cupping?.notes ?? str(t('product.notes.body'));

    const waText = encodeURIComponent(`Halo Given Coffee, saya ingin bertanya dan memesan produk ${product.name}.`);
    const waUrl = `https://wa.me/6281234567890?text=${waText}`;

    // Short variant names for pill tabs
    const getShortVariantName = (p: Product) => {
        if (/green/i.test(p.name)) {
            return '02 Green Bean';
        }

        if (/roast/i.test(p.name)) {
            return '03 Roasted 500g';
        }

        return '01 Ground 250g';
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.subtitle,
        image: typeof window !== 'undefined' ? `${window.location.origin}${heroImage}` : undefined,
        brand: { '@type': 'Brand', name: 'Given Coffee' },
    };

    return (
        <>
            <Seo
                title={product.name}
                description={product.subtitle}
                path={`/${locale}/product/${product.id}`}
                type="product"
                image={heroImage}
                jsonLd={jsonLd}
            />

            {/* Dark Premium Hero Section Header */}
            <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-cream">
                <img
                    src={heroImage}
                    alt={product.name}
                    className="absolute inset-0 size-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    {/* Top Bar: Back Link & Short Variant Selector Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 pb-6">
                        <Link
                            href={`/${locale}/product`}
                            className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:border-terra hover:bg-terra hover:text-cream"
                        >
                            <ArrowLeft className="size-3.5" />
                            {str(t('product.collection.eyebrow'), 'Catalog Overview')}
                        </Link>

                        {products.length > 1 && (
                            <div className="flex flex-wrap items-center gap-2">
                                {products.map((p) => (
                                    <Link
                                        key={p.id ?? p.name}
                                        href={`/${locale}/product/${p.id}`}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border',
                                            p.id === product.id
                                                ? 'border-terra bg-terra text-cream shadow-md'
                                                : 'border-cream/20 bg-white/10 text-cream/70 hover:border-cream/40 hover:text-cream'
                                        )}
                                    >
                                        {getShortVariantName(p)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hero Title & Subtitle */}
                    <div className="mt-8 max-w-4xl">
                        <p className="eyebrow text-terra">{str(t('product.hero.eyebrow'), 'Given Coffee Specialty')}</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-cream md:text-6xl">
                            {product.name}
                        </h1>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-terra">
                            {product.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Product Showcase Section */}
            <section className="bg-white py-12 md:py-20">
                <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
                    {/* Interactive Gallery Showcase (5 Cols) */}
                    <Reveal className="md:col-span-6 lg:col-span-5">
                        <div className="sticky top-28 space-y-4">
                            <div className="group relative overflow-hidden rounded-sm border border-border bg-ink shadow-xl">
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="aspect-[4/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute left-4 top-4 rounded-full bg-ink/75 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-cream backdrop-blur-md">
                                    Specialty Grade • Semi-Washed
                                </div>
                            </div>

                            {detailImages.length > 1 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {detailImages.map((img, idx) => (
                                        <button
                                            key={img}
                                            type="button"
                                            onClick={() => setActiveImage(img)}
                                            className={cn(
                                                'overflow-hidden rounded-sm border transition-all aspect-[4/3] bg-ink',
                                                activeImage === img
                                                    ? 'border-terra ring-2 ring-terra/30'
                                                    : 'border-border opacity-70 hover:opacity-100'
                                            )}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="size-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Product Story & Key Specs Info (7 Cols) */}
                    <Reveal delay={120} className="md:col-span-6 lg:col-span-7">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                {/* Specialty Guarantee Badge */}
                                <div className="flex items-center justify-between rounded-sm border border-terra/30 bg-white px-6 py-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="size-4 text-terra" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                                            {str(t('product.origin'), 'Doloksanggul, Sumatra, Indonesia')}
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-olive/15 px-3.5 py-1.5 text-xs font-semibold text-olive">
                                        <ShieldCheck className="size-4" />
                                        Authentic Lintong Specialty
                                    </span>
                                </div>

                                {/* Story Paragraphs */}
                                <div className="mt-8 space-y-4 text-base leading-relaxed text-coffee">
                                    {(product.story?.length ? product.story : [str(t('product.story.body'))]).map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>

                                {/* Key Specs 4-Box Grid */}
                                {keySpecs.length > 0 && (
                                    <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
                                        {keySpecs.slice(0, 4).map((spec) => (
                                            <div key={spec.label} className="bg-white p-4">
                                                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coffee">
                                                    {spec.label}
                                                </dt>
                                                <dd className="mt-1 font-display text-sm font-semibold text-ink">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Action CTAs */}
                            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-4">
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-terra px-7 text-sm font-semibold text-cream shadow-md transition-all hover:bg-terra-deep hover:shadow-lg"
                                >
                                    <MessageCircle className="size-4" />
                                    {str(t('ui.cta.orderWhatsapp'), 'Inquire via WhatsApp')}
                                </a>

                                <Cta href={`/${locale}/contact`} variant="outline">
                                    {str(t('ui.cta.inquire'), 'Request Sample')}
                                </Cta>

                                {product.spec_pdf && (
                                    <a
                                        href={product.spec_pdf}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-xs font-semibold uppercase tracking-wider text-coffee transition-colors hover:border-ink hover:text-ink"
                                    >
                                        <FileText className="size-4 text-terra" />
                                        PDF Spec Sheet
                                    </a>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Cupping Profile & Taste Traits Section */}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <SectionHeading
                            eyebrow={str(t('product.notes.eyebrow'), 'Cupping Profile')}
                            title={str(t('product.notes.title'), 'Taste & Flavor Traits')}
                            body={cuppingNotes}
                        />

                        <div className="mt-8 flex flex-wrap gap-2.5">
                            {traits.map((trait) => (
                                <span
                                    key={trait}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-terra-deep shadow-xs"
                                >
                                    <Sparkles className="size-3 text-terra" />
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Technical Specifications Matrix */}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(t('product.specs.eyebrow'), 'Technical Matrix')}
                        title={str(t('product.specs.title'), 'Specifications')}
                    />

                    <Reveal delay={120}>
                        <dl className="mt-12 overflow-hidden rounded-sm border border-border bg-white shadow-sm">
                            {cleanSpecs.map((spec, i) => (
                                <div
                                    key={spec.label}
                                    className={cn(
                                        'grid grid-cols-1 gap-y-1 px-6 py-4 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-x-8 md:px-10',
                                        i !== cleanSpecs.length - 1 && 'border-b border-border'
                                    )}
                                >
                                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
                                        {spec.label}
                                    </dt>
                                    <dd className="font-display text-base font-semibold text-ink">
                                        {spec.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </section>

            {/* Packaging Options */}
            {product.packaging && product.packaging.length > 0 && (
                <section className="bg-forest-deep py-20 text-cream md:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            eyebrow={str(t('product.packaging.eyebrow'), 'Packaging')}
                            title={str(t('product.packaging.title'), 'Available Tiers & Packaging')}
                            light
                        />

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {product.packaging.map((item, i) => (
                                <Reveal key={item.title} delay={i * 90}>
                                    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-cream/15 bg-forest/40 p-7">
                                        <span className="inline-flex w-fit rounded-full bg-terra px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
                                            {item.tag}
                                        </span>
                                        <h3 className="mt-4 font-display text-xl text-cream">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-cream/70">
                                            {item.text}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Products Section */}
            {products.length > 1 && (
                <section className="bg-white py-20 md:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            eyebrow={str(t('product.collection.eyebrow'), 'Explore More')}
                            title={str(t('product.collection.otherProducts'), 'Other Offerings from Given Coffee')}
                        />

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {products
                                .filter((p) => p.id !== product.id)
                                .map((p, i) => (
                                    <Reveal key={p.id ?? p.name} delay={i * 100}>
                                        <Link
                                            href={`/${locale}/product/${p.id}`}
                                            className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-white transition-all hover:border-terra hover:shadow-md"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                                                <img
                                                    src={p.images?.hero ?? '/images/real/product.jpeg'}
                                                    alt={p.name}
                                                    loading="lazy"
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                                                    {p.subtitle}
                                                </p>
                                                <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                                                    {p.name}
                                                </h3>
                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border mt-6">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-olive">
                                                        Specialty Lintong
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-terra group-hover:text-terra-deep">
                                                        {str(t('ui.cta.readMore'), 'View Details')}
                                                        <ArrowLeft className="size-4 rotate-180" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
