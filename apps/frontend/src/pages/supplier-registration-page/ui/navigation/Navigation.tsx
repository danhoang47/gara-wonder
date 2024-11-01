import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { RegistrationSection } from "../../SupplierRegistrationPage";
import ProgressBar from "../progress-bar";

export type NavigationProps = {
    currentSectionIndex: RegistrationSection;
    allowContinue: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function Navigation({
    currentSectionIndex,
    allowContinue,
    onNext,
    onBack,
}: NavigationProps) {
    const getSectionTitle = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return "Thông tin cơ bản";
            case RegistrationSection.Address:
                return "Địa chỉ";
            case RegistrationSection.Products:
                return "Sản phẩm";
            case RegistrationSection.Additional:
                return "Bổ sung";
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
            className="fixed bottom-0 w-full py-4 bg-foreground-50 z-10"
            style={{
                boxShadow: "0px -4px 10px 2px rgba(202, 202, 202, 0.26)",
            }}
        >
            <div className="flex justify-between container items-center mx-auto ">
                <Button
                    startContent={<FontAwesomeIcon icon={faAngleLeft} />}
                    variant="bordered"
                    className="px-8"
                    onPress={onBack}
                    isDisabled={isBackButtonDisabled}
                >
                    Quay lại
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
