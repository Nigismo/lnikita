import { Table2, Globe, Send, Rocket, Target, BarChart3, DollarSign, TrendingUp, Zap, Users, Award, Clock, BookOpen, Layout, Code, Palette, Settings, Search, FileSpreadsheet, PieChart, Database, Filter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Table2, Globe, Send, Rocket, Target, BarChart3, DollarSign, TrendingUp,
  Zap, Users, Award, Clock, BookOpen, Layout, Code, Palette, Settings,
  Search, FileSpreadsheet, PieChart, Database, Filter,
};

export function getIconByName(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}

export const availableIcons = Object.keys(iconMap);
