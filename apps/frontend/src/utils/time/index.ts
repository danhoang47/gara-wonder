import moment from "moment";

export const isTwoDateSame = (
    first?: Date | moment.Moment,
    second?: Date | moment.Moment,
) => {
    if (!first && !second) return false;
    return moment(first).isSame(second);
};

export const isInRange = (
    date?: Date | moment.Moment,
    lower?: Date | moment.Moment,
    upper?: Date | moment.Moment,
) => {
    if (!date && !lower && !upper) return false;
    return moment(date).isBetween(lower, upper);
};

export const isBefore = (date?: Date, before?: Date) => {
    return moment(date).isBefore(before);
};

export const isAfter = (date?: Date, after?: Date) => {
    return moment(date).isAfter(after);
};
