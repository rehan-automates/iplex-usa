import assert from "node:assert/strict";
import test from "node:test";

import { getSelectMenuLayout } from "../lib/select-layout.ts";

test("opens below the field when the complete menu fits", () => {
  assert.deepEqual(getSelectMenuLayout({ top: 300, bottom: 360 }, { top: 0, height: 844 }), {
    placement: "bottom", maxHeight: 206,
  });
});

test("opens upward near the bottom of mobile and desktop viewports", () => {
  for (const height of [568, 667, 844, 1080]) {
    assert.deepEqual(getSelectMenuLayout({ top: height - 90, bottom: height - 30 }, { top: 0, height }), {
      placement: "top", maxHeight: 206,
    });
  }
});

test("limits the scrollable menu on a short landscape screen", () => {
  const layout = getSelectMenuLayout({ top: 70, bottom: 130 }, { top: 0, height: 220 });
  assert.equal(layout.placement, "bottom");
  assert.equal(layout.maxHeight, 74);
  assert.ok(130 + 8 + layout.maxHeight <= 220 - 8);
});

test("uses the visual viewport after a mobile keyboard pans and shrinks the screen", () => {
  const layout = getSelectMenuLayout({ top: 480, bottom: 540 }, { top: 120, height: 500 });
  assert.deepEqual(layout, { placement: "top", maxHeight: 206 });
  assert.ok(480 - 8 - layout.maxHeight >= 120 + 8);
});

test("prefers the larger available side when neither side fits the full menu", () => {
  const layout = getSelectMenuLayout({ top: 160, bottom: 220 }, { top: 0, height: 300 });
  assert.deepEqual(layout, { placement: "top", maxHeight: 144 });
});

test("never produces a negative menu height in a collapsed viewport", () => {
  assert.equal(getSelectMenuLayout({ top: 0, bottom: 60 }, { top: 0, height: 60 }).maxHeight, 0);
});
