

import { SkillDemand } from "@/components/market/SkillDemand";
import { JobAlerts } from "@/components/market/JobAlerts";

import { AIChatInsights } from "@/components/market/AIChatInsights";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { RefreshCw, Sparkles, X, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Market() {
    const [searchQuery, setSearchQuery] = useState("Mechanical Engineering");
    const [activeDomain, setActiveDomain] = useState("Mechanical Engineering");
    const [marketData, setMarketData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [timeRange] = useState("6m");
    const [error, setError] = useState<string | null>(null);



    const fetchInsights = useCallback(async (domainOverride?: string) => {
        setLoading(true);
        setMarketData(null); // Clear old data to show fresh loading state
        const domain = domainOverride || searchQuery;
        setActiveDomain(domain);
        try {
            setError(null);
            const response = await fetch(`http://localhost:5000/api/market/insights?domain=${domain}&range=${timeRange}`);
            const data = await response.json();
            if (response.status !== 200) {
                setError(data.error || "Failed to fetch market data");
                console.error("API Error:", data.error);
            } else {
                setMarketData(data);
            }
        } catch (err) {
            setError("Network error. Please ensure the backend is running.");
            console.error("Failed to fetch market insights:", err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, timeRange]);

    // Removed initial fetch useEffect to prevent auto-run on refresh

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            fetchInsights();
        }
    };



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="container mx-auto py-8 relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8" variants={itemVariants}>
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Dynamic Skill-Market Optimizer</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        CarrierPulse Insights
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        An AI system that dynamically maps your evolving profile against real-time job market trends to recommend the highest-value learning interventions.
                    </p>
                </div>

            </motion.div>

            {/* AI Search Bar Replacing Domain Buttons */}
            <motion.div className="mb-8 max-w-4xl mx-auto" variants={itemVariants}>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <Input
                        placeholder="e.g., Cloud Roles, EV Design, AI in Robotics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-14 pl-12 pr-32 text-lg rounded-2xl border-2 shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all bg-card/50 backdrop-blur-sm"
                    />
                    <div className="absolute inset-y-2 right-2 flex items-center">
                        <Button
                            onClick={() => fetchInsights()}
                            disabled={loading}
                            className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20"
                        >
                            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Analyze Market"}
                        </Button>
                    </div>
                </div>
                <div className="mt-3 flex gap-3 px-2 overflow-x-auto pb-2 no-scrollbar">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground whitespace-nowrap pt-1">Trending:</span>
                    {["EV Powertrain", "Robotics & Automation", "Generative Design", "Industry 4.0", "Additive Manufacturing"].map(tag => (
                        <button
                            key={tag}
                            onClick={() => {
                                setSearchQuery(tag);
                                fetchInsights(tag);
                            }}
                            className="px-3 py-1 rounded-full border bg-muted/40 hover:bg-blue-50 hover:border-blue-200 text-[11px] font-medium transition-colors whitespace-nowrap"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 shadow-sm"
                >
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-red-900 hover:bg-red-100 h-7"
                        onClick={() => setError(null)}
                    >
                        Dismiss
                    </Button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area - Now Full Width */}
                <motion.div className="lg:col-span-4 space-y-8" variants={itemVariants}>

                    {/* CRITICAL FEATURE: AI Market Intervention Alert */}
                    <div className="mb-8">
                        <AIChatInsights
                            intervention={marketData?.learningIntervention}
                            loading={loading}
                            domain={activeDomain}
                            onPivotClick={(newSkill) => {
                                setSearchQuery(newSkill);
                                fetchInsights(newSkill);
                            }}
                        />
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Rising Skills Section */}
                        <Card className="border shadow-md h-full">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Top Rising Skills in India</CardTitle>
                            </CardHeader>
                            <CardContent key={activeDomain}>
                                <SkillDemand skills={marketData?.topSkills} loading={loading} />
                            </CardContent>
                        </Card>

                        {/* Personalized Job Match */}
                        <Card className="border shadow-md h-full">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Personalized Job Match</CardTitle>
                                <CardDescription className="text-[11px]">Latest roles matching your profile</CardDescription>
                            </CardHeader>
                            <CardContent className="px-3" key={activeDomain}>
                                <JobAlerts alerts={marketData?.jobAlerts} onSelectJob={setSelectedJob} loading={loading} />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>

            {/* Job Detail Modal */}
            <AnimatePresence>
                {
                    selectedJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border"
                            >
                                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/50">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedJob.role}</h2>
                                        <p className="text-muted-foreground font-medium">{selectedJob.company} • {selectedJob.location}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedJob(null)} className="rounded-full">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 text-center">
                                            <p className="text-[10px] uppercase font-bold text-green-600">Match Score</p>
                                            <p className="text-xl font-bold text-green-700">{selectedJob.match}%</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 text-center">
                                            <p className="text-[10px] uppercase font-bold text-blue-600">Salary Range</p>
                                            <p className="text-xl font-bold text-blue-700">{selectedJob.salary}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-100 text-center">
                                            <p className="text-[10px] uppercase font-bold text-purple-600">Posted</p>
                                            <p className="text-xl font-bold text-purple-700">{selectedJob.posted}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg">Job Overview</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedJob.description || "Leading Indian engineering firm looking for talented graduates to join their growing team. Exposure to high-impact projects and mentorship from industry veterans."}
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-lg">Key Responsibilities</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                                            <li>Analyze technical requirements and develop feasible design solutions.</li>
                                            <li>Collaborate with cross-functional teams across India and global offices.</li>
                                            <li>Ensuring compliance with Indian engineering standards and safety regulations.</li>
                                            <li>Implementing Industry 4.0 practices in manufacturing and design.</li>
                                        </ul>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            {/* Roadmap Modal */}
            <AnimatePresence>
                {
                    showRoadmap && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-border"
                            >
                                <div className="p-6 border-b border-border flex justify-between items-center bg-indigo-600 text-white">
                                    <div className="flex items-center gap-3">
                                        <Map className="h-6 w-6" />
                                        <div>
                                            <h2 className="text-2xl font-bold">Target Mastery Roadmap</h2>
                                            <p className="text-indigo-100 text-sm font-medium">Focus: {activeDomain} • Speed: Accelerated</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setShowRoadmap(false)} className="rounded-full text-white hover:bg-white/20">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                                    <div className="space-y-6">
                                        {
                                            [
                                                { step: 1, title: "Foundations & Domain Mastery", duration: "2 Weeks", topics: ["Core Concepts", "Standard Workflows", "Industry Compliance"] },
                                                { step: 2, title: "Advanced Technical Application", duration: "4 Weeks", topics: ["AI Integration", "Custom Frameworks", "High-Value Feature Dev"] },
                                                { step: 3, title: "Industry Simulation & Projects", duration: "3 Weeks", topics: ["Real-world Case Studies", "Company-specific Toolsets", "Final Assessments"] }
                                            ].map((milestone) => (
                                                <div key={milestone.step} className="flex gap-6 relative">
                                                    {milestone.step < 3 && <div className="absolute left-[19px] top-10 bottom-[-30px] w-0.5 bg-indigo-100" />}
                                                    <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold relative z-10 shrink-0 shadow-lg">
                                                        {milestone.step}
                                                    </div>
                                                    <div className="space-y-3 pb-6">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-bold text-lg">{milestone.title}</h3>
                                                            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">{milestone.duration}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {milestone.topics.map((t) => (
                                                                <span key={t} className="px-3 py-1 rounded-lg bg-background border text-xs font-medium">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                                        <p className="font-bold mb-1 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 fill-amber-500 text-amber-500" />
                                            AI Optimization Active
                                        </p>
                                        This roadmap is dynamically adjusted based on the current surge in {activeDomain} market signals.
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-500/20">
                                            Enroll in This Track
                                        </Button>
                                        <Button variant="outline" className="flex-1 font-bold h-12">
                                            Download PDF Roadmap
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </motion.div >
    );
}
