import { CheckCircle2, CircleDashed, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResourceCards } from "./ResourceCards";
import type { LearningStep } from "@/data/mockSkills";

interface LearningPathProps {
    steps: LearningStep[];
}

export function LearningPath({ steps }: LearningPathProps) {
    return (
        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-muted">
            {steps.map((step, index) => (
                <div key={step.id} className="relative pl-12">
                    {/* Timeline Marker */}
                    <div className="absolute left-0 top-1 z-10">
                        {step.status === 'completed' ? (
                            <div className="bg-primary text-primary-foreground p-1 rounded-full border-4 border-background shadow-lg">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        ) : step.status === 'in-progress' ? (
                            <div className="bg-amber-500 text-white p-1 rounded-full border-4 border-background shadow-lg animate-pulse">
                                <CircleDashed className="h-5 w-5" />
                            </div>
                        ) : (
                            <div className="bg-muted text-muted-foreground p-1 rounded-full border-4 border-background">
                                <Lock className="h-5 w-5 scale-75" />
                            </div>
                        )}
                    </div>

                    <Card className={`border-l-4 ${step.status === 'completed' ? 'border-l-primary' :
                            step.status === 'in-progress' ? 'border-l-amber-500' : 'border-l-muted'
                        }`}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-[10px] uppercase font-bold">
                                            Phase {index + 1}
                                        </Badge>
                                        <Badge variant={
                                            step.status === 'completed' ? 'secondary' :
                                                step.status === 'in-progress' ? 'default' : 'outline'
                                        } className="text-[10px]">
                                            {step.status === 'in-progress' ? 'Current Focus' : step.status.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                    <CardTitle>{step.title}</CardTitle>
                                    <CardDescription className="mt-2 text-sm">
                                        {step.description}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {step.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-muted/50 text-xs font-normal">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-semibold mb-4">Recommended Resources</h4>
                                <ResourceCards resources={step.resources} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}
