import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Harness - Tom Renard";

export default function Image() {
  return ogImage({ title: "Harness", line: "How I set up Claude Code: hooks, fresh-context review, evidence.", page: "Harness" });
}
