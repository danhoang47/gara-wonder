import { isTwoDateSame } from "@/utils";
import { ScheduleCalendar, SlotManipulation } from "./ui";
import { useContext, useEffect, useState } from "react";
import { mutate } from "swr";
import { getScheduleSlot } from "@/api";
import { useParams } from "react-router-dom";
import { LoadingContext } from "@/core/contexts/loading";
import useSWRImmutable from "swr/immutable";
import moment from "moment";
import { ScheduleType } from "@/api/garages/getScheduleSlot";
function Schedule() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const { garageId } = useParams();
    const { load, unload } = useContext(LoadingContext);
    const [calendarData, setCalendarData] = useState<ScheduleType>({});
    const [year, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());

    const queryParams = () => {
        return {
            startTime: moment()
                .year(year)
                .month(month)
                .clone()
                .startOf("month")
                .day(0)
                .toDate()
                .getTime(),
            endTime: moment()
                .year(year)
                .month(month)
                .endOf("month")
                .endOf("day")
                .day(6)
                .toDate()
                .getTime(),
        };
    };
    const { isLoading: calendarLoading, data: calendar } = useSWRImmutable(
        "calendar",
        () => getScheduleSlot(garageId, queryParams()),
    );

    useEffect(() => {
        if (calendar) {
            setTimeout(() => unload("schedule"), 1000);
        }
        load("schedule");
    }, [calendarLoading]);
    useEffect(() => {
        setCalendarData({ ...calendarData, ...calendar });
    }, [calendar]);

    useEffect(() => {
        mutate("calendar");
    }, [month, year]);

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
    const onRemoveAll = () => {
        setSelectedDates([]);
    };

    return (
        <div className="flex h-full">
            <div className="grow h-full overflow-auto flex flex-col">
                <ScheduleCalendar
                    calendarData={calendarData}
                    month={month}
                    year={year}
                    setMonth={(month: number) => setMonth(month)}
                    setYear={(year: number) => setSelectedYear(year)}
                    onDateSelected={onDateSelected}
                    selectedDates={selectedDates}
                />
            </div>
            <SlotManipulation
                selectedDates={selectedDates}
                calendarData={calendarData}
                onRemoveDate={onDateSelected}
                onRemoveAll={onRemoveAll}
            />
        </div>
    );
}

export default Schedule;
