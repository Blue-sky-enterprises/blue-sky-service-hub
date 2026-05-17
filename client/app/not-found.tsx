'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Home, Phone } from 'lucide-react'

/* ─── Floating service icon data ─── */
const SERVICE_ICONS = [
    { id: 'clean', symbol: '🧹', label: 'Cleaning', x: '8%', y: '18%', delay: 0 },
    { id: 'security', symbol: '🛡️', label: 'Security', x: '82%', y: '12%', delay: 0.15 },
    { id: 'nurse', symbol: '🩺', label: 'Healthcare', x: '72%', y: '72%', delay: 0.3 },
    { id: 'parking', symbol: '🅿️', label: 'Parking', x: '14%', y: '75%', delay: 0.45 },
    { id: 'luggage', symbol: '🧳', label: 'Luggage', x: '88%', y: '42%', delay: 0.6 },
    { id: 'hotel', symbol: '🏨', label: 'Hotel', x: '5%', y: '50%', delay: 0.75 },
]

/* ─── Particle dot ─── */
function Particle({ delay }: { delay: number }) {
    const [style, setStyle] = useState<{ size: number; startX: string; startY: string; duration: number } | null>(null)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStyle({
            size: Math.random() * 3 + 1,
            startX: `${Math.random() * 100}%`,
            startY: `${Math.random() * 100}%`,
            duration: 4 + Math.random() * 3
        })
    }, [])

    if (!style) return null

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: style.size, height: style.size, left: style.startX, top: style.startY, background: 'rgba(124,92,252,0.6)' }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: style.duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}

/* ─── Floating icon ─── */
function FloatingIcon({ symbol, label, x, y, delay }: { symbol: string; label: string; x: string; y: string; delay: number }) {
    return (
        <motion.div
            className="absolute flex flex-col items-center gap-1.5 pointer-events-none select-none"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: [0, 0.55, 0.55, 0], y: [20, 0, -20, -40], scale: [0.4, 1, 1, 0.6] }}
            transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                    background: 'rgba(124,92,252,0.12)',
                    border: '1px solid rgba(124,92,252,0.25)',
                    backdropFilter: 'blur(8px)',
                }}
            >
                {symbol}
            </div>
            <span className="font-dm text-[10px] font-medium" style={{ color: 'rgba(160,157,192,0.7)', letterSpacing: '0.06em' }}>
                {label}
            </span>
        </motion.div>
    )
}

/* ─── Animated 404 digits ─── */
function GlitchDigit({ char, delay }: { char: string; delay: number }) {
    return (
        <motion.span
            className="relative inline-block font-syne font-black leading-none select-none"
            style={{
                fontSize: 'clamp(96px, 18vw, 220px)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(124,92,252,0.5)',
                letterSpacing: '-0.04em',
            }}
            initial={{ opacity: 0, y: 60, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Glitch layers */}
            <motion.span
                aria-hidden
                className="absolute inset-0 font-syne font-black"
                style={{
                    fontSize: 'inherit',
                    color: 'rgba(124,92,252,0.25)',
                    WebkitTextStroke: '0',
                    filter: 'blur(0px)',
                }}
                animate={{ x: [-3, 3, -1, 0], opacity: [0, 0.6, 0, 0] }}
                transition={{ duration: 0.18, delay: delay + 1.5, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
            >
                {char}
            </motion.span>
            <motion.span
                aria-hidden
                className="absolute inset-0 font-syne font-black"
                style={{
                    fontSize: 'inherit',
                    color: 'rgba(155,125,255,0.2)',
                    WebkitTextStroke: '0',
                }}
                animate={{ x: [2, -2, 1, 0], opacity: [0, 0.5, 0, 0] }}
                transition={{ duration: 0.18, delay: delay + 1.55, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
            >
                {char}
            </motion.span>
            {/* Main fill */}
            <motion.span
                className="relative font-syne font-black"
                style={{
                    fontSize: 'inherit',
                    background: 'linear-gradient(135deg, #3A2FA0 0%, #7C5CFC 45%, #9B7DFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStroke: '0',
                }}
            >
                {char}
            </motion.span>
        </motion.span>
    )
}

/* ─── Main component ─── */
export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
    const [particles] = useState(() => Array.from({ length: 28 }, (_, i) => i))

    // Parallax layers
    const layer1X = useTransform(springX, [-400, 400], [-12, 12])
    const layer1Y = useTransform(springY, [-300, 300], [-8, 8])
    const layer2X = useTransform(springX, [-400, 400], [8, -8])
    const layer2Y = useTransform(springY, [-300, 300], [5, -5])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return
            mouseX.set(e.clientX - rect.left - rect.width / 2)
            mouseY.set(e.clientY - rect.top - rect.height / 2)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
            style={{ background: '#0A0812' }}
        >
            {/* ── Background mesh ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(124,92,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,1) 1px, transparent 1px)',
                        backgroundSize: '52px 52px',
                    }}
                />
                {/* Radial glow orbs — parallax layer 1 */}
                <motion.div
                    className="absolute"
                    style={{ x: layer1X, y: layer1Y, top: '-10%', left: '-5%', width: '60%', height: '70%' }}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{ background: 'radial-gradient(circle at 40% 40%, rgba(91,63,212,0.22) 0%, transparent 65%)' }}
                    />
                </motion.div>
                {/* Orb 2 — parallax layer 2 */}
                <motion.div
                    className="absolute"
                    style={{ x: layer2X, y: layer2Y, bottom: '-20%', right: '-10%', width: '55%', height: '65%' }}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{ background: 'radial-gradient(circle at 60% 60%, rgba(124,92,252,0.18) 0%, transparent 65%)' }}
                    />
                </motion.div>

                {/* Center glow behind 404 */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ width: 500, height: 300 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.18) 0%, transparent 70%)' }} />
                </motion.div>
            </div>

            {/* ── Particles ── */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((_, i) => (
                    <Particle key={i} delay={i * 0.18} />
                ))}
            </div>

            {/* ── Floating service icons ── */}
            <div className="absolute inset-0 pointer-events-none">
                {SERVICE_ICONS.map(icon => (
                    <FloatingIcon key={icon.id} {...icon} />
                ))}
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2.5 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #5B3FD4, #7C5CFC)',
                            boxShadow: '0 0 24px rgba(124,92,252,0.5)',
                        }}
                    >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                            <path d="M3 9C3 7 5 3 12 3C19 3 21 7 21 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M3 9C3 14 6 18 12 21C18 18 21 14 21 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" fill="white" opacity="0.9" />
                        </svg>
                    </div>
                    <span className="font-syne font-bold text-xl tracking-tight" style={{ color: '#F0EEFF' }}>
                        bluesky
                    </span>
                </motion.div>

                {/* 404 */}
                <div className="flex items-center justify-center gap-1 mb-6" style={{ perspective: '800px' }}>
                    <GlitchDigit char="4" delay={0.1} />
                    <GlitchDigit char="0" delay={0.22} />
                    <GlitchDigit char="4" delay={0.34} />
                </div>

                {/* Thin separator line */}
                <motion.div
                    className="w-24 h-px mb-8"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.8), transparent)' }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                />

                {/* Headline */}
                <motion.h1
                    className="font-syne font-bold mb-4"
                    style={{ fontSize: 'clamp(22px, 4vw, 36px)', color: '#F0EEFF', lineHeight: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    This page went off-duty
                </motion.h1>

                {/* Sub-copy — ties to BlueSky brand */}
                <motion.p
                    className="font-dm text-base leading-relaxed mb-10 max-w-md"
                    style={{ color: '#A09DC0' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
                >
                    {"Our team couldn't locate what you're looking for. The page may have moved or been reassigned."}
                </motion.p>

                {/* Service tags */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-2 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.88 }}
                >
                    {['Hotels', 'Malls', 'Hospitals', 'Restaurants', 'Corporate'].map((tag, i) => (
                        <motion.span
                            key={tag}
                            className="px-3 py-1 rounded-full font-dm text-xs font-medium"
                            style={{
                                background: 'rgba(124,92,252,0.1)',
                                border: '1px solid rgba(124,92,252,0.22)',
                                color: 'rgba(155,125,255,0.85)',
                                letterSpacing: '0.04em',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.9 + i * 0.06 }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Primary — Go home */}
                    <Link href="/">
                        <motion.div
                            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-syne font-semibold text-sm text-white cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, #5B3FD4, #7C5CFC)',
                                boxShadow: '0 0 0 0 rgba(124,92,252,0)',
                            }}
                            whileHover={{
                                scale: 1.04,
                                boxShadow: '0 0 32px rgba(124,92,252,0.5)',
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <Home size={16} />
                            Back to Dashboard
                        </motion.div>
                    </Link>

                    {/* Secondary — Go back */}
                    <motion.button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-dm font-medium text-sm cursor-pointer"
                        style={{
                            background: 'rgba(124,92,252,0.08)',
                            border: '1px solid rgba(124,92,252,0.22)',
                            color: '#A09DC0',
                        }}
                        whileHover={{
                            borderColor: 'rgba(124,92,252,0.5)',
                            color: '#F0EEFF',
                            background: 'rgba(124,92,252,0.14)',
                            scale: 1.02,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </motion.button>

                    {/* Tertiary — Contact */}
                    <Link href="/contact">
                        <motion.div
                            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-dm font-medium text-sm cursor-pointer"
                            style={{ color: '#5E5B7A' }}
                            whileHover={{ color: '#9B7DFF', scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <Phone size={14} />
                            Contact Support
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    className="mt-14 font-dm text-xs"
                    style={{ color: '#3D3A56' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                >
                    Error 404 · BlueSky Enterprises · Trusted Workforce & Facility Solutions
                </motion.p>
            </div>

            {/* ── Scanline overlay for atmosphere ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                    zIndex: 20,
                }}
            />
        </div>
    )
}