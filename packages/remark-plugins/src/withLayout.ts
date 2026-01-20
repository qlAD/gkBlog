import path from "path";

import {
  addContent,
  addImport,
  getTableOfContents,
  getSeriesNavigationData,
} from "./utils";

const extractSlugFromPath = (filePath: string): string => {
  const normalized = filePath.replace(/\\/g, "/");
  const blogMatch = normalized.match(/\/blog\/([^/]+)\//);
  return blogMatch ? blogMatch[1] : "";
};

const extractBlogDirFromPath = (filePath: string): string => {
  const normalized = filePath.replace(/\\/g, "/");
  const blogMatch = normalized.match(/(.+\/blog)\//);
  return blogMatch ? blogMatch[1] : "";
};

const withLayout = () => (tree, file) => {
  const data = file.data["front-matter"] || {};

  if (Object.keys(data).length === 0) return;

  const { layout, ...frontMatter } = file.data["front-matter"];
  const tableOfContents = getTableOfContents(tree);
  const filePath = file.path || file.history?.[0] || "";
  const slug = extractSlugFromPath(filePath);
  const blogDir = extractBlogDirFromPath(filePath);

  let seriesNavigation = null;
  if (frontMatter.series && slug && blogDir) {
    seriesNavigation = getSeriesNavigationData(
      slug,
      frontMatter.series,
      blogDir,
    );
  }

  addImport(tree, layout, `@/contents-layouts/${layout}`);

  addContent(
    tree,
    `export default ({ children }) => (
      <${layout}
        frontMatter={${JSON.stringify(frontMatter)}}
        tableOfContents={${JSON.stringify(tableOfContents)}}
        slug="${slug}"
        seriesNavigation={${JSON.stringify(seriesNavigation)}}
      >
        {children}
      </${layout}>
     )`,
  );
};

export default withLayout;
