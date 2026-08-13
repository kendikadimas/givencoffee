import { Head, usePage } from '@inertiajs/react';

type SiteSettings = {
    company_name?: string;
    email?: string;
    social_instagram?: string;
    social_facebook?: string;
    social_linkedin?: string;
};

export function useSeoSettings(): SiteSettings {
    return ((usePage().props.settings ?? {}) as SiteSettings) ?? {};
}

function absolute(path: string): string {
    if (/^https?:\/\//.test(path)) {
        return path;
    }

    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

type SeoProps = {
    title: string;
    description: string;
    path?: string;
    type?: 'website' | 'article' | 'product';
    image?: string | null;
    jsonLd?: Record<string, unknown>;
};

export function Seo({
    title,
    description,
    path = typeof window !== 'undefined' ? window.location.pathname : '/',
    type = 'website',
    image,
    jsonLd,
}: SeoProps) {
    const settings = useSeoSettings();
    const name = settings.company_name ?? 'Given Coffee';
    const url = absolute(path);
    const ogImage = image ? absolute(image) : absolute('/images/real/beansonacontainer.jpeg');

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={title} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </Head>
    );
}

export function organizationJsonLd(settings: SiteSettings): Record<string, unknown> {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: settings.company_name ?? 'Given Coffee',
        url: origin,
        email: settings.email,
        sameAs: [settings.social_instagram, settings.social_facebook, settings.social_linkedin].filter(Boolean),
    };
}
