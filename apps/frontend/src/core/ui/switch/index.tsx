import { useId } from "react";
import clsx from "clsx";

import "./Switch.styles.scss";

export type SwitchProps = {
    isSwitch?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    onSwitch?: (value: boolean) => void;
};

function Switch({ isSwitch, isDisabled, isReadOnly, onSwitch }: SwitchProps) {
    const id = useId();

    return (
        <div
            className="w-fit h-fit"
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <input
                type="checkbox"
                id={id}
                hidden
                checked={isSwitch}
                disabled={isDisabled || isReadOnly}
                onChange={(event) => {
                    onSwitch && onSwitch(event.target.checked);
                }}
            />
            <label
                htmlFor={id}
                className={clsx(
                    "switch",
                    isSwitch && "active",
                    isDisabled && "disabled",
                    isReadOnly && "readonly",
                )}
            />
        </div>
    );
}

export default Switch;
