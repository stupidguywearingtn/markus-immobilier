"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import { Pencil, Check } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  /** Valeur déjà résolue (brouillon > publié > fallback) via useV(). */
  value: string;
  as?: ElementType; // "h1" | "h2" | "p" | "span" | "small" | "a" ...
  className?: string;
  style?: CSSProperties;
  /** true => Entrée insère un retour ligne au lieu de valider. */
  multiline?: boolean;
};

export function EditableText({
  section,
  field,
  value,
  as: Tag = "span",
  className,
  style,
  multiline = false,
}: Props) {
  const { enabled, setDraft, getDraft } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const draftVal = getDraft(section, field);
  const displayValue = draftVal ?? value;
  const isDirty = draftVal !== undefined && draftVal !== value;

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const next = ref.current?.innerText ?? "";
    if (next !== value) setDraft(section, field, "text", next);
  };

  if (!enabled) {
    return (
      <Tag className={className} style={style}>
        {displayValue}
      </Tag>
    );
  }

  return (
    <span
      className="relative inline-block group/editable align-baseline"
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      <Tag
        ref={ref as never}
        className={`${className ?? ""} outline-none rounded-sm cursor-pointer`}
        style={{
          ...style,
          boxShadow: editing
            ? "0 0 0 2px var(--bo-accent), 0 0 0 4px rgba(0,0,0,0.12)"
            : isDirty
              ? "0 0 0 1px var(--bo-dirty)"
              : undefined,
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={(e: React.MouseEvent) => {
          if (!editing) {
            e.preventDefault();
            e.stopPropagation();
            setEditing(true);
          }
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing)
            e.currentTarget.style.boxShadow =
              "0 0 0 1px var(--bo-outline), inset 0 0 0 9999px rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing)
            e.currentTarget.style.boxShadow = isDirty
              ? "0 0 0 1px var(--bo-dirty)"
              : "";
        }}
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setEditing(false);
            if (ref.current) ref.current.innerText = displayValue;
          }
        }}
      >
        {displayValue}
      </Tag>

      {!editing && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEditing(true);
          }}
          className="absolute -top-2 -right-2 z-[150] hidden group-hover/editable:flex items-center justify-center w-6 h-6 rounded-full shadow-lg"
          style={{
            background: "var(--bo-accent)",
            color: "var(--bo-accent-contrast)",
          }}
          aria-label="Éditer"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}

      {editing && (
        <span
          aria-hidden
          className="absolute -top-7 left-0 z-[150] inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap"
          style={{
            background: "var(--bo-accent)",
            color: "var(--bo-accent-contrast)",
          }}
        >
          <Check className="w-3 h-3" /> Entrée = valider · Échap = annuler
        </span>
      )}
    </span>
  );
}
