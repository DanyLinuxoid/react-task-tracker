import { create } from "zustand";

export interface SettingsState {
    shouldUseMock: boolean;
    secondsToPurgeData: number | null;
    updatesEnabled: boolean;
    secondsDelayBetweenRequests: number | null;
    maxAllowedDataPoints: number | null;
    shouldPurgeCharts: boolean;

    setUseMock: (value: boolean) => void;
    setSecondsToPurgeData: (value: number | null) => void;
    setUpdatesEnabled: (value: boolean) => void;
    setDelayBetweenRequests: (value: number | null) => void;
    setMaxAllowedDataPoints: (value: number | null) => void;
    setShouldPurgeCharts: (value: boolean) => void;
}

export const useSettingsContext = create<SettingsState>((set) => ({
    shouldUseMock: true,
    secondsToPurgeData: null,
    updatesEnabled: true,
    secondsDelayBetweenRequests: null,
    shouldPurgeCharts: false,
    maxAllowedDataPoints: null,

    setUseMock: (value) => set({ shouldUseMock: value }),
    setSecondsToPurgeData: (value) => set({ secondsToPurgeData: value }),
    setDelayBetweenRequests: (value) => set({ secondsDelayBetweenRequests: value }),
    setMaxAllowedDataPoints: (value) => set({ maxAllowedDataPoints: value }),
    setShouldPurgeCharts: (value) => set({ shouldPurgeCharts: value }),
    setUpdatesEnabled: (value) => set({ updatesEnabled: value })
}))