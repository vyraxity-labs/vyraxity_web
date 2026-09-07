import React from "react";

export interface EyebrowLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: "muted" | "accent";
  className?: string;
  as?: React.ElementType;
}

export function EyebrowLabel({
  children,
  variant = "muted",
  className = "",
  as: Component = "p",
  ...props
}: EyebrowLabelProps) {
  const colorClass =
    variant === "accent"
      ? "text-vx-amber"
      : "text-vx-muted in-[.theme-light]:text-vx-ink-secondary in-[[data-theme=light]]:text-vx-ink-secondary";

  return (
    <Component
      className={`vx-eyebrow ${colorClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}