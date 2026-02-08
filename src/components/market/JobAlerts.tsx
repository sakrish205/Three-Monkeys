
import { JOB_ALERTS } from "@/data/mockMarket";
import { MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JobAlerts({ alerts, onSelectJob, loading }: { alerts?: any[]; onSelectJob: (job: any) => void; loading?: boolean }) {
    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-xl border bg-card animate-pulse space-y-3">
                        <div className="flex justify-between">
                            <div className="h-5 bg-muted rounded w-1/2"></div>
                            <div className="h-5 bg-muted rounded w-1/4"></div>
                        </div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="flex gap-2">
                            <div className="h-4 bg-muted rounded w-16"></div>
                            <div className="h-4 bg-muted rounded w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    const displayAlerts = alerts || JOB_ALERTS;

    return (
        <div className="space-y-4">
            {displayAlerts.map((job) => (
                <div
                    key={job.id}
                    className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => onSelectJob(job)}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{job.role}</h4>
                            <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                            <CheckCircle className="h-3 w-3" />
                            {job.match}% Match
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {job.posted}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-1.5 flex-wrap">
                            {job.tags.map((tag: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-foreground/80 border border-border/50">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectJob(job);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
