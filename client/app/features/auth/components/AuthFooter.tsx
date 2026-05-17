import Link from "next/link"

export const AuthFooter = ({ mode }: { mode: "login" | "signup" }) => {
    const isSignup = mode === "signup"

    return (
        <p className="mt-6 text-center text-sm text-bs-secondary dark:text-[#A09DC0] animate-fade-up-5">
            {isSignup ? (
                <>
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-semibold">
                        Sign in
                    </Link>
                </>
            ) : (
                <>
                    New here?{" "}
                    <Link href="/auth/signup" className="font-semibold">
                        Create account
                    </Link>
                </>
            )}
        </p>
    )
}