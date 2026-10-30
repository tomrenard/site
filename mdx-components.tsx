import type { MDXComponents } from "mdx/types";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
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
    <p className="mt-1 mb-3 text-sm text-mute">
      {children}
    </p>
  );
}

interface LeadProps {
  children: ReactNode;
}

function Lead({ children }: LeadProps) {
  return (
    <div className="lead mb-16 max-w-5xl text-2xl leading-tight tracking-[-0.02em] text-balance md:text-4xl [&_p]:m-0">
      {children}
    </div>
  );
}

interface StackListProps {
  children: ReactNode;
}

function StackList({ children }: StackListProps) {
  return (
    <ul className="mt-4 space-y-0.5 list-disc list-outside marker:text-mute pl-5">
      {children}
    </ul>
  );
}

interface StackItemProps {
  children: ReactNode;
}

function StackItem({ children }: StackItemProps) {
  return <li className="pl-1.5">{children}</li>;
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
  StackList,
  StackItem,
  h1: (props) => (
    <h1
      className="mt-10 mb-6 text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.88] tracking-[-0.05em] text-balance md:mt-16"
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
      className="mt-16 mb-4 pt-4 border-t border-rule text-lg font-medium leading-snug tracking-[-0.01em] text-balance lg:mb-0 lg:pt-0 lg:border-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-1 text-2xl font-medium tracking-[-0.03em] text-balance first:mt-0 [h2+&]:mt-4"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-3 list-disc list-outside marker:text-mute pl-5"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-7 list-decimal list-outside marker:text-mute pl-5"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1.5" {...props} />,
  a: ({ href, ...props }) => {
    return (
      <Link
        className="break-words decoration-from-font underline underline-offset-2 decoration-mute hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 focus-visible:rounded-xs"
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
  p: (props) => <p className="mt-2" {...props} />,
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
  hr: (props) => <hr className="my-10 border-rule/20" {...props} />,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...(components as any),
  };
}
