import { useState, useEffect } from "react";
import { UploadZone } from "@/components/resume/UploadZone";
import { AnalysisReport } from "@/components/resume/AnalysisReport";
import { ATSScoreCard } from "@/components/resume/ATSScoreCard";
import { analyzeResume, checkBackendHealth } from "@/lib/resumeAnalyzer";
import type { ResumeAnalysis } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Textarea } from "@/components/ui/textarea";


export default function Resume() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [backendStatus, setBackendStatus] = useState({ available: false, geminiConfigured: false });

    // Check backend health on mount
    useEffect(() => {
        checkBackendHealth().then(setBackendStatus);
    }, []);

    const handleFileUpload = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        try {
            const result = await analyzeResume(file, jobDescription);
            setAnalysisResult(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Analysis failed";
            setError(errorMessage);
            console.error("Analysis failed:", err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
        setJobDescription("");
        setError(null);
    };

    return (
        <div className="container max-w-5xl mx-auto py-8 space-y-8">
            {/* Backend Status Banner */}
            {!backendStatus.available && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100">Backend Server Not Running</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                Please start the Python backend server to enable real AI-powered analysis.
                                <br />
                                Run: <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">python backend/server.py</code>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!backendStatus.geminiConfigured && backendStatus.available && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Gemini API Not Configured</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                Add your GOOGLE_API_KEY to backend/.env for real analysis.
                                <br />
                                Get your key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Resume Optimizer</h1>
                    <p className="text-muted-foreground mt-2">
                        AI-powered resume optimization for Mechanical Engineering roles.
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
                                {error && (
                                    <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-red-900 dark:text-red-100">Analysis Error</h4>
                                                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                                            </div>
                                        </div>
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
