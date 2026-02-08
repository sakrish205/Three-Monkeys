import { motion } from "framer-motion";
import { RadialBarChart as RadialBarChartRecharts, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ATSScoreCardProps {
    score: number;
}

export function ATSScoreCard({ score }: ATSScoreCardProps) {
    // Determine color based on score
    const getScoreColor = (s: number) => {
        if (s >= 80) return "#10b981"; // emerald
        if (s >= 60) return "#06b6d4"; // cyan
        if (s >= 40) return "#f59e0b"; // amber
        return "#ef4444"; // red
    };

    const scoreColor = getScoreColor(score);

    const data = [
        {
            name: "Score",
            value: score,
            fill: scoreColor,
        },
    ];

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 text-white p-6 rounded-xl shadow-xl"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-xl font-semibold tracking-tight text-white">ATS Compatibility</h3>
                <div className="h-[200px] w-[200px] relative flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChartRecharts
                            cx="50%"
                            cy="50%"
                            innerRadius="70%"
                            outerRadius="100%"
                            barSize={15}
                            data={data}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar
                                background={{ fill: 'rgba(255,255,255,0.1)' }}
                                dataKey="value"
                                cornerRadius={30 / 2}
                                fill={scoreColor}
                            />
                        </RadialBarChartRecharts>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
                        <span className="text-sm text-white/50 uppercase tracking-widest mt-1">Score</span>
                    </div>
                </div>
                <p className="text-center text-sm text-white/60">
                    {score >= 80
                        ? "Excellent! Your resume is highly optimized for ATS!"
                        : score >= 60
                            ? "Good! Your resume is well optimized for ATS."
                            : score >= 40
                                ? "Fair. Consider improving your resume for better ATS compatibility."
                                : "Needs work. Optimize your resume for ATS."}
                </p>
            </div>
        </motion.div>
    );
}
