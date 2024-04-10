
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import { getBrands } from "@/api";


export default function BrandFilterSection() {
    const brands = useAppSelector((state) => state.filter.brands)
    const { data: supportedBrands } = useSWR("brands", getBrands)
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Hãng xe được hỗ trợ"
            description="Chọn vào một hay nhiều hãng xe bạn muốn tìm kiếm"
            classNames={{
                contentWrapper: "grid grid-cols-3 gap-2"
            }}
        >
            {supportedBrands?.map((brand) => (
                <Button
                    key={brand._id}
                    variant="bordered"
                    radius="md"
                    className={clsx(
                        "py-8",
                        brands?.includes(brand._id) &&
                        "border-black",
                    )}
                    disableAnimation
                    onPress={() => {
                        if (
                            brands &&
                            brands.includes(brand._id)
                        ) {
                            dispatch(setFilterValue({
                                key: "brands",
                                value: brands.filter(
                                    (b) => b !== brand._id,
                                ),
                            }));
                            return;
                        }

                        dispatch(setFilterValue({
                            key: "brands",
                            value: [...(brands || []), brand._id],
                        }));
                    }}
                >
                    <span className="font-medium text-medium">
                        {brand.name}
                    </span>
                </Button>
            ))}
        </FilterSection>
    )
}