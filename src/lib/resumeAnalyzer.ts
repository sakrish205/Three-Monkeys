import type { ResumeAnalysis } from "../types";
import { MOCK_RESUME_ANALYSIS } from "../data/mockResume";

// Simulating extraction and analysis logic
export async function analyzeResume(file: File, jobDescription?: string): Promise<ResumeAnalysis> {
    return new Promise((resolve) => {
        // Simulate processing time
        setTimeout(() => {
            console.log(`Analyzing file: ${file.name} (${file.size} bytes)`);
            if (jobDescription) {
                console.log(`Using Job Description for enhanced accuracy: ${jobDescription.substring(0, 50)}...`);
            }

            // In a real app, this would extract text and call an AI API.
            // Here we just return mock analysis.
            // We can slightly modify the mock based on file name, size, or JD if needed.
            const result = { ...MOCK_RESUME_ANALYSIS };

            // If JD is present, we can simulate a "tailored" analysis
            if (jobDescription) {
                // Simulate slightly different results when JD is provided
                result.score = Math.min(result.score + 5, 95);
                result.atsCompatibility = Math.min(result.atsCompatibility + 5, 98);
                result.keywords.found = [...result.keywords.found, "Role Specific Skill 1"];
                result.improvements = ["Great match for the provided Job Description!", ...result.improvements];
            }

            result.formatting.fileType = file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
            result.formatting.parsingSuccess = true;
            resolve(result);
        }, 2000); // 2 seconds delay
    });
}
