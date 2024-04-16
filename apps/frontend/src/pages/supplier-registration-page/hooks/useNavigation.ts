import { useMemo, useState } from "react";
import { RegistrationSection } from "../SupplierRegistrationPage";
import { useSupplierRegistrationContext } from ".";
import { SupplierRegistration } from "@/core/types";

export default function useNavigation(
    onEnd: (garage: SupplierRegistration) => void,
) {
    const [currentSectionIndex, setCurrentSectionIndex] =
        useState<RegistrationSection>(RegistrationSection.BasicInformation);
    const [byPassedSectionIndexes, setPyPassedSectionIndexes] = useState<
        RegistrationSection[]
    >([]);
    const { supplierRegistrationState, supplierRegistrationErrors } =
        useSupplierRegistrationContext();
    const allowContinue = useMemo(() => {
        const hasAnyErrors =
            Object.keys(supplierRegistrationErrors).length !== 0;
        if (
            hasAnyErrors &&
            byPassedSectionIndexes.includes(currentSectionIndex)
        ) {
            return true;
        }

        return !hasAnyErrors;
    }, [
        supplierRegistrationErrors,
        byPassedSectionIndexes,
        currentSectionIndex,
    ]);

    const onBackButtonClicked = () => {
        if (currentSectionIndex !== RegistrationSection.BasicInformation) {
            setCurrentSectionIndex((prev) => prev - 1);
        }
    };

    const onNextButtonClicked = () => {
        const nextSectionIndex = currentSectionIndex + 1;

        if (currentSectionIndex === RegistrationSection.Additional) {
            onEnd(supplierRegistrationState as SupplierRegistration);
        }
        if (currentSectionIndex !== RegistrationSection.Additional) {
            setCurrentSectionIndex(nextSectionIndex);
            setPyPassedSectionIndexes((prev) => [...prev, currentSectionIndex]);
        }
    };

    return {
        currentSectionIndex,
        allowContinue,
        onBackButtonClicked,
        onNextButtonClicked,
    };
}
