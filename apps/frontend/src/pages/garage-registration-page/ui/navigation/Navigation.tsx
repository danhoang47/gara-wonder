import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { RegistrationSection } from "../../GarageRegistrationPage";
import ProgressBar from "../progress-bar";

export type NavigationProps = {
    currentSectionIndex: RegistrationSection;
    onNextButtonClicked: () => void;
    onBackButtonClicked: () => void;
};

export default function Navigation({
    currentSectionIndex,
    onBackButtonClicked,
    onNextButtonClicked,
}: NavigationProps) {
    const getSectionTitle = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return "Basic Information";
            case RegistrationSection.Additional:
                return "Additional";
            case RegistrationSection.Address:
                return "Address";
            case RegistrationSection.Images:
                return "Images";
            case RegistrationSection.Services:
                return "Services";
            default:
                throw new Error("Invalid RegistrationSection");
        }
    };
    const isBackButtonDisabled =
        currentSectionIndex === RegistrationSection.BasicInformation;
    const nextButtonLabel =
        currentSectionIndex !== RegistrationSection.Additional
            ? "Continue"
            : "Finish";

    return (
        <div
            className="fixed bottom-0 w-full py-4"
            style={{
                boxShadow: "0px -4px 10px 2px rgba(202, 202, 202, 0.26)",
            }}
        >
            <div className="flex justify-between container items-center mx-auto ">
                <Button
                    startContent={<FontAwesomeIcon icon={faAngleLeft} />}
                    variant="bordered"
                    className="px-8"
                    onPress={onBackButtonClicked}
                    isDisabled={isBackButtonDisabled}
                >
                    Back
                </Button>
                <div>
                    <span className="text-lg select-none">{`${
                        currentSectionIndex + 1
                    }. ${getSectionTitle()}`}</span>
                </div>
                <Button
                    endContent={<FontAwesomeIcon icon={faAngleRight} />}
                    color="primary"
                    variant="solid"
                    className="px-8"
                    onPress={onNextButtonClicked}
                    type="submit"
                >
                    {nextButtonLabel}
                </Button>
            </div>
            <ProgressBar currentSectionIndex={currentSectionIndex}/>
        </div>
    );
}