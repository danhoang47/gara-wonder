import { useState } from "react";
import OpenFilterButton from "./OpenFilterModalButton";
import FilterModal from "./FilterModal";
import { useFilterParams } from "../../hooks";
import { GarageFilter } from "@/core/types";

function Filter() {
    const [isFilterOpen, setFilterOpen] = useState<boolean>();
    const [filterParams, setFilterParams] = useFilterParams();

    const onOpenFilterButtonPress = () => {
        setFilterOpen(true);
    };

    const onModalDismiss = () => {
        setFilterOpen(false)
    }

    const onModalSave = (filters: GarageFilter) =>{
        setFilterParams(filters)
        setFilterOpen(false)
    }

    console.log(filterParams);
    return (
        <>
            <OpenFilterButton
                onPress={onOpenFilterButtonPress}
            />
            <FilterModal 
                filterParams={filterParams}
                isOpen={isFilterOpen}
                onDismiss={onModalDismiss}
                onSave={onModalSave}
            />
        </>
    );
}

export default Filter;
