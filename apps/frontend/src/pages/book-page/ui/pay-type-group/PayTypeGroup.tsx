import { UniformRadio } from "@/core/ui";
import { RadioGroup } from "@nextui-org/react";
import { useOrderContext } from "../../hooks";
import { PayType } from "@/core/types";

export default function PayTypeGroup() {
    const { order: { payType = PayType.Cash }, setOrderValue } = useOrderContext()

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
            <UniformRadio description="Pay by cash when you receive the car" value={PayType.Cash.toString()}>
                <p className="font-medium">Pay by cash</p>
            </UniformRadio>
            <UniformRadio description="Support multiple banking platforms" value={PayType.Banking.toString()}>
                <p className="font-medium">Pay by internet banking</p>
            </UniformRadio>
        </RadioGroup>
    )
}