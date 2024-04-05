export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("vi", { currency: "VND" }).format(number);
};
