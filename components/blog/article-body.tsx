import type { ReactNode } from "react";
import type { Block } from "@/lib/blog";

/** Parse les **gras** inline → <strong>. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-anthracite">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-bold tracking-[-0.01em] text-anthracite pt-4 leading-[1.2]"
                style={{ fontSize: "clamp(21px, 2.4vw, 28px)" }}
              >
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-[16px] leading-[1.75] text-[#3d4347]">
                {inline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-5 h-5 shrink-0 mt-1 rounded-full bg-sauge/20 grid place-items-center">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--color-sauge)" strokeWidth="2.8">
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </span>
                    <span className="text-[16px] leading-[1.7] text-[#3d4347]">
                      {inline(it)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5 counter-reset">
                {b.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-anthracite text-blanc grid place-items-center text-[12px] font-bold tabular-nums">
                      {j + 1}
                    </span>
                    <span className="text-[16px] leading-[1.7] text-[#3d4347] pt-0.5">
                      {inline(it)}
                    </span>
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
