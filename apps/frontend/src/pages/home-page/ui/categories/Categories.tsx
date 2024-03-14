import useSWR from "swr";

import CategoryOption from "../category-option";
import { getCategories } from "@/api";
import { Carousel } from "@/core/ui";

function Categories() {
    const { isLoading, data: categories } = useSWR("category", getCategories, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div
            className="grow shrink flex justify-center gap-2"
            role="radiogroup"
        >
            <Carousel
                items={categories || []}
                classNames={{
                    item: "w-auto",
                    wrapper: "px-10",
                }}
                renderItem={(category) => (
                    <CategoryOption category={category} key={category._id} />
                )}
            />
        </div>
    );
}

export default Categories;
