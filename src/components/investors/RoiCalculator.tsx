"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { Card } from "@/components/ui/Section";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";

function num(v: string) {
  const n = Number(v.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function RoiCalculator() {
  const [form, setForm] = useState({
    purchasePrice: "425000",
    downPayment: "85000",
    interestRate: "6.5",
    propertyTaxes: "7200",
    insurance: "1800",
    expectedRent: "2800",
    managementFee: "8",
    maintenance: "150",
    hoa: "0",
    vacancy: "5",
  });

  const result = useMemo(() => {
    const price = num(form.purchasePrice);
    const down = num(form.downPayment);
    const rate = num(form.interestRate) / 100 / 12;
    const loan = Math.max(price - down, 0);
    const n = 360;
    const mortgage =
      rate === 0 ? loan / n : (loan * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const taxes = num(form.propertyTaxes) / 12;
    const insurance = num(form.insurance) / 12;
    const rent = num(form.expectedRent);
    const mgmt = rent * (num(form.managementFee) / 100);
    const maint = num(form.maintenance);
    const hoa = num(form.hoa);
    const vacancyLoss = rent * (num(form.vacancy) / 100);
    const operating = taxes + insurance + mgmt + maint + hoa + vacancyLoss;
    const cashFlow = rent - mortgage - operating;
    const annualCash = cashFlow * 12;
    const noi = (rent - (taxes + insurance + mgmt + maint + hoa + vacancyLoss)) * 12;
    const cap = price > 0 ? (noi / price) * 100 : 0;
    const coc = down > 0 ? (annualCash / down) * 100 : 0;
    return {
      mortgage,
      operating,
      cashFlow,
      annualCash,
      cap,
      coc,
    };
  }, [form]);

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const fields: { key: keyof typeof form; label: string; hint?: string }[] = [
    { key: "purchasePrice", label: "Purchase price" },
    { key: "downPayment", label: "Down payment" },
    { key: "interestRate", label: "Interest rate (%)" },
    { key: "propertyTaxes", label: "Property taxes (annual)" },
    { key: "insurance", label: "Insurance (annual)" },
    { key: "expectedRent", label: "Expected rent (monthly)" },
    { key: "managementFee", label: "Management fee (%)" },
    { key: "maintenance", label: "Maintenance (monthly)" },
    { key: "hoa", label: "HOA (monthly)" },
    { key: "vacancy", label: "Vacancy estimate (%)" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 md:p-7">
        <h2 className="font-heading text-xl font-semibold mb-4">Investment inputs</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <Field key={f.key} label={f.label} htmlFor={f.key}>
              <Input
                id={f.key}
                inputMode="decimal"
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      </Card>
      <Card className="p-6 md:p-7 bg-navy text-white border-navy">
        <p className="text-xs uppercase tracking-[0.16em] text-champagne">Estimated results</p>
        <ul className="mt-5 space-y-4">
          {(
            [
              ["Monthly cash flow", formatCurrency(result.cashFlow)],
              ["Annual cash flow", formatCurrency(result.annualCash)],
              ["Cap rate", `${result.cap.toFixed(2)}%`],
              ["Cash-on-cash return", `${result.coc.toFixed(2)}%`],
              ["Est. monthly operating expenses", formatCurrency(result.operating)],
              ["Est. monthly mortgage", formatCurrency(result.mortgage)],
            ] as const
          ).map(([label, value]) => (
            <li key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-white/70 text-sm">{label}</span>
              <span className="font-heading font-semibold">{value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-white/55 leading-relaxed">
          Estimates only — not financial, tax, or investment advice. Actual results vary. Verify
          assumptions with licensed professionals before making decisions.
        </p>
        <Button href="/contact" variant="champagne" className="mt-5">
          Discuss With an Advisor
        </Button>
      </Card>
    </div>
  );
}
