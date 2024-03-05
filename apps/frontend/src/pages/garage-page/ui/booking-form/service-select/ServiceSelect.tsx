import { Select, SelectItem } from "@nextui-org/react";
import useSWRImmutable from "swr/immutable";

import useOrderContext from "@/pages/garage-page/hooks/useOrderContext";
import { getGarageServices } from "@/api";

export default function ServiceSelect() {
    const { setOrderValue } = useOrderContext();

    const { isLoading: isServicesLoading, data: services } = useSWRImmutable(
        `service/65db44c8cb29a95ec677b0a2`,
        getGarageServices,
    );

    return (
        <Select
            items={services?.data || []}
            isLoading={isServicesLoading}
            placeholder="Select services"
            label="Services"
            selectionMode="multiple"
            variant="bordered"
            isRequired
            disallowEmptySelection
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
