import { UniformRadio } from "@/core/ui";
import { RadioGroup } from "@nextui-org/react";
import { useOrderContext } from "../../hooks";
import { PayType } from "@/core/types";

export default function PayTypeGroup() {
    const { order: { payType = PayType.PayAsReceive }, setOrderValue } = useOrderContext()

    return (
        <RadioGroup
            classNames={{
                wrapper: "gap-0"
            }}
            defaultValue={payType?.toString()}
            onValueChange={(value) => {
                setOrderValue("payType", Number.parseInt(value))
            }}
        >
            <UniformRadio description="Pay by cash when you receive the car" value={PayType.PayAsReceive.toString()}>
                <p className="font-medium">Pay at receive</p>
            </UniformRadio>
            <UniformRadio description="Support multiple banking platforms" value={PayType.PayFirst.toString()}>
                <p className="font-medium">Pay first</p>
            </UniformRadio>
        </RadioGroup>
    )
}