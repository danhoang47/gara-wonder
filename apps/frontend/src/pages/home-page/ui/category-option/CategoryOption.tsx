import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import "./CategoryOption.styles.scss"

import clsx from "clsx";
import { Category} from "@/core/types";
import { getCategoryIcon } from "@/utils";

export type CategoryOptionProps = {
    category: Category
}


function CategoryOption({ category }: CategoryOptionProps) {
    const [filterSearchParams, setFilterSearchParams] = useSearchParams();
    const isSelected = useMemo(() => {
        const filteredCategory = filterSearchParams.get("category")

        return filteredCategory === category._id
    }, [category._id, filterSearchParams])


    const onCategoryOptionSelect = () => {
        setFilterSearchParams(prev => {
            if (prev.get("category") === category._id) {
                prev.delete("category")
            } else {
                prev.set("category", category._id)
            }

            return prev;
        })
    }
    
    return (
        <div 
            role="radio" 
            className={clsx(
                "flex flex-col items-center cursor-pointer transition px-2 relative py-1 gap-2",
                "CategoryOption",
                isSelected && "CategoryOption--selected"
            )} 
            onClick={onCategoryOptionSelect}
            aria-label={`${category.name} option`}
        >   
            <img src={getCategoryIcon(category.type)} alt={category.name} className="h-5 object-contain"/>
            <p className="capitalize text-[12px] font-medium">{category.name}</p>
        </div>
    )
}

export default CategoryOption;