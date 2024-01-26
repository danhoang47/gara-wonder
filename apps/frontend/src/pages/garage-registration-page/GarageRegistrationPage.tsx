import {    useNavigation } from "./hooks";

import { BasicInformation, Navigation } from "./ui";
import { useGarageRegistrationContext } from "./contexts";
import { useForm } from "@/core/hooks";

// eslint-disable-next-line react-refresh/only-export-components
export const enum RegistrationSection {
    BasicInformation = 0,
    Address,
    Services,
    Images,
    Additional,
}

export type GarageFormState = {
    name: string,
    description: string
}

const GarageRegistrationPage = () => {
    const { setGarageRegistrationStateValue } = useGarageRegistrationContext()
    const { formRef, onFormSubmit, register, onSubmitButtonPressed } = useForm<GarageFormState>();
    const { currentSectionIndex, onBackButtonClicked, onNextButtonClicked } = useNavigation();

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return (
                    <BasicInformation register={register} />
                );
            default:
                throw new Error("Invalid Section");
        }
    };

    return (
        <form
            ref={formRef}
            className="grid grid-cols-10 gap-5 px-10 mt-10 relative z-0"
            onSubmit={onFormSubmit((data) => console.log(data))}
        >
            {renderPageSection()}
            <Navigation
                currentSectionIndex={currentSectionIndex}
                onBackButtonClicked={onBackButtonClicked}
                onNextButtonClicked={onSubmitButtonPressed(onNextButtonClicked)}
            />
        </form>
    );
};

export default GarageRegistrationPage;
