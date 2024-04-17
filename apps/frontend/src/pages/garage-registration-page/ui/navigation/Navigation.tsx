import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { RegistrationSection } from "../../GarageRegistrationPage";
import ProgressBar from "../progress-bar";

export type NavigationProps = {
    currentSectionIndex: RegistrationSection;
    allowContinue: boolean,
    onBack: () => void;
    onNext: () => void;
};

export default function Navigation({
    currentSectionIndex,
    allowContinue,
    onNext,
    onBack
}: NavigationProps) {
    const getSectionTitle = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return "Thông tin cơ bản";
            case RegistrationSection.Additional:
                return "Thông tin phụ";
            case RegistrationSection.Address:
                return "Địa chỉ";
            case RegistrationSection.Images:
                return "Ảnh nền";
            case RegistrationSection.Services:
                return "Dịch vụ";
            case RegistrationSection.Slot:
                return "Số chỗ phục vụ"
            default:
                throw new Error("Invalid RegistrationSection");
        }
    };
    const isBackButtonDisabled =
        currentSectionIndex === RegistrationSection.BasicInformation;
    const nextButtonLabel =
        currentSectionIndex !== RegistrationSection.Additional
            ? "Tiếp tục"
            : "Hoàn thành";

    return (
        <div
            className="fixed bottom-0 z-10 w-full bg-background border-t h-16 px-10"
        >
            <div className="flex justify-between container items-center mx-auto h-full">
                <Button
                    startContent={<FontAwesomeIcon icon={faAngleLeft} />}
                    variant="bordered"
                    className="px-8"
                    onPress={onBack}
                    isDisabled={isBackButtonDisabled}
                >
                    Trở lại
                </Button>
                <div>
                    <span className="text-medium select-none font-medium">{`${
                        currentSectionIndex + 1
                    }. ${getSectionTitle()}`}</span>
                </div>
                <Button
                    endContent={<FontAwesomeIcon icon={faAngleRight} />}
                    color="primary"
                    variant="solid"
                    className="px-8"
                    onClick={onNext}
                    type="submit"
                    isDisabled={!allowContinue}
                >
                    {nextButtonLabel}
                </Button>
            </div>
            <ProgressBar currentSectionIndex={currentSectionIndex} />
        </div>
    );
}
