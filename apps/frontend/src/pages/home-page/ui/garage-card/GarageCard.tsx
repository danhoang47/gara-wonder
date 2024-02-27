import { Garage } from "@/core/types";
import { Carousel } from "@/core/ui";
import { Avatar, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

export type GarageCardProps = {
    garage: Garage;
};

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

// eslint-disable-next-line react-refresh/only-export-components
function GarageCard({ garage }: GarageCardProps) {
    const { name, description, address, _id } = garage;

    return (
        <Card className="gap-2 shadow-none">
            <CardHeader className="square p-0 rounded-xl overflow-hidden">
                <Carousel
                    items={[
                        "https://nextui.org/images/hero-card-complete.jpeg",
                        "https://nextui.org/images/album-cover.png",
                        "https://nextui.org/images/hero-card-complete.jpeg",
                        "https://nextui.org/images/album-cover.png"
                    ]}
                    classNames={{
                        item: "w-full"
                    }}
                    renderItem={(item) => (
                        <div className="h-full">
                            <img
                                src={item}
                                className="object-cover h-full w-full"
                                loading="lazy"
                            />
                        </div>
                    )}
                />
            </CardHeader>
            <CardBody className="flex w-full p-0">
                <div className="flex mb-2 justify-between gap-2">
                    <div className="">
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
                        <p className="text-sm text-default-500">
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
