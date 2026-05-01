"use client"

import { OtpModal } from "@/app/features/auth/components/OtpModal"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    const handleVerify = (otp: string) => {
        router.push("/auth/signup/otpSuccess")
    }

    return (
        <OtpModal 
            open={true} 
            onClose={handleClose} 
            onVerify={handleVerify} 
        />
    )
}
