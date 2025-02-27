import { createChart, IChartApi, LineSeries } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { useDataCountStore } from '../../store/store';
import { ChartInfoProps } from '../../types/index.';
import { useMantineColorScheme } from '@mantine/core';
import { useSettingsContext } from '../../../settings/context';

export const ChartInfo = (props: ChartInfoProps ) => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<any>(null);
    const keysSetRef = useRef<Set<string>>(new Set());
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

        let newPointsAdded = 0;
        for (const newPoint of props.data) {
            const pointExists = keysSetRef.current.has(newPoint.time);
            if (!pointExists) {
                seriesRef.current.update(newPoint);
                keysSetRef.current.add(newPoint.time);
                newPointsAdded++;
            }
        }

        const newPointsCount = dataPointsCount + newPointsAdded;
        if (newPointsCount > maxAllowedDataPoints) { // If limit reached -> reset chart data
            seriesRef.current.setData(props.data);
            keysSetRef.current = new Set(props.data.map(point => point.time));
            setDataPointsCount(props.data.length);
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