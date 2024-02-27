import { Checkbox, CheckboxGroup } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import FilterSection from "./FilterSection";
import { setFilterValue } from "@/features/garage-filter/filter.slice";
import additionalServices from './constants'

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
                    dispatch(
                        setFilterValue({
                            key: "additional",
                            value: data
                        }),
                    );
                }}
                value={additional}
            >
                {
                    additionalServices.map(({ id, text }) => (
                        <Checkbox key={id} value={id}>{text}</Checkbox>
                    ))
                }
            </CheckboxGroup>
        </FilterSection>
    );
}
