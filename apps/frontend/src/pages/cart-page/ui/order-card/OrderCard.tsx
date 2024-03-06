import { memo, useMemo } from "react";
import { Order } from "@/core/types";
import useSWRImmutable from "swr/immutable";
import { getBasicGarageInfo, getBrands, getGarageServices } from "@/api";
import { Button, Card, Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export type OrderCardProps = {
    order: Order;
};

// eslint-disable-next-line react-refresh/only-export-components
function OrderCard({ order }: OrderCardProps) {
    const navigate = useNavigate();
    const { car, garageId, serviceIds } = order;
    const { data: garages, isLoading: isGarageLoading } = useSWRImmutable(
        garageId,
        getBasicGarageInfo,
    );
    const { data: services, isLoading: isServicesLoading } = useSWRImmutable(
        `service/${garageId}`,
        getGarageServices,
    );
    const { data: brands, isLoading: isBrandsLoading } = useSWRImmutable(
        `brands`,
        getBrands,
    );

    const garage = garages?.data[0];
    const selectedServices = useMemo(() => {
        if (!services) return [];

        return services.data.filter(
            ({ _id }) => _id && serviceIds.includes(_id),
        );
    }, [serviceIds, services]);
    const selectedBrand = useMemo(() => {
        if (!brands) return undefined;

        return brands.find(({ _id }) => _id === car.brandId);
    }, [brands, car]);

    if (isGarageLoading || isServicesLoading || isBrandsLoading) {
        return (
            <Card className="gap-2 rounded-none shadow-none flex-row">
                <Skeleton className="rounded-lg w-32 h-32">
                    <div className="bg-default-300" />
                </Skeleton>
                <div className="flex flex-col justify-center gap-2">
                    <Skeleton className="w-40 h-4 bg-default-300 rounded-full" />
                    <Skeleton className="w-32 h-4 bg-default-300 rounded-full" />
                    <Skeleton className="w-20 h-4 bg-default-300 rounded-full" />
                </div>
            </Card>
        );
    }

    return (
        <div className="flex gap-4 items-center">
            <div className="w-32 h-32">
                <img
                    className="object-cover h-full w-full rounded-lg"
                    src={garage?.backgroundImage.url}
                />
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-large font-medium">
                    {selectedServices
                        .map(({ category }) => category.name)
                        .join(", ")}
                </p>
                <p>{garage?.name}</p>
                <p>{`${selectedBrand?.name} ${car.model} ${car.releaseYear}`}</p>
            </div>
            <Button
                variant="bordered"
                className="ml-auto mr-4 border"
                radius="full"
                onPress={() => {
                    navigate("/book?type=edit", {
                        state: order,
                    });
                }}
            >
                Edit
            </Button>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(OrderCard);
