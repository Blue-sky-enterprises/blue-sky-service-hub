
import { ThemeToggle } from "@/app/shared/components"
import { AuthHeader } from "./AuthHeader"
import { AuthForm } from "./AuthForm"
import { AuthFooter } from "./AuthFooter"

export const AuthRightPanel = ({ mode }: { mode: "login" | "signup" }) => {
    return (
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-bs-bg dark:bg-[#0A0812] relative">

            <ThemeToggle />

            <div className="w-full max-w-[440px]">
                <AuthHeader mode={mode} />
                <AuthForm mode={mode} />
                <AuthFooter mode={mode} />
            </div>
        </div>
    )
}