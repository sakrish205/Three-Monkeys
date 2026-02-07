import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 pt-20">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                    CareerPilot
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    AI-Powered Student Career Guidance Platform.
                    Master your resume, learning path, and market readiness.
                </p>
            </div>
            <div className="flex gap-4">
                <Link to="/resume">
                    <Button size="lg">Analyze Resume</Button>
                </Link>
                <Link to="/learning">
                    <Button size="lg" variant="outline">Start Learning</Button>
                </Link>
            </div>
        </div>
    )
}
