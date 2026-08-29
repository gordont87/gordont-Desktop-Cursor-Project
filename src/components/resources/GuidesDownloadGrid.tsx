"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { Card } from "@/components/ui/Section";
import { useState } from "react";

function GuideCard({ title, pages }: { title: string; pages: string }) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  return (
    <Card>
      <h2 className="font-heading text-lg font-semibold text-navy">{title}</h2>
      <p className="mt-1 text-sm text-slate">{pages}</p>
      {unlocked ? (
        <div className="mt-4 rounded-lg border border-dashed border-champagne bg-champagne-muted/30 p-4 text-sm text-navy">
          Demo download unlocked — connect email provider + file storage for production.
        </div>
      ) : (
        <form
          className="mt-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setUnlocked(true);
          }}
        >
          <Field label="Email for download" htmlFor={`email-${title}`} required>
            <Input
              id={`email-${title}`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Button type="submit" size="sm" className="sm:self-end">
            Unlock Demo
          </Button>
        </form>
      )}
    </Card>
  );
}

const guides = [
  { id: "starter", title: "Landlord Starter Kit", pages: "12 pages · PDF placeholder" },
  { id: "screening", title: "Fair Housing Screening Guide", pages: "8 pages · PDF placeholder" },
  { id: "maintenance", title: "Maintenance Playbook", pages: "10 pages · PDF placeholder" },
];

export function GuidesDownloadGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => (
        <GuideCard key={g.id} title={g.title} pages={g.pages} />
      ))}
    </div>
  );
}
