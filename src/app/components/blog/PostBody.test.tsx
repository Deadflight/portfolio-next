import React from "react";
import { render, screen } from "@/test/utils";
import { PostBody } from "./PostBody";
import "@testing-library/jest-dom";

// Mock @portabletext/react — ESM-only, needs mock in Jest
jest.mock("@portabletext/react", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PortableText = ({ value, components }: any) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return (
      <>
        {(value || []).map((block: any, index: number) => {
          if (block._type === "block") {
            const style = block.style || "normal";
            const blockComponent = components?.block?.[style];
            const markDefs = block.markDefs || [];

            const renderChildren = () => {
              return (block.children || []).map((child: any) => {
                const marks = child.marks || [];
                let element: React.ReactNode = child.text || "";

                for (const markKey of marks) {
                  const markDef = markDefs.find((m: any) => m._key === markKey);
                  if (markDef && markDef._type === "link") {
                    const linkComponent = components?.marks?.link;
                    if (linkComponent) {
                      element = linkComponent({
                        children: element,
                        value: markDef,
                        text: child.text,
                      });
                    }
                  }
                }
                return element;
              });
            };

            const children = renderChildren();
            if (blockComponent) {
              return (
                <React.Fragment key={index}>
                  {blockComponent({ children, value: block })}
                </React.Fragment>
              );
            }
            return <p key={index}>{children}</p>;
          }

          // Custom types
          const typeComponent = components?.types?.[block._type];
          if (typeComponent) {
            return (
              <React.Fragment key={index}>
                {typeComponent({ value: block, children: null })}
              </React.Fragment>
            );
          }

          // Unknown type — return null (graceful fallback)
          return null;
        })}
      </>
    );
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };

  return { PortableText };
});

// Mock next/image
jest.mock("next/image", () => {
  const MockNextImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  );
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

// Mock @/i18n/navigation Link
jest.mock("@/i18n/navigation", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockLink = ({ children, ...props }: any) => <a {...props}>{children}</a>;
  return { Link: MockLink };
});

// Mock @/sanity/lib/image urlFor
const createUrlForChain = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain: any = {
    width: jest.fn(() => chain),
    height: jest.fn(() => chain),
    auto: jest.fn(() => chain),
    quality: jest.fn(() => chain),
    url: jest.fn(
      () => "https://cdn.sanity.io/images/project/dataset/mock-body-image.jpg"
    ),
  };
  return chain;
};

jest.mock("@/sanity/lib/image", () => ({
  urlFor: jest.fn(() => createUrlForChain()),
}));

describe("PostBody", () => {
  it("renders h2 heading with slugified anchor id", () => {
    const blocks = [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Introduction" }],
      },
    ];
    render(<PostBody body={blocks} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Introduction");
    expect(heading).toHaveAttribute("id", "introduction");
  });

  it("renders h3 and h4 headings with anchor ids", () => {
    const blocks = [
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Getting Started" }],
      },
      {
        _type: "block",
        style: "h4",
        children: [{ _type: "span", text: "Edge Cases" }],
      },
    ];
    render(<PostBody body={blocks} />);
    const h3 = screen.getByRole("heading", { level: 3 });
    expect(h3).toHaveTextContent("Getting Started");
    expect(h3).toHaveAttribute("id", "getting-started");

    const h4 = screen.getByRole("heading", { level: 4 });
    expect(h4).toHaveTextContent("Edge Cases");
    expect(h4).toHaveAttribute("id", "edge-cases");
  });

  it("renders code block with language class", () => {
    const blocks = [
      {
        _type: "code",
        language: "typescript",
        code: "const x = 1;",
      },
    ];
    render(<PostBody body={blocks} />);
    const pre = document.querySelector("pre");
    expect(pre).toBeInTheDocument();
    const code = pre?.querySelector("code");
    expect(code).toBeInTheDocument();
    expect(code).toHaveClass("language-typescript");
    expect(code).toHaveTextContent("const x = 1;");
  });

  it("renders image with urlFor source and alt", () => {
    const blocks = [
      {
        _type: "image",
        asset: { _ref: "image-body-123" },
        alt: "Diagram of architecture",
      },
    ];
    render(<PostBody body={blocks} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://cdn.sanity.io/images/project/dataset/mock-body-image.jpg"
    );
    expect(img).toHaveAttribute("alt", "Diagram of architecture");
  });

  it("renders external link with target=_blank and rel=noopener noreferrer", () => {
    const blocks = [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Click here",
            marks: ["ext-link"],
          },
        ],
        markDefs: [
          {
            _key: "ext-link",
            _type: "link",
            href: "https://example.com",
          },
        ],
      },
    ];
    render(<PostBody body={blocks} />);
    const link = screen.getByText("Click here").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders internal link without target=_blank", () => {
    const blocks = [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Read more",
            marks: ["int-link"],
          },
        ],
        markDefs: [
          {
            _key: "int-link",
            _type: "link",
            href: "/blog/hello-world",
          },
        ],
      },
    ];
    render(<PostBody body={blocks} />);
    const link = screen.getByText("Read more").closest("a");
    expect(link).toHaveAttribute("href", "/blog/hello-world");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders blockquote with styling", () => {
    const blocks = [
      {
        _type: "block",
        style: "blockquote",
        children: [{ _type: "span", text: "Quote text" }],
      },
    ];
    render(<PostBody body={blocks} />);
    const blockquote = document.querySelector("blockquote");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent("Quote text");
  });

  it("gracefully handles unknown block type without crashing", () => {
    const blocks = [
      {
        _type: "unknownType",
        someField: "something",
      },
    ];
    expect(() => render(<PostBody body={blocks} />)).not.toThrow();
  });

  it("does not render image when asset ref is missing", () => {
    const blocks = [
      {
        _type: "image",
        alt: "Orphan image",
      },
    ];
    render(<PostBody body={blocks} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders http:// external link with target=_blank", () => {
    const blocks = [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "HTTP link",
            marks: ["http-link"],
          },
        ],
        markDefs: [
          {
            _key: "http-link",
            _type: "link",
            href: "http://example.com",
          },
        ],
      },
    ];
    render(<PostBody body={blocks} />);
    const link = screen.getByText("HTTP link").closest("a");
    expect(link).toHaveAttribute("href", "http://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders data-testid on root element", () => {
    const blocks = [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Hello" }],
      },
    ];
    render(<PostBody body={blocks} />);
    expect(screen.getByTestId("post-body")).toBeInTheDocument();
  });
});
