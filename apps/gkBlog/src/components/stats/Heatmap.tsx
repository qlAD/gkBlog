import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// Move helper functions to the top
function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function createWeek() {
  const week = document.createElement("div");
  week.className = "heatmap_week";
  return week;
}

function createDay({
  date,
  title,
  count,
  posts,
}: {
  date: string;
  title?: string;
  count: number;
  posts: number;
}) {
  const day = document.createElement("div");
  day.className = cn(
    "heatmap_day",
    count === 0 && "heatmap_day_level_0",
    count > 0 && count < 1000 && "heatmap_day_level_1",
    count >= 1000 && count < 2000 && "heatmap_day_level_2",
    count >= 2000 && count < 3000 && "heatmap_day_level_3",
    count >= 3000 && "heatmap_day_level_4",
  );

  day.setAttribute("data-date", date);
  if (title) day.setAttribute("data-title", title);
  day.setAttribute("data-count", count.toString());
  day.setAttribute("data-posts", posts.toString());

  // Add tooltip
  day.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "heatmap_tooltip";

    let tooltipContent = "";
    if (posts > 0)
      tooltipContent += `<span class="heatmap_tooltip_post">共 ${posts} 篇</span>`;
    if (count > 0)
      tooltipContent += `<span class="heatmap_tooltip_count"> ${count} 字；</span>`;
    if (title)
      tooltipContent += `<span class="heatmap_tooltip_title">《${title}》</span>`;
    tooltipContent += `<span class="heatmap_tooltip_date">${date}</span>`;

    tooltip.innerHTML = tooltipContent;
    day.appendChild(tooltip);
  });

  day.addEventListener("mouseleave", () => {
    const tooltip = day.querySelector(".heatmap_tooltip");
    if (tooltip) day.removeChild(tooltip);
  });

  return day;
}

interface HeatmapProps {
  data: {
    date: string;
    title?: string;
    wordCount: number;
  }[];
}

function Heatmap({ data }: HeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get dates for the last year
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    // Adjust to start from Monday
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() + 1);
    }

    const container = containerRef.current;
    container.innerHTML = ""; // Clear existing content

    // Create month labels
    const monthDiv = document.createElement("div");
    monthDiv.className = "month mb-1 flex justify-around";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const numMonths = window.innerWidth < 768 ? 6 : 12;
    const startMonthIndex = (startDate.getMonth() - (numMonths - 1) + 12) % 12;

    for (let i = startMonthIndex; i < startMonthIndex + numMonths; i += 1) {
      const monthSpan = document.createElement("span");
      monthSpan.textContent = monthNames[i % 12];
      monthDiv.appendChild(monthSpan);
    }
    container.appendChild(monthDiv);

    // Create heatmap grid
    const heatmapDiv = document.createElement("div");
    heatmapDiv.className = "h-[84px]";

    const gridDiv = document.createElement("div");
    gridDiv.className = "flex flex-row";

    const currentDate = new Date(startDate);
    let currentWeek = createWeek();

    while (currentDate <= today) {
      if (currentDate.getDay() === 1 && currentDate > startDate) {
        gridDiv.appendChild(currentWeek);
        currentWeek = createWeek();
      }

      const dateString = formatDate(currentDate);
      const dayData = data.find((d) => d.date === dateString);

      const day = createDay({
        date: dateString,
        title: dayData?.title,
        count: dayData?.wordCount ?? 0,
        posts: dayData ? 1 : 0,
      });

      currentWeek.appendChild(day);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    gridDiv.appendChild(currentWeek);
    heatmapDiv.appendChild(gridDiv);
    container.appendChild(heatmapDiv);
  }, [data]);

  return (
    <div className="tailwindcss-heatmap flex flex-col items-end max-w-fit text-[10px] leading-[12px] text-neutral-700 dark:text-neutral-400">
      <div className="flex flex-row items-end">
        <div className="flex flex-col justify-end items-end mr-1 mt-1 text-right">
          <span>Mon</span>
          <span>&nbsp;</span>
          <span>Wed</span>
          <span>&nbsp;</span>
          <span>Fri</span>
          <span>&nbsp;</span>
          <span>Sun</span>
        </div>
        <div ref={containerRef} className="heatmap" />
      </div>

      <div className="flex mt-2 items-center">
        <span>Less</span>
        <div className="flex flex-row items-center gap-[2px] w-max h-[10px] mx-1">
          <span className="block w-[10px] h-[10px] rounded-sm bg-[#ebedf0] dark:bg-[#161b22]" />
          <span className="block w-[10px] h-[10px] rounded-sm bg-[#9be9a8] dark:bg-[#0e4429]" />
          <span className="block w-[10px] h-[10px] rounded-sm bg-[#40c463] dark:bg-[#006d32]" />
          <span className="block w-[10px] h-[10px] rounded-sm bg-[#30a14e] dark:bg-[#26a641]" />
          <span className="block w-[10px] h-[10px] rounded-sm bg-[#216e39] dark:bg-[#39d353]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

export default Heatmap;
