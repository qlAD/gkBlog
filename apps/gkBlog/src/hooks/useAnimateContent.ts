import { Content } from "@/contents/index/CleanIntuitive";
import { useEffect, useRef, useState } from "react";

export const useAnimateContent = (content: Array<Content>) => {
  const [currentState, setCurrentState] = useState<Content>(content[0]);
  const [isUserClick, setIsUserClick] = useState(false);

  // Use refs to store timer IDs
  const animateStateRef = useRef<NodeJS.Timeout | null>(null);
  const timeOutStateRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isUserClick) {
      timeOutStateRef.current = setTimeout(() => {
        animateStateRef.current = setInterval(() => {
          setCurrentState(
            (prev) =>
              content[
                content.indexOf(prev) < content.length - 1
                  ? content.indexOf(prev) + 1
                  : 0
              ],
          );
        }, 1000);

        setIsUserClick(false);
      }, 5000);
    } else {
      animateStateRef.current = setInterval(() => {
        setCurrentState(
          (prev) =>
            content[
              content.indexOf(prev) < content.length - 1
                ? content.indexOf(prev) + 1
                : 0
            ],
        );
      }, 1500);
    }

    return () => {
      if (animateStateRef.current) {
        clearInterval(animateStateRef.current);
      }
      if (timeOutStateRef.current) {
        clearTimeout(timeOutStateRef.current);
      }
    };
  }, [content, isUserClick]);

  return { setIsUserClick, currentState, setCurrentState };
};
