import clsx from "clsx";

import Sidebar from "@/components/sidebar/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import TwikooComments from "@/components/TwikooComments";
import SeriesNavigation from "@/components/SeriesNavigation";

import type { TTableOfContents, TPostFrontMatter } from "@/types";
import type { PropsWithChildren } from "react";

interface PageWithMDXProps {
  tableOfContents: TTableOfContents;
  series?: string;
  seriesPosts?: { slug: string; frontMatter: TPostFrontMatter }[];
  currentSlug?: string;
}

function PageWithMDX({
  tableOfContents,
  children = null,
  series,
  seriesPosts,
  currentSlug,
}: PropsWithChildren<PageWithMDXProps>) {
  return (
    <div
      className={clsx(
        "content-wrapper flex-shrink-0 overflow-hidden",
        "lg:overflow-visible",
      )}
    >
      <div className={clsx("flex flex-row gap-6")}>
        {/* 左侧 */}
        <div className={clsx("flex min-w-0 flex-col ")}>
          {/* 上 */}
          <div className={clsx("flex flex-row gap-8")}>
            <div
              className={clsx(
                "border-divider-light hidden border-l",
                "dark:border-divider-dark lg:block",
              )}
            />

            <div
              className={clsx("mdx-contents min-w-0 flex-1 scroll-mt-[86px]")}
              id="main-contents"
              data-ss-wrapper
            >
              {children}
            </div>
          </div>
          {/* 下 */}
          <div className={clsx("mt-4")}>
            <TwikooComments />
          </div>
        </div>
        {/* 右侧 */}
        <div className={clsx("-mt-48 hidden", "lg:block")}>
          <div
            className={clsx(
              "sticky top-24 z-[901] w-64",
              "xl:w-[272px]",
              "fm:relative fm:top-0",
            )}
          >
            {/* 系列导航 */}
            {series && seriesPosts && currentSlug && (
              <SeriesNavigation
                series={series}
                posts={seriesPosts}
                currentSlug={currentSlug}
              />
            )}
            
            <TableOfContents items={tableOfContents} />
            <div className={clsx("my-6")} />
            <Sidebar
              show={["publicAccount", "recentArticles", "recentComments"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageWithMDX;
