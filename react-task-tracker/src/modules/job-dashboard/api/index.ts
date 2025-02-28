import { generateMockJobs } from "@/shared/testing/mock";

export const getJobsData = async (startTimestamp: number, useMockData: boolean = true) => {
    const params = new URLSearchParams({
        lastDate: startTimestamp.toString(),
    }).toString();

    const response: any = useMockData ? generateMockJobs() : await fetch(`${import.meta.env.VITE_API_URL}?${params}`);
    if (!useMockData && response?.status != 200)
        throw new Error(`${response?.status}-${response?.statusText}`);

    return response;
}