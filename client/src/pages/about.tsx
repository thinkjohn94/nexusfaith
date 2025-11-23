import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="About" 
        description="About the NexusFaith project." 
      />
      <SiteHeader />
      
      <main className="container px-4 md:px-8 py-12 md:py-24">
        <div className="mx-auto max-w-3xl prose prose-lg prose-slate dark:prose-invert prose-headings:font-serif">
          <h1 className="text-center font-serif text-5xl font-bold mb-12">About NexusFaith</h1>
          
          <p className="lead text-xl text-muted-foreground">
            We exist to bridge the gap between rigorous scientific inquiry and sincere biblical faith.
          </p>

          <h2>Why This Project Exists</h2>
          <p>
            For too long, the cultural narrative has suggested that you must choose between science and faith. 
            This project is for seekers, students, parents, pastors, and engineers who suspect that the truth 
            is more unified than that.
          </p>
          <p>
            We believe that the same God who wrote the Bible also wrote the laws of nature. Therefore, when 
            understood correctly, science and scripture will not contradict, but complement one another.
          </p>

          <h2>Who It Is For</h2>
          <ul>
            <li><strong>Seekers</strong> asking the big questions about origin and meaning.</li>
            <li><strong>Students</strong> navigating faith in secular academic environments.</li>
            <li><strong>Pastors</strong> looking for resources to equip their congregations.</li>
            <li><strong>Engineers & Scientists</strong> who want to integrate their work with their worldview.</li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            We welcome honest questions. We believe truth has nothing to fear from inquiry. Our tone is 
            charitable, our method is logic-driven, and our goal is clarity.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
