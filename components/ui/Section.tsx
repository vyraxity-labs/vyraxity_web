import React from "react";

export type SectionTheme = "dark" | "light";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  theme?: SectionTheme;
  className?: string;
  as?: React.ElementType;
}

export function Section({
  children,
  theme = "dark",
  className = "",
  as: Component = "section",
  ...props
}: SectionProps) {
  const themeClasses =
    theme === "light"
      ? "bg-vx-paper text-vx-ink-text theme-light"
      : "bg-vx-black text-vx-white theme-dark";

  return (
    <Component
      data-theme={theme}
      className={`relative w-full py-24 md:py-32 transition-colors ${themeClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
