import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { youtubeConfig } from "@/lib/content";

export function SiteHeader() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Handle dark mode toggle
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Cosmology", href: "/cosmology" },
    { name: "Biology", href: "/biology" },
    { name: "AI & Tech", href: "/ai-and-technology" },
    { name: "Philosophy", href: "/philosophy" },
    { name: "Faith Answers", href: "/faith-answers" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <a className="flex items-center space-x-2 font-serif text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
              <span className="text-primary">Nexus</span>Faith
            </a>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "transition-colors hover:text-primary",
                location === item.href ? "text-primary" : "text-foreground/60"
              )}>
                {item.name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild className="hidden lg:flex gap-2" variant="default">
            <a href={youtubeConfig.channelUrl} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" />
              Watch on YouTube
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="space-y-1 px-4 py-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                    location === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            <div className="mt-6 px-3">
              <Button asChild className="w-full gap-2">
                <a href={youtubeConfig.channelUrl} target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 py-12 md:py-16">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="font-serif text-xl font-bold tracking-tighter">
                <span className="text-primary">Nexus</span>Faith
              </a>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Exploring the harmony between scientific discovery and biblical faith.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Topics</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cosmology"><a className="hover:text-primary">Cosmology</a></Link></li>
              <li><Link href="/biology"><a className="hover:text-primary">Biology</a></Link></li>
              <li><Link href="/ai-and-technology"><a className="hover:text-primary">AI & Technology</a></Link></li>
              <li><Link href="/philosophy"><a className="hover:text-primary">Philosophy</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faith-answers"><a className="hover:text-primary">Faith Answers</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary">About</a></Link></li>
              <li><Link href="/faq"><a className="hover:text-primary">FAQ</a></Link></li>
              <li><Link href="/youtube"><a className="hover:text-primary">YouTube Channel</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href={youtubeConfig.channelUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} NexusFaith. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
