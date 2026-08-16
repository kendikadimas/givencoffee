import { usePage } from '@inertiajs/react';

import { Reveal } from '@/components/site/reveal';
import { str, useTranslations } from '@/hooks/use-translations';

type InstagramSettings = {
    instagram_embed?: string;
    social_instagram?: string;
};

export function InstagramFeed() {
    const { t } = useTranslations();
    const settings = ((usePage().props.settings ?? {}) as InstagramSettings) ?? {};

    if (!settings.instagram_embed) {
        return null;
    }

    const handle =
        settings.social_instagram?.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '') || '@givencoffee';

    return (
        <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
            <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="eyebrow">{str(t('home.instagram.eyebrow'))}</p>
                        <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                            {handle}
                        </h2>
                    </div>
                    {settings.social_instagram && (
                        <a
                            href={settings.social_instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-terra transition-colors hover:text-terra-deep"
                        >
                            {str(t('ui.footer.social'))} →
                        </a>
                    )}
                </div>
            </Reveal>
            <Reveal delay={120}>
                <div
                    className="overflow-hidden rounded-sm border border-border bg-white [&>iframe]:h-[420px] [&>iframe]:w-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: settings.instagram_embed }}
                />
            </Reveal>
        </section>
    );
}
