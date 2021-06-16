import { useMemo, useState } from 'react';
import Carousel, {
    slidesToShowPlugin,
    slidesToScrollPlugin,
    autoplayPlugin,
    Dots,
    CarouselPluginTypes,
} from '@brainhubeu/react-carousel';

export interface ICarouselItem {
    image: string;
    description?: React.ReactElement;
}

interface ICarouselProp {
    numberToShow: number;
    numerToScroll: number;
    autoplay: boolean;
    showDot: boolean;
    data: ICarouselItem[];
    renderItem: (item: ICarouselItem, itemIndex: number) => JSX.Element;
}

export function BasicCarousel(prop: ICarouselProp): JSX.Element {
    const { numberToShow, numerToScroll, autoplay, showDot, data, renderItem } = prop || {};

    const [value, setValue] = useState(0);

    const plugins: Array<string | CarouselPluginTypes> = [
        'centered',
        'infinite',
        'arrows',
        {
            resolve: slidesToShowPlugin,
            options: {
                numberOfSlides: numberToShow,
            },
        },
        {
            resolve: slidesToScrollPlugin,
            options: {
                numberOfSlides: numerToScroll,
            },
        },
    ];

    if (autoplay) {
        plugins.push({
            resolve: autoplayPlugin,
            options: {
                interval: 3000,
            },
        });
    }

    const component = useMemo(() => {
        const onChange = (value: number) => {
            setValue(value);
        };
        return (
            <div className="carousel-container">
                <Carousel
                    className="basic-carousel"
                    plugins={plugins}
                    value={value}
                    animationSpeed={1000}
                    onChange={onChange}
                >
                    {(data || []).map((item, itemKey) => renderItem(item, itemKey))}
                </Carousel>
                {showDot && <Dots value={value} onChange={onChange} number={data.length} />}
            </div>
        );
    }, [data, value]);

    return component;
}
