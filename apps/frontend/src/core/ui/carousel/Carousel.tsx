import { Button } from "@nextui-org/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./Carousel.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export type CarouselProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    startIndex?: number;
};

function Carousel<T>({ items, renderItem, startIndex = 0 }: CarouselProps<T>) {
    const [index, setIndex] = useState<number>(startIndex);
    const containerRef = useRef<HTMLDivElement>(null);

    const onBackPress = () => {
        setIndex(index && index - 1);
    };

    const onNextPress = () => {
        if (index !== items.length - 1) {
            setIndex(index + 1);
        }
    };

    useLayoutEffect(() => {
        if (containerRef.current) {
            const { current } = containerRef;
            const { width } = current.getBoundingClientRect();

            current.scroll({
                behavior: "smooth",
                left: index * width,
            });
        }
    }, [containerRef, index]);

    useEffect(() => {
        
    }, [containerRef])

    return (
        <div className="carouselWrapper">
            <div className="carousel" ref={containerRef}>
                {items.map((value, index) => (
                    <div key={index} data-index={index} className="carouselItem">
                        {renderItem(value, index)}
                    </div>
                ))}
            </div>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className="absolute top-1/2 -translate-y-1/2 left-2"
                onPress={onBackPress}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className="absolute top-1/2 -translate-y-1/2 right-2"
                onPress={onNextPress}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>
        </div>
    );
}

export default Carousel;
