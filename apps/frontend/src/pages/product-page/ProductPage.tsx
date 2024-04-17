import { FetchStatus, Image, ProductCategory, RoomType } from "@/core/types";
import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/api/supplier";
import { useEffect, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
    useLoadingContext,
    useModalContext,
} from "@/core/hooks";
import { Avatar, Button } from "@nextui-org/react";
import { formatCurrency } from "@/utils";

import "./ProductPages.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { createNewRoom, selectRooms } from "@/features/chat/rooms.slice";

function ProductPage() {
    const { productId } = useParams();
    const { open } = useModalContext();
    const { load, unload } = useLoadingContext();
    const { isLoading, data: product } = useSWRImmutable(
        productId,
        getProductById,
    );
    const [heroImage, setHeroImage] = useState<Image>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const rooms = useAppSelector((state) => selectRooms(state));

    const getCategoryProduct = (option: ProductCategory | undefined) => {
        if (option === undefined) return "";

        switch (option) {
            case ProductCategory.Exterior:
                return "Ngoại thất";
            case ProductCategory.Interior:
                return "Nội thất";
            default:
                return "";
        }
    };

    useEffect(() => {
        if (isLoading) {
            load("product");
        } else {
            unload("product");
        }
    }, [isLoading, load, unload]);

    useEffect(() => {
        if (!isLoading) {
            setHeroImage(product?.images[0]);
        }
    }, [isLoading, product]);

    const onChatButtonPress = async () => {
        const isExistRoom = rooms.find(
            (room) => room.entityId === product?.supplier._id,
        );
        if (isExistRoom) {
            navigate(`/chat/${isExistRoom._id}`);
            return;
        }

        if (fetchingStatus !== FetchStatus.Fetching) {
            dispatch(
                createNewRoom({
                    userId: user.value?._id || "",
                    entityId: product?.supplier._id || "",
                    type: RoomType.WithSupplier,
                    attachEntityId: product?._id,
                }),
            ).then(({ payload }) => {
                if (
                    typeof payload === "object" &&
                    payload &&
                    "data" in payload &&
                    payload.data &&
                    typeof payload.data === "object" &&
                    "_id" in payload.data
                ) {
                    navigate(`/chat/${payload?.data?._id}`);
                }
            });
        }
    };

    return (
        <div id="product" className="flex gap-10 mx-auto px-10 mt-10">
            <div className="grow basis-0">
                <div className="">
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        alt="img preview"
                        src={heroImage?.url}
                    />
                </div>
                <div className="flex h-40 gap-2 mt-2">
                    {product?.images?.map((i) => {
                        return (
                            <div
                                key={i._id}
                                onClick={() => setHeroImage(i)}
                                className=""
                            >
                                <img
                                    className="w-full h-full object-cover object-center"
                                    src={i.url}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="grow basis-0">
                <div className="border-b pb-4">
                    <p className="text-small">
                        {getCategoryProduct(product?.category)}
                    </p>
                    <div className="text-[28px] font-bold">{product?.name}</div>
                    <div className="">{product?.productType?.name}</div>
                </div>
                <div className="py-4">
                    <p>{product?.description}</p>
                </div>
                <div className="py-4 border-b">
                    <p className="text-small">Giá tiền</p>
                    <div className="text-xl font-semibold">
                        {product?.price &&
                            formatCurrency(product.price, "standard")}
                    </div>
                </div>
                <div className="py-4 border-b">
                    <div className="text-small">Hãng xe</div>
                    <div className="mt-2">
                        <p className="px-4 py-2 border-2 rounded-full w-fit font-semibold">
                            {product?.brand.name}
                        </p>
                    </div>
                </div>
                <div className="py-4">
                    <div className="text-small">Đăng bán bởi</div>
                    <div className="flex gap-2 mt-2 items-center">
                        <Avatar
                            src={product?.supplier.backgroundURL}
                            onClick={() =>
                                open("profile", product?.supplier.userId)
                            }
                        />
                        <div>
                            <p className="text-large">
                                {product?.supplier.name}
                            </p>
                            <p className="text-small">
                                Đăng ký vào{" "}
                                {moment(product?.supplier.createdAt).format(
                                    "DD/MM/YYYY",
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <Button
                        startContent={
                            <FontAwesomeIcon
                                icon={faComment}
                                className="text-base"
                            />
                        }
                        className="w-full h-auto py-3"
                        color="primary"
                        isLoading={fetchingStatus === FetchStatus.Fetching}
                        onPress={onChatButtonPress}
                        spinnerPlacement="end"
                    >
                        <span className="text-base">
                            Nhắn tin với người bán
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
