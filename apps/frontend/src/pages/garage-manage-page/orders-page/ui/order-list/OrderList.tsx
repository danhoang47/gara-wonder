import { OrderCard } from "..";

function OrderList() {
    return (
        <div className="w-1/2 flex flex-col gap-2 pt-10">
            {new Array(4).fill("").map((e, index) => (
                <OrderCard key={index} />
            ))}
        </div>
    );
}
export default OrderList;
