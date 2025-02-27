import { Card } from '@mantine/core';
import styles from './chart-card.module.css'; 
import { ChartInfoProps, ChartOverviewProps } from '../../types/index.';
import { ChartInfo } from '../chart-info';
import { ChartOverview } from '../chart-overview';

export const ChartCard = ({ overview, info }: { overview: ChartOverviewProps, info: ChartInfoProps }) => {
    return (
        <>
            <Card
                style={{
                    border: "1px solid var(--mantine-color-gray-4)",
                    paddingRight: "var(--mantine-radius-md)", 
                    paddingLeft: "var(--mantine-radius-lg)", 
                    paddingTop: "var(--mantine-radius-lg)", 
                    paddingBottom: "var(--mantine-radius-xl)" 
                }}
                radius="lg"
                className={styles.card}>
                <Card.Section style={{ margin: 0 }}>
                    <ChartInfo {...info} />
                </Card.Section>
                <ChartOverview {...overview} />
            </Card>
        </>
    );
};