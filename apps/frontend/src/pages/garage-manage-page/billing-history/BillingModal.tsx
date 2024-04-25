import { WithUserBill } from "@/api/garages/getBillings";
import { formatCurrency } from "@/utils";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from "@nextui-org/react";
import moment from "moment";

export type BillingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    bill?: WithUserBill;
    onSave: (_id?: string) => void;
    isLoading?: boolean;
};

function BillingModal({ isOpen, onClose, bill = undefined, onSave, isLoading }: BillingModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                        <p className="font-medium text-large">
                            {bill?.garageName}
                        </p>
                        <div className="flex">
                            <p className="font-normal underline">
                                Doanh thu{" "}
                                <span className="capitalize">
                                    {moment(bill?.createdAt).format("MM/YYYY")}
                                </span>
                            </p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(bill?.totalIncome, "standard")}
                            </p>
                        </div>
                        <div className="flex">
                            <p className="font-normal underline">
                                Phí dịch vụ{" "}
                                <span className="capitalize">
                                    {moment(bill?.createdAt).format("MM/YYYY")}
                                </span>
                            </p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(bill?.paidFee, "standard")}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <p className="font-semibold">Cần thanh toán</p>
                            <p className="ml-auto font-semibold text-large">
                                {formatCurrency(bill?.paidFee, "standard")}
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {!bill?.hasPaid && (
                        <Button isLoading={isLoading} className="w-full" color="primary" onPress={() => onSave(bill?._id)}>
                            <span>Thanh toán ngay</span>
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default BillingModal;
