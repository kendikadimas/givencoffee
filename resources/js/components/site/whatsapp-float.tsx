import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

import { str, useTranslations } from '@/hooks/use-translations';

type WhatsAppSettings = {
    whatsapp_url?: string;
};

export function WhatsAppFloat() {
    const { t } = useTranslations();
    const settings = ((usePage().props.settings ?? {}) as WhatsAppSettings) ?? {};

    if (!settings.whatsapp_url) {
        return null;
    }

    return (
        <a
            href={settings.whatsapp_url}
            target="_blank"
            rel="noreferrer"
            aria-label={str(t('ui.cta.orderWhatsapp'))}
            className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
            <MessageCircle className="size-6" />
        </a>
    );
}
