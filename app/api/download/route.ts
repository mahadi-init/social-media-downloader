import { NextRequest, NextResponse } from "next/server";
import { igdl, fbdown, youtube } from "btch-downloader";

export async function POST(req: NextRequest) {
  try {
    const { url, platform } = await req.json();
    if (!url)
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    if (!platform)
      return NextResponse.json(
        { error: "Please select a platform" },
        { status: 400 },
      );

    let videoRes: Response;

    switch (platform) {
      case "instagram":
        const insta = await igdl(url);
        videoRes = await fetch(insta[0].url);
        break;
      // case "facebook":
      //   const { normal_video, HD } = await fbdown(url);
      //   try {
      //     videoRes = await fetch(HD);
      //   } catch (err) {
      //     videoRes = await fetch(normal_video);
      //   }
      //   break;
      case "youtube":
        const { mp4 } = await youtube(url);
        videoRes = await fetch(mp4);
        break;
      default:
        return;
    }

    if (!videoRes) {
      return NextResponse.json({ error: "No video found" }, { status: 404 });
    }

    const buffer = await videoRes.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="instagram.mp4"',
      },
    });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
