import type { MDXComponents } from "mdx/types";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Section, Marquee } from "@/components/section";
import Image from "next/image";
import cn from "clsx";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

function Button({ href, variant = "primary", children }: ButtonProps) {
  const isExternal = href.startsWith("https://");
  const baseStyles =
    "inline-flex items-center justify-center px-5 h-9 text-sm font-medium rounded-full border border-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&_p]:m-0";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-ink text-paper hover:bg-accent hover:border-accent",
    secondary: "text-ink hover:bg-ink hover:text-paper",
  };

  return (
    <a
      href={href}
      className={cn(baseStyles, variants[variant])}
      style={{ textDecoration: "none" }}
      draggable={false}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

interface ButtonGroupProps {
  children: ReactNode;
  centered?: boolean;
}

function ButtonGroup({ children, centered }: ButtonGroupProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-3 mt-10", centered && "justify-center")}
    >
      {children}
    </div>
  );
}

interface TechTagsProps {
  children: ReactNode;
}

function TechTags({ children }: TechTagsProps) {
  return (
    <p className="mb-4 text-sm leading-6 text-mute">
      {children}
    </p>
  );
}

interface LeadProps {
  children: ReactNode;
}

function Lead({ children }: LeadProps) {
  return (
    <div className="lead max-w-5xl text-2xl leading-[1.15] tracking-[-0.025em] text-balance md:text-4xl [&_p]:m-0">
      {children}
    </div>
  );
}

interface StackListProps {
  children: ReactNode;
}

function StackList({ children }: StackListProps) {
  return (
    <ul className="divide-y divide-faint border-y border-faint">
      {children}
    </ul>
  );
}

interface StackItemProps {
  children: ReactNode;
}

function StackItem({ children }: StackItemProps) {
  return <li className="py-3 [&_p]:m-0">{children}</li>;
}

// Wraps each word in a mask so the page title rises in word by word.
function SplitWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className="word">
        <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
      </span>{" "}
    </Fragment>
  ));
}

export const components: Record<
  string,
  (props: any) => ReactNode | Promise<ReactNode>
> = {
  Button,
  ButtonGroup,
  TechTags,
  Lead,
  Section,
  Marquee,
  StackList,
  StackItem,
  h1: (props) => (
    <h1
      className="text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.88] tracking-[-0.05em] text-balance"
      {...props}
    >
      {typeof props.children === "string" ? (
        <SplitWords text={props.children} />
      ) : (
        props.children
      )}
    </h1>
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-4 text-lg leading-7 font-medium tracking-[-0.01em] text-balance"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-0 mb-1 text-2xl leading-8 font-medium tracking-[-0.03em] text-balance"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc list-outside marker:text-mute pl-4 lg:pl-0"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal list-outside marker:text-mute pl-4 lg:pl-0"
      {...props}
    />
  ),
  li: (props) => <li className="mt-2 first:mt-0" {...props} />,
  a: ({ href, ...props }) => {
    return (
      <Link
        className="link break-words focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink focus-visible:outline-offset-2"
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
  strong: (props) => <strong className="font-medium" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="pl-6 -ml-6 sm:pl-10 sm:-ml-10 md:pl-14 md:-ml-14 not-mobile:text-mute"
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
  hr: (props) => <hr className="my-12 border-faint" {...props} />,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...(components as any),
  };
}
