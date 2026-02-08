import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SkillCategory } from "@/data/mechSkills";

interface CategoryProgressProps {
    categories: SkillCategory[];
    skillProgress: Record<string, number>;
}

export function CategoryProgress({ categories, skillProgress }: CategoryProgressProps) {
    const getCategoryProgress = (category: SkillCategory): number => {
        if (category.skills.length === 0) return 0;
        const total = category.skills.reduce((sum, skill) => sum + (skillProgress[skill.id] || 0), 0);
        return Math.round(total / category.skills.length);
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => {
                const progress = getCategoryProgress(category);
                return (
                    <Card key={category.id} className="hover:border-primary/30 transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <span className="text-xl">{category.icon}</span>
                                {category.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">{category.skills.length} skills</span>
                                <span className="font-bold text-primary">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
