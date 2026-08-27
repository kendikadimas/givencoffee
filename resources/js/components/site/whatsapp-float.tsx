import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

import { str, useTranslations } from '@/hooks/use-translations';

type WhatsAppSettings = {
    whatsapp_url?: string;
};

export function WhatsAppFloat() {
    const { t, locale } = useTranslations();
    const settings = ((usePage().props.settings ?? {}) as WhatsAppSettings) ?? {};

    if (!settings.whatsapp_url) {
        return null;
    }

    return (
        <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            <span className="hidden rounded-full border border-border/80 bg-cream/90 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-earth backdrop-blur-md transition-all duration-300 md:inline-block">
                {locale === 'en' ? 'Export Specialist Available' : 'Konsultasi Ekspor'}
            </span>
            <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                aria-label={str(t('ui.cta.orderWhatsapp'))}
                className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] active:scale-95"
            >
                <span className="absolute -inset-1 animate-ping rounded-full bg-[#25D366]/30 opacity-75 duration-1000" />
                <MessageCircle className="relative size-6 fill-white" />
            </a>
        </aside>
    );
}
