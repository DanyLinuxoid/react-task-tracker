import { useState } from "react";
import { JobInfoBase } from "../types/index.";

export const useJobsStore = () => {
    const [jobs, setJobs] = useState<JobInfoBase[]>([]);
    return { jobs, setJobs };
};

export const useSummaryHideShowStore = () => {
    const [showSummary, setShowSummary] = useState(true);
    return { showSummary, setShowSummary };
};

export const useGeneralHideShowStore = () => {
    const [showGeneral, setShowGeneral] = useState(true);
    return { showGeneral, setShowGeneral };
};

export const useModularHideShowStore = () => {
    const [showModular, setShowModular] = useState(true);
    return { showModular, setShowModular };
};

export const useDataCountStore = (initial: number) => {
    const [dataPointsCount, setDataPointsCount] = useState(initial);

    return {
        dataPointsCount,
        setDataPointsCount,
    };
};