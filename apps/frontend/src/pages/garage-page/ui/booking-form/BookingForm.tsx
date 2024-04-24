import { Button, Tooltip } from "@nextui-org/react";
import BrandInput from "./brand-input";
import ServiceSelect from "./service-select";
import SelectInput from "./date-input";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOrderContext } from "../../hooks";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { orderAdded } from "@/features/cart/cart.slice";
import useSWR from "swr";
import { getScheduleSlot } from "@/api";
import moment from "moment";
import clsx from "clsx";
import { DisabledDate } from "@/core/ui/calendar/Calendar";
import { notify } from "@/features/toasts/toasts.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { ObjectId } from "bson";

function BookingForm() {
    const { garageId } = useParams();
    const formRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { order } = useOrderContext();
    const user = useAppSelector((state) => state.user.value);
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
    const { isLoading, data: schedule } = useSWR(
        `${garageId}/schedule`,
        () =>
            getScheduleSlot(garageId, {
                startTime: moment().startOf("day").toDate().getTime(),
                endTime: moment()
                    .startOf("day")
                    .add(1, "years")
                    .toDate()
                    .getTime(),
            }),
        {
            refreshInterval: 30000,
            revalidateOnFocus: false,
            refreshWhenHidden: true,
        },
    );
    const extraFee = schedule ? schedule[order.orderTime + ""]?.extraFee : 0;

    const disabledDates = useMemo(() => {
        if (!schedule) return [];

        return Object.keys(schedule).reduce((acc, dateKey) => {
            const config = schedule[dateKey];

            if (config.disabled || config.actualSlot === config.maximumSlot) {
                return [...acc, Number.parseInt(dateKey)];
            }

            return acc;
        }, [] as DisabledDate[]);
    }, [schedule]);

    const onBookPress = () => {
        navigate("/book", {
            state: order,
        });
    };

    const onAddToCart = () => {
        dispatch(
            orderAdded({
                ...order,
                _id: new ObjectId().toString(),
            }),
        );
        setAddedToCart(true);
    };

    const disabledActionButton = useMemo<boolean>(() => {
        if (
            order?.car?.brandId &&
            order?.orderTime &&
            order?.serviceIds?.length
        ) {
            return false;
        }
        return true;
    }, [order]);

    useEffect(() => {
        if (hasAddedToCart) {
            dispatch(
                notify({
                    title: "Thêm vào giỏ hàng",
                    description: "Thêm vào giỏ hàng thành công",
                    type: "success",
                }),
            );
            setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        }
    }, [dispatch, hasAddedToCart]);

    useEffect(() => {
        if (formRef.current && suggestionServices) {
            const { current } = formRef;
            current.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    }, [formRef, suggestionServices]);

    return (
        <div
            className={clsx("px-5 py-8 border-zinc-200 border-2 rounded-md")}
            ref={formRef}
        >
            <div className="flex flex-col gap-6 ">
                <p className="font-bold text-xl leading-5">Đặt dịch vụ</p>
                <div className="flex flex-col gap-3 relative">
                    <SelectInput disabledDates={disabledDates} />
                    <BrandInput />
                    <ServiceSelect />
                </div>
                <div className="border-t-2 border-zync-400 flex justify-between py-4">
                    {Boolean(extraFee) && (
                        <>
                            <div className="flex gap-2 items-center">
                                <p className="underline">Phụ phí</p>
                                <Tooltip content="Phụ phí này được quản lý garage cài đặt dành cho những ngày đặc biệt">
                                    <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                        className="text-default-500"
                                    />
                                </Tooltip>
                            </div>
                            <p className="font-medium">{extraFee}%</p>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <Button
                        color="primary"
                        radius="sm"
                        isDisabled={disabledActionButton || disabledBook}
                        disableAnimation
                        onClick={onBookPress}
                        className="w-full"
                    >
                        <span className="text-base font-semibold">
                            Đặt ngay
                        </span>
                    </Button>
                    <Button
                        color="default"
                        radius="sm"
                        variant="bordered"
                        isDisabled={disabledActionButton || disabledBook}
                        disableAnimation
                        onClick={onAddToCart}
                        className="w-full"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;
