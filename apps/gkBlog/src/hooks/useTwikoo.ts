import { useEffect, useRef, useState } from "react";

interface TwikooConfig {
  envId: string;
  el: string;
  pageSize?: number;
  includeReply?: boolean;
  urls?: string[];
}

interface Comment {
  id: string;
  url: string;
  nick: string;
  mailMd5: string;
  link: string;
  comment: string;
  commentText: string;
  created: number;
  avatar: string;
  relativeTime: string;
}

declare global {
  interface Window {
    twikoo: {
      init: (config: TwikooConfig) => void;
      getRecentComments: (config: TwikooConfig) => Promise<Comment[]>;
    };
  }
}

function useTwikoo(options?: { envId?: string }) {
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [twikooLoaded, setTwikooLoaded] = useState(false);
  const scriptLoadedRef = useRef(false);

  const envId = options?.envId || process.env.NEXT_PUBLIC_TWIKOO_ENVID;

  // 加载 twikoo 脚本
  useEffect(() => {
    if (scriptLoadedRef.current) {
      // 始终返回一个空函数
      return () => {};
    }
    scriptLoadedRef.current = true;

    const script = document.createElement("script");
    script.src = "/assets/js/twikoo.min.js";
    script.async = true;

    script.onload = () => {
      setTwikooLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 初始化评论区
  const initTwikoo = (el: string) => {
    if (window.twikoo && twikooLoaded) {
      window.twikoo.init({
        envId,
        el,
      });
    }
  };

  // 获取最新评论
  const fetchRecentComments = async (pageSize = 3) => {
    if (window.twikoo && twikooLoaded) {
      try {
        const comments = await window.twikoo.getRecentComments({
          envId,
          pageSize,
          includeReply: false,
          el: "",
        });
        setRecentComments(comments);
        return comments;
      } catch (e) {
        // 可以处理错误
      }
    }
    return [];
  };

  return {
    twikooLoaded,
    recentComments,
    fetchRecentComments,
    initTwikoo,
  };
}

export default useTwikoo;
