export default function Layout({ children, otp }: { children: React.ReactNode; otp: React.ReactNode }) {
    return (
        <>
            {children}
            {otp}
        </>
    )
}