import { Button } from "@nextui-org/react";

import DateInput from "../date-input";
import BrandSelect from "../brand-input";
import ServiceSelect from "../service-select";
import PayTypeGroup from "../pay-type-group";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { useSearchParams } from "react-router-dom";
import { useOrderContext } from "../../hooks";
import { orderAdded, orderUpdated } from "@/features/cart/cart.slice";


function OrderInfo() {
    const [searchParams] = useSearchParams();
    const { order } = useOrderContext();
    const { token } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const onConfirmButtonPress = () => {
        const type = searchParams.get("type")

        if (type === "edit") {
            dispatch(orderUpdated(order))        
        } else {
            // TODO: book
        }
    }

    return (
        <div>
            <p className="text-lg font-medium mb-4">
                Thông tin đơn hàng của bạn
            </p>
            <div className="flex flex-col gap-4">
                <DateInput />
                <BrandSelect />
                <ServiceSelect />
                <PayTypeGroup />
                <Button
                    color="primary"
                    radius="sm"
                    size="lg"
                    className="mt-8"
                    onPress={onConfirmButtonPress}
                >
                    <p>{token ? "Sign in to continue your booking" : "Book now"}</p>
                </Button>
            </div>
        </div>
    )
}

export default OrderInfo;