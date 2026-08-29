import { ContentPage, PageHero } from "@/components/layout/PageHero";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Placeholder blog posts for property owners and investors.",
};

const posts = [
  {
    title: "How to prepare your rental for showings (demo)",
    date: "PLACEHOLDER — Jan 2026",
    excerpt: "Staging, photography, and pricing basics — replace with real content.",
  },
  {
    title: "Understanding Fair Housing in tenant screening",
    date: "PLACEHOLDER — Dec 2025",
    excerpt: "Equal housing essentials every landlord should review with counsel.",
  },
  {
    title: "Maintenance reserves for single-family rentals",
    date: "PLACEHOLDER — Nov 2025",
    excerpt: "Budgeting demo article — not financial advice.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Blog"
        description="Placeholder posts — connect a CMS or markdown pipeline before publishing."
      />
      <ContentPage>
        <Section>
          <Container>
            <SectionHeading title="Latest articles" />
            <div className="space-y-6 max-w-3xl">
              {posts.map((post) => (
                <Card key={post.title}>
                  <p className="text-xs text-slate">{post.date}</p>
                  <h2 className="mt-2 font-heading text-xl font-semibold text-navy">{post.title}</h2>
                  <p className="mt-2 text-sm text-slate">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-champagne">Full article placeholder</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </ContentPage>
    </>
  );
}
