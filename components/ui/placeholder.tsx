/**
 * Placeholder média (gradient + icône caméra + caption).
 * À remplacer par next/image dès que les vrais visuels sont fournis.
 */

const variantStyles = {
  light:
    "bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4] text-[#5d6560]",
  warm: "bg-gradient-to-br from-[#cdd2cb] to-[#b6bcb1] text-[#5d6560]",
  cool: "bg-gradient-to-br from-[#d6dad3] to-[#c0c6bb] text-[#5d6560]",
  airy: "bg-gradient-to-br from-[#d2d7d0] to-[#bbc1b6] text-[#5d6560]",
  pale: "bg-gradient-to-br from-[#daded7] to-[#c4cabf] text-[#5d6560]",
  dark: "bg-gradient-to-br from-[#454c52] to-[#363b40] text-white/55",
} as const;

export type PlaceholderVariant = keyof typeof variantStyles;

export function PlaceholderMedia({
  caption,
  variant = "light",
  rounded = true,
  className = "",
}: {
  caption: string;
  variant?: PlaceholderVariant;
  rounded?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden grid place-items-center",
        rounded ? "rounded-[12px]" : "",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col items-center gap-2 text-center p-[18px]">
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="opacity-55"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="text-[10.5px] tracking-[0.18em] uppercase font-semibold opacity-70">
          {caption}
        </span>
      </div>
    </div>
  );
}
