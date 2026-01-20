/* eslint-disable no-plusplus */

import fs from "fs";
import pathModule from "path";
import { Parser } from "acorn";
import acornJsx from "acorn-jsx";
import fm from "front-matter";
import slug from "slug";

const ParserWithJSX = Parser.extend(acornJsx());

const parse = (content) =>
  ParserWithJSX.parse(content, {
    ecmaVersion: 2020,
    sourceType: "module",
  });

export const getFrontMatter = (content) => fm(content).attributes;

export const addImport = (tree, name, location) => {
  tree.children.unshift({
    type: "mdxjsEsm",
    data: {
      estree: parse(`import ${name} from '${location}'`),
    },
  });
};

export const addContent = (tree, content) => {
  tree.children.push({
    type: "mdxjsEsm",
    data: {
      estree: parse(content),
    },
  });
};

export const getTableOfContents = (tree) => {
  const contents = [];

  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
    const node = tree.children[nodeIndex];

    if (node.type === "heading" && [2, 3].includes(node.depth)) {
      const depth = node.depth - 1;
      const title = node.children
        .filter((n) => n.type === "text")
        .map((n) => n.value)
        .join("");

      contents.push({
        title,
        slug: slug(title),
        depth,
      });
    }
  }

  return contents;
};

type SeriesPost = {
  slug: string;
  title: string;
  seriesOrder?: number;
};

type SeriesNavData = {
  seriesTitle: string;
  seriesSlug: string;
  currentIndex: number;
  totalCount: number;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
};

const seriesNameToSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");

export const getSeriesNavigationData = (
  currentSlug: string,
  seriesName: string,
  blogDir: string,
): SeriesNavData | null => {
  if (!seriesName || !currentSlug) return null;

  try {
    const dirNames = fs.readdirSync(blogDir);
    const seriesPosts: SeriesPost[] = [];

    dirNames.forEach((dirName) => {
      const dirPath = pathModule.join(blogDir, dirName);
      const indexPath = pathModule.join(dirPath, "index.mdx");

      if (fs.statSync(dirPath).isDirectory() && fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf8");
        const { attributes } = fm<{
          title: string;
          series?: string;
          seriesOrder?: number;
        }>(content);

        if (attributes.series === seriesName) {
          seriesPosts.push({
            slug: dirName,
            title: attributes.title,
            seriesOrder: attributes.seriesOrder,
          });
        }
      }
    });

    const sortedPosts = seriesPosts.sort((a, b) => {
      const orderA = a.seriesOrder ?? Infinity;
      const orderB = b.seriesOrder ?? Infinity;
      return orderA - orderB;
    });

    const currentIndex = sortedPosts.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return null;

    return {
      seriesTitle: seriesName,
      seriesSlug: seriesNameToSlug(seriesName),
      currentIndex,
      totalCount: sortedPosts.length,
      prevPost:
        currentIndex > 0
          ? {
              slug: sortedPosts[currentIndex - 1].slug,
              title: sortedPosts[currentIndex - 1].title,
            }
          : null,
      nextPost:
        currentIndex < sortedPosts.length - 1
          ? {
              slug: sortedPosts[currentIndex + 1].slug,
              title: sortedPosts[currentIndex + 1].title,
            }
          : null,
    };
  } catch {
    return null;
  }
};
