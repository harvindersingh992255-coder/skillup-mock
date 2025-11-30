
'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Mic, SkipForward, Video, Type } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function InterviewPage({ params }: { params: { id: string } }) {
  const [inputType, setInputType] = useState("video");
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
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
                placeholder="Type your answer here..."
                className="w-full h-48 text-base"
              />
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button size="lg" className="rounded-full w-20 h-20 bg-accent hover:bg-accent/90">
              <Mic className="w-8 h-8 text-accent-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline">
          <SkipForward className="w-4 h-4 mr-2" />
          Skip Question
        </Button>
        <Button variant="destructive" asChild>
          <Link href={`/results/${params.id}`}>End Interview</Link>
        </Button>
      </div>
    </div>
  );
}
