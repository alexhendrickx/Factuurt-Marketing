import { Moon, Receipt, Clock, HardHat, Users, BadgeEuro, HelpCircle, CalendarDays, ClipboardList, FileText, BookOpen, WifiOff, CloudOff, RefreshCw, type LucideIcon } from 'lucide-react'

/** Whitelist: alleen iconen die de content écht gebruikt worden geïmporteerd,
 *  zodat tree-shaking de rest van lucide-react weglaat. */
export const iconMap: Record<string, LucideIcon> = {
  Moon,
  Receipt,
  Clock,
  HardHat,
  Users,
  BadgeEuro,
  CalendarDays,
  ClipboardList,
  FileText,
  BookOpen,
  WifiOff,
  CloudOff,
  RefreshCw,
}

/** Fallback-icoon als een content-icoonnaam niet in de map zit. */
export const fallbackIcon: LucideIcon = HelpCircle

/** Veilige lookup: nooit undefined, altijd een renderbaar icoon. */
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? fallbackIcon
}
