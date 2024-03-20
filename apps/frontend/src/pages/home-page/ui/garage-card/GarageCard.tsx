import { WithOwnerGarage } from "@/api/garages/getGarages";
import { Carousel } from "@/core/ui";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Link,
} from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

export type GarageCardProps = {
    garage: WithOwnerGarage;
    className?: string;
    carouselType?: "square" | "rectangle";
};

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

// eslint-disable-next-line react-refresh/only-export-components
function GarageCard({ garage, className, carouselType = "square" }: GarageCardProps) {
    const { name, description, address, _id, backgroundImage, images, owner, isFavorite } = garage;
    const renderedImages = [backgroundImage, ...images]

    return (
        <Card className={clsx("gap-2 shadow-none relative", className)}>
            <CardHeader
                className={clsx("p-0 rounded-xl overflow-hidden", carouselType)}
            >
                <Carousel
                    items={renderedImages}
                    classNames={{
                        item: "w-full",
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
                            href={`/garages/${_id}`}
                            target="_blank"
                            className={clsx(
                                "font-semibold text-foreground whitespace-nowrap",
                                ellipsisClassName,
                            )}
                            underline="hover"
                        >
                            {name}
                        </Link>
                        <p
                            className={clsx(
                                "text-sm text-default-500",
                                ellipsisClassName,
                            )}
                        >
                            {description}
                        </p>
                        <p className="text-sm text-default-500">{address}</p>
                    </div>
                    <Avatar src={owner.photoURL} className="shrink-0" />
                </div>
                <p>{}</p>
            </CardBody>
            <Button 
                isIconOnly 
                radius="full" 
                className={clsx("absolute top-3 right-3 z-10")}
            >
                <FontAwesomeIcon icon={faHeart} size="lg" className={clsx(isFavorite && "text-danger")}/>
            </Button>
        </Card>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(GarageCard);
