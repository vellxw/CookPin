"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { RegisterScreen } from "@/components/register-screen"
import { DietSelectionScreen, NameInputScreen, UnwantedFoodsScreen } from "@/components/onboarding-screen"
import { HomeScreen } from "@/components/home-screen"

type AppScreen = "welcome" | "register" | "login" | "diet-selection" | "name-input" | "unwanted-foods" | "home"

export default function CookPinApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome")

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen 
            onStart={() => setCurrentScreen("register")}
            onLogin={() => setCurrentScreen("login")}
          />
        )
      case "register":
        return (
          <RegisterScreen 
            onContinue={() => setCurrentScreen("diet-selection")}
            onBack={() => setCurrentScreen("welcome")}
            onGoogleSignIn={() => setCurrentScreen("diet-selection")}
          />
        )
      case "login":
        return (
          <RegisterScreen 
            onContinue={() => setCurrentScreen("home")}
            onBack={() => setCurrentScreen("welcome")}
            onGoogleSignIn={() => setCurrentScreen("home")}
          />
        )
      case "diet-selection":
        return (
          <DietSelectionScreen 
            onContinue={() => setCurrentScreen("name-input")}
            onBack={() => setCurrentScreen("register")}
            onSkip={() => setCurrentScreen("name-input")}
          />
        )
      case "name-input":
        return (
          <NameInputScreen 
            onContinue={() => setCurrentScreen("unwanted-foods")}
            onBack={() => setCurrentScreen("diet-selection")}
          />
        )
      case "unwanted-foods":
        return (
          <UnwantedFoodsScreen 
            onContinue={() => setCurrentScreen("home")}
            onBack={() => setCurrentScreen("name-input")}
            onSkip={() => setCurrentScreen("home")}
          />
        )
      case "home":
        return <HomeScreen />
      default:
        return <WelcomeScreen onStart={() => setCurrentScreen("register")} onLogin={() => setCurrentScreen("login")} />
    }
  }

  return (
    <div className="max-w-md mx-auto bg-[#FFFBFA] min-h-screen shadow-2xl relative overflow-hidden">
      {/* Mobile device frame effect */}
      <div className="absolute inset-0 pointer-events-none z-50 border border-[#ECE7E6] rounded-[2rem]" />
      
      {renderScreen()}
    </div>
  )
}
