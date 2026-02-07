import type { ResumeAnalysis } from "../types";

// Generate dynamic scores for more realistic demo
const generateDynamicScore = () => Math.floor(Math.random() * 15 + 70); // 70-85

export const MOCK_RESUME_ANALYSIS: ResumeAnalysis = {
    score: generateDynamicScore(),
    atsCompatibility: generateDynamicScore(),
    wordCount: Math.floor(Math.random() * 200 + 350), // 350-550
    keywords: {
        found: ["CAD", "SolidWorks", "AutoCAD", "Design", "Manufacturing"],
        missing: ["ANSYS", "FEA", "Pro/E", "Simulation", "GD&T"],
    },
    skills: {
        technical: ["Mechanical Design", "CAD/CAM", "Thermodynamics", "Material Science"],
        soft: ["Problem Solving", "Team Collaboration", "Technical Communication"],
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
        "Add quantifiable metrics to your design projects (e.g., 'Reduced production cost by 15%').",
        "Include specific CAD software versions and proficiency levels.",
        "Highlight any manufacturing process improvements or innovations.",
        "Add certifications like Six Sigma, PMP, or relevant engineering licenses.",
    ],
};
