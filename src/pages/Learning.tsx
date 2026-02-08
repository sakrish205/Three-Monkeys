import { useState, useEffect } from "react";
import { Search, GraduationCap, BookOpen, Target, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from "@/components/learning/SkillCard";
import { CategoryProgress } from "@/components/learning/CategoryProgress";
import { SKILL_CATEGORIES, getAllSkills } from "@/data/mechSkills";
import { motion } from "framer-motion";

// localStorage key for progress
const PROGRESS_KEY = 'mechguru_skill_progress';

export default function Learning() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [skillProgress, setSkillProgress] = useState<Record<string, number>>({});
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

    // Load progress from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(PROGRESS_KEY);
        if (saved) {
            setSkillProgress(JSON.parse(saved));
        }
    }, []);

    // Save progress to localStorage
    const saveProgress = (newProgress: Record<string, number>) => {
        setSkillProgress(newProgress);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    };

    // Handle marking skill as complete
    const handleMarkComplete = (skillId: string) => {
        const current = skillProgress[skillId] || 0;
        const newValue = current === 0 ? 50 : 100; // Toggle: 0 -> 50 (started) -> 100 (complete)
        saveProgress({ ...skillProgress, [skillId]: newValue });
    };

    // Calculate overall progress
    const allSkills = getAllSkills();
    const overallProgress = allSkills.length > 0
        ? Math.round(allSkills.reduce((sum, s) => sum + (skillProgress[s.id] || 0), 0) / allSkills.length)
        : 0;

    // Filter skills by category, search, and difficulty
    const filteredSkills = allSkills.filter(skill => {
        const matchesCategory = activeCategory === "all" || skill.category === activeCategory;
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === 'all' || skill.difficulty === difficultyFilter;
        return matchesCategory && matchesSearch && matchesDifficulty;
    });

    return (
        <div className="container max-w-6xl mx-auto py-8 space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                        <GraduationCap className="h-6 w-6" />
                        <span className="text-xs font-bold uppercase tracking-wider">Mech Skills Hub</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Skill Development Center</h1>
                    <p className="text-muted-foreground text-lg">
                        Industry-aligned roadmaps with curated resources for ME students.
                    </p>
                </div>

                <Card className="min-w-[280px] bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-lg font-bold text-primary">{overallProgress}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-3">
                            {allSkills.filter(s => (skillProgress[s.id] || 0) === 100).length} of {allSkills.length} skills completed
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Category Overview */}
            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Skill Categories
                </h2>
                <CategoryProgress categories={SKILL_CATEGORIES} skillProgress={skillProgress} />
            </section>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search skills..."
                        className="pl-10 h-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-1 bg-muted rounded-lg p-1">
                        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(level => (
                            <Button
                                key={level}
                                size="sm"
                                variant={difficultyFilter === level ? 'default' : 'ghost'}
                                onClick={() => setDifficultyFilter(level)}
                                className="capitalize text-xs"
                            >
                                {level === 'all' ? 'All Levels' : level}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
                <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
                    <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        All Skills
                    </TabsTrigger>
                    {SKILL_CATEGORIES.map(cat => (
                        <TabsTrigger
                            key={cat.id}
                            value={cat.id}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            {cat.icon} {cat.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={activeCategory} className="mt-0">
                    {filteredSkills.length === 0 ? (
                        <Card className="p-8 text-center">
                            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No skills found matching your search.</p>
                        </Card>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredSkills.map(skill => (
                                <SkillCard
                                    key={skill.id}
                                    skill={skill}
                                    progress={skillProgress[skill.id] || 0}
                                    onMarkComplete={handleMarkComplete}
                                    isExpanded={expandedSkill === skill.id}
                                    onToggle={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Quick Stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid gap-4 md:grid-cols-3"
            >
                <Card className="bg-red-500/10 border-red-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-600">🔥 High Demand</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{allSkills.filter(s => s.demandLevel === 'high').length}</p>
                        <p className="text-xs text-muted-foreground">Skills in high market demand</p>
                    </CardContent>
                </Card>
                <Card className="bg-amber-500/10 border-amber-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-amber-600">⚡ Emerging</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{allSkills.filter(s => s.demandLevel === 'emerging').length}</p>
                        <p className="text-xs text-muted-foreground">Growing industry trends</p>
                    </CardContent>
                </Card>
                {allSkills.filter(s => (skillProgress[s.id] || 0) === 100).length > 0 && (
                    <Card className="bg-green-500/10 border-green-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-600">✅ Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{allSkills.filter(s => (skillProgress[s.id] || 0) === 100).length}</p>
                            <p className="text-xs text-muted-foreground">Skills you've mastered</p>
                        </CardContent>
                    </Card>
                )}
            </motion.div>
        </div>
    );
}
