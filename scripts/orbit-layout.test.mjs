import assert from "node:assert/strict";
import test from "node:test";

import { getOrbitLayout, getOrbitPoint } from "../lib/orbit-layout.ts";

const cases = [
  { width: 320, gutter: 16, heading: { width: 104, height: 98 }, labelWidth: 76, labelHeight: 66 },
  { width: 360, gutter: 16, heading: { width: 115, height: 100 }, labelWidth: 85, labelHeight: 66 },
  { width: 425, gutter: 17, heading: { width: 136, height: 96 }, labelWidth: 100, labelHeight: 56 },
  { width: 768, gutter: 31, heading: { width: 246, height: 91 }, labelWidth: 180, labelHeight: 49 },
  { width: 1024, gutter: 40, heading: { width: 328, height: 110 }, labelWidth: 241, labelHeight: 49 },
  { width: 1240, gutter: 40, heading: { width: 440, height: 130 }, labelWidth: 244, labelHeight: 34 },
];

for (const sample of cases) {
  test(`labels stay on their drawn paths, in bounds and clear of the heading at ${sample.width}px`, () => {
    const labels = Array.from({ length: 5 }, (_, index) => ({
      width: sample.width >= 1200 && [0, 2].includes(index) ? 170 : sample.labelWidth,
      height: sample.labelHeight,
    }));
    const layout = getOrbitLayout(sample.width, sample.gutter, sample.heading, labels);
    for (let step = 0; step < 720; step++) {
      labels.forEach((label, index) => {
        const point = getOrbitPoint(layout, index, step / 720);
        const track = layout.tracks[layout.labelTracks[index]];
        const distance = ((point.x - layout.cx) / track.rx) ** 2 + ((point.y - layout.cy) / track.ry) ** 2;
        assert.ok(Math.abs(distance - 1) < 1e-10, "label left its ellipse");
        assert.ok(point.x - label.width / 2 >= sample.gutter - .01, "label clipped left");
        assert.ok(point.x + label.width / 2 <= sample.width - sample.gutter + .01, "label clipped right");
        assert.ok(point.y - label.height / 2 >= 15.99, "label clipped above");
        assert.ok(point.y + label.height / 2 <= layout.height - 15.99, "label clipped below");
        const overlapsHeading = Math.abs(point.x - layout.cx) < (sample.heading.width + label.width) / 2 &&
          Math.abs(point.y - layout.cy) < (sample.heading.height + label.height) / 2;
        assert.equal(overlapsHeading, false, "label crossed the heading");
      });
    }
  });
}

test("desktop tracks have open spacing rather than five clustered circles", () => {
  const layout = getOrbitLayout(1240, 40, { width: 440, height: 130 }, [170, 214, 145, 190, 244].map((width) => ({ width, height: 34 })));
  assert.equal(layout.tracks.length, 3);
  assert.ok(layout.tracks[2].rx - layout.tracks[0].rx > 70);
  assert.ok(layout.tracks[1].rx - layout.tracks[2].rx > 100);
});

test("one full revolution returns every label to its initial position", () => {
  const layout = getOrbitLayout(425, 17, { width: 136, height: 96 }, Array.from({ length: 5 }, () => ({ width: 100, height: 56 })));
  for (let index = 0; index < 5; index++) {
    const start = getOrbitPoint(layout, index, 0);
    const end = getOrbitPoint(layout, index, 1);
    assert.ok(Math.abs(start.x - end.x) < 1e-10);
    assert.ok(Math.abs(start.y - end.y) < 1e-10);
  }
});
