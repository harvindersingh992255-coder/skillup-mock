
'use server';
/**
 * @fileOverview An AI flow to analyze a resume against a job description.
 *
 * - analyzeResume - A function that analyzes the resume.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeContent: z.string().describe('The full text content of the user\'s resume.'),
  jobDescription: z.string().describe('The full text of the job description the user is applying for.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  matchScore: z.number().min(0).max(100).describe('A percentage score (0-100) indicating how well the resume matches the job description.'),
  strengths: z.array(z.string()).describe('A list of key strengths and qualifications from the resume that align well with the job description.'),
  weaknesses: z.array(z.string()).describe('A list of key requirements from the job description that are missing or not well-represented in the resume.'),
  keywordAnalysis: z.array(z.object({
    keyword: z.string().describe('An important keyword or skill from the job description.'),
    found: z.boolean().describe('Whether the keyword was found in the resume.'),
  })).describe('An analysis of important keywords and skills.'),
  suggestions: z.array(z.string()).describe('Actionable suggestions for improving the resume to better match the job description.'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const analyzeResumePrompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert career coach and resume reviewer. Your task is to analyze a candidate's resume against a specific job description and provide a detailed analysis.

  First, carefully read the entire job description to understand the key requirements, skills, and qualifications.
  Then, read the candidate's resume to identify their experience, skills, and accomplishments.

  Based on your analysis, provide the following in a JSON object:
  1.  **matchScore**: An overall score from 0 to 100 representing the match between the resume and the job. A score of 100 means a perfect match.
  2.  **strengths**: A bulleted list of the top 3-5 ways the resume strongly aligns with the job requirements.
  3.  **weaknesses**: A bulleted list of the top 3-5 most important qualifications or skills mentioned in the job description that are missing or weak in the resume.
  4.  **keywordAnalysis**: Identify the 10-15 most critical keywords/skills from the job description (e.g., "React", "Project Management", "SaaS", "Data Analysis"). For each keyword, indicate whether it was found in the resume.
  5.  **suggestions**: Provide a list of specific, actionable suggestions for the candidate to improve their resume for this specific job application. For example, "Quantify your achievement in the X project by adding a metric like 'Increased efficiency by 15%'." or "Add a section for 'Cloud Technologies' and list your experience with AWS and Azure."

  Job Description:
  ---
  {{{jobDescription}}}
  ---

  Resume Content:
  ---
  {{{resumeContent}}}
  ---
  `,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumePrompt(input);
    return output!;
  }
);
