import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export const components: Record<
  string,
  (props: any) => ReactNode | Promise<ReactNode>
> = {
  h1: (props) => (
    <h1
      className="font-semibold mb-7 text-neutral-900 text-balance"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-semibold mt-14 mb-7 text-neutral-900 text-balance"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-semibold mt-14 mb-7 text-neutral-900 text-balance"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-7 list-disc list-outside marker:text-neutral-400 pl-5"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-7 list-decimal list-outside marker:text-neutral-400 pl-5"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1.5" {...props} />,
  a: ({ href, ...props }) => {
    return (
      <Link
        className="break-words decoration-from-font underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-600 focus-visible:outline focus-visible:outline-neutral-400
        focus-visible:rounded-xs 
        focus-visible:outline-offset-1
        focus-visible:outline-dotted"
        href={href}
        draggable={false}
        {...(href?.startsWith("https://")
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-bold" {...props} />,
  p: (props) => <p className="mt-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 not-mobile:text-neutral-500"
      {...props}
    />
  ),
  pre: (props) => (
    <pre className="mt-7 whitespace-pre md:whitespace-pre-wrap" {...props} />
  ),
  Image,
  img: async ({ src, alt, title }) => {
    let img: React.ReactNode;

    if (src.startsWith("https://")) {
      img = (
        <Image
          className="mt-7"
          src={src}
          alt={alt}
          quality={95}
          placeholder="blur"
          draggable={false}
        />
      );
    } else {
      const image = await import("./assets/images/" + src);
      img = (
        <Image
          className="mt-7"
          src={image.default}
          alt={alt}
          quality={95}
          placeholder="blur"
          draggable={false}
        />
      );
    }

    return img;
  },
  hr: (props) => <hr className="my-14 w-24 border-neutral-200" {...props} />,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...(components as any),
  };
}
