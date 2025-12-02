"use client";

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

const SpeechRecognition =
  (typeof window !== "undefined" &&
    (window.SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
  null;

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

  // 🔥 STATIC QUESTIONS FOR DEMO (NO API NEEDED)
  useEffect(() => {
    setIsLoadingQuestions(true);

    const demoQuestions = [
      "Tell me about yourself.",
      "Why should we hire you?",
      "What are your greatest strengths?",
      "Describe a challenge you faced and how you solved it.",
      "Where do you see yourself in 5 years?",
      "Why do you want this job?"
    ];

    setQuestions(demoQuestions);
    setAnswers(new Array(demoQuestions.length).fill(""));
    setIsLoadingQuestions(false);
  }, []);

  // CAMERA PERMISSION
  useEffect(() => {
    if (inputType === "video") {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera/Mic Access Denied",
            description: "Please enable camera and microphone permissions.",
          });
        }
      };

      getCameraPermission();

      return () => {
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((t) => t.stop());
        }
      };
    }
  }, [inputType, toast]);

  // SPEECH RECOGNITION
  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript((prev) => (prev ? prev + " " + finalTranscript : finalTranscript));
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
      setTranscript("");
    }
  };

  const submitAndGoToNext = (skipped = false) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = skipped ? "SKIPPED" : transcript;
    setAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setTranscript(updated[currentQuestionIndex + 1] || "");
    } else {
      toast({
        title: "Interview complete!",
        description: "Redirecting to results...",
      });
      window.location.href = `/results/${params.id}`;
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      const updated = [...answers];
      updated[currentQuestionIndex] = transcript;
      setAnswers(updated);

      setCurrentQuestionIndex((i) => i - 1);
      setTranscript(answers[currentQuestionIndex - 1] || "");
    }
  };

  const hasAnswer = transcript.trim().length > 0;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        {questions.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <Progress
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              className="max-w-sm mx-auto mt-2"
            />
          </>
        )}
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="text-center text-xl font-semibold">
          {questions[currentQuestionIndex]}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col items-center justify-center gap-6">
          <Tabs value={inputType} onValueChange={setInputType}>
            <TabsList>
              <TabsTrigger value="video">
                <Video className="w-4 h-4 mr-2" /> Video Answer
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" /> Text Answer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video">
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center relative">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              </div>
            </TabsContent>

            <TabsContent value="text">
              <Textarea
                placeholder="Type your answer..."
                className="w-full h-48"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button onClick={goBack} disabled={currentQuestionIndex === 0}>
              <ChevronLeft />
            </Button>

            {!hasAnswer ? (
              <Button className="rounded-full w-20 h-20" onClick={handleMicClick}>
                {isRecording ? <Square /> : <Mic />}
              </Button>
            ) : (
              <Button onClick={() => submitAndGoToNext()}>
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Submit"} <Send />
              </Button>
            )}

            <Button
              onClick={() => submitAndGoToNext()}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button onClick={() => submitAndGoToNext(true)}>
          <SkipForward /> Skip
        </Button>
        <Button variant="destructive">
          <Link href={`/results/${params.id}`}>End Interview</Link>
        </Button>
      </div>
    </div>
  );
}
