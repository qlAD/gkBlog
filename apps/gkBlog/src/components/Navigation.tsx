import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";

import { TravellingIcon } from "@/components/Icons";
import NavIcon from "@/components/navigations/NavIcon";
import NavIconQuickAccess from "@/components/navigations/NavIconQuickAccess";
import NavLink from "@/components/navigations/NavLink";
import NavLinkDropdown from "@/components/navigations/NavLinkDropdown";
import NavLogo from "@/components/navigations/NavLogo";

import useOnScroll from "@/hooks/useOnScroll";

const clickSfx = "/assets/sounds/click.mp3";
const openSound = "/assets/sounds/open.mp3";
const closeSound = "/assets/sounds/close.mp3";

function Navbar() {
  const isScrolled = useOnScroll(0);

  const [playClickSound] = useSound(clickSfx, { preload: true });
  const [playOpenSound] = useSound(openSound, { preload: true });
  const [playCloseSound] = useSound(closeSound, { preload: true });

  const myLinks = useMemo(
    () => [
      { title: "回忆录", href: "/essay" },
      { title: "相册集", href: "/album" },
      { title: "书影音", href: "/media" },
    ],
    [],
  );
  const moreLinks = useMemo(
    () => [
      { title: "宝藏项目", href: "/projects" },
      { title: "友情链接", href: "/links" },
      { title: "留言反馈", href: "/feedback" },
    ],
    [],
  );

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const combinedMoreLinks = useMemo(
    () => (isSmallScreen ? [...myLinks, ...moreLinks] : moreLinks),
    [myLinks, moreLinks, isSmallScreen],
  );

  return (
    <header
      className={clsx("fixed top-0 right-0 left-0 z-[1000]", "fm:absolute")}
    >
      <div
        className={clsx(
          "fixed inset-0 h-16",
          [
            isScrolled === true && [
              "border-divider-light border-b bg-white/70 backdrop-blur",
              "dark:border-divider-dark dark:bg-slate-900/80",
            ],
          ],
          "fm:hidden",
        )}
      />
      <div className={clsx("h-2", [isScrolled === true && ["-mt-2"]])} />
      <div className={clsx("content-wrapper-max", "mx-auto max-w-7xl")}>
        <div
          className={clsx(
            "relative z-50 flex h-16 items-center justify-between px-2 text-sm",
            "md:px-4",
          )}
        >
          {/* 左侧 LOGO */}
          <nav className={clsx("flex items-center")} data-accent="violet">
            <NavLogo href="/" title="Home" />
          </nav>

          {/* 中间导航菜单 */}
          <div className={clsx("flex flex-grow justify-center")}>
            <ul className={clsx("flex items-center", "md:gap-1")}>
              <li>
                <NavLink
                  title="博客"
                  href="/blog"
                  onClick={() => playClickSound()}
                />
              </li>
              <li>
                <NavLink
                  title="T.I.L"
                  href="/today-i-learned"
                  onClick={() => playClickSound()}
                />
              </li>
              <li>
                <NavLink
                  title="统计"
                  href="/stats"
                  onClick={() => playClickSound()}
                />
              </li>
              <li className={clsx("hidden md:block")} data-accent="blue">
                <NavLinkDropdown
                  title="我的"
                  items={myLinks}
                  onOpenClick={() => playOpenSound()}
                  onCloseClick={() => playCloseSound()}
                  onLinkClick={() => playClickSound()}
                />
              </li>
              <li className={clsx("")} data-accent="blue">
                <NavLinkDropdown
                  title="更多"
                  items={combinedMoreLinks}
                  onOpenClick={() => playOpenSound()}
                  onCloseClick={() => playCloseSound()}
                  onLinkClick={() => playClickSound()}
                />
              </li>
            </ul>
          </div>

          {/* 右侧图标 */}
          <ul className={clsx("flex items-center")}>
            <li className={clsx("hidden", "sm:block")}>
              <NavIcon
                href="https://www.travellings.cn/go.html"
                icon={<TravellingIcon className={clsx("h-5 w-5")} />}
                title="Travelling"
              />
            </li>
            <li className={clsx("hidden", "sm:block")}>
              <div
                className={clsx(
                  "ml-2 mr-4 h-3 w-[1px] bg-slate-200",
                  "dark:bg-slate-700",
                )}
              />
            </li>
            <li className={clsx("mr-2")}>
              <NavIconQuickAccess onClick={() => playClickSound()} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
