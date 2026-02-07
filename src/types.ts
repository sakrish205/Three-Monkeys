export interface ResumeAnalysis {
    score: number;
    atsCompatibility: number;
    wordCount: number;
    keywords: {
        found: string[];
        missing: string[];
    };
    skills: {
        technical: string[];
        soft: string[];
    };
    sections: {
        summary: boolean;
        education: boolean;
        experience: boolean;
        projects: boolean;
        skills: boolean;
    };
    formatting: {
        fileType: string;
        parsingSuccess: boolean;
    };
    improvements: string[];
}
