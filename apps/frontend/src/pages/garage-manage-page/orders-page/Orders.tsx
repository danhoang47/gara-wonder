import { useInfiniteScroll } from "@/core/hooks";
import { useOrders } from "../hooks";
import { CardSkeleton, OrderList } from "./ui";

function Orders() {
    const { orders, isReload, isLoading, onNext } = useOrders();
    const ref = useInfiniteScroll(onNext);
    return (
        <div className="pt-10">
            <p className="text-3xl font-bold">View your booking list</p>
            <OrderList orders={orders} isLoading={isLoading} />
            {isLoading && <CardSkeleton />}
            <div ref={ref} className="h-10" />
        </div>
    );
}

export default Orders;
