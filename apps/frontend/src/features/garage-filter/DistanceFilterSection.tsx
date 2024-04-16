import { Button, ButtonGroup } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import clsx from "clsx";

const distanceRadiuses: number[] = [1, 5, 10, -1];

export default function DistanceFilterSection() {
    const distance = useAppSelector((state) => state.filter.distance);
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Khoảng cách"
            description="Bạn muốn tìm kiếm trong bán kính bao nhiêu?"
        >
            <ButtonGroup className="grow bg-white" variant="solid">
                {distanceRadiuses.map((distanceRadius) => (
                    <Button
                        key={distanceRadius}
                        className={clsx(
                            "grow h-auto py-6 bg-background border-foreground last:border-2 shadow-inner border-y-2 border-l-2  text-foreground",
                            distanceRadius === distance &&
                                "bg-foreground text-background",
                        )}
                        onPress={() => {
                            if (distanceRadius === distance) {
                                dispatch(
                                    setFilterValue({
                                        key: "distance",
                                        value: undefined,
                                    }),
                                );
                                return;
                            }

                            dispatch(
                                setFilterValue({
                                    key: "distance",
                                    value: distanceRadius,
                                }),
                            );
                        }}
                    >
                        <span className="font-semibold text-lg">
                            {distanceRadius === -1
                                ? `10 Km+`
                                : `${distanceRadius} Km`}
                        </span>
                    </Button>
                ))}
            </ButtonGroup>
        </FilterSection>
    );
}
