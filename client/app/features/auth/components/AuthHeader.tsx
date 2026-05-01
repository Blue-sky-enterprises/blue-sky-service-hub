import { Logo } from "@/app/shared/ui/Logo"

export const AuthHeader = ({ mode }: { mode: "login" | "signup" }) => {
    const isSignup = mode === "signup"

    return (
        <>
            <div className="lg:hidden mb-8 animate-fade-up">
                <Logo showName />
            </div>

            <div className="mb-7 animate-fade-up-2">
                <h2 className="font-syne text-3xl font-bold text-bs-primary dark:text-[#F0EEFF] mb-1.5">
                    {isSignup ? "Join BlueSky Enterprises" : "Welcome Back"}
                </h2>

                <p className="text-bs-secondary dark:text-[#A09DC0] text-sm">
                    {isSignup
                        ? "Manage workforce, staffing & facility services efficiently"
                        : "Sign in to continue managing operations"}
                </p>
            </div>
        </>
    )
}