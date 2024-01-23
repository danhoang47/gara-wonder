import { useGarageForm, useNavigation } from "./hooks";

import { BasicInformation } from "@/core/ui";
import { Navigation } from "./ui";

// eslint-disable-next-line react-refresh/only-export-components
export const enum RegistrationSection {
    BasicInformation = 0,
    Address,
    Services,
    Images,
    Additional,
}

const GarageRegistrationPage = () => {
    const { register, errors, onGarageFormSectionSubmit, control } =
        useGarageForm();
    const { currentSectionIndex, onBackButtonClicked, onNextButtonClicked } =
        useNavigation(errors);

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return (
                    <BasicInformation
                        register={register}
                        errors={errors}
                        control={control}
                    />
                );
            default:
                throw new Error("Invalid Section");
        }
    };

    return (
        <form
            className="grid grid-cols-10 gap-5 px-10 mt-10 relative z-0"
            onSubmit={onGarageFormSectionSubmit}
        >
            {renderPageSection()}
            <Navigation
                isNextButtonDisabled={Object.keys(errors).length !== 0}
                currentSectionIndex={currentSectionIndex}
                onBackButtonClicked={onBackButtonClicked}
                onNextButtonClicked={onNextButtonClicked}
            />
        </form>
    );
};

export default GarageRegistrationPage;
