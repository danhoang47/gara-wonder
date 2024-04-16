import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Divider,
} from "@nextui-org/react";
import FileInputCsv from "./FileInputCsv";
import SampleFile from "./SampleFile";
import { useState } from "react";
import { uploadProductCsv } from "@/api/supplier";
import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import { HttpStatusCode } from "axios";
import { useSupplierRegistrationContext } from "@/pages/supplier-registration-page/hooks";

export type ImportCSVModalProps = {
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onOpenChange: (isOpen: boolean) => void;
};

const ImportCsvModal = ({ isOpen, onOpenChange }: ImportCSVModalProps) => {
    const [fileImport, setFileImport] = useState<File>();
    const dispatch = useAppDispatch();

    const { setSupplierRegistrationStateValue } =
        useSupplierRegistrationContext();

    const getProducts = async () => {
        try {
            if (!fileImport) return;
            const { data } = await uploadProductCsv({ file: fileImport });
            setSupplierRegistrationStateValue("products", data);
            setFileImport(undefined);
        } catch (e) {
            if (e.response.data.statusCode === HttpStatusCode.BadRequest) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Nhập file thất bại",
                        description: "Vui lòng nhập dữ liệu đúng định dạng",
                        delay: 3000,
                    }),
                );
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="px-6 justify-center">
                            Tải sản phẩm
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="py-4">
                            <FileInputCsv
                                setFileImport={setFileImport}
                                fileImport={fileImport}
                                showLabel={"Tải lên"}
                            />
                            <SampleFile />
                        </ModalBody>
                        <Divider />

                        <ModalFooter>
                            <Button
                                variant="light"
                                onPress={() => {
                                    onClose();
                                    setFileImport(undefined);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    onClose();
                                    getProducts();
                                }}
                                isDisabled={!fileImport}
                            >
                                Tải lên
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ImportCsvModal;
