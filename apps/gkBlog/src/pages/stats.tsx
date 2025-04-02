import frontMatter from "front-matter";
import fs from "fs";
import { GetStaticProps } from "next";
import path from "path";

import StatsContents from "@/contents/stats";
import Page from "@/contents-layouts/Page";

import type { Stats } from "@/contents/stats";

function getAllMdxFiles(directory: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name === "index.mdx") {
      files.push(fullPath);
    }
  });

  return files;
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "src/pages/blog");
  const filePaths = getAllMdxFiles(postsDirectory);

  const allPostsData = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { attributes, body } = frontMatter(fileContents) as {
      attributes: {
        date: string;
        title: string;
        category: string;
        tags?: string[];
      };
      body: string;
    };
    const wordCount = body.replace(/\s+/g, "").length;

    return {
      frontMatter: {
        ...(attributes as {
          date: string;
          title: string;
          category: string;
          tags?: string[];
        }),
        wordCount,
      },
      date: attributes.date,
      title: attributes.title,
      category: attributes.category,
      tags: attributes.tags || [],
    };
  });

  const postsByYear = Object.entries(
    allPostsData.reduce(
      (acc, post) => {
        const year = new Date(post.date).getFullYear().toString();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([year, count]) => ({ year, count }));

  const postsByCategory = Object.entries(
    allPostsData.reduce(
      (acc, post) => {
        const { category } = post;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([category, count]) => ({ category, count }));

  const stats = {
    totalPosts: allPostsData.length,
    totalCategories: new Set(allPostsData.map((post) => post.category)).size,
    totalTags: new Set(allPostsData.flatMap((post) => post.tags)).size,
    totalWordCount: allPostsData.reduce(
      (sum, post) => sum + post.frontMatter.wordCount,
      0,
    ),
    posts: allPostsData.map((post) => ({
      date: post.date,
      title: post.title,
      wordCount: post.frontMatter.wordCount,
    })),
    postsByYear,
    postsByCategory,
    categories: Array.from(new Set(allPostsData.map((post) => post.category))),
    tags: allPostsData.flatMap((post) => post.tags),
  };

  return {
    props: {
      stats,
    },
  };
};

function StatsPage({ stats }: { stats: Stats }) {
  return (
    <Page
      frontMatter={{
        title: "网站统计数据",
        description: `一些网站文章数据的统计`,
      }}
    >
      <StatsContents initialStats={stats} />
    </Page>
  );
}

export default StatsPage;
