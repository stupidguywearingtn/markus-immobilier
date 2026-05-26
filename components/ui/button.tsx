import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "cta" | "primary" | "sauge" | "ghost" | "outline";

// Variants utilisent les classes définies dans globals.css (btn-cta, btn-primary, etc.)
// pour cumuler ombres en couches, dégradés, highlights internes et sweep au hover.
const variantClass: Record<Variant, string> = {
  cta: "btn-base btn-cta btn-sweep",
  primary: "btn-base btn-primary btn-sweep",
  sauge: "btn-base btn-sauge btn-sweep",
  ghost: "btn-base btn-ghost",
  outline: "btn-base btn-outline",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${variantClass[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const isExternal = props.external || /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Flèche → utilisée à droite des CTAs. Slide à droite au hover (via .btn-arrow). */
export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="btn-arrow"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
