import clsx from 'clsx';

import Head from '@/components/meta/Head';
import PageHeader from '@/components/shared/Header/PageHeader';
import TableOfContents from '@/components/shared/TableOfContents';

import { getPostOgImageUrl, getPostStructuredData } from '@/helpers/post';

import type { TPostFrontMatter, TTableOfContents } from '@/types';

interface PostContentsLayoutProps {
  frontMatter: TPostFrontMatter;
  tableOfContents: TTableOfContents;
  children: React.ReactNode;
}

function PostContentsLayout({
  frontMatter: { title, date, lang, tags, description, category },
  tableOfContents,
  children,
}: PostContentsLayoutProps) {
  const ogImage = getPostOgImageUrl({
    category,
    title,
    date,
    lang,
    tags,
  });

  const structuredData = getPostStructuredData({
    title,
    dateModified: date,
    datePublished: date,
    images: [ogImage['1/1'], ogImage['4/3'], ogImage['16/9']],
  });

  return (
    <>
      <Head
        title={title}
        description={description}
        ogImage={ogImage.default}
        structuredData={structuredData}
      />
      <PageHeader title={title} caption={category} description={description} />
      <div className={clsx('content-wrapper')}>
        <div className={clsx('flex gap-8', 'xl:gap-24')}>
          <div
            className={clsx(
              'hidden border-l border-divider-light',
              ' dark:border-divider-dark lg:block'
            )}
          />
          <div
            className={clsx('mdx-contents flex-1')}
            id="mdx-contents"
            lang={lang}
          >
            {children}
          </div>
          {tableOfContents.length > 0 && (
            <div className={clsx('-mt-36 hidden', 'lg:block')}>
              <TableOfContents items={tableOfContents} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostContentsLayout;
