import useSWR from "swr";

import CategoryOption from "../category-option";
import { getCategories } from "@/api";

function Categories() {
    const { isLoading, data: categories} = useSWR("category", getCategories)

    return (
        <div
            className="flex-grow flex justify-center gap-2"
            role="radiogroup"
        >
            {categories?.map(category => (
                <CategoryOption 
                    category={category} 
                    key={category._id} 
                />
            ))}
        </div>
    )
}

export default Categories;