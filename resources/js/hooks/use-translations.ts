import { usePage } from '@inertiajs/react';

type Translations = Record<string, unknown>;

export function useTranslations(): {
    t: (key: string) => unknown;
    locale: string;
} {
    const page = usePage();
    const translations = (page.props.translations ?? {}) as Translations;
    const locale = (page.props.locale ?? 'en') as string;

    const t = (key: string): unknown =>
        key.split('.').reduce<unknown>((acc, part) => {
            if (acc && typeof acc === 'object') {
                return (acc as Record<string, unknown>)[part];
            }

            return undefined;
        }, translations) ?? key;

    return { t, locale };
}

export function str(value: unknown, fallback = ''): string {
    return typeof value === 'string' ? value : fallback;
}

export function arr<T = unknown>(value: unknown): T[] {
    return Array.isArray(value) ? (value as T[]) : [];
}
