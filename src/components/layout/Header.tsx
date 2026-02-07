import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            CareerPilot
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link to="/resume" className="transition-colors hover:text-foreground/80 text-foreground/60">Resume</Link>
                        <Link to="/learning" className="transition-colors hover:text-foreground/80 text-foreground/60">Mech Skills</Link>
                        <Link to="/market" className="transition-colors hover:text-foreground/80 text-foreground/60">Market</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
