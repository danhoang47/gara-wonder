import { WithOwnerGarage } from "@/api/garages/getGarages";
import { Garage } from "@/core/types";
import { Carousel } from "@/core/ui";
import { Avatar, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

export type GarageCardProps = {
    garage: WithOwnerGarage;
};

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

// eslint-disable-next-line react-refresh/only-export-components
function GarageCard({ garage }: GarageCardProps) {
    const { name, description, address, _id, backgroundImage, images } = garage;
    const renderedImages = [backgroundImage, ...images]

    return (
        <Card className="gap-2 shadow-none">
            <CardHeader className="square p-0 rounded-xl overflow-hidden">
                <Carousel
                    items={renderedImages}
                    classNames={{
                        item: "w-full"
                    }}
                    renderItem={(image) => (
                        <div className="h-full" key={image._id}>
                            <img
                                src={image.url}
                                className="object-cover h-full w-full"
                                loading="lazy"
                            />
                        </div>
                    )}
                />
            </CardHeader>
            <CardBody className="flex w-full p-0">
                <div className="flex mb-2 justify-between gap-2">
                    <div className="w-[calc(100%-3rem)]">
                        <Link
                            href={`/garage/${_id}`}
                            className={clsx(
                                "font-semibold text-foreground whitespace-nowrap",
                                ellipsisClassName,
                            )}
                            underline="hover"
                        >
                            {name}
                        </Link>
                        <p className={clsx("text-sm text-default-500", ellipsisClassName)}>
                            {description}
                        </p>
                        <p className="text-sm text-default-500">{address}</p>
                    </div>
                    <Avatar
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        className="shrink-0"
                    />
                </div>
                <p>{}</p>
            </CardBody>
        </Card>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(GarageCard);
