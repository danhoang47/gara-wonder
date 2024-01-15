
import { GarageHeader, GarageImagesPreview } from "./ui";

export type GaragePageProps = {

}

const GaragePage = ({ }: GaragePageProps) => {

    return (
        <div className="px-10 my-8">
            <div className="">
                <GarageHeader />
            </div>
            <div className="my-6">
                <GarageImagesPreview />
            </div>
        </div>
    );
}

export default GaragePage




