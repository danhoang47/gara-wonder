import { ContainerProps, Order } from "@/core/types";
import {
    createContext,
    useCallback,
    useMemo,
    useState,
} from "react";

export type OrderInfo = Partial<Order>;

export type OrderContextType = {
    order: Order;
    setOrderValue: <K extends keyof OrderInfo>(
        key: K,
        value: OrderInfo[K],
    ) => void;
};

export const OrderContext = createContext<OrderContextType>(
    {} as OrderContextType,
);

export default function OrderContextProvider({ children }: ContainerProps) {
    const [order, setOrder] = useState<Order>({} as Order);

    const setOrderValue = useCallback(
        <K extends keyof OrderInfo>(k: K, v: OrderInfo[K]) => {
            setOrder((prev) => ({
                ...prev,
                [k]: v,
            }));
        },
        [],
    );

    const orderContextValue = useMemo(
        () => ({
            order,
            setOrderValue,
        }),
        [order, setOrderValue],
    );

    return (
        <OrderContext.Provider value={orderContextValue}>
            {children}
        </OrderContext.Provider>
    );
}
