
'use client';

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mic, Send, Square, SkipForward, Video, Type } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { generateInterviewQuestions, GenerateInterviewQuestionsOutput } from "@/ai/flows/generate-interview-questions";
import { Loader2 } from "lucide-react";

// SpeechRecognition might not be available on all browsers, and might have different vendor prefixes.
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || (window as any).webkitSpeechRecognition)) || null;


export default function InterviewPage() {
  const params = useParams<{ id: string }>();
  const [inputType, setInputType] = useState("video");
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoadingQuestions(true);
        // In a real app, these would come from the practice setup page.
        const result: GenerateInterviewQuestionsOutput = await generateInterviewQuestions({
          jobRole: "Software Engineer",
          industry: "Technology",
          interviewType: "behavioral",
          numQuestions: 5,
          difficultyLevel: 'medium',
          sessionDuration: 15
        });
        setQuestions(result.questions);
        setAnswers(new Array(result.questions.length).fill(""));
      } catch (error) {
        console.error("Failed to generate questions:", error);
        toast({
          variant: "destructive",
          title: "Failed to load questions",
          description: "Could not generate interview questions. Please try again.",
        });
        // Fallback to a default question
        const fallbackQuestions = ["Tell me about a time you had to handle a difficult stakeholder. How did you manage the situation?"];
        setQuestions(fallbackQuestions);
        setAnswers(new Array(fallbackQuestions.length).fill(""));
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [toast]);


  useEffect(() => {
    if (inputType === "video") {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera/Mic Access Denied',
            description: 'Please enable camera and microphone permissions in your browser settings.',
          });
        }
      };

      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [inputType, toast]);
  
  useEffect(() => {
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
         setTranscript(prev => prev ? `${prev} ${finalTranscript}` : finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({
            variant: 'destructive',
            title: 'Speech Recognition Error',
            description: `An error occurred: ${event.error}. Please try again.`,
        });
        setIsRecording(false);
    };
    
    recognition.onend = () => {
        if(isRecording) {
            recognition.start();
        }
    }

    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }
  }, [toast, isRecording]);


  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
       if (!SpeechRecognition) {
            toast({
                variant: 'destructive',
                title: 'Browser Not Supported',
                description: 'Speech-to-text is not supported on this browser.',
            });
            return;
        }
        
       navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setTranscript("");
          recognitionRef.current?.start();
          setIsRecording(true);
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            toast({
                variant: 'destructive',
                title: 'Microphone Access Denied',
                description: 'Please enable microphone permissions in your browser settings.',
            });
        });
    }
  };

  const handleAnswerChange = (text: string) => {
    setTranscript(text);
  };

  const submitAndGoToNext = (skipped = false) => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = skipped ? "SKIPPED" : transcript;
    setAnswers(newAnswers);

    // Stop any recording
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTranscript(answers[currentQuestionIndex + 1] || "");
    } else {
      // End of interview
      toast({ title: "Interview complete!", description: "Redirecting to results..."});
      // In a real app, you'd probably POST the answers to a server here.
      // Then redirect.
      window.location.href = `/results/${params.id}`;
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before moving
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = transcript;
      setAnswers(newAnswers);

      if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
      
      setCurrentQuestionIndex(prev => prev - 1);
      setTranscript(answers[currentQuestionIndex - 1] || "");
    }
  }
  
  const hasAnswer = transcript.trim().length > 0;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        {questions.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full max-w-sm mx-auto mt-2" />
          </>
        )}
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="text-center">
          {isLoadingQuestions ? (
             <div className="flex items-center justify-center gap-2 py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p>Generating questions...</p>
             </div>
          ) : (
             <h2 className="text-2xl font-semibold">
                {questions[currentQuestionIndex]}
             </h2>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-6">
          <Tabs value={inputType} onValueChange={setInputType} className="w-full max-w-md flex flex-col items-center">
            <TabsList>
              <TabsTrigger value="video">
                <Video className="w-4 h-4 mr-2" />
                Video Answer
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" />
                Text Answer
              </TabsTrigger>
            </TabsList>
            <TabsContent value="video" className="w-full mt-4">
              <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
                        <Video className="w-16 h-16 text-muted-foreground" />
                        <Alert variant="destructive">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser to record your answer.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <Video className="w-16 h-16 text-muted-foreground" />
                        <p className="text-muted-foreground">Requesting camera access...</p>
                    </div>
                 )}
              </div>
            </TabsContent>
            <TabsContent value="text" className="w-full mt-4">
              <Textarea
                placeholder="Type your answer here, or use the microphone to transcribe..."
                className="w-full h-48 text-base"
                value={transcript}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" disabled={isRecording || currentQuestionIndex === 0} onClick={goToPreviousQuestion}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            {!hasAnswer && (
                 <Button 
                    size="lg" 
                    className="rounded-full w-20 h-20"
                    onClick={handleMicClick}
                    variant={isRecording ? "destructive" : "default"}
                    disabled={isLoadingQuestions}
                >
                  {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>
            )}

            {hasAnswer && (
                <Button size="lg" className="px-6" onClick={() => submitAndGoToNext()}>
                    {currentQuestionIndex === questions.length - 1 ? "Finish Interview" : "Submit Answer"}
                    <Send className="w-4 h-4 ml-2" />
                </Button>
            )}


            <Button variant="ghost" size="icon" disabled={isRecording || currentQuestionIndex === questions.length - 1} onClick={() => submitAndGoToNext()}>
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" disabled={isRecording} onClick={() => submitAndGoToNext(true)}>
          <SkipForward className="w-4 h-4 mr-2" />
          Skip Question
        </Button>
        <Button variant="destructive" asChild disabled={isRecording}>
          <Link href={`/results/${params.id}`}>End Interview</Link>
        </Button>
      </div>
    </div>
  );
}
