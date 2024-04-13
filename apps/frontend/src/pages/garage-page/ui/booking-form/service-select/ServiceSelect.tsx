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
        const result = order.car
            ? services?.data.filter((service) => {
                  if (service.brandIds === "all") {
                      return true;
                  }
                  return service.brandIds?.includes(order.car.brandId!);
              })
            : services?.data;

        return result;
    }, [services, order]);
    const selectedKeys = useMemo(() => {
        if (order.serviceIds?.length === services?.data.length) {
            console.log(order.serviceIds, services?.data);

            return "all";
        }
        if (order.serviceIds) return order.serviceIds;
        return [];
    }, [order.serviceIds, services?.data]);
    useEffect(() => {
        console.log(selectedKeys);
    }, [selectedKeys]);

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
            isInvalid={Boolean(!renderedServices?.length)}
            errorMessage={() => {
                if (order?.car)
                    return "Xe của bạn không được hỗ trợ bởi bất kì dịch vụ nào";
            }}
            isDisabled={Boolean(!order?.car)}
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
