import { Input } from "@/app/shared/ui/input"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const PasswordInput = ({
    value,
    onChange,
    placeholder = "Password",
}: PasswordInputProps) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative">
            <Input
                className="pr-12"
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

            <motion.button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bs-secondary"
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
        </div>
    )
}