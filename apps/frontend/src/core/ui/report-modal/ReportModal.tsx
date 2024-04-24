import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    Select,
    SelectItem,
    Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { Report } from "@/core/types";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { types } from "./constants";

export type ReportModalProps = {
    onClose: () => void;
    onSave: (report: Partial<Report>) => void;
    isOpen: boolean;
    entityId: string;
    entityName: string;
    isLoading: boolean;
    isReadonly?: boolean;
};

function ReportModal({
    isOpen,
    onClose,
    onSave,
    entityId,
    entityName,
    isLoading,
    isReadonly = false,
}: ReportModalProps) {
    const [report, setReport] = useState<Partial<Report>>({
        entityId,
        content: "",
        type: 1,
    });

    const onReportValueChange = <K extends keyof Report>(
        k: K,
        v: Report[K],
    ) => {
        setReport((prev) => ({
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
                            <Input
                                value={report.title}
                                label={"Tiêu đề"}
                                placeholder="Nhập vào tiêu đề"
                                onValueChange={(value) => {
                                    onReportValueChange("title", value);
                                }}
                                variant="bordered"
                                classNames={{
                                    inputWrapper: "border",
                                }}
                                isReadOnly={isReadonly}
                            />
                            <Select
                                variant="bordered"
                                label="Hạng mục báo cáo"
                                placeholder="Chọn hạng mục báo cáo"
                                classNames={{
                                    trigger: "border",
                                }}
                                disallowEmptySelection
                                isDisabled={isReadonly}
                            >
                                {types.map(({ code, title }) => (
                                    <SelectItem key={code}>{title}</SelectItem>
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
                                value={report.content}
                                onValueChange={(content) =>
                                    onReportValueChange("content", content)
                                }
                                isReadOnly={isReadonly}
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
                        onPress={() => onSave(report)}
                        isDisabled={isLoading}
                        className="data-[hover=true]:bg-transparent data-[hover=true]:opacity-60"
                    >
                        <span className="">Hủy bỏ</span>
                    </Button>
                    {!isReadonly && (
                        <Button
                            color="danger"
                            onPress={() => onSave(report)}
                            className=""
                            isLoading={isLoading}
                        >
                            <span className="font-medium">Báo cáo</span>
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ReportModal;
