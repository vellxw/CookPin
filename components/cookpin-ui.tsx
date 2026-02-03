"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Star, Mic } from "lucide-react"
import Image from "next/image"

// Primary Button
export function PrimaryButton({
  children,
  onClick,
  className,
  variant = "filled",
  size = "default",
  disabled = false,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "filled" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-semibold rounded-2xl transition-all active:scale-[0.98]",
        size === "sm" && "px-4 py-2 text-sm",
        size === "default" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        variant === "filled" && "bg-[#F54036] text-white hover:bg-[#E03A30]",
        variant === "outline" && "border-2 border-[#F54036] text-[#F54036] bg-transparent hover:bg-[#FFF2F1]",
        variant === "ghost" && "text-[#F54036] hover:bg-[#FFF2F1]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}

// Recipe Card
export function RecipeCard({
  image,
  title,
  author,
  rating,
  size = "default",
  className,
}: {
  image: string
  title: string
  author: string
  rating: number
  size?: "default" | "large"
  className?: string
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden",
        size === "large" ? "w-64 flex-shrink-0" : "w-full",
        className
      )}
    >
      <div className={cn("relative", size === "large" ? "h-36" : "h-32")}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{author}</span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEE3E1] rounded-full">
            <Star className="w-3 h-3 fill-[#F54036] text-[#F54036]" />
            <span className="text-xs font-semibold text-[#F54036]">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Chef Avatar
export function ChefAvatar({
  image,
  name,
  size = "default",
  selected = false,
  onClick,
}: {
  image: string
  name: string
  size?: "default" | "large"
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 flex-shrink-0",
        size === "large" ? "w-20" : "w-16"
      )}
    >
      <div
        className={cn(
          "rounded-full p-0.5",
          selected ? "bg-[#F54036]" : "bg-border"
        )}
      >
        <div className="rounded-full overflow-hidden bg-card">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={size === "large" ? 64 : 52}
            height={size === "large" ? 64 : 52}
            className="object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-muted-foreground truncate w-full text-center">
        {name}
      </span>
    </button>
  )
}

// Category Chip
export function CategoryChip({
  label,
  icon,
  selected = false,
  onClick,
}: {
  label: string
  icon?: React.ReactNode
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0",
        selected
          ? "bg-[#FEE3E1] text-[#F54036] border-2 border-[#F54036]"
          : "bg-card text-foreground border border-border hover:border-[#F54036]"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

// Empty State
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-[#FFF2F1] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  )
}

// Top Search Bar
export function TopSearchBar({
  placeholder = "Buscá una receta...",
  value,
  onChange,
  onMicClick,
}: {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onMicClick?: () => void
}) {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-4 text-muted-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-12 pr-14 py-3.5 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F54036] focus:ring-1 focus:ring-[#F54036]"
      />
      <button
        onClick={onMicClick}
        className="absolute right-2 w-10 h-10 rounded-full bg-[#F54036] flex items-center justify-center text-white hover:bg-[#E03A30] transition-colors"
      >
        <Mic className="w-5 h-5" />
      </button>
    </div>
  )
}

// Section Header
export function SectionHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {action}
    </div>
  )
}

// Collection Card for Saved screen
export function CollectionCard({
  title,
  count,
  icon,
  onClick,
}: {
  title: string
  count: number
  icon: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-2xl hover:border-[#F54036] transition-colors aspect-square"
    >
      <div className="w-12 h-12 rounded-full bg-[#FFF2F1] flex items-center justify-center mb-2 text-[#F54036]">
        {icon}
      </div>
      <span className="font-semibold text-foreground text-sm">{title}</span>
      <span className="text-xs text-muted-foreground">{count} recetas</span>
    </button>
  )
}
