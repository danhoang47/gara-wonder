import CategoryDetail from "../category-detail";
import {
    Button,
    Chip,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { getCategoryById } from "@/api";
import { WithCategoryService } from "@/api/garages/getGarageServices";
import { Brand } from "@/core/types";

export default function ServiceDetail({
    service,
    brands,
}: {
    service: WithCategoryService;
    brands?: Brand[];
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { isLoading: isCategoryLoading, data: categoryData } =
        useSWRImmutable(`${service.categoryId}`, getCategoryById);

    return (
        <>
            <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                    <img src={categoryData?.icon} alt="" />
                    <CategoryDetail
                        service={service}
                        isCategoryLoading={isCategoryLoading}
                        categoryData={categoryData}
                        openModal={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </div>

                <p className="font-semibold shrink-0">
                    {String(service.lowestPrice as number).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ",",
                    )}{" "}
                    -{" "}
                    {String(service.highestPrice as number).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ",",
                    )}{" "}
                    VND
                </p>
            </div>
            <Modal
                isOpen={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
                classNames={{
                    wrapper: "overflow-y-hidden",
                }}
            >
                <ModalContent className="">
                    <ModalHeader>
                        <p className="text-center text-lg font-bold">
                            Dịch vụ {categoryData?.name}
                        </p>
                        {service.isProvidedEvaluation && (
                            <Chip className="ml-3" color="primary">
                                Có đánh giá
                            </Chip>
                        )}
                    </ModalHeader>
                    <Divider />
                    <ModalBody className="overflow-auto max-h-[30rem]">
                        <p className="font-medium">Giá tiền</p>
                        <p className="text-xl font-semibold">
                            {String(service.lowestPrice as number).replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ",",
                            )}{" "}
                            -{" "}
                            {String(service.highestPrice as number).replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ",",
                            )}{" "}
                            VND
                        </p>
                        <p className="font-medium">Thời gian hoàn thành</p>
                        {service.estimateDuration ? (
                            <p className="font-medium text-sm">
                                <span className="text-xl font-semibold">
                                    {(service.estimateDuration[0]
                                        ? service.estimateDuration[0] + `-`
                                        : "") +
                                        service.estimateDuration[1]}{" "}
                                    ngày
                                </span>
                            </p>
                        ) : (
                            <p className="text-xl font-semibold">
                                Không có thời gian cụ thể
                            </p>
                        )}
                        <p> {service.estimateDuration}</p>
                        <p className="font-medium">Các loại xe được hỗ trợ</p>
                        {service.brandIds === "all" ? (
                            <Chip
                                variant="bordered"
                                radius="sm"
                                size="lg"
                                classNames={{ base: "p-3" }}
                            >
                                <p className="font-medium text-sm">
                                    Hỗ trợ mọi loại xe
                                </p>
                            </Chip>
                        ) : (
                            <div className="flex gap-2 flex-wrap">
                                {brands
                                    ?.filter(
                                        ({ _id }) =>
                                            service.brandIds?.includes(_id),
                                    )
                                    .map((brand) => (
                                        <Chip
                                            variant="bordered"
                                            radius="sm"
                                            size="lg"
                                            classNames={{ base: "p-3" }}
                                        >
                                            <p className="font-medium text-sm">
                                                {brand.name}
                                            </p>
                                        </Chip>
                                    ))}
                            </div>
                        )}
                        <p className="font-medium">Thông tin chung</p>
                        <div className="min-h-[10rem] rounded-lg border-2 p-2">
                            <p className="px-0">
                                {service.category.description}
                            </p>
                        </div>
                    </ModalBody>

                    <ModalFooter className="flex items-center justify-end">
                        <div className="flex gap-2 justify-end ">
                            <Button onClick={() => setIsModalOpen(false)}>
                                <p className="text-black">Đóng</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
