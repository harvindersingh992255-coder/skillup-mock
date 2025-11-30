
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, FileCheck2, FileWarning } from 'lucide-react';
import { analyzeResume, type AnalyzeResumeOutput } from '@/ai/flows/analyze-resume';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

function convertFileToText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        // For now, we'll assume PDF and DOCX are not directly readable and ask user to paste text.
        // A real implementation would use a library like pdf-parse or mammoth.js on a server.
        if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target?.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        } else {
             reject(new Error(`File type ${file.type} not supported. Please upload a .txt file or paste the content.`));
        }
    });
}


export default function ResumePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setError(null);
      setAnalysis(null);
      try {
        const text = await convertFileToText(file);
        setResumeText(text);
      } catch (e: any) {
        setError(e.message || 'Could not read file. Please paste the content instead.');
        setResumeText('');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both your resume content and the job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeResume({ resumeContent: resumeText, jobDescription });
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred during analysis. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">AI Resume Analyzer</h1>
        <p className="text-muted-foreground">
          See how your resume stacks up against a job description.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Setup</CardTitle>
          <CardDescription>
            Provide your resume and the job description you're targeting.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="resume-file">Upload Resume (.txt only)</Label>
              <Input id="resume-file" type="file" onChange={handleFileChange} accept=".txt" />
            </div>
             <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="resume-text">Resume Content</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste your resume content here..."
                className="h-48"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                className="h-48"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
          )}
          <div className="flex justify-end">
            <Button onClick={handleAnalyze} disabled={isLoading || !resumeText || !jobDescription}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {analysis && (
        <Card>
            <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Here's the AI-powered breakdown of your resume against the job description.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="text-center flex flex-col items-center gap-2">
                    <p className="text-muted-foreground font-medium">Overall Match Score</p>
                    <div className="w-full max-w-sm">
                        <Progress value={analysis.matchScore} className="h-4" />
                        <p className="text-2xl font-bold mt-2">{analysis.matchScore}%</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="flex-row items-center gap-2 space-y-0">
                            <FileCheck2 className="w-6 h-6 text-accent" />
                            <CardTitle>What Matches</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                {analysis.strengths.map((strength, i) => (
                                    <li key={i}>{strength}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex-row items-center gap-2 space-y-0">
                            <FileWarning className="w-6 h-6 text-destructive" />
                            <CardTitle>What's Missing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                                {analysis.weaknesses.map((weakness, i) => (
                                    <li key={i}>{weakness}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold mb-2">Keyword Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-4">Keywords from the job description and whether they were found in your resume.</p>
                     <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.map((kw, i) => (
                             <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${kw.found ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                {kw.keyword}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Suggestions for Improvement</h3>
                     <ul className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
                        {analysis.suggestions.map((suggestion, i) => (
                            <li key={i}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
