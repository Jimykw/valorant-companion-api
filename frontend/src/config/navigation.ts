import type { LucideIcon } from 'lucide-react'
import { BookOpen, FileText, Heart, Layers, LayoutGrid, Swords } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export const mainNav: NavItem[] = [
  { to: '/app', label: 'Início', icon: LayoutGrid, end: true },
  { to: '/app/catalog', label: 'Catálogo', icon: Swords },
  { to: '/app/favorites', label: 'Favoritos', icon: Heart },
  { to: '/app/compositions', label: 'Composições', icon: Layers },
  { to: '/app/notes', label: 'Notas', icon: BookOpen },
  { to: '/app/docs', label: 'Documentação', icon: FileText },
]
