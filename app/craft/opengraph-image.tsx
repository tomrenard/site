import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Craft - Tom Renard";

export default function Image() {
  return ogImage({ title: "Craft", line: "How I think about frontend: what ships to the browser, and why.", page: "Craft" });
}
