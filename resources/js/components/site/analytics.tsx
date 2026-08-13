import { Head } from '@inertiajs/react';

type AnalyticsProps = {
    gaId?: string;
};

export function Analytics({ gaId }: AnalyticsProps) {
    if (!gaId) {
return null;
}

    return (
        <Head>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gaId}');
                    `,
                }}
            />
        </Head>
    );
}
