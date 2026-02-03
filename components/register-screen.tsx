"use client"

import React, { useState } from "react"
import { PrimaryButton } from "./cookpin-ui"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function RegisterScreen({
  onContinue,
  onBack,
  onGoogleSignIn,
}: {
  onContinue: () => void
  onBack: () => void
  onGoogleSignIn?: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { t } = useLocale()

  const isValid = email && password && confirmPassword && password === confirmPassword

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative top curve */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-[#FFF2F1] rounded-b-[50px]" />
      
      {/* Header */}
      <div className="relative z-10 px-4 pt-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 relative z-10">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("register.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("register.subtitle")}</p>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("register.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3.5 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F54036] focus:ring-1 focus:ring-[#F54036]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("register.password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pr-12 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F54036] focus:ring-1 focus:ring-[#F54036]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("register.password")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pr-12 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F54036] focus:ring-1 focus:ring-[#F54036]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">{t("register.orContinue")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google Button */}
        <button
          onClick={onGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-border rounded-2xl text-foreground font-medium hover:bg-accent transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
      </div>

      {/* Bottom action */}
      <div className="px-6 pb-10">
        <PrimaryButton 
          onClick={onContinue} 
          className="w-full"
          size="lg"
          disabled={!isValid}
        >
          {t("register.continue")}
        </PrimaryButton>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("register.hasAccount")}{" "}
          <button onClick={onBack} className="text-[#F54036] font-semibold hover:underline">
            {t("register.login")}
          </button>
        </p>
      </div>
    </div>
  )
}
