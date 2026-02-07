import type { ResumeAnalysis } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Real resume analysis using backend API
export async function analyzeResume(file: File, jobDescription?: string): Promise<ResumeAnalysis> {
    try {
        console.log(`📤 Uploading resume: ${file.name} (${file.size} bytes)`);
        console.log(`🎯 JD provided: ${jobDescription ? 'Yes' : 'No'}`);

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('resumeFile', file);
        if (jobDescription && jobDescription.trim()) {
            formData.append('jobDescription', jobDescription.trim());
        }

        // Call backend API
        const response = await fetch(`${API_URL}/api/analyze-resume`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result: ResumeAnalysis = await response.json();

        // Ensure formatting field exists
        if (!result.formatting) {
            result.formatting = {
                fileType: file.name.split('.').pop()?.toUpperCase() || 'PDF',
                parsingSuccess: true
            };
        }

        console.log("✅ Analysis complete:", result);
        return result;

    } catch (error) {
        console.error("❌ Analysis failed:", error);

        // If backend is not running or API key is missing, throw meaningful error
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Backend server is not running. Please start the Python backend server.');
        }

        throw error;
    }
}

// Check if backend is available
export async function checkBackendHealth(): Promise<{ available: boolean; geminiConfigured: boolean }> {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        if (response.ok) {
            const data = await response.json();
            return {
                available: true,
                geminiConfigured: data.gemini_api_configured || false
            };
        }
        return { available: false, geminiConfigured: false };
    } catch {
        return { available: false, geminiConfigured: false };
    }
}
