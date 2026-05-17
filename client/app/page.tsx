"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Shield,
  CheckCircle,
  Users,
  Building2,
  Heart,
  TrendingUp,
  X,
  Menu,
  ArrowRight,
  Zap,
  Badge,
  Globe,
  AtSign,
  MessageCircle,
  Users2,
} from "lucide-react";
import { Button } from "./shared/ui/Button";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StaffCard {
  id: number;
  title: string;
  subtitle: string;
  tags: string[];
  extra: string[];
  badge: string;
  person: string;
  role: string;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  location: string;
}

interface FAQ {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "250+", label: "Certified Professionals" },
  { value: "15+", label: "Partner Institutions" },
  { value: "12+", label: "Years of Expertise" },
];

const SERVICES = [
  { icon: Building2, label: "Hotel & Resort Staffing" },
  { icon: Heart, label: "Healthcare Support" },
  { icon: TrendingUp, label: "On-Demand Staff Scaling" },
  { icon: Shield, label: "Home Nurse & Caregiver Vetting" },
];

const STAFF_CARDS: StaffCard[] = [
  {
    id: 1,
    title: "Hospitality Team",
    subtitle:
      "Fully vetted and background-checked Room Boys and Cleaners for pristine, guest-ready environments.",
    tags: ["5-Star Branded Staff", "24/7 Availability"],
    extra: ["Fully Scalable"],
    badge: "Hospitality",
    person: "Maria Santos",
    role: "Team Lead, 5★ Resort",
  },
  {
    id: 2,
    title: "Medical Facility Support",
    subtitle:
      "Sanitation Specialists and Secure Site Teams to maintain safe and clean environments in clinics.",
    tags: ["Clinical Clean Standard", "Licensed Security"],
    extra: ["Custom Contracts"],
    badge: "Healthcare",
    person: "Dr. James Lim",
    role: "Facility Manager",
  },
  {
    id: 3,
    title: "Private Home Care & Nursing",
    subtitle:
      "Background-checked Home Nurses and Caregivers for safe, reliable, and professional medical attention.",
    tags: ["Compassionate Care", "Rigorous Vetting"],
    extra: ["Compassionate Care Plans"],
    badge: "Home Care",
    person: "Aisha Khan",
    role: "Lead Caregiver",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "The vetting process at Blue Sky is committed. We now rely on patient care knowing our support staff is reliable and qualified.",
    name: "Sarah Chen",
    role: "Hospital Administrator",
    location: "CA",
  },
  {
    id: 2,
    quote:
      "Incredibly efficient and reliable onboarding. When we needed a specific skill in guides, Blue Sky delivered fully trained staff on time.",
    name: "David Rodriguez",
    role: "Hotel GM",
    location: "FL",
  },
  {
    id: 3,
    quote:
      "Securing home care is a trust issue. Blue Sky acts as a perfect shield providing compassionate, professional care with total peace of mind.",
    name: "Aisha Khan",
    role: "Private Care Coordinator",
    location: "NV",
  },
];

const FAQS: FAQ[] = [
  {
    q: "How does Blue Sky ensure the quality and vetting of staff?",
    a: "We conduct rigorous background checks, health screenings, and training and training programs harmonised coaching and training programs to ensure every professional meets the highest standards.",
  },
  {
    q: "What is the scalability of Blue Sky's staffing solutions?",
    a: "Clients can scale up or down based on operational needs. Whether organisations see clients can scale up or scale as operational needs change.",
  },
  {
    q: "Do you offer specialised training programmes?",
    a: "Training industries for training to profile specific industries, concentrate and guarantee the suitability for hospitality, healthcare and home care sectors.",
  },
];

const NAV_LINKS = ["Home", "Our Services", "Solutions", "Training"];

const FOOTER_COLS = [
  { title: "Blue Sky", links: ["About Us", "Our Story", "Leadership", "Contact"] },
  { title: "Services", links: ["B2B Staffing", "Hotel Support", "Medical Cleaners", "Home Care"] },
  { title: "Solutions", links: ["Vetting Process", "Training Programs", "Scalability", "Case Studies"] },
  { title: "Support", links: ["FAQs", "Client Portal", "Security", "Terms of Service"] },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PlaceholderImage({
  className = "",
  label = "Image",
  aspect = "aspect-video",
}: {
  className?: string;
  label?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} ${className} bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex flex-col items-center justify-center border border-slate-700/50 overflow-hidden relative`}
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />
      <Users className="w-10 h-10 text-slate-600 mb-2" />
      <span className="text-slate-500 text-xs font-medium">{label}</span>
    </div>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlueSkyLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [staffIdx, setStaffIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [faqIdx, setFaqIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setTestIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prevStaff = () => setStaffIdx((i) => (i - 1 + STAFF_CARDS.length) % STAFF_CARDS.length);
  const nextStaff = () => setStaffIdx((i) => (i + 1) % STAFF_CARDS.length);
  const prevTest = () => setTestIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTest = () => setTestIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prevFaq = () => setFaqIdx((i) => Math.max(0, i - 1));
  const nextFaq = () => setFaqIdx((i) => Math.min(FAQS.length - 1, i + 1));

  const visibleCards = [
    STAFF_CARDS[staffIdx % STAFF_CARDS.length],
    STAFF_CARDS[(staffIdx + 1) % STAFF_CARDS.length],
    STAFF_CARDS[(staffIdx + 2) % STAFF_CARDS.length],
  ];

  const visibleTestimonials = [
    TESTIMONIALS[testIdx % TESTIMONIALS.length],
    TESTIMONIALS[(testIdx + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(testIdx + 2) % TESTIMONIALS.length],
  ];

  return (
    <div className="bg-[#0a0a0f] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      {/* ── Announcement Bar ── */}
      <div className="bg-violet-600/20 border-b border-violet-500/20 text-center py-2 px-4 text-xs text-violet-300 tracking-wide">
        ✦ Discover a specialised human resource, training, and staffing solutions provider ✦
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Blue Sky</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:flex bg-violet-600 hover:bg-violet-500 text-white rounded-full px-5 text-sm"
            >
              Contact Us
            </Button>
            <button
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a key={link} href="#" className="text-sm text-slate-300">
                    {link}
                  </a>
                ))}
                <Button size="sm" className="bg-violet-600 hover:bg-violet-500 rounded-full">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(109,40,217,0.15) 0%, transparent 70%)",
        }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <FadeIn delay={0.1}>
              <Badge className="mb-6 bg-violet-500/15 text-violet-300 border-violet-500/30 rounded-full px-4 py-1 text-xs">
                Workforce Solutions
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                Elevate Your{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Operational
                </span>{" "}
                Capacity with Blue Sky
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Solving staffing, training, and scaling challenges for the Hospitality, Healthcare,
                and Private Care sectors. Secure. Compassionate. Seamless.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-3 mb-12">
                <Button
                  variant="outline"
                  className="rounded-full border-slate-600 text-slate-300 hover:bg-slate-800 px-6"
                >
                  Learn More
                </Button>
                <Button className="rounded-full bg-violet-600 hover:bg-violet-500 px-6 shadow-lg shadow-violet-500/25">
                  Get Staffed Today
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex gap-10">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </motion.div>

          {/* Right — Placeholder for 3D graphic */}
          <FadeIn delay={0.3} direction="left" className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-square max-w-[480px] mx-auto bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 rounded-2xl border border-violet-500/20 flex items-center justify-center relative">
                {/* Decorative rings */}
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute rounded-full border border-violet-500/10"
                    style={{
                      width: `${r * 140}px`,
                      height: `${r * 140}px`,
                    }}
                    animate={{ rotate: 360 * (r % 2 === 0 ? -1 : 1) }}
                    transition={{ duration: 20 * r, repeat: Infinity, ease: "linear" }}
                  />
                ))}
                <div className="relative z-10 text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-violet-500/40">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-slate-400 text-sm">Hero Visual Placeholder</p>
                  <p className="text-slate-600 text-xs mt-1">Replace with 3D city/network graphic</p>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 bg-slate-800/90 border border-violet-500/30 rounded-xl px-3 py-2 text-xs font-medium text-violet-300 backdrop-blur-sm"
                >
                  250+ Professionals
                </motion.div>
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 bg-slate-800/90 border border-blue-500/30 rounded-xl px-3 py-2 text-xs font-medium text-blue-300 backdrop-blur-sm"
                >
                  12+ Years
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Service Icons Bar ── */}
      <section className="border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
          {SERVICES.map(({ icon: Icon, label }, i) => (
            <FadeIn key={label} delay={i * 0.1} direction="none">
              <motion.div
                whileHover={{ y: -3 }}
                className="flex flex-col items-center gap-3 py-4 px-6 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white text-center transition-colors leading-tight">
                  {label}
                </span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Specialized Staffing Solutions ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-violet-400 uppercase tracking-widest mb-3">✦ 01</p>
              <h2 className="text-3xl md:text-4xl font-bold">Our Specialized Staffing Solutions</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
              View All Team Bios <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-400 text-sm max-w-xl mt-2">
            Explore our highly vetted, trained professional teams ready to solve your human resource
            challenges. Reliable. Accountable. Blue Sky Vetted.
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {visibleCards.map((card, i) => (
            <FadeIn key={`${card.id}-${staffIdx}`} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(109,40,217,0.15)" }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/60 border border-white/8 rounded-2xl overflow-hidden flex flex-col"
              >
                <PlaceholderImage
                  aspect="aspect-[4/3]"
                  label={card.title}
                  className="rounded-none"
                />
                <div className="p-5 flex flex-col flex-1">
                  <Badge className="self-start mb-3 bg-violet-500/10 text-violet-300 border-violet-500/20 rounded-full text-xs">
                    {card.badge}
                  </Badge>
                  <h3 className="font-semibold text-base mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{card.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 rounded-lg px-2.5 py-1"
                      >
                        <CheckCircle className="w-3 h-3 text-violet-400" /> {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <StarRating />
                      {card.extra.map((e) => (
                        <span key={e} className="text-xs text-slate-500 mt-0.5 block">
                          {e}
                        </span>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="rounded-full bg-violet-600 hover:bg-violet-500 text-xs px-4"
                    >
                      Request Team Detail
                    </Button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-xs text-slate-600">{staffIdx + 1} of {STAFF_CARDS.length}</span>
          <div className="flex gap-2">
            <button
              onClick={prevStaff}
              className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStaff}
              className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-900/30 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-violet-400 uppercase tracking-widest mb-3">✦ 02</p>
                <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
              </div>
              <a href="#" className="hidden md:flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                View All Testimonials <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Discover why hospitals, hotels, and families choose Blue Sky for their staff vetting
              and workforce solutions.
            </p>
          </FadeIn>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {visibleTestimonials.map((t, i) => (
              <FadeIn key={`${t.id}-${testIdx}`} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-slate-900 border border-white/8 rounded-2xl p-6 flex flex-col gap-5"
                >
                  <PlaceholderImage aspect="aspect-video" label="Client Photo" />
                  <p className="text-slate-300 text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-slate-500">
                        {t.role}, {t.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-slate-600">{testIdx + 1} of {TESTIMONIALS.length}</span>
            <div className="flex gap-2">
              <button
                onClick={prevTest}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTest}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-violet-400 uppercase tracking-widest mb-3">✦ 03</p>
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
              View all FAQs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-slate-400 text-sm max-w-xl">
            Find answers to common questions about {"Blue Sky's"} resource, land staffing and the
            roadside qualities. Here is where provide clarity and steer you every step of the way.
          </p>
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                className="bg-slate-900/60 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer"
                whileHover={{ borderColor: "rgba(139,92,246,0.4)" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <h3 className="font-semibold text-sm leading-snug">{faq.q}</h3>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-slate-400 text-xs leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start text-violet-400 hover:text-violet-300 p-0 h-auto text-xs"
                >
                  {openFaq === i ? "Show Less" : "Read More"}
                </Button>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-xs text-slate-600">{faqIdx + 1} of {FAQS.length}</span>
          <div className="flex gap-2">
            <button
              onClick={prevFaq}
              disabled={faqIdx === 0}
              className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextFaq}
              disabled={faqIdx >= FAQS.length - 1}
              className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:border-violet-500 hover:text-violet-400 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(109,40,217,0.35) 0%, rgba(10,10,15,0.98) 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeIn className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Secure Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Operational Continuity
              </span>{" "}
              Today
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Whether you need to scale up your hotel staff, find vetted home care, or secure a
              medical facility, Blue Sky has the solution. Take the first step towards reliability
              and contact our workforce specialists.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="rounded-full bg-violet-600 hover:bg-violet-500 px-8 text-base shadow-2xl shadow-violet-500/30 whitespace-nowrap"
              >
                Start Enrolling Now <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base">Blue Sky</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                A specialised human resource, training, and staffing solutions provider trusted by
                top institutions across hospitality, healthcare, and home care.
              </p>
              <div className="flex gap-3 mt-5">
                {[Globe, AtSign, MessageCircle, Users2].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-white mb-4 tracking-wide">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-xs text-slate-600">
              © 2024 Blue Sky Workforce Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use"].map((l) => (
                <a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}