'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, KeyRound } from "lucide-react"
import { GoogleIcon } from "@/app/features/auth/components/GoogleIcon"
import { Input } from "@/app/shared/ui/input"
import { PasswordInput } from "./PasswordInput"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { useAuthStore } from "@/app/store/authStore"
import { ResponseModal } from "@/app/shared/components"
import { OtpModal } from "./OtpModal"
import { OtpSuccessModal } from "./OtpSuccessModal"

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setAuth } = useAuthStore()

    const isSignup = mode === "signup"

    useEffect(() => {
        const emailParam = searchParams.get("email")
        if (emailParam) {
            setForm(prev => ({ ...prev, email: decodeURIComponent(emailParam) }))
        }
    }, [searchParams])

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    })
    
    const [isOtpOpen, setIsOtpOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [backendOtp, setBackendOtp] = useState("")
    const [otpError, setOtpError] = useState("")
    const [loading, setLoading] = useState(false)
    
    // We keep error for small inline errors, but use modal for main responses
    const [error, setError] = useState("")
    const [modal, setModal] = useState<{isOpen: boolean, title: string, message: string, type: "success" | "error"}>({
        isOpen: false,
        title: "",
        message: "",
        type: "success"
    })

    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setError("")
            setForm(prev => ({ ...prev, [k]: e.target.value }))
        }

    const handleSubmit = async () => {
        setError("")
        setLoading(true)

        try {
            if (isSignup) {
                // Register
                if (form.password !== form.confirmPassword) {
                    throw new Error("Passwords do not match")
                }
                const res = await axios.post(`${API_URL}/register`, {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    password: form.password
                })
                console.log("Registration response data:", res.data)
                setBackendOtp(res.data.otp)
                setIsOtpOpen(true)
            } else {
                // Login
                const res = await axios.post(`${API_URL}/login`, {
                    email: form.email,
                    password: form.password
                })
                setAuth(res.data.user, res.data.accessToken)
                router.push("/") // Redirect to dashboard or home
            }
        } catch (err: any) {
            const rawMessage = err.response?.data?.message || err.message || "An error occurred";
            const formattedMessage = Array.isArray(rawMessage) ? rawMessage.join(", ") : rawMessage;
            setError(formattedMessage)
            setModal({
                isOpen: true,
                title: "Error",
                message: formattedMessage,
                type: "error"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (otpCode: string) => {
        setLoading(true)
        setOtpError("")
        try {
            await axios.post(`${API_URL}/verify-otp`, {
                email: form.email,
                otp: otpCode
            })
            setIsOtpOpen(false)
            setIsSuccessOpen(true)
        } catch (err: any) {
            const rawMessage = err.response?.data?.message || err.message || "Verification failed";
            const formattedMessage = Array.isArray(rawMessage) ? rawMessage.join(", ") : rawMessage;
            setOtpError(formattedMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleAuth = () => {
        window.location.href = `${API_URL}/google`
    }

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
                onClick={handleGoogleAuth}
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

            {/* ERROR DISPLAY */}
            {error && (
                <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg border border-red-500/20">
                    {error}
                </div>
            )}

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
                        <Input placeholder="First name" value={form.firstName} onChange={set("firstName")} />
                        <Input placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EMAIL */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
            >
                <Input placeholder="Email" value={form.email} onChange={set("email")} />
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
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Please wait..." : (isSignup ? "Get Started" : "Login")}
                {!loading && <ArrowRight size={16} />}
            </motion.button>
            <ResponseModal 
                isOpen={modal.isOpen}
                onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
            <OtpModal
                open={isOtpOpen}
                onClose={() => setIsOtpOpen(false)}
                onVerify={handleVerifyOtp}
                mockOtp={backendOtp}
                error={otpError}
            />
            {isSuccessOpen && <OtpSuccessModal email={form.email} />}
        </motion.form>
    )
}