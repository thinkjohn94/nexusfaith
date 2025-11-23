import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";
import { BlogPost } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface TopicPageProps {
  data: BlogPost;
}

export default function TopicPage({ data }: TopicPageProps) {
  // Simple markdown-like rendering for the prototype since we might not have a full parser
  // In a real app, we'd use MDXRemote or react-markdown
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="mt-8 mb-4 text-4xl font-serif font-bold">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="mt-8 mb-4 text-2xl font-serif font-bold">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="mt-6 mb-3 text-xl font-serif font-bold">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.replace('* ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-4 leading-7 text-foreground/90">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={data.title} 
        description={data.description} 
      />
      <SiteHeader />
      
      <main className="container px-4 md:px-8 py-12 md:py-24">
        <div className="mb-8">
          <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
            <Link href="/">
              <span className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" /> Back to Home
              </span>
            </Link>
          </Button>
        </div>

        <article className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif mb-4">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {data.description}
            </p>
          </header>

          <div className="prose prose-lg prose-slate dark:prose-invert mx-auto prose-headings:font-serif prose-a:text-primary">
             {/* Fallback renderer */}
             {renderContent(data.content)}
          </div>

          <div className="mt-16 border-t pt-8">
             <h3 className="text-2xl font-serif font-bold mb-4">Common Objections & Replies</h3>
             <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h4 className="font-bold mb-2">Objection</h4>
                  <p className="text-muted-foreground text-sm">
                    "This is just God of the gaps. Science will eventually explain everything."
                  </p>
                </div>
                <div className="rounded-lg border bg-secondary/50 p-6 shadow-sm">
                   <h4 className="font-bold mb-2 text-primary">Response</h4>
                   <p className="text-foreground text-sm">
                     We aren't arguing from what science <em>can't</em> explain (gaps), but from what it <em>does</em> reveal: fine-tuning, information, and cosmic beginnings. These features positively point to mind, not just mystery.
                   </p>
                </div>
             </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
