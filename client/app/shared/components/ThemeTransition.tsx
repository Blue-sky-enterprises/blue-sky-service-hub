"use client"

import { createContext, useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type ThemeTransitionCtx = {
    trigger: () => void
    locked: boolean
}

const Ctx = createContext<ThemeTransitionCtx | null>(null)

export const useThemeTransition = () => {
    const ctx = useContext(Ctx)
    if (!ctx) throw new Error("useThemeTransition must be used inside provider")
    return ctx
}

export const ThemeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState(false)
    const [locked, setLocked] = useState(false)

    const trigger = () => {
        setActive(true)
        setLocked(true)

        setTimeout(() => {
            setActive(false)
            setLocked(false)
        }, 1200)
    }

    return (
        <Ctx.Provider value={{ trigger, locked }}>
            {children}

            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 z-[9999] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{
                                background:
                                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 55%, transparent 100%)",
                            }}
                        />
                        <div className="absolute inset-0 bg-black/10 dark:bg-white/5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Ctx.Provider>
    )
}