"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type Locale = "es" | "en" | "pt"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

// Translations
const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Welcome
    "welcome.tagline": "Descubrí, cocinás, compartís.",
    "welcome.start": "Comenzar",
    "welcome.login": "Iniciar sesión",
    "welcome.hasAccount": "¿Ya tenés una cuenta?",
    
    // Register
    "register.title": "Crear cuenta",
    "register.subtitle": "Unite a la comunidad de cocineros",
    "register.name": "Nombre completo",
    "register.email": "Email",
    "register.password": "Contraseña",
    "register.continue": "Continuar",
    "register.orContinue": "o continuar con",
    "register.hasAccount": "¿Ya tenés una cuenta?",
    "register.login": "Iniciar sesión",
    
    // Onboarding
    "onboarding.diets.title": "¿Seguís alguna dieta?",
    "onboarding.diets.subtitle": "Seleccioná las que apliquen para personalizar tus recetas",
    "onboarding.diets.selected": "Dietas seleccionadas",
    "onboarding.diets.continue": "Continuar",
    "onboarding.diets.skip": "Omitir",
    "onboarding.name.title": "¿Cómo te llamás?",
    "onboarding.name.subtitle": "Así te saludamos en la app",
    "onboarding.name.placeholder": "Tu nombre",
    "onboarding.name.continue": "Continuar",
    "onboarding.dislikes.title": "¿Hay algo que no te guste?",
    "onboarding.dislikes.subtitle": "Evitaremos estos ingredientes en tus sugerencias",
    "onboarding.dislikes.placeholder": "Ej: cebolla, cilantro...",
    "onboarding.dislikes.add": "Agregar",
    "onboarding.dislikes.finish": "Finalizar",
    "onboarding.dislikes.skip": "Omitir",
    
    // Home
    "home.greeting": "Hola",
    "home.title": "Encontrá las mejores recetas",
    "home.search": "Buscá una receta...",
    "home.popularChefs": "Chefs populares",
    "home.seeAll": "Ver todo",
    "home.topRated": "Recetas más votadas",
    "home.categories": "Categorías",
    "home.forYou": "Para vos",
    "home.followers": "seguidores",
    
    // Categories
    "category.desserts": "Postres",
    "category.meats": "Carnes",
    "category.pasta": "Pastas",
    "category.fish": "Pescados",
    "category.salads": "Ensaladas",
    "category.soups": "Sopas",
    
    // Search
    "search.title": "Buscar",
    "search.placeholder": "Buscá recetas, ingredientes...",
    "search.empty.title": "Descubrí algo nuevo",
    "search.empty.subtitle": "Buscá por nombre, ingrediente o categoría",
    "search.popular": "Búsquedas populares",
    "search.quickCategories": "Categorías rápidas",
    "search.suggestedChefs": "Chefs sugeridos",
    "search.recent": "Búsquedas recientes",
    "search.recent.empty": "Tus búsquedas aparecerán acá",
    "search.quick.30min": "30 min o menos",
    "search.quick.beginners": "Para principiantes",
    "search.quick.healthy": "Saludables",
    "search.quick.economic": "Económicas",
    
    // Saved
    "saved.title": "Guardados",
    "saved.empty.title": "Tu recetario personal",
    "saved.empty.subtitle": "Guardá tus recetas favoritas para encontrarlas fácilmente",
    "saved.explore": "Explorar recetas",
    "saved.collections": "Colecciones sugeridas",
    "saved.mostSaved": "Las más guardadas",
    "saved.tip": "Tocá el ícono de guardar en cualquier receta para agregarla acá",
    "saved.collection.favorites": "Favoritos",
    "saved.collection.toTry": "Para probar",
    "saved.collection.quick": "Rápidas",
    "saved.collection.guests": "Para invitados",
    
    // Profile
    "profile.title": "Perfil",
    "profile.welcome": "¡Bienvenido/a!",
    "profile.subtitle": "Completá tu perfil para conectar con otros cocineros",
    "profile.complete": "Completar perfil",
    "profile.recipes": "Recetas",
    "profile.followers": "Seguidores",
    "profile.following": "Siguiendo",
    "profile.achievements": "Logros por desbloquear",
    "profile.achievement.first": "Primera receta",
    "profile.achievement.firstDesc": "Publicá tu primera receta",
    "profile.achievement.popular": "Chef popular",
    "profile.achievement.popularDesc": "Conseguí 10 seguidores",
    "profile.achievement.explorer": "Explorador/a",
    "profile.achievement.explorerDesc": "Guardá 20 recetas",
    "profile.cta.title": "¿Tenés una receta especial?",
    "profile.cta.subtitle": "Compartila con la comunidad y recibí feedback",
    "profile.cta.button": "Publicar mi primera receta",
    "profile.settings": "Configuración",
    "profile.settings.account": "Mi cuenta",
    "profile.settings.notifications": "Notificaciones",
    "profile.settings.privacy": "Privacidad",
    "profile.settings.help": "Ayuda",
    
    // Navigation
    "nav.home": "Inicio",
    "nav.search": "Buscar",
    "nav.saved": "Guardados",
    "nav.profile": "Perfil",
    
    // Language
    "language.title": "Idioma",
    "language.es": "Español",
    "language.en": "English",
    "language.pt": "Português",
    
    // Common
    "common.min": "min",
    "common.recipe": "receta",
    "common.recipes": "recetas",
    "common.by": "por",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.back": "Volver",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.retry": "Reintentar",
    
    // Recipe Detail
    "recipe.ingredients": "Ingredientes",
    "recipe.steps": "Preparacion",
    "recipe.step": "Paso",
    "recipe.prepTime": "Preparacion",
    "recipe.cookTime": "Coccion",
    "recipe.servings": "Porciones",
    "recipe.cookMode": "Modo cocina",
    "recipe.edit": "Editar receta",
    "recipe.delete": "Eliminar receta",
    "recipe.deleteConfirm": "Estas seguro de eliminar esta receta?",
    "recipe.deleteConfirmDesc": "Esta accion no se puede deshacer",
    "recipe.saved": "Receta guardada",
    "recipe.deleted": "Receta eliminada",
    "recipe.addedFavorites": "Agregada a favoritos",
    "recipe.removedFavorites": "Eliminada de favoritos",
    
    // Recipe Form
    "form.createTitle": "Nueva receta",
    "form.editTitle": "Editar receta",
    "form.title": "Titulo",
    "form.titlePlaceholder": "Ej: Pasta Carbonara",
    "form.titleRequired": "El titulo es requerido",
    "form.description": "Descripcion",
    "form.descriptionPlaceholder": "Conta de que va tu receta...",
    "form.prepTime": "Tiempo de preparacion",
    "form.cookTime": "Tiempo de coccion",
    "form.servings": "Porciones",
    "form.tags": "Etiquetas",
    "form.tagsPlaceholder": "Ej: facil, italiana",
    "form.addTag": "Agregar",
    "form.ingredients": "Ingredientes",
    "form.ingredientName": "Ingrediente",
    "form.ingredientQty": "Cant.",
    "form.ingredientUnit": "Unidad",
    "form.addIngredient": "Agregar ingrediente",
    "form.steps": "Pasos",
    "form.stepPlaceholder": "Describe este paso...",
    "form.addStep": "Agregar paso",
    "form.save": "Guardar receta",
    "form.saving": "Guardando...",
    "form.validation.title": "Necesitas un titulo",
    "form.validation.ingredients": "Agrega al menos un ingrediente",
    "form.validation.steps": "Agrega al menos un paso",
    
    // Search results
    "search.results": "resultados",
    "search.noResults": "Sin resultados",
    "search.noResultsDesc": "No encontramos recetas con ese criterio",
    "search.tryAnother": "Proba con otras palabras",
    
    // Snackbars
    "snack.recipeSaved": "Receta guardada exitosamente",
    "snack.recipeDeleted": "Receta eliminada",
    "snack.addedFavorite": "Agregada a favoritos",
    "snack.removedFavorite": "Eliminada de favoritos",
    "snack.error": "Algo salio mal",
  },
  en: {
    // Welcome
    "welcome.tagline": "Discover, cook, share.",
    "welcome.start": "Get Started",
    "welcome.login": "Log in",
    "welcome.hasAccount": "Already have an account?",
    
    // Register
    "register.title": "Create account",
    "register.subtitle": "Join the cooking community",
    "register.name": "Full name",
    "register.email": "Email",
    "register.password": "Password",
    "register.continue": "Continue",
    "register.orContinue": "or continue with",
    "register.hasAccount": "Already have an account?",
    "register.login": "Log in",
    
    // Onboarding
    "onboarding.diets.title": "Do you follow any diet?",
    "onboarding.diets.subtitle": "Select those that apply to personalize your recipes",
    "onboarding.diets.selected": "Diets selected",
    "onboarding.diets.continue": "Continue",
    "onboarding.diets.skip": "Skip",
    "onboarding.name.title": "What's your name?",
    "onboarding.name.subtitle": "So we can greet you in the app",
    "onboarding.name.placeholder": "Your name",
    "onboarding.name.continue": "Continue",
    "onboarding.dislikes.title": "Anything you don't like?",
    "onboarding.dislikes.subtitle": "We'll avoid these ingredients in your suggestions",
    "onboarding.dislikes.placeholder": "E.g: onion, cilantro...",
    "onboarding.dislikes.add": "Add",
    "onboarding.dislikes.finish": "Finish",
    "onboarding.dislikes.skip": "Skip",
    
    // Home
    "home.greeting": "Hi",
    "home.title": "Find the best recipes",
    "home.search": "Search for a recipe...",
    "home.popularChefs": "Popular chefs",
    "home.seeAll": "See all",
    "home.topRated": "Top rated recipes",
    "home.categories": "Categories",
    "home.forYou": "For you",
    "home.followers": "followers",
    
    // Categories
    "category.desserts": "Desserts",
    "category.meats": "Meats",
    "category.pasta": "Pasta",
    "category.fish": "Fish",
    "category.salads": "Salads",
    "category.soups": "Soups",
    
    // Search
    "search.title": "Search",
    "search.placeholder": "Search recipes, ingredients...",
    "search.empty.title": "Discover something new",
    "search.empty.subtitle": "Search by name, ingredient or category",
    "search.popular": "Popular searches",
    "search.quickCategories": "Quick categories",
    "search.suggestedChefs": "Suggested chefs",
    "search.recent": "Recent searches",
    "search.recent.empty": "Your searches will appear here",
    "search.quick.30min": "30 min or less",
    "search.quick.beginners": "For beginners",
    "search.quick.healthy": "Healthy",
    "search.quick.economic": "Budget-friendly",
    
    // Saved
    "saved.title": "Saved",
    "saved.empty.title": "Your personal cookbook",
    "saved.empty.subtitle": "Save your favorite recipes to find them easily",
    "saved.explore": "Explore recipes",
    "saved.collections": "Suggested collections",
    "saved.mostSaved": "Most saved",
    "saved.tip": "Tap the save icon on any recipe to add it here",
    "saved.collection.favorites": "Favorites",
    "saved.collection.toTry": "To try",
    "saved.collection.quick": "Quick ones",
    "saved.collection.guests": "For guests",
    
    // Profile
    "profile.title": "Profile",
    "profile.welcome": "Welcome!",
    "profile.subtitle": "Complete your profile to connect with other cooks",
    "profile.complete": "Complete profile",
    "profile.recipes": "Recipes",
    "profile.followers": "Followers",
    "profile.following": "Following",
    "profile.achievements": "Achievements to unlock",
    "profile.achievement.first": "First recipe",
    "profile.achievement.firstDesc": "Publish your first recipe",
    "profile.achievement.popular": "Popular chef",
    "profile.achievement.popularDesc": "Get 10 followers",
    "profile.achievement.explorer": "Explorer",
    "profile.achievement.explorerDesc": "Save 20 recipes",
    "profile.cta.title": "Have a special recipe?",
    "profile.cta.subtitle": "Share it with the community and get feedback",
    "profile.cta.button": "Publish my first recipe",
    "profile.settings": "Settings",
    "profile.settings.account": "My account",
    "profile.settings.notifications": "Notifications",
    "profile.settings.privacy": "Privacy",
    "profile.settings.help": "Help",
    
    // Navigation
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.saved": "Saved",
    "nav.profile": "Profile",
    
    // Language
    "language.title": "Language",
    "language.es": "Español",
    "language.en": "English",
    "language.pt": "Português",
    
    // Common
    "common.min": "min",
    "common.recipe": "recipe",
    "common.recipes": "recipes",
  },
  pt: {
    // Welcome
    "welcome.tagline": "Descubra, cozinhe, compartilhe.",
    "welcome.start": "Começar",
    "welcome.login": "Entrar",
    "welcome.hasAccount": "Já tem uma conta?",
    
    // Register
    "register.title": "Criar conta",
    "register.subtitle": "Junte-se à comunidade de cozinheiros",
    "register.name": "Nome completo",
    "register.email": "Email",
    "register.password": "Senha",
    "register.continue": "Continuar",
    "register.orContinue": "ou continuar com",
    "register.hasAccount": "Já tem uma conta?",
    "register.login": "Entrar",
    
    // Onboarding
    "onboarding.diets.title": "Você segue alguma dieta?",
    "onboarding.diets.subtitle": "Selecione as que se aplicam para personalizar suas receitas",
    "onboarding.diets.selected": "Dietas selecionadas",
    "onboarding.diets.continue": "Continuar",
    "onboarding.diets.skip": "Pular",
    "onboarding.name.title": "Qual é o seu nome?",
    "onboarding.name.subtitle": "Assim podemos cumprimentá-lo no app",
    "onboarding.name.placeholder": "Seu nome",
    "onboarding.name.continue": "Continuar",
    "onboarding.dislikes.title": "Tem algo que você não gosta?",
    "onboarding.dislikes.subtitle": "Evitaremos esses ingredientes nas suas sugestões",
    "onboarding.dislikes.placeholder": "Ex: cebola, coentro...",
    "onboarding.dislikes.add": "Adicionar",
    "onboarding.dislikes.finish": "Finalizar",
    "onboarding.dislikes.skip": "Pular",
    
    // Home
    "home.greeting": "Olá",
    "home.title": "Encontre as melhores receitas",
    "home.search": "Busque uma receita...",
    "home.popularChefs": "Chefs populares",
    "home.seeAll": "Ver tudo",
    "home.topRated": "Receitas mais votadas",
    "home.categories": "Categorias",
    "home.forYou": "Para você",
    "home.followers": "seguidores",
    
    // Categories
    "category.desserts": "Sobremesas",
    "category.meats": "Carnes",
    "category.pasta": "Massas",
    "category.fish": "Peixes",
    "category.salads": "Saladas",
    "category.soups": "Sopas",
    
    // Search
    "search.title": "Buscar",
    "search.placeholder": "Busque receitas, ingredientes...",
    "search.empty.title": "Descubra algo novo",
    "search.empty.subtitle": "Busque por nome, ingrediente ou categoria",
    "search.popular": "Buscas populares",
    "search.quickCategories": "Categorias rápidas",
    "search.suggestedChefs": "Chefs sugeridos",
    "search.recent": "Buscas recentes",
    "search.recent.empty": "Suas buscas aparecerão aqui",
    "search.quick.30min": "30 min ou menos",
    "search.quick.beginners": "Para iniciantes",
    "search.quick.healthy": "Saudáveis",
    "search.quick.economic": "Econômicas",
    
    // Saved
    "saved.title": "Salvos",
    "saved.empty.title": "Seu livro de receitas pessoal",
    "saved.empty.subtitle": "Salve suas receitas favoritas para encontrá-las facilmente",
    "saved.explore": "Explorar receitas",
    "saved.collections": "Coleções sugeridas",
    "saved.mostSaved": "Mais salvos",
    "saved.tip": "Toque no ícone de salvar em qualquer receita para adicioná-la aqui",
    "saved.collection.favorites": "Favoritos",
    "saved.collection.toTry": "Para experimentar",
    "saved.collection.quick": "Rápidas",
    "saved.collection.guests": "Para convidados",
    
    // Profile
    "profile.title": "Perfil",
    "profile.welcome": "Bem-vindo/a!",
    "profile.subtitle": "Complete seu perfil para conectar com outros cozinheiros",
    "profile.complete": "Completar perfil",
    "profile.recipes": "Receitas",
    "profile.followers": "Seguidores",
    "profile.following": "Seguindo",
    "profile.achievements": "Conquistas para desbloquear",
    "profile.achievement.first": "Primeira receita",
    "profile.achievement.firstDesc": "Publique sua primeira receita",
    "profile.achievement.popular": "Chef popular",
    "profile.achievement.popularDesc": "Consiga 10 seguidores",
    "profile.achievement.explorer": "Explorador/a",
    "profile.achievement.explorerDesc": "Salve 20 receitas",
    "profile.cta.title": "Tem uma receita especial?",
    "profile.cta.subtitle": "Compartilhe com a comunidade e receba feedback",
    "profile.cta.button": "Publicar minha primeira receita",
    "profile.settings": "Configurações",
    "profile.settings.account": "Minha conta",
    "profile.settings.notifications": "Notificações",
    "profile.settings.privacy": "Privacidade",
    "profile.settings.help": "Ajuda",
    
    // Navigation
    "nav.home": "Início",
    "nav.search": "Buscar",
    "nav.saved": "Salvos",
    "nav.profile": "Perfil",
    
    // Language
    "language.title": "Idioma",
    "language.es": "Español",
    "language.en": "English",
    "language.pt": "Português",
    
    // Common
    "common.min": "min",
    "common.recipe": "receita",
    "common.recipes": "receitas",
  },
}

const LOCALE_STORAGE_KEY = "cookpin-locale"

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved locale on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
    if (savedLocale && ["es", "en", "pt"].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
    setIsLoaded(true)
  }, [])

  // Save locale when it changes
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }, [])

  // Translation function
  const t = useCallback((key: string): string => {
    return translations[locale][key] || key
  }, [locale])

  // Don't render until locale is loaded to prevent flash
  if (!isLoaded) {
    return null
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

// Language selector component
export function LanguageSelector({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const { locale, setLocale, t } = useLocale()

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "es", label: t("language.es"), flag: "🇪🇸" },
    { code: "en", label: t("language.en"), flag: "🇺🇸" },
    { code: "pt", label: t("language.pt"), flag: "🇧🇷" },
  ]

  const handleSelect = (code: Locale) => {
    setLocale(code)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/20 z-50"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mt-3" />
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t("language.title")}
          </h3>
          
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                  locale === lang.code 
                    ? "bg-secondary text-primary" 
                    : "bg-background hover:bg-muted"
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
                {locale === lang.code && (
                  <svg 
                    className="w-5 h-5 ml-auto text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
