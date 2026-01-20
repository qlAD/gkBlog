import { getSeriesConfigByTitle } from "@/data/series";

import { getSortedPosts } from "./posts";

import type { TPostFrontMatter } from "@/types";

export type TSeriesPost = {
  slug: string;
  frontMatter: TPostFrontMatter;
};

export type TSeries = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  posts: TSeriesPost[];
  postCount: number;
};

export const seriesNameToSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");

export const getAllSeries = (): TSeries[] => {
  const posts = getSortedPosts();
  const seriesMap = new Map<string, TSeriesPost[]>();

  posts.forEach((post) => {
    const { series } = post.frontMatter;
    if (series) {
      const existing = seriesMap.get(series) || [];
      existing.push(post);
      seriesMap.set(series, existing);
    }
  });

  const seriesList: TSeries[] = [];

  seriesMap.forEach((seriesPosts, seriesName) => {
    const sortedPosts = seriesPosts.sort((a, b) => {
      const orderA = a.frontMatter.seriesOrder ?? Infinity;
      const orderB = b.frontMatter.seriesOrder ?? Infinity;
      return orderA - orderB;
    });

    const firstPost = sortedPosts[0];
    const config = getSeriesConfigByTitle(seriesName);

    seriesList.push({
      slug: config?.slug ?? seriesNameToSlug(seriesName),
      title: seriesName,
      description: config?.description ?? firstPost.frontMatter.description,
      cover: config?.cover ?? firstPost.frontMatter.cover,
      posts: sortedPosts,
      postCount: sortedPosts.length,
    });
  });

  return seriesList.sort((a, b) => {
    const dateA = a.posts[0]?.frontMatter.date || "";
    const dateB = b.posts[0]?.frontMatter.date || "";
    return dateB.localeCompare(dateA);
  });
};

export const getSeriesBySlug = (slug: string): TSeries | undefined => {
  const allSeries = getAllSeries();
  return allSeries.find((s) => s.slug === slug);
};

export const getSeriesByName = (name: string): TSeries | undefined => {
  const allSeries = getAllSeries();
  return allSeries.find((s) => s.title === name);
};

export const getSeriesSlugs = (): string[] => {
  const allSeries = getAllSeries();
  return allSeries.map((s) => s.slug);
};

export const getSeriesNavigation = (
  seriesName: string,
  currentSlug: string,
): {
  series: TSeries;
  currentIndex: number;
  prevPost: TSeriesPost | null;
  nextPost: TSeriesPost | null;
} | null => {
  const series = getSeriesByName(seriesName);
  if (!series) return null;

  const currentIndex = series.posts.findIndex(
    (post) => post.slug === currentSlug,
  );
  if (currentIndex === -1) return null;

  return {
    series,
    currentIndex,
    prevPost: currentIndex > 0 ? series.posts[currentIndex - 1] : null,
    nextPost:
      currentIndex < series.posts.length - 1
        ? series.posts[currentIndex + 1]
        : null,
  };
};
