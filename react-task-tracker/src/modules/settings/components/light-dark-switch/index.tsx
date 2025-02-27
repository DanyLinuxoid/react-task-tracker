import { Switch, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import classes from '@/shared/styles/switch/switch.module.css';

export function LightDarkSwitch({ switchSize, iconSize }: { iconSize: number, switchSize: "xs" | "md" | "xl" }) {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <Switch
            className={ classes.switchWrapper} 
            classNames={{ thumb: classes.thumb, track: classes.track }}
            size={switchSize}
            checked={colorScheme === 'dark'}
            onChange={(event) => {
                const newValue = event.currentTarget.checked;
                setColorScheme(newValue ? 'dark' : 'light');
            }}
            onLabel={<IconSun size={iconSize} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
            offLabel={<IconMoonStars size={iconSize} stroke={2.5} color="var(--mantine-color-blue-6)" />}
        />
    );
}