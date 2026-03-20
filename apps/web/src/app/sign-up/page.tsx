import Link from "next/link";
import { signUpAction } from "@/app/_actions/auth";

type SignUpPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
      <section className="w-full rounded-[32px] border border-white/10 bg-slate-950/60 p-8 shadow-[0_24px_100px_rgba(3,7,18,0.35)]">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/80">
          Sign up
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Create a demo workspace identity.</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          This sign-up flow seeds a session cookie and gets the shell behaving like a protected product while real auth is still pending.
        </p>

        {resolvedSearchParams?.error ? (
          <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
            A work email is required to create a demo workspace.
          </div>
        ) : null}

        <form action={signUpAction} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Name</span>
            <input
              type="text"
              name="name"
              placeholder="Karim"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
            />
          </label>

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
            Create demo workspace
          </button>
        </form>

        <div className="mt-6 flex gap-3">
          <Link href="/sign-in" className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100">
            Back to sign in
          </Link>
          <Link href="/" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
