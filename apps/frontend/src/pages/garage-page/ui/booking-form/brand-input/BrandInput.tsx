import { getBrands } from "@/api";
import { Brand, Car } from "@/core/types";
import { useOrderContext } from "@/pages/garage-page/hooks";
import { Select, SelectItem } from "@nextui-org/react";

import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

export type BrandInputModalProps = {
    brands?: Brand[];
    isBrandLoading?: boolean;
};

export type Model = {
    model: string;
};

function BrandInputModal() {
    const { setOrderValue } = useOrderContext();
    const [localCar, setLocalCar] = useState<Partial<Car>>({});

    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );
    useEffect(() => {
        setOrderValue("car", localCar);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCar]);
    return (
        <>
            <Select
                items={brands || []}
                selectionMode="single"
                label="Brand"
                placeholder="Select Brand"
                variant="bordered"
                isLoading={isBrandsLoading}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                    if (keys !== "all") {
                        const brandId = Array.from(keys)[0].toString();
                        setLocalCar((prev) => ({ ...prev, brandId }));
                    }
                }}
                selectedKeys={localCar?.brandId && [localCar.brandId]}
                color="primary"
            >
                {(brand) => (
                    <SelectItem key={brand._id}>{brand.name}</SelectItem>
                )}
            </Select>
        </>
    );
}

export default BrandInputModal;
