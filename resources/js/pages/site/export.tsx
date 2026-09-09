import { FileCheck2, Package, Plane } from 'lucide-react';

import { Cta } from '@/components/site/cta';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Seo } from '@/components/site/seo';
import { arr, str, useTranslations } from '@/hooks/use-translations';

type PackageItem = { title: string; text: string; tag: string };
type MoqItem = { label: string; value: string };
type IncotermItem = { label: string; value: string };
type CertificateItem = { label?: string };

export default function ExportPage() {
    const { t, locale } = useTranslations();

    const packaging = arr<PackageItem>(t('export.packaging.items'));
    const moq = arr<MoqItem>(t('export.moq.items'));
    const incoterms = arr<IncotermItem>(t('export.incoterms.items'));
    const certificates = arr<CertificateItem>(t('export.certificates.items'));

    const packagingIcons = [Package, Plane];

    return (
        <>
            <Seo
                title={str(t('export.hero.title'))}
                description={str(t('export.hero.subtitle'))}
                path={`/${locale}/export`}
                image="/images/add/truck-side.jpg"
            />

            <PageHero
                image="/images/add/truck-side.jpg"
                eyebrow={str(t('export.hero.eyebrow'))}
                title={str(t('export.hero.title'))}
                subtitle={str(t('export.hero.subtitle'))}
                align="left"
            />

            {/* Packaging — bone bg, 2-col cards */}
            <section className="relative bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(t('export.packaging.eyebrow'))}
                        </p>
                        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('export.packaging.title'))}
                            </h2>
                            <p className="text-base leading-relaxed text-coffee md:text-lg">
                                {str(t('export.packaging.body'))}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                        {packaging.map((item, i) => {
                            const Icon =
                                packagingIcons[i % packagingIcons.length];

                            return (
                                <Reveal key={item.title} delay={i * 80}>
                                    <div className="shadow-earth flex h-full flex-col rounded-sm border border-border/80 bg-cream p-8">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="grid size-12 place-items-center rounded-full border border-terra/30 bg-terra/10">
                                                <Icon className="size-5 text-terra" />
                                            </span>
                                            <span className="rounded-full border border-border/80 bg-bone px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-coffee uppercase">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-coffee">
                                            {item.text}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* MOQ — ink bg, table rows */}
            <section className="bg-ink py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(t('export.moq.eyebrow'))}
                        </p>
                        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
                                {str(t('export.moq.title'))}
                            </h2>
                            <p className="text-base leading-relaxed text-cream/65">
                                {str(t('export.moq.body'))}
                            </p>
                        </div>
                    </Reveal>

                    <dl className="divide-y divide-cream/10 border-t border-cream/10">
                        {moq.map((row, i) => (
                            <Reveal key={row.label} delay={i * 60}>
                                <div className="grid gap-2 py-8 md:grid-cols-[2fr_3fr] md:items-baseline md:gap-12">
                                    <dt className="text-xs font-semibold tracking-[0.2em] text-cream/40 uppercase">
                                        {row.label}
                                    </dt>
                                    <dd className="font-display text-xl font-bold text-cream md:text-2xl">
                                        {row.value}
                                    </dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Incoterms — cream bg, 4-col grid */}
            <section className="relative bg-cream py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                            {str(t('export.incoterms.eyebrow'))}
                        </p>
                        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('export.incoterms.title'))}
                            </h2>
                            <p className="text-base leading-relaxed text-coffee md:text-lg">
                                {str(t('export.incoterms.body'))}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-0 border-t-2 border-ink md:grid-cols-4">
                        {incoterms.map((row, i) => (
                            <Reveal key={row.label} delay={i * 80}>
                                <div className="border-b border-border/60 px-0 py-10 md:border-r md:border-b-0 md:px-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                                    <span className="font-display text-4xl font-bold text-terra">
                                        {row.label}
                                    </span>
                                    <p className="mt-4 text-sm leading-relaxed text-coffee">
                                        {row.value}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates — bone bg, checklist */}
            <section className="bg-bone py-24 md:py-32">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
                        <Reveal>
                            <p className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('export.certificates.eyebrow'))}
                            </p>
                            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                                {str(t('export.certificates.title'))}
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-coffee">
                                {str(t('export.certificates.body'))}
                            </p>
                        </Reveal>

                        <div className="space-y-0 divide-y divide-border/60 border-t-2 border-ink">
                            {certificates.map((item, i) => (
                                <Reveal key={item.label ?? i} delay={i * 50}>
                                    <div className="flex items-center gap-4 py-5">
                                        <FileCheck2 className="size-5 shrink-0 text-terra" />
                                        <span className="text-sm font-semibold text-ink md:text-base">
                                            {item.label}
                                        </span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA — centered card on image bg */}
            <section className="relative overflow-hidden py-36 md:py-48">
                <img
                    src="/images/real/beansonacontainer5.jpeg"
                    alt="Given Coffee specialty green beans ready for export"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/70" />
                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
                    <Reveal>
                        <div className="mx-auto max-w-2xl rounded-sm border border-cream/15 bg-ink/60 px-8 py-12 text-center backdrop-blur-md md:px-14 md:py-16">
                            <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-terra uppercase">
                                {str(t('export.cta.eyebrow'))}
                            </p>
                            <h2 className="font-display text-3xl leading-[1.06] text-cream md:text-4xl">
                                {str(t('export.cta.title'))}
                            </h2>
                            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/75">
                                {str(t('export.cta.body'))}
                            </p>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                <Cta
                                    href={`/${locale}/contact`}
                                    variant="terra"
                                    className="px-8 py-3 text-base"
                                >
                                    {str(t('export.cta.ctaPrimary'))}
                                </Cta>
                                <Cta
                                    href={`/${locale}/contact`}
                                    variant="outline-light"
                                    className="px-8 py-3 text-base"
                                >
                                    {str(t('export.cta.ctaSecondary'))}
                                </Cta>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
