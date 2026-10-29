"use client";

import dynamic from "next/dynamic";

const HomeHeroVideo = dynamic(
  () => import("./HomeHeroVideo").then((module) => module.HomeHeroVideo),
  {
    ssr: false,
  },
);

type DynamicHomeHeroVideoProps = {
  src: string;
  poster: string;
};

export function DynamicHomeHeroVideo(props: DynamicHomeHeroVideoProps) {
  return <HomeHeroVideo {...props} />;
}
