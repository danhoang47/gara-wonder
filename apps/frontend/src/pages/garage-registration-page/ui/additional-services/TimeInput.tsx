import clsx from "clsx";
import { useState } from "react";

export type TimeInputProps = {
    /**
     * Eg: 13:40 => 1340
     */
    value?: string;
    defaultValue?: string;
    onValueChange?: (time: number) => void;
    className?: string
};

function TimeInput({
    value = '',
    onValueChange,
    className
}: TimeInputProps) {
    const [hour, setHour] = useState<string>(value.substring(0, 2) || String(new Date().getHours()));
    const [minute, setMinute] = useState<string>(value.substring(2) || String(new Date().getMinutes()));

    return (
        <div className={clsx(className, "flex items-center")}>
            <input type="text" inputMode="numeric" value={hour} className="max-w-7 text-center outline-none"/>
            <span>:</span>
            <input type="text" inputMode="numeric" value={minute} className="max-w-7 text-center outline-none"/>
        </div>
    );
}

export default TimeInput;
