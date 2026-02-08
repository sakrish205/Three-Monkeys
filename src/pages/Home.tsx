import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, GraduationCap, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-transparent relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] -z-10" />

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center pt-24 pb-16 text-center space-y-8 px-4 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md"
                >
                    <Sparkles className="h-4 w-4" />
                    <span>Next-Gen Career Intelligence for Engineers</span>
                </motion.div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
                    >
                        Master Your Career with <br />
                        <span className="bg-gradient-to-r from-primary via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                            A.I. Precision
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed"
                    >
                        MechLab is a specialized career operating system designed exclusively for Mechanical Engineers.
                        Optimize resumes, close skill gaps, and track market shifts in real-time.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                    <Button size="lg" className="rounded-full px-8 text-md gap-2 group shadow-lg shadow-primary/20" asChild>
                        <Link to="/resume">
                            Get Started Free
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-md backdrop-blur-sm border-white/10 hover:bg-white/5" asChild>
                        <Link to="/market">
                            Explore Market
                        </Link>
                    </Button>
                </motion.div>

                {/* Stats / Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="pt-12 flex gap-8 md:gap-16 items-center text-muted-foreground/60 select-none grayscale opacity-50"
                >
                    <span className="font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> ATS Validated
                    </span>
                    <span className="font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
                        <Zap className="h-4 w-4" /> Lightning Fast
                    </span>
                    <span className="font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
                        <Globe className="h-4 w-4" /> India Optimized
                    </span>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="container max-w-6xl mx-auto py-24 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Resume Optimizer",
                            desc: "Deep ATS analysis with domain-specific mechanical engineering keywords.",
                            icon: FileText,
                            link: "/resume",
                            color: "from-blue-500/20 to-cyan-500/20"
                        },
                        {
                            title: "Skill Gap Analysis",
                            desc: "Identify exactly which modern tools (CAD/FEA/PLM) you need to master next.",
                            icon: GraduationCap,
                            link: "/learning",
                            color: "from-emerald-500/20 to-teal-500/20"
                        },
                        {
                            title: "ME Market Pulse",
                            desc: "Exclusive insights into the Indian mechanical and industrial job market.",
                            icon: TrendingUp,
                            link: "/market",
                            color: "from-orange-500/20 to-rose-500/20"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Link to={feature.link}>
                                <Card className="group relative h-full bg-card/50 backdrop-blur-xl border-white/10 p-8 hover:bg-white/5 transition-all duration-300 hover:border-primary/50 overflow-hidden cursor-pointer">
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} blur-[40px] opacity-20 group-hover:opacity-100 transition-opacity`} />
                                    <feature.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                    <div className="mt-8 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                        Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="container max-w-6xl mx-auto py-12 px-4 mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-emerald-600 p-12 text-center text-white shadow-2xl shadow-primary/40"
                >
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold">Ready to outpace the competition?</h2>
                        <p className="max-w-xl text-primary-foreground/90 text-lg">
                            Join thousands of engineers who use MechLab to land high-paying roles in top Indian industrial giants.
                        </p>
                        <Button size="lg" className="rounded-full px-12 bg-white text-emerald-600 hover:bg-gray-100 font-bold hover:scale-105 transition-transform border-none shadow-xl" asChild>
                            <Link to="/resume">Upload Your Resume Now</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
