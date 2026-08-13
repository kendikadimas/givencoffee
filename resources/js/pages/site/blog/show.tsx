import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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
        image: typeof window !== 'undefined' ? `${window.location.origin}${cover}` : undefined,
        datePublished: post.published_at,
        author: { '@type': 'Organization', name: seoSettings.company_name ?? 'Given Coffee' },
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

            {/* Cover hero */}
            <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-ink pt-32 pb-16">
                <img
                    src={post.cover_image ?? '/images/blog-1.jpg'}
                    alt={post.title}
                    fetchPriority="high"
                    className="absolute inset-0 size-full object-cover opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />

                <div className="relative mx-auto w-full max-w-[900px] px-5 md:px-8">
                    <Link
                        href={`/${locale}/blog`}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-cream/70 transition-colors hover:text-cream"
                    >
                        <ArrowLeft className="size-4" />
                        {str(t('blog.back'))}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-cream/60">
                        {post.category && (
                            <span className="font-semibold uppercase tracking-[0.16em] text-terra">
                                {post.category.name}
                            </span>
                        )}
                        <span>{post.published_at}</span>
                    </div>
                    <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-5xl">
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Body */}
            <article className="mx-auto max-w-[760px] px-5 py-16 md:py-24">
                <p className="text-lg font-medium leading-relaxed text-ink">{post.excerpt}</p>
                <div className="mt-8 space-y-6">
                    {blocks.map((block, i) =>
                        block.type === 'h2' ? (
                            <Reveal key={i} delay={0}>
                                <h2 className="pt-4 font-display text-2xl text-ink md:text-3xl">
                                    {block.text}
                                </h2>
                            </Reveal>
                        ) : (
                            <Reveal key={i} delay={0}>
                                <p className="leading-relaxed text-coffee">{block.text}</p>
                            </Reveal>
                        ),
                    )}
                </div>
            </article>

            {/* Recent */}
            {recent.length > 0 && (
                <section className="border-t border-border bg-white py-20">
                    <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                        <h2 className="font-display text-2xl text-ink md:text-3xl">
                            {str(t('blog.subtitle'))}
                        </h2>
                        <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
                            {recent.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/${locale}/blog/${item.slug}`}
                                    className="group bg-white"
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={item.cover_image ?? '/images/blog-2.jpg'}
                                            alt={item.title}
                                            loading="lazy"
                                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-coffee">{item.published_at}</p>
                                        <h3 className="mt-2 font-display text-lg leading-snug text-ink transition-colors group-hover:text-terra-deep">
                                            {item.title}
                                        </h3>
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
