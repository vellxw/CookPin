"use client"

import React, { useState } from "react"
import { Bell, Home, Search, Bookmark, User, Plus, Star, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchScreen } from "./search-screen"
import { SavedScreen } from "./saved-screen"
import { ProfileScreen } from "./profile-screen"
import { useLocale } from "@/lib/locale-context"
import Image from "next/image"

type NavTab = "home" | "search" | "saved" | "profile"

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all",
        active ? "text-[#F54036]" : "text-[#6B6B73] hover:text-[#1B1B1F]"
      )}
    >
      <Icon className={cn("w-6 h-6", active && "stroke-[2.5]")} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<NavTab>("home")
  const { t } = useLocale()

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <SearchScreen />
      case "saved":
        return <SavedScreen />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA]">
      {renderContent()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ECE7E6] z-50">
        <div className="flex items-center justify-around py-2 px-4 relative">
          <NavButton 
            icon={Home} 
            label={t("nav.home")} 
            active={activeTab === "home"} 
            onClick={() => setActiveTab("home")} 
          />
          <NavButton 
            icon={Search} 
            label={t("nav.search")} 
            active={activeTab === "search"} 
            onClick={() => setActiveTab("search")} 
          />
          
          {/* Central FAB Button */}
          <button className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-[#F54036] text-white shadow-lg hover:bg-[#E03A30] active:scale-95 transition-all flex items-center justify-center">
            <Plus className="w-7 h-7" />
          </button>
          
          <div className="w-14" />
          
          <NavButton 
            icon={Bookmark} 
            label={t("nav.saved")} 
            active={activeTab === "saved"} 
            onClick={() => setActiveTab("saved")} 
          />
          <NavButton 
            icon={User} 
            label={t("nav.profile")} 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")} 
          />
        </div>
      </nav>
    </div>
  )
}

const popularChefs = [
  { id: 1, name: "María G.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "Carlos L.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Ana M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { id: 4, name: "Diego R.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
  { id: 5, name: "Laura S.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
]

const topRecipes = [
  { id: 1, name: "Pasta Carbonara", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop", rating: 4.9, author: "María García" },
  { id: 2, name: "Ensalada César", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop", rating: 4.7, author: "Carlos López" },
  { id: 3, name: "Risotto de Hongos", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop", rating: 4.8, author: "Ana Martínez" },
]

const recommendedRecipes = [
  { id: 1, name: "Tiramisú Clásico", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop", rating: 4.8, author: "Ana Martínez" },
  { id: 2, name: "Tacos de Pollo", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop", rating: 4.9, author: "Laura Sánchez" },
]

function HomeContent() {
  const { t } = useLocale()

  const categories = [
    { id: 1, name: t("category.desserts"), emoji: "🍰" },
    { id: 2, name: t("category.meats"), emoji: "🥩" },
    { id: 3, name: t("category.pasta"), emoji: "🍝" },
    { id: 4, name: t("category.fish"), emoji: "🐟" },
    { id: 5, name: t("category.salads"), emoji: "🥗" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#1B1B1F]">{t("home.title").split(" ").slice(0, -1).join(" ")}</h1>
            <h1 className="text-xl font-semibold text-[#F54036]">{t("home.title").split(" ").slice(-1)}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-2xl bg-white border border-[#ECE7E6] flex items-center justify-center text-[#1B1B1F] hover:bg-[#FFF2F1] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F54036] rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#F54036]">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#6B6B73]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={t("home.search")}
            className="w-full pl-12 pr-14 py-3.5 bg-white border border-[#ECE7E6] rounded-2xl text-[#1B1B1F] placeholder:text-[#6B6B73] focus:outline-none focus:border-[#F54036]"
          />
          <button className="absolute right-2 w-10 h-10 rounded-full bg-[#F54036] flex items-center justify-center text-white hover:bg-[#E03A30] transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chefs populares */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-base font-semibold text-[#1B1B1F]">{t("home.popularChefs")}</h2>
          <button className="text-sm text-[#F54036] font-medium">{t("home.seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-5">
          {popularChefs.map((chef) => (
            <button key={chef.id} className="flex flex-col items-center flex-shrink-0 group">
              <div className="w-16 h-16 rounded-full p-0.5 bg-[#F54036] mb-1.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={chef.avatar || "/placeholder.svg"}
                    alt={chef.name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <span className="text-xs text-[#6B6B73] w-16 truncate text-center">{chef.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recetas más votadas */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-base font-semibold text-[#1B1B1F]">{t("home.topRated")}</h2>
          <button className="text-sm text-[#F54036] font-medium">{t("home.seeAll")}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-5">
          {topRecipes.map((recipe) => (
            <div key={recipe.id} className="flex-shrink-0 w-64 rounded-2xl overflow-hidden bg-white border border-[#ECE7E6]">
              <div className="relative h-36">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-[#1B1B1F] text-sm mb-1">{recipe.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B6B73]">por {recipe.author}</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEE3E1] rounded-full">
                    <Star className="w-3 h-3 fill-[#F54036] text-[#F54036]" />
                    <span className="text-xs font-semibold text-[#F54036]">{recipe.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="mb-6">
        <h2 className="px-5 text-base font-semibold text-[#1B1B1F] mb-3">{t("home.categories")}</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#ECE7E6] hover:border-[#F54036] transition-colors flex-shrink-0"
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="text-sm font-medium text-[#1B1B1F]">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recomendadas */}
      <section className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[#1B1B1F]">{t("home.forYou")}</h2>
          <button className="text-sm text-[#F54036] font-medium">{t("home.seeAll")}</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {recommendedRecipes.map((recipe) => (
            <div key={recipe.id} className="rounded-2xl overflow-hidden bg-white border border-[#ECE7E6]">
              <div className="relative h-28">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2.5">
                <h3 className="font-medium text-[#1B1B1F] text-sm truncate">{recipe.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#6B6B73] truncate">{recipe.author}</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#FEE3E1] rounded-full">
                    <Star className="w-3 h-3 fill-[#F54036] text-[#F54036]" />
                    <span className="text-xs font-semibold text-[#F54036]">{recipe.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
