'use server';
/**
 * @fileOverview Analyzes the user's body language during the interview and provides feedback.
 *
 * - analyzeBodyLanguageAndProvideFeedback - A function that handles the body language analysis and feedback process.
 * - AnalyzeBodyLanguageAndProvideFeedbackInput - The input type for the analyzeBodyLanguageAndProvideFeedback function.
 * - AnalyzeBodyLanguageAndProvideFeedbackOutput - The return type for the analyzeBodyLanguageAndProvideFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBodyLanguageAndProvideFeedbackInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video recording of the user during the interview, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description for the interview.'),
  interviewQuestions: z.string().describe('The interview questions asked.'),
  userResponses: z.string().describe('The user responses to the interview questions.'),
});
export type AnalyzeBodyLanguageAndProvideFeedbackInput = z.infer<typeof AnalyzeBodyLanguageAndProvideFeedbackInputSchema>;

const AnalyzeBodyLanguageAndProvideFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe('Overall feedback on the user\'s body language during the interview.'),
  areasForImprovement: z.array(z.string()).describe('Specific areas for improvement in the user\'s body language.'),
});
export type AnalyzeBodyLanguageAndProvideFeedbackOutput = z.infer<typeof AnalyzeBodyLanguageAndProvideFeedbackOutputSchema>;

export async function analyzeBodyLanguageAndProvideFeedback(input: AnalyzeBodyLanguageAndProvideFeedbackInput): Promise<AnalyzeBodyLanguageAndProvideFeedbackOutput> {
  return analyzeBodyLanguageAndProvideFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBodyLanguageAndProvideFeedbackPrompt',
  input: {schema: AnalyzeBodyLanguageAndProvideFeedbackInputSchema},
  output: {schema: AnalyzeBodyLanguageAndProvideFeedbackOutputSchema},
  prompt: `You are an expert body language analyst specializing in providing feedback on interview performance.

You will analyze the user's body language during the interview based on the provided video, job description, interview questions, and user responses.

Provide overall feedback and identify specific areas for improvement.

Job Description: {{{jobDescription}}}
Interview Questions: {{{interviewQuestions}}}
User Responses: {{{userResponses}}}
Video: {{media url=videoDataUri}}

Consider factors such as eye contact, posture, gestures, and facial expressions.

Output the results in a JSON format with 'overallFeedback' and 'areasForImprovement' fields.  The areasForImprovement field should be an array of strings.  Each string should be a short actionable item.
`,
});

const analyzeBodyLanguageAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeBodyLanguageAndProvideFeedbackFlow',
    inputSchema: AnalyzeBodyLanguageAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeBodyLanguageAndProvideFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
