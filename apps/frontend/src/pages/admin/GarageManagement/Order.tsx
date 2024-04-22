import { useInfiniteScroll } from "@/core/hooks";
import { useOrders } from "@/pages/garage-manage-page/hooks";
import { CardSkeleton } from "@/pages/garage-manage-page/orders-page/ui";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { orderStatusList, sorts } from "../constants";
import OrderList from "./order-list";

const Order: React.FC = () => {
    const [status, setStatus] = useState([""]);
    const [sort, setSort] = useState(["asc"]);

    const { orders, isLoading, onNext } = useOrders(status, sort);
    const ref = useInfiniteScroll(onNext);
    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    position: "sticky",
                    top: "10px",
                }}
            >
                <DateRangePicker className="max-w-xs h-10" />
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
            <div className="overflow-y-auto h-full relative">
                <OrderList orders={orders} />
                {isLoading && <CardSkeleton />}
                <div ref={ref} className="h-10" />
            </div>
        </div>
    );
};

export default Order;
