"use client"

import React, { useState } from "react"
import { PrimaryButton } from "./cookpin-ui"
import { ArrowLeft, Check, X } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import Image from "next/image"

// Diet Selection Screen
export function DietSelectionScreen({
  onContinue,
  onBack,
  onSkip,
}: {
  onContinue: (diets: string[]) => void
  onBack: () => void
  onSkip: () => void
}) {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const { t } = useLocale()

  const diets = [
    { id: "lowcarb", label: "Low Carb", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop" },
    { id: "mediterranea", label: "Mediterránea", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop" },
    { id: "sintacc", label: "Sin TACC", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop" },
    { id: "keto", label: "Keto", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop" },
    { id: "paleo", label: "Paleo", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop" },
    { id: "singluten", label: "Sin Gluten", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop" },
    { id: "vegana", label: "Vegana", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=200&h=200&fit=crop" },
    { id: "vegetariana", label: "Vegetariana", image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=200&h=200&fit=crop" },
  ]

  const toggleDiet = (id: string) => {
    setSelectedDiets(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("onboarding.diets.skip")}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-28 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("onboarding.diets.title")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("onboarding.diets.subtitle")}
        </p>

        {/* Diet Grid */}
        <div className="grid grid-cols-2 gap-4">
          {diets.map((diet) => (
            <button
              key={diet.id}
              onClick={() => toggleDiet(diet.id)}
              className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                selectedDiets.includes(diet.id)
                  ? "border-[#F54036] bg-[#FFF2F1]"
                  : "border-border bg-card hover:border-[#FEE3E1]"
              }`}
            >
              {selectedDiets.includes(diet.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#F54036] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-border">
                <Image
                  src={diet.image || "/placeholder.svg"}
                  alt={diet.label}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-medium text-foreground text-sm">{diet.label}</span>
            </button>
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {t("onboarding.diets.selected")}: <span className="font-semibold text-[#F54036]">{selectedDiets.length}/8</span>
        </p>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <PrimaryButton 
          onClick={() => onContinue(selectedDiets)} 
          className="w-full"
          size="lg"
        >
          {t("onboarding.diets.continue")}
        </PrimaryButton>
      </div>
    </div>
  )
}

// Name Input Screen
export function NameInputScreen({
  onContinue,
  onBack,
}: {
  onContinue: (name: string) => void
  onBack: () => void
}) {
  const [name, setName] = useState("")
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-[#FFF2F1] rounded-b-[50px]" />
      
      {/* Header */}
      <div className="relative z-10 px-4 pt-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-card flex items-center justify-center text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-16 relative z-10">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("onboarding.name.title")}</h1>
        <p className="text-muted-foreground mb-8">
          {t("onboarding.name.subtitle")}
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("onboarding.name.placeholder")}
          className="w-full px-4 py-4 bg-card border border-border rounded-2xl text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-[#F54036] focus:ring-1 focus:ring-[#F54036]"
          autoFocus
        />
      </div>

      {/* Bottom action */}
      <div className="px-6 pb-10">
        <PrimaryButton 
          onClick={() => onContinue(name)} 
          className="w-full"
          size="lg"
          disabled={!name.trim()}
        >
          {t("onboarding.name.continue")}
        </PrimaryButton>
      </div>
    </div>
  )
}

// Unwanted Foods Screen
export function UnwantedFoodsScreen({
  onContinue,
  onBack,
  onSkip,
}: {
  onContinue: (foods: string[]) => void
  onBack: () => void
  onSkip: () => void
}) {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const { t } = useLocale()

  const foods = [
    "Mariscos", "Lácteos", "Huevos", "Frutos secos", 
    "Soja", "Cerdo", "Carne roja", "Picante",
    "Cilantro", "Hongos", "Aceitunas", "Cebolla"
  ]

  const toggleFood = (food: string) => {
    setSelectedFoods(prev => 
      prev.includes(food) ? prev.filter(f => f !== food) : [...prev, food]
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("onboarding.dislikes.skip")}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("onboarding.dislikes.title")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("onboarding.dislikes.subtitle")}
        </p>

        {/* Food Chips */}
        <div className="flex flex-wrap gap-3">
          {foods.map((food) => (
            <button
              key={food}
              onClick={() => toggleFood(food)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedFoods.includes(food)
                  ? "bg-[#FEE3E1] text-[#F54036] border-2 border-[#F54036]"
                  : "bg-card text-foreground border border-border hover:border-[#F54036]"
              }`}
            >
              {food}
              {selectedFoods.includes(food) && (
                <X className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>

        {selectedFoods.length > 0 && (
          <p className="text-sm text-muted-foreground mt-6">
            {selectedFoods.length} ingrediente{selectedFoods.length > 1 ? "s" : ""} excluido{selectedFoods.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-6 pb-10">
        <PrimaryButton 
          onClick={() => onContinue(selectedFoods)} 
          className="w-full"
          size="lg"
        >
          {t("onboarding.dislikes.finish")}
        </PrimaryButton>
      </div>
    </div>
  )
}
