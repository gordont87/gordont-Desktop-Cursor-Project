"use client";

import {
  changeTenantPassword,
  logoutTenant,
  updateTenantProfile,
  type AuthState,
} from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { useActionState } from "react";

const initial: AuthState = {};

export function TenantSettingsForms({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string | null;
}) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateTenantProfile,
    initial,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changeTenantPassword,
    initial,
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Account settings</h1>
        <p className="mt-2 text-sm text-slate">
          Update your contact details or change your password.
        </p>
      </div>

      <form action={profileAction} className="card-surface p-6 grid gap-4">
        <h2 className="font-heading text-lg font-semibold text-navy">Personal information</h2>
        <Field label="Full name" htmlFor="name" required>
          <Input id="name" name="name" required defaultValue={name} />
        </Field>
        <Field label="Email (login)" htmlFor="email" required>
          <Input id="email" name="email" type="email" required defaultValue={email} />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" defaultValue={phone ?? ""} />
        </Field>
        {profileState.error ? (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {profileState.error}
          </p>
        ) : null}
        {profileState.success ? (
          <p className="text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
            {profileState.success}
          </p>
        ) : null}
        <Button type="submit" variant="champagne" disabled={profilePending}>
          {profilePending ? "Saving…" : "Save profile"}
        </Button>
      </form>

      <form action={passwordAction} className="card-surface p-6 grid gap-4">
        <h2 className="font-heading text-lg font-semibold text-navy">Change password</h2>
        <Field label="Current password" htmlFor="currentPassword" required>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
          />
        </Field>
        <Field label="New password" htmlFor="newPassword" required hint="Min. 8 characters">
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirm new password" htmlFor="confirmPassword" required>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        {passwordState.error ? (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {passwordState.error}
          </p>
        ) : null}
        {passwordState.success ? (
          <p className="text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
            {passwordState.success}
          </p>
        ) : null}
        <Button type="submit" variant="outline" disabled={passwordPending}>
          {passwordPending ? "Updating…" : "Update password"}
        </Button>
      </form>

      <form action={logoutTenant}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
