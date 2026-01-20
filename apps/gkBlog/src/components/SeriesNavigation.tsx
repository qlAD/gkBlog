import clsx from "clsx";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/Icons";

type SeriesNavigationProps = {
  seriesTitle: string;
  seriesSlug: string;
  currentIndex: number;
  totalCount: number;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
};

function SeriesNavigation({
  seriesTitle,
  seriesSlug,
  currentIndex,
  totalCount,
  prevPost,
  nextPost,
}: SeriesNavigationProps) {
  return (
    <div
      className={clsx(
        "my-8 rounded-xl border p-4",
        "border-divider-light bg-slate-50",
        "dark:border-divider-dark dark:bg-slate-800/50",
      )}
    >
      <div className={clsx("mb-3 flex items-center justify-between")}>
        <Link
          href={`/series/${seriesSlug}`}
          className={clsx(
            "flex items-center gap-1 text-sm font-semibold",
            "text-accent-600 hover:text-accent-700",
            "dark:text-accent-400 dark:hover:text-accent-300",
          )}
        >
          {seriesTitle}
          <ChevronRightIcon className={clsx("h-3 w-3")} />
        </Link>
        <span className={clsx("text-xs text-slate-500", "dark:text-slate-400")}>
          {currentIndex + 1} / {totalCount}
        </span>
      </div>

      <div className={clsx("flex gap-3")}>
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className={clsx(
              "flex flex-1 flex-col rounded-lg p-3",
              "border border-divider-light bg-white",
              "transition-colors hover:border-accent-400",
              "dark:border-divider-dark dark:bg-slate-900",
              "dark:hover:border-accent-400",
            )}
          >
            <span
              className={clsx(
                "mb-1 text-xs text-slate-500",
                "dark:text-slate-400",
              )}
            >
              上一篇
            </span>
            <span
              className={clsx(
                "text-sm font-medium text-slate-700 line-clamp-1",
                "dark:text-slate-200",
              )}
            >
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className={clsx("flex-1")} />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className={clsx(
              "flex flex-1 flex-col rounded-lg p-3 text-right",
              "border border-divider-light bg-white",
              "transition-colors hover:border-accent-400",
              "dark:border-divider-dark dark:bg-slate-900",
              "dark:hover:border-accent-400",
            )}
          >
            <span
              className={clsx(
                "mb-1 text-xs text-slate-500",
                "dark:text-slate-400",
              )}
            >
              下一篇
            </span>
            <span
              className={clsx(
                "text-sm font-medium text-slate-700 line-clamp-1",
                "dark:text-slate-200",
              )}
            >
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div className={clsx("flex-1")} />
        )}
      </div>
    </div>
  );
}

export default SeriesNavigation;
