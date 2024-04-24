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
            <UniformRadio description="Thanh toán khi hoàn thành đơn hàng" value={PayType.PayAsReceive.toString()}>
                <p className="font-medium">Thanh toán lúc nhận lại xe</p>
            </UniformRadio>
            <UniformRadio description="Hỗ trợ thanh toán đa nền tảng" value={PayType.PayFirst.toString()}>
                <p className="font-medium">Thanh toán trước</p>
            </UniformRadio>
        </RadioGroup>
    )
}