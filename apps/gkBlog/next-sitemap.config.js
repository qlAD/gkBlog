/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://gkblog.xiaodoudou.vip/",
  priority: 0.6,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    const defaultValue = (priority) => ({
      loc: path,
      changefreq: config.changefreq,
      priority: priority || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    });

    if (path === "/") {
      return defaultValue(1.0);
    }

    if (path === "/blog") {
      return defaultValue(0.9);
    }

    if (path === "/today-i-learned") {
      return defaultValue(0.6);
    }

    if (path === "/essay") {
      return defaultValue(0.6);
    }

    if (path === "/album") {
      return defaultValue(0.6);
    }

    if (path === "/media") {
      return defaultValue(0.6);
    }

    if (path === "/shortcodes") {
      return defaultValue(0.6);
    }

    if (path === "/links") {
      return defaultValue(0.6);
    }

    if (path === "/feedback") {
      return defaultValue(0.6);
    }

    return defaultValue();
  },
};
