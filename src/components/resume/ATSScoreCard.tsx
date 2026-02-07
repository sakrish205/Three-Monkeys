import { motion } from "framer-motion";
import { RadialBarChart as RadialBarChartRecharts, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ATSScoreCardProps {
    score: number;
}

export function ATSScoreCard({ score }: ATSScoreCardProps) {
    const data = [
        {
            name: "Score",
            value: score,
            fill: "hsl(var(--primary))",
        },
    ];

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-xl font-semibold tracking-tight">ATS Compatibility</h3>
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
                                background
                                dataKey="value"
                                cornerRadius={30 / 2}
                                fill="hsl(var(--primary))"
                            />
                        </RadialBarChartRecharts>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold">{score}</span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Score</span>
                    </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Your resume is highly optimized for Applicant Tracking Systems!
                </p>
            </div>
        </motion.div>
    );
}
