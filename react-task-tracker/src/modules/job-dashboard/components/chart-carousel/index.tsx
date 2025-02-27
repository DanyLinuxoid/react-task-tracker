import { Carousel } from '@mantine/carousel';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { ChartCard } from '../chart-card';
import { Bundle } from '../..';

export function ChartsCarousel({ bundles }: { bundles: Bundle[] }) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = bundles.map((item) => (
        <Carousel.Slide key={item.id}>
            <ChartCard overview={item.overview} info={item.info} />
        </Carousel.Slide>
    ));
    return (
        <Carousel
            slideSize={{ base: '100%', sm: '50%' }}
            slideGap={{ base: 1, sm: 'xs' }}
            align="start"
            slidesToScroll={mobile ? 1 : 2}>
            {slides}
        </Carousel>
    );
}