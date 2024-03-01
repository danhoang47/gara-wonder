import { UniformRadio } from "@/core/ui";
import { RadioGroup } from "@nextui-org/react";


export default function PayTypeGroup() {

    return (
        <RadioGroup
            classNames={{
                wrapper: "gap-0"
            }}
            defaultValue="cash"
        >
            <UniformRadio description="Pay by cash when you receive the car" value="cash">
                <p className="font-medium">Pay by cash</p>
            </UniformRadio>
            <UniformRadio description="Support multiple banking platforms" value="banking">
                <p className="font-medium">Pay by internet banking</p>
            </UniformRadio>
        </RadioGroup>
    )
}