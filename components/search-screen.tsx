"use client"

import React, { useState } from "react"
import { Search, TrendingUp, Clock, ChefHat, Mic, Star } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import Image from "next/image"

const popularSearches = [
  "Pasta carbonara",
  "Pollo al horno",
  "Torta de chocolate",
  "Ensalada César",
  "Milanesas",
  "Arroz con pollo"
]

const suggestedChefs = [
  { id: 1, name: "María García", specialty: "Repostería", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "Carlos Ruiz", specialty: "Cocina italiana", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Ana Pérez", specialty: "Comida saludable", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
]

const searchResults = [
  { id: 1, title: "Pasta carbonara tradicional", author: "Carlos R.", rating: 4.9, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop" },
  { id: 2, title: "Spaghetti con albóndigas", author: "María G.", rating: 4.7, image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop" },
]

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLocale()
  const hasSearched = searchQuery.length > 0

  const quickCategories = [
    { id: "30min", label: t("search.quick.30min"), emoji: "⏱️" },
    { id: "principiantes", label: t("search.quick.beginners"), emoji: "👨‍🍳" },
    { id: "economicas", label: t("search.quick.economic"), emoji: "💰" },
    { id: "saludables", label: t("search.quick.healthy"), emoji: "🥗" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[#1B1B1F] mb-4">{t("search.title")}</h1>
        
        {/* Search Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#6B6B73]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-14 py-3.5 bg-white border border-[#ECE7E6] rounded-2xl text-[#1B1B1F] placeholder:text-[#6B6B73] focus:outline-none focus:border-[#F54036]"
          />
          <button className="absolute right-2 w-10 h-10 rounded-full bg-[#F54036] flex items-center justify-center text-white hover:bg-[#E03A30] transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!hasSearched ? (
        /* Empty State - Discovery Mode */
        <div className="flex-1 px-5 overflow-y-auto">
          {/* Recent searches placeholder */}
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#6B6B73]" />
              <h2 className="text-base font-semibold text-[#1B1B1F]">{t("search.recent")}</h2>
            </div>
            <div className="bg-[#FFF2F1] rounded-2xl p-4 text-center">
              <p className="text-sm text-[#6B6B73]">
                {t("search.recent.empty")}
              </p>
            </div>
          </section>

          {/* Popular searches */}
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[#F54036]" />
              <h2 className="text-base font-semibold text-[#1B1B1F]">{t("search.popular")}</h2>
            </div>
            <div className="space-y-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-[#ECE7E6] rounded-2xl hover:border-[#F54036] transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-[#6B6B73]" />
                  <span className="text-[#1B1B1F]">{search}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Quick categories */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-[#1B1B1F] mb-3">{t("search.quickCategories")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickCategories.map((cat) => (
                <button
                  key={cat.id}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-[#ECE7E6] rounded-2xl hover:border-[#F54036] transition-colors"
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-sm font-medium text-[#1B1B1F]">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Suggested chefs */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#F54036]" />
                <h2 className="text-base font-semibold text-[#1B1B1F]">{t("search.suggestedChefs")}</h2>
              </div>
              <button className="text-sm text-[#F54036] font-medium">{t("home.seeAll")}</button>
            </div>
            <div className="space-y-3">
              {suggestedChefs.map((chef) => (
                <button
                  key={chef.id}
                  className="flex items-center gap-3 w-full p-3 bg-white border border-[#ECE7E6] rounded-2xl hover:border-[#F54036] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full p-0.5 bg-[#F54036]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={chef.avatar || "/placeholder.svg"}
                        alt={chef.name}
                        width={44}
                        height={44}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-[#1B1B1F]">{chef.name}</p>
                    <p className="text-sm text-[#6B6B73]">{chef.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Search Results */
        <div className="flex-1 px-5 overflow-y-auto">
          <p className="text-sm text-[#6B6B73] mb-4">
            {searchResults.length} {searchResults.length === 1 ? t("common.recipe") : t("common.recipes")} para "{searchQuery}"
          </p>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((recipe) => (
              <div key={recipe.id} className="rounded-2xl overflow-hidden bg-white border border-[#ECE7E6]">
                <div className="relative h-28">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="font-medium text-[#1B1B1F] text-sm line-clamp-2">{recipe.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-[#6B6B73]">{recipe.author}</span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#FEE3E1] rounded-full">
                      <Star className="w-3 h-3 fill-[#F54036] text-[#F54036]" />
                      <span className="text-xs font-semibold text-[#F54036]">{recipe.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
