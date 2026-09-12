'use client';

import { useRef, useState } from 'react';

export default function StudioReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.play().catch(() => {});
    }
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <figure className="v2-film">
      <div className="v2-film-plate">
        <video
          ref={videoRef}
          className="v2-film-video"
          src="/assets/codearc_showreel_8s.mp4"
          poster="/assets/wild_jawai_live.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {muted ? (
          <button type="button" className="v2-film-prompt" onClick={toggleSound}>
            Sound on
          </button>
        ) : null}
      </div>
      <figcaption className="v2-film-bar">
        <span>01 — Studio reel · 8 seconds · 24 fps</span>
        <span className="v2-film-actions">
          <button type="button" onClick={toggleSound}>
            {muted ? 'Muted' : 'Sound'}
          </button>
          <button type="button" onClick={replay}>
            Replay
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
