export const formatCurrency = (number: number) => {
    return Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        localeMatcher: "best fit",
        notation: "compact",
    }).format(number);
};
