import { useInfiniteScroll } from "@/core/hooks";
import { CardSkeleton, OrderList } from "./ui";
import { useOrders } from "./hooks";
import { Select, SelectItem } from "@nextui-org/react";
import { orderStatusList, sorts } from "@/pages/admin/constants";
import { useMemo, useState } from "react";

export default function AccountOrdersPage() {
    const [status, setStatus] = useState([""]);
    const [sort, setSort] = useState(["asc"]);
    const { orders, isLoading, onNext } = useOrders(sort);
    const filteredOrders = useMemo(() => {
        const list = orders.filter((order) => {
            console.log(status[0]);
            if (status[0] === "") return true;
            return order.status === Number(status[0]);
        });
        return list;
    }, [orders, status]);
    const ref = useInfiniteScroll(onNext);
    return (
        <div className="p-10 overflow-auto">
            <p className="text-2xl font-bold">Lịch đặt sửa chữa của bạn</p>
            <div className="pt-5 flex gap-2">
                <Select
                    selectedKeys={status}
                    classNames={{ base: "max-w-[10rem]" }}
                    onChange={(e) => {
                        setStatus([e.target.value]);
                    }}
                >
                    {orderStatusList.map((status) => (
                        <SelectItem key={status.key} aria-label={status.key}>
                            {status.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    selectedKeys={sort}
                    classNames={{ base: "max-w-[10rem]" }}
                    onChange={(e) => {
                        setSort([e.target.value]);
                    }}
                >
                    {sorts.map((sorting) => (
                        <SelectItem key={sorting.key} aria-label={sorting.key}>
                            {sorting.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <OrderList orders={filteredOrders} />
            {isLoading && <CardSkeleton />}
            <div ref={ref} className="h-10" />
        </div>
    );
}
