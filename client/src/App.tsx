import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import TopicPage from "@/pages/topic-page";
import FAQ from "@/pages/faq";
import YouTubePage from "@/pages/youtube";
import About from "@/pages/about";
import { content } from "@/lib/content";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cosmology">
        {() => <TopicPage data={content["cosmology"]} />}
      </Route>
      <Route path="/biology">
        {() => <TopicPage data={content["biology"]} />}
      </Route>
      <Route path="/ai-and-technology">
        {() => <TopicPage data={content["ai-and-technology"]} />}
      </Route>
      <Route path="/philosophy">
         {() => <TopicPage data={content["philosophy"]} />}
      </Route>
      <Route path="/faq" component={FAQ} />
      <Route path="/youtube" component={YouTubePage} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
