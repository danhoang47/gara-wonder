import { useAppSelector, useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Paging } from "@/core/types";
import { getOrders } from "@/api";
import { OrderListType } from "@/api/order/getOrders";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders(sort: string[]) {
    const [orders, setOrders] = useState<OrderListType[]>([]);
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const getKey = useCallback(() => {
        if (!garageId) return null;
        return "orders/" + garageId;
    }, [garageId]);
    const onOrderLoaded = (order: OrderListType[], isReload: boolean) => {
        if (isReload) {
            setOrders(order);
        } else {
            setOrders([...orders, ...order]);
        }
    };

    console.log(status, sort);
    const { isReload, isLoading, onNext } = useAsyncList<OrderListType>(
        getKey,
        onOrderLoaded,
        [garageId, sort],
        async (params) => {
            const paging = params[1];
            const results = await getOrders(
                garageId,
                paging.limit,
                paging?.nextCursor,
                sort[0],
            );
            return results;
        },
        DEFAULT_PAGING,
    );

    return { orders, isReload, isLoading, onNext };
}
