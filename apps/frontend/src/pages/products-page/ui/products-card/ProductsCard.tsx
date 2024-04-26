import { WithBrandProduct } from "@/api/supplier/getProducts";
import { Image } from "@/core/types";
import { Carousel } from "@/core/ui";
import { formatCurrency } from "@/utils";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

type ProductProps = {
    product: WithBrandProduct;
};

function ProductsCard({ product }: ProductProps) {
    const { name, price, _id, images } = product;
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
                        <p className="font-semibold">{formatCurrency(price)}</p>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="text-sm text-default-500">{`Loại xe: ${product.brand.name}`}</p>
                    <p className="text-sm text-default-500">{`Còn lại: ${product.quantity}`}</p>
                </div>
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
