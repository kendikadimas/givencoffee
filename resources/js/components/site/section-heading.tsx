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
            {eyebrow && (
                <div
                    className={cn(
                        'mb-3.5 flex',
                        align === 'center' ? 'justify-center' : 'justify-start',
                    )}
                >
                    <span
                        className={cn(
                            'badge-pill',
                            light
                                ? 'border-cream/30 bg-white/10 text-cream'
                                : 'border-terra/30 bg-terra/10 text-terra',
                        )}
                    >
                        {eyebrow}
                    </span>
                </div>
            )}
            <h2
                className={cn(
                    'font-display text-3xl leading-[1.1] tracking-tight md:text-5xl lg:text-[2.75rem]',
                    light ? 'text-cream' : 'text-ink',
                )}
            >
                {title}
            </h2>
            {body && (
                <p
                    className={cn(
                        'mt-4 text-base leading-relaxed md:text-lg',
                        light ? 'text-cream/75' : 'text-coffee',
                    )}
                >
                    {body}
                </p>
            )}
        </div>
    );
}
