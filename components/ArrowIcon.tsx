import type { SVGProps } from "react";

export type ArrowDirection = "up" | "right" | "down" | "left";

export type ArrowIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  direction?: ArrowDirection;
};

const rotations: Record<ArrowDirection, number> = {
  up: -90,
  right: 0,
  down: 90,
  left: 180,
};

export function ArrowIcon({
  direction = "right",
  className,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={["site-arrow", className].filter(Boolean).join(" ")}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.5 8h8.25m-3-3.25L12 8l-3.25 3.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        transform={`rotate(${rotations[direction]} 8 8)`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

