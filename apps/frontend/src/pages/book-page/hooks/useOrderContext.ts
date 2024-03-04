import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";


export default function useOrderContext() {
    return useContext(OrderContext)
}