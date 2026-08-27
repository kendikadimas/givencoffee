import { Reveal } from '@/components/site/reveal';
import { cn } from '@/lib/utils';

type PageHeroProps = {
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
};

export function PageHero({ image, eyebrow, title, subtitle, align = 'center' }: PageHeroProps) {
    return (
        <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-ink pt-32 pb-16 md:min-h-[64vh] md:pb-24">
            <img
                src={image}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-1000 ease-out"
            />
            {/* Rich multi-layer atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
            <div className="pointer-events-none absolute -bottom-10 right-10 size-80 rounded-full bg-terra/15 blur-3xl" />

            <div
                className={cn(
                    'relative mx-auto w-full max-w-[1400px] px-5 md:px-8',
                    align === 'center' ? 'text-center' : 'text-left',
                )}
            >
                <Reveal>
                    {eyebrow && (
                        <div className={cn('mb-4 flex', align === 'center' ? 'justify-center' : 'justify-start')}>
                            <span className="badge-pill border-terra/40 bg-terra/20 text-cream">
                                {eyebrow}
                            </span>
                        </div>
                    )}
                    <h1 className="mx-auto max-w-4xl font-display text-4xl leading-[1.08] tracking-tight text-cream md:text-6xl lg:text-7xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
                            {subtitle}
                        </p>
                    )}
                </Reveal>
            </div>
        </section>
    );
}
