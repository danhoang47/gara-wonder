import { RegistrationSection } from "../../GarageRegistrationPage";

export type ProgressBarProps = {
    currentSectionIndex: RegistrationSection;
};

function ProgressBar({ currentSectionIndex }: ProgressBarProps) {
    return (
        <div
            className={`absolute bottom-0 w-full origin-left h-1 bg-primary transition-transform`}
            role="progressbar"
            style={{
                transform: `scaleX(${currentSectionIndex * 0.2})`
            }}
        />
    );
}

export default ProgressBar;
