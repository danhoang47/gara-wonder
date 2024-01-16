
import { BookingForm, GarageHeader, GarageImagesPreview } from "./ui";

export type GaragePageProps = {

}

const GaragePage = ({ }: GaragePageProps) => {

    return (
        <div className="px-10 py-8">
            <div className="">
                <GarageHeader />
            </div>
            <div className="my-6">
                <GarageImagesPreview />
            </div>
            <div className="my-6 block w-full gap-2 md:flex">
                <div className="w-full shrink-0 min-w-[25rem] md:max-w-[35rem] md:w-2/5 md:order-2" >
                    <BookingForm />
                </div>
                <div className="w-full">a2</div>
            </div>
        </div>
    );
}

export default GaragePage




