'use client'

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, X } from "lucide-react"

export type ModalType = "success" | "error"

interface ResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type: ModalType;
}

export const ResponseModal = ({ isOpen, onClose, title, message, type }: ResponseModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-sm bg-bs-bg border border-bs-border rounded-xl shadow-2xl p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-bs-dim hover:text-bs-text transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`p-3 rounded-full ${type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {type === 'success' ? (
                                    <CheckCircle2 size={32} />
                                ) : (
                                    <XCircle size={32} />
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-bs-text">{title}</h3>
                                <p className="text-sm text-bs-dim">{message}</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-2 bs-btn-primary"
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
