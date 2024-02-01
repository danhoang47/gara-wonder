import { useNavigation } from "./hooks";
import { Address, BasicInformation, Images, Navigation, Services } from "./ui";
import { GarageRegistrationContextProvider } from "./contexts";

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
    const { currentSectionIndex, onBackButtonClicked, onNextButtonClicked } =
        useNavigation();

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return <BasicInformation />;
            case RegistrationSection.Address:
                return <Address />;
            case RegistrationSection.Services:
                return <Services />;
            case RegistrationSection.Images:
                return <Images />;
            default:
                throw new Error("Invalid Section");
        }
    };

    return (
        <GarageRegistrationContextProvider>
            <div className="grid grid-cols-10 gap-5 px-10 mt-10 relative z-0">
                {renderPageSection()}
                <Navigation
                    currentSectionIndex={currentSectionIndex}
                    onBack={onBackButtonClicked}
                    onNext={onNextButtonClicked}
                />
            </div>
        </GarageRegistrationContextProvider>
    );
};

export default GarageRegistrationPage;
