import { Car, ContainerProps, Order } from "@/core/types";
import { createContext, useMemo, useState } from "react";

export type OrderInfo = Partial<Omit<Order, "car"> & { car: Partial<Car> }>

export type OrderContextType = {
    order: OrderInfo
    setOrderValue: <K extends keyof OrderInfo>(key: K, value: OrderInfo[K]) => void 
}

export const OrderContext = createContext<OrderContextType>({} as OrderContextType)

export default function OrderContextProvider({ children }: ContainerProps) {
    const [order, setOrder] = useState<OrderInfo>({} as OrderInfo)

    const setOrderValue = <K extends keyof OrderInfo>(k: K, v: OrderInfo[K]) => {
        setOrder(prev => ({
            ...prev,
            [k]: v
        }))
    }

    const orderContextValue = useMemo(() => ({
        order,
        setOrderValue
    }), [order])

    return (
        <OrderContext.Provider value={orderContextValue}>
            {children}
        </OrderContext.Provider>
    )
}



