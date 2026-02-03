"use client"

import React from "react"
import { User, Camera, ChefHat, BookOpen, Heart, Settings, Bell, HelpCircle, LogOut, Plus, Award, TrendingUp } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

export function ProfileScreen() {
  const { t } = useLocale()

  const quickActions = [
    { id: 1, label: t("profile.cta.button").replace("Publicar mi primera receta", "").trim() || t("profile.cta.button"), icon: Plus, primary: true },
    { id: 2, label: t("profile.settings.help"), icon: BookOpen, primary: false },
  ]

  const achievements = [
    { id: 1, name: t("profile.achievement.first"), icon: ChefHat, description: t("profile.achievement.firstDesc") },
    { id: 2, name: "5 favoritos", icon: Heart, description: t("profile.achievement.popularDesc").replace("10", "5") },
    { id: 3, name: t("profile.achievement.popular"), icon: TrendingUp, description: t("profile.achievement.popularDesc") },
    { id: 4, name: t("profile.achievement.explorer"), icon: Award, description: t("profile.achievement.explorerDesc") },
  ]

  const menuItems = [
    { id: 1, label: t("profile.settings.notifications"), icon: Bell },
    { id: 2, label: t("profile.settings.privacy"), icon: BookOpen },
    { id: 3, label: t("profile.settings.account"), icon: Settings },
    { id: 4, label: t("profile.settings.help"), icon: HelpCircle },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[#1B1B1F]">{t("profile.title")}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center py-6 mb-6 rounded-2xl bg-white border border-[#ECE7E6]">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#FFF2F1] flex items-center justify-center border-4 border-[#FEE3E1]">
              <User className="w-10 h-10 text-[#6B6B73]" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#F54036] text-white flex items-center justify-center hover:bg-[#E03A30] active:scale-95 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Welcome Message */}
          <h2 className="text-xl font-semibold text-[#1B1B1F] mb-1">
            {t("profile.welcome")}
          </h2>
          <p className="text-[#6B6B73] text-sm max-w-xs mb-4">
            {t("profile.subtitle")}
          </p>

          {/* Stats Preview */}
          <div className="flex items-center gap-6 mb-5">
            <div className="text-center">
              <p className="text-xl font-bold text-[#1B1B1F]">0</p>
              <p className="text-xs text-[#6B6B73]">{t("profile.recipes")}</p>
            </div>
            <div className="w-px h-8 bg-[#ECE7E6]" />
            <div className="text-center">
              <p className="text-xl font-bold text-[#1B1B1F]">0</p>
              <p className="text-xs text-[#6B6B73]">{t("profile.followers")}</p>
            </div>
            <div className="w-px h-8 bg-[#ECE7E6]" />
            <div className="text-center">
              <p className="text-xl font-bold text-[#1B1B1F]">0</p>
              <p className="text-xs text-[#6B6B73]">{t("profile.following")}</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-6 py-3 rounded-full bg-[#F54036] text-white font-semibold hover:bg-[#E03A30] active:scale-95 transition-all">
            {t("profile.complete")}
          </button>
        </div>

        {/* Quick Actions */}
        <section className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <button 
                  key={action.id}
                  className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-semibold transition-all ${
                    action.primary 
                      ? "bg-[#F54036] text-white hover:bg-[#E03A30] active:scale-95" 
                      : "bg-white border border-[#ECE7E6] text-[#1B1B1F] hover:border-[#F54036]"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{action.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Achievements to Unlock */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#F54036]" />
            <h2 className="text-base font-semibold text-[#1B1B1F]">{t("profile.achievements")}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div 
                  key={achievement.id}
                  className="flex-shrink-0 w-32 p-4 rounded-2xl bg-white border border-dashed border-[#ECE7E6] text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F1] mx-auto mb-2 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[#6B6B73]" />
                  </div>
                  <h3 className="font-medium text-[#1B1B1F] text-xs mb-1">{achievement.name}</h3>
                  <p className="text-xs text-[#6B6B73]">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Encouragement Card */}
        <section className="mb-6">
          <div className="p-5 rounded-2xl bg-[#FFF2F1] border border-[#FEE3E1]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEE3E1] flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-6 h-6 text-[#F54036]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B1B1F] mb-1">{t("profile.cta.title")}</h3>
                <p className="text-sm text-[#6B6B73] mb-3">
                  {t("profile.cta.subtitle")}
                </p>
                <button className="text-sm font-semibold text-[#F54036] hover:underline">
                  {t("profile.cta.button")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#1B1B1F] mb-3">{t("profile.settings")}</h2>
          <div className="rounded-2xl bg-white border border-[#ECE7E6] overflow-hidden">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button 
                  key={item.id}
                  className={`flex items-center gap-4 w-full p-4 hover:bg-[#FFF2F1] transition-colors text-left ${
                    index < menuItems.length - 1 ? "border-b border-[#ECE7E6]" : ""
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-[#6B6B73]" />
                  <span className="flex-1 text-sm font-medium text-[#1B1B1F]">{item.label}</span>
                  <svg className="w-5 h-5 text-[#6B6B73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )
            })}
          </div>
        </section>

        {/* Sign Out */}
        <section className="mb-6">
          <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white border border-[#ECE7E6] hover:border-red-300 transition-colors">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-red-500">Cerrar sesión</span>
          </button>
        </section>
      </div>
    </div>
  )
}
