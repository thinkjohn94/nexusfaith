import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";
import { faqs } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="FAQ" 
        description="Frequently asked questions about science, technology, and biblical faith." 
      />
      <SiteHeader />
      
      <main className="container px-4 md:px-8 py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Honest questions deserve clear, charitable answers.
          </p>

          <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
