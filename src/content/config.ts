import { defineCollection, z } from 'astro:content';

// Define schemas for different content types
const questionsSchema = z.object({
  category: z.enum(['evolution', 'suffering', 'jesus', 'finetuning', 'ai', 'prayer']),
  difficulty: z.enum(['elementary', 'teen', 'advanced']),
  keywords: z.array(z.string()),
  scholars: z.array(z.string()),
  citations: z.array(z.object({
    author: z.string(),
    title: z.string(),
    source: z.string(),
    year: z.number(),
    page: z.number().optional(),
    url: z.string().url().optional(),
  })),
  lastUpdated: z.date(),
});

const articlesSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  publishDate: z.date(),
  category: z.enum(['evolution', 'suffering', 'jesus', 'finetuning', 'ai', 'prayer']),
  difficulty: z.enum(['elementary', 'teen', 'advanced']),
  scholars: z.array(z.string()),
  citations: z.array(z.object({
    author: z.string(),
    title: z.string(),
    source: z.string(),
    year: z.number(),
    page: z.number().optional(),
    url: z.string().url().optional(),
  })),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
});

const scholarsSchema = z.object({
  name: z.string(),
  title: z.string(),
  affiliation: z.string(),
  specialties: z.array(z.string()),
  majorWorks: z.array(z.object({
    title: z.string(),
    year: z.number(),
    publisher: z.string().optional(),
  })),
  bio: z.string(),
  website: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
});

// Define collections
const questions = defineCollection({
  type: 'content',
  schema: questionsSchema,
});

const articles = defineCollection({
  type: 'content', 
  schema: articlesSchema,
});

const scholars = defineCollection({
  type: 'content',
  schema: scholarsSchema,
});

export const collections = {
  'questions': questions,
  'articles': articles,
  'scholars': scholars,
};