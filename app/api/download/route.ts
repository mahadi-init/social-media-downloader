import { igdl } from "btch-downloader";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url)
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    const insta = await igdl(url);
    const videoRes = await fetch(insta[0].url);

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
