import { MantineProvider } from '@mantine/core';
import './css/index.css'
import classes from './css/app.module.css'
import '@mantine/core/styles.css';
import DashboardPage from '../pages/dashboard';
import { SettingsModule } from '../modules/settings';
import 'react-notifications/lib/notifications.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <>
            <MantineProvider>
                <header className={`${classes.header} ${classes.sticky}`}>
                    <SettingsModule />
                </header>
                <div style={{ marginLeft: '1%', marginRight: '1%' }}>
                    <DashboardPage />
                </div>
                <ToastContainer />
            </MantineProvider>
        </>
    );
};

export default App;