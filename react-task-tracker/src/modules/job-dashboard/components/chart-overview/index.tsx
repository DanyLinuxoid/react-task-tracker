import { ChartOverviewProps } from "../../types/index.";
import overviewStyles from "./chart-overview.module.css";
import { Badge, Card, Container, Group } from '@mantine/core';

export const ChartOverview = (props: ChartOverviewProps) => {
    return (
        <Card.Section className={overviewStyles.section}>
            <Group gap={7} mt={5}>
                <Badge size="md" variant="filled" style={{ textTransform: props.isLowerCaseBadgeText ? "none" : "uppercase" }}>
                    {props.chartTitle}
                </Badge>
                {props.types.map((prop) => prop != props.chartTitle && (
                    <Badge key={props.chartTitle + prop} size={props.badgeSize} variant="light">
                        {prop}
                    </Badge>
                ))}
                <Container className={overviewStyles.badgeContainer}>
                    <Badge size={props.badgeSize} variant="outline">
                        Biggest Active: {props.biggestActiveCount}
                    </Badge>
                    <Badge size={props.badgeSize} variant="dot">
                        Active: {props.currentActiveCount}
                    </Badge>
                </Container>
            </Group>
        </Card.Section>
    );
};