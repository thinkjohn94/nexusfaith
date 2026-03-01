import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/ui/layout";
import { SEO } from "@/components/ui/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Microscope, 
  Heart, 
  Scroll, 
  Atom, 
  Brain, 
  Hands,
  Copy,
  Share2,
  BookOpen,
  Quote,
  Loader2
} from "lucide-react";

// Answer database with scholarly content
const answerDatabase = {
  evolution: {
    keywords: ['evolution', 'darwin', 'creation', 'species', 'natural selection', 'macro', 'micro'],
    elementary: {
      answer: "God used an amazing process called evolution to create different animals and plants over a very long time! Think of it like God being a master artist who paints a beautiful picture step by step. Evolution shows us how creative and smart God is - He made natural laws that can create incredible diversity of life.",
      sources: "Francis Collins (The Language of God), John Polkinghorne"
    },
    teen: {
      answer: "Evolution and faith aren't enemies - they're different ways of understanding God's creation. Many top Christian scientists see evolution as God's method of creation. The real miracle is the fine-tuning of natural laws that makes evolution possible at all. The chances of getting DNA, protein folding, and cellular machinery just right are astronomically small without intelligent design.",
      sources: "Francis Collins (The Language of God), Hugh Ross (Reasons to Believe), Alister McGrath"
    },
    advanced: {
      answer: "Theistic evolution reconciles scientific evidence with biblical faith through several frameworks: (1) God as primary cause working through secondary causes (natural processes), (2) Fine-tuning arguments for the laws and constants that make evolution possible, (3) Information theory challenges for the origin of genetic information, (4) The anthropic principle suggesting purposeful direction. Key distinction: microevolution (observed) vs. macroevolution (inferred) and the information problem in abiogenesis.",
      sources: "Stephen Meyer (Darwin's Doubt), William Dembski (The Design Inference), Michael Behe (Darwin's Black Box), Francis Collins, John Polkinghorne"
    }
  },
  suffering: {
    keywords: ['suffering', 'evil', 'pain', 'bad things', 'tragedy', 'disaster', 'why', 'theodicy'],
    elementary: {
      answer: "Sometimes bad things happen because people make wrong choices, and sometimes it's just part of living in a world that isn't perfect yet. But God is always with us during hard times, and He promises to make everything good in the end. Jesus suffered too, so He understands our pain.",
      sources: "C.S. Lewis (The Lion, the Witch and the Wardrobe), Philip Yancey (Where Is God When It Hurts?)"
    },
    teen: {
      answer: "The problem of evil is tough, but there are good reasons why an all-loving God might allow suffering: (1) Free will - love requires choice, even the choice to do wrong, (2) Character building - some virtues like courage only develop through challenges, (3) Natural laws - the same physics that enables life also enables earthquakes. God didn't stay distant from suffering - He entered into it through Jesus.",
      sources: "C.S. Lewis (The Problem of Pain), Philip Yancey (Where Is God When It Hurts?), Tim Keller (Walking with God through Pain)"
    },
    advanced: {
      answer: "Classical theodicies address the problem of evil through: (1) Free Will Defense (Plantinga) - moral evil results from libertarian free will necessary for genuine love, (2) Soul-Making Theodicy (Hick) - suffering enables spiritual development and virtue formation, (3) Greater Good Defense - some goods logically require the possibility of corresponding evils, (4) Natural Law Defense - consistent physical laws that enable life also permit natural disasters. The incarnation demonstrates God's solidarity with human suffering.",
      sources: "Alvin Plantinga (God, Freedom, and Evil), John Hick (Evil and the God of Love), William Lane Craig (Hard Questions, Real Answers), Richard Swinburne (Providence and the Problem of Evil)"
    }
  },
  jesus: {
    keywords: ['jesus', 'christ', 'historical', 'resurrection', 'gospel', 'bible', 'evidence'],
    elementary: {
      answer: "We have really good reasons to believe Jesus was a real person who did amazing things! Many people who weren't even Christians wrote about Him. The disciples were so sure about what they saw that they were willing to die for it. People don't die for something they know is a lie!",
      sources: "Lee Strobel (The Case for Christ - Kids Edition), Josh McDowell (Evidence That Demands a Verdict)"
    },
    teen: {
      answer: "The historical evidence for Jesus is actually very strong: (1) Multiple independent sources confirm His existence, (2) The resurrection accounts show signs of authentic testimony (women witnesses, embarrassing details), (3) The rapid spread of Christianity despite persecution suggests something extraordinary happened, (4) The transformation of the disciples from cowards to martyrs needs explanation.",
      sources: "Gary Habermas (The Historical Jesus), N.T. Wright (The Resurrection of the Son of God), Lee Strobel (The Case for Christ)"
    },
    advanced: {
      answer: "Historical Jesus research employs rigorous methodology: (1) Multiple attestation across independent sources (Mark, Q, M, L, Paul, Josephus), (2) Criterion of embarrassment - early Christians wouldn't invent unflattering details, (3) Criterion of dissimilarity - elements unlike Jewish/Hellenistic thought likely authentic, (4) Early dating of sources (Paul's creed in 1 Cor 15 within 3-5 years). The resurrection hypothesis best explains: empty tomb, post-mortem appearances, origin of Christian faith, and Sunday worship.",
      sources: "N.T. Wright (The Resurrection of the Son of God), Gary Habermas & Michael Licona (The Case for the Resurrection), Craig Blomberg (The Historical Reliability of the Gospels), Richard Bauckham (Jesus and the Eyewitnesses)"
    }
  },
  finetuning: {
    keywords: ['fine-tuning', 'universe', 'constants', 'design', 'cosmological', 'anthropic', 'multiverse'],
    elementary: {
      answer: "Scientists have discovered that the universe is perfectly set up for life - like someone adjusted all the dials just right! If gravity was a tiny bit stronger or weaker, if atoms were slightly different, we couldn't exist. It's like finding a radio perfectly tuned to your favorite station - someone must have set it!",
      sources: "Hugh Ross (The Creator and the Cosmos), William Lane Craig (Reasonable Faith)"
    },
    teen: {
      answer: "The fine-tuning of the universe is incredible evidence for design. Over 30 physical constants and quantities must fall within extremely narrow ranges for life to exist. The strong nuclear force, electromagnetic force, expansion rate of the universe - change any of these by tiny amounts and you get no stars, no elements, no life. The odds are astronomical.",
      sources: "Hugh Ross (Improbable Planet), Robin Collins (God and Design), William Lane Craig (Reasonable Faith)"
    },
    advanced: {
      answer: "Fine-tuning arguments demonstrate design through: (1) Cosmological constants (cosmological constant, initial entropy, expansion rate), (2) Fundamental forces (strong/weak nuclear, electromagnetic, gravitational ratios), (3) Particle masses and properties enabling chemistry. Multiverse objections face problems: (1) Boltzmann brain paradox, (2) Measure problem, (3) Lack of empirical evidence, (4) Observer selection effects don't eliminate design inference. The fine-tuning argument remains robust.",
      sources: "Robin Collins (The Well-Tempered Universe), Luke Barnes (A Fortunate Universe), William Lane Craig & James Sinclair (The Kalam Cosmological Argument), Hugh Ross (More Than a Theory)"
    }
  },
  ai: {
    keywords: ['ai', 'artificial intelligence', 'consciousness', 'soul', 'mind', 'robot'],
    elementary: {
      answer: "AI is like really smart computers that can think and learn! But they're different from people because God gave us special souls and the ability to love, create, and choose between right and wrong. AI can be a wonderful tool to help people, just like God wants us to use our gifts to help others.",
      sources: "John Lennox (2084: Artificial Intelligence and the Future of Humanity)"
    },
    teen: {
      answer: "AI raises fascinating questions about what makes humans unique. While AI can process information and even seem creative, consciousness, free will, and moral reasoning point to something beyond pure computation. The 'hard problem of consciousness' - how physical processes create subjective experience - suggests the mind is more than just brain. AI can be a powerful tool for good when guided by biblical wisdom about human dignity and purpose.",
      sources: "John Lennox (2084), David Chalmers (The Conscious Mind), Francis Collins (The Language of God)"
    },
    advanced: {
      answer: "AI consciousness involves several philosophical challenges: (1) The hard problem of consciousness (Chalmers) - qualia and subjective experience, (2) Chinese Room argument (Searle) - syntax vs. semantics, (3) Intentionality and aboutness of mental states, (4) Free will and moral agency. Christian perspectives: consciousness may be emergent from but not reducible to neural activity, the imago Dei includes rational and moral capacities, AI ethics must preserve human dignity. Functional vs. phenomenal consciousness distinction is crucial.",
      sources: "David Chalmers (The Conscious Mind), John Searle (Minds, Brains, and Programs), Alvin Plantinga (Where the Conflict Really Lies), John Lennox (2084), Christian Smith (What Is a Person?)"
    }
  },
  prayer: {
    keywords: ['prayer', 'doubt', 'faith', 'belief', 'god silent', 'unanswered'],
    elementary: {
      answer: "Prayer is like talking to God, who loves you very much! Sometimes we don't get the answer we want right away, but God always hears us and knows what's best. Even when we have doubts, it's okay - that just means we're thinking seriously about God, which He likes!",
      sources: "Philip Yancey (Prayer: Does It Make Any Difference?), C.S. Lewis (Letters to Malcolm)"
    },
    teen: {
      answer: "Doubt isn't the opposite of faith - it's often part of growing in faith. Even biblical heroes like David and Job had doubts. Prayer works in mysterious ways: sometimes God says yes, sometimes no, sometimes wait. The goal isn't always getting what we want, but growing closer to God and aligning our hearts with His purposes.",
      sources: "Philip Yancey (Prayer: Does It Make Any Difference?), Timothy Keller (Prayer), Os Guinness (God in the Dark)"
    },
    advanced: {
      answer: "Prayer and doubt interface with several philosophical issues: (1) Petitionary prayer vs. divine sovereignty - how do requests interact with God's eternal plan? (2) Evidential problem - statistical studies of prayer show mixed results, but methodological issues limit conclusions, (3) Psychological benefits vs. ontological reality - prayer's effects on the pray-er don't negate objective efficacy, (4) Doubt as epistemic virtue - Cartesian vs. Reformed epistemology approaches to belief formation.",
      sources: "Eleonore Stump (Petitionary Prayer), Timothy Keller (Prayer), Alvin Plantinga (Warranted Christian Belief), Philip Yancey (Prayer: Does It Make Any Difference?)"
    }
  }
};

type DifficultyLevel = 'elementary' | 'teen' | 'advanced';
type TopicKey = keyof typeof answerDatabase;

interface Answer {
  category: string;
  answer: string;
  sources: string;
}

const topics = [
  { key: 'evolution' as TopicKey, name: 'Evolution & Creation', icon: Microscope, color: 'bg-blue-500' },
  { key: 'suffering' as TopicKey, name: 'Problem of Evil', icon: Heart, color: 'bg-red-500' },
  { key: 'jesus' as TopicKey, name: 'Historical Jesus', icon: Scroll, color: 'bg-amber-600' },
  { key: 'finetuning' as TopicKey, name: 'Fine-Tuning', icon: Atom, color: 'bg-purple-500' },
  { key: 'ai' as TopicKey, name: 'AI & Consciousness', icon: Brain, color: 'bg-green-500' },
  { key: 'prayer' as TopicKey, name: 'Prayer & Doubt', icon: Hands, color: 'bg-indigo-500' }
];

const difficultyLevels = [
  { key: 'elementary' as DifficultyLevel, name: 'Elementary', description: 'Ages 6-12', icon: '🌱' },
  { key: 'teen' as DifficultyLevel, name: 'Teen', description: 'Ages 13-18', icon: '🔬' },
  { key: 'advanced' as DifficultyLevel, name: 'Advanced', description: 'College & Beyond', icon: '🎓' }
];

export default function FaithAnswers() {
  // Force deployment trigger - Feb 28, 2026
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('teen');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicClick = (topicKey: TopicKey) => {
    const exampleQuestions = {
      evolution: "How do I explain evolution to my Christian kid?",
      suffering: "Why does God allow suffering?",
      jesus: "What evidence is there for Jesus?",
      finetuning: "Is the universe designed?",
      ai: "What does AI mean for the soul?",
      prayer: "Why doesn't God answer my prayers?"
    };
    setQuestion(exampleQuestions[topicKey]);
  };

  const processQuestion = (inputQuestion: string): Answer | null => {
    const lowerQuestion = inputQuestion.toLowerCase();
    
    let bestMatch: { key: TopicKey; score: number } | null = null;
    let highestScore = 0;
    
    Object.keys(answerDatabase).forEach((key) => {
      const topicKey = key as TopicKey;
      const data = answerDatabase[topicKey];
      let score = 0;
      
      data.keywords.forEach(keyword => {
        if (lowerQuestion.includes(keyword)) {
          score += 1;
        }
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = { key: topicKey, score };
      }
    });
    
    if (bestMatch) {
      const topic = answerDatabase[bestMatch.key];
      return {
        category: bestMatch.key,
        answer: topic[selectedDifficulty].answer,
        sources: topic[selectedDifficulty].sources
      };
    }
    
    // Default response for unrecognized questions
    const defaultResponses = {
      elementary: "That's a great question! Faith and science both help us understand God's amazing creation. Even when we don't have all the answers, we can trust that God is good and loving. Keep asking questions - that's how we grow in our understanding!",
      teen: "Great question! This is exactly the kind of thoughtful inquiry that strengthens faith. While we might not have complete answers to every question, the evidence for God's existence through science, history, and philosophy is compelling. Faith and reason work together, not against each other.",
      advanced: "This question touches on important issues in apologetics and theology. I'd recommend exploring resources from scholars like William Lane Craig, Alvin Plantinga, N.T. Wright, and John Lennox who address faith-reason integration from various angles. The goal is always educated faith that can engage honestly with difficult questions."
    };
    
    return {
      category: 'general',
      answer: defaultResponses[selectedDifficulty],
      sources: "C.S. Lewis (Mere Christianity), William Lane Craig (Reasonable Faith), Timothy Keller (The Reason for God)"
    };
  };

  const handleFindAnswer = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      const result = processQuestion(question);
      setAnswer(result);
      setIsLoading(false);
    }, 1200);
  };

  const handleCopyAnswer = async () => {
    if (answer) {
      await navigator.clipboard.writeText(`${answer.answer}\n\nSources: ${answer.sources}`);
    }
  };

  const handleShare = async () => {
    if (answer && navigator.share) {
      await navigator.share({
        title: 'Faith Answer from NexusFaith',
        text: `${answer.answer}\n\nSources: ${answer.sources}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Faith Answers" 
        description="Get thoughtful, evidence-based answers to tough faith questions. Stop settling for 'just have faith' - discover scholarly responses backed by leading Christian thinkers." 
      />
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
              Faith Answers 🧠✝️
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Evidence-Based Responses for Thoughtful Believers
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed text-foreground/90">
                Stop settling for "just have faith." Get thoughtful, evidence-based answers backed by scholars like 
                <strong className="text-primary"> C.S. Lewis, William Lane Craig, N.T. Wright, and Hugh Ross</strong>. 
                Choose a difficulty level, pick a topic or type your own question.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Difficulty Level Selector */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {difficultyLevels.map((level, index) => (
              <motion.div
                key={level.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedDifficulty === level.key 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedDifficulty(level.key)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="text-3xl mb-2">{level.icon}</div>
                    <CardTitle className="text-lg">{level.name}</CardTitle>
                    <CardDescription>{level.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Topic Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  onClick={() => handleTopicClick(topic.key)}
                >
                  <topic.icon className={`h-6 w-6 text-white p-1 rounded ${topic.color}`} />
                  <span className="text-xs text-center">{topic.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Question Input */}
        <section className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Ask Your Question
              </CardTitle>
              <CardDescription>
                Type your question or click a topic above to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., Why does God allow suffering? Does prayer work? Is there evidence for Jesus?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  Level: {difficultyLevels.find(d => d.key === selectedDifficulty)?.name}
                </Badge>
                <Button 
                  onClick={handleFindAnswer} 
                  disabled={!question.trim() || isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Find Answer'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Answer Display */}
        {answer && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Quote className="h-5 w-5 text-primary" />
                    <CardTitle>Your Answer</CardTitle>
                  </div>
                  <Badge variant="outline">
                    {difficultyLevels.find(d => d.key === selectedDifficulty)?.name} Level
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-foreground leading-relaxed">{answer.answer}</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">📚 Recommended Sources:</h4>
                  <p className="text-sm text-muted-foreground">{answer.sources}</p>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={handleCopyAnswer}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Answer
                  </Button>
                  {navigator.share && (
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Example/Demo Section */}
        {!answer && (
          <section className="text-center">
            <Card className="max-w-2xl mx-auto bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">1️⃣</span>
                    </div>
                    <p className="font-medium">Choose Level</p>
                    <p className="text-muted-foreground">Elementary, Teen, or Advanced</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">2️⃣</span>
                    </div>
                    <p className="font-medium">Ask Question</p>
                    <p className="text-muted-foreground">Type or select a topic</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">3️⃣</span>
                    </div>
                    <p className="font-medium">Get Answer</p>
                    <p className="text-muted-foreground">With scholarly sources</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Transform "just have faith" conversations into meaningful discussions backed by evidence and scholarship.
                </p>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}