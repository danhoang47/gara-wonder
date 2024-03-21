
import { OrderCard } from "..";
import { OrderListType } from "@/api/order/getOrders";

function OrderList({ orders }: { orders: OrderListType[] }) {
    return (
        <div className="w-1/2 flex flex-col gap-2 pt-10">
            {orders?.map((order: OrderListType, index: number) => (
                <OrderCard order={order} key={index} />
            ))}
        </div>
    );
}
export default OrderList;
