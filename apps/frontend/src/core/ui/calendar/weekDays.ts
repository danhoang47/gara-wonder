
export type WeekDay = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa"

const weekDays: Record<WeekDay, { long: string, short: string }> = {
    "Su": {
        long: "Chủ nhật",
        short: "CN"
    },
    "Mo": {
        long: "Thứ 2",
        short: "T2"
    },
    "Tu": {
        long: "Thứ 3",
        short: "T3"
    },
    "We": {
        long: "Thứ 4",
        short: "T4"
    },
    "Th": {
        long: "Thứ 5",
        short: "T5"
    },
    "Fr": {
        long: "Thứ 6",
        short: "T6"
    },
    "Sa": {
        long: "Thứ 7",
        short: "T7"
    },
}

export default weekDays