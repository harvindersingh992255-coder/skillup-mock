'use server';

/**
 * @fileOverview AI agent that analyzes spoken responses during mock interviews and provides feedback.
 *
 * - analyzeSpokenResponse - Function to analyze the spoken response and provide feedback.
 * - AnalyzeSpokenResponseInput - Input type for analyzeSpokenResponse.
 * - AnalyzeSpokenResponseOutput - Output type for analyzeSpokenResponse.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSpokenResponseInputSchema = z.object({
  jobRole: z.string().describe('The job role for the interview.'),
  industry: z.string().describe('The industry for the interview.'),
  question: z.string().describe('The question asked during the interview.'),
  response: z.string().describe('The spoken response from the user.'),
});

export type AnalyzeSpokenResponseInput = z.infer<
  typeof AnalyzeSpokenResponseInputSchema
>;

const AnalyzeSpokenResponseOutputSchema = z.object({
  score: z.number().describe('The score for the response (0-100).'),
  feedback: z.string().describe('Feedback on the response.'),
  improvementSuggestions: z
    .string()
    .describe('Suggestions for improving the response.'),
});

export type AnalyzeSpokenResponseOutput = z.infer<
  typeof AnalyzeSpokenResponseOutputSchema
>;

export async function analyzeSpokenResponse(
  input: AnalyzeSpokenResponseInput
): Promise<AnalyzeSpokenResponseOutput> {
  return analyzeSpokenResponseFlow(input);
}

const analyzeSpokenResponsePrompt = ai.definePrompt({
  name: 'analyzeSpokenResponsePrompt',
  input: {schema: AnalyzeSpokenResponseInputSchema},
  output: {schema: AnalyzeSpokenResponseOutputSchema},
  prompt: `You are an AI interview coach. Analyze the candidate's response to the interview question and provide feedback and a score.

Job Role: {{jobRole}}
Industry: {{industry}}
Question: {{question}}
Response: {{response}}

Provide a score (0-100), feedback, and suggestions for improvement.  The output should be formatted as a JSON object.

Make sure to explain why you gave the score you did, what was good and bad about the response.
`,
});

const analyzeSpokenResponseFlow = ai.defineFlow(
  {
    name: 'analyzeSpokenResponseFlow',
    inputSchema: AnalyzeSpokenResponseInputSchema,
    outputSchema: AnalyzeSpokenResponseOutputSchema,
  },
  async input => {
    const {output} = await analyzeSpokenResponsePrompt(input);
    return output!;
  }
);
