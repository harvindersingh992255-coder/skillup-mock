
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

const focusAreas = [
  { id: "star-method", label: "STAR Method" },
  { id: "clarity", label: "Clarity & Conciseness" },
  { id: "confidence", label: "Confidence" },
  { id: "technical-depth", label: "Technical Depth" },
  { id: "storytelling", label: "Storytelling" },
];

export default function PracticePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Setup Your Mock Interview</CardTitle>
          <CardDescription>
            Customize your practice session to match the roles you're applying for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="job-role">Job Role</Label>
                <Select>
                  <SelectTrigger id="job-role">
                    <SelectValue placeholder="Select a job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-engineer">Software Engineer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="ux-designer">UX Designer</SelectItem>
                    <SelectItem value="marketing-associate">Marketing Associate</SelectItem>
                    <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                    <SelectItem value="systems-analyst">Systems Analyst</SelectItem>
                    <SelectItem value="network-administrator">Network Administrator</SelectItem>
                    <SelectItem value="cybersecurity-analyst">Cybersecurity Analyst</SelectItem>
                    <SelectItem value="ai-ml-engineer">AI/ML Engineer</SelectItem>
                    <SelectItem value="business-analyst">Business Analyst</SelectItem>
                    <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
                    <SelectItem value="management-consultant">Management Consultant</SelectItem>
                    <SelectItem value="human-resources-manager">Human Resources Manager</SelectItem>
                    <SelectItem value="sales-representative">Sales Representative</SelectItem>
                    <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
                    <SelectItem value="content-writer">Content Writer</SelectItem>
                    <SelectItem value="customer-service-representative">Customer Service Representative</SelectItem>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="operations-manager">Operations Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="e-commerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="telecommunications">Telecommunications</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="non-profit">Non-profit</SelectItem>
                    <SelectItem value="transportation-logistics">Transportation & Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="interview-type">Interview Type</Label>
                    <Select defaultValue="behavioral">
                        <SelectTrigger id="interview-type">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="duration">Session Duration</Label>
                    <Select defaultValue="15">
                        <SelectTrigger id="duration">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Difficulty Level</Label>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-muted-foreground">Easy</span>
                <Slider defaultValue={[2]} max={4} step={1} />
                <span className="text-sm text-muted-foreground">Hard</span>
              </div>
            </div>
            
            <div className="grid gap-3">
              <Label>Custom Focus Areas</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {focusAreas.map(area => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox id={area.id} />
                    <Label htmlFor={area.id} className="font-normal">{area.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="ghost">Save as Template</Button>
                <Button asChild size="lg">
                    {/* The link should be dynamic in a real app */}
                    <Link href="/interview/123">Start Interview</Link>
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
