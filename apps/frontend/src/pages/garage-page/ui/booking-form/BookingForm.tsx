import { Button } from "@nextui-org/react";
import BrandInput from "./brand-input";
import ServiceSelect from "./service-select";
import SelectInput from "./select-input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useOrderContext } from "../../hooks";

function BookingForm() {
    const { garageId } = useParams();
    const navigate = useNavigate();
    const { order, setOrderValue } = useOrderContext();
    useEffect(() => {
        setOrderValue("garageId", garageId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [garageId]);
    const onSave = () => {
        console.log(order);
        navigate("/book", order);
    };
    const validateForm = useMemo<boolean>(() => {
        if (order.car?.brandId && order.orderTime && order.serviceIds)
            return false;
        return true;
    }, [order]);
    return (
        <div className="px-5 py-8 border-zinc-200 border-2 rounded-md">
            <div className="flex flex-col gap-6">
                <p className="font-semibold text-xl leading-5">
                    Booking Services
                </p>
                <div className="flex flex-col gap-3">
                    <SelectInput
                        type="date"
                        placeholder="Select your date"
                        title="Date"
                        canEdit={true}
                        onClick={() => {}}
                    />
                    <BrandInput />
                    <ServiceSelect />
                </div>
                <div>
                    <div className="flex justify-between">
                        <p className="text-default-400">Total</p>
                        <p>$123</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-default-400">Tax</p>
                        <p>$123</p>
                    </div>
                </div>
                <div className="border-t-2 border-zync-400" />
                <div className="flex justify-between">
                    <p className="font-semibold text-xl">Total</p>
                    <p>$123</p>
                </div>
                <Button
                    color="primary"
                    radius="sm"
                    isDisabled={validateForm}
                    disableAnimation
                    onClick={onSave}
                >
                    Booking Now
                </Button>
            </div>
        </div>
    );
}

export default BookingForm;
