import { TrendingUp, DollarSign, Briefcase } from "lucide-react";

export const MARKET_TRENDS = [
    { month: "Jan", demand: 45, supply: 30 },
    { month: "Feb", demand: 52, supply: 35 },
    { month: "Mar", demand: 48, supply: 32 },
    { month: "Apr", demand: 65, supply: 38 },
    { month: "May", demand: 72, supply: 42 },
    { month: "Jun", demand: 85, supply: 45 },
];

export const TOP_SKILLS = [
    { name: "Electric Vehicle Design", demand: 92, growth: "+120%", category: "Core" },
    { name: "IIoT & Industry 4.0", demand: 88, growth: "+85%", category: "Tech" },
    { name: "Mechatronics", demand: 85, growth: "+60%", category: "Core" },
    { name: "Python for Engineers", demand: 78, growth: "+95%", category: "Tech" },
    { name: "Renewable Energy Systems", demand: 82, growth: "+75%", category: "Core" },
];

export const JOB_ALERTS = [
    {
        id: 1,
        role: "Robotics Design Engineer",
        company: "Tata Motors",
        location: "Pune, Maharashtra",
        salary: "₹12L - ₹18L",
        match: 95,
        posted: "2 days ago",
        tags: ["ROS", "Python", "SolidWorks"],
        description: "Join Tata Motors' advanced robotics division to design the next generation of automated assembly lines for EVs."
    },
    {
        id: 2,
        role: "Mechanical Systems Engineer",
        company: "Mahindra & Mahindra",
        location: "Bengaluru, Karnataka",
        salary: "₹10L - ₹15L",
        match: 88,
        posted: "5 hours ago",
        tags: ["CATIA", "FEA", "Automotive"],
        description: "Focus on vehicle dynamics and structural integrity for India's leading SUV manufacturer."
    },
    {
        id: 3,
        role: "Precision Engineer",
        company: "Larsen & Toubro (L&T)",
        location: "Chennai, Tamil Nadu",
        salary: "₹9L - ₹14L",
        match: 82,
        posted: "1 day ago",
        tags: ["GD&T", "CNC", "Manufacturing"],
        description: "Execute high-precision engineering projects for critical infrastructure and defense sectors."
    },
];

export const MARKET_INSIGHTS = [
    {
        title: "PLI Scheme Impact",
        description: "India's manufacturing sector is seeing a massive uptick due to Production Linked Incentives.",
        icon: TrendingUp,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        title: "EV Boom",
        description: "The EV component market in India is expected to grow at 35% CAGR through 2026.",
        icon: Briefcase,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        title: "Skill Premium",
        description: "Engineers with hybrid 'Mechanical + Electronics' skills command 40% higher salaries in Pune/Bengaluru.",
        icon: DollarSign,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
];
