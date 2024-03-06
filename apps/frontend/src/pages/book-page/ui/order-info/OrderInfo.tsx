import { Button } from "@nextui-org/react";

import DateInput from "../date-input";
import BrandSelect from "../brand-input";
import ServiceSelect from "../service-select";
import PayTypeGroup from "../pay-type-group";
import { useAppDispatch, useAppSelector, useModalContext } from "@/core/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOrderContext } from "../../hooks";
import { orderUpdated } from "@/features/cart/cart.slice";
import createOrder from "@/api/order/createOrders";

function OrderInfo() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { order } = useOrderContext();
    const { open } = useModalContext();
    const { token } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.value);

    const onConfirmButtonPress = () => {
        const type = searchParams.get("type");

        if (!token) {
            open("signIn");
        }

        if (type === "edit") {
            dispatch(orderUpdated(order));
            navigate("/cart");
        } else {
            createOrder(
                {
                    ...order,
                    userId: user?._id || "",
                },
                token,
            );
        }
    };

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
                    <p>
                        {token
                            ? "Sign in to continue your booking"
                            : "Book now"}
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default OrderInfo;
