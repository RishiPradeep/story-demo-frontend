import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function CalendarHeatMap({ heatmap }: any) {
  const newValues = heatmap.map((item: any) => ({
    date: item.date.split("T")[0], // Extract date part only
    count: item.commits, // Use commits as count
  }));
  console.log(newValues);

  return (
    <div>
      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2025-01-01")}
        values={newValues}
      />
    </div>
  );
}
