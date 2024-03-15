import { Order } from "@/core/types";
import { OrderCard } from "..";

type OrderListType = {
    isLoading: boolean;
    orders?: Order[];
};

function OrderList({ isLoading, orders }: OrderListType) {
    return (
        <div className="w-1/2 flex flex-col gap-2 pt-10">
            {orders?.map((order: Order, index) => <OrderCard order={order} key={index} />)}
        </div>
    );
}
export default OrderList;
