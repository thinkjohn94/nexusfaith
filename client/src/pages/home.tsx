import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { Hero } from "@/components/ui/hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/ui/seo";
import { youtubeConfig } from "@/lib/content";
import { Link } from "wouter";
import { ArrowRight, Atom, Dna, Cpu, BookOpen, Quote as QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Cosmology & Physics",
    description: "Big Bang beginnings, fine-tuning, and the order that makes science possible.",
    href: "/cosmology",
    icon: Atom,
  },
  {
    title: "Biology",
    description: "From DNA’s information to biomimicry—complexity that inspires wonder.",
    href: "/biology",
    icon: Dna,
  },
  {
    title: "AI & Technology",
    description: "What our creative tools reveal about intelligence, meaning, and limits.",
    href: "/ai-and-technology",
    icon: Cpu,
  },
  {
    title: "Philosophy & Methods",
    description: "Faith and reason as partners; how to think well about science and Scripture.",
    href: "/philosophy",
    icon: BookOpen,
  },
];

export default function Home() {
  const featuredVideo = youtubeConfig.featured[0];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Home" 
        description="NexusFaith bridges the gap between modern science and timeless faith – providing insights, answers, and inspiring stories that show how scientific discovery and biblical truth complement each other." 
      />
      <SiteHeader />
      
      <main>
        <Hero />

        {/* Mission Statement Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent border-b border-primary/10">
          <div className="container px-4 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg leading-relaxed text-foreground/90 mb-8">
                NexusFaith <span className="font-semibold text-primary">bridges the gap between modern science and timeless faith</span> — providing insights, answers, and inspiring stories that show how scientific discovery and biblical truth complement each other.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Intellectually Honest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Welcoming Questions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Pillars Section */}
        <section id="topics" className="py-24 bg-secondary/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 font-serif">
                Explore the Topics
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how the deepest questions of science resonate with the timeless truths of faith.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={pillar.href}>
                    <a className="block h-full group">
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted hover:border-primary/50">
                        <CardHeader>
                          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <pillar.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                            {pillar.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {pillar.description}
                          </CardDescription>
                          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-24">
          <div className="container px-4 md:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <QuoteIcon className="h-12 w-12 text-primary/20" />
              </div>
              <blockquote className="text-2xl font-serif italic leading-relaxed md:text-3xl text-foreground/80">
                "The first gulp from the glass of natural sciences will turn you into an atheist, 
                but at the bottom of the glass God is waiting for you."
              </blockquote>
              <cite className="mt-6 block text-sm font-semibold not-italic text-muted-foreground">
                — Werner Heisenberg (attributed)
              </cite>
            </div>
          </div>
        </section>

        {/* Latest from Channel */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 font-serif">
                  Latest from the Channel
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We release new videos regularly exploring the intersection of science, faith, and culture. 
                  Don't miss the latest discussion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <a href={youtubeConfig.channelUrl} target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/youtube">View Video Library</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <YouTubeEmbed 
                  videoId={featuredVideo.videoId} 
                  title={featuredVideo.title} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24">
          <div className="container px-4 md:px-8">
            <NewsletterForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
