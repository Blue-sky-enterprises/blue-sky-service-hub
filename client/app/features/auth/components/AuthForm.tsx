'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { PasswordStrength } from "@/app/features/auth/components/PasswordStrength"
import { GoogleIcon } from "@/app/features/auth/components/GoogleIcon"
import { Input } from "@/app/shared/ui/input"
import { PasswordInput } from "./PasswordInput"
import { useRouter } from "next/navigation"

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
    const router = useRouter()

    const isSignup = mode === "signup"

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm(prev => ({ ...prev, [k]: e.target.value }))

    return (
        <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* GOOGLE BUTTON */}
            <motion.button
                type="button"
                className="bs-btn-ghost w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <GoogleIcon />
                Continue with Google
            </motion.button>

            {/* DIVIDER */}
            <motion.div
                className="bs-divider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {isSignup ? "or sign up with email" : "or sign in with email"}
            </motion.div>

            {/* NAME (animated conditional) */}
            <AnimatePresence mode="wait">
                {isSignup && (
                    <motion.div
                        key="name"
                        className="grid grid-cols-2 gap-3"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Input placeholder="First name" />
                        <Input placeholder="Last name" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EMAIL */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
            >
                <Input placeholder="Email" />
            </motion.div>

            {/* PASSWORD */}
            <PasswordInput
                value={form.password}
                onChange={set("password")}
                placeholder="Password"
            />

            {/* CONFIRM PASSWORD */}
            <AnimatePresence>
                {isSignup && (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <PasswordInput
                            value={form.confirmPassword}
                            onChange={set("confirmPassword")}
                            placeholder="Confirm Password"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SUBMIT */}
            <motion.button
                className="bs-btn-primary w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                    if (isSignup) {
                        router.push("/auth/signup/otp")
                    } else {
                        router.push("/auth/login")
                    }
                }}
            >
                {isSignup ? "Get Started" : "Login"}
                <ArrowRight size={16} />
            </motion.button>
        </motion.form>
    )
}