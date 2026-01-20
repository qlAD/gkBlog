import clsx from "clsx";

import useReadingProgress from "@/hooks/useReadingProgress";

function ReadingProgressBar() {
  const progress = useReadingProgress();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-[1001] h-1",
        "bg-slate-200/50 dark:bg-slate-700/50",
      )}
    >
      <div
        className={clsx(
          "h-full transition-all duration-150 ease-out",
          "bg-gradient-to-r from-accent-400 to-accent-600",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgressBar;
