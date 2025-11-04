import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import type { TPostFrontMatter } from '@/types';

interface SeriesNavigationProps {
  series: string;
  posts: { slug: string; frontMatter: TPostFrontMatter }[];
  currentSlug: string;
}

const SeriesNavigation: React.FC<SeriesNavigationProps> = ({ series, posts, currentSlug }) => {
  // 找到当前文章在系列中的索引
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{series}</h3>
      
      <div className="space-y-2 mb-6">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={clsx(
              'block p-2 rounded transition-colors',
              post.slug === currentSlug
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{post.frontMatter.title}</span>
              <span className="text-xs text-gray-500">{index + 1}/{posts.length}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 上一篇/下一篇导航 */}
      <div className="flex justify-between">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center space-x-1 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded transition-colors"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm text-gray-700">上一篇</span>
          </Link>
        )}

        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center space-x-1 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded transition-colors ml-auto"
          >
            <span className="text-sm text-gray-700">下一篇</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SeriesNavigation;