import { FileInput } from "@/core/ui";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePreview } from "./ui";

type certImageType = {
    front: File | undefined;
    back: File | undefined;
};
export default function CertificateOfBusinessRegistrationSettings() {
    const [certImage, setCertImage] = useState<certImageType>({
        front: undefined,
        back: undefined,
    });
    const navigate = useNavigate();
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
                                    file={certImage.front}
                                    onImageRemove={() =>
                                        setCertImage({
                                            ...certImage,
                                            front: undefined,
                                        })
                                    }
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
                                    file={certImage.back}
                                    onImageRemove={() =>
                                        setCertImage({
                                            ...certImage,
                                            back: undefined,
                                        })
                                    }
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
                        <FontAwesomeIcon icon={faGem} className="text-2xl" />
                        <p className="font-medium text-sm pt-2">
                            <span className="font-semibold">
                                Cài đặt chế độ nhận đơn phù hợp
                            </span>{" "}
                            có thể giúp bạn quản lý đơn đặt hàng của mình một
                            cách hiệu quả và chính xác hơn
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
                <Button className="" color="primary" radius="full">
                    Lưu
                </Button>
            </div>
        </div>
    );
}
