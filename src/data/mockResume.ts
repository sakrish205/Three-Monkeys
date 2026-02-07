import type { ResumeAnalysis } from "../types";

export const MOCK_RESUME_ANALYSIS: ResumeAnalysis = {
    score: 78,
    atsCompatibility: 85,
    wordCount: 450,
    keywords: {
        found: ["React", "TypeScript", "Node.js", "Teamwork", "Agile"],
        missing: ["Docker", "Kubernetes", "GraphQL", "CI/CD"],
    },
    skills: {
        technical: ["Javascript", "HTML/CSS", "Python", "Git"],
        soft: ["Communication", "Problem Solving", "Adaptability"],
    },
    sections: {
        summary: true,
        education: true,
        experience: true,
        projects: true,
        skills: true,
    },
    formatting: {
        fileType: "PDF",
        parsingSuccess: true,
    },
    improvements: [
        "Add more quantifiable metrics to your experience section (e.g., 'Increased efficiency by 20%').",
        "Include links to your GitHub or portfolio projects for better visibility.",
        "Consider adding a 'Certifications' section if you have relevant credentials.",
        "Ensure consistent date formatting throughout the document.",
    ],
};
