import type { ResumeAnalysis } from "../types";
import { MOCK_RESUME_ANALYSIS } from "../data/mockResume";

// Simulating extraction and analysis logic
export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
    return new Promise((resolve) => {
        // Simulate processing time
        setTimeout(() => {
            console.log(`Analyzing file: ${file.name} (${file.size} bytes)`);
            // In a real app, this would extract text and call an AI API.
            // Here we just return mock analysis.
            // We can slightly modify the mock based on file name or size if needed.
            const result = { ...MOCK_RESUME_ANALYSIS };
            result.formatting.fileType = file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
            result.formatting.parsingSuccess = true;
            resolve(result);
        }, 2000); // 2 seconds delay
    });
}
