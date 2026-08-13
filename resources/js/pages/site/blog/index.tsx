import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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

export default function BlogIndex({ posts, categories, activeCategory }: BlogIndexProps) {
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

            <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
                {categories.length > 0 && (
                    <div className="mb-12 flex flex-wrap gap-2">
                        <Link
                            href={`/${locale}/blog`}
                            className={cn(
                                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                                !activeCategory
                                    ? 'border-terra bg-terra text-cream'
                                    : 'border-border bg-white text-ink hover:border-ink',
                            )}
                        >
                            {locale === 'en' ? 'All' : 'Semua'}
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/${locale}/blog?category=${category.slug}`}
                                className={cn(
                                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                                    activeCategory === category.slug
                                        ? 'border-terra bg-terra text-cream'
                                        : 'border-border bg-white text-ink hover:border-ink',
                                )}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}

                {posts.length === 0 ? (
                    <p className="py-16 text-center text-coffee">{str(t('blog.empty'))}</p>
                ) : (
                    <>
                        {featured && (
                            <Reveal>
                                <Link
                                    href={`/${locale}/blog/${featured.slug}`}
                                    className="group grid gap-8 md:grid-cols-2 md:items-center"
                                >
                                    <div className="overflow-hidden rounded-sm">
                                        <img
                                            src={featured.cover_image ?? '/images/blog-1.jpg'}
                                            alt={featured.title}
                                            loading="lazy"
                                            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 text-xs text-coffee">
                                            {featured.category && (
                                                <span className="font-semibold uppercase tracking-[0.16em] text-terra">
                                                    {featured.category.name}
                                                </span>
                                            )}
                                            <span className="text-coffee/70">
                                                {featured.published_at}
                                            </span>
                                        </div>
                                        <h2 className="mt-4 font-display text-3xl leading-tight text-ink transition-colors group-hover:text-terra-deep md:text-4xl">
                                            {featured.title}
                                        </h2>
                                        <p className="mt-4 max-w-xl leading-relaxed text-coffee">
                                            {featured.excerpt}
                                        </p>
                                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terra">
                                            {str(t('ui.cta.readMore'))}
                                            <ArrowRight className="size-4" />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        )}

                        {rest.length > 0 && (
                            <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((post, i) => (
                                    <Reveal key={post.id} delay={(i % 3) * 80} className="bg-white">
                                        <Link
                                            href={`/${locale}/blog/${post.slug}`}
                                            className="group flex h-full flex-col"
                                        >
                                            <div className="overflow-hidden">
                                                <img
                                                    src={post.cover_image ?? '/images/blog-2.jpg'}
                                                    alt={post.title}
                                                    loading="lazy"
                                                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <div className="flex items-center gap-3 text-xs text-coffee">
                                                    {post.category && (
                                                        <span className="font-semibold uppercase tracking-[0.16em] text-terra">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    <span className="text-coffee/70">
                                                        {post.published_at}
                                                    </span>
                                                </div>
                                                <h3 className="mt-3 font-display text-xl leading-snug text-ink transition-colors group-hover:text-terra-deep">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-coffee">
                                                    {post.excerpt}
                                                </p>
                                                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-terra">
                                                    {str(t('ui.cta.readMore'))}
                                                    <ArrowUpRight className="size-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    );
}
