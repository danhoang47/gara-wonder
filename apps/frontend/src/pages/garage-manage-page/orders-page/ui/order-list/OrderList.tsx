import { Order } from "@/core/types";
import { OrderCard } from "..";

type OrderListType = {
    orders?: Order[];
};

function OrderList({ orders }: OrderListType) {
    return (
        <div className="w-1/2 flex flex-col gap-2 pt-10">
            {orders?.map((order: Order, index) => (
                <OrderCard order={order} key={index} />
            ))}
        </div>
    );
}
export default OrderList;
