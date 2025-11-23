import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import bgImage from "@assets/generated_images/abstract_geometric_constellation_pattern_background.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
       {/* Background texture/image with overlay */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
        <img src={bgImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-serif"
          >
            Science, Technology <br className="hidden sm:block" />
            & <span className="text-primary">Biblical Faith</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl"
          >
            Science asks how the universe works. Faith asks why there is a universe at all. 
            Far from being enemies, they meet in the same reality: an ordered, intelligible world 
            that invites discovery and meaning.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
              <a href="#topics">Explore Topics</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
              <Link href="/youtube">Watch on YouTube</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
