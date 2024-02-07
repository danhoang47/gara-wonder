import { Slider } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/filter/filter.slice";

export default function PriceRangeFilterSection() {
    const priceRange = useAppSelector((state) => state.filter.priceRange)
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Ratings"
            description="This is not include tax and other fees"
        >
            <Slider
                step={1}
                minValue={0}
                maxValue={1000}
                defaultValue={[
                    priceRange?.from || 0,
                    priceRange?.to || 1000,
                ]}
                formatOptions={{
                    style: "currency",
                    currency: "USD",
                }}
                className="max-w px-12"
                classNames={{
                    filler: "bg-black",
                    track: "h-1",
                    thumb: "w-8 h-8 bg-white after:hidden",
                }}
                onChangeEnd={(values) => {
                    if (Array.isArray(values)) {
                        dispatch(setFilterValue({
                            key: "priceRange",
                            value: {
                                from: values[0],
                                to: values[1],
                            }
                        }))
                    }
                }}
                aria-label="Price range slider"
            />
        </FilterSection>
    )
}