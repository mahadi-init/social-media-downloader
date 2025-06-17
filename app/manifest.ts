import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Social media downloader",
    short_name: "Downloader",
    description: "Download videos from Instagram and YouTube with just one",
    start_url: "/",
    display: "standalone",
    background_color: "#442a8c",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
