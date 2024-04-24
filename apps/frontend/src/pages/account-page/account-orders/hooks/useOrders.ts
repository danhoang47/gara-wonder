import { useAppSelector, useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Paging } from "@/core/types";
import { getUserOrders } from "@/api";
import { OrderListType } from "@/api/order/getOrders";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders(sort: string[]) {
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
        [userData, sort],
        async (params) => {
            const paging = params[1];
            if (userData.token) {
                const results = await getUserOrders(
                    userData.token,
                    paging.limit,
                    paging?.nextCursor,
                    sort[0],
                );
                return results;
            }
        },
        DEFAULT_PAGING,
    );

    return { orders, isReload, isLoading, onNext };
}
