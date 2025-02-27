import { Switch } from '@mantine/core';
import classes from '@/shared/styles/switch/switch.module.css';
import { useSettingsContext } from '../../context';

export function UpdatesSwitch({ switchSize }: { switchSize: "xs" | "md" | "xl" }) {
    const { updatesEnabled, setUpdatesEnabled } = useSettingsContext();

    return (
        <Switch
            className={classes.switchWrapper}
            classNames={{ thumb: classes.thumb, track: classes.track }}
            size={switchSize}
            checked={updatesEnabled}
            onChange={(event) => {
                const newValue = event.currentTarget.checked;
                setUpdatesEnabled(newValue);
            }}
        />
    );
}