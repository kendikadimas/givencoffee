import { Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    FileText,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
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
    const settings =
        ((usePage().props.settings ?? {}) as {
            whatsapp_url?: string;
        }) ?? {};

    const heroImage = product.images?.hero ?? '/images/real/product.jpeg';
    const packagingImage =
        product.images?.packaging ?? '/images/real/whitepouch2.jpeg';
    const detailImages = [
        heroImage,
        packagingImage,
        '/images/real/closeup-greenbeans.jpeg',
    ].filter(Boolean);

    const [activeImage, setActiveImage] = useState<string>(heroImage);

    // Filter out any price specifications
    const cleanSpecs = product.specs.filter(
        (s) => !/price|harga/i.test(s.label),
    );
    const keySpecs = cleanSpecs.filter((s) =>
        /type|jenis|weight|berat|form|bentuk|process|proses|altitude|ketinggian/i.test(
            s.label,
        ),
    );
    const traits = product.cupping?.traits ?? [
        'Traceable',
        'Consistent',
        'Export-ready',
        'Grade 1 Specialty',
    ];
    const cuppingNotes = product.cupping?.notes ?? str(t('product.notes.body'));

    const waText = encodeURIComponent(`Talk to Our Export Team`);
    const waUrl = `${settings.whatsapp_url ?? 'https://wa.me/6281234567890'}?text=${waText}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.subtitle,
        image:
            typeof window !== 'undefined'
                ? `${window.location.origin}${heroImage}`
                : undefined,
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

            {/* Hero — split panel: left dark text, right full-bleed image */}
            <section className="relative flex min-h-[80vh] overflow-hidden bg-ink lg:min-h-[90vh]">
                {/* Left panel */}
                <div className="relative z-10 flex w-full flex-col justify-end px-8 pt-40 pb-20 md:px-14 md:pb-28 lg:w-[55%] lg:px-16 lg:pr-20">
                    <div className="absolute inset-0 lg:hidden">
                        <img
                            src="/images/real/closeup-greenbeans.jpeg"
                            alt={product.name}
                            fetchPriority="high"
                            className="size-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
                    </div>
                    <Reveal className="relative">
                        <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(
                                t('product.hero.eyebrow'),
                                'Given Coffee Specialty',
                            )}
                        </p>
                        <h1 className="max-w-2xl font-display text-4xl leading-[1.04] tracking-tight text-cream md:text-6xl lg:text-7xl">
                            {product.name}
                        </h1>
                        <p className="mt-5 max-w-lg text-base leading-relaxed font-light text-cream/75 md:text-lg">
                            {product.subtitle}
                        </p>
                        {keySpecs.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {keySpecs.slice(0, 3).map((s) => (
                                    <span
                                        key={s.label}
                                        className="rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-semibold text-cream/80"
                                    >
                                        {s.label}: {s.value}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Cta
                                href={waUrl}
                                variant="terra"
                                className="px-7 py-3 text-base"
                            >
                                {str(t('ui.cta.inquiry'))}
                            </Cta>
                            <Cta
                                href={`/${locale}/contact`}
                                variant="outline-light"
                                className="px-7 py-3 text-base"
                            >
                                {str(t('ui.cta.sample'))}
                            </Cta>
                        </div>
                    </Reveal>
                </div>

                {/* Right panel — full-bleed image, desktop only */}
                <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block">
                    <img
                        src="/images/real/beansonacontainer3.jpeg"
                        alt={product.name}
                        fetchPriority="high"
                        className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
                </div>
            </section>

            {/* Main Product Showcase Section */}
            <section className="relative bg-bone py-16 md:py-24">
                <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
                    {/* Interactive Gallery Showcase (5 Cols) */}
                    <Reveal className="md:col-span-6 lg:col-span-5">
                        <div className="sticky top-28 space-y-4">
                            <div className="group shadow-earth-lg relative overflow-hidden rounded-sm border border-border/80 bg-ink">
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 rounded-full border border-cream/30 bg-ink/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-cream uppercase backdrop-blur-md">
                                    Specialty Green Beans • Pure Origin
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
                                                'aspect-[4/3] overflow-hidden rounded-sm border bg-ink transition-all',
                                                activeImage === img
                                                    ? 'border-terra shadow-sm ring-2 ring-terra/40'
                                                    : 'border-border/80 opacity-70 hover:opacity-100',
                                            )}
                                        >
                                            <img
                                                src={img}
                                                alt={`View ${idx + 1}`}
                                                className="size-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Product Story & Key Specs Info (7 Cols) */}
                    <Reveal delay={120} className="md:col-span-6 lg:col-span-7">
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                {/* Specialty Guarantee Badge */}
                                <div className="shadow-earth flex flex-wrap items-center justify-between gap-3 rounded-sm border border-terra/30 bg-cream p-5">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="size-5 text-terra" />
                                        <div>
                                            <span className="text-xs font-semibold tracking-wider text-ink uppercase">
                                                {str(
                                                    t('product.origin'),
                                                    'Dolok Sanggul, North Sumatra',
                                                )}
                                            </span>
                                            <p className="text-[11px] text-coffee">
                                                1,500 – 1,700 MASL Elevation
                                            </p>
                                        </div>
                                    </div>
                                    <span className="badge-origin">
                                        <ShieldCheck className="size-4 text-forest" />
                                        Grade 1 Export Ready
                                    </span>
                                </div>

                                {/* Story Paragraphs */}
                                <div className="mt-8 space-y-4 text-base leading-relaxed text-coffee">
                                    {(product.story?.length
                                        ? product.story
                                        : [str(t('product.story.body'))]
                                    ).map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>

                                {/* Key Specs 4-Box Grid */}
                                {keySpecs.length > 0 && (
                                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {keySpecs.slice(0, 4).map((spec) => (
                                            <div
                                                key={spec.label}
                                                className="rounded-sm border border-border/80 bg-card p-4 shadow-xs"
                                            >
                                                <dt className="text-[10px] font-semibold tracking-[0.18em] text-coffee uppercase">
                                                    {spec.label}
                                                </dt>
                                                <dd className="mt-1 font-display text-sm font-bold text-ink">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Action CTAs */}
                            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border/80 pt-8">
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:shadow-glow-terra inline-flex h-12 items-center gap-2.5 rounded-full bg-terra px-7 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-terra-deep"
                                >
                                    <MessageCircle className="size-4" />
                                    {str(
                                        t('ui.cta.orderWhatsapp'),
                                        'Inquire via WhatsApp',
                                    )}
                                </a>

                                <Cta
                                    href={`/${locale}/contact`}
                                    variant="dark"
                                    className="h-12"
                                >
                                    {str(t('ui.cta.inquire'), 'Request Sample')}
                                </Cta>

                                {product.spec_pdf && (
                                    <a
                                        href={product.spec_pdf}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-12 items-center gap-2 rounded-full border border-border/90 bg-card px-5 text-xs font-semibold tracking-wider text-ink uppercase transition-colors hover:border-terra hover:text-terra"
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
            <section className="relative bg-cream py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="card-luxury p-8 md:p-12">
                            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                                <SectionHeading
                                    eyebrow={str(
                                        t('product.notes.eyebrow'),
                                        'Cupping Profile',
                                    )}
                                    title={str(
                                        t('product.notes.title'),
                                        'Taste & Flavor Profile',
                                    )}
                                    body={cuppingNotes}
                                />
                                <div className="flex flex-col items-center justify-center rounded-sm border border-terra/30 bg-terra/5 px-10 py-6 text-center">
                                    <p className="text-[10px] font-semibold tracking-[0.24em] text-terra uppercase">
                                        Cupping Score
                                    </p>
                                    <p className="font-display text-5xl font-bold text-ink">
                                        85.5+
                                    </p>
                                    <p className="mt-1 text-xs text-coffee">
                                        SCA Specialty Grade
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {traits.map((trait) => (
                                    <span
                                        key={trait}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-terra/10 px-4 py-2 text-xs font-semibold tracking-wider text-terra uppercase shadow-xs"
                                    >
                                        <Sparkles className="size-3.5 text-terra" />
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Technical Specifications — full data sheet */}
            <section className="relative bg-bone py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionHeading
                        eyebrow={str(
                            t('product.specs.eyebrow'),
                            'Technical Matrix',
                        )}
                        title={str(
                            t('product.specs.title'),
                            'Export Specifications',
                        )}
                    />

                    <Reveal>
                        <div className="mt-10 overflow-hidden border border-border/60">
                            <div className="grid grid-cols-[1fr_2fr] border-b border-border/60 bg-ink px-5 py-3">
                                <p className="text-[10px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    Attribute
                                </p>
                                <p className="text-[10px] font-semibold tracking-[0.28em] text-terra uppercase">
                                    Specification Details
                                </p>
                            </div>
                            <dl>
                                {cleanSpecs.map((spec, i) => (
                                    <div
                                        key={spec.label}
                                        className={cn(
                                            'grid grid-cols-[1fr_2fr] px-5 py-4',
                                            i % 2 === 0
                                                ? 'bg-cream'
                                                : 'bg-bone',
                                            i !== cleanSpecs.length - 1 &&
                                                'border-b border-border/40',
                                        )}
                                    >
                                        <dt className="text-[11px] font-semibold tracking-[0.18em] text-coffee/60 uppercase">
                                            {spec.label}
                                        </dt>
                                        <dd className="text-sm text-ink">
                                            {spec.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Reveal>
                    <p className="mt-4 text-sm text-coffee">
                        {str(t('product.specs.note'))}
                    </p>
                </div>
            </section>

            {/* Packaging Options */}
            {product.packaging && product.packaging.length > 0 && (
                <section className="relative overflow-hidden bg-forest-deep py-20 text-cream md:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            eyebrow={str(
                                t('product.packaging.eyebrow'),
                                'Packaging',
                            )}
                            title={str(
                                t('product.packaging.title'),
                                'Available Tiers & Packaging',
                            )}
                            light
                        />

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {product.packaging.map((item, i) => (
                                <Reveal key={item.title} delay={i * 90}>
                                    <div className="flex h-full flex-col justify-between overflow-hidden rounded-sm border border-cream/15 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cream/30 hover:bg-white/10">
                                        <div>
                                            <span className="badge-pill border-terra/40 bg-terra text-cream">
                                                {item.tag}
                                            </span>
                                            <h3 className="mt-5 font-display text-2xl font-bold text-cream">
                                                {item.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-cream/70">
                                                {item.text}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-terra">
                                            <Check className="size-4" />
                                            <span>Export Standard</span>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Products Section */}
            {products.length > 1 && (
                <section className="relative bg-cream py-20 md:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <SectionHeading
                            eyebrow={str(
                                t('product.collection.eyebrow'),
                                'Explore More',
                            )}
                            title={str(
                                t('product.collection.otherProducts'),
                                'Other Offerings from Given Coffee',
                            )}
                        />

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {products
                                .filter((p) => p.id !== product.id)
                                .map((p, i) => (
                                    <Reveal
                                        key={p.id ?? p.name}
                                        delay={i * 100}
                                    >
                                        <Link
                                            href={`/${locale}/product/${p.id}`}
                                            className="card-luxury group flex h-full flex-col overflow-hidden p-0"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                                                <img
                                                    src={
                                                        p.images?.hero ??
                                                        '/images/real/product.jpeg'
                                                    }
                                                    alt={p.name}
                                                    loading="lazy"
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <span className="badge-origin mb-2 self-start">
                                                    {p.subtitle}
                                                </span>
                                                <h3 className="mt-1 font-display text-xl font-bold text-ink transition-colors group-hover:text-terra">
                                                    {p.name}
                                                </h3>
                                                <div className="mt-6 mt-auto flex items-center justify-between border-t border-border/80 pt-6">
                                                    <span className="text-xs font-semibold tracking-wider text-coffee uppercase">
                                                        Green Bean Export
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-terra">
                                                        {str(
                                                            t(
                                                                'ui.cta.readMore',
                                                            ),
                                                            'View Details',
                                                        )}
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
