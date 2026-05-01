"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { useRouter } from "next/navigation"

export const OtpSuccessModal = () => {
    const router = useRouter()

    const handleClose = () => {
        router.push("/auth/login")
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* backdrop */}
                <div
                    className="absolute inset-0 bg-black/60"
                    onClick={handleClose}
                />

                {/* modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className="
                        relative w-full max-w-md
                        bg-bs-bg dark:bg-[#0A0812]
                        border border-bs-border
                        rounded-bs-lg p-6
                        shadow-xl text-center
                    "
                >
                    {/* close */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-bs-secondary hover:text-bs-primary"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex justify-center mb-6 mt-4 text-bs-accent">
                        <CheckCircle2 size={64} className="text-[#32E3A6] drop-shadow-[0_0_15px_rgba(50,227,166,0.5)]" />
                    </div>

                    <h2 className="text-2xl font-syne font-bold text-bs-primary dark:text-[#F0EEFF]">
                        Verification Successful
                    </h2>

                    <p className="text-sm text-bs-secondary dark:text-[#A09DC0] mt-3 mb-8">
                        Your account has been successfully verified. You can now log in to access your dashboard.
                    </p>

                    <button
                        onClick={handleClose}
                        className="bs-btn-primary w-full"
                    >
                        Continue to Login
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
