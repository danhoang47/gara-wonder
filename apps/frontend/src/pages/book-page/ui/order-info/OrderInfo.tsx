import { Button } from "@nextui-org/react";

import DateInput from "../date-input";
import BrandSelect from "../brand-select";
import ServiceSelect from "../service-select";
import PayTypeGroup from "../pay-type-group";


function OrderInfo() {

    return (
        <div>
            <p className="text-lg font-medium mb-4">
                Your booking information
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
                >
                    <p>Sign in to continue your booking</p>
                </Button>
            </div>
        </div>
    )
}

export default OrderInfo;