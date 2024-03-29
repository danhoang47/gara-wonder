import { Button } from "@nextui-org/react";
import BrandInput from "./brand-input";
import ServiceSelect from "./service-select";
import SelectInput from "./select-input";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useOrderContext } from "../../hooks";
import { useAppDispatch } from "@/core/hooks";
import { orderAdded } from "@/features/cart/cart.slice";
import { createPortal } from "react-dom";
import { Overlay } from "@/core/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

function BookingForm() {
    const navigate = useNavigate();
    const { order } = useOrderContext();
    useEffect(() => {
        console.log(order);
    }, [order]);

    const [isDomReady, setDomReady] = useState<boolean>(false);
    const [hasAddedToCart, setAddedToCart] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onBookPress = () => {
        navigate("/book", {
            state: order,
        });
    };

    const onAddToCart = () => {
        dispatch(orderAdded(order));
        setAddedToCart(true);
    };

    const validateForm = useMemo<boolean>(() => {
        if (
            order.car?.brandId &&
            order.orderTime &&
            order?.serviceIds?.length !== 0
        )
            return false;
        return true;
    }, [order]);

    useEffect(() => {
        setDomReady(true);
    }, []);

    useEffect(() => {
        if (hasAddedToCart) {
            setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        }
    }, [hasAddedToCart]);

    return (
        <div className="px-5 py-8 border-zinc-200 border-2 rounded-md">
            <div className="flex flex-col gap-6 ">
                <p className="font-semibold text-xl leading-5">Đặt dịch vụ</p>
                <div className="flex flex-col gap-3 relative">
                    <SelectInput />
                    <BrandInput />
                    <ServiceSelect />
                </div>
                {/* <div>
                    <div className="flex justify-between">
                        <p className="text-default-400">Tổng</p>
                        <p>VND 42000</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-default-400">Thuế</p>
                        <p>VND 42000</p>
                    </div>
                </div>
                <div className="border-t-2 border-zync-400" />
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">Tổng</p>
                    <p>VND 42000</p>
                </div> */}
                <div className="border-t-2 border-zync-400" />

                <div className="flex flex-col gap-3">
                    <Button
                        color="primary"
                        radius="sm"
                        isDisabled={validateForm}
                        disableAnimation
                        onClick={onBookPress}
                        className="w-full"
                    >
                        <span className="text-base font-medium">Đặt ngay</span>
                    </Button>
                    <Button
                        color="default"
                        radius="sm"
                        variant="bordered"
                        isDisabled={validateForm}
                        disableAnimation
                        onClick={onAddToCart}
                        className="w-full"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
            {isDomReady &&
                hasAddedToCart &&
                createPortal(
                    <Overlay>
                        <div className="container h-full justify-end mx-auto">
                            <div className="sticky top-20 ml-auto bg-white w-1/4 p-4 min-w-96">
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-success"
                                    />
                                    <span className="ml-2 text-small">
                                        Thêm vào giỏ hàng thành công
                                    </span>
                                    <Button
                                        className="ml-auto"
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        radius="full"
                                        onPress={() => setAddedToCart(false)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <div className="w-20 h-20">
                                        <img
                                            className="object-cover h-full w-full"
                                            src="https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwZ2FyYWdlfGVufDB8fDB8fHww"
                                        />
                                    </div>
                                    <div>Mercedes C200</div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        variant="bordered"
                                        radius="full"
                                        className="grow"
                                    >
                                        Xem giỏ hàng
                                    </Button>
                                    <Button
                                        color="primary"
                                        radius="full"
                                        className="grow"
                                    >
                                        Thanh toán ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Overlay>,
                    document.getElementById("garage")!,
                )}
        </div>
    );
}

export default BookingForm;
