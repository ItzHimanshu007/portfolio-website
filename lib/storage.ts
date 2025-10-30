import portfolioData from "@/data/portfolio-data.json"

const STORAGE_KEY = "portfolio_data"
const ADMIN_PASSWORD = "admin123" // Simple password for demo - change in production

export type PortfolioData = typeof portfolioData

// Initialize storage with default data if not exists
export function initializeStorage() {
  if (typeof window === "undefined") return

  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData))
  }
}

// Get all portfolio data
export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return portfolioData

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : portfolioData
  } catch {
    return portfolioData
  }
}

// Update portfolio data
export function updatePortfolioData(data: PortfolioData) {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  // Trigger storage event for other tabs/windows
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: STORAGE_KEY,
      newValue: JSON.stringify(data),
    }),
  )
}

// Admin authentication
export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("admin_token") === "authenticated"
}

export function setAdminToken() {
  if (typeof window === "undefined") return
  localStorage.setItem("admin_token", "authenticated")
}

export function clearAdminToken() {
  if (typeof window === "undefined") return
  localStorage.removeItem("admin_token")
}
