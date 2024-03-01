import { Select, SelectItem } from "@nextui-org/react";
import useSWRImmutable from "swr/immutable";
import { getBrands } from "@/api";

export default function BrandSelect() {
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );

    return (
        <Select
            items={brands || []}
            isLoading={isBrandsLoading}
            placeholder="Select supported brands"
            label="Supported Brands"
            selectionMode="single"
            variant="underlined"
            classNames={{
                trigger: "!px-0 py-0",
                label: "!scale-100",
                selectorIcon: "right-0"  
            }}
            isRequired
            disallowEmptySelection
        >
            {(brand) => (
                <SelectItem key={brand._id}>
                    {brand.name}
                </SelectItem>
            )}
        </Select>
    )
}