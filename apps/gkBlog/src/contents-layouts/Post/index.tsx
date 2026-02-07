import { PropsWithChildren } from "react";

import WithReactions from "@/components/layouts/WithReactions";
import WithTableOfContents from "@/components/layouts/WithTableOfContents";
import Head from "@/components/meta/Head";
import SkipNavigation from "@/components/navigations/SkipNavigation";
import PageHeader from "@/components/PageHeader";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import SeriesNavigation from "@/components/SeriesNavigation";

import { getPostOgImageUrl, getPostStructuredData } from "@/helpers/post";

import PostFooter from "@/contents-layouts/Post/PostFooter";
import PostMeta from "@/contents-layouts/Post/PostMeta";

import type { TPostFrontMatter, TTableOfContents } from "@/types";

type SeriesNavigationData = {
  seriesTitle: string;
  seriesSlug: string;
  currentIndex: number;
  totalCount: number;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
};

interface PostProps {
  frontMatter: TPostFrontMatter;
  tableOfContents: TTableOfContents;
  seriesNavigation?: SeriesNavigationData | null;
}

function Post({
  frontMatter: { title, description, caption, category, date, lang, tags },
  tableOfContents,
  seriesNavigation = null,
  children = null,
}: PropsWithChildren<PostProps>) {
  const postOgImages = getPostOgImageUrl({
    category: caption || category,
    title,
    date,
    lang,
    tags,
  });

  const structuredData = getPostStructuredData({
    title,
    dateModified: date,
    datePublished: date,
    images: [postOgImages["1/1"], postOgImages["4/3"], postOgImages["16/9"]],
  });

  return (
    <>
      <ReadingProgressBar />
      <Head
        title={title}
        description={description}
        ogImage={postOgImages.default}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SkipNavigation />
      <PageHeader title={title} description={description} caption={caption} />
      <PostMeta date={date} lang={lang} />
      <WithTableOfContents tableOfContents={tableOfContents}>
        {seriesNavigation && (
          <SeriesNavigation
            seriesTitle={seriesNavigation.seriesTitle}
            seriesSlug={seriesNavigation.seriesSlug}
            currentIndex={seriesNavigation.currentIndex}
            totalCount={seriesNavigation.totalCount}
            prevPost={seriesNavigation.prevPost}
            nextPost={seriesNavigation.nextPost}
          />
        )}
        {children}
        {seriesNavigation && (
          <SeriesNavigation
            seriesTitle={seriesNavigation.seriesTitle}
            seriesSlug={seriesNavigation.seriesSlug}
            currentIndex={seriesNavigation.currentIndex}
            totalCount={seriesNavigation.totalCount}
            prevPost={seriesNavigation.prevPost}
            nextPost={seriesNavigation.nextPost}
          />
        )}
        <PostFooter tags={tags} category={category} />
      </WithTableOfContents>
      <WithReactions contentTitle={title} contentType="POST" />
    </>
  );
}

export default Post;
