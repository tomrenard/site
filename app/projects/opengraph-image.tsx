import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Projects - Tom Renard";

export default function Image() {
  return ogImage({ title: "Projects", line: "Side projects. Guardrails first: systems that prove their own claims.", page: "Projects" });
}
