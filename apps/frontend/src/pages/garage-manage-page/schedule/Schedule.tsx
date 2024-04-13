import { useMemo, useState } from "react";

import { isTwoDateSame } from "@/utils";
import { ScheduleCalendar, SlotManipulation } from "./ui";
import useSWR from "swr";
import { getScheduleSlot } from "@/api";
import { useParams } from "react-router-dom";

function Schedule() {
    const { garageId } = useParams();
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear(),
    );
    const [selectedMonth, setSelectedMonth] = useState<number>(
        new Date().getMonth() + 1,
    );
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const queryParams = useMemo(() => {
        return {
            startTime: new Date(selectedYear, selectedMonth - 1, 1).getTime(),
            endTime: new Date(selectedYear, selectedMonth, 0).getTime(),
        };
    }, [selectedYear, selectedMonth]);
    const {
        isLoading: calendarLoading,
        data: calendarData,
        mutate: refechCalendar,
    } = useSWR("calendar", () => getScheduleSlot(garageId, queryParams));

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
