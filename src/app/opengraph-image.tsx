import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public", siteConfig.logo));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background: "#ffffff",
          borderLeft: `24px solid ${siteConfig.themeColor}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={240} height={240} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: "#1f2a1f" }}>{siteConfig.name}</div>
          <div style={{ fontSize: 36, marginTop: 16, color: "#4b5a4b", lineHeight: 1.35, maxWidth: 680 }}>
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
