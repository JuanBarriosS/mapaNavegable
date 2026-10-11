"use client";

import { useEffect, useRef } from "react";

export default function CountryMap() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    let viewer: any;

    (async () => {
      const OpenSeadragon = (await import("openseadragon")).default;

      viewer = OpenSeadragon({
        element: viewerRef.current!,
        prefixUrl:
          "https://cdn.jsdelivr.net/npm/openseadragon@4.1.0/build/openseadragon/images/",
        tileSources: {
          type: "image",
          url: "/maps/pais-general.jpg",
        },
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        minZoomImageRatio: 0.5,
        maxZoomPixelRatio: 4,
        visibilityRatio: 1,
        constrainDuringPan: true,
        gestureSettingsMouse: {
          scrollToZoom: true,
          clickToZoom: false,
          dblClickToZoom: true,
        },
      });
    })();

    return () => {
      if (viewer) viewer.destroy();
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0b0f14",
      }}
    />
  );
}