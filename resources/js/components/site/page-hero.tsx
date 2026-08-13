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
        <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-32 pb-16 md:min-h-[72vh] md:pb-20">
            <img
                src={image}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 size-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

            <div
                className={cn(
                    'relative mx-auto w-full max-w-[1400px] px-5 md:px-8',
                    align === 'center' ? 'text-center' : 'text-left',
                )}
            >
                {eyebrow && <p className="eyebrow mb-4 text-terra">{eyebrow}</p>}
                <h1 className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-cream md:text-6xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
