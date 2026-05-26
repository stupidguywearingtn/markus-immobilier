"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { scoreTier } from "@/lib/radar/score";
import type { ScoredListing } from "@/lib/radar/types";

/**
 * Vue Carte Leaflet/OSM. Un cercle coloré par annonce selon son tier de score.
 * Au clic : ouvre le panneau détail (via onOpen).
 */

const TIER_COLORS: Record<ReturnType<typeof scoreTier>, string> = {
  top: "#9EA596", // sauge — chaud
  good: "#383E42", // anthracite
  low: "#F59E0B", // amber
  weak: "#9aa09d", // gris froid
};

const TIER_RADII: Record<ReturnType<typeof scoreTier>, number> = {
  top: 14,
  good: 11,
  low: 9,
  weak: 7,
};

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map(([la, lo]) => L.latLng(la, lo)));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [points, map]);
  return null;
}

/**
 * Fix Leaflet « tuiles en désordre » quand le conteneur passe de display:none/0px
 * à visible. On force le recalcul de taille au mount + 2 tentatives décalées
 * pour couvrir les animations parent (AnimatePresence) et le layout shift.
 */
function MapInvalidator() {
  const map = useMap();
  useEffect(() => {
    const tick = () => map.invalidateSize({ animate: false });
    tick();
    const t1 = setTimeout(tick, 60);
    const t2 = setTimeout(tick, 280);
    const t3 = setTimeout(tick, 600);
    // ResizeObserver couvre les redimensionnements (toggle list↔map, fenêtre)
    const ro = new ResizeObserver(() => tick());
    const el = map.getContainer();
    ro.observe(el);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ro.disconnect();
    };
  }, [map]);
  return null;
}

export function MapView({
  listings,
  selectedId,
  onOpen,
}: {
  listings: ScoredListing[];
  selectedId?: string | null;
  onOpen: (l: ScoredListing) => void;
}) {
  // Garde uniquement les annonces géolocalisées
  const geo = useMemo(
    () =>
      listings.filter(
        (l): l is ScoredListing & { location: { lat: number; lng: number } } =>
          typeof l.location.lat === "number" && typeof l.location.lng === "number",
      ),
    [listings],
  );

  const points: [number, number][] = useMemo(
    () => geo.map((l) => [l.location.lat, l.location.lng]),
    [geo],
  );

  // Centre par défaut : Lyon
  const defaultCenter: [number, number] = points[0] ?? [45.764, 4.836];

  return (
    <div
      className="relative rounded-[16px] overflow-hidden border border-[var(--bordure)] shadow-[0_18px_50px_-25px_rgba(56,62,66,0.18)]"
      style={{ height: 640, minHeight: 640 }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", minHeight: 640 }}
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInvalidator />
        <FitBounds points={points} />
        {geo.map((l) => {
          const tier = scoreTier(l.score);
          const isSelected = selectedId === l.id;
          return (
            <CircleMarker
              key={l.id}
              center={[l.location.lat, l.location.lng]}
              radius={isSelected ? TIER_RADII[tier] + 4 : TIER_RADII[tier]}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: TIER_COLORS[tier],
                fillOpacity: tier === "top" ? 0.95 : 0.85,
              }}
              eventHandlers={{ click: () => onOpen(l) }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="text-[12px] leading-snug">
                  <div className="font-semibold">Score {l.score}/100</div>
                  <div>
                    {l.price.toLocaleString("fr-FR")} € · {l.surface ?? "?"} m²
                  </div>
                  <div className="text-[10px] text-[#7a817f]">
                    {l.owner.type === "private" ? "Particulier" : "Agence"} · {l.daysOnline}j
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
