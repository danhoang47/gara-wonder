import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { Report, Review } from "@/core/types";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { types } from "./constants";

export type ReportModalProps = {
    onClose: () => void;
    onSave: (review: Partial<Review>) => void;
    isOpen: boolean;
    entityId: string;
    entityName: string;
    isLoading: boolean;
};

function ReportModal({
    isOpen,
    onClose,
    onSave,
    entityId,
    entityName,
    isLoading,
}: ReportModalProps) {
    const [review, setReview] = useState<Partial<Report>>({
        entityId,
        content: "",
        type: 1
    });

    const onReviewValueChange = <K extends keyof Review>(
        k: K,
        v: Review[K],
    ) => {
        setReview((prev) => ({
            ...prev,
            [k]: v,
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            classNames={{
                closeButton:
                    "z-10 bg-transparent hover:bg-transparent hover:text-foreground",
            }}
        >
            <ModalContent>
                <ModalBody className="py-6 flex flex-col gap-4 relative">
                    <div className="bg-danger-50 flex gap-4 p-4 rounded-medium">
                        <FontAwesomeIcon
                            icon={faFlag}
                            size="lg"
                            className="text-danger-400"
                        />
                        <p className="text-small font-medium">
                            Đưa ra báo cáo chính xác để giúp chúng tôi xây dựng
                            cộng đồng phù hợp cho mọi người
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">
                            Báo cáo của bạn về {entityName} thế nào?
                        </p>
                        <div className="flex flex-col gap-3 justify-center pt-6">
                            <Select
                                variant="bordered"
                                label="Hạng mục báo cáo"
                                placeholder="Chọn hạng mục báo cáo"
                                classNames={{
                                    trigger: "border"
                                }}
                            >
                                {types.map(({ code, title }) => (
                                    <SelectItem key={code}>
                                        <span>{title}</span>
                                    </SelectItem>
                                ))}
                            </Select>
                            <Textarea
                                variant="bordered"
                                minRows={10}
                                classNames={{
                                    inputWrapper: "border",
                                }}
                                placeholder="Chia sẻ vài cảm nghĩ của bạn về dịch vụ..."
                                description="Tối thiểu 10 từ"
                                readOnly={isLoading}
                                value={review.content}
                                onValueChange={(content) =>
                                    onReviewValueChange("content", content)
                                }
                            />
                        </div>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 bg-background opacity-60" />
                    )}
                </ModalBody>
                <ModalFooter className="">
                    <Button
                        variant="light"
                        onPress={() => onSave(review)}
                        isLoading={isLoading}
                        className="data-[hover=true]:bg-transparent data-[hover=true]:opacity-60"
                    >
                        <span className="">Hủy bỏ</span>
                    </Button>
                    <Button
                        color="danger"
                        onPress={() => onSave(review)}
                        className=""
                        isLoading={isLoading}
                    >
                        <span className="font-medium">Báo cáo</span>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ReportModal;
