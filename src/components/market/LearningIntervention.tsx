import { TrendingUp, AlertTriangle, ArrowRight, BrainCircuit, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function LearningIntervention({ intervention, loading }: { intervention: any; loading: boolean }) {
    if (loading && !intervention) {
        return (
            <div className="h-48 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 animate-pulse">
                <div className="flex flex-col items-center gap-2 text-white/50">
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
                <Card className="border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-lg shadow-lg shadow-emerald-500/10">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="flex items-center gap-1 bg-emerald-500 text-black px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                            <TrendingUp className="h-3 w-3" /> High Value Pivot
                        </div>
                    </div>

                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500 rounded-lg shadow-md shadow-emerald-500/30">
                                <AlertTriangle className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <CardTitle className="text-lg text-emerald-300">Live Market Intervention</CardTitle>
                                <p className="text-xs text-emerald-400/80 font-medium">
                                    Detected {intervention.increase}% demand surge for "{intervention.targetSkill}" in India
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-sm text-white/70 leading-relaxed">
                            {intervention.rationale}
                        </p>

                        <div className="flex items-center gap-4 bg-black/30 p-3 rounded-lg border border-white/10">
                            <div className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
                                <p className="text-[10px] uppercase text-white/50 font-bold">From</p>
                                <p className="font-semibold text-sm text-red-400">{intervention.plannedSkill}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-emerald-400" />
                            <div className="flex-1 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-center">
                                <p className="text-[10px] uppercase text-emerald-400 font-bold">To</p>
                                <p className="font-bold text-sm text-emerald-300">{intervention.targetSkill}</p>
                            </div>
                            <div className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-center">
                                <p className="text-[10px] uppercase text-cyan-400 font-bold">Demand</p>
                                <p className="font-bold text-sm text-cyan-300">+{intervention.increase}%</p>
                            </div>
                        </div>

                        <div className="pt-2 flex gap-2">
                            <Button size="sm" className="flex-1 gap-2 h-9 text-xs">
                                <Target className="h-4 w-4" />
                                Update My Learning RoadMap
                            </Button>
                            <Button size="sm" variant="outline" className="h-9 text-xs">
                                Ignore
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
