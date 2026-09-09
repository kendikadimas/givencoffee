import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { home } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { cn } from '@/lib/utils';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 rounded-sm border border-forest/20 bg-olive/60 px-4 py-3 text-sm text-forest-deep">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-1.5">
                                <label
                                    htmlFor="email"
                                    className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="w-full border-0 border-b border-border/80 bg-transparent px-0 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-coffee/40 focus:border-terra focus:ring-0"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <a
                                            href={request().url}
                                            tabIndex={5}
                                            className="text-sm text-terra transition-colors hover:text-terra-deep"
                                        >
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    underline
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <label className="flex cursor-pointer items-center gap-2.5 select-none">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="size-4 rounded-sm border-border accent-terra"
                                />
                                <span className="text-sm text-coffee">Remember me</span>
                            </label>

                            <button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                className={cn(
                                    'inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold tracking-wide text-cream transition-all duration-200',
                                    'hover:bg-espresso hover:shadow-earth hover:-translate-y-0.5 disabled:opacity-50 active:translate-y-0',
                                )}
                            >
                                {processing && (
                                    <span className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                                )}
                                Log in
                            </button>
                        </div>

                        <div className="text-center text-sm text-coffee">
                            Back to{' '}
                            <a href={home('en').url} className="font-semibold text-terra hover:text-terra-deep">
                                givencoffeeid.com
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Log in to manage your Given Coffee storefront.',
};
