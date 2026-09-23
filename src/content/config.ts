import { defineCollection, z } from 'astro:content';

const pricingCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    step: z.string(), // "01", "02", "03"
    setupPrice: z.number(),
    setupPriceFormatted: z.string(),
    monthlyPrice: z.number(),
    monthlyPriceFormatted: z.string(),
    monthlyNote: z.string(),
    tagline: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    isDark: z.boolean().default(false),
    order: z.number(),
  }),
});

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
  pricing: pricingCollection,
  features: featuresCollection,
  faq: faqCollection,
  blog: blogCollection,
};
