"use client";

import { requestTenantPasswordReset, type AuthState } from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useActionState } from "react";

const initial: AuthState = {};

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(requestTenantPasswordReset, initial);

  return (
    <div className="min-h-dvh bg-navy-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-champagne mt-1">Tenant Portal</p>
        </div>
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow)]">
          <h1 className="font-heading text-2xl font-semibold text-navy">Forgot password</h1>
          <p className="mt-2 text-sm text-slate">
            Enter the email on your tenant account and we&apos;ll create a reset link.
          </p>

          <form action={action} className="mt-6 space-y-4">
            <Field label="Email" htmlFor="email" required>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>
            {state.error ? (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {state.error}
              </p>
            ) : null}
            {state.success ? (
              <div className="space-y-3">
                <p className="text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
                  {state.success}
                </p>
                {state.resetUrl ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-950">
                    <p className="font-semibold">Demo reset link</p>
                    <p className="mt-1">
                      Email delivery is not configured yet, so use this link to reset now:
                    </p>
                    <Link
                      href={state.resetUrl}
                      className="mt-2 block break-all text-navy font-medium underline"
                    >
                      {state.resetUrl}
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}
            <Button type="submit" variant="champagne" className="w-full" disabled={pending}>
              {pending ? "Sending…" : "Send reset link"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate">
            <Link href="/tenants/portal/login" className="text-navy hover:underline">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
