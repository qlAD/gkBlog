import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/Icons";
import Head from "@/components/meta/Head";
import SkipNavigation from "@/components/navigations/SkipNavigation";
import PageHeader from "@/components/PageHeader";

import { formatDateRelative } from "@/helpers/post";
import { getAllSeries, getSeriesSlugs } from "@/lib/series";

import type { TSeries } from "@/lib/series";
import type { GetStaticPaths, GetStaticProps } from "next";

type SeriesDetailPageProps = {
  series: TSeries;
};

function SeriesDetailPage({ series }: SeriesDetailPageProps) {
  return (
    <>
      <Head
        title={`${series.title} - 系列文章`}
        description={series.description}
        ogImage={series.cover}
      />
      <SkipNavigation />
      <PageHeader
        title={series.title}
        description={series.description}
        caption="系列文章"
      />

      <div className={clsx("content-wrapper")}>
        <div className={clsx("mb-6 flex items-center gap-2")}>
          <span
            className={clsx(
              "rounded-full px-3 py-1",
              "bg-accent-100 text-sm font-medium text-accent-700",
              "dark:bg-accent-900 dark:text-accent-300",
            )}
          >
            共 {series.postCount} 篇文章
          </span>
        </div>

        <div className={clsx("space-y-4")}>
          {series.posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={clsx(
                "group flex items-center gap-4 rounded-xl p-4",
                "border border-divider-light bg-white",
                "transition-all duration-200",
                "hover:border-accent-400 hover:shadow-md",
                "dark:border-divider-dark dark:bg-slate-900",
                "dark:hover:border-accent-400",
              )}
            >
              <div
                className={clsx(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                  "bg-accent-500 text-lg font-bold text-white",
                )}
              >
                {index + 1}
              </div>

              <div
                className={clsx(
                  "hidden sm:block",
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg",
                )}
              >
                <Image
                  src={post.frontMatter.cover}
                  alt={post.frontMatter.title}
                  className={clsx("object-cover")}
                  fill
                />
              </div>

              <div className={clsx("flex-1 min-w-0")}>
                <h3
                  className={clsx(
                    "mb-1 font-bold text-slate-700",
                    "dark:text-slate-200",
                    "line-clamp-1",
                  )}
                >
                  {post.frontMatter.title}
                </h3>
                <p
                  className={clsx(
                    "text-sm text-slate-500",
                    "dark:text-slate-400",
                    "line-clamp-1",
                  )}
                >
                  {post.frontMatter.description}
                </p>
              </div>

              <div
                className={clsx(
                  "hidden sm:flex flex-shrink-0 items-center gap-2 text-xs text-slate-500",
                  "dark:text-slate-400",
                )}
              >
                <time dateTime={post.frontMatter.date}>
                  {formatDateRelative(post.frontMatter.date)}
                </time>
              </div>

              <ChevronRightIcon
                className={clsx(
                  "h-5 w-5 flex-shrink-0 text-slate-400 transition",
                  "group-hover:translate-x-1 group-hover:text-accent-500",
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getSeriesSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SeriesDetailPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const allSeries = getAllSeries();
  const series = allSeries.find((s) => s.slug === slug);

  if (!series) {
    return { notFound: true };
  }

  return {
    props: {
      series,
    },
  };
};

export default SeriesDetailPage;
