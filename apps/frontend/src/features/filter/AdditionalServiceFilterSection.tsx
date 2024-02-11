import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/filter/filter.slice";
import { GarageFilter } from "@/core/types";

export default function AdditionalServiceFilterSection() {
    const additional = useAppSelector((state) => state.filter.additional);
    const dispatch = useAppDispatch();

    return (
        <FilterSection
            title="Additional Services"
            description="This is not include tax and other fees"
        >
            <CheckboxGroup
                onValueChange={(data) => {
                    const hasCafe = data.some((v) => v === "hasCafe");
                    const hasSmokingArea = data.some(
                        (v) => v === "hasSmokingArea",
                    );

                    dispatch(
                        setFilterValue({
                            key: "additional",
                            value: {
                                hasCafe,
                                hasSmokingArea,
                            },
                        }),
                    );
                }}
                value={Object.keys(additional || {}).filter(
                    (key) =>
                        additional?.[key as keyof GarageFilter["additional"]],
                )}
            >
                <Checkbox value={"hasCafe"}>Has Cafe to waiting</Checkbox>
                <Checkbox value={"hasSmokingArea"}>Has smoking area</Checkbox>
            </CheckboxGroup>
        </FilterSection>
    );
}
