import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Instagram, Linkedin, Twitter, Github } from "lucide-react"

function StackedCircularFooter() {
    return (
        <footer className="bg-background border-t py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center">
                    <div className="mb-8 rounded-full bg-primary/10 p-8">
                        <Icons.logo className="icon-class w-10 h-10 text-primary" />
                    </div>
                    <nav className="mb-8 flex flex-wrap justify-center gap-6">
                        <a href="/" className="hover:text-primary transition-colors">Home</a>
                        <a href="/resume" className="hover:text-primary transition-colors">Resume Optimizer</a>
                        <a href="/market" className="hover:text-primary transition-colors">Market Dashboard</a>
                        <a href="/learning" className="hover:text-primary transition-colors">Skill Gap</a>
                    </nav>
                    <div className="mb-8 flex space-x-4">
                        <Button variant="outline" size="icon" className="rounded-full overflow-hidden" asChild>
                            <a href="https://github.com/sakrish205" target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full overflow-hidden" asChild>
                            <a href="https://www.linkedin.com/in/saketha-krishna-boganatham/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Instagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                        </Button>
                    </div>
                    <div className="mb-8 w-full max-w-md">
                        <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex-grow">
                                <Label htmlFor="email" className="sr-only">Email</Label>
                                <Input id="email" placeholder="Subscribe to career insights" type="email" className="rounded-full bg-muted/50" />
                            </div>
                            <Button type="submit" className="rounded-full px-6">Subscribe</Button>
                        </form>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} MechLab. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                            Empowering Mechanical Engineers with Career Intelligence.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { StackedCircularFooter }
