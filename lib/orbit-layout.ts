export type OrbitSize = { width: number; height: number };
export type OrbitTrack = { rx: number; ry: number };
export type OrbitLayout = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  tracks: OrbitTrack[];
  labelTracks: number[];
};

export const ORBIT_PHASES = [0, 216, 144, 288, 72];

/** Radius needed to keep an upright label outside the centered heading. */
function clearHeading(rx: number, heading: OrbitSize, label: OrbitSize, gap = 10) {
  const horizontal = heading.width / 2 + label.width / 2 + gap;
  const vertical = heading.height / 2 + label.height / 2 + gap;
  const ratio = Math.min(.98, horizontal / Math.max(1, rx));
  return vertical / Math.sqrt(1 - ratio * ratio);
}

export function getOrbitLayout(width: number, gutter: number, heading: OrbitSize, labels: OrbitSize[]): OrbitLayout {
  const widest = Math.max(...labels.map((label) => label.width));
  const tallest = Math.max(...labels.map((label) => label.height));
  const rx = Math.max(1, Math.min(540, (width - 2 * gutter - widest) / 2));
  const gap = width < 768 ? 4 : 10;
  const ry = Math.max(rx, ...labels.map((label) => clearHeading(rx, heading, label, gap)));
  const height = Math.ceil(2 * ry + tallest + 32);
  const tracks: OrbitTrack[] = [{ rx: rx * .5, ry: ry * .5 }, { rx, ry }, { rx: rx * .75, ry: ry * .75 }];
  const labelTracks = labels.map(() => 1);

  // Keep three evenly spaced rings at every width. On large screens, two
  // labels can use the middle track while staying clear of the heading.
  if (width >= 1200) {
    const innerRx = rx * .74;
    const innerRy = Math.max(innerRx, clearHeading(innerRx, heading, labels[0]), clearHeading(innerRx, heading, labels[2]));
    if (innerRy <= ry * .9) {
      tracks[2] = { rx: innerRx, ry: innerRy };
      labelTracks[0] = 2;
      labelTracks[2] = 2;
    }
  }

  return { width, height, cx: width / 2, cy: height / 2, tracks, labelTracks };
}

export function getOrbitPoint(layout: OrbitLayout, index: number, progress: number) {
  const track = layout.tracks[layout.labelTracks[index]];
  const angle = (ORBIT_PHASES[index] / 180 + progress * 2) * Math.PI;
  return { x: layout.cx + track.rx * Math.cos(angle), y: layout.cy + track.ry * Math.sin(angle) };
}
