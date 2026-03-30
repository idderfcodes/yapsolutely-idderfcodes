export type HeroVideoTier = "1080" | "1440" | "2160";
export type FrameSequenceTier = "1080" | "4k";

type ConnectionLike = {
  effectiveType?: string;
  saveData?: boolean;
  downlink?: number;
};

type NavigatorWithConnection = Navigator & {
  connection?: ConnectionLike;
  mozConnection?: ConnectionLike;
  webkitConnection?: ConnectionLike;
};

export type LandingMediaProfile = {
  heroTier: HeroVideoTier;
  frameTier: FrameSequenceTier;
  physicalWidth: number;
  saveData: boolean;
  effectiveType: string;
  downlink: number;
};

export function getLandingMediaProfile(win: Window): LandingMediaProfile {
  const nav = win.navigator as NavigatorWithConnection;
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  const effectiveType = connection?.effectiveType ?? "";
  const saveData = connection?.saveData ?? false;
  const downlink = connection?.downlink ?? 0;
  const physicalWidth = Math.round(
    win.innerWidth * Math.min(win.devicePixelRatio || 1, 2),
  );

  const constrainedConnection =
    saveData || ["slow-2g", "2g", "3g"].includes(effectiveType);

  let heroTier: HeroVideoTier = "1080";

  if (!constrainedConnection && physicalWidth >= 2200) {
    heroTier = "1440";
  }

  if (
    !constrainedConnection &&
    physicalWidth >= 3200 &&
    (downlink === 0 || downlink >= 8)
  ) {
    heroTier = "2160";
  }

  const frameTier: FrameSequenceTier =
    !constrainedConnection && physicalWidth >= 2200 ? "4k" : "1080";

  return {
    heroTier,
    frameTier,
    physicalWidth,
    saveData,
    effectiveType,
    downlink,
  };
}
