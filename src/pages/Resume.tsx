import { useState } from "react";
import { UploadZone } from "@/components/resume/UploadZone";
import { AnalysisReport } from "@/components/resume/AnalysisReport";
import { ATSScoreCard } from "@/components/resume/ATSScoreCard";
import { analyzeResume } from "@/lib/resumeAnalyzer";
import type { ResumeAnalysis } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Resume() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);

    const handleFileUpload = async (file: File) => {
        setIsAnalyzing(true);
        try {
            const result = await analyzeResume(file);
            setAnalysisResult(result);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
    };

    return (
        <div className="container max-w-5xl mx-auto py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
                    <p className="text-muted-foreground mt-2">
                        AI-powered resume review with ATS compatibility scoring.
                    </p>
                </div>
                {analysisResult && (
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Upload New Resume
                    </Button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!analysisResult ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg bg-card/50"
                    >
                        <div className="w-full max-w-xl p-8">
                            <UploadZone onFileSelect={handleFileUpload} isAnalyzing={isAnalyzing} />
                            {isAnalyzing && (
                                <div className="mt-8 flex flex-col items-center gap-4 text-muted-foreground">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p>Analyzing your resume...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-6 md:grid-cols-[300px_1fr]"
                    >
                        <div className="space-y-6">
                            <ATSScoreCard score={analysisResult.atsCompatibility} />
                            <div className="bg-card p-6 rounded-lg border shadow-sm">
                                <h3 className="font-semibold mb-2">Detailed Breakdown</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                        <span className="text-muted-foreground">Grammar</span>
                                        <span className="font-medium text-green-500">92%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-muted-foreground">Impact</span>
                                        <span className="font-medium text-amber-500">74%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-muted-foreground">Brevity</span>
                                        <span className="font-medium text-green-500">88%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <AnalysisReport analysis={analysisResult} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
