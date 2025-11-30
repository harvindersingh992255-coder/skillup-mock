'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText } from "lucide-react";
import { slugify } from "@/lib/utils";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const resourceSections = [
  {
    title: "Interview Techniques",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    resources: [
      {
        title: "Mastering the STAR Method",
        description: "A comprehensive guide to structuring your answers for behavioral questions.",
        content: `
          <p>The STAR method is a structured manner of responding to a behavioral-based interview question by discussing the specific <strong>S</strong>ituation, <strong>T</strong>ask, <strong>A</strong>ction, and <strong>R</strong>esult of the situation you are describing.</p>
          <h3 class="font-bold mt-4 mb-2">Situation</h3>
          <p>Describe the context within which you performed a job or faced a challenge at work. This should be a specific event or situation, not a generalized description of what you have done in the past. Be sure to include details about where, when, and with whom this took place.</p>
          <h3 class="font-bold mt-4 mb-2">Task</h3>
          <p>Next, describe your responsibility in that situation. You might have been required to help your team complete a project within a tight deadline, resolve a conflict with a coworker, or hit a specific sales target.</p>
          <h3 class="font-bold mt-4 mb-2">Action</h3>
          <p>Here, you describe how you completed the task or endeavored to meet the challenge. Focus on what you did. What specific steps did you take and what was your particular contribution? Be sure to use the word “I,” not “we,” to describe your actions.</p>
          <h3 class="font-bold mt-4 mb-2">Result</h3>
          <p>Finally, explain the outcomes or results of your action. It's often best to quantify the results if possible. For example, you could say, “As a result, we increased customer satisfaction by 15% over the next quarter.”</p>
        `
      },
      {
        title: "Top 10 Common Interview Mistakes",
        description: "Learn what to avoid to make a great impression.",
        content: "<p>This guide will walk you through the most common pitfalls candidates fall into during interviews and how you can avoid them. From arriving late to speaking negatively about past employers, we cover it all. </p>"
      },
      {
        title: "Body Language for Confidence",
        description: "Tips on posture, eye contact, and gestures.",
        content: "<p>Non-verbal communication is just as important as what you say. This article provides actionable tips on how to project confidence through your body language, including maintaining good posture, making steady eye contact, and using gestures effectively.</p>"
      }
    ]
  },
  {
    title: "Video Tutorials",
    icon: <Video className="w-6 h-6 text-primary" />,
    resources: [
      {
        title: "How to Answer 'Tell Me About Yourself'",
        description: "A 5-minute video breaking down the perfect opening.",
        content: "<p>This video tutorial breaks down how to craft the perfect answer to the most common interview question. We provide a structure and examples to help you make a strong first impression.</p>"
      },
      {
        title: "Salary Negotiation 101",
        description: "Expert advice on navigating the salary conversation.",
        content: "<p>Learn the do's and don'ts of salary negotiation. This video covers how to research your worth, when to bring up salary, and how to handle the conversation with confidence.</p>"
      },
      {
        title: "Whiteboard Coding Interview Practice",
        description: "Watch a senior engineer solve a common problem.",
        content: "<p>Follow along as a senior software engineer walks through a common whiteboard problem, explaining their thought process from understanding the problem to arriving at an optimal solution.</p>"
      }
    ]
  },
  {
    title: "Resume & Career Guides",
    icon: <FileText className="w-6 h-6 text-primary" />,
    resources: [
        {
            title: "How to Tailor Your Resume for Each Job",
            description: "Optimize your resume to get past applicant tracking systems.",
            content: "<p>Learn why a one-size-fits-all resume doesn't work and how to customize your resume for each specific job application to highlight the most relevant skills and experiences. </p>"
        },
        {
            title: "Building Your Personal Brand on LinkedIn",
            description: "Strategies to enhance your professional online presence.",
            content: "<p>Your LinkedIn profile is a key part of your personal brand. This guide offers strategies for optimizing your profile, creating engaging content, and building a professional network.</p>"
        }
    ]
  }
].map(section => ({
  ...section,
  resources: section.resources.map(resource => ({
    ...resource,
    slug: slugify(resource.title)
  }))
}));


export default function ResourcePage() {
  const params = useParams<{ slug: string }>();
  const allResources = resourceSections.flatMap(section => section.resources);
  const resource = allResources.find(r => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-6">
            <Button asChild variant="ghost">
                <Link href="/resources" className="flex items-center gap-2 text-muted-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Resources
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
            <CardTitle className="text-3xl">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl dark:prose-invert prose-headings:font-headline prose-p:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: resource.content }} 
                />
            </CardContent>
        </Card>
    </div>
  );
}
