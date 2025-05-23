interface PieChartProps {
  data: Array<{ category: string; count: number }>;
}

function PieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // 固定的4种颜色
  const colors = ["#e34c26", "#f1e05a", "#2b7489", "#3572A5"];

  return (
    <div className="flex flex-row items-center w-full justify-between gap-4 -mt-5">
      <div className="relative w-[140px] h-[140px] md:w-80 md:h-80 flex-shrink-0">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {sortedData.map(({ category, count }, index) => {
            const percentage = (count / total) * 100;
            const offset = sortedData
              .slice(0, index)
              .reduce((sum, item) => sum + (item.count / total) * 100, 0);

            // 计算扇形路径
            const r = 40;
            const cx = 50;
            const cy = 50;
            const startAngle = (offset * 3.6 - 90) * (Math.PI / 180);
            const endAngle =
              ((offset + percentage) * 3.6 - 90) * (Math.PI / 180);

            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);

            const largeArcFlag = percentage > 50 ? 1 : 0;

            const d = [
              `M ${cx} ${cy}`,
              `L ${x1} ${y1}`,
              `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ");

            return (
              <path
                key={category}
                d={d}
                fill={colors[index % colors.length]}
                className="transition-transform hover:scale-105 origin-center"
              />
            );
          })}
        </svg>
      </div>
      <div className="labels space-y-1.5 md:space-y-2 flex-1 min-w-[140px]">
        {sortedData.map(({ category, count }, index) => (
          <div
            key={category}
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
            style={{ color: colors[index % colors.length] }}
          >
            <span className="text-base md:text-xl">●</span>
            <span className="whitespace-nowrap">
              {category}: {count} 篇 ({((count / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
