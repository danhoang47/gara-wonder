import { useAppSelector, useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Paging } from "@/core/types";
import { getOrders } from "@/api";
import { OrderListType } from "@/api/order/getOrders";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders() {
    const userData = useAppSelector((state) => state.user);
    const [orders, setOrders] = useState<OrderListType[]>([]);
    const getKey = useCallback(() => {
        if (!userData) return null;
        return "notifications/" + userData.value?._id;
    }, [userData]);
    const onOrderLoaded = (order: OrderListType[], isReload: boolean) => {
        if (isReload) {
            setOrders(order);
        } else {
            setOrders([...orders, ...order]);
        }
    };
    const { isReload, isLoading, onNext } = useAsyncList<OrderListType>(
        getKey,
        onOrderLoaded,
        [userData],
        async (params) => {
            const paging = params[1];
            const results = await getOrders(
                userData.value?._id,
                paging.limit,
                paging?.nextCursor,
            );
            return results;
        },
        DEFAULT_PAGING,
    );

    return { orders, isReload, isLoading, onNext };
}
