import { ChartSize, DataPoint, JobInfoBase } from "../types/index.";

export const getMergedChartInfoProps = (settings: ChartSize, jobs: Record<string, JobInfoBase[]>) => {
    return Object.entries(jobs).map(([entry, data]) => ({
        data: mergePoints(
            (data.map((job) => ({
                time: job.startTimestamp,
                value: 1,
            }))).reduce((all, item) => {
                const existing = all.find((x) => x.time === item.time);
                if (existing) {
                    existing.value += item.value
                } else {
                    all.push(item);
                }
                return all;
            }, [] as { time: number, value: number }[])
        ),
        height: settings.height,
        width: settings.width,  
    }));
}

export const mergePoints = (points: DataPoint[]): DataPoint[] => {
    const groupedData = points.reduce((acc, item) => {
        if (acc[item.time]) {
            acc[item.time].value += item.value;
        } else {
            acc[item.time] = { ...item };
        }
        return acc;
    }, {} as Record<number, DataPoint>);

    return Object.values(groupedData);
};

