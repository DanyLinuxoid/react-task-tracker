import { Switch } from '@mantine/core';
import classes from '@/shared/styles/switch/switch.module.css';
import { useSettingsContext } from '../../context';

export function MockSwitch({ switchSize }: { switchSize: "xs" | "md" | "xl" }) {
    const { shouldUseMock, setUseMock } = useSettingsContext();

    return (
        <Switch
            className={classes.switchWrapper}
            classNames={{ thumb: classes.thumb, track: classes.track }}
            size={switchSize}
            checked={shouldUseMock}
            onChange={(event) => {
                const newValue = event.currentTarget.checked;
                setUseMock(newValue);
            }}
        />
    );
}