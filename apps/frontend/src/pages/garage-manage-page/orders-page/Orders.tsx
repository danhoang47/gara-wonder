import { OrderList } from "./ui";

function Orders() {
    return (
        <div className="pt-10">
            <p className="text-3xl font-bold">View your booking list</p>
            <OrderList />
        </div>
    );
}

export default Orders;
