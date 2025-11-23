import { BlogPost, YouTubeConfig } from "./types";

export const youtubeConfig: YouTubeConfig = {
  channelUrl: "https://www.youtube.com/watch?v=_CcjoOpHU6U",
  featured: [
    {
      title: "Can Science and Faith Work Together?",
      videoId: "_CcjoOpHU6U"
    }
  ]
};

export const content: Record<string, BlogPost> = {
  "cosmology": {
    slug: "cosmology",
    title: "Cosmology & Physics",
    description: "Big Bang beginnings, fine-tuning, and the order that makes science possible.",
    date: "2025-11-23",
    content: `
# Cosmology & Physics

Modern cosmology points to a universe with a beginning and laws fine-tuned for life. These discoveries don’t “prove God,” but they are exactly the sort of features you’d expect if an intelligent Creator wanted a world discoverable by science.

## Big Bang and a Beginning
Evidence like cosmic expansion and the cosmic microwave background supports a finite beginning. That aligns comfortably with "In the beginning..."

## Fine-Tuning
Small changes to constants like gravity or the strong nuclear force would make stars or chemistry impossible. Explanations vary (design, multiverse, unknown mechanisms), yet design remains a reasonable inference.

## Entropy and Order
Low initial entropy allowed structure to emerge. Our ordered cosmos is the canvas on which science paints.

### Further Reading
*   [Placeholder] The Goldilocks Enigma
*   [Placeholder] A Fortunate Universe
    `
  },
  "biology": {
    slug: "biology",
    title: "Biology",
    description: "From DNA’s information to biomimicry—complexity that inspires wonder.",
    date: "2025-11-23",
    content: `
# Biology

DNA stores digital-like information in a four-letter code. Cells use molecular machines and complex networks that often outclass human engineering. Many believers accept evolutionary mechanisms while rejecting the claim that nature is purposeless. Evolution can be seen as a tool within divine providence.

## Information in DNA
The specific arrangement of bases in DNA carries instructions, much like software code.

## Molecular Machines
The bacterial flagellum and ATP synthase act as rotary motors, displaying irreducible complexity that suggests forethought.

## Human Dignity
Beyond mere biology, humans possess a unique moral worth and capacity for relationship, reflecting the *imago Dei*.

### Further Reading
*   [Placeholder] Signature in the Cell
*   [Placeholder] Darwin's Doubt
    `
  },
  "ai-and-technology": {
    slug: "ai-and-technology",
    title: "AI & Technology",
    description: "What our creative tools reveal about intelligence, meaning, and limits.",
    date: "2025-11-23",
    content: `
# AI & Technology

AI systems come from intelligent agents, careful design, and training. That analogy helps some people see natural complexity as more consistent with Mind than with blind chance. At the same time, AI highlights the mystery of consciousness and the ethical responsibility to use technology for good.

## Creativity and Logic
Human creativity reflects a Creator. AI mimics this but lacks the subjective experience of "meaning."

## Ethics of AI
We are called to stewardship—using technology for healing, justice, and flourishing, rather than control or deception.

### Further Reading
*   [Placeholder] 2084: Artificial Intelligence and the Future of Humanity
*   [Placeholder] The Age of AI
    `
  },
  "philosophy": {
    slug: "philosophy",
    title: "Philosophy & Methods",
    description: "Faith and reason as partners; how to think well about science and Scripture.",
    date: "2025-11-23",
    content: `
# Philosophy & Methods

Science assumes order and intelligibility; faith offers a ground for why such order exists. Miracles are special actions by the law-giver, not denials of the laws. When strong scientific evidence and Scripture seem to conflict, thoughtful interpretation on both sides helps truth meet truth.

## Faith and Reason
Faith is not opposed to reason; it is the trust in the ultimate rationality of the universe's Source.

## Miracles
A miracle is an intervention, like a hand catching a falling apple—not a violation of gravity, but the introduction of a new agent.

### Further Reading
*   [Placeholder] Where the Conflict Really Lies
*   [Placeholder] Philosophy of Science: A Very Short Introduction
    `
  }
};

export const faqs = [
  {
    question: "Isn’t faith just believing without evidence?",
    answer: "In the Bible, faith is trust based on testimony, experience, and reasons. It’s not a refusal to think; it’s a commitment to seek truth. Blind faith is not the biblical model."
  },
  {
    question: "What about Galileo?",
    answer: "The conflict was complex, involving politics, personality, and interpretation. The broader history shows many devout scientists and strong church support for learning. It wasn't simply 'Science vs. Religion'."
  },
  {
    question: "Can I accept evolution and follow the Bible?",
    answer: "Many Christians believe God could use evolutionary processes as a means of creation. The core theological claim is that God is the Author, regardless of the mechanism."
  },
  {
    question: "Doesn’t entropy rule out order?",
    answer: "Entropy refers to closed systems. The earth is an open system receiving energy from the sun. However, the *origin* of the universe's low entropy state is a significant pointer to initial fine-tuning."
  },
  {
    question: "Are miracles anti-science?",
    answer: "Science describes the normal patterns of nature. Miracles are claimed as exceptional events where the Author acts within the story. If God exists, He is not bound by the rules He sustains."
  },
  {
    question: "Is fine-tuning real or hype?",
    answer: "It is widely accepted by physicists that the constants of nature are balanced on a razor's edge. The debate is about *why*—chance, multiverse, or design."
  }
];
