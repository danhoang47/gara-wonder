import { useContext } from "react";
import { OrderContext } from "../context/order-context";


export default function useOrderContext() {
    return useContext(OrderContext)
}