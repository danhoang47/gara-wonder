import { useState } from "react";
import OpenFilterButton from "./OpenFilterModalButton";
import FilterModal from "./FilterModal";

function Filter() {
    const [isFilterOpen, setFilterOpen] = useState<boolean>();

    const onOpenFilterButtonPress = () => {
        setFilterOpen(true);
    };

    const onModalDismiss = () => {
        setFilterOpen(false)
    }

    return (
        <>
            <OpenFilterButton
                numberOfActiveFilters={0}
                onPress={onOpenFilterButtonPress}
            />
            <FilterModal 
                isOpen={isFilterOpen}
                onDismiss={onModalDismiss}
                onSave={onModalDismiss}
            />
        </>
    );
}

export default Filter;
