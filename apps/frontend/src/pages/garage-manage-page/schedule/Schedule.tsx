import { useState } from "react";

import { isTwoDateSame } from "@/utils";
import { ScheduleCalendar, SlotManipulation } from "./ui";

function Schedule() {
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const checkIfDateSelected = (date: Date) => {
        return selectedDates.some((selectedDate: Date) =>
            isTwoDateSame(selectedDate, date),
        );
    };

    const onDateSelected = (date: Date) => {
        if (checkIfDateSelected(date)) {
            setSelectedDates(
                selectedDates.filter(
                    (selectedDate) => !isTwoDateSame(selectedDate, date),
                ),
            );
        } else {
            setSelectedDates((prev) => [...prev, date]);
        }
    };

    return (
        <div className="flex h-full">
            <div className="grow h-full overflow-auto flex flex-col">
                <ScheduleCalendar 
                    month={month}
                    year={year}
                    onDateSelected={onDateSelected}
                    selectedDates={selectedDates}
                />
            </div>
            <SlotManipulation 
                selectedDates={selectedDates}
                onRemoveDate={onDateSelected} 
            />
        </div>
    );
}

export default Schedule;
