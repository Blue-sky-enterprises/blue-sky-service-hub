"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type OtpModalProps = {
    open: boolean
    onClose: () => void
    onVerify: (otp: string) => void
    length?: number
    mockOtp?: string
    error?: string
}

export const OtpModal = ({
    open,
    onClose,
    onVerify,
    length = 6,
    mockOtp,
    error,
}: OtpModalProps) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        // auto move next
        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus()
        }

        if (newOtp.every((v) => v !== "")) {
            onVerify(newOtp.join(""))
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={onClose}
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
              shadow-xl
            "
                    >
                        {/* close */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-4 top-4 text-bs-secondary hover:text-bs-primary"
                        >
                            <X size={18} />
                        </button>

                        {/* header */}
                        <h2 className="text-xl font-syne font-bold text-bs-primary dark:text-[#F0EEFF]">
                            Verify OTP
                        </h2>

                        <p className="text-sm text-bs-secondary dark:text-[#A09DC0] mt-1">
                            Enter the 6-digit code sent to your email {mockOtp && `(Mock OTP for testing: ${mockOtp})`}
                        </p>

                        {/* OTP inputs */}
                        <div className="flex gap-2 mt-6 justify-center">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputsRef.current[i] = el
                                    }}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    maxLength={1}
                                    className="
                    w-12 h-12 text-center text-lg font-semibold
                    rounded-bs-md border
                    border-bs-border bg-bs-input
                    text-bs-primary
                    focus:border-bs-accent focus:ring-2 focus:ring-bs-accent/30
                    transition-all
                  "
                                />
                            ))}
                        </div>

                        {/* resend */}
                        <p className="text-xs text-center mt-4 text-bs-secondary">
                            Didn’t receive code?{" "}
                            <button type="button" className="text-bs-accent font-medium">
                                Resend OTP
                            </button>
                        </p>

                        {mockOtp && (
                            <div className="mt-4 p-3 bg-[#7C5CFC]/10 border border-[#7C5CFC]/30 rounded-bs-md text-center">
                                <p className="text-xs text-[#7C5CFC] dark:text-[#9B7DFF] font-medium">Mock OTP for testing:</p>
                                <p className="text-2xl font-mono font-extrabold text-[#7C5CFC] dark:text-[#9B7DFF] tracking-[0.5em] mt-1 pl-[0.5em]">
                                    {mockOtp}
                                </p>
                            </div>
                        )}

                        {error && (
                            <p className="text-sm text-red-500 text-center mt-4 font-medium bg-red-500/10 border border-red-500/20 py-2 rounded-bs-md">
                                {error}
                            </p>
                        )}

                        {/* action */}
                        <button
                            type="button"
                            onClick={() => onVerify(otp.join(""))}
                            className="bs-btn-primary w-full mt-6"
                        >
                            Verify
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}