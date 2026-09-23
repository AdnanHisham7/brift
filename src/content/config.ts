import { defineCollection, z } from 'astro:content';


const featuresCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string().optional(),
    description: z.string(),
    steps: z.array(
      z.object({
        number: z.number(),
        title: z.string(),
        text: z.string(),
      })
    ).optional(),
    bulletPoints: z.array(z.string()).optional(),
    imageKey: z.string(),
    order: z.number(),
  }),
});

const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['pricing', 'operations', 'onboarding']),
    order: z.number(),
  }),
});

// Phase 2 Blog collection schema scaffolded
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Adnan Hisham'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  features: featuresCollection,
  faq: faqCollection,
  blog: blogCollection,
};
