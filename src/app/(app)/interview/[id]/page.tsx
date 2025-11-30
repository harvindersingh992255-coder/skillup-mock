
'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mic, MicOff, SkipForward, Video, Type, Square } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// SpeechRecognition might not be available on all browsers, and might have different vendor prefixes.
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || (window as any).webkitSpeechRecognition)) || null;


export default function InterviewPage({ params }: { params: { id: string } }) {
  const [inputType, setInputType] = useState("video");
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

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
      // Silently fail if not supported, the mic button just won't work.
      // We could show a toast, but it might be annoying.
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
        if(isRecording) { // If it stops unexpectedly, restart it.
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
          setTranscript(""); // Clear previous transcript
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


  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground">Question 3 of 10</p>
        <Progress value={30} className="w-full max-w-sm mx-auto mt-2" />
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold">
            Tell me about a time you had to handle a difficult stakeholder. How did you manage the situation?
          </h2>
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
                onChange={(e) => setTranscript(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" disabled={isRecording}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
                size="lg" 
                className="rounded-full w-20 h-20"
                onClick={handleMicClick}
                variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
            <Button variant="ghost" size="icon" disabled={isRecording}>
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" disabled={isRecording}>
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
