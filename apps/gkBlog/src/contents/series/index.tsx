import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/Icons";

export type SeriesContentsProps = {
  seriesList: Array<{
    slug: string;
    title: string;
    description: string;
    cover: string;
    postCount: number;
  }>;
};

function SeriesContents({ seriesList }: SeriesContentsProps) {
  if (seriesList.length === 0) {
    return (
      <div className={clsx("content-wrapper")}>
        <p className={clsx("text-slate-600", "dark:text-slate-400")}>
          暂无系列文章
        </p>
      </div>
    );
  }

  return (
    <div className={clsx("content-wrapper")}>
      <div className={clsx("grid gap-6", "sm:grid-cols-2", "lg:grid-cols-3")}>
        {seriesList.map(({ slug, title, description, cover, postCount }) => (
          <Link
            key={slug}
            href={`/series/${slug}`}
            className={clsx(
              "group relative flex flex-col overflow-hidden rounded-2xl",
              "border border-divider-light bg-white",
              "transition-all duration-300",
              "hover:border-accent-400 hover:shadow-lg",
              "dark:border-divider-dark dark:bg-slate-900",
              "dark:hover:border-accent-400",
            )}
          >
            <div className={clsx("relative aspect-[16/9] w-full")}>
              <Image
                src={cover}
                alt={title}
                className={clsx("object-cover")}
                fill
                priority
              />
              <div
                className={clsx(
                  "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
                )}
              />
              <div
                className={clsx(
                  "absolute bottom-3 left-3 rounded-full px-3 py-1",
                  "bg-accent-500 text-xs font-medium text-white",
                )}
              >
                {postCount} 篇文章
              </div>
            </div>

            <div className={clsx("flex flex-1 flex-col p-4")}>
              <h3
                className={clsx(
                  "mb-2 text-lg font-bold text-slate-700",
                  "dark:text-slate-200",
                  "line-clamp-1",
                )}
              >
                {title}
              </h3>
              <p
                className={clsx(
                  "mb-4 flex-1 text-sm text-slate-600",
                  "dark:text-slate-400",
                  "line-clamp-2",
                )}
              >
                {description}
              </p>
              <div
                className={clsx(
                  "flex items-center gap-1 text-sm font-semibold",
                  "text-accent-600",
                  "dark:text-accent-400",
                )}
              >
                查看系列
                <ChevronRightIcon
                  className={clsx(
                    "h-3 w-3 transition",
                    "group-hover:translate-x-1",
                  )}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SeriesContents;
