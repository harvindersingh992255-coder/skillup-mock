'use server';
/**
 * @fileOverview AI-powered flow that provides personalized practice recommendations and curated content based on user performance and target roles.
 *
 * - providePersonalizedRecommendations - A function that orchestrates the recommendation process.
 * - ProvidePersonalizedRecommendationsInput - The input type for the providePersonalizedRecommendations function.
 * - ProvidePersonalizedRecommendationsOutput - The return type for the providePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvidePersonalizedRecommendationsInputSchema = z.object({
  userPerformanceData: z.string().describe('JSON string containing the user performance data, including scores, feedback, and areas of improvement.'),
  targetRoles: z.string().describe('The target job roles the user is interested in.'),
  careerGoals: z.string().describe('The career goals of the user.'),
});
export type ProvidePersonalizedRecommendationsInput = z.infer<typeof ProvidePersonalizedRecommendationsInputSchema>;

const ProvidePersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('A list of personalized practice recommendations and curated content based on the user performance and target roles.'),
});
export type ProvidePersonalizedRecommendationsOutput = z.infer<typeof ProvidePersonalizedRecommendationsOutputSchema>;

export async function providePersonalizedRecommendations(input: ProvidePersonalizedRecommendationsInput): Promise<ProvidePersonalizedRecommendationsOutput> {
  return providePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'providePersonalizedRecommendationsPrompt',
  input: {schema: ProvidePersonalizedRecommendationsInputSchema},
  output: {schema: ProvidePersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI career coach providing personalized practice recommendations and curated content to users based on their performance data, target roles, and career goals.

  Analyze the following user performance data:
  {{userPerformanceData}}

  Consider the user's target roles:
  {{targetRoles}}

  And their career goals:
  {{careerGoals}}

  Based on this information, provide a list of personalized practice recommendations and curated content to help the user improve specific areas and achieve their career goals.
  Ensure the recommendations are specific, actionable, and aligned with the user's interests and aspirations.

  Format the recommendations as a JSON string.
  `,
});

const providePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'providePersonalizedRecommendationsFlow',
    inputSchema: ProvidePersonalizedRecommendationsInputSchema,
    outputSchema: ProvidePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
