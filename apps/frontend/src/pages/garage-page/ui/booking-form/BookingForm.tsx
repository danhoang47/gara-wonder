import { Button } from "@nextui-org/react";
import { SelectInput } from "..";

function BookingForm() {
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
                    <SelectInput
                        type="string"
                        title="Car"
                        placeholder="Select your Car"
                        onClick={() => {}}
                    />
                    <SelectInput
                        type="string"
                        title="Email"
                        placeholder="Select your Email"
                        onClick={() => {}}
                    />
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
                <Button color="primary" radius="sm" disableAnimation>
                    Booking Now
                </Button>
            </div>
        </div>
    );
}

export default BookingForm;
