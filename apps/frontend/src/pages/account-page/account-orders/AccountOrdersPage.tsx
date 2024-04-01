import { useInfiniteScroll } from "@/core/hooks";
import { CardSkeleton, OrderList } from "./ui";
import { useOrders } from "./hooks";

export default function AccountOrdersPage() {
    const { orders, isLoading, onNext } = useOrders();
    const ref = useInfiniteScroll(onNext);
    return (
        <div className="p-10 overflow-auto">
            <p className="text-2xl font-bold">Hiển thị lịch đặt</p>
            <OrderList orders={orders} />
            {isLoading && <CardSkeleton />}
            <div ref={ref} className="h-10" />
        </div>
    );
}
