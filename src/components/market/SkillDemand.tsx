
import { TOP_SKILLS } from "@/data/mockMarket";
import { ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SkillDemand({ skills, loading }: { skills?: any[]; loading?: boolean }) {
    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2 animate-pulse">
                        <div className="flex justify-between">
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                            <div className="h-4 bg-muted rounded w-1/6"></div>
                        </div>
                        <div className="h-2 bg-muted rounded w-full"></div>
                    </div>
                ))}
            </div>
        );
    }
    const displaySkills = skills || TOP_SKILLS;

    return (
        <div className="space-y-6">
            {displaySkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{skill.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${skill.category === 'Tech' ? 'bg-blue-100 text-blue-700' :
                                skill.category === 'Core' ? 'bg-orange-100 text-orange-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                {skill.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                            <ArrowUpRight className="h-3 w-3" />
                            {skill.growth}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Progress value={skill.demand} className="h-2" />
                        <span className="text-xs text-muted-foreground w-8 text-right">{skill.demand}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
