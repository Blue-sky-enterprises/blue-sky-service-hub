export const PasswordStrength = ({ password }: { password: string }) => {

    if (!password) return null

    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[^A-Za-z0-9]/.test(password)
    const isLong = password.length >= 10
    const isVeryLong = password.length >= 14

    let score = 0

    if (password.length >= 6) score++
    if (hasLower && hasUpper) score++
    if (hasNumber) score++
    if (hasSpecial) score++
    if (isLong) score++
    if (isVeryLong) score++

    // clamp to 4 levels
    const strength = Math.min(4, score)

    const colors = [
        'transparent',
        '#EF4444', // weak
        '#F59E0B', // fair
        '#3B82F6', // good
        '#22C55E', // strong
    ]

    const labels = [
        '',
        'Very Weak',
        'Weak',
        'Fair',
        'Strong',
    ]

    return (
        <div className="mt-2 flex items-center gap-2">

            {/* Bars */}
            <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                            background:
                                i <= strength
                                    ? colors[strength]
                                    : 'var(--bs-border)',
                        }}
                    />
                ))}
            </div>

            {/* Label */}
            <span
                className="text-xs font-medium transition-colors"
                style={{ color: colors[strength] }}
            >
                {labels[strength]}
            </span>
        </div>
    )
}