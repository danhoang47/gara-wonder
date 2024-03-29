import {  useMemo } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx'

export type StepperProps = {
    value?: number,
    defaultValue?: number,
    onChange?: (value: number) => void,
    max?: number,
    min?: number,
    disabled?: boolean,
    classNames?: Partial<Record<"wrapper" | "button" | "text", string>>,
    allowKeyboard?: boolean,
    size?: "sm" | "md" | "lg",
    step?: number,
}

type ButtonProps = React.ComponentProps<typeof Button>

function Stepper({
    value,
    defaultValue,
    onChange = () => {},
    max = Number.MAX_SAFE_INTEGER,
    min = 0,
    disabled = false,
    classNames,
    allowKeyboard = false,
    size = "sm",
    step = 1
}: StepperProps) {
    const buttonProps: ButtonProps = useMemo(() => ({
        isIconOnly: true,
        radius: "full",
        variant: "bordered",
        className: clsx(classNames?.button, "border"),
        size: size
    }), [classNames?.button, size])

    const onStepBack = () => {
        const currentValue = value || defaultValue || 1;
        const nextValue = currentValue - step
        onChange(nextValue < min ? min : nextValue)
    }

    const onStepNext = () => {
        const currentValue = value || defaultValue || 0;
        const nextValue = currentValue + step
        onChange(nextValue > max ? max : nextValue)
    }

    return (
        <div className="flex gap-2 items-center">
            <Button {...buttonProps} onPress={onStepBack} isDisabled={disabled || value === min}>
                <FontAwesomeIcon icon={faMinus}/>
            </Button>
            <div className={classNames?.text}>
                <p contentEditable={disabled && allowKeyboard} className={clsx("outline-none text-center")}>{value || defaultValue}</p>
            </div>
            <Button {...buttonProps} onPress={onStepNext} isDisabled={disabled || value === max}>
                <FontAwesomeIcon icon={faPlus}/>
            </Button>
        </div>
    )
}

export default Stepper;