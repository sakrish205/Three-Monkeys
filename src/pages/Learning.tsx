import { useState } from "react";
import { Search, GraduationCap, Trophy, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LearningPath } from "@/components/learning/LearningPath";
import { MOCK_LEARNING_PATHS, type LearningStep } from "@/data/mockSkills";
import { motion } from "framer-motion";

export default function Learning() {
    const [activeDomain, setActiveDomain] = useState<keyof typeof MOCK_LEARNING_PATHS>("Mechanical Engineering");
    const [searchQuery, setSearchQuery] = useState("");

    const steps = (MOCK_LEARNING_PATHS[activeDomain] || []) as LearningStep[];
    const completedSteps = steps.filter(s => s.status === 'completed').length;
    const progressPercent = (completedSteps / steps.length) * 100;

    const domains = Object.keys(MOCK_LEARNING_PATHS) as (keyof typeof MOCK_LEARNING_PATHS)[];

    return (
        <div className="container max-w-6xl mx-auto py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Adaptive Learning Path</h1>
                    <p className="text-muted-foreground text-lg">
                        Smart roadmaps generated based on industry demand and your skill gaps.
                    </p>
                </div>

                <Card className="min-w-[280px] bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                            <Trophy className="h-3 w-3 text-amber-500" />
                            Next Achievement: Simulation Expert
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search for skill paths..."
                        className="pl-10 h-12 bg-background/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 p-1 bg-muted rounded-lg overflow-x-auto whitespace-nowrap">
                    {domains.map(domain => (
                        <Button
                            key={domain}
                            variant={activeDomain === domain ? "default" : "ghost"}
                            className="h-10 text-sm"
                            onClick={() => setActiveDomain(domain)}
                        >
                            {domain}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Your Personalized Roadmap: {activeDomain}</h2>
                    </div>

                    <LearningPath steps={steps} />
                </div>

                {/* Sidebar Stats */}
                <aside className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent space-y-4"
                    >
                        <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                            <Target className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold">Goal: Core R&D Role</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Based on your resume, you're on track for Robotics Engineer positions.
                            </p>
                        </div>
                        <div className="space-y-3 pt-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Market Readiness</span>
                                <span className="font-semibold">68%</span>
                            </div>
                            <Progress value={68} className="h-1.5" />
                        </div>
                    </motion.div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Search className="h-4 w-4 text-primary" />
                                Skill Scarcity Alert
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-bold text-foreground">Digital Twin</span> skills are currently 40% more in demand than supply in your region.
                            </p>
                            <Button variant="outline" className="w-full text-xs h-8">
                                Prioritize This Skill
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
