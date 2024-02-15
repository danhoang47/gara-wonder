
import { Button } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import clsx from "clsx";

const supportedBrands = [
    "Mercedes",
    "BMW",
    "Porsche",
    "Toyota",
    "Honda",
    "Lexus",
];

export default function BrandFilterSection() {
    const brands = useAppSelector((state) => state.filter.brands)
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Supported Brands"
            description="This is not include tax and other fees"
            classNames={{
                contentWrapper: "grid grid-cols-3 gap-2"
            }}
        >
            {supportedBrands.map((brand) => (
                <Button
                    key={brand}
                    variant="bordered"
                    radius="md"
                    className={clsx(
                        "py-8",
                        brands?.includes(brand) &&
                        "border-black",
                    )}
                    disableAnimation
                    onPress={() => {
                        if (
                            brands &&
                            brands.includes(brand)
                        ) {
                            dispatch(setFilterValue({
                                key: "brands",
                                value: brands.filter(
                                    (b) => b !== brand,
                                ),
                            }));
                            return;
                        }

                        dispatch(setFilterValue({
                            key: "brands",
                            value: [...(brands || []), brand],
                        }));
                    }}
                >
                    <span className="font-medium text-medium">
                        {brand}
                    </span>
                </Button>
            ))}
        </FilterSection>
    )
}