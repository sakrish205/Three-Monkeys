
import { MARKET_INSIGHTS } from "@/data/mockMarket";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecommendationPanel({ recommendation, onViewRoadmap }: { recommendation?: any; onViewRoadmap: () => void }) {
    // Use passed recommendation or a generic one
    const displayRec = recommendation || {
        role: "Robotics Simulation Engineer",
        match: 85,
        description: "Based on your skills in 'SolidWorks' and interest in 'Coding'."
    };

    return (
        <div className="space-y-4">
            <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <div className="flex gap-3">
                    <div className="mt-1 p-2 bg-indigo-100 dark:bg-indigo-800 rounded-full h-fit">
                        <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">AI Career Pivot</h4>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                            You are {displayRec.match}% ready for a <span className="font-bold">{displayRec.role}</span> role. {displayRec.description}
                        </p>
                        <Button
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 mt-1 h-8 text-xs"
                            onClick={onViewRoadmap}
                        >
                            View Roadmap <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {MARKET_INSIGHTS.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <div key={index} className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div className={`p-2 rounded-md h-fit ${insight.bgColor}`}>
                                <Icon className={`h-4 w-4 ${insight.color}`} />
                            </div>
                            <div>
                                <h5 className="font-medium text-sm">{insight.title}</h5>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                    {insight.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
