type SelectAnchor = { top: number; bottom: number };
type SelectViewport = { top: number; height: number };

/** Keep an anchored menu inside the visible viewport, including mobile keyboards. */
export function getSelectMenuLayout(anchor: SelectAnchor, viewport: SelectViewport, preferredHeight = 206) {
  const clearance = 16; // 8px between field/menu and 8px at the viewport edge.
  const below = Math.max(0, viewport.top + viewport.height - anchor.bottom - clearance);
  const above = Math.max(0, anchor.top - viewport.top - clearance);
  const placement = below < preferredHeight && above > below ? "top" : "bottom";

  return {
    placement,
    maxHeight: Math.min(preferredHeight, placement === "top" ? above : below),
  };
}
