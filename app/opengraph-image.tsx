import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Tom Renard, Senior Product Engineer";

export default function Image() {
  return ogImage({
    title: "Tom Renard",
    line: "Senior Product Engineer in Berlin. Frontend deep, ships across the stack, owns the outcome.",
    page: "About",
  });
}
