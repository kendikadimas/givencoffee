import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowUpRight, Calendar } from 'lucide-react';

import { Reveal } from '@/components/site/reveal';
import { Seo, useSeoSettings } from '@/components/site/seo';
import { arr, str, useTranslations } from '@/hooks/use-translations';

type Block = { type: string; text: string };
type Post = {
    slug: string;
    title: string;
    excerpt: string;
    content: Block[];
    cover_image: string | null;
    published_at: string;
    category: { slug: string; name: string } | null;
};
type Recent = Post;

type BlogShowProps = {
    post: Post;
    recent: Recent[];
};

export default function BlogShow({ post, recent }: BlogShowProps) {
    const { t, locale } = useTranslations();
    const seoSettings = useSeoSettings();
    const blocks = arr<Block>(post.content);
    const cover = post.cover_image ?? '/images/blog-1.jpg';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image:
            typeof window !== 'undefined'
                ? `${window.location.origin}${cover}`
                : undefined,
        datePublished: post.published_at,
        author: {
            '@type': 'Organization',
            name: seoSettings.company_name ?? 'Given Coffee',
        },
    };

    return (
        <>
            <Seo
                title={post.title}
                description={post.excerpt}
                path={`/${locale}/blog/${post.slug}`}
                type="article"
                image={cover}
                jsonLd={jsonLd}
            />

            {/* Cover Hero */}
            <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pt-36 pb-20 md:min-h-[66vh] md:pb-24">
                <img
                    src={post.cover_image ?? '/images/blog-1.jpg'}
                    alt={post.title}
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
                <div className="pointer-events-none absolute right-10 -bottom-10 size-96 rounded-full bg-terra/20 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[1000px] px-5 md:px-8">
                    <Link
                        href={`/${locale}/blog`}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cream uppercase backdrop-blur-xs transition-colors hover:border-terra hover:bg-terra"
                    >
                        <ArrowLeft className="size-3.5" />
                        {str(t('blog.back'))}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        {post.category && (
                            <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                                {post.category.name}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5 text-cream/70">
                            <Calendar className="size-3.5 text-terra" />
                            {post.published_at}
                        </span>
                    </div>

                    <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Article Body */}
            <article className="relative bg-bone py-16 md:py-24">
                <div className="mx-auto max-w-[840px] px-5 md:px-8">
                    <div className="card-luxury p-8 md:p-14">
                        <p className="border-b border-border/80 pb-8 text-xl leading-relaxed font-medium text-ink">
                            {post.excerpt}
                        </p>

                        <div className="prose-article mt-8">
                            {blocks.map((block, i) => {
                                if (
                                    block.type === 'h2' ||
                                    block.type === 'h3'
                                ) {
                                    return (
                                        <Reveal key={i} delay={0}>
                                            <h2
                                                dangerouslySetInnerHTML={{
                                                    __html: block.text,
                                                }}
                                            />
                                        </Reveal>
                                    );
                                }

                                if (
                                    block.type === 'ul' ||
                                    block.type === 'ol' ||
                                    block.type === 'html'
                                ) {
                                    return (
                                        <Reveal key={i} delay={0}>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: block.text,
                                                }}
                                            />
                                        </Reveal>
                                    );
                                }

                                return (
                                    <Reveal key={i} delay={0}>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: block.text,
                                            }}
                                        />
                                    </Reveal>
                                );
                            })}
                        </div>

                        {/* Article Footer Strip */}
                        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-coffee uppercase">
                                <span className="badge-origin">
                                    Given Coffee Editorial
                                </span>
                            </div>
                            <Link
                                href={`/${locale}/blog`}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-terra transition-colors hover:text-terra-deep"
                            >
                                <ArrowLeft className="size-4" />
                                {str(t('blog.back'))}
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* Recent Articles */}
            {recent.length > 0 && (
                <section className="relative bg-cream py-20 md:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('blog.subtitle'))}
                            </h2>
                            <Link
                                href={`/${locale}/blog`}
                                className="text-sm font-semibold text-terra hover:underline"
                            >
                                View All Articles →
                            </Link>
                        </div>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {recent.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/${locale}/blog/${item.slug}`}
                                    className="card-luxury group flex h-full flex-col overflow-hidden p-0"
                                >
                                    <div className="overflow-hidden bg-ink">
                                        <img
                                            src={
                                                item.cover_image ??
                                                '/images/blog-2.jpg'
                                            }
                                            alt={item.title}
                                            loading="lazy"
                                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <p className="text-xs text-coffee">
                                            {item.published_at}
                                        </p>
                                        <h3 className="mt-2 font-display text-xl leading-snug font-bold text-ink transition-colors group-hover:text-terra">
                                            {item.title}
                                        </h3>
                                        <div className="mt-6 mt-auto flex items-center justify-between border-t border-border/80 pt-4">
                                            <span className="text-xs font-semibold tracking-wider text-coffee uppercase">
                                                Read Article
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-terra">
                                                <ArrowUpRight className="size-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
