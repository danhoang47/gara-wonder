import { useMemo, useState } from "react";
import { RegistrationSection } from "../GarageRegistrationPage";
import { useGarageRegistrationContext } from ".";

export default function useNavigation() {
    const [currentSectionIndex, setCurrentSectionIndex] =
        useState<RegistrationSection>(RegistrationSection.BasicInformation);
    const [byPassedSectionIndexes, setPyPassedSectionIndexes] = useState<RegistrationSection[]>([])
    const { garageRegistrationState, garageRegistrationErrors } = useGarageRegistrationContext()
    const allowContinue = useMemo(() => {
        const hasAnyErrors = Object.keys(garageRegistrationErrors).length !== 0;
        if (hasAnyErrors && byPassedSectionIndexes.includes(currentSectionIndex)) {
            return true
        }

        return !hasAnyErrors
    }, [garageRegistrationErrors, byPassedSectionIndexes, currentSectionIndex])

    const onBackButtonClicked = () => {
        if (currentSectionIndex !== RegistrationSection.BasicInformation) {
            setCurrentSectionIndex((prev) => prev - 1);
        }
    };

    const onNextButtonClicked = () => {
        const nextSectionIndex = currentSectionIndex + 1

        if (currentSectionIndex === RegistrationSection.Additional) {
            console.log(garageRegistrationState)
        }
        if (currentSectionIndex !== RegistrationSection.Additional) {
            setCurrentSectionIndex(nextSectionIndex);
            setPyPassedSectionIndexes(prev => [...prev, currentSectionIndex])
        }
    };

    return { currentSectionIndex, allowContinue, onBackButtonClicked, onNextButtonClicked };
}
