import { usePage } from '@inertiajs/react';

import { str, useTranslations } from '@/hooks/use-translations';

type WhatsAppSettings = {
    whatsapp_url?: string;
};

export function WhatsAppFloat() {
    const { t, locale } = useTranslations();
    const settings =
        ((usePage().props.settings ?? {}) as WhatsAppSettings) ?? {};

    if (!settings.whatsapp_url) {
        return null;
    }

    return (
        <aside
            aria-label="WhatsApp Contact"
            className="fixed right-6 bottom-6 z-50 flex items-center gap-3"
        >
            <span className="shadow-earth hidden rounded-full border border-border/80 bg-cream/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur-md transition-all duration-300 md:inline-block">
                {locale === 'en'
                    ? 'Export Specialist Available'
                    : 'Konsultasi Ekspor'}
            </span>
            <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                aria-label={str(t('ui.cta.orderWhatsapp'))}
                className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] active:scale-95"
            >
                <span className="absolute -inset-1 animate-ping rounded-full bg-[#25D366]/30 opacity-75 duration-1000" />
                {/* Official WhatsApp logo path */}
                <svg
                    className="relative size-6"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.845L.057 23.522a.5.5 0 0 0 .606.61l5.82-1.525A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.127-1.415l-.362-.214-3.758.985.999-3.648-.235-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
            </a>
        </aside>
    );
}
