import { getAllSeries } from "@/lib/series";

import SeriesContents from "@/contents/series";
import Page from "@/contents-layouts/Page";

import type { SeriesContentsProps } from "@/contents/series";
import type { GetStaticProps } from "next";

type SeriesPageProps = {
  seriesList: SeriesContentsProps["seriesList"];
};

function SeriesPage({ seriesList }: SeriesPageProps) {
  return (
    <Page
      frontMatter={{
        title: "系列文章",
        description: "系统学习，循序渐进",
      }}
    >
      <SeriesContents seriesList={seriesList} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<SeriesPageProps> = async () => {
  const allSeries = getAllSeries();

  const seriesList = allSeries.map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    cover: s.cover,
    postCount: s.postCount,
  }));

  return {
    props: {
      seriesList,
    },
  };
};

export default SeriesPage;
