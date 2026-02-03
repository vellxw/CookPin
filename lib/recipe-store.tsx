"use client"

import React, { createContext, useContext, useState, useCallback, useMemo } from "react"

// Types
export interface Ingredient {
  id: string
  name: string
  quantity?: string
  unit?: string
}

export interface Recipe {
  id: string
  title: string
  description?: string
  image: string
  author: string
  authorAvatar?: string
  rating: number
  prepTime?: number
  cookTime?: number
  servings?: number
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
  isFavorite: boolean
  createdAt: Date
  category?: string
}

export interface RecipeStore {
  recipes: Recipe[]
  createRecipe: (recipe: Omit<Recipe, "id" | "createdAt" | "rating">) => Recipe
  updateRecipe: (id: string, updates: Partial<Recipe>) => void
  deleteRecipe: (id: string) => void
  toggleFavorite: (id: string) => void
  searchRecipes: (query: string) => Recipe[]
  getRecipeById: (id: string) => Recipe | undefined
  getFavorites: () => Recipe[]
  getByCategory: (category: string) => Recipe[]
}

const RecipeContext = createContext<RecipeStore | undefined>(undefined)

// Seed data
const seedRecipes: Recipe[] = [
  {
    id: "1",
    title: "Pasta Carbonara",
    description: "La autentica pasta carbonara italiana con huevo, panceta y parmesano",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    author: "Maria Garcia",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.9,
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    tags: ["pasta", "italiana", "rapida"],
    ingredients: [
      { id: "1", name: "Espaguetis", quantity: "400", unit: "g" },
      { id: "2", name: "Panceta", quantity: "200", unit: "g" },
      { id: "3", name: "Huevos", quantity: "4", unit: "" },
      { id: "4", name: "Parmesano rallado", quantity: "100", unit: "g" },
      { id: "5", name: "Pimienta negra", quantity: "", unit: "al gusto" },
    ],
    steps: [
      "Cocinar la pasta en agua con sal hasta que este al dente",
      "Cortar la panceta en cubos y dorar en una sarten sin aceite",
      "Batir los huevos con el parmesano y pimienta",
      "Escurrir la pasta y mezclar con la panceta caliente",
      "Retirar del fuego y agregar la mezcla de huevo",
      "Mezclar rapidamente y servir con mas parmesano"
    ],
    isFavorite: false,
    createdAt: new Date("2024-01-15"),
    category: "pasta"
  },
  {
    id: "2",
    title: "Ensalada Cesar",
    description: "Ensalada clasica con aderezo casero, crutones crujientes y pollo a la plancha",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    author: "Carlos Lopez",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.7,
    prepTime: 20,
    cookTime: 10,
    servings: 2,
    tags: ["ensalada", "saludable", "pollo"],
    ingredients: [
      { id: "1", name: "Lechuga romana", quantity: "1", unit: "unidad" },
      { id: "2", name: "Pechuga de pollo", quantity: "200", unit: "g" },
      { id: "3", name: "Pan", quantity: "2", unit: "rebanadas" },
      { id: "4", name: "Parmesano", quantity: "50", unit: "g" },
      { id: "5", name: "Anchoas", quantity: "4", unit: "filetes" },
    ],
    steps: [
      "Cortar el pan en cubos y tostar hasta dorar",
      "Cocinar el pollo a la plancha y cortar en tiras",
      "Preparar el aderezo cesar mezclando mayonesa, ajo, limon y anchoas",
      "Mezclar la lechuga con el aderezo",
      "Agregar el pollo, crutones y parmesano"
    ],
    isFavorite: true,
    createdAt: new Date("2024-01-20"),
    category: "salads"
  },
  {
    id: "3",
    title: "Risotto de Hongos",
    description: "Cremoso risotto con hongos mixtos y un toque de trufa",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    author: "Ana Martinez",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.8,
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    tags: ["arroz", "italiana", "vegetariano"],
    ingredients: [
      { id: "1", name: "Arroz arborio", quantity: "300", unit: "g" },
      { id: "2", name: "Hongos mixtos", quantity: "200", unit: "g" },
      { id: "3", name: "Caldo de verduras", quantity: "1", unit: "L" },
      { id: "4", name: "Vino blanco", quantity: "100", unit: "ml" },
      { id: "5", name: "Manteca", quantity: "50", unit: "g" },
    ],
    steps: [
      "Saltear los hongos en manteca y reservar",
      "Tostar el arroz en la misma olla",
      "Agregar el vino y dejar evaporar",
      "Ir agregando caldo caliente de a poco, revolviendo",
      "Cuando el arroz este cremoso, agregar los hongos y mas manteca"
    ],
    isFavorite: false,
    createdAt: new Date("2024-02-01"),
    category: "pasta"
  },
  {
    id: "4",
    title: "Tiramisu Clasico",
    description: "El postre italiano por excelencia con cafe, mascarpone y cacao",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    author: "Ana Martinez",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.9,
    prepTime: 30,
    cookTime: 0,
    servings: 8,
    tags: ["postre", "italiana", "cafe"],
    ingredients: [
      { id: "1", name: "Mascarpone", quantity: "500", unit: "g" },
      { id: "2", name: "Cafe espresso", quantity: "300", unit: "ml" },
      { id: "3", name: "Huevos", quantity: "4", unit: "" },
      { id: "4", name: "Azucar", quantity: "100", unit: "g" },
      { id: "5", name: "Vainillas", quantity: "200", unit: "g" },
    ],
    steps: [
      "Preparar el cafe y dejarlo enfriar",
      "Separar las yemas de las claras",
      "Batir las yemas con el azucar hasta blanquear",
      "Agregar el mascarpone y mezclar",
      "Batir las claras a nieve e incorporar",
      "Mojar las vainillas en cafe y armar capas",
      "Refrigerar minimo 4 horas"
    ],
    isFavorite: true,
    createdAt: new Date("2024-02-10"),
    category: "desserts"
  },
  {
    id: "5",
    title: "Tacos de Pollo",
    description: "Tacos mexicanos con pollo marinado, guacamole y pico de gallo",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    author: "Laura Sanchez",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 4.8,
    prepTime: 25,
    cookTime: 15,
    servings: 4,
    tags: ["mexicana", "pollo", "rapida"],
    ingredients: [
      { id: "1", name: "Pechuga de pollo", quantity: "400", unit: "g" },
      { id: "2", name: "Tortillas de maiz", quantity: "8", unit: "" },
      { id: "3", name: "Aguacate", quantity: "2", unit: "" },
      { id: "4", name: "Tomate", quantity: "2", unit: "" },
      { id: "5", name: "Cebolla", quantity: "1", unit: "" },
    ],
    steps: [
      "Marinar el pollo con especias mexicanas",
      "Cocinar el pollo a la plancha y desmenuzar",
      "Preparar el guacamole machacando aguacate con limon",
      "Hacer el pico de gallo con tomate y cebolla",
      "Calentar las tortillas y armar los tacos"
    ],
    isFavorite: false,
    createdAt: new Date("2024-02-15"),
    category: "meats"
  },
  {
    id: "6",
    title: "Salmon a la Plancha",
    description: "Filete de salmon con costra de hierbas y limon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    author: "Diego Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4.6,
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    tags: ["pescado", "saludable", "rapida"],
    ingredients: [
      { id: "1", name: "Filete de salmon", quantity: "2", unit: "" },
      { id: "2", name: "Limon", quantity: "1", unit: "" },
      { id: "3", name: "Eneldo", quantity: "2", unit: "cucharadas" },
      { id: "4", name: "Aceite de oliva", quantity: "2", unit: "cucharadas" },
      { id: "5", name: "Sal y pimienta", quantity: "", unit: "al gusto" },
    ],
    steps: [
      "Sazonar el salmon con sal, pimienta y eneldo",
      "Calentar una sarten con aceite de oliva",
      "Cocinar el salmon 4-5 minutos por lado",
      "Exprimir limon al servir"
    ],
    isFavorite: false,
    createdAt: new Date("2024-02-20"),
    category: "fish"
  },
  {
    id: "7",
    title: "Brownie de Chocolate",
    description: "Brownies ultra chocolatosos con nueces y centro humedo",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop",
    author: "Maria Garcia",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.9,
    prepTime: 15,
    cookTime: 25,
    servings: 12,
    tags: ["postre", "chocolate", "facil"],
    ingredients: [
      { id: "1", name: "Chocolate negro", quantity: "200", unit: "g" },
      { id: "2", name: "Manteca", quantity: "150", unit: "g" },
      { id: "3", name: "Azucar", quantity: "200", unit: "g" },
      { id: "4", name: "Huevos", quantity: "3", unit: "" },
      { id: "5", name: "Harina", quantity: "100", unit: "g" },
    ],
    steps: [
      "Derretir el chocolate con la manteca a bano maria",
      "Batir los huevos con el azucar",
      "Incorporar el chocolate derretido",
      "Agregar la harina tamizada",
      "Hornear a 180C por 25 minutos"
    ],
    isFavorite: true,
    createdAt: new Date("2024-03-01"),
    category: "desserts"
  },
  {
    id: "8",
    title: "Sopa de Tomate",
    description: "Sopa cremosa de tomate asado con albahaca fresca",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    author: "Carlos Lopez",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.5,
    prepTime: 15,
    cookTime: 40,
    servings: 4,
    tags: ["sopa", "vegetariano", "invierno"],
    ingredients: [
      { id: "1", name: "Tomates", quantity: "1", unit: "kg" },
      { id: "2", name: "Cebolla", quantity: "1", unit: "" },
      { id: "3", name: "Ajo", quantity: "3", unit: "dientes" },
      { id: "4", name: "Albahaca", quantity: "1", unit: "manojo" },
      { id: "5", name: "Crema", quantity: "100", unit: "ml" },
    ],
    steps: [
      "Cortar los tomates y asar en el horno con ajo y cebolla",
      "Licuar todo con el caldo",
      "Cocinar a fuego lento 15 minutos",
      "Agregar la crema y albahaca",
      "Servir caliente con crutones"
    ],
    isFavorite: false,
    createdAt: new Date("2024-03-05"),
    category: "soups"
  }
]

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(seedRecipes)

  const createRecipe = useCallback((recipeData: Omit<Recipe, "id" | "createdAt" | "rating">): Recipe => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: generateId(),
      createdAt: new Date(),
      rating: 0,
    }
    setRecipes(prev => [newRecipe, ...prev])
    return newRecipe
  }, [])

  const updateRecipe = useCallback((id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }, [])

  const deleteRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setRecipes(prev => prev.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ))
  }, [])

  const searchRecipes = useCallback((query: string): Recipe[] => {
    if (!query.trim()) return recipes
    const q = query.toLowerCase()
    return recipes.filter(r => 
      r.title.toLowerCase().includes(q) ||
      r.tags.some(tag => tag.toLowerCase().includes(q)) ||
      r.ingredients.some(ing => ing.name.toLowerCase().includes(q)) ||
      r.author.toLowerCase().includes(q)
    )
  }, [recipes])

  const getRecipeById = useCallback((id: string): Recipe | undefined => {
    return recipes.find(r => r.id === id)
  }, [recipes])

  const getFavorites = useCallback((): Recipe[] => {
    return recipes.filter(r => r.isFavorite)
  }, [recipes])

  const getByCategory = useCallback((category: string): Recipe[] => {
    return recipes.filter(r => r.category === category)
  }, [recipes])

  const value = useMemo(() => ({
    recipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    searchRecipes,
    getRecipeById,
    getFavorites,
    getByCategory,
  }), [recipes, createRecipe, updateRecipe, deleteRecipe, toggleFavorite, searchRecipes, getRecipeById, getFavorites, getByCategory])

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}
