import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Work - Tom Renard";

export default function Image() {
  return ogImage({ title: "Work", line: "Six years of product and frontend engineering in Berlin.", page: "Work" });
}
