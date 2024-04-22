import { useAsyncList } from "@/core/hooks";
import { useCallback, useState } from "react";
import { Paging } from "@/core/types";
import { useParams } from "react-router-dom";
import { getOrders } from "@/api";
import { OrderListType } from "@/api/order/getOrders";

const DEFAULT_PAGING: Paging = {
    limit: 5,
};

export default function useOrders(status: string[], sort: string[]) {
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
    // const fetchFunc = useCallback(async (paging) => {}, [status, sort]);
    // console.log(status, sort);
    const { isReload, isLoading, onNext } = useAsyncList<OrderListType>(
        getKey,
        onOrderLoaded,
        [garageId, status, sort],
        async (params) => {
            const paging = params[1];
            const results = await getOrders(
                garageId,
                paging.limit,
                paging?.nextCursor,
                status[0],
                sort[0],
            );
            return results;
        },
        DEFAULT_PAGING,
    );
    console.log(isReload);

    return { orders, isReload, isLoading, onNext };
}
