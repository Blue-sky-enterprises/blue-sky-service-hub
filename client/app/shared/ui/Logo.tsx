import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/app/shared/ui/avatar"

type LogoProps = {
    showName?: boolean
    nameVariant?: "full" | "half"
    showBg?: boolean
}

export const Logo = ({
    showName = false,
    nameVariant = "half",
    showBg = false,
}: LogoProps) => {

    return (
        <div className="flex items-center gap-2.5">

            <Avatar
                className={`w-9 h-9 rounded-bs-sm ${showBg ? "bg-bs-gradient shadow-bs-glow" : ""
                    }`}
            >
                <AvatarImage
                    src="/logo-no-bg.png"
                    alt="Bluesky Logo"
                    className="object-contain"
                />
                <AvatarFallback>BS</AvatarFallback>
            </Avatar>

            {showName && (
                <span className="font-syne font-bold text-xl tracking-tight bg-gradient-to-r from-[#9B7DFF] to-[#7C5CFC] bg-clip-text text-transparent">
                    {nameVariant === "full"
                        ? "Bluesky Enterprises"
                        : "Blue Sky"}
                </span>
            )}
        </div>
    )
}