export const formatCurrency = (
    number: number,
    notation:
        | "standard"
        | "scientific"
        | "engineering"
        | "compact"
        | undefined = "compact",
) => {
    return Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        localeMatcher: "best fit",
        notation,
    }).format(number);
};
