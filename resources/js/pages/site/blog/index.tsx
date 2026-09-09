import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, BookOpen, Calendar } from 'lucide-react';

import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Seo } from '@/components/site/seo';
import { str, useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

type Post = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    cover_image: string | null;
    featured: boolean;
    published_at: string;
    category: { slug: string; name: string } | null;
};

type Category = {
    slug: string;
    name: string;
    count: number;
};

type BlogIndexProps = {
    posts: Post[];
    categories: Category[];
    activeCategory: string | null;
};

export default function BlogIndex({
    posts,
    categories,
    activeCategory,
}: BlogIndexProps) {
    const { t, locale } = useTranslations();

    const featured = posts.find((p) => p.featured) ?? posts[0];
    const rest = posts.filter((p) => p.id !== featured?.id);

    return (
        <>
            <Seo
                title={str(t('blog.title'))}
                description={str(t('blog.subtitle'))}
                path={`/${locale}/blog`}
                image="/images/blog-2.jpg"
            />

            <PageHero
                image="/images/blog-2.jpg"
                eyebrow={str(t('blog.eyebrow'))}
                title={str(t('blog.title'))}
                subtitle={str(t('blog.subtitle'))}
            />

            <section className="relative bg-bone py-20 md:py-28">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    {/* Category Filter Pills */}
                    {categories.length > 0 && (
                        <div className="mb-14 flex flex-wrap gap-2.5">
                            <Link
                                href={`/${locale}/blog`}
                                className={cn(
                                    'rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200',
                                    !activeCategory
                                        ? 'shadow-glow-terra bg-terra text-cream'
                                        : 'border border-border/80 bg-card text-ink hover:border-terra hover:text-terra',
                                )}
                            >
                                {locale === 'en'
                                    ? 'All Articles'
                                    : 'Semua Artikel'}
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/${locale}/blog?category=${category.slug}`}
                                    className={cn(
                                        'rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200',
                                        activeCategory === category.slug
                                            ? 'shadow-glow-terra bg-terra text-cream'
                                            : 'border border-border/80 bg-card text-ink hover:border-terra hover:text-terra',
                                    )}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {posts.length === 0 ? (
                        <div className="card-luxury py-16 text-center text-coffee">
                            <BookOpen className="mx-auto mb-2 size-8 text-terra" />
                            <p>{str(t('blog.empty'))}</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Article Card */}
                            {featured && (
                                <Reveal>
                                    <Link
                                        href={`/${locale}/blog/${featured.slug}`}
                                        className="card-luxury group grid gap-8 overflow-hidden p-6 md:grid-cols-12 md:items-center md:gap-12 md:p-10"
                                    >
                                        <div className="shadow-earth overflow-hidden rounded-sm border border-border/80 bg-ink md:col-span-6">
                                            <img
                                                src={
                                                    featured.cover_image ??
                                                    '/images/blog-1.jpg'
                                                }
                                                alt={featured.title}
                                                loading="lazy"
                                                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="md:col-span-6">
                                            <div className="flex items-center gap-3 text-xs">
                                                {featured.category && (
                                                    <span className="badge-pill border-terra/30 bg-terra/10 text-terra">
                                                        {featured.category.name}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-coffee">
                                                    <Calendar className="size-3 text-terra" />
                                                    {featured.published_at}
                                                </span>
                                            </div>
                                            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-ink transition-colors group-hover:text-terra md:text-4xl">
                                                {featured.title}
                                            </h2>
                                            <p className="mt-4 max-w-xl text-base leading-relaxed text-coffee">
                                                {featured.excerpt}
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-terra">
                                                <span>
                                                    {str(t('ui.cta.readMore'))}
                                                </span>
                                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            )}

                            {/* Remaining Articles Grid */}
                            {rest.length > 0 && (
                                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {rest.map((post, i) => (
                                        <Reveal
                                            key={post.id}
                                            delay={(i % 3) * 80}
                                        >
                                            <Link
                                                href={`/${locale}/blog/${post.slug}`}
                                                className="card-luxury group flex h-full flex-col overflow-hidden p-0"
                                            >
                                                <div className="overflow-hidden bg-ink">
                                                    <img
                                                        src={
                                                            post.cover_image ??
                                                            '/images/blog-2.jpg'
                                                        }
                                                        alt={post.title}
                                                        loading="lazy"
                                                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col p-6">
                                                    <div className="flex items-center gap-3 text-xs">
                                                        {post.category && (
                                                            <span className="badge-origin">
                                                                {
                                                                    post
                                                                        .category
                                                                        .name
                                                                }
                                                            </span>
                                                        )}
                                                        <span className="text-coffee">
                                                            {post.published_at}
                                                        </span>
                                                    </div>
                                                    <h3 className="mt-3 font-display text-xl leading-snug font-bold text-ink transition-colors group-hover:text-terra">
                                                        {post.title}
                                                    </h3>
                                                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-coffee">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4">
                                                        <span className="text-xs font-semibold tracking-wider text-coffee uppercase">
                                                            Read Article
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-terra">
                                                            {str(
                                                                t(
                                                                    'ui.cta.readMore',
                                                                ),
                                                            )}
                                                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Reveal>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Full-bleed source section */}
            <section className="relative bg-cream">
                <Reveal>
                    <div className="relative overflow-hidden">
                        <img
                            src="/images/real/Geopark_Caldera_Toba.jpg"
                            alt="Volcanic highlands of Lake Toba caldera"
                            loading="lazy"
                            className="aspect-[21/8] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
                        <div className="absolute bottom-0 left-0 px-5 py-8 md:px-12 md:py-10">
                            <p className="mb-1 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('blog.source.eyebrow'))}
                            </p>
                            <h2 className="font-display text-3xl font-bold text-cream md:text-5xl">
                                {str(t('blog.source.title'))}
                            </h2>
                        </div>
                    </div>
                </Reveal>
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="flex max-w-2xl flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-10">
                            <p className="text-sm leading-relaxed text-coffee">
                                {str(t('blog.source.body'))}
                            </p>
                            <Link
                                href={`/${locale}/about`}
                                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-terra transition-colors hover:text-ink"
                            >
                                {str(t('blog.source.cta'))}
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
