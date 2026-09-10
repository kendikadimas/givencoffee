import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 rounded-sm border border-forest/20 bg-olive/60 px-4 py-3 text-sm text-forest-deep">
                    {status}
                </div>
            )}

            <Form {...email.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-xs font-semibold tracking-[0.18em] text-coffee uppercase"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoFocus
                                autoComplete="email"
                                placeholder="email@example.com"
                                className="w-full border-0 border-b border-border/80 bg-transparent px-0 py-2.5 text-sm text-ink transition-all outline-none placeholder:text-coffee/40 focus:border-terra focus:ring-0"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                            className={cn(
                                'inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold tracking-wide text-cream transition-all duration-200',
                                'hover:shadow-earth hover:-translate-y-0.5 hover:bg-espresso active:translate-y-0 disabled:opacity-50',
                            )}
                        >
                            {processing && (
                                <span className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                            )}
                            Email password reset link
                        </button>

                        <div className="text-center text-sm text-coffee">
                            Or, return to{' '}
                            <a
                                href={login().url}
                                className="font-semibold text-terra hover:text-terra-deep"
                            >
                                log in
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
