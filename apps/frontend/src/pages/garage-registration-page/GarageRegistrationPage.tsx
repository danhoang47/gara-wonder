import { useNavigation } from "./hooks";

import { Address, BasicInformation, Navigation, Services } from "./ui";
import {
    GarageRegistrationContextProvider,
} from "./contexts";
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
    name: string;
    description: string;
    street: string;
    district: string;
    province: string;
};

const GarageRegistrationPage = () => {
    const { formRef, onFormSubmit, register, onSubmitButtonPressed } =
        useForm<GarageFormState>();
    const { currentSectionIndex, onBackButtonClicked, onNextButtonClicked } =
        useNavigation();

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return <BasicInformation register={register} />;
            case RegistrationSection.Address: 
                return <Address register={register} />
            case RegistrationSection.Services: 
                return <Services />
            default:
                throw new Error("Invalid Section");
        }
    };

    return (
        <GarageRegistrationContextProvider>
            <form
                ref={formRef}
                className="grid grid-cols-10 gap-5 px-10 mt-10 relative z-0"
                onSubmit={onFormSubmit((data) => console.log(data))}
            >
                {renderPageSection()}
                <Navigation
                    currentSectionIndex={currentSectionIndex}
                    onBackButtonClicked={onBackButtonClicked}
                    onNextButtonClicked={onSubmitButtonPressed(
                        onNextButtonClicked,
                    )}
                />
            </form>
        </GarageRegistrationContextProvider>
    );
};

export default GarageRegistrationPage;
