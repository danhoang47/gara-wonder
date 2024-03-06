import { useAppDispatch, useAppSelector, useLocalStorage } from "@/core/hooks";
import { ContainerProps } from "@/core/types";
import { orderReceived, selectOrders } from "@/features/cart/cart.slice";

function LocalStorage({ children }: ContainerProps) {
    const cart = useAppSelector((state) => selectOrders(state.cart));
    const dispatch = useAppDispatch();
    useLocalStorage("cart", cart, (orders) => {
        dispatch(orderReceived(orders || []));
    });

    return <>{children}</>;
}

export default LocalStorage;
