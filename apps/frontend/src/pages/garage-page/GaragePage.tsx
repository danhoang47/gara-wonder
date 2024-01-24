import {
    AdditionalServices,
    BookingForm,
    Description,
    GarageHeader,
    GarageImagesPreview,
    GarageOwnerAndStaffInfoPreview,
    Services,
} from "./ui";

const GaragePage = () => {
    return (
        <div className="px-10 py-8">
            <div className="">
                <GarageHeader />
            </div>
            <div className="my-6">
                <GarageImagesPreview />
            </div>
            <div className="my-6 block w-full gap-4 md:flex">
                <div className="w-full shrink-0 min-w-[25rem] md:max-w-[35rem] md:w-2/5 md:order-2">
                    <BookingForm />
                </div>
                <div className="w-full flex flex-col gap-[30px]">
                    <div className="border-b-1 pb-8 border-zinc-300">
                        <GarageOwnerAndStaffInfoPreview />
                    </div>
                    <div className="border-b-1 pb-8 border-zinc-300">
                        <Services />
                    </div>
                    <div className="border-b-1 pb-8 border-zinc-300">
                        <AdditionalServices />
                    </div>
                    <div className="">
                        <Description />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GaragePage;
