import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

import { Reveal } from '@/components/site/reveal';
import { str, useTranslations } from '@/hooks/use-translations';

type InstagramSettings = {
    instagram_embed?: string;
    social_instagram?: string;
};

export function InstagramFeed() {
    const { t } = useTranslations();
    const settings =
        ((usePage().props.settings ?? {}) as InstagramSettings) ?? {};
    const containerRef = useRef<HTMLDivElement>(null);

    const embedCode = settings.instagram_embed;

    useEffect(() => {
        if (!embedCode || !containerRef.current) {
            return;
        }

        // Parse embed code into HTML content and script tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = embedCode;

        const scripts = Array.from(tempDiv.querySelectorAll('script'));

        // Remove script tags from HTML to render clean markup inside container
        scripts.forEach((s) => s.remove());

        if (containerRef.current) {
            containerRef.current.innerHTML = tempDiv.innerHTML;
        }

        // Execute extracted scripts dynamically
        const addedScripts: HTMLScriptElement[] = [];

        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });

            if (oldScript.innerHTML) {
                newScript.innerHTML = oldScript.innerHTML;
            }

            document.body.appendChild(newScript);
            addedScripts.push(newScript);
        });

        // Trigger widget initialization for Elfsight / LightWidget / SnapWidget if present
        const timer = setTimeout(() => {
            const w = window as any;

            if (w.eapps && typeof w.eapps.init === 'function') {
                try {
                    w.eapps.init();
                } catch {
                    // ignore
                }
            }

            if (w.ElfsightApp && typeof w.ElfsightApp.init === 'function') {
                try {
                    w.ElfsightApp.init();
                } catch {
                    // ignore
                }
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            addedScripts.forEach((s) => s.remove());
        };
    }, [embedCode]);

    if (!embedCode) {
        return null;
    }

    const handle =
        settings.social_instagram?.replace(
            /^https?:\/\/(www\.)?instagram\.com\/?/,
            '',
        ) || '@givencoffee';

    return (
        <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
            <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="eyebrow">
                            {str(t('home.instagram.eyebrow'))}
                        </p>
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
                <div className="mx-auto mt-8 max-w-xl md:max-w-2xl">
                    <div
                        ref={containerRef}
                        className="shadow-earth min-h-[300px] overflow-hidden rounded-sm border border-border bg-white p-2 [&_img]:mx-auto [&_img]:max-h-[550px] [&_img]:w-auto [&_img]:object-contain [&>iframe]:h-[450px] [&>iframe]:w-full [&>iframe]:border-0"
                    />
                </div>
            </Reveal>
        </section>
    );
}
