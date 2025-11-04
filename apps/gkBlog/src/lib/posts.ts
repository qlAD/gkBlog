import frontMatter from "front-matter";
import fs from "fs";
import path from "path";

import type { TPostFrontMatter } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/pages/blog");

export const getPostSlugs = () => {
  const dirNames = fs.readdirSync(postsDirectory);

  return dirNames.filter((name) => {
    const dirPath = path.join(postsDirectory, name);
    return (
      fs.statSync(dirPath).isDirectory() &&
      fs.existsSync(path.join(dirPath, "index.mdx"))
    );
  });
};

export const getPostFrontMatter = (slug: string): TPostFrontMatter => {
  // 文章现在在一个文件夹中，每个文件夹下有一个 `index.mdx`
  const fullPath = path.join(postsDirectory, slug, "index.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 使用 front-matter 解析文件头部的元数据
  const { attributes } = frontMatter<TPostFrontMatter>(fileContents);

  return attributes;
};

export const getSortedPosts = () => {
  const slugs = getPostSlugs();

  const allPostsData = slugs.map((slug) => {
    const data = getPostFrontMatter(slug);

    return {
      slug,
      frontMatter: data,
    };
  });

  // 按日期排序文章
  return allPostsData.sort(
    ({ frontMatter: { date: a } }, { frontMatter: { date: b } }) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    },
  );
};

// 根据分类获取文章
export const getPostsByCategory = (category: string) => {
  const posts = getSortedPosts();
  return posts.filter((post) => post.frontMatter.category === category);
};

// 根据标签获取文章
export const getPostsByTag = (tag: string) => {
  const posts = getSortedPosts();
  return posts.filter((post) => post.frontMatter.tags?.includes(tag));
};

// 获取所有系列
export const getAllSeries = () => {
  const posts = getSortedPosts();
  const seriesMap = new Map<string, number>();

  posts.forEach((post) => {
    const { series } = post.frontMatter;
    if (series) {
      seriesMap.set(series, (seriesMap.get(series) || 0) + 1);
    }
  });

  return Array.from(seriesMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
};

// 根据系列获取文章
export const getPostsBySeries = (series: string) => {
  const posts = getSortedPosts();
  return posts
    .filter((post) => post.frontMatter.series === series)
    .sort((a, b) => {
      const orderA = a.frontMatter.seriesOrder || 0;
      const orderB = b.frontMatter.seriesOrder || 0;
      return orderA - orderB;
    });
};
