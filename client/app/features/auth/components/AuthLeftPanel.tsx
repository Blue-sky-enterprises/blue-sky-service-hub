import { Logo } from "@/app/shared/ui/Logo"
import { Avatar, AvatarImage, AvatarFallback } from "@/app/shared/ui/avatar"
import { Check } from "lucide-react"

export const AuthLeftPanel = () => {
    return (
        <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden flex-col justify-between p-12">

            <div className="absolute inset-0 bg-[#0A0812]" />
            <div className="absolute inset-0 bg-bs-mesh opacity-80" />

            {/* Logo */}
            <div className="relative z-10 animate-fade-up">
                <Logo showName nameVariant="full" showBg />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-5">
                <h2 className="font-syne text-4xl font-bold text-white leading-[1.15]">
                    Workforce. Facility.
                    <br />
                    <span className="bg-gradient-to-r from-[#9B7DFF] to-[#7C5CFC] bg-clip-text text-transparent">
                        Powered by BlueSky.
                    </span>
                </h2>

                <p className="text-[#A09DC0] text-base leading-relaxed">
                    BlueSky delivers trained manpower and facility management for hotels, hospitals, malls, and enterprises.
                </p>

                <ul className="space-y-3">
                    {[
                        "Verified workforce deployment",
                        "24/7 facility & security support",
                        "Hospitality & healthcare staffing",
                        "Scalable manpower solutions",
                        "End-to-end operations",
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-[#C0BEDD]">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center bg-[rgba(124,92,252,0.2)] border border-[rgba(124,92,252,0.4)]">
                                <Check size={11} color="#9B7DFF" />
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Testimonial */}
            <div className="relative z-10">
                <blockquote className="p-5 rounded-bs-lg bg-[rgba(124,92,252,0.1)] border border-[rgba(124,92,252,0.18)]">

                    <p className="text-[#D0CCEE] text-sm italic">
                        “BlueSky streamlined our hotel staffing and operations efficiently.”
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/building.jpg" />
                            <AvatarFallback>HM</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-white text-xs font-semibold">Operations Manager</p>
                            <p className="text-[#5E5B7A] text-xs">Hospitality Partner</p>
                        </div>
                    </div>

                </blockquote>
            </div>
        </div>
    )
}