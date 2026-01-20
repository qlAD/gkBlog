/**
 * 系列文章独立配置文件
 * 用于配置系列的元数据，覆盖从文章中自动提取的信息
 */

export type TSeriesConfig = {
  /** 系列唯一标识 (slug) */
  slug: string;
  /** 系列标题 */
  title: string;
  /** 系列描述 */
  description: string;
  /** 封面图片 URL */
  cover?: string;
  /** 系列颜色主题 */
  color?: string;
  /** 是否在导航中显示 */
  showInNav?: boolean;
  /** 排序权重 (越小越靠前) */
  order?: number;
};

/**
 * 系列配置列表
 * 在此添加系列的自定义配置
 * 如果文章的 series frontmatter 名称能匹配到这里的 title，
 * 则使用此处的配置覆盖自动生成的信息
 */
export const seriesConfigs: TSeriesConfig[] = [
  // 示例配置：
  // {
  //   slug: 'nextjs-blog-guide',
  //   title: 'Next.js 博客搭建指南',
  //   description: '从零开始搭建一个现代化的 Next.js 博客',
  //   cover: 'https://cdn.example.com/series/nextjs-blog.png',
  //   color: 'blue',
  //   showInNav: true,
  //   order: 1,
  // },
];

/**
 * 根据系列名称获取配置
 */
export const getSeriesConfigByTitle = (
  title: string,
): TSeriesConfig | undefined => {
  return seriesConfigs.find(
    (config) => config.title.toLowerCase() === title.toLowerCase(),
  );
};

/**
 * 根据 slug 获取配置
 */
export const getSeriesConfigBySlug = (
  slug: string,
): TSeriesConfig | undefined => {
  return seriesConfigs.find((config) => config.slug === slug);
};

/**
 * 获取所有配置的系列
 */
export const getAllSeriesConfigs = (): TSeriesConfig[] => {
  return seriesConfigs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
};
