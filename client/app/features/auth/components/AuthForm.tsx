'use client'

import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { PasswordStrength } from "@/app/features/auth/components/PasswordStrength"
import { GoogleIcon } from "@/app/features/auth/components/GoogleIcon"
import { Input } from "@/app/shared/ui/input"

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {

    const isSignup = mode === "signup"

    const [showPassword, setShowPassword] = useState(false)

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
        <form className="space-y-4">

            {/* GOOGLE BUTTON */}
            <button
                type="button"
                className="bs-btn-ghost w-full animate-fade-up-2"
            >
                <GoogleIcon />
                Continue with Google
            </button>

            {/* DIVIDER */}
            <div className="bs-divider animate-fade-up-3">
                {isSignup ? "or sign up with email" : "or sign in with email"}
            </div>

            {/* NAME */}
            {isSignup && (
                <div className="grid grid-cols-2 gap-3 animate-fade-up-3">
                    <Input placeholder="First name" value={form.firstName} onChange={set("firstName")} />
                    <Input placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
                </div>
            )}

            {/* EMAIL */}
            <Input placeholder="Email" value={form.email} onChange={set("email")} />

            {/* PASSWORD */}
            <div>
                <div className="relative">
                    <Input
                        className="bs-input pr-12"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={set("password")}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* <div className="h-4 mt-2"> */}
                <PasswordStrength password={form.password} />
                {/* </div> */}
            </div>

            {/* CONFIRM PASSWORD */}
            {isSignup && (
                <Input
                    className="bs-input"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                />
            )}

            {/* SUBMIT */}
            <button className="bs-btn-primary w-full flex items-center justify-center gap-2">
                {isSignup ? "Get Started" : "Login"}
                <ArrowRight size={16} />
            </button>

        </form>
    )
}