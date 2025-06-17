declare module "btch-downloader" {
  export function igdl(url: string): Promise<[{ url: string }]>;
  export function ttdl(
    url: string,
  ): Promise<{ audio: string[]; video: string[] }>;
  export function fbdown(
    url: string,
  ): Promise<{ normal_video: string; HD: string }>;
  export function youtube(url: string): Promise<{ mp3: string; mp4: string }>;
}
