import clsx from "clsx";
import { useEffect, useState } from "react";

export type TimeInputProps = {
    /**
     * Eg: 13:40 => 1340
     */
    value?: string;
    defaultValue?: string;
    onValueChange: (time: string) => void;
    className?: string;
    clockBase?: 12 | 24
};

function TimeInput({ value = "", onValueChange, className }: TimeInputProps) {
    const [hour, setHour] = useState<string>(
        value.substring(0, 2) || String(new Date().getHours()),
    );
    const [minute, setMinute] = useState<string>(
        value.substring(2) || String(new Date().getMinutes()),
    );

    const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; 
        const newTime = value.substring(value.length - 2);
        const type = e.target.getAttribute("data-type") as "hour" | "minute"

        if (!value.match(/^[0-9]+$/) || !type) return

        if (type === "hour") {
            if (Number.parseInt(newTime) > 24) return;
            
            setHour(newTime.length === 1 ? `0${newTime}` : newTime)
        }
        if (type === "minute") {
            
            if (Number.parseInt(newTime) > 60) return;

            setMinute(newTime.length === 1 ? `0${newTime}` : newTime)
        }
    }

    useEffect(() => {
        onValueChange(hour + minute)
    }, [hour, minute])

    return (
        <div className={clsx(className, "flex items-center")}>
            <input
                type="text"
                inputMode="numeric"
                value={hour}
                className="max-w-7 text-center outline-none"
                onChange={onTimeChange}
                data-type="hour"
            />
            <span>:</span>
            <input
                type="text"
                inputMode="numeric"
                value={minute}
                className="max-w-7 text-center outline-none"
                onChange={onTimeChange}
                data-type="minute"
            />
        </div>
    );
}

export default TimeInput;
