import Head from "@/components/meta/Head";

import { getBaseUrl } from "@/helpers/url";

import IndexContents from "@/contents/index";

function Index() {
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Liye的Blog",
    description:
      "记录日常学习与开发中的点滴收获。分享编程实践、学习笔记和个人感悟，希望与同行共同进步，一起探索技术世界。",
    url: baseUrl,
    publisher: {
      "@type": "Person",
      name: "qlAD",
      url: `${baseUrl}/about-me`,
    },
    author: {
      "@type": "Person",
      name: "qlAD",
      url: `${baseUrl}/about-me`,
    },
    sameAs: ["https://github.com/qlAD"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Head
        title="Liye的Blog"
        description="Liye的Blog，记录日常学习与开发中的点滴收获。分享编程实践、学习笔记和个人感悟，希望与同行共同进步，一起探索技术世界。"
        ogImage={`${baseUrl}/assets/images/og-image.png`}
        overrideTitle
      />
      <IndexContents />
    </>
  );
}

export default Index;
