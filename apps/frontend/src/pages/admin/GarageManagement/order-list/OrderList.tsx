import { useParams } from "react-router-dom";
import { OrderListType } from "@/api/order/getOrders";
import OrderCard from "./order-card";

function OrderList({ orders }: { orders: OrderListType[] }) {
    const { garageId } = useParams();
    return (
        <div className=" flex flex-col gap-2 ">
            {orders?.map((order: OrderListType, index: number) => (
                <OrderCard order={order} key={index} garageId={garageId} />
            ))}
        </div>
    );
}
export default OrderList;
