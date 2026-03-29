"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: React.VideoHTMLAttributes<HTMLVideoElement>["preload"];
  className?: string;
  videoClassName?: string;
  label?: string;
}

const formatTime = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative h-1 w-full cursor-pointer rounded-full bg-white/20",
        className,
      )}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full bg-white"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

export default function VideoPlayer({
  src,
  autoPlay = false,
  loop = false,
  muted = false,
  preload = "metadata",
  className,
  videoClassName,
  label = "Video player",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const syncPlayerState = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextProgress =
      video.duration > 0 ? (video.currentTime / video.duration) * 100 : 0;

    setProgress(Number.isFinite(nextProgress) ? nextProgress : 0);
    setCurrentTime(video.currentTime);
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    setIsPlaying(!video.paused && !video.ended);
    setIsMuted(video.muted || video.volume === 0);
    setVolume(video.muted ? 0 : video.volume);
  };

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      const playPromise = video.play();

      if (playPromise) {
        void playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
      return;
    }

    video.pause();
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextVolume = value / 100;
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;

    if (!video || !video.duration) {
      return;
    }

    video.currentTime = (value / 100) * video.duration;
    syncPlayerState();
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;

    if (!nextMuted && video.volume === 0) {
      video.volume = 1;
    }

    setIsMuted(nextMuted);
    setVolume(nextMuted ? 0 : video.volume);
  };

  const setSpeed = (speed: number) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <motion.div
      className={cn(
        "relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        aria-label={label}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload={preload}
        src={src}
        className={cn("w-full", videoClassName)}
        onClick={togglePlay}
        onLoadedMetadata={syncPlayerState}
        onPause={syncPlayerState}
        onPlay={syncPlayerState}
        onTimeUpdate={syncPlayerState}
        onVolumeChange={syncPlayerState}
      />

      <AnimatePresence>
        {showControls ? (
          <motion.div
            className="absolute bottom-0 left-0 right-0 mx-auto m-2 max-w-xl rounded-2xl bg-[#11111198] p-4 backdrop-blur-md"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-white">{formatTime(currentTime)}</span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-sm text-white">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    type="button"
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#111111d1] hover:text-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
                <div className="flex items-center gap-x-1">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      type="button"
                      onClick={toggleMute}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-[#111111d1] hover:text-white"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="h-5 w-5" />
                      ) : (
                        <Volume1 className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>

                  <div className="w-24">
                    <CustomSlider
                      value={volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={speed}
                  >
                    <Button
                      type="button"
                      onClick={() => setSpeed(speed)}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "text-white hover:bg-[#111111d1] hover:text-white",
                        playbackSpeed === speed && "bg-[#111111d1]",
                      )}
                    >
                      {speed}x
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
