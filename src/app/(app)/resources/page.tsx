
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

const resourceSections = [
  {
    title: "Interview Techniques",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    resources: [
      {
        title: "Mastering the STAR Method",
        description: "A comprehensive guide to structuring your answers for behavioral questions.",
      },
      {
        title: "Top 10 Common Interview Mistakes",
        description: "Learn what to avoid to make a great impression.",
      },
      {
        title: "Body Language for Confidence",
        description: "Tips on posture, eye contact, and gestures.",
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
      },
      {
        title: "Salary Negotiation 101",
        description: "Expert advice on navigating the salary conversation.",
      },
      {
        title: "Whiteboard Coding Interview Practice",
        description: "Watch a senior engineer solve a common problem.",
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
        },
        {
            title: "Building Your Personal Brand on LinkedIn",
            description: "Strategies to enhance your professional online presence.",
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

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Tips & Resources</h1>
        <p className="text-muted-foreground">
          Your curated library of content to help you excel in your interviews.
        </p>
      </div>

      <div className="grid gap-8">
        {resourceSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center gap-4">
                {section.icon}
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.resources.map((resource) => (
                  <Link href={`/resources/${resource.slug}`} key={resource.title} className="group block">
                    <Card className="h-full hover:bg-secondary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
