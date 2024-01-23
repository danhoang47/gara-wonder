import { useState } from "react";

import { RegistrationSection } from "../GarageRegistrationPage";
import { FieldErrors } from "react-hook-form";
import { Garage } from "@/core/types";

export default function useNavigation(errors: FieldErrors<Garage>) {
    const [currentSectionIndex, setCurrentSectionIndex] =
        useState<RegistrationSection>(RegistrationSection.BasicInformation);
    const [hasNextButtonPressed, setNextButtonPressed] = useState<boolean>(false)

    const onBackButtonClicked = () => {
        if (currentSectionIndex !== RegistrationSection.BasicInformation) {
            setCurrentSectionIndex((prev) => prev - 1);
        }
    };

    const onNextButtonClicked = () => {
        if (!hasNextButtonPressed) {
            setNextButtonPressed(true)
        }

        if (
            currentSectionIndex !== RegistrationSection.Additional &&
            Object.keys(errors).length === 0 &&
            hasNextButtonPressed
        ) {
            setCurrentSectionIndex((prev) => prev + 1);
            setNextButtonPressed(false)
        }
    };

    return { currentSectionIndex, onBackButtonClicked, onNextButtonClicked };
}
