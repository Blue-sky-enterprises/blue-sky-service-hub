"use client"

import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="
        absolute top-5 right-5
        p-2 rounded-bs-sm
        border transition-all duration-200
        bg-bs-bg border-bs-border text-bs-primary
        hover:scale-105 hover:border-bs-accent
      "
            title="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
            </AnimatePresence>
        </button>
    )
}