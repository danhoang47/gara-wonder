import useSWRImmutable from "swr/immutable";
import { Skeleton } from "@nextui-org/react";

import { Service } from "@/core/types";
import { SupportedChip } from "../..";
import { getCategoryById } from "@/api";

function CategoryDetail({ service }: { service: Service }) {
    const { isLoading: isCategoryLoading, data: categoryData } =
        useSWRImmutable(`${service.categoryId}`, getCategoryById);
    return (
        <div>
            <div className="flex items-center">
                {isCategoryLoading ? (
                    <Skeleton className="w-40 h-4 " />
                ) : (
                    <p className="font-medium">{categoryData?.name}</p>
                )}
                <SupportedChip isSupport={service.isSupported} />
            </div>
            <div className="text-sm text-zinc-500">
                {isCategoryLoading ? (
                    <Skeleton className="w-40 h-4 " />
                ) : (
                    <p>
                        {categoryData?.description}{" "}
                        <span className="text-primary cursor-pointer hover:text-primary-700">
                            See all supported cars
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default CategoryDetail;
