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
            header="Slot"
            description="Config your slot you can serve per day"
        >
            <div className="mb-2 flex justify-between">
                <div>
                    <p className="font-medium">Insert your slot</p>
                    <span className="text-small text-foreground-400">Don't worry, you can modify it later</span>
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