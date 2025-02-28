import { Menu, Text, ActionIcon, TextInput, Tooltip, Button } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useSettingsContext } from './context';
import { IsValidNumber } from '../../shared/helpers/number-helper';
import { useState } from 'react';
import { LightDarkSwitch } from './components/light-dark-switch';
import { MockSwitch } from './components/mock-switch';
import { UpdatesSwitch } from './components/updates-switch';

export const SettingsModule = () => {
    const { secondsToPurgeData, setSecondsToPurgeData, secondsDelayBetweenRequests, setDelayBetweenRequests, maxAllowedDataPoints, setMaxAllowedDataPoints, setShouldPurgeCharts } = useSettingsContext();
    const [secondsToPurgeDataTemp, setSecondsToPurgeDataTemp] = useState<number | null>(null);
    const [secondsDelayBetweenRequestsTemp, setDelayBetweenRequestsTemp] = useState<number | null>(null);
    const [maxAllowedDataPointsTemp, setMaxAllowedDataPointsTemp] = useState<number | null>(1000);

    // Resusable
    const renderInputField =
        (label: string, text: string, placeHolder: string, value: number | null, valueTemp: number | null, setValue: (value: number | null) => void, setValueTemp: React.Dispatch<React.SetStateAction<number | null>>, min: number | null) => (
        <Tooltip label={label} position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
            <Menu.Item
                    leftSection={<Text style={{ width: "150px" }}>{text}</Text>}
                    style={{ cursor: "default", paddingTop: 0, paddingBottom: 0 }}>
                    <TextInput
                            value={value ? value : ""}
                            style={{ marginTop: 5, height: 40 }}
                            mt="xs"
                            placeholder={placeHolder}
                            error={valueTemp !== null && min !== null && !IsValidNumber(valueTemp, min) ? "Invalid number" : null}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setValueTemp(null);
                                    setValue(null);
                                } else {
                                    const num = Number(e.target.value);
                                    setValueTemp(num);
                                    if (IsValidNumber(num, 1)) {
                                        setValue(num);
                                    }
                                }
                        }} />
            </Menu.Item>
        </Tooltip>
    );
    const renderSwitchItem = (label: string, text: string, children: any) => (
        <Tooltip label={label} position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
            <Menu.Item
                style={{ cursor: "default" }}
                leftSection={<Text style={{ width: "200px" }}>{text}</Text>}
                rightSection={
                    <div style={{ right: "16px" }}>
                        {children}
                    </div>
                } />
        </Tooltip>
    );

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

                    {renderSwitchItem("Use mock data instead of calling real server", "Use mock", <MockSwitch switchSize={"md"} />)}
                    {renderSwitchItem("If charts should be updating", "Updates On/Off", <UpdatesSwitch switchSize={"md"} />)}
                    {renderInputField(
                        "Point limit after which the chart is redrawn", "Reset After Points", "", maxAllowedDataPoints, maxAllowedDataPointsTemp, setMaxAllowedDataPoints, setMaxAllowedDataPointsTemp, null)}
                    {renderInputField(
                        "Removes charts from 3-rd section if data is not updated after provided seconds", "Remove old after", "", secondsToPurgeData, secondsToPurgeDataTemp, setSecondsToPurgeData, setSecondsToPurgeDataTemp, null)}
                    {renderInputField(
                        "Delay between requests in seconds (defaults to 5 when unset)", "Requests delay", "", secondsDelayBetweenRequests, secondsDelayBetweenRequestsTemp, setDelayBetweenRequests, setDelayBetweenRequestsTemp, 1)}

                    <Tooltip label="Purges all charts (destroys)" position="top-start" withArrow transitionProps={{ transition: 'pop-bottom-right' }}>
                        <Menu.Item component="div">
                            <Button color="red" fullWidth onClick={() => setShouldPurgeCharts(true)}>
                                Purge Charts
                            </Button>
                        </Menu.Item>
                    </Tooltip>
            </Menu.Dropdown>
        </Menu>
    );
}