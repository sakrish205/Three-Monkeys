import type { ResumeAnalysis } from "@/types";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface AnalysisReportProps {
    analysis: ResumeAnalysis;
}

export function AnalysisReport({ analysis }: AnalysisReportProps) {
    return (
        <div className="space-y-6">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Word Count</p>
                    <p className="text-2xl font-bold">{analysis.wordCount}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Parsing Status</p>
                    <div className="flex items-center gap-2 text-green-500 font-semibold mt-1">
                        <CheckCircle className="h-5 w-5" />
                        Success
                    </div>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">File Type</p>
                    <p className="text-2xl font-bold">{analysis.formatting.fileType}</p>
                </div>
            </div>

            {/* Sections Check */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Required Sections</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(analysis.sections).map(([section, present]) => (
                        <div key={section} className={`flex items-center gap-2 p-2 rounded-md ${present ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                            {present ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                            <span className="capitalize font-medium">{section}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keywords */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Keyword Match Analysis</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Found Keywords</p>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keywords.found.map((kw, idx) => {
                                const isFromJD = kw.includes("(from JD)");
                                const displayText = kw.replace(" (from JD)", "");
                                return (
                                    <span
                                        key={`${kw}-${idx}`}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${isFromJD
                                                ? "bg-blue-100 text-blue-700 border-2 border-blue-400 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600"
                                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                            }`}
                                    >
                                        {displayText}
                                        {isFromJD && " 🎯"}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Missing Important Keywords</p>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keywords.missing.map((kw, idx) => {
                                const isFromJD = kw.includes("(from JD)");
                                const displayText = kw.replace(" (from JD)", "");
                                return (
                                    <span
                                        key={`${kw}-${idx}`}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${isFromJD
                                                ? "bg-orange-100 text-orange-700 border-2 border-orange-400 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-600"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                            }`}
                                    >
                                        {displayText}
                                        {isFromJD && " 📌"}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Improvements */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-amber-500" />
                    Suggested Improvements
                </h3>
                <ul className="space-y-3">
                    {analysis.improvements.map((imp, i) => (
                        <li key={i} className="flex gap-3 items-start">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
                            <p className="text-sm leading-relaxed">{imp}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
