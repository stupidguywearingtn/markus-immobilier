"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { EditModeProvider } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/backoffice/EditModeToolbar";
import type { PublishedFields } from "@/lib/supabase/content";

/**
 * Arbre de providers du back-office, monté une seule fois dans app/layout.tsx.
 * `publishedFields` vient du serveur (lecture de site_content_fields au layout).
 */
export function ProviderTree({
  publishedFields,
  children,
}: {
  publishedFields: PublishedFields;
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <EditModeProvider publishedFields={publishedFields}>
        <EditModeToolbar />
        {children}
        <Toaster position="top-right" richColors />
      </EditModeProvider>
    </AuthProvider>
  );
}
