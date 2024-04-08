import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryDetail from "../category-detail";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
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

export default function ServiceDetail({
    service,
}: {
    service: WithCategoryService;
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { isLoading: isCategoryLoading, data: categoryData } =
        useSWRImmutable(`${service.categoryId}`, getCategoryById);
        

    return (
        <>
            <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faWrench} size="xl" />
                    <CategoryDetail
                        service={service}
                        isCategoryLoading={isCategoryLoading}
                        categoryData={categoryData}
                        openModal={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </div>
                <div>
                    <p className="font-semibold">
                        {service.lowestPrice}$ - {service.highestPrice}$
                    </p>
                </div>
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
                        {service.status && (
                            <Chip className="ml-3" color="primary">
                                Có đánh giá
                            </Chip>
                        )}
                    </ModalHeader>
                    <Divider />
                    <ModalBody className="overflow-auto max-h-[30rem]">
                        <p className="font-medium">Giá tiền</p>
                        <p className="text-xl font-semibold">
                            {String(
                                (service.lowestPrice as number) * 24000,
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            -{" "}
                            {String(
                                (service.highestPrice as number) * 24000,
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            VND
                        </p>
                        <p className="font-medium">Thời gian hoàn thành</p>
                        <p> {service.estimateDuration}</p>
                        <p className="font-medium">Các loại xe được hỗ trợ</p>
                        <p className="font-medium">Thông tin chung</p>
                        <div className="min-h-[10rem] rounded-lg border-2 p-2">
                            <p>{service.category.description}</p>
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
