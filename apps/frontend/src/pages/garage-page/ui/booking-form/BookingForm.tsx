import { InputPlaceholder } from "..";

function BookingForm() {

    return <div className="px-5 py-8 border-zinc-200 border-2 rounded-md">
        <div className="flex flex-col gap-6">
            <p className="font-semibold text-2xl leading-5">Iplorem sum donor</p>
            <div className="flex flex-col gap-3">
                <InputPlaceholder
                    type="string"
                    placeholder="Select your date"
                    title="Date"
                    onClick={() => {}} />
                <InputPlaceholder
                    type="string"
                    title="Car"
                    placeholder="Select your Car"
                    onClick={() => { }}
                />
                <InputPlaceholder
                    type="string"
                    title="Email"
                    placeholder="Select your Email"
                    onClick={() => { }}
                />
            </div>
        </div>
    </div>
}

export default BookingForm;