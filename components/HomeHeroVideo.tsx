"use client";

const HOME_HERO_PLAYBACK_RATE = 0.45;

type HomeHeroVideoProps = {
  poster: string;
  src: string;
};

function setPlaybackRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = HOME_HERO_PLAYBACK_RATE;
  video.playbackRate = HOME_HERO_PLAYBACK_RATE;
}

export function HomeHeroVideo({ poster, src }: HomeHeroVideoProps) {
  return (
    <video
      ref={(video) => {
        if (video) setPlaybackRate(video);
      }}
      className="home-hero__video"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      onLoadedMetadata={(event) => setPlaybackRate(event.currentTarget)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
