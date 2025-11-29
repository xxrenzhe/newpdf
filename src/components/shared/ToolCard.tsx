import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  iconColor?: string;
}

export default function ToolCard({ href, icon: Icon, title, description, iconColor = "bg-orange-100" }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      <div className={`p-4 rounded-2xl ${iconColor} group-hover:scale-110 transition-transform duration-300 mb-3`}>
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-sm font-semibold text-center text-gray-900 group-hover:text-primary transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-600 text-center mt-2">{description}</p>
      )}
    </Link>
  );
}
