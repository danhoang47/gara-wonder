import { RegistrationSection } from "../../GarageRegistrationPage";

export type ProgressBarProps = {
    currentSectionIndex: RegistrationSection;
};

function ProgressBar({ currentSectionIndex }: ProgressBarProps) {
    return (
        <div
            className={`absolute bottom-0 w-full origin-left h-[3px] bg-primary transition-transform -mx-10 rounded-l-full`}
            role="progressbar"
            aria-label="Thanh trạng thái hoàn thành"
            style={{
                transform: `scaleX(${
                    (currentSectionIndex + 1) *
                    (1 /
                        Math.round(Object.keys(RegistrationSection).length / 2))
                })`,
            }}
        />
    );
}

export default ProgressBar;
