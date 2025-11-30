import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="About" 
        description="Learn about NexusFaith's mission to bridge science and biblical faith." 
      />
      <SiteHeader />
      
      <main className="container px-4 md:px-8 py-12 md:py-24">
        <article className="mx-auto max-w-3xl">
          <div className="mb-16 text-center border-b pb-8">
            <h1 className="font-serif text-5xl font-bold mb-4">About NexusFaith</h1>
            <p className="text-2xl text-primary font-serif italic">
              Bridging the gap between modern science and timeless faith.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              NexusFaith exists to bridge the gap between rigorous scientific inquiry and sincere biblical faith. We provide insights, answers, and inspiring stories that demonstrate how scientific discovery and biblical truth complement each other—not contradict.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              We believe that the same God who wrote the Bible also wrote the laws of nature. Therefore, when understood correctly, science and scripture will not contradict, but enrich our understanding of reality.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Why We Started</h2>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              For too long, the cultural narrative has presented a false dichotomy: you must choose between science and faith. This project was born from the conviction that this choice is unnecessary and, frankly, misguided.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              Many intellectually honest people—scientists, engineers, philosophers—wrestle with integrating their work and curiosity with their faith commitments. They don't find the resources they need. This is that resource.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              NexusFaith is for people who love truth and aren't afraid to ask hard questions—from both science and Scripture.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Who We're For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Seekers & Students</h3>
                <p className="text-muted-foreground">
                  Asking the big questions about origin, meaning, and truth. Navigating faith in secular environments.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Pastors & Educators</h3>
                <p className="text-muted-foreground">
                  Looking for resources to equip congregations and students with thoughtful, biblically grounded answers.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Scientists & Engineers</h3>
                <p className="text-muted-foreground">
                  Who want to integrate their professional work and curiosity with their faith commitments.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Skeptics & Critics</h3>
                <p className="text-muted-foreground">
                  Genuinely interested in understanding what believers think and why faith and reason aren't opposed.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Our Goals</h2>
            <ul className="space-y-4 text-lg text-foreground/90">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Educate:</strong> Provide clear, accessible explanations of how science and faith coexist at the intersection of cosmology, biology, AI, and philosophy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Inspire:</strong> Share stories of remarkable scientists and thinkers who integrate faith and reason without compromise.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Foster Dialogue:</strong> Create a space for respectful, intellectually honest conversation across worldviews.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Equip:</strong> Provide pastors, teachers, and believers with thoughtful resources for discipleship and outreach.</span>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Our Approach</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <p className="text-lg leading-relaxed mb-4">
                We operate with three core commitments:
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong>Evidence-Driven:</strong> We follow the data, whether scientific or historical. We don't shy away from hard questions or honest counterarguments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong>Intellectually Honest:</strong> We represent both science and faith fairly. No straw men, no oversimplifications. We acknowledge where genuine tensions exist.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span><strong>Welcoming to Questions:</strong> We believe truth has nothing to fear from inquiry. Skeptics, critics, and sincere seekers are all welcome here.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">What You'll Find Here</h2>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              <strong>Topic Hubs:</strong> Deep dives into Cosmology & Physics, Biology, AI & Technology, and Philosophy. Each hub presents the science, explores the theological resonances, and addresses common objections.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              <strong>Videos:</strong> Visual explanations of complex concepts, making the material accessible to people at all levels of scientific literacy.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              <strong>FAQs:</strong> Answers to the questions we hear most often—from both skeptics and believers.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              <strong>Newsletter:</strong> Stay updated with new essays, videos, and resources delivered straight to your inbox.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-3xl font-serif font-bold mb-6">Join the Conversation</h2>
            <p className="text-lg leading-relaxed text-foreground/90">
              If you're curious about the intersection of science and faith, you've come to the right place. Whether you're a skeptic, a believer, or someone still figuring it out, we invite you to explore, question, and discover alongside us.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 mt-4">
              Truth is one. Let's seek it together.
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
