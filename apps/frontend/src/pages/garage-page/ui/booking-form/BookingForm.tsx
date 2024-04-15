import { Button } from "@nextui-org/react";
import BrandInput from "./brand-input";
import ServiceSelect from "./service-select";
import SelectInput from "./select-input";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOrderContext } from "../../hooks";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { orderAdded } from "@/features/cart/cart.slice";
import { createPortal } from "react-dom";
import { Overlay } from "@/core/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

function BookingForm() {
    const { garageId } = useParams();
    const formRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { order } = useOrderContext();
    const user = useAppSelector((state) => state.user.value);
    const [isDomReady, setDomReady] = useState<boolean>(false);
    const [hasAddedToCart, setAddedToCart] = useState<boolean>(false);
    const [urlSearchParams] = useSearchParams();
    const suggestionServices = useMemo(
        () => urlSearchParams.get("sg"),
        [urlSearchParams],
    );
    const dispatch = useAppDispatch();
    const disabledBook = useMemo(
        () => user?.garageId === garageId,
        [user?.garageId, garageId],
    );

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
            order?.serviceIds?.length
        ) {
            return false;
        }
        return true;
    }, [order]);

    useEffect(() => {
        setDomReady(true);
    }, []);

    useEffect(() => {
        if (hasAddedToCart) {
            window.scroll({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        }
    }, [hasAddedToCart]);

    useEffect(() => {
        if (formRef.current && suggestionServices) {
            const { current } = formRef
            current.scrollIntoView({
                block: "center",
                behavior: "smooth"
            })
        }
    }, [formRef, suggestionServices]);

    return (
        <div
            className="px-5 py-8 border-zinc-200 border-2 rounded-md"
            ref={formRef}
        >
            <div className="flex flex-col gap-6 ">
                <p className="font-semibold text-xl leading-5">Đặt dịch vụ</p>
                <div className="flex flex-col gap-3 relative">
                    <SelectInput />
                    <BrandInput />
                    <ServiceSelect />
                </div>
                <div className="border-t-2 border-zync-400" />

                <div className="flex flex-col gap-3">
                    <Button
                        color="primary"
                        radius="sm"
                        isDisabled={validateForm || disabledBook}
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
                        isDisabled={validateForm || disabledBook}
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
                        <div className="flex sticky container justify-end mx-auto">
                            <div className="bg-white w-1/4 p-4 min-w-96 h-fit">
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
                                            alt=""
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
