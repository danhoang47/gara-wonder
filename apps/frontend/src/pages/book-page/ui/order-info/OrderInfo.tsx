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
import { useState } from "react";
import { HttpStatusCode } from "axios";
import { notify } from "@/features/toasts/toasts.slice";

function OrderInfo() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { order } = useOrderContext();
    const { open } = useModalContext();
    const {
        token,
        value: user,
        garageId,
    } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const type = searchParams.get("type");
    const isGarageBelongToCurrentUser = garageId === order.garageId;
    const [isConfirmButtonLoading, setConfirmButtonLoading] =
        useState<boolean>(false);

    const onConfirmButtonPress = async () => {
        if (!token) {
            open("signIn");
        }
        if (garageId === order.garageId) return;

        if (type === "edit") {
            dispatch(orderUpdated(order));
            navigate("/cart");
        } else {
            setConfirmButtonLoading(true);
            try {
                const result = await createOrder(
                    {
                        ...order,
                        userId: user?._id || "",
                    },
                    token,
                );
                if (result.statusCode === HttpStatusCode.Ok) {
                    navigate(-1);
                    open("orderSuccess");
                }
            } catch (_error) {
                dispatch(notify({
                    title: "Đặt đơn sửa chữa",
                    description: "Có vấn đề xảy ra, vui lòng tải lại trang và thử lại",
                    type: "failure"  
                }))
            } finally {
                setConfirmButtonLoading(false);
            }
        }
    };

    const getConfirmButtonLabel = () => {
        if (!token) return "Hãy đăng nhập để tiếp tục đặt đơn";

        if (type === "edit") return "Lưu thông tin đơn sửa chữa";
        else return "Đặt đơn sửa chữa";
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
                    isDisabled={isGarageBelongToCurrentUser}
                    isLoading={isConfirmButtonLoading}
                >
                    <p>{getConfirmButtonLabel()}</p>
                </Button>
            </div>
        </div>
    );
}

export default OrderInfo;
