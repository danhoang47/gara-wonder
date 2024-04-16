import { Image } from "@/core/types";
import { Product } from "@/core/types/model/product";
import { Carousel } from "@/core/ui";
import { formatCurrency } from "@/utils";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

interface IProduct {
    product: Product;
}

function ProductsCard({ product }: IProduct) {
    const { name, brandId, price, remain, _id, images } = product;
    return (
        <Card className={clsx("gap-2 shadow-none relative")}>
            <CardHeader
                className={clsx("p-0 rounded-xl overflow-hidden", "square")}
            >
                <Carousel
                    items={images}
                    classNames={{
                        item: "w-full",
                    }}
                    renderItem={(image: Image) => (
                        <div className="h-full" key={image._id}>
                            <img
                                src={image.url}
                                className="object-cover h-full w-full"
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    )}
                />
            </CardHeader>
            <CardBody className="flex w-full p-0">
                <div className="flex justify-between gap-2">
                    <div className="w-[calc(100%-8rem)]">
                        <Link
                            href={`/products/${_id}`}
                            target="_blank"
                            className={clsx(
                                "font-semibold text-foreground block w-full",
                                ellipsisClassName,
                            )}
                            underline="hover"
                        >
                            {name}
                        </Link>
                    </div>
                    <div>
                        <p className="font-semibold">
                            {formatCurrency(price)}
                            <sup>vnd</sup>
                        </p>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="text-sm text-default-500">{`Loại xe: ${brandId}`}</p>
                    <p className="text-sm text-default-500">{`Còn lại: ${remain}`}</p>
                </div>

                <Button
                    variant="bordered"
                    color="default"
                    className="border"
                    radius="full"
                    onPress={() => {}}
                >
                    <span className="font-medium">Thêm vào giỏ hàng</span>
                </Button>
            </CardBody>

            <Button
                isIconOnly
                radius="full"
                className="absolute top-3 right-3 z-10"
            >
                <FontAwesomeIcon icon={faHeart} size="lg" />
            </Button>
        </Card>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ProductsCard);
