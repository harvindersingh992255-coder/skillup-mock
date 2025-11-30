'use server';

/**
 * @fileOverview A flow to generate interview questions based on the specified job role and industry.
 *
 * - generateInterviewQuestions - A function that generates interview questions.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import Handlebars from 'handlebars';

// Define a helper function for Handlebars to create a range of numbers
Handlebars.registerHelper('range', function(n: number) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
});


const GenerateInterviewQuestionsInputSchema = z.object({
  jobRole: z.string().describe('The job role for which interview questions should be generated.'),
  industry: z.string().describe('The industry to which the job role belongs.'),
  interviewType: z.enum(['behavioral', 'technical', 'general']).default('general').describe('The type of interview questions to generate.'),
  difficultyLevel: z.enum(['easy', 'medium', 'hard']).default('medium').describe('The difficulty level of the interview questions.'),
  sessionDuration: z.number().default(30).describe('The duration of the interview session in minutes.'),
  numQuestions: z.number().default(10).describe('The number of interview questions to generate.'),
});
export type GenerateInterviewQuestionsInput = z.infer<typeof GenerateInterviewQuestionsInputSchema>;

const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of generated interview questions.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<typeof GenerateInterviewQuestionsOutputSchema>;

export async function generateInterviewQuestions(input: GenerateInterviewQuestionsInput): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const generateInterviewQuestionsPrompt = ai.definePrompt({
  name: 'generateInterviewQuestionsPrompt',
  input: {schema: GenerateInterviewQuestionsInputSchema},
  output: {schema: GenerateInterviewQuestionsOutputSchema},
  prompt: `You are an expert interviewer who generates realistic and challenging interview questions for candidates.

  Based on the specified job role, industry, interview type, difficulty level, session duration and number of questions, generate a list of interview questions.

  Job Role: {{{jobRole}}}
  Industry: {{{industry}}}
  Interview Type: {{{interviewType}}}
  Difficulty Level: {{{difficultyLevel}}}
  Session Duration: {{{sessionDuration}}} minutes
  Number of Questions: {{{numQuestions}}}

  The output should be a JSON object with a "questions" field containing an array of strings. Do not number the questions in the output.
  `,
});



const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateInterviewQuestionsPrompt(input);
    return output!;
  }
);
