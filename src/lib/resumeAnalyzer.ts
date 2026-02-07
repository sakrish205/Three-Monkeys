import type { ResumeAnalysis } from "../types";
import { MOCK_RESUME_ANALYSIS } from "../data/mockResume";


// Helper function to extract keywords from job description
function extractKeywordsFromJD(jd: string): string[] {
    // Simple keyword extraction - in real app, this would use NLP/AI
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'our', 'your', 'we', 'you']);

    const words = jd
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));

    // Count frequency
    const frequency = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Get top keywords by frequency
    const keywords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

    return keywords;
}

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
            if (jobDescription && jobDescription.trim().length > 0) {
                // Extract some "keywords" from JD (simulate AI extraction)
                const jdKeywords = extractKeywordsFromJD(jobDescription);

                // Simulate slightly different results when JD is provided
                result.score = Math.min(result.score + 8, 95);
                result.atsCompatibility = Math.min(result.atsCompatibility + 10, 98);

                // Add JD-specific keywords found
                result.keywords.found = [...result.keywords.found, ...jdKeywords.slice(0, 3)];

                // Add JD-specific missing keywords
                result.keywords.missing = [...result.keywords.missing, ...jdKeywords.slice(3, 5)];

                // Add JD-tailored improvements at the top
                result.improvements = [
                    `✅ Your resume matches ${Math.floor(Math.random() * 20 + 60)}% of the job description keywords!`,
                    `💡 Consider emphasizing these JD skills: ${jdKeywords.slice(0, 2).join(", ")}`,
                    `🎯 Tailor your experience section to highlight projects related to: ${jdKeywords[0]}`,
                    ...result.improvements
                ];
            }

            result.formatting.fileType = file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
            result.formatting.parsingSuccess = true;
            resolve(result);
        }, 2000); // 2 seconds delay
    });
}
