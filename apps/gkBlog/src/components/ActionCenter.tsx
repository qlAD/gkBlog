import clsx from "clsx";
import { m } from "framer-motion";
import { useTheme } from "next-themes";
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";

import { DarkIcon, EyeIcon, EyeSlash, LightIcon } from "@/components/Icons";

import useFocusMode from "@/hooks/useFocusMode";

import type { PropsWithChildren, ReactElement } from "react";

const lightoff = "/assets/sounds/lightoff.mp3";
const lighton = "/assets/sounds/lighton.mp3";

const animation = {
  hide: { y: -16, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.084,
    },
  },
};

interface ActionCenterButtonProps {
  icon: ReactElement;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

function ActionCenterButton({
  icon,
  title,
  active = false,
  onClick = () => {},
}: PropsWithChildren<ActionCenterButtonProps>) {
  const [playLightOff] = useSound(lightoff, { preload: true });
  const [playLightOn] = useSound(lighton, { preload: true });

  const handleClick = () => {
    if (active) {
      playLightOff();
    } else {
      playLightOn();
    }
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl p-4 transition-colors",
        "dark:bg-[#1d263a]",
        [active ? ["bg-white", "dark:bg-slate-700"] : "bg-white/50"]
      )}
    >
      <div className={clsx("")}>{icon}</div>
      <div
        className={clsx(
          "text-left text-[13px] font-medium",
          "dark:font-normal"
        )}
      >
        {title}
      </div>
    </button>
  );
}

function ActionCenter() {
  const { theme, setTheme } = useTheme();
  const { focusMode, setFocusMode } = useFocusMode();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <m.div
      className={clsx("flex flex-col gap-2")}
      initial="hide"
      animate="show"
      transition={{ staggerChildren: 0.06 }}
    >
      <m.div className={clsx("px-2 text-xl font-bold")} variants={animation}>
        控制中心
      </m.div>
      <div className={clsx("flex flex-1 flex-col gap-8 p-2")}>
        <m.div className={clsx("flex h-24 gap-4")} variants={animation}>
          <ActionCenterButton
            active={theme === "dark"}
            title={theme === "dark" ? "暗模式：开启" : "暗模式：关闭"}
            onClick={handleThemeChange}
            icon={
              <m.div
                animate={
                  theme === "dark"
                    ? { rotate: [90, 0] }
                    : { rotate: [90.01, 0] }
                }
                transition={{ ease: "easeOut", duration: 0.8 }}
                className={clsx("absolute top-4 left-4 h-36 w-36 rounded-full")}
              >
                <m.div
                  animate={
                    theme === "dark"
                      ? { opacity: [0.01, 1], scale: [0.801, 1] }
                      : { opacity: [0, 1], scale: [0.8, 1] }
                  }
                  transition={{ ease: "easeOut", duration: 0.8 }}
                  className={clsx("absolute top-0")}
                >
                  {theme === "dark" ? (
                    <DarkIcon className={clsx("h-5 w-5")} />
                  ) : (
                    <LightIcon className={clsx("h-5 w-5")} />
                  )}
                </m.div>
                <m.div
                  animate={
                    theme === "dark"
                      ? { opacity: [1, 0], scale: [1, 0.801] }
                      : { opacity: [1, 0.01], scale: [1, 0.8] }
                  }
                  transition={{ ease: "easeOut", duration: 0.8 }}
                  className={clsx("absolute bottom-0")}
                >
                  {theme === "dark" ? (
                    <LightIcon className={clsx("h-5 w-5 -rotate-90")} />
                  ) : (
                    <DarkIcon className={clsx("h-5 w-5 -rotate-90")} />
                  )}
                </m.div>
              </m.div>
            }
          />
          <ActionCenterButton
            title={focusMode ? "专注模式：开启" : "专注模式：关闭"}
            onClick={() => {
              setFocusMode(!focusMode);
            }}
            active={focusMode}
            icon={
              <>
                <div className={clsx("hidden", "fm:block")}>
                  <EyeIcon className={clsx("h-5 w-5")} />
                </div>
                <div className={clsx("fm:hidden")}>
                  <EyeSlash className={clsx("h-5 w-5")} />
                </div>
              </>
            }
          />
        </m.div>
      </div>
    </m.div>
  );
}

export default ActionCenter;
