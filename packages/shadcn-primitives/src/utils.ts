import { clsx, type ClassValue } from 'clsx'
// @ts-ignore - tailwind-merge exports are complex, this works at runtime
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes safely, resolving conflicts via tailwind-merge.
 * Drop-in replacement for the shadcn/ui `cn()` utility.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
