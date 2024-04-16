import useSWR from "swr";

import CategoryOption from "../category-option";
import { getCategories } from "@/api";
import { Carousel } from "@/core/ui";

function Categories() {
    const { data: categories } = useSWR("category", getCategories, {
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
                    button: "bg-background border-2",
                    base: "gap-2"
                }}
                renderItem={(category) => (
                    <CategoryOption category={category} key={category._id} />
                )}
                enableShadow
            />
        </div>
    );
}

export default Categories;
