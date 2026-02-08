export interface Resource {
    title: string;
    platform: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    link: string;
}

export interface LearningStep {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    skills: string[];
    resources: Resource[];
}

export const MOCK_LEARNING_PATHS = {
    "Mechanical Engineering": [
        {
            id: "step-1",
            title: "Advanced CAD & Generative Design",
            description: "Master complex surface modeling and AI-driven generative design in Fusion 360/SolidWorks.",
            status: "completed",
            skills: ["Surface Modeling", "Generative Design", "Topology Optimization"],
            resources: [
                { title: "Fusion 360 Generative Design Masterclass", platform: "Coursera", level: "Intermediate", link: "#" },
                { title: "Advanced SolidWorks Certification", platform: "Official", level: "Advanced", link: "#" }
            ]
        },
        {
            id: "step-2",
            title: "Robotic Simulation & ROS",
            description: "Learn to simulate robotic arms and autonomous systems using ROS and NVIDIA Isaac Sim.",
            status: "in-progress",
            skills: ["ROS 2", "Python", "Kinematics"],
            resources: [
                { title: "ROS for Beginners", platform: "Udemy", level: "Beginner", link: "#" },
                { title: "Industrial Robot Programming", platform: "ABB", level: "Intermediate", link: "#" }
            ]
        },
        {
            id: "step-3",
            title: "Digital Twin & Industry 4.0",
            description: "Implement real-time monitoring and virtual commissioning with Azure Digital Twins.",
            status: "upcoming",
            skills: ["IoT", "Azure", "Twin Modeling"],
            resources: [
                { title: "Industry 4.0 Fundamentals", platform: "MIT xPro", level: "Advanced", link: "#" }
            ]
        }
    ],
    "Industrial Automation": [
        {
            id: "step-1",
            title: "PLC Programming (IEC 61131-3)",
            description: "Learn Ladder Logic, Structured Text, and Function Block Diagrams.",
            status: "in-progress",
            skills: ["Siemens TIA Portal", "Ladder Logic"],
            resources: [
                { title: "PLC Fundamentals", platform: "Siemens", level: "Beginner", link: "#" }
            ]
        }
    ]
};
