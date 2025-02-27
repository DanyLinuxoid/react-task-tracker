export interface Bundle {
    id: string;
    overview: ChartOverviewProps;
    info: ChartInfoProps;
}

export interface JobInfoBase {
    id: string;
    name: string;
    startTimestamp: number;
    backgroundJobType: string;
    isFinished: boolean;
}

export interface ChartSize {
    width: number;
    height: number;
    isLowerCaseTitle: boolean;
    badgeSize: "xs" | "sm" | "md" | "lg" | "xl";
}

export interface ChartInfoProps {
    data: DataPoint[];
    height: number;
    width: number;
}

export interface DataPoint {
    time: any;
    value: number;
}

export interface ChartOverviewProps {
    isLowerCaseBadgeText: boolean;
    chartTitle: string;
    currentActiveCount: number;
    biggestActiveCount: number;
    types: string[];
    badgeSize: string;
}

export interface GetComponentProps {
    key: keyof JobInfoBase | null;
    records: JobInfoBase[];
    settings: ChartSize;
}