import { OrderCard } from "..";
import { OrderListType } from "@/api/order/getOrders";
import { useAppSelector } from "@/core/hooks";

function OrderList({ orders }: { orders: OrderListType[] }) {
    const garageId = useAppSelector(state => state.user.value?.garageId);

    return (
        <div className="w-1/2 flex flex-col gap-2 px-10">
            {orders?.map((order: OrderListType, index: number) => (
                <OrderCard order={order} key={index} garageId={garageId}/>
            ))}
        </div>
    );
}
export default OrderList;
