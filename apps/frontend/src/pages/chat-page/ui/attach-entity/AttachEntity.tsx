import { getProductById } from "@/api/supplier";
import { Product, RoomType, Service } from "@/core/types";
import { formatCurrency } from "@/utils";
import { Button, Skeleton } from "@nextui-org/react";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";

export type AttachEntityProps = {
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

function AttachEntity({ roomType, attachEntityId }: AttachEntityProps) {
    const [key, fetcher] = getKeyAndFetcher(roomType, attachEntityId);
    const { isLoading, data: productOrService } = useSWRImmutable<Product>(
        key,
        fetcher,
    );

    useEffect(() => {}, []);

    return (
        <div className="flex px-4 py-3 gap-4 items-center shadow">
            <div className="h-16 w-16">
                {isLoading ? (
                    <Skeleton className="w-full h-full" />
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
                <Button radius="full" color="primary">
                    <span>Đánh giá</span>
                </Button>
            </div>
        </div>
    );
}

export default AttachEntity;
