"use client"

import { ThemeToggle } from "@/app/shared/components"
import { AuthHeader } from "./AuthHeader"
import { AuthForm } from "./AuthForm"
import { AuthFooter } from "./AuthFooter"
import { motion, AnimatePresence } from "framer-motion"

export const AuthRightPanel = ({ mode }: { mode: "login" | "signup" }) => {
    return (
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-bs-bg dark:bg-[#0A0812] relative">

            <ThemeToggle />

            <div className="w-full max-w-[440px]">
                <AnimatePresence mode="wait">

                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "linear" }}
                    >
                        <AuthHeader mode={mode} />
                        <AuthForm mode={mode} />
                        <AuthFooter mode={mode} />
                    </motion.div>

                </AnimatePresence>
            </div>
        </div>
    )
}