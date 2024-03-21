import { useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Paging } from "@/core/types";
import { useParams } from "react-router-dom";
import { getOrders } from "@/api";
import { OrderListType } from "@/api/order/getOrders";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders() {
    const [orders, setOrders] = useState<OrderListType[]>([]);
    const { garageId } = useParams();
    const getKey = useCallback(() => {
        if (!garageId) return null;
        return "notifications/" + garageId;
    }, [garageId]);
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
        [garageId],
        async (params) => {
            const paging = params[1];
            const results = await getOrders(
                garageId,
                paging.limit,
                paging?.nextCursor,
            );
            return results;
        },
        DEFAULT_PAGING,
    );

    return { orders, isReload, isLoading, onNext };
}
