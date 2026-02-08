import { TrendingUp, AlertTriangle, ArrowRight, BrainCircuit, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function LearningIntervention({ intervention, loading }: { intervention: any; loading: boolean }) {
    if (loading && !intervention) {
        return (
            <div className="h-48 flex items-center justify-center bg-muted/20 rounded-xl border border-dashed animate-pulse">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BrainCircuit className="h-8 w-8 animate-bounce" />
                    <span className="text-sm font-medium">Scanning Market for Interventions...</span>
                </div>
            </div>
        );
    }

    if (!intervention) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={intervention.targetSkill}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative overflow-hidden"
            >
                <Card className="border-2 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20 shadow-lg shadow-amber-500/10">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                            <TrendingUp className="h-3 w-3" /> High Value Pivot
                        </div>
                    </div>

                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500 rounded-lg shadow-md shadow-amber-500/30">
                                <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg text-amber-900 dark:text-amber-100 italic">Market Intervention Alert</CardTitle>
                                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                                    Detected {intervention.increase}% demand surge for "{intervention.targetSkill}" in India
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-amber-200/50">
                            <div className="flex-1 text-center">
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Planned Skill</p>
                                <p className="font-semibold text-sm line-through text-red-500">{intervention.plannedSkill}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-amber-500" />
                            <div className="flex-1 text-center">
                                <p className="text-[10px] uppercase text-amber-600 font-bold">Recommended Pivot</p>
                                <p className="font-bold text-sm text-green-600 dark:text-green-400">{intervention.targetSkill}</p>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="font-bold text-foreground">AI Logic:</span> {intervention.rationale}
                        </p>

                        <div className="pt-2 flex gap-2">
                            <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-2 h-9 text-xs">
                                <Target className="h-4 w-4" />
                                Update My Learning RoadMap
                            </Button>
                            <Button size="sm" variant="outline" className="h-9 text-xs border-amber-200">
                                Ignore
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
