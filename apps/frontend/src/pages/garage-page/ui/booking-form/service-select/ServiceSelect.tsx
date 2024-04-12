import { Select, SelectItem } from "@nextui-org/react";
import useSWRImmutable from "swr/immutable";

import useOrderContext from "@/pages/garage-page/hooks/useOrderContext";
import { getGarageServices } from "@/api";
import { useEffect, useMemo } from "react";

export default function ServiceSelect() {
    const { order, setOrderValue } = useOrderContext();
    const { isLoading: isServicesLoading, data: services } = useSWRImmutable(
        `service/${order.garageId}`,
        getGarageServices,
    );
    const renderedServices = useMemo(() => {
        const { car } = order;

        return car
            ? services?.data.filter((service) => {
                  if (service.brandIds === "all") {
                      return true;
                  }
                  return service.brandIds?.includes(car.brandId!);
              })
            : services?.data;
    }, [order, services]);
    const selectedKeys = useMemo(() => {
        if (order.serviceIds?.length === services?.data.length) {
            return "all";
        }

        return order.serviceIds;
    }, [order.serviceIds, services?.data.length]);

    useEffect(() => {
        if (services?.data) {
            setOrderValue(
                "serviceIds",
                services.data.map((service) => service._id!),
            );
        }
    }, [services?.data]);

    return (
        <Select
            items={renderedServices || []}
            isLoading={isServicesLoading}
            placeholder="Chọn dịch vụ"
            label="Dịch vụ"
            selectionMode="multiple"
            variant="bordered"
            isRequired
            selectedKeys={selectedKeys}
            color="primary"
            onSelectionChange={(keys) => {
                if (keys === "all") {
                    setOrderValue(
                        "serviceIds",
                        services?.data.map((service) => service._id!),
                    );
                } else {
                    const _ids = Array.from(keys).map((v) => v) as string[];
                    setOrderValue("serviceIds", _ids);
                }
            }}
        >
            {(service) => (
                <SelectItem key={service._id!}>
                    {service.category.name}
                </SelectItem>
            )}
        </Select>
    );
}
