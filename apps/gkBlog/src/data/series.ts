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
  {
    slug: "college-life",
    title: "大学生活记录",
    description:
      "记录我在 DNUI 的大学四年时光，从入学第一天到毕业，用文字留住青春的点滴。",
    cover: "https://cdn.qladgk.com/images/20250907193406818.png",
    showInNav: true,
    order: 1,
  },
  {
    slug: "python-beginner",
    title: "Python 初级",
    description:
      "Python 入门系列教程，从零开始学习 Python 编程，涵盖基础语法、数据类型、控制结构、函数与模块等核心知识。",
    cover: "https://cdn.qladgk.com/images/20260120153638828.jpg",
    showInNav: true,
    order: 2,
  },
];

/**
 * 根据系列名称获取配置
 */
export const getSeriesConfigByTitle = (
  title: string,
): TSeriesConfig | undefined =>
  seriesConfigs.find(
    (config) => config.title.toLowerCase() === title.toLowerCase(),
  );

/**
 * 根据 slug 获取配置
 */
export const getSeriesConfigBySlug = (
  slug: string,
): TSeriesConfig | undefined =>
  seriesConfigs.find((config) => config.slug === slug);

/**
 * 获取所有配置的系列
 */
export const getAllSeriesConfigs = (): TSeriesConfig[] =>
  seriesConfigs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
