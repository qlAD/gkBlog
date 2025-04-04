import clsx from "clsx";

import { QuickAccessIcon } from "@/components/Icons";
import Kbd from "@/components/Kbd";

import useGlobal from "@/hooks/useGlobal";

type NavIconQuickAccessProps = {
  onClick?: () => void;
};

// eslint-disable-next-line react/require-default-props
function NavIconQuickAccess({ onClick }: NavIconQuickAccessProps) {
  const { setQuickAccessOpen } = useGlobal();

  const handleClick = () => {
    setQuickAccessOpen(true);
    if (onClick) {
      onClick(); // 如果传递了外部的 onClick，则调用它
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        "ml-1 flex h-9 w-9 items-center justify-center gap-2 rounded-xl bg-slate-300/50 text-slate-800",
        "xl:w-auto xl:px-3",
        "hover:bg-slate-300/70 sm:ml-0",
        "dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-700/50",
      )}
      aria-label="打开快速访问"
      title="打开快速访问"
      onClick={handleClick}
    >
      <QuickAccessIcon className={clsx("h-5 w-5")} />
      <div
        className={clsx(
          "hidden items-center gap-2 text-xs font-bold",
          "xl:flex",
          "dark:font-normal",
        )}
      >
        快速访问
        <Kbd>Q</Kbd>
      </div>
    </button>
  );
}

export default NavIconQuickAccess;
