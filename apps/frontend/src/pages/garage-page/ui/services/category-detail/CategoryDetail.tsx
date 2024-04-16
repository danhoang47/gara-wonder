import { Skeleton } from "@nextui-org/react";

import { Category } from "@/core/types";
import { SupportedChip } from "../..";
import { WithCategoryService } from "@/api/garages/getGarageServices";

function CategoryDetail({
    service,
    categoryData,
    isCategoryLoading,
    openModal,
}: {
    service: WithCategoryService;
    categoryData?: Category;
    isCategoryLoading: boolean;
    openModal: () => void;
}) {
    return (
        <div>
            <div className="flex items-center gap-1">
                {isCategoryLoading ? (
                    <Skeleton className="w-40 h-4 " />
                ) : (
                    <p className="font-medium ">{categoryData?.name}</p>
                )}
                <SupportedChip isSupport={service.status} />
            </div>
            <div className="text-sm text-zinc-500">
                {isCategoryLoading ? (
                    <Skeleton className="w-40 h-4 " />
                ) : (
                    <p>
                        {categoryData?.description}{" "}
                        <span
                            className="text-primary  hover:text-primary-700 cursor-pointer hover:underline transition-all "
                            onClick={openModal}
                        >
                            Xem tất cả xe được hỗ trợ
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default CategoryDetail;
