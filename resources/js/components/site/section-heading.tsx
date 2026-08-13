import { cn } from '@/lib/utils';

type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    body?: string;
    align?: 'left' | 'center';
    light?: boolean;
    className?: string;
};

export function SectionHeading({
    eyebrow,
    title,
    body,
    align = 'left',
    light = false,
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'max-w-2xl',
                align === 'center' && 'mx-auto text-center',
                className,
            )}
        >
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2
                className={cn(
                    'font-display text-3xl leading-[1.08] tracking-tight md:text-5xl',
                    light ? 'text-cream' : 'text-ink',
                )}
            >
                {title}
            </h2>
            {body && (
                <p
                    className={cn(
                        'mt-4 text-base leading-relaxed md:text-lg',
                        light ? 'text-cream/70' : 'text-coffee',
                    )}
                >
                    {body}
                </p>
            )}
        </div>
    );
}
