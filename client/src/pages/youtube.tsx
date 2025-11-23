import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";
import { youtubeConfig } from "@/lib/content";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

export default function YouTubePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="YouTube Channel" 
        description="Watch our latest videos on science, faith, and technology." 
      />
      <SiteHeader />
      
      <main>
        <section className="bg-secondary/30 py-20">
          <div className="container px-4 md:px-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-red-600 text-white rounded-full mb-6 shadow-lg">
              <Youtube className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif mb-6">
              Watch & Learn
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Deep dives into cosmology, biology, AI, and philosophy. Visual explanations for complex topics.
            </p>
            <Button asChild size="lg" className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white border-transparent">
              <a href={youtubeConfig.channelUrl} target="_blank" rel="noopener noreferrer">
                Subscribe to Channel
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 container px-4 md:px-8">
          <h2 className="text-2xl font-bold font-serif mb-8">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeConfig.featured.map((video) => (
              <div key={video.videoId} className="space-y-3">
                <YouTubeEmbed videoId={video.videoId} title={video.title} />
                <h3 className="text-lg font-semibold leading-tight">{video.title}</h3>
              </div>
            ))}
            {/* Add some placeholders to fill the grid for the mockup since we only have 1 real video in config */}
            <div className="space-y-3 opacity-50">
               <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-dashed">
                 <p className="text-sm font-medium">Coming Soon</p>
               </div>
               <h3 className="text-lg font-semibold leading-tight">The Mystery of Consciousness</h3>
            </div>
            <div className="space-y-3 opacity-50">
               <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-dashed">
                 <p className="text-sm font-medium">Coming Soon</p>
               </div>
               <h3 className="text-lg font-semibold leading-tight">Quantum Mechanics & Reality</h3>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
