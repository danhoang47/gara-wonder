import clsx from "clsx";
import { useState } from "react";

export type TimeInputProps = {
    value?: number;
    onValueChange?: (time: number) => void;
    className?: string
};

function TimeInput({
    value = new Date().getTime(),
    onValueChange,
    className
}: TimeInputProps) {
    const [hour, setHour] = useState<number>();
    const [minute, setMinute] = useState<number>();

    return (
        <div className={clsx(className, "flex")}>
            <input type="text" inputMode="numeric" value={hour} />
            <span>:</span>
            <input type="text" inputMode="numeric" value={minute} />
        </div>
    );
}

export default TimeInput;
