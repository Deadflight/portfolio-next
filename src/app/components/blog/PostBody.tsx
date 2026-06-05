import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ── Heading Renderer (h2, h3, h4) ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeadingRenderer({ children, value }: any) {
  const style = value?.style || "h2";
  const text = value?.children
    ?.map((child: { text?: string }) => child.text || "")
    .join("") || "";
  const id = slugify(text);
  const anchor = (
    <a
      href={`#${id}`}
      className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary-brand"
      aria-hidden="true"
    >
      #
    </a>
  );
  const className = "group relative font-heading font-bold text-text-main scroll-mt-20";
  if (style === "h3") {
    return <h3 id={id} className={className}>{anchor}{children}</h3>;
  }
  if (style === "h4") {
    return <h4 id={id} className={className}>{anchor}{children}</h4>;
  }
  return <h2 id={id} className={className}>{anchor}{children}</h2>;
}

/* ── Blockquote Renderer ── */
function BlockquoteRenderer({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-primary-brand pl-4 italic text-text-main/80 my-6">
      {children}
    </blockquote>
  );
}

/* ── Code Renderer ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeRenderer({ value }: any) {
  return (
    <pre className="bg-background-main rounded-lg p-4 overflow-x-auto my-6">
      <code className={`language-${value?.language || "text"}`}>
        {value?.code || ""}
      </code>
    </pre>
  );
}

/* ── Image Renderer ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ImageRenderer({ value }: any) {
  if (!value?.asset?._ref) return null;
  const src = urlFor(value).width(800).auto("format").quality(80).url();
  return (
    <div className="my-8">
      <Image
        src={src}
        alt={value.alt || ""}
        width={800}
        height={450}
        className="rounded-lg w-full object-cover"
      />
    </div>
  );
}

/* ── Link Renderer ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LinkRenderer({ children, value }: any) {
  const href = value?.href || "";
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="link-text">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="link-text">
      {children}
    </Link>
  );
}

/* ── Normal Paragraph Renderer ── */
function NormalRenderer({ children }: { children?: React.ReactNode }) {
  return (
    <p className="font-body text-text-main leading-relaxed mb-4">{children}</p>
  );
}

/* ── Main Component ── */
interface PostBodyProps {
  body: unknown[];
}

export function PostBody({ body }: PostBodyProps) {
  const components: PortableTextComponents = {
    block: {
      h2: HeadingRenderer,
      h3: HeadingRenderer,
      h4: HeadingRenderer,
      blockquote: BlockquoteRenderer,
      normal: NormalRenderer,
    },
    types: {
      code: CodeRenderer,
      image: ImageRenderer,
    },
    marks: {
      link: LinkRenderer,
    },
  };

  return (
    <div data-testid="post-body" className="max-w-none">
      <PortableText value={body} components={components} />
    </div>
  );
}
