import { Order, PayType } from "@/core/types";
import { Table } from "./ui";
import { useMemo } from "react";
import { Column } from "./ui/table/Table";
import { Tab, Tabs } from "@nextui-org/react";

const data: Order[] = [
    {
        _id: "1",
        car: {
            brandId: "test",
            model: "LongLongLongLongLong C200",
            plateNumber: "",
            releaseYear: 2019,
        },
        garageId: "1",
        orderTime: new Date().getTime(),
        payType: PayType.PayAsReceive,
        serviceIds: ["1"],
        totalPrice: 200200200200200,
        userId: "1",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
    },
];

function CartPage() {

    const columns = useMemo<Column<Order>[]>(
        () => [
            {
                key: "serivce",
                name: "Dịch vụ",
                onRender(item) {
                    return (
                        <div className="flex gap-2">
                            <div className="w-1/4 h-20">
                                <img
                                    className="object-cover h-full w-full"
                                    src="https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwZ2FyYWdlfGVufDB8fDB8fHww"
                                />
                            </div>
                            <div>{item.car.model}</div>
                        </div>
                    );
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
        [data],
    );

    return (
        <div className="container mx-auto">
            <div className="my-6">
                <h1 className="font-semibold text-2xl">Giỏ Hàng</h1>
                <span className="text-small text-default-400">
                    Nostrud nisi tempor deserunt voluptate sint proident irure
                    eiusmod anim ut nostrud aliquip.
                </span>
            </div>
            <div>
                <div className="flex justify-center">
                    <Tabs variant="underlined" aria-label="Tabs variants">
                        <Tab
                            key="garage"
                            title="Đơn sửa chữa"
                            className="text-base"
                        />
                        <Tab
                            key="product"
                            title="Đơn hàng"
                            className="text-base"
                        />
                    </Tabs>
                </div>
                <Table
                    items={data}
                    columns={columns}
                    classNames={{
                        headerWrapper: "border-b border-default-400",
                        header: "font-semibold py-4",
                        row: "py-2",
                    }}
                />
            </div>
        </div>
    );
}

export default CartPage;
