import { useState } from "react";
import OpenFilterButton from "./OpenFilterModalButton";
import FilterModal from "./FilterModal";
import { useFilterParams } from "../../hooks";
import { useAppSelector } from "@/core/hooks";

function Filter() {
    const [isFilterOpen, setFilterOpen] = useState<boolean>();
    const filter = useAppSelector(state => state.filter)
    const setFilterParams = useFilterParams();

    const onOpenFilterButtonPress = () => {
        setFilterOpen(true);
    };

    const onModalDismiss = () => {
        setFilterOpen(false)
    }

    const onModalClearValue = () => {
        setFilterParams({})
    }
 
    const onModalSave = () =>{
        setFilterParams(filter)
        setFilterOpen(false)
    }

    return (
        <>
            <OpenFilterButton
                onPress={onOpenFilterButtonPress}
            />
            <FilterModal 
                isOpen={isFilterOpen}
                onDismiss={onModalDismiss}
                onSave={onModalSave}
                onClear={onModalClearValue}
            />
        </>
    );
}

export default Filter;
