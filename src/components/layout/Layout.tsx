import { Outlet } from "react-router-dom";
import { Home, FileText, GraduationCap, TrendingUp } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { Footer } from "./Footer";

const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Resume", url: "/resume", icon: FileText },
    { name: "Mech Skills", url: "/learning", icon: GraduationCap },
    { name: "Market", url: "/market", icon: TrendingUp },
];

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <AnimeNavBar items={navItems} defaultActive="Home" />
            <main className="flex flex-1 flex-col gap-4 p-4 pt-28 lg:gap-6 lg:p-6 lg:pt-28">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
