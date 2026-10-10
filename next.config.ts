import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // Turbopack requires plugin names as strings (not imported functions).
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [["rehype-highlight", { detect: true }]],
  },
});

export default withMDX(nextConfig);
