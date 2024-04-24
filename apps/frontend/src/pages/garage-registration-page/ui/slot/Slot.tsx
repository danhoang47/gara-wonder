import { Stepper } from "@/core/ui";
import { RegistrationSection } from "..";
import { useGarageRegistrationContext } from "../../hooks";


function Slot() {
    const {
        garageRegistrationState,
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const { defaultSlot } = garageRegistrationState

    return (
        <RegistrationSection
            header="Cài đặt số chỗ"
            description="Tinh chỉnh số chỗ garage có thể phục vụ hằng ngày"
        >
            <div className="mb-2 flex justify-between items-center">
                <div>
                    <p className="font-medium">Nhập số chỗ</p>
                    <span className="text-small text-foreground-400">Đừng lo, bạn có thể tinh chỉnh lại sau</span>
                </div>
                <div>
                    <Stepper
                        value={defaultSlot}
                        onChange={(value) => setGarageRegistrationStateValue("defaultSlot", value)}
                        allowKeyboard={true}
                        min={1}
                        classNames={{
                            "text": "font-semibold w-6"
                        }}
                    />
                </div>

            </div>
        </RegistrationSection>
    )
}

export default Slot;