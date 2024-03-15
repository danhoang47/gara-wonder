import { useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Order, Paging } from "@/core/types";
import { useParams } from "react-router-dom";
import { getOrders } from "@/api";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { garageId } = useParams();
    const getKey = useCallback(() => {
        if (!garageId) return null;

        return "notifications/" + garageId;
    }, [garageId]);
    const onOrderLoaded = (order: Order[], isReload: boolean) => {
        if (isReload) {
            setOrders(order);
        } else {
            setOrders([...orders, ...order]);
        }
    };
    const { isReload, isLoading, onNext } = useAsyncList<Order>(
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
