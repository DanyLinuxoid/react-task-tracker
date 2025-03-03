import { createChart, IChartApi, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { useDataCountStore } from '../../store/store';
import { ChartInfoProps } from '../../types/index.';
import { useMantineColorScheme } from '@mantine/core';
import { useSettingsContext } from '../../../settings/context';

export const ChartInfo = (props: ChartInfoProps) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<any>(null);
    const keysSetRef = useRef<Set<string>>(new Set());
    const lastPointTimeRef = useRef<number>(0); 
    const { dataPointsCount, setDataPointsCount } = useDataCountStore(props.data.length);
    const { maxAllowedDataPoints } = useSettingsContext();
    const isMountDoneRef = useRef(false);
    const { colorScheme } = useMantineColorScheme();

    // Initial creation
    useEffect(() => {
        if (!chartContainerRef.current)
            return;

        const chart = createChart(chartContainerRef.current, {
            width: props.width,
            height: props.height,
            layout: {
                background: { color: '#222' },
                textColor: '#DDD',
            },
            grid: {
                vertLines: { color: '#222' },
                horzLines: { color: '#222' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                tickMarkFormatter: (time: any) => {
                    const timestamp = typeof time === 'number' ? time : time.timestamp;
                    const date = new Date(timestamp * 1000);
                    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                },
            },
            localization: {
                timeFormatter: (timestamp: number) => {
                    const date = new Date(timestamp * 1000);
                    return date.toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    });
                },
            },
        });
        chartRef.current = chart;

        const handleResize = () => {
            if (chartContainerRef.current) {
                const width = chartContainerRef.current.clientWidth;
                chart.applyOptions({ width });
            }
        };

        const newSeries = chart.addSeries(LineSeries);
        seriesRef.current = newSeries;
        newSeries.setData(props.data);
        props.data.forEach((point) => keysSetRef.current.add(point.time)); // For faster reads on update
        if (props.data.length > 0) {
            const lastPointTime = Math.max(...props.data.map(point => new Date(point.time).getTime()));
            lastPointTimeRef.current = lastPointTime;
        }

        window.addEventListener('resize', handleResize);

        isMountDoneRef.current = true;
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    // Update points
    useEffect(() => {
        if (!seriesRef.current || !chartRef.current)
            return;

        // Data should be sorted on upper level, but this is just in case since this is critical and will break frontend if anything
        const sortedData = [...props.data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        let newPointsAdded = 0;
        for (const newPoint of sortedData) {
            const newPointTime = new Date(newPoint.time).getTime();
            if (newPointTime > lastPointTimeRef.current) {
                const pointExists = keysSetRef.current.has(newPoint.time);
                if (!pointExists) {
                    seriesRef.current.update(newPoint);
                    keysSetRef.current.add(newPoint.time);
                    newPointsAdded++;
                    lastPointTimeRef.current = newPointTime;
                }
            }
        }

        const newPointsCount = dataPointsCount + newPointsAdded;
        if (maxAllowedDataPoints && newPointsCount > maxAllowedDataPoints) { // If limit reached -> reset chart data
            seriesRef.current.setData(sortedData);
            keysSetRef.current = new Set(sortedData.map(point => point.time));
            setDataPointsCount(sortedData.length);

            if (sortedData.length > 0) {
                lastPointTimeRef.current = Math.max(...sortedData.map(point => new Date(point.time).getTime()));
            }
        } else {
            setDataPointsCount(newPointsCount);
        }
    }, [props.data, dataPointsCount, maxAllowedDataPoints, colorScheme]);

    // Update options based on theme (when changed) or if chart should be purged
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.applyOptions({
                layout: {
                    background: { color: colorScheme == 'light' ? '#FFF' : '#222' },
                    textColor: colorScheme == 'light' ? '#000' : '#DDD',
                },
                grid: {
                    vertLines: { color: colorScheme == 'light' ? '#E0E0E0' : '#222' },
                    horzLines: { color: colorScheme == 'light' ? '#E0E0E0' : '#222' },
                },
            });
        }
    }, [colorScheme]);

    return (<div ref={chartContainerRef} />);
};