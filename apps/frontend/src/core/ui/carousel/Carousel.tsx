import { Button, ScrollShadow } from "@nextui-org/react";
import { useLayoutEffect, useRef, useState } from "react";

import "./Carousel.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export type CarouselProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    startIndex?: number;
    classNames?: Partial<
        Record<"wrapper" | "item" | "base" | "button", string>
    >;
    showNavigationOnHover?: boolean;
    onNavigate?: (type: "back" | "next") => void;
    enableShadow?: boolean;
};

function Carousel<T>({
    items,
    renderItem,
    startIndex = 0,
    classNames,
    onNavigate,
    enableShadow = false,
}: CarouselProps<T>) {
    const [index, setIndex] = useState<number>(startIndex);
    const [maxIndex, setMaxIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const onBackPress = () => {
        if (index !== 0) {
            setIndex(index - 1);
            onNavigate && onNavigate("back");
        }
    };

    const onNextPress = () => {
        if (index < maxIndex) {
            setIndex(index + 1);
            onNavigate && onNavigate("next");
        }
    };

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const { current } = containerRef;

        const calculateMaxIndex = () => {
            const { width } = current.getBoundingClientRect();
            const child = current.querySelector('[data-index="0"]');

            if (child) {
                const childWidth = child.getBoundingClientRect().width || width;
                const maxIndex = (childWidth * items.length) / width;

                if (Number.isNaN(maxIndex)) {
                    setMaxIndex(items.length - 1);
                } else {
                    setMaxIndex(() => {
                        return Number.isInteger(maxIndex)
                            ? maxIndex - 1
                            : Math.floor(maxIndex);
                    });
                }
            }
        };

        const observer = new ResizeObserver(calculateMaxIndex);
        observer.observe(current);

        return () => observer.unobserve(current);
    }, [containerRef, items.length]);

    useLayoutEffect(() => {
        if (containerRef.current && index !== -1) {
            const { current } = containerRef;
            const { width } = current.getBoundingClientRect();

            current.scroll({
                behavior: "smooth",
                left: index * width,
            });
        }
    }, [containerRef, index]);

    return (
        <div className={clsx("carouselWrapper", classNames?.wrapper)}>
            <ScrollShadow
                className={clsx("carousel", classNames?.base)}
                ref={containerRef}
                isEnabled={enableShadow}
                orientation="horizontal"
            >
                {items.map((value, index) => (
                    <div
                        key={index}
                        data-index={index}
                        className={clsx(
                            "h-full shrink-0 snap-center",
                            classNames?.item,
                        )}
                    >
                        {renderItem(value, index)}
                    </div>
                ))}
            </ScrollShadow>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className={clsx(
                    "absolute top-1/2 -translate-y-1/2 left-2 border cursor-pointer",
                    index === 0 && "opacity-0",
                    classNames?.button,
                )}
                onPress={onBackPress}
                isDisabled={index === 0}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className={clsx(
                    "absolute top-1/2 -translate-y-1/2 right-2 border",
                    index === maxIndex && "opacity-0",
                    classNames?.button,
                )}
                onPress={onNextPress}
                isDisabled={index === maxIndex}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>
        </div>
    );
}

export default Carousel;
