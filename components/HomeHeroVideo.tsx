"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const HOME_HERO_PLAYBACK_RATE = 0.45;

type HomeHeroVideoProps = {
  src: string;
  poster: string;
};

function setPlaybackRate(video: HTMLVideoElement) {
  video.defaultPlaybackRate = HOME_HERO_PLAYBACK_RATE;
  video.playbackRate = HOME_HERO_PLAYBACK_RATE;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Skip the video entirely (no download, no autoplay) for reduced-motion users and data-saver connections. */
function shouldSkipVideo() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(reducedMotionQuery).matches || Boolean(connection?.saveData);
}

export function HomeHeroVideo({ src, poster }: HomeHeroVideoProps) {
  const skip = useSyncExternalStore(subscribe, shouldSkipVideo, () => true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video && frameRef.current !== null) {
        video.cancelVideoFrameCallback(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [skip]);

  if (skip) return null;

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <video
        ref={(video) => {
          videoRef.current = video;
          if (video) setPlaybackRate(video);
        }}
        className="home-hero__video"
        data-ready={ready ? "true" : undefined}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(event) => setPlaybackRate(event.currentTarget)}
        onPlaying={(event) => {
          const video = event.currentTarget;
          if (ready || frameRef.current !== null) return;
          // Reveal only once an actual video frame is ready to be painted.
          if (typeof video.requestVideoFrameCallback === "function") {
            frameRef.current = video.requestVideoFrameCallback(() => {
              frameRef.current = null;
              setReady(true);
            });
          } else {
            setReady(true);
          }
        }}
        onError={() => setReady(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* WCAG 2.2.2: looping motion that lasts longer than 5 seconds needs a way to pause it. */}
      {ready ? (
        <button
          aria-label={paused ? "Play background video" : "Pause background video"}
          aria-pressed={paused}
          className="home-hero__toggle"
          onClick={togglePlayback}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16">
            {paused ? (
              <path d="M4 2.5v11l9-5.5-9-5.5Z" fill="currentColor" />
            ) : (
              <path d="M4 2.5h2.6v11H4v-11Zm5.4 0H12v11H9.4v-11Z" fill="currentColor" />
            )}
          </svg>
        </button>
      ) : null}
    </>
  );
}
