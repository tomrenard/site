import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
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
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 leading-none";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-700",
    secondary:
      "text-neutral-600 border border-neutral-300 hover:border-neutral-400 hover:text-neutral-900",
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
    <p className="mt-1 mb-3 text-sm text-neutral-500 tracking-wide">
      {children}
    </p>
  );
}

interface LeadProps {
  children: ReactNode;
}

function Lead({ children }: LeadProps) {
  return <p className="mt-3 text-neutral-600 leading-relaxed">{children}</p>;
}

interface StackListProps {
  children: ReactNode;
}

function StackList({ children }: StackListProps) {
  return (
    <ul className="mt-4 space-y-0.5 list-disc list-outside marker:text-neutral-400 pl-5">
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
      className="font-semibold mb-7 text-neutral-900 text-balance"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-semibold mt-8 mb-4 text-neutral-900 text-balance"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-semibold mt-6 mb-2 text-neutral-900 text-balance first:mt-0"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-3 list-disc list-outside marker:text-neutral-400 pl-5"
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
  strong: (props) => <strong className="font-semibold" {...props} />,
  p: (props) => <p className="mt-2" {...props} />,
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
  hr: (props) => <hr className="my-8 w-16 border-neutral-200" {...props} />,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...(components as any),
  };
}
