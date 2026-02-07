import { useState } from "react";
import { UploadZone } from "@/components/resume/UploadZone";
import { AnalysisReport } from "@/components/resume/AnalysisReport";
import { ATSScoreCard } from "@/components/resume/ATSScoreCard";
import { analyzeResume } from "@/lib/resumeAnalyzer";
import type { ResumeAnalysis } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Textarea } from "@/components/ui/textarea";


export default function Resume() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
    const [jobDescription, setJobDescription] = useState("");

    const handleFileUpload = async (file: File) => {
        setIsAnalyzing(true);
        try {
            const result = await analyzeResume(file, jobDescription);
            setAnalysisResult(result);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
        setJobDescription("");
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
                        className="flex flex-col gap-8 items-center justify-center min-h-[400px]"
                    >
                        <div className="w-full max-w-2xl bg-card border rounded-lg shadow-sm">
                            <div className="p-6 border-b">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">1</span>
                                    Add Job Description (Optional but Recommended)
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 ml-8">
                                    Paste the job description for higher accuracy and role-specific keywords.
                                </p>
                            </div>
                            <div className="p-6">
                                <Textarea
                                    placeholder="Paste job description here..."
                                    className="min-h-[150px] resize-y"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full max-w-2xl bg-card border rounded-lg shadow-sm">
                            <div className="p-6 border-b">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">2</span>
                                    Upload Resume
                                </h3>
                            </div>
                            <div className="p-8">
                                <UploadZone onFileSelect={handleFileUpload} isAnalyzing={isAnalyzing} />
                                {isAnalyzing && (
                                    <div className="mt-8 flex flex-col items-center gap-4 text-muted-foreground">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <p>Analyzing your resume against the job description...</p>
                                    </div>
                                )}
                            </div>
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
