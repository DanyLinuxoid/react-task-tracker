import { useRef, useEffect } from "react";
import { getMergedChartInfoProps } from "../../helpers";
import { JobInfoBase, Bundle, ChartInfoProps, ChartOverviewProps, GetComponentProps } from "../../types/index.";
import { useGeneralHideShowStore, useJobsStore, useModularHideShowStore, useSummaryHideShowStore } from "../../store/store";
import { Divider, SimpleGrid } from "@mantine/core";
import { AnimatePresence } from "motion/react"
import { dateTimeNowSeconds } from "@/shared/helpers/date-helper";
import { getWindowSizes } from "@/shared/helpers/size-helper";
import { groupBy } from "@/shared/helpers/sorting-helper";
import { Presence } from "@/ui/mantine-ui/animation/presence";
import { Visible } from "@/ui/mantine-ui/animation/visibility";
import { ChartCard } from "../chart-card";
import { useSettingsContext } from "../../../settings/context";
import { getJobsData } from "../../api";
import { ChartsCarousel } from "../chart-carousel";
import { toast } from "react-toastify";
import { getNewId } from "@/shared/helpers/id-helper";

export const DashboardModule = () => {
    const { jobs, setJobs } = useJobsStore();
    const { showGeneral, setShowGeneral } = useGeneralHideShowStore();
    const { showSummary, setShowSummary } = useSummaryHideShowStore();
    const { showModular, setShowModular } = useModularHideShowStore();
    const lastTimeRef = useRef<Map<string, number>>(new Map());
    const biggestAtiveCountRef = useRef<Map<string, number>>(new Map());
    const lastTimestampUpdatedRef = useRef<Map<string, number>>(new Map());
    const allComponentsInfosRef = useRef<Bundle | null>(null);
    const typesComponentsInfosRef = useRef<Bundle[]>([]);
    const namesComponentsInfosRef = useRef<Bundle[]>([]);
    const { shouldUseMock, secondsToPurgeData, secondsDelayBetweenRequests, updatesEnabled, shouldPurgeCharts, setShouldPurgeCharts } = useSettingsContext();
    const windowSizes = getWindowSizes(1, 1);
    const mainKey = getNewId(null);

    // Update jobs constantly
    useEffect(() => {
        const getComponentInfos = (props: GetComponentProps, additionalId: number): Bundle[] => {
            const jobsByKey = props?.key ? groupBy(props.records, props.key) : { "ALL": props.records };
            const infosLatest: Record<string, JobInfoBase[]> = {};

            Object.entries(jobsByKey).forEach(([entry, data]) => {
                const lastTimeByRef = lastTimeRef.current.get(entry) || 0;
                const newData = data
                    .sort((a: JobInfoBase, b: JobInfoBase) => a.startTimestamp - b.startTimestamp)
                    .filter((x: JobInfoBase) => x.startTimestamp > lastTimeByRef);

                if (newData.length > 0) {
                    const lastTimestamp = newData[newData.length - 1].startTimestamp;
                    lastTimeRef.current.set(entry, lastTimestamp);
                }

                infosLatest[entry] = newData;
            });

            const overviews: ChartOverviewProps[] = Object.entries(jobsByKey).map(([entry, data]) => {
                const typedData = data as JobInfoBase[];
                const uniqueBackgroundJobTypes = typedData
                    .map((value) => value.backgroundJobType)
                    .reduce<string[]>((prevVal: string[], currVal, i, arr) => {
                        if (arr.indexOf(currVal) === i) {
                            prevVal.push(currVal);
                        }
                        return prevVal;
                    }, [])
                    .sort();
                const currentSumActive = typedData.filter((x) => !x.isFinished).length;
                const currentBiggestActive = biggestAtiveCountRef.current.get(entry) || 0;
                if (currentSumActive > currentBiggestActive) {
                    biggestAtiveCountRef.current.set(entry, currentSumActive);
                }

                return {
                    chartTitle: entry,
                    currentActiveCount: currentSumActive,
                    biggestActiveCount: currentBiggestActive,
                    types: uniqueBackgroundJobTypes,
                    badgeSize: props.settings.badgeSize,
                    isLowerCaseBadgeText: props.settings.isLowerCaseTitle,
                };
            });
            const infos: ChartInfoProps[] = getMergedChartInfoProps(props.settings, infosLatest);

            // 1-to-1 mapping
            return overviews.map((data, index) => ({
                id: data.chartTitle + additionalId,
                overview: data,
                info: infos[index]
            })) as Bundle[];
        }; 

        const updateJobs = async () => {
            if (shouldPurgeCharts) {
                setShouldPurgeCharts(false);
                return;
            }

            if (!updatesEnabled)
                return;

            let data: JobInfoBase[] = [];
            try {
                const response: any = await getJobsData((jobs.length > 0 ? jobs[jobs.length - 1].startTimestamp : 0), shouldUseMock);
                data = shouldUseMock ? response : await response.json();
            } catch (e) {
                toast.error((e as Error).message);
            }

            if (data && JSON.stringify(data) !== JSON.stringify(jobs)) {
                setJobs(data);
                let oldComponents = namesComponentsInfosRef.current;

                // Removing old
                if (secondsToPurgeData && secondsToPurgeData >= 1) {
                    const currentTimeInSecond = dateTimeNowSeconds();
                    oldComponents = oldComponents.filter((x) => {
                        const result = lastTimestampUpdatedRef.current.get(x.id);
                        return !result || currentTimeInSecond < result + secondsToPurgeData;
                    });
                }

                allComponentsInfosRef.current = getComponentInfos({ // All section
                    key: null,
                    records: data,
                    settings: {
                        width: windowSizes.width * 0.96,
                        height: windowSizes.height * 0.30,
                        isLowerCaseTitle: false,
                        badgeSize: 'md'
                    }
                }, 1)[0];
                const uniqueTypesCount = new Set(data.map((x) => x.backgroundJobType)).size;
                typesComponentsInfosRef.current = getComponentInfos({ // By type
                    key: 'backgroundJobType',
                    records: data,
                    settings: {
                        width: uniqueTypesCount > 2 ? windowSizes.width * 0.30 : windowSizes.width * 0.46,
                        height: windowSizes.height * 0.30,
                        isLowerCaseTitle: false,
                        badgeSize: 'md'
                    }
                }, 2).sort((a, b) => a.id.localeCompare(b.id));
                const updatedNameComponents = getComponentInfos({ // By name
                    key: "name",
                    records: data,
                    settings: {
                        width: windowSizes.width * 0.30,
                        height: windowSizes.height * 0.23,
                        isLowerCaseTitle: true,
                        badgeSize: 'md'
                    }
                }, 3).sort((a, b) => a.id.localeCompare(b.id));

                // Update time
                for (var i = 0; i < updatedNameComponents.length; i++) {
                    const updateTime = dateTimeNowSeconds();
                    lastTimestampUpdatedRef.current.set(updatedNameComponents[i].id, updateTime);
                }

                // Updating old
                const allCurrentIds = new Set(oldComponents.map((x => x.id)));
                const newComponents = updatedNameComponents.filter(x => !allCurrentIds.has(x.id)).sort((a, b) => a.id.localeCompare(b.id));
                for (var i = 0; i < updatedNameComponents.length; i++) {
                    if (!allCurrentIds.has(updatedNameComponents[i].id))
                        continue;
                    
                    let existingToUpdate = oldComponents.find(x => x.id === updatedNameComponents[i].id);
                    if (!existingToUpdate)
                        continue;

                    existingToUpdate.info = updatedNameComponents[i].info;
                    existingToUpdate.overview = updatedNameComponents[i].overview;
                }
                namesComponentsInfosRef.current = [...oldComponents, ...newComponents];
            }
        };

        updateJobs(); // Initial launch
        const interval = setInterval(updateJobs, secondsDelayBetweenRequests && secondsDelayBetweenRequests >= 1 ? secondsDelayBetweenRequests * 1000 : 5000); // Default to 5 seconds
        return () => clearInterval(interval);
    }, [secondsToPurgeData, secondsDelayBetweenRequests, shouldUseMock, updatesEnabled]); 

    // Listen for purge
    useEffect(() => {
        if (shouldPurgeCharts) {
            setShouldPurgeCharts(false);
            setJobs([]);
            allComponentsInfosRef.current = null;
            typesComponentsInfosRef.current = [];
            namesComponentsInfosRef.current = [];
            lastTimeRef.current = new Map();
            biggestAtiveCountRef.current = new Map();
            lastTimestampUpdatedRef.current = new Map();
            allComponentsInfosRef.current = null;
            typesComponentsInfosRef.current = [];
            namesComponentsInfosRef.current = [];
        }
    }, [shouldPurgeCharts]);

    return (
        <div key={!shouldPurgeCharts ? "" : mainKey}>
            {allComponentsInfosRef.current &&
                <>
                    <Divider my="xs" label="Summary" labelPosition="center" onClick={() => setShowSummary((prev) => !prev)} style={{ cursor: "pointer" }} />
                    <Visible isVisible={showSummary}>
                        <ChartCard overview={allComponentsInfosRef.current.overview} info={allComponentsInfosRef.current.info} />
                    </Visible>
                </>}
            {typesComponentsInfosRef.current &&
                <>
                    <Divider my="xs" label="By Type" labelPosition="center" onClick={() => setShowGeneral((prev) => !prev)} style={{ cursor: "pointer" }} />
                    <Visible isVisible={showGeneral}>
                        <ChartsCarousel bundles={typesComponentsInfosRef.current} />
                    </Visible>
                </>}
            {namesComponentsInfosRef.current &&
                <>
                    <Divider my="xs" label="By Name" labelPosition="center" onClick={() => setShowModular((prev) => !prev)} style={{ cursor: "pointer" }} />
                    <Visible isVisible={showModular}>
                        <SimpleGrid cols={3} spacing="xs">
                            <AnimatePresence>
                                {namesComponentsInfosRef.current.map((item) => (
                                    <Presence key={`name-${item.id}-${item.overview.chartTitle}`}>
                                        <ChartCard key={`name-${item.id}-${item.overview.chartTitle}`} overview={item.overview} info={item.info} />
                                    </Presence>
                                ))}
                            </AnimatePresence>
                        </SimpleGrid>
                    </Visible>
                </>}
        </div>
    );
};



