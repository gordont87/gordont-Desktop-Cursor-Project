"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

const replies: { match: RegExp; text: string }[] = [
  {
    match: /rent|available|listing|home|apartment/i,
    text: "You can browse demo listings on Available Rentals. Live availability requires a property listing feed. Would you like the property search or to schedule a showing?",
  },
  {
    match: /show|tour|visit/i,
    text: "You can request a showing from a listing page or the Schedule a Showing form. A team member confirms appointments — I can’t invent availability.",
  },
  {
    match: /apply|application|screen/i,
    text: "Applications and screening are handled through a secure third-party platform. We never collect SSNs or bank details on ordinary website forms.",
  },
  {
    match: /pet/i,
    text: "Pet policies vary by property. Check each listing’s pet policy, or ask our team for the specific address. I won’t invent a policy.",
  },
  {
    match: /price|fee|cost|management/i,
    text: "Management pricing depends on property type and services. See Management Pricing for plan comparisons, or request a consultation for a tailored quote. I don’t invent fees.",
  },
  {
    match: /maintenance|repair|fix/i,
    text: "Residents can submit maintenance requests in the Tenant Center. For emergencies involving fire, gas, flooding, or safety, contact emergency services first.",
  },
  {
    match: /owner|analysis|consult/i,
    text: "Owners can start with a Free Rental Analysis or Schedule a Consultation. I can point you there, but I can’t invent market rents or guarantees.",
  },
];

function answer(input: string): string {
  const hit = replies.find((r) => r.match.test(input));
  if (hit) return hit.text;
  return `I can guide you to approved pages for rentals, showings, applications, services, pricing, maintenance, and owner consultations. For anything specific I don’t have verified, please contact us at ${siteConfig.contact.phone} or use the contact form.`;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — I’m the T & T Gordon website assistant. I can help navigate approved information only. I won’t invent policies, pricing, availability, or legal advice.",
    },
  ]);

  const quick = useMemo(
    () => [
      { label: "Find rentals", href: "/rentals" },
      { label: "Owner analysis", href: "/owners/rental-analysis" },
      { label: "Maintenance", href: "/tenants/maintenance" },
      { label: "Contact", href: "/contact" },
    ],
    [],
  );

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "assistant", text: answer(trimmed) },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(var(--mobile-cta-h)+1rem)] md:bottom-6 right-4 md:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-navy text-white px-4 py-3 shadow-[var(--shadow)] hover:bg-navy-soft"
        aria-haspopup="dialog"
      >
        <MessageCircle className="size-5 text-champagne" />
        <span className="text-sm font-medium hidden sm:inline">Ask Agent</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="AI property management assistant"
          className="fixed bottom-[calc(var(--mobile-cta-h)+1rem)] md:bottom-6 right-4 md:right-6 z-50 w-[min(100%-2rem,380px)] rounded-3xl border border-border bg-white shadow-[var(--shadow)] overflow-hidden flex flex-col max-h-[min(70vh,560px)]"
        >
          <div className="bg-navy text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-heading font-semibold text-sm">Ask Agent</p>
              <p className="text-[11px] text-white/60">Guided navigation · no invented answers</p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              className="size-8 rounded-full hover:bg-white/10 inline-flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-muted/40">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed rounded-2xl px-3.5 py-2.5 max-w-[90%] ${
                  m.role === "assistant"
                    ? "bg-white border border-border text-charcoal"
                    : "bg-navy text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {quick.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className="text-xs rounded-full border border-border bg-white px-3 py-1.5 hover:border-champagne"
                  onClick={() => setOpen(false)}
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </div>
          <form
            className="border-t border-border p-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, rentals…"
              className="flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-champagne"
              aria-label="Message the assistant"
            />
            <Button type="submit" size="sm" variant="champagne">
              Send
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}
