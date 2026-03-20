import Link from "next/link";
import { signInAction } from "@/app/_actions/auth";

type SignInPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
      <section className="w-full rounded-[32px] border border-white/10 bg-slate-950/60 p-8 shadow-[0_24px_100px_rgba(3,7,18,0.35)]">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/80">
          Sign in
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Enter the dashboard with the first auth scaffold.</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          This is a cookie-backed demo session so protected routes already behave like an application. Replace it with production auth next.
        </p>

        {resolvedSearchParams?.error ? (
          <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
            Enter a work email to start a demo session.
          </div>
        ) : null}

        <form action={signInAction} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Work email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="karim@yapsolutely.ai"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
          >
            Start demo session
          </button>
        </form>

        <div className="mt-6 flex gap-3">
          <Link href="/sign-up" className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100">
            Go to sign up
          </Link>
          <Link href="/" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
