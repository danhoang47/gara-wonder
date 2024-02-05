const services = [
    {
        id: 1,
        title: "Washing",
    },
    {
        id: 2,
        title: "Repair",
    },
    {
        id: 3,
        title: "Exterior",
    },
];

const brands = [
    {
        id: 0,
        key: "all",
        title: "Select All",
    },
    {
        id: 1,
        key: "1",
        title: "Mercedes",
    },
    {
        id: 2,
        key: "2",
        title: "BMW",
    },
];

export const getBrandNamesByIds = (brandIds: Array<string> | "all" | undefined): string => {
    if (!brandIds) {
        return "None"
    }
    if (brandIds === "all") {
        return "All Brands";
    } else {
        return brandIds
            .map((brandId) => brands.find(({ key }) => brandId === key)?.title)
            .join(", ");
    }
};

export const getServiceNameById = (serviceId: string | undefined): string => {
    return serviceId && services.find(({ id }) => serviceId === String(id))?.title || "";
};

export { services, brands };
