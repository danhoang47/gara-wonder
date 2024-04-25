import { Order } from "@/core/types";
import { Table } from "./ui";
import { useMemo } from "react";
import { Column } from "../../core/ui/table/Table";
import { useAppSelector } from "@/core/hooks";
import { selectOrders } from "@/features/cart/cart.slice";
import OrderCard from "./ui/order-card";

function CartPage() {
    const orders = useAppSelector((state) => selectOrders(state.cart));
    const columns = useMemo<Column<Order>[]>(
        () => [
            {
                key: "service",
                name: "Dịch vụ",
                onRender(order) {
                    return <OrderCard key={order._id} order={order} />;
                },
                className: "w-1/2",
            },
            {
                key: "date",
                name: "Ngày đặt",
                onRender(item) {
                    return (
                        <div>
                            {new Date(item.orderTime).toLocaleDateString()}
                        </div>
                    );
                },
            },
            {
                key: "total",
                name: "Tổng tiền (ước tính)",
                onRender(item) {
                    return <div>{item.totalPrice}$</div>;
                },
            },
        ],
        [],
    );

    return (
        <div className="container mx-auto">
            <div className="my-8">
                <h1 className="font-semibold text-2xl">Giỏ Hàng</h1>
                <span className="text-small text-default-400">
                    Những đơn chưa được đặt của bạn.
                </span>
            </div>
            <div>
                <Table
                    items={orders}
                    columns={columns}
                    classNames={{
                        headerWrapper: "border-b border-default-400",
                        header: "font-semibold py-4 flex-grow",
                        row: "py-2",
                    }}
                />
            </div>
        </div>
    );
}

export default CartPage;
