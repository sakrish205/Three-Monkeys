
import { Sparkles, BrainCircuit, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AIChatInsights({
    intervention,
    loading,
    domain,
    onPivotClick
}: {
    intervention: any;
    loading: boolean;
    domain: string;
    onPivotClick: (skill: string) => void;
}) {
    if (loading) {
        return (
            <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start opacity-70">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                        Analyze the current market surge for {domain} in India.
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 animate-pulse">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="bg-amber-50 p-4 rounded-2xl rounded-tl-none border border-amber-100 shadow-sm w-full animate-pulse">
                        <div className="h-4 bg-amber-200/50 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-amber-200/50 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!intervention) return null;

    return (
        <div className="space-y-6 mb-10">
            {/* User Message Simulation */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 items-start justify-end"
            >
                <div className="bg-blue-600 text-white p-3 px-4 rounded-3xl rounded-tr-none text-sm shadow-md">
                    Analyze the current market surge for <span className="font-bold underline">{domain}</span> in India.
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-inner">
                    <User className="h-4 w-4 text-blue-600" />
                </div>
            </motion.div>

            {/* AI Narrative Response */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 items-start"
            >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-amber-50">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 space-y-4">
                    <Card className="p-6 rounded-3xl rounded-tl-none border-0 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-xl shadow-amber-500/5 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BrainCircuit className="h-24 w-24 text-amber-600" />
                        </div>

                        <div className="relative">
                            <h4 className="text-amber-900 font-bold mb-3 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                                Live Market Intervention
                            </h4>
                            <p className="text-amber-950/80 leading-relaxed text-base font-medium">
                                {intervention.rationale}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-amber-100 flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">From</span>
                                    <span className="text-sm font-bold text-red-500 line-through">{intervention.plannedSkill}</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-amber-400" />
                                <button
                                    onClick={() => onPivotClick(intervention.targetSkill)}
                                    className="px-4 py-2 bg-amber-500 rounded-2xl shadow-md text-white flex items-center gap-2 hover:bg-amber-600 hover:scale-105 transition-all group/btn"
                                >
                                    <span className="text-[10px] font-bold text-amber-100 uppercase">To</span>
                                    <span className="text-sm font-bold">{intervention.targetSkill}</span>
                                </button>
                                <div className="px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-black shadow-sm">
                                    +{intervention.increase}% DEMAND
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
