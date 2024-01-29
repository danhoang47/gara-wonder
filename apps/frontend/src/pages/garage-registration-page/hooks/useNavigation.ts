import { useState } from "react";

import { RegistrationSection } from "../GarageRegistrationPage";

export default function useNavigation() {
    const [currentSectionIndex, setCurrentSectionIndex] =
        useState<RegistrationSection>(RegistrationSection.Services);
    
    const onBackButtonClicked = () => {
        if (currentSectionIndex !== RegistrationSection.BasicInformation) {
            setCurrentSectionIndex((prev) => prev - 1);
        }
    };

    const onNextButtonClicked = () => {
        if (currentSectionIndex !== RegistrationSection.Additional) {
            setCurrentSectionIndex((prev) => prev + 1);
        }
    };

    return { currentSectionIndex, onBackButtonClicked, onNextButtonClicked };
}
