import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./CategoryOption.styles.scss"

import clsx from "clsx";

export type CategoryOptionProps = {
    category: {
        key: string,
        title: string,
        value: string,
        icon: IconProp
    }
}

function CategoryOption({ category }: CategoryOptionProps) {
    const [filterSearchParams, setFilterSearchParams] = useSearchParams();
    const isSelected = useMemo(() => {
        const filteredCategory = filterSearchParams.get("category")

        return filteredCategory === category.value
    }, [filterSearchParams])


    const onCategoryOptionSelect = () => {
        setFilterSearchParams(prev => {
            if (prev.get("category") === category.value) {
                prev.delete("category")
            } else {
                prev.set("category", category.value)
            }

            return prev;
        })
    }
    
    return (
        <div 
            role="radio" 
            className={clsx(
                "flex flex-col items-center cursor-pointer transition px-2 relative py-1",
                "CategoryOption",
                isSelected && "CategoryOption--selected"
            )} 
            onClick={onCategoryOptionSelect}
            aria-label={`${category.value} option`}
        >
            <p className="capitalize">{category.title}</p>
        </div>
    )
}

export default CategoryOption;