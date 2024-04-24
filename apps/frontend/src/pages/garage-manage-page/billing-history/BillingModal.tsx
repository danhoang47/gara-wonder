import { formatCurrency } from "@/utils";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from "@nextui-org/react";

function BillingModal() {
    return (
        <Modal isOpen>
            <ModalContent>
                <ModalBody className="pt-6">
                    <div className="flex flex-col items-center gap-4">
                        <img
                            alt="Brand Logo"
                            src="/logo.png"
                            className="w-20 h-20"
                        />
                        <div>
                            <h1 className="font-semibold text-xl text-center">
                                Hóa đơn dịch vụ
                            </h1>
                            <p className="text-center italic">
                                Hệ thống chúng tôi xin thông báo hóa đơn dịch vụ
                                của bạn trong tháng này
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-6 border-b mt-6">
                        <p className="font-medium text-large">Garage Wonder 29</p>
                        <div className="flex">
                            <p className="font-normal underline">
                                Doanh thu T5/2024
                            </p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(100000000, "standard")}
                            </p>
                        </div>
                        <div className="flex">
                            <p className="font-normal underline">
                                Phí dịch vụ T5/2024
                            </p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(1000000, "standard")}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <p className="font-semibold">
                                Cần thanh toán
                            </p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(1000000, "standard")}
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full" color="primary">
                        <span>Thanh toán ngay</span>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default BillingModal;
