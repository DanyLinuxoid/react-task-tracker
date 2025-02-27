import { Menu, Text, ActionIcon, TextInput, Tooltip, Button } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useSettingsContext } from './context';
import { IsValidNumber } from '../../shared/helpers/number-helper';
import { useState } from 'react';
import { LightDarkSwitch } from './components/light-dark-switch';
import { MockSwitch } from './components/mock-switch';
import { UpdatesSwitch } from './components/updates-switch';

export const SettingsModule = () => {
    const { secondsToPurgeData, setSecondsToPurge, secondsDelayBetweenRequests, setDelayBetweenRequests, maxAllowedDataPoints, setMaxAllowedDataPoints, setShouldPurgeCharts } = useSettingsContext();
    const [secondsToPurgeDataTemp, setSecondsToPurgeDataTemp] = useState<number | null>(null);
    const [secondsDelayBetweenRequestsTemp, setSecondsDelayBetweenRequestsTemp] = useState<number | null>(null);
    const [maxAllowedDataPointsTemp, setMaxAllowedDataPointsTemp] = useState<number | null>(1000);
    return (
        <Menu shadow="xl" width={10} closeOnItemClick={false} closeOnClickOutside={true}>
            <Menu.Target>
                <ActionIcon variant="default" size="lg" radius="xl">
                    <IconSettings size={28} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown style={{ width: "300px" }}>
                <Menu.Item
                    style={{ cursor: "default" }}
                    leftSection={<Text style={{ width: "200px" }}>Theme</Text>}
                    rightSection={
                        <div style={{ right: "16px" }}>
                            <LightDarkSwitch switchSize={"md"} iconSize={16} />
                        </div>
                    } />

                <Tooltip label="Use mock data instead of calling real server" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                    <Menu.Item
                        style={{ cursor: "default" }}
                        leftSection={<Text style={{ width: "200px" }}>Use Mock</Text>}
                        rightSection={
                            <div style={{ right: "16px" }}>
                                <MockSwitch switchSize={"md"} />
                            </div>
                        } />
                </Tooltip>

                <Tooltip label="If charts should be updating" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                    <Menu.Item
                        style={{ cursor: "default" }}
                        leftSection={<Text style={{ width: "200px" }}>Updates On/Off</Text>}
                        rightSection={
                            <div style={{ right: "16px" }}>
                                <UpdatesSwitch switchSize={"md"} />
                            </div>
                        } />
                </Tooltip>

                <Tooltip label="Point limit after which the chart is redrawn" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                    <Menu.Item
                        leftSection={<Text style={{ width: "150px" }}>Reset After Points</Text>}
                        style={{ cursor: "default", paddingTop: 0 }}>
                            <TextInput
                                value={maxAllowedDataPoints ? maxAllowedDataPoints : ""}
                                style={{ margin: 0 }}
                                mt="xs"
                                placeholder="Max allowed points"
                                error={maxAllowedDataPointsTemp !== null && !IsValidNumber(maxAllowedDataPointsTemp, 10) ? "Invalid number" : null}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setMaxAllowedDataPointsTemp(10);
                                        setMaxAllowedDataPoints(10);
                                    } else {
                                        const num = Number(e.target.value);
                                        setMaxAllowedDataPointsTemp(num);
                                        if (IsValidNumber(num, 1)) {
                                            setMaxAllowedDataPoints(num);
                                        }
                                    }
                                }} />
                    </Menu.Item>
                </Tooltip>

                <Tooltip label="Purges all charts (destroys)" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                    <Menu.Item component="div">
                        <Button color="red" fullWidth onClick={() => setShouldPurgeCharts(true)}>
                            Purge Charts
                        </Button>
                    </Menu.Item>
                </Tooltip>

                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item style={{ cursor: "default", paddingTop: 0 }}>
                    <Tooltip label="Seconds to reset chart data" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                        <TextInput
                            value={secondsToPurgeData ? secondsToPurgeData : ""}
                            style={{ margin: 0 }}
                            mt="xs"
                            placeholder="Seconds to reset chart data"
                            error={secondsToPurgeDataTemp !== null && !IsValidNumber(secondsToPurgeDataTemp, 1) ? "Invalid number" : null}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSecondsToPurgeDataTemp(null);
                                    setSecondsToPurge(null);
                                } else {
                                    const num = Number(e.target.value);
                                    setSecondsToPurgeDataTemp(num);
                                    if (IsValidNumber(num, 1)) {
                                        setSecondsToPurge(num);
                                    }
                                }
                            }} />
                    </Tooltip>
                    <Tooltip label="Delay between requests in seconds (defaults to 5 when unset)" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                        <TextInput
                            value={secondsDelayBetweenRequests ? secondsDelayBetweenRequests : ""}
                            style={{ margin: 0 }}
                            mt="xs"
                            placeholder="Delay between requests"
                            error={secondsDelayBetweenRequestsTemp !== null && !IsValidNumber(secondsDelayBetweenRequestsTemp, 1) ? "Invalid number" : null}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setDelayBetweenRequests(null);
                                    setSecondsDelayBetweenRequestsTemp(null);
                                } else {
                                    const num = Number(e.target.value);
                                    setSecondsDelayBetweenRequestsTemp(num);
                                    if (IsValidNumber(num, 1)) {
                                        setDelayBetweenRequests(num);
                                    }
                                }
                            }} />
                    </Tooltip>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}