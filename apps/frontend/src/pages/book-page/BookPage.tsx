import OrderContextProvider from "./context/OrderContext";
import { GaragePreviewCard, OrderInfo } from "./ui";

function BookPage() {
    return (
        <OrderContextProvider>
            <div className="w-3/4 max-w-5xl md:w-full py-8 md:px-10 mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <h1 className="text-2xl font-semibold">Xác nhận đơn hàng</h1>
                </div>
                <div className="flex gap-16">
                    <div className="flex-1">
                        <OrderInfo />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <GaragePreviewCard />
                    </div>
                </div>
            </div>
        </OrderContextProvider>
    );
}

export default BookPage;
