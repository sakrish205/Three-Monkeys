import { motion } from "framer-motion";
import { Heart, Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-8 border-t bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30"
        >
            <div className="container max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <motion.div
                        className="flex items-center gap-2 text-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            MechGuru
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-sm text-muted-foreground">AI-Powered Career Intelligence</span>
                    </motion.div>

                    <motion.p
                        className="flex items-center gap-1 text-sm text-muted-foreground"
                        whileHover={{ scale: 1.02 }}
                    >
                        Built with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> for Mechanical Engineers
                    </motion.p>

                    <div className="flex items-center gap-4 mt-2">
                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                        </motion.a>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xs text-muted-foreground/60 mt-4"
                    >
                        © 2026 Three Monkeys Team • Buildathon Project
                    </motion.p>
                </motion.div>
            </div>
        </motion.footer>
    )
}
