import { useState } from "react";

import { isTwoDateSame } from "@/utils";
import { ScheduleCalendar, SlotManipulation } from "./ui";
import useSWR from "swr";
import { getScheduleSlot } from "@/api";
import { useParams } from "react-router-dom";

function Schedule() {
    const { garageId } = useParams();
    const [selectedYear, setSelectedYear] = useState<string | number>(
        new Date().getFullYear(),
    );
    const [selectedMonth, setSelectedMonth] = useState<string | number>(
        new Date().getMonth(),
    );
    const {
        isLoading: calendarLoading,
        data: calendarData,
        mutate: refechCalendar,
    } = useSWR("calendar", () =>
        getScheduleSlot(garageId, selectedMonth, selectedYear),
    );
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
