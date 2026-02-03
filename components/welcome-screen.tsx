"use client"

import React, { useState, useEffect, useRef } from "react"
import { PrimaryButton } from "./cookpin-ui"
import { Globe } from "lucide-react"
import { useLocale, LanguageSelector } from "@/lib/locale-context"

export function WelcomeScreen({
  onStart,
  onLogin,
}: {
  onStart: () => void
  onLogin: () => void
}) {
  const { t } = useLocale()
  const [showLanguageSheet, setShowLanguageSheet] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<"logo-enter" | "accent" | "content" | "complete">("logo-enter")
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Skip animation if already played
    if (hasAnimated.current) {
      setAnimationPhase("complete")
      return
    }

    // Animation sequence
    const timer1 = setTimeout(() => setAnimationPhase("accent"), 800)
    const timer2 = setTimeout(() => setAnimationPhase("content"), 1200)
    const timer3 = setTimeout(() => {
      setAnimationPhase("complete")
      hasAnimated.current = true
    }, 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const logoAnimationClass = 
    animationPhase === "logo-enter" 
      ? "translate-y-[100vh] opacity-0" 
      : "translate-y-0 opacity-100"

  const contentVisible = animationPhase === "content" || animationPhase === "complete"
  const accentVisible = animationPhase === "accent" || animationPhase === "content" || animationPhase === "complete"

  return (
    <div className="min-h-screen bg-[#FFFBFA] flex flex-col relative overflow-hidden">
      {/* Language selector - always visible */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => setShowLanguageSheet(true)}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Select language"
        >
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated Logo */}
        <div 
          className={`flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${logoAnimationClass}`}
        >
          {/* Logo Icon */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center overflow-hidden">
              {/* Pin icon */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                  fill="#FFFFFF"
                />
                <circle cx="12" cy="9" r="2.5" fill="#1B1B1F" />
              </svg>
              
              {/* Red accent overlay - animated */}
              <div 
                className={`absolute inset-0 bg-[#F54036] transition-opacity duration-300 ease-out ${
                  accentVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)"
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                      fill="#FFFFFF"
                    />
                    <circle cx="12" cy="9" r="2.5" fill="#F54036" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Wordmark */}
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-foreground">Cook</span>
            <span 
              className={`text-3xl font-bold transition-colors duration-300 ${
                accentVisible ? "text-[#F54036]" : "text-foreground"
              }`}
            >
              Pin
            </span>
          </div>

          {/* Tagline */}
          <p 
            className={`text-muted-foreground text-base mt-2 transition-all duration-300 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {t("welcome.tagline")}
          </p>
        </div>
      </div>

      {/* Bottom actions - animated */}
      <div 
        className={`px-6 pb-10 space-y-4 transition-all duration-300 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <PrimaryButton 
          onClick={onStart} 
          className="w-full"
          size="lg"
        >
          {t("welcome.start")}
        </PrimaryButton>
        
        <div className="text-center">
          <span className="text-muted-foreground text-sm">{t("welcome.hasAccount")} </span>
          <button 
            onClick={onLogin}
            className="text-[#F54036] font-semibold text-sm hover:underline"
          >
            {t("welcome.login")}
          </button>
        </div>
      </div>

      {/* Language Selection Bottom Sheet */}
      <LanguageSelector 
        isOpen={showLanguageSheet} 
        onClose={() => setShowLanguageSheet(false)} 
      />
    </div>
  )
}
