import { getPortfolioData } from "@/lib/storage"
import { projects, getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects"

// Export the portfolio data (now dynamic)
export function getData() {
  return getPortfolioData()
}

export const data = getPortfolioData()

// Export the projects data
export { projects, getAllProjects, getProjectBySlug, getRelatedProjects }

// Type definitions for the portfolio data
export type PortfolioData = typeof data

// Helper function to get navigation items
export function getNavItems() {
  return getData().navigation
}

// Helper function to get personal information
export function getPersonalInfo() {
  return getData().personal
}

// Helper function to get about information
export function getAboutInfo() {
  return getData().about
}

// Helper function to get experience information
export function getExperienceInfo() {
  return getData().experience
}

// Helper function to get credentials information
export function getCredentialsInfo() {
  return getData().credentials
}

// Helper function to get technical skills information
export function getTechnicalSkillsInfo() {
  return getData().technicalSkills
}

// Helper function to get meta information
export function getMetaInfo() {
  return getData().meta
}
