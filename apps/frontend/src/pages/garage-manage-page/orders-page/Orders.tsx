import { useInfiniteScroll } from "@/core/hooks";
import { useOrders } from "../hooks";
import { CardSkeleton, OrderList } from "./ui";

function Orders() {
    const { orders, isLoading, onNext } = useOrders();
    const ref = useInfiniteScroll(onNext);
    return (
        <div className="pt-10 overflow-auto">
            <p className="text-3xl font-bold">Hiển thị lịch đặt</p>
            <OrderList orders={orders} />
            {isLoading && <CardSkeleton />}
            <div ref={ref} className="h-10" />
        </div>
    );
}

export default Orders;
