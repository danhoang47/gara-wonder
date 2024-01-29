import { SelectItem, Select, SelectedItems, Input } from "@nextui-org/react";
import { useState } from "react";

const services = [
    {
        id: 1,
        title: "Washing"
    },
    {
        id: 2,
        title: "Repair"
    }
]

const brands = [
    {
        id: 0,
        key: "all",
        title: "Select All"
    },
    {
        id: 1,
        key: "1",
        title: "Mercedes"
    },
    {
        id: 2,
        key: "2",
        title: "BMW"
    }
]

export type Brand = typeof brands[number]

export type ServiceTemplateProps = {

}

export default function ServiceTemplate() {
    const [selectedServiceId, setSelectedServiceId] = useState<string>()
    const [selectedBrandIds, setSelectedBrandIds] = useState<Set<string> | "all">()

    const renderBrandSelectValue = (brs: SelectedItems<Brand>): React.ReactNode => {
        const allIndex = brs.findIndex(({ key }) => key === "all")

        if (allIndex !== -1) {
            return <p>{brs.splice(allIndex, 1).map(({ textValue }) => textValue).join(", ")}</p>
        }

        return <p>{brs.map(({ textValue }) => textValue).join(", ")}</p>
    }

    return (
        <div className="flex flex-column gap-3 flex-wrap">
            <Select
                items={services}
                placeholder="Select service type"
                label="Service Type"
                variant="bordered"
                onSelectionChange={(keys) => setSelectedServiceId(keys.toString)}
            >
                {(service) => <SelectItem key={service.id}>{service.title}</SelectItem>}
            </Select>
            <Select
                items={brands}
                placeholder="Select supported brands"
                label="Supported Brands"
                selectionMode="multiple"
                variant="bordered"
                selectedKeys={selectedBrandIds}
                renderValue={renderBrandSelectValue}
                onSelectionChange={(keys) => {
                    const arrayOfKeys = Array.from(keys) as Array<string>

                    if (arrayOfKeys.includes("all")) {
                        if (selectedBrandIds !== "all") {
                            setSelectedBrandIds("all")
                            return;
                        }
                        if (arrayOfKeys.length > 1) {
                            setSelectedBrandIds(new Set(arrayOfKeys.filter(v => String(v) !== "all")))
                            return;
                        }
                    } else if (selectedBrandIds === "all") {
                        setSelectedBrandIds(new Set([]))
                    } else {
                        setSelectedBrandIds(new Set(arrayOfKeys))
                    }
                }}
            >
                {(brand) => <SelectItem key={brand.key}>{brand.title}</SelectItem>}
            </Select>
            <div className="flex gap-2 w-full">
                <Input
                    variant="bordered"
                    placeholder="Enter lowest price"
                    label="Lowest Price"
                    isRequired
                    type="number"
                    defaultValue={"0"}
                />
                <Input
                    variant="bordered"
                    placeholder="Enter highest price"
                    label="Highest Price"
                    isRequired
                    type="number"
                    defaultValue="100"
                />
            </div>
        </div>
    )
}