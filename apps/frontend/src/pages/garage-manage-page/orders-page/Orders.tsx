import { useInfiniteScroll } from "@/core/hooks";
import { useOrders } from "../hooks";
import { CardSkeleton, OrderList } from "./ui";

function Orders() {
    const { orders, isLoading, onNext } = useOrders(["asc"]);
    const ref = useInfiniteScroll(onNext);
    return (
        <div className="overflow-y-auto h-full relative">
            <div className="sticky top-0 bg-white p-10 z-10">
                <h1 className="text-2xl font-bold">Danh sách đặt lịch garage</h1>
            </div>
            <OrderList orders={orders} />
            {isLoading && <CardSkeleton />}
            <div ref={ref} className="h-10" />
        </div>
    );
}

export default Orders;
