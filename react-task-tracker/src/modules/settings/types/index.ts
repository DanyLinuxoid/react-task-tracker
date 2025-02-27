interface LightDarkSwitchProps {
    colorScheme: 'light' | 'dark';
    setColorScheme: (value: 'light' | 'dark') => void;
}
