import { ExternalLink, PlayCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/data/mockSkills";

interface ResourceCardsProps {
    resources: Resource[];
}

export function ResourceCards({ resources }: ResourceCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
                <Card key={index} className="overflow-hidden group hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <Badge variant="outline" className="mb-2 uppercase text-[10px]">
                                {resource.platform}
                            </Badge>
                            <Badge variant={
                                resource.level === 'Beginner' ? 'secondary' :
                                    resource.level === 'Intermediate' ? 'default' : 'destructive'
                            } className="text-[10px]">
                                {resource.level}
                            </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                            {resource.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a
                            href={resource.link}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            {resource.platform.toLowerCase().includes('udemy') || resource.platform.toLowerCase().includes('coursera') ? (
                                <PlayCircle className="h-4 w-4" />
                            ) : (
                                <BookOpen className="h-4 w-4" />
                            )}
                            View Resource
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
