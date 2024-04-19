import {
    createSupplierReview,
    getProductById,
    getReviewableStatus,
} from "@/api/supplier";
import { useAppDispatch } from "@/core/hooks";
import { Product, Review, RoomType, Service } from "@/core/types";
import { ReviewModal } from "@/core/ui";
import { notify } from "@/features/toasts/toasts.slice";
import { formatCurrency } from "@/utils";
import { Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";

export type AttachEntityProps = {
    displayName: string;
    entityId: string;
    roomType: RoomType;
    attachEntityId: string;
};

const getKeyAndFetcher = (roomType: RoomType, attachEntityId: string) => {
    if (roomType === RoomType.WithSupplier) {
        return [attachEntityId, getProductById];
    } else {
        return [
            attachEntityId,
            async () => {
                return Promise.resolve({}) as Service;
            },
        ];
    }
};

function AttachEntity({
    roomType,
    attachEntityId,
    displayName,
    entityId,
}: AttachEntityProps) {
    const dispatch = useAppDispatch();
    const [key, fetcher] = getKeyAndFetcher(roomType, attachEntityId);
    const { isLoading: isProductLoading, data: productOrService } = useSWRImmutable<Product>(key, fetcher);
    const { isLoading, data: allowReview, mutate } = useSWRImmutable(
        ["review/status", entityId],
        () => getReviewableStatus(entityId),
    );
    const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
    const [isReviewLoading, setReviewLoading] = useState<boolean>(false);

    const onReviewSubmit = async (review: Partial<Review>) => {
        setReviewLoading(true);
        try {
            await createSupplierReview(review);
            setReviewLoading(false);
            setReviewModalOpen(false);
            dispatch(
                notify({
                    title: "Đánh giá",
                    description: "Bạn đã gửi đánh giá thành công",
                    type: "success",
                }),
            );
            mutate({ data: true, statusCode: 200 })
        } catch (error) {
            setReviewLoading(false);
            setReviewModalOpen(false);
            dispatch(
                notify({
                    title: "Đánh giá",
                    description: "Có lỗi xảy ra, vui lòng thử lại",
                    type: "failure",
                }),
            );
        }
    };

    return (
        <div className="flex px-4 py-3 gap-4 items-center shadow">
            <div className="h-16 w-16">
                {isProductLoading ? (
                    <Skeleton className="w-full h-full rounded-small" />
                ) : (
                    <img
                        alt=""
                        src={productOrService?.images[0].url}
                        className="w-full h-full rounded-small"
                    />
                )}
            </div>
            <div className="grow overflow-x-hidden text-ellipsis whitespace-nowrap">
                <p className="leading-none font-medium">
                    {productOrService?.name}
                </p>
                <span className="text-[12px]">
                    {productOrService?.description}
                </span>
            </div>
            <div className="flex gap-2 items-center">
                <p className="font-semibold">
                    {productOrService?.price &&
                        formatCurrency(productOrService?.price, "standard")}
                </p>
                {allowReview?.data && (
                    <Button
                        radius="full"
                        color="primary"
                        onPress={() => setReviewModalOpen(true)}
                        isLoading={isLoading}
                    >
                        <span>Đánh giá</span>
                    </Button>
                )}
            </div>
            <ReviewModal
                isOpen={isReviewModalOpen}
                entityId={entityId}
                entityName={displayName}
                isLoading={isReviewLoading}
                onClose={() => {
                    if (!isLoading) {
                        setReviewModalOpen(false);
                    }
                }}
                onSave={onReviewSubmit}
            />
        </div>
    );
}

export default AttachEntity;
