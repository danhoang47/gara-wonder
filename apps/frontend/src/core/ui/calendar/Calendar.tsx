import { useMemo, useState } from "react";
import moment from "moment";

const NUMBER_OF_CELL = 35;
const NUMBER_OF_COLUMN = 7;
const MAX_MONTH = 11;
const MIN_MONTH = 0;

const columns = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type CalendarProps = {
  defaultYear?: number;
  defaultMonth?: number;
  disabledDates?: Date[];
  renderDate?: (date: Date, isPastDate: boolean) => React.ReactNode;
  disablePastDates?: boolean;
  renderHeader?: (date: Date) => React.ReactNode;
  renderNavigation?: (
    onBack: () => void,
    onNext: () => void
  ) => React.ReactNode;
  selectionMode?: "multiple" | "single" | "none";
  classNames?: Partial<Record<"wrapper" | "dateWrapper" | "dateCell" | "row" | "headerCell", string>>;
  onDateClick?: (dates: Date) => void;
};

const checkIfPastDate = (date: Date, month: number) => {
  return moment().month(month).isSame(date)
}

const Calendar = ({
  defaultYear = new Date().getFullYear(),
  defaultMonth = new Date().getMonth(),
  disabledDates = [],
  disablePastDates = true, // done
  classNames,
  renderDate,
  renderHeader,
  renderNavigation,
  selectionMode = "none",
  onDateClick,
}: CalendarProps) => {
  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth);

  const thisMonth = useMemo(() => moment().year(year)
  .month(month), [year, month])

  const rows = useMemo(() => {
    const firstSunday = moment()
      thisMonth
      .startOf("month")
      .day(0);
    // console.log(firstSunday.toDate())
    const dateOfMonth = firstSunday.toDate().getDate();
    const datesInMonth: Date[] = Array.from(new Array(NUMBER_OF_CELL)).map(
      (_, index) => {
        const date = firstSunday.clone().toDate();
        date.setDate(index + dateOfMonth);
        return date;
      }
    );
    return datesInMonth.reduce<Date[][]>((acc, _, index) => {
      if ((index + 1) % NUMBER_OF_COLUMN === 0) {
        return [...acc, datesInMonth.slice(index - 6, index + 1)];
      }

      return acc;
    }, []);
  }, [thisMonth]);

  const onNext = () => {
    if (month !== MAX_MONTH) {
      setMonth(month + 1)
      return;
    } else {
      setYear(year + 1)
      setMonth(MIN_MONTH)
    }
  }

  const onBack = () => {
    if (month !== MIN_MONTH) {
      setMonth(month - 1)
      return;
    } else {
      setYear(year - 1)
      setMonth(MAX_MONTH)
    }
  }

  return (
    <div className="w-full">
      <div>
        {renderHeader ? (
          renderHeader(thisMonth.toDate())
        ) : (
          <p className="text-center">
            {thisMonth.format("YYYY/MM")}
          </p>
        )}
        {renderNavigation && renderNavigation(onBack, onNext)}
      </div>
      <div className="flex flex-row">
        {columns.map((column) => (
          <div key={column} className="basis-[calc(100%/7)] py-2">
            <p className="text-center">{column}</p>
          </div>
        ))}
      </div>
      <div className="">
        {rows.map((row, index) => (
          <div className="flex" key={index}>
            {row.map((date) =>
              renderDate ? (
                renderDate(date, disablePastDates && checkIfPastDate(date, month))
              ) : (
                <div
                  key={date.getTime()}
                  className="basis-[calc(100%/7)] square w-full after:pb-[100%] after:block"
                  onClick={() => {
                    if (disablePastDates && checkIfPastDate(date, month)) {
                        return
                    }
                    if (disabledDates.some(_date => moment(_date).isSame(date))) {
                      return
                    }

                    onDateClick && onDateClick(date)
                  }}
                >
                  <div className="absolute inset-0 text-center flex items-center justify-center">
                    <p className="">{date.getDate()}</p>
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;