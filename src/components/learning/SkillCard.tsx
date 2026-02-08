import { ChevronDown, ChevronUp, ExternalLink, Clock, Flame, Zap, CheckCircle2, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Skill } from "@/data/mechSkills";

interface SkillCardProps {
    skill: Skill;
    progress: number;
    onMarkComplete: (skillId: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export function SkillCard({ skill, progress, onMarkComplete, isExpanded, onToggle }: SkillCardProps) {
    const isCompleted = progress === 100;

    const demandIcon = {
        high: <Flame className="h-3 w-3 text-red-500" />,
        emerging: <Zap className="h-3 w-3 text-amber-500" />,
        stable: <CheckCircle2 className="h-3 w-3 text-green-500" />
    };

    const demandLabel = {
        high: 'High Demand',
        emerging: 'Emerging',
        stable: 'Stable'
    };

    const difficultyColor = {
        beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
        intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        advanced: 'bg-red-500/10 text-red-600 border-red-500/20'
    };

    return (
        <Card className={`transition-all ${isCompleted ? 'border-primary/50 bg-primary/5' : ''} ${isExpanded ? 'ring-2 ring-primary/30' : 'hover:border-primary/30'}`}>
            <CardHeader className="pb-2 cursor-pointer" onClick={onToggle}>
                <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            {skill.name}
                            {isCompleted && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </CardTitle>
                        {!isCompleted && (
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                        )}
                        {isCompleted && (
                            <p className="text-sm text-primary font-medium">✅ Skill Mastered</p>
                        )}
                    </div>
                    <Button variant="ghost" size="sm">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Show badges only when NOT completed */}
                {!isCompleted && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className={difficultyColor[skill.difficulty]}>
                            {skill.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                            {demandIcon[skill.demandLevel]}
                            {demandLabel[skill.demandLevel]}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {skill.estimatedHours}h
                        </Badge>
                    </div>
                )}

                {/* Show completion summary when completed */}
                {isCompleted && (
                    <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-primary text-primary-foreground">
                            <Trophy className="h-3 w-3 mr-1" />
                            Completed
                        </Badge>
                        <span className="text-xs text-muted-foreground">{skill.estimatedHours}h invested</span>
                    </div>
                )}

                {/* Show progress bar only when in progress (not 0, not 100) */}
                {progress > 0 && progress < 100 && (
                    <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>
                )}
            </CardHeader>

            {isExpanded && (
                <CardContent className="pt-4 border-t">
                    {skill.resources && skill.resources.length > 0 ? (
                        <>
                            <h4 className="text-sm font-semibold mb-3">Learning Resources</h4>
                            <div className="space-y-2">
                                {skill.resources.map((resource, idx) => (
                                    <a
                                        key={idx}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                                    >
                                        <div>
                                            <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                                {resource.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {resource.type} • {resource.free ? '✅ Free' : '💎 Paid'}
                                            </p>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                    </a>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No resources available yet.
                        </p>
                    )}

                    <div className="flex gap-2 mt-4">
                        {!isCompleted ? (
                            <Button size="sm" className="flex-1" onClick={() => onMarkComplete(skill.id)}>
                                {progress === 0 ? 'Start Learning' : 'Mark Complete'}
                            </Button>
                        ) : (
                            <Badge className="w-full justify-center py-2 bg-primary/10 text-primary border-primary/20">
                                <Trophy className="h-4 w-4 mr-2" />
                                Skill Mastered!
                            </Badge>
                        )}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
