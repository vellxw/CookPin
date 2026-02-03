"use client"

import React from "react"
import { Bookmark, Heart, Sparkles, Star, Clock, Users, FolderPlus } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import Image from "next/image"

const popularToSave = [
  { id: 1, name: "Lasaña Tradicional", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop", rating: 4.9, saves: 2340, author: "Chef María" },
  { id: 2, name: "Cheesecake de Frutos Rojos", image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=300&h=200&fit=crop", rating: 4.8, saves: 1890, author: "Chef Ana" },
  { id: 3, name: "Tacos al Pastor", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop", rating: 4.7, saves: 1560, author: "Chef Carlos" },
]

export function SavedScreen() {
  const { t } = useLocale()

  const suggestedCollections = [
    { id: 1, name: t("saved.collection.favorites"), icon: Heart, description: t("saved.empty.subtitle").split(".")[0] },
    { id: 2, name: t("saved.collection.toTry"), icon: Sparkles, description: t("saved.empty.subtitle").split(".")[0] },
    { id: 3, name: t("saved.collection.quick"), icon: Clock, description: t("search.quick.30min") },
    { id: 4, name: t("saved.collection.guests"), icon: Users, description: t("saved.empty.subtitle").split(".")[0] },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[#1B1B1F]">{t("saved.title")}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5">
        {/* Empty State */}
        <div className="flex flex-col items-center text-center py-8 mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#FFF2F1] flex items-center justify-center">
              <Bookmark className="w-12 h-12 text-[#F54036]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-2 border-[#F54036] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#F54036]" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-[#1B1B1F] mb-2">
            {t("saved.empty.title")}
          </h2>
          <p className="text-[#6B6B73] text-sm max-w-xs mb-6">
            {t("saved.empty.subtitle")}
          </p>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F54036] text-white font-semibold hover:bg-[#E03A30] active:scale-95 transition-all">
            <Sparkles className="w-5 h-5" />
            {t("saved.explore")}
          </button>
        </div>

        {/* Create Collections */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-[#1B1B1F]">{t("saved.collections")}</h2>
            <button className="flex items-center gap-1 text-[#F54036] text-sm font-medium">
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {suggestedCollections.map((collection) => {
              const IconComponent = collection.icon
              return (
                <button 
                  key={collection.id}
                  className="flex flex-col items-center justify-center p-4 bg-white border border-[#ECE7E6] rounded-2xl hover:border-[#F54036] transition-colors text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF2F1] flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 text-[#F54036]" />
                  </div>
                  <h3 className="font-semibold text-[#1B1B1F] text-sm">{collection.name}</h3>
                </button>
              )
            })}
          </div>
        </section>

        {/* Popular Recipes to Save */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#1B1B1F] mb-3">{t("saved.mostSaved")}</h2>
          <div className="space-y-3">
            {popularToSave.map((recipe) => (
              <div 
                key={recipe.id}
                className="flex gap-4 p-3 rounded-2xl bg-white border border-[#ECE7E6]"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1B1B1F] text-sm truncate">{recipe.name}</h3>
                  <p className="text-xs text-[#6B6B73] mb-2">por {recipe.author}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEE3E1] rounded-full">
                      <Star className="w-3 h-3 fill-[#F54036] text-[#F54036]" />
                      <span className="text-xs font-semibold text-[#F54036]">{recipe.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-[#6B6B73]" />
                      <span className="text-xs text-[#6B6B73]">{recipe.saves.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button className="self-center p-2 rounded-full hover:bg-[#FFF2F1] transition-colors">
                  <Bookmark className="w-5 h-5 text-[#6B6B73] hover:text-[#F54036] transition-colors" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tip */}
        <section className="mb-6">
          <div className="p-4 rounded-2xl bg-[#FFF2F1] border border-[#FEE3E1]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FEE3E1] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#F54036]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B1B1F] text-sm mb-1">Tip</h3>
                <p className="text-xs text-[#6B6B73]">
                  {t("saved.tip")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
