import { getCategoryById, getGarageServices } from "@/api";
import { Category } from "@/core/types";
import { Select, SelectItem } from "@nextui-org/react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";


export default function ServiceSelect() {
    const [isCategoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<Category[]>()

    const { isLoading: isServicesLoading, data: services } =
        useSWRImmutable(`service/65db44c8cb29a95ec677b0a2`, getGarageServices);
    
    useEffect(() => {
        if (!services) return;

        const getCategories = async () => {
            const result = await Promise.all(services.data.map(service => {
                return getCategoryById(service.categoryId!)
            }))
            setCategoriesLoading(false)
            setCategories(result)
        }

        getCategories();
    }, [services])

    const getServiceSelectItemLabel = (categoryId?: string) => {
        if (!categories || !categoryId) return ""

        return categories.find(({ _id }) => _id === categoryId)?.name
    }

    return (
        <Select
            items={services?.data || []}
            isLoading={isCategoriesLoading && isServicesLoading}
            placeholder="Select services"
            label="Services"
            selectionMode="multiple"
            variant="underlined"
            classNames={{
                trigger: "!px-0 py-0",
                label: "!scale-100",
                selectorIcon: "right-0"  
            }}
            isRequired
            disallowEmptySelection
        >
            {(service) => (
                <SelectItem key={service._id || nanoid()}>
                    {getServiceSelectItemLabel(service.categoryId)}
                </SelectItem>
            )}
        </Select>
    )
}