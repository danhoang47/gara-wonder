import { FileInput } from "@/core/ui";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePreview } from "./ui";
import useSWRImmutable from "swr/immutable";
import { getGarageLiscense, updateGarageLiscene } from "@/api";
import { LoadingContext } from "@/core/contexts/loading";
import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";

type certImageType = {
    front: File | undefined;
    back: File | undefined;
};
type ProvidedImg = {
    front: string | undefined;
    back: string | undefined;
};
export default function CertificateOfBusinessRegistrationSettings() {
    const navigate = useNavigate();
    const { garageId } = useParams();
    const { load, unload } = useContext(LoadingContext);
    const dispatch = useAppDispatch();

    const [certImage, setCertImage] = useState<certImageType>({
        front: undefined,
        back: undefined,
    });
    const [provideImg, setProvideImg] = useState<ProvidedImg>({
        front: undefined,
        back: undefined,
    });
    const { isLoading, data: certImg } = useSWRImmutable(
        garageId,
        getGarageLiscense,
    );
    useEffect(() => {
        if (isLoading) load("img");
        else {
            unload("img");
        }
    }, [isLoading]);
    useEffect(() => {
        if ((certImg?.data.license?.length as number) > 0) {
            setProvideImg({
                front: certImg?.data.license[0].url,
                back: certImg?.data.license[0].url,
            });
        }
    }, [certImg]);

    const onSubmit = async () => {
        try {
            const result = await updateGarageLiscene(
                garageId,
                certImage.front,
                certImage.back,
            );
            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: `Cập nhật giấy phép thành công`,
                        description: `Đã xác nhận cập nhật giấy phép thành công`,
                        delay: 4000,
                    }),
                );
                setTimeout(() => {
                    navigate("..");
                }, 3000);
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Xác nhận thất bại",
                    description: "Một số lỗi xảy ra khi xác nhận",
                    delay: 4000,
                }),
            );
        }
    };
    if (!isLoading)
        return (
            <div className=" relative grid grid-cols-12 gap-5 px-10 mt-10 h-[95%]">
                <div className="col-span-4 col-start-4">
                    <Breadcrumbs>
                        <BreadcrumbItem
                            onClick={() => {
                                navigate("..");
                            }}
                        >
                            Chung
                        </BreadcrumbItem>
                        <BreadcrumbItem className="font-bold">
                            Giấy phép kinh doanh
                        </BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="mt-2">
                        <p className="text-2xl font-semibold">
                            Giấy phép kinh doanh
                        </p>
                        <p className="text-default-400 text-sm">
                            Thêm và thay thế giấy phép kinh doanh
                        </p>
                    </div>
                    <div className="pt-5">
                        <div className="">
                            <p className="text-sm font-medium">
                                Giấy phép kinh doanh mặt trước
                            </p>
                            <div className="pt-2 max-w-[27rem]">
                                {certImage.front ? (
                                    <ImagePreview
                                        file={certImage.front as File}
                                        onImageRemove={() => {
                                            setCertImage({
                                                ...certImage,
                                                front: undefined,
                                            });
                                            setProvideImg({
                                                ...provideImg,
                                                front: undefined,
                                            });
                                        }}
                                    />
                                ) : provideImg.front ? (
                                    <ImagePreview
                                        file={provideImg.front as string}
                                        onImageRemove={() => {
                                            setCertImage({
                                                ...certImage,
                                                front: undefined,
                                            });
                                            setProvideImg({
                                                ...provideImg,
                                                front: undefined,
                                            });
                                        }}
                                    />
                                ) : (
                                    <FileInput
                                        selectionMode="single"
                                        onValueChange={(fs) => {
                                            setCertImage({
                                                ...certImage,
                                                front: fs,
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="pt-5">
                            <p className="text-sm font-medium">
                                Giấy phép kinh doanh mặt sau
                            </p>
                            <div className="pt-2 max-w-[27rem]">
                                {certImage.back ? (
                                    <ImagePreview
                                        file={certImage.back as File}
                                        onImageRemove={() => {
                                            setCertImage({
                                                ...certImage,
                                                back: undefined,
                                            });
                                            setProvideImg({
                                                ...provideImg,
                                                back: undefined,
                                            });
                                        }}
                                    />
                                ) : provideImg.back ? (
                                    <ImagePreview
                                        file={provideImg.back as string}
                                        onImageRemove={() => {
                                            setCertImage({
                                                ...certImage,
                                                back: undefined,
                                            });
                                            setProvideImg({
                                                ...provideImg,
                                                back: undefined,
                                            });
                                        }}
                                    />
                                ) : (
                                    <FileInput
                                        selectionMode="single"
                                        onValueChange={(fs) => {
                                            setCertImage({
                                                ...certImage,
                                                back: fs,
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 col-start-8">
                    <div className="w-64 mt-7 p-4 flex justify-center border-3 border-default-500 rounded-2xl">
                        <div>
                            <FontAwesomeIcon
                                icon={faGem}
                                className="text-2xl"
                            />
                            <p className="font-medium text-sm pt-2">
                                <span className="font-semibold">
                                    Cài đặt chế độ nhận đơn phù hợp
                                </span>{" "}
                                có thể giúp bạn quản lý đơn đặt hàng của mình
                                một cách hiệu quả và chính xác hơn
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute flex w-44 gap-4 bottom-[3rem] left-[calc((100%-11rem)/2)]">
                    <Button
                        variant="light"
                        radius="full"
                        onClick={() => {
                            navigate("..");
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        className=""
                        color="primary"
                        radius="full"
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        );
}
